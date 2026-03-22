# MEDIBEE DATA MODEL v2
## Cell / Hive / Colony Architecture

**Document Owner:** CTO
**Date:** 22 March 2026
**Version:** 2.0
**Status:** DRAFT

---

# 1. ENTITY RELATIONSHIP DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MEDIBEE DATA MODEL v2                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐        │
│  │     USER     │         │  MEMBERSHIP  │         │    COLONY    │        │
│  │ (Cognito)    │────────►│              │◄────────│   PROFILE    │        │
│  └──────────────┘    1:1  └──────────────┘    1:1  └──────────────┘        │
│         │                        │                        │                 │
│         │ 1:1                    │                        │                 │
│         ▼                        │                        │                 │
│  ┌──────────────┐                │                        │                 │
│  │  CANDIDATE   │◄───────────────┘                        │                 │
│  │   PROFILE    │                                         │                 │
│  └──────────────┘                                         │                 │
│         │                                                 │                 │
│         │ 1:N                                             │                 │
│         ▼                                                 │                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐│                 │
│  │    VAULT     │    │   PASSPORT   │    │   BADGE      ││                 │
│  │  DOCUMENT    │    │              │    │              ││                 │
│  └──────────────┘    └──────────────┘    └──────────────┘│                 │
│         │                   │                   │         │                 │
│         │                   │                   │         │                 │
│         └───────────────────┼───────────────────┘         │                 │
│                             │                             │                 │
│                      1:1    ▼                             │                 │
│                    ┌──────────────┐                       │                 │
│                    │ VERIFICATION │                       │                 │
│                    │     PACK     │                       │                 │
│                    └──────────────┘                       │                 │
│                             │                             │                 │
│                             │ N:N                         │                 │
│                             ▼                             │                 │
│                    ┌──────────────┐    ┌──────────────┐  │                 │
│                    │  SHORTLIST   │◄───│  SHORTLIST   │◄─┘                 │
│                    │              │    │    ITEM      │                    │
│                    └──────────────┘    └──────────────┘                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 2. TYPESCRIPT INTERFACES

## 2.1 Core Entities

### User (Cognito)
```typescript
// Cognito user - not stored in DynamoDB
interface CognitoUser {
  sub: string;                    // Cognito user ID
  email: string;
  email_verified: boolean;
  phone_number?: string;
  'custom:userType': 'candidate' | 'colony' | 'admin';
  'custom:membershipTier'?: 'cell' | 'hive' | 'colony';
  'custom:tenantId': string;      // Always TENANT#MEDIBEE
}
```

### Membership
```typescript
// Membership - tracks subscription status
interface Membership {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // MEMBERSHIP#{membershipId}

  // Identity
  membershipId: string;           // UUID
  userId: string;                 // Cognito sub
  userType: 'candidate' | 'colony';

  // Tier
  tier: 'cell' | 'hive' | 'colony';

  // Subscription (Hive/Colony only)
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'none';
  currentPeriodStart?: string;    // ISO datetime
  currentPeriodEnd?: string;      // ISO datetime

  // Metadata
  createdAt: string;
  updatedAt: string;

  // GSI
  GSI1PK: string;                 // TIER#{tier}
  GSI1SK: string;                 // MEMBERSHIP#{membershipId}
  GSI2PK: string;                 // USER#{userId}
  GSI2SK: string;                 // MEMBERSHIP#{membershipId}
}

type MembershipTier = 'cell' | 'hive' | 'colony';
type MembershipStatus = 'active' | 'trialing' | 'past_due' | 'cancelled' | 'none';
```

### Candidate Profile
```typescript
interface CandidateProfile {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // CAND#{candidateId}

  // Identity
  candidateId: string;            // UUID
  userId: string;                 // Cognito sub
  membershipId: string;           // Links to Membership

  // Personal
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profilePhotoKey?: string;       // S3 key

  // Location
  city?: string;
  postcode?: string;
  region?: string;

  // Professional (Cell: limited, Hive: full)
  headline?: string;              // Cell: 50 chars, Hive: 100 chars
  summary?: string;               // Cell: 200 chars, Hive: 500 chars
  professionalTitle?: string;

  // Experience (Cell: max 3, Hive: unlimited)
  workHistory: WorkHistoryEntry[];

  // Skills (Cell: max 5, Hive: unlimited)
  skills: string[];

  // Preferences
  preferredSettings: CareSettingType[];
  shiftPreferences?: ShiftPreference[];
  travelRadius?: number;          // Miles
  availabilityStatus: 'available' | 'not_looking' | 'open_to_offers';

  // Compliance (Hive only - links to Vault)
  vaultEnabled: boolean;          // True for Hive
  passportId?: string;            // Hive only

  // Status
  profileStatus: 'draft' | 'pending_review' | 'active' | 'suspended';
  profileCompleteness: number;    // 0-100

  // Metadata
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;

  // GSI
  GSI1PK: string;                 // TIER#{tier} (from membership)
  GSI1SK: string;                 // CAND#{candidateId}
  GSI2PK: string;                 // STATUS#{profileStatus}
  GSI2SK: string;                 // CAND#{candidateId}
}

interface WorkHistoryEntry {
  entryId: string;
  role: string;
  employer: string;
  startDate: string;              // ISO YYYY-MM-DD
  endDate?: string;               // ISO or null for current
  description?: string;
  isCurrent: boolean;
}

type CareSettingType =
  | 'mental-health'
  | 'acute-care'
  | 'private-hospital'
  | 'care-home'
  | 'nursing-home'
  | 'supported-living'
  | 'domiciliary'
  | 'end-of-life'
  | 'learning-disabilities'
  | 'dementia-care'
  | 'paediatric'
  | 'community'
  | 'other';

type ShiftPreference = 'days' | 'nights' | 'weekends' | 'flexible';
```

### Colony Profile (formerly Client)
```typescript
interface ColonyProfile {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // COLONY#{colonyId}

  // Identity
  colonyId: string;               // UUID (was clientId)
  userId: string;                 // Cognito sub
  membershipId: string;           // Links to Membership

  // Organisation
  organisationName: string;
  organisationType: OrganisationType;
  cqcNumber?: string;

  // Contact
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone?: string;
  billingEmail?: string;

  // Address
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    county?: string;
    postcode?: string;
  };

  // Status
  status: 'pending_verification' | 'active' | 'suspended';

  // Metadata
  createdAt: string;
  updatedAt: string;

  // GSI
  GSI1PK: string;                 // TIER#colony
  GSI1SK: string;                 // COLONY#{colonyId}
}

type OrganisationType =
  | 'nhs-trust'
  | 'private-hospital'
  | 'care-home'
  | 'nursing-home'
  | 'supported-living'
  | 'mental-health-service'
  | 'recruitment-agency'
  | 'other';
```

## 2.2 Vault & Verification

### Vault Document (formerly Credential)
```typescript
interface VaultDocument {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // VAULT#{documentId}

  // Identity
  documentId: string;             // UUID
  candidateId: string;
  userId: string;

  // Document
  category: VaultCategory;
  documentName: string;           // User-provided name
  documentKey: string;            // S3 key
  fileType: 'pdf' | 'jpeg' | 'png';
  fileSize: number;               // Bytes

  // Dates
  issueDate?: string;             // ISO date
  expiryDate?: string;            // ISO date
  uploadedAt: string;

  // Verification
  status: VaultDocumentStatus;
  verificationPackId?: string;    // If verified via pack
  verifiedBy?: string;            // Admin ID
  verifiedAt?: string;
  rejectionReason?: string;

  // Extracted data (from verification)
  extractedData?: {
    certificateNumber?: string;
    issuingBody?: string;
    holderName?: string;
    [key: string]: unknown;
  };

  // Metadata
  updatedAt: string;

  // GSI
  GSI1PK: string;                 // CAND#{candidateId}
  GSI1SK: string;                 // VAULT#{documentId}
  GSI2PK: string;                 // STATUS#{status}
  GSI2SK: string;                 // VAULT#{documentId}
}

type VaultCategory =
  | 'id'
  | 'dbs'
  | 'right-to-work'
  | 'qualifications'
  | 'training'
  | 'occupational-health'
  | 'references'
  | 'cv'
  | 'professional-registration'
  | 'employment-history'
  | 'other';

type VaultDocumentStatus =
  | 'uploaded'
  | 'pending_review'
  | 'under_review'
  | 'verified'
  | 'rejected'
  | 'expired'
  | 'update_required';
```

### Verification Pack
```typescript
interface VerificationPack {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // PACK#{packId}

  // Identity
  packId: string;                 // UUID
  candidateId: string;
  userId: string;

  // Purchase
  packType: 'standard' | 'plus' | 'fast_track';
  price: number;                  // Pence
  stripePaymentIntentId: string;
  purchasedAt: string;

  // Review
  status: VerificationPackStatus;
  claimedBy?: string;             // Admin ID
  claimedAt?: string;
  completedAt?: string;

  // Documents reviewed
  documentsReviewed: string[];    // VaultDocument IDs
  badgesAwarded: string[];        // Badge IDs

  // Notes
  reviewNotes?: string;
  internalNotes?: string;

  // SLA
  slaDeadline: string;            // ISO datetime

  // Metadata
  updatedAt: string;

  // GSI
  GSI1PK: string;                 // CAND#{candidateId}
  GSI1SK: string;                 // PACK#{packId}
  GSI2PK: string;                 // PACKSTATUS#{status}
  GSI2SK: string;                 // PACK#{packId}
}

type VerificationPackStatus =
  | 'pending'
  | 'claimed'
  | 'in_review'
  | 'awaiting_info'
  | 'completed'
  | 'refunded';
```

## 2.3 Passport & Badges

### Passport
```typescript
interface Passport {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // PASSPORT#{passportId}

  // Identity
  passportId: string;             // UUID
  candidateId: string;
  userId: string;

  // Public access
  publicId: string;               // Short URL-safe ID
  qrCodeDataUrl?: string;         // Base64 QR image (cached)
  publicUrl: string;              // /passport/verify/{publicId}

  // Status
  complianceStatus: 'not_ready' | 'partial' | 'ready';
  lastUpdated: string;

  // Badge summary (denormalised for fast read)
  badgeSummary: {
    membershipBadge: string;      // 'hive'
    verificationBadges: string[]; // ['id_verified', 'dbs_verified', ...]
    expiringBadges: string[];     // Badges expiring within 30 days
  };

  // Document summary (denormalised)
  documentSummary: {
    total: number;
    verified: number;
    pending: number;
    expired: number;
  };

  // GSI
  GSI1PK: string;                 // CAND#{candidateId}
  GSI1SK: string;                 // PASSPORT#{passportId}
  GSI2PK: string;                 // PUBLICID#{publicId}
  GSI2SK: string;                 // PASSPORT#{passportId}
}
```

### Badge
```typescript
interface Badge {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // BADGE#{badgeId}

  // Identity
  badgeId: string;                // UUID
  candidateId: string;
  userId: string;

  // Badge details
  badgeType: BadgeType;
  badgeName: BadgeName;
  displayName: string;            // Human-readable

  // Source
  source: 'system' | 'verification_pack';
  verificationPackId?: string;    // If from pack

  // Validity
  awardedAt: string;
  expiresAt?: string;             // Null for non-expiring
  status: 'active' | 'expired' | 'revoked';
  revokedReason?: string;

  // GSI
  GSI1PK: string;                 // CAND#{candidateId}
  GSI1SK: string;                 // BADGE#{badgeId}
}

type BadgeType = 'membership' | 'verification' | 'status';

type BadgeName =
  // Membership badges
  | 'cell_member'
  | 'hive_member'
  // Verification badges
  | 'verified_profile'
  | 'passport_ready'
  | 'id_verified'
  | 'dbs_verified'
  | 'rtw_verified'
  | 'qualifications_verified'
  | 'training_verified'
  | 'professional_registration_verified'
  // Status badges (system-generated)
  | 'expiring_soon'
  | 'update_required';
```

## 2.4 Colony Features

### Shortlist
```typescript
interface Shortlist {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // SHORTLIST#{shortlistId}

  // Identity
  shortlistId: string;            // UUID
  colonyId: string;
  userId: string;

  // Details
  name: string;
  description?: string;
  candidateCount: number;         // Denormalised

  // Metadata
  createdAt: string;
  updatedAt: string;

  // GSI
  GSI1PK: string;                 // COLONY#{colonyId}
  GSI1SK: string;                 // SHORTLIST#{shortlistId}
}

interface ShortlistItem {
  // Keys
  PK: string;                     // SHORTLIST#{shortlistId}
  SK: string;                     // CAND#{candidateId}

  // Identity
  shortlistId: string;
  candidateId: string;
  colonyId: string;

  // Denormalised candidate data
  candidateName: string;
  candidateTitle: string;
  membershipTier: 'cell' | 'hive';
  hasPassport: boolean;

  // Metadata
  addedAt: string;
  addedBy: string;                // User ID
  notes?: string;
}
```

### Introduction Request (if credit-based model kept)
```typescript
interface IntroductionRequest {
  // Keys
  PK: string;                     // TENANT#MEDIBEE
  SK: string;                     // INTRO#{introId}

  // Identity
  introId: string;
  colonyId: string;
  candidateId: string;

  // Request
  message: string;
  requestedAt: string;
  requestedBy: string;            // User ID

  // Status
  status: IntroductionStatus;
  statusUpdatedAt: string;
  statusUpdatedBy?: string;

  // Facilitation
  facilitatedBy?: string;         // Admin ID
  facilitationNotes?: string;
  outcomeNotes?: string;

  // GSI
  GSI1PK: string;                 // COLONY#{colonyId}
  GSI1SK: string;                 // INTRO#{introId}
  GSI2PK: string;                 // CAND#{candidateId}
  GSI2SK: string;                 // INTRO#{introId}
  GSI3PK: string;                 // INTROSTATUS#{status}
  GSI3SK: string;                 // INTRO#{introId}
}

type IntroductionStatus =
  | 'pending'
  | 'accepted'
  | 'facilitating'
  | 'connected'
  | 'declined'
  | 'expired'
  | 'cancelled';
```

---

# 3. DYNAMODB TABLE DESIGN

## 3.1 Main Table

**Table Name:** `medibee-{env}`

| Attribute | Type | Description |
|-----------|------|-------------|
| PK | String | Partition key |
| SK | String | Sort key |
| GSI1PK | String | GSI1 partition key |
| GSI1SK | String | GSI1 sort key |
| GSI2PK | String | GSI2 partition key |
| GSI2SK | String | GSI2 sort key |
| GSI3PK | String | GSI3 partition key (optional) |
| GSI3SK | String | GSI3 sort key (optional) |
| data | Map | Entity-specific data |

## 3.2 Access Patterns

| Access Pattern | Keys | Index |
|----------------|------|-------|
| Get candidate by ID | PK=TENANT#MEDIBEE, SK=CAND#{id} | Main |
| Get colony by ID | PK=TENANT#MEDIBEE, SK=COLONY#{id} | Main |
| List candidates by tier | GSI1PK=TIER#{tier} | GSI1 |
| List documents by candidate | GSI1PK=CAND#{id}, begins_with(GSI1SK, VAULT#) | GSI1 |
| List badges by candidate | GSI1PK=CAND#{id}, begins_with(GSI1SK, BADGE#) | GSI1 |
| Get passport by public ID | GSI2PK=PUBLICID#{id} | GSI2 |
| List pending verification packs | GSI2PK=PACKSTATUS#pending | GSI2 |
| List shortlists by colony | GSI1PK=COLONY#{id}, begins_with(GSI1SK, SHORTLIST#) | GSI1 |

## 3.3 GSI Definitions

### GSI1 (Entity by Owner)
- **Purpose:** Query entities by owner (candidate documents, badges, etc.)
- **PK:** GSI1PK (e.g., CAND#{id}, COLONY#{id}, TIER#{tier})
- **SK:** GSI1SK (entity key)

### GSI2 (Status/Public Lookup)
- **Purpose:** Query by status, public ID lookup
- **PK:** GSI2PK (e.g., STATUS#{status}, PUBLICID#{id})
- **SK:** GSI2SK (entity key)

### GSI3 (Optional - Introduction Status)
- **Purpose:** Query introductions by status
- **PK:** GSI3PK (e.g., INTROSTATUS#{status})
- **SK:** GSI3SK (entity key)

---

# 4. S3 BUCKET STRUCTURE

## 4.1 Vault Bucket

**Bucket Name:** `medibee-vault-{env}`

```
medibee-vault-{env}/
├── candidates/
│   └── {candidateId}/
│       ├── id/
│       │   └── {documentId}.pdf
│       ├── dbs/
│       │   └── {documentId}.pdf
│       ├── right-to-work/
│       │   └── {documentId}.pdf
│       ├── qualifications/
│       │   └── {documentId}.pdf
│       ├── training/
│       │   └── {documentId}.pdf
│       └── other/
│           └── {documentId}.pdf
└── temp/
    └── {uploadId}/              # Temporary upload location
```

## 4.2 Profile Images Bucket

**Bucket Name:** `medibee-profiles-{env}`

```
medibee-profiles-{env}/
├── candidates/
│   └── {candidateId}/
│       └── profile.jpg
└── colonies/
    └── {colonyId}/
        └── logo.png
```

---

# 5. MIGRATION MAPPING

## 5.1 Entity Renames

| Old Name | New Name |
|----------|----------|
| Credential | VaultDocument |
| Client | Colony |
| ClientProfile | ColonyProfile |
| clientId | colonyId |
| credentialId | documentId |

## 5.2 New Entities

| Entity | Previously |
|--------|------------|
| Membership | Did not exist |
| Passport | Did not exist |
| Badge | Partial (simple status) |
| VerificationPack | Did not exist |

## 5.3 Migration Script Pseudocode

```typescript
async function migrateToV2() {
  // 1. Migrate candidates
  const candidates = await getAllCandidates();
  for (const candidate of candidates) {
    // Create membership
    const hasCredentials = await hasAnyCredentials(candidate.candidateId);
    const tier = hasCredentials ? 'hive' : 'cell'; // Grandfather with credentials

    await createMembership({
      userId: candidate.userId,
      tier,
      status: tier === 'hive' ? 'active' : 'none',
    });

    // Update candidate with membership link
    await updateCandidate(candidate.candidateId, {
      membershipId: membership.membershipId,
      vaultEnabled: tier === 'hive',
    });

    // Create passport for Hive members
    if (tier === 'hive') {
      await createPassport(candidate.candidateId);
    }

    // Award membership badge
    await createBadge({
      candidateId: candidate.candidateId,
      badgeName: tier === 'hive' ? 'hive_member' : 'cell_member',
      source: 'system',
    });
  }

  // 2. Migrate credentials → vault documents
  const credentials = await getAllCredentials();
  for (const credential of credentials) {
    await migrateCredentialToVaultDocument(credential);
  }

  // 3. Migrate clients → colonies
  const clients = await getAllClients();
  for (const client of clients) {
    await migrateClientToColony(client);
  }
}
```

---

# 6. API ENDPOINT MAPPING

## 6.1 Renamed Endpoints

| Old Endpoint | New Endpoint |
|--------------|--------------|
| POST /clients/register | POST /colony/register |
| GET /clients/{id} | GET /colony/{id} |
| PUT /clients/{id} | PUT /colony/{id} |
| GET /clients/candidates | GET /colony/search |
| GET /candidates/{id}/credentials | GET /members/{id}/vault |
| POST /candidates/{id}/credentials | POST /members/{id}/vault |

## 6.2 New Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /members/{id}/passport | GET | Get passport |
| /members/{id}/badges | GET | List badges |
| /passport/verify/{publicId} | GET | Public verification |
| /verification/purchase | POST | Buy verification pack |
| /verification/{packId} | GET | Get pack status |
| /admin/verification/queue | GET | List pending packs |
| /admin/verification/{packId}/claim | POST | Claim for review |
| /admin/verification/{packId}/complete | POST | Complete review |

---

*Document ends. This data model should be reviewed with backend team before implementation.*
