# ADR-003: Credential Document Storage & Verification

**Status:** APPROVED (19 March 2026)
**Date:** 19 March 2026
**Decision Makers:** CTO, CPO/COO, Compliance Lead
**Context:** Medibee Talent Showcase Platform

---

## Context

The Credential Wallet feature requires storing sensitive documents:
- DBS certificates
- Right to work documentation (passport, visa, etc.)
- Training certificates
- Immunisation records

These documents contain personal information and must be handled according to GDPR and UK data protection law.

## Decision Drivers

1. **Security:** Documents contain sensitive PII
2. **Compliance:** GDPR, UK DPA 2018
3. **Accessibility:** Documents must be viewable by authorised parties
4. **Verification:** Documents need to be verified as authentic
5. **Retention:** Clear retention and deletion policies
6. **Cost:** Storage and verification costs

## Options Considered

### Option A: S3 with Server-Side Encryption

Store documents in S3 with SSE-S3 (Amazon-managed keys).

```
s3://medibee-credentials-{env}/
├── candidates/
│   └── {candidateId}/
│       ├── dbs/{documentId}.pdf
│       ├── rtw/{documentId}.pdf
│       └── training/{documentId}.pdf
```

**Pros:**
- Simple implementation
- Low cost
- Standard AWS security
- Encryption at rest

**Cons:**
- AWS manages keys
- Basic encryption model
- No additional compliance features

**Cost:** ~£0.023/GB/month

### Option B: S3 with KMS Customer-Managed Keys

Store documents in S3 with SSE-KMS using customer-managed keys.

**Pros:**
- Full control over encryption keys
- Key rotation capability
- Audit trail via CloudTrail
- Meet stricter compliance requirements

**Cons:**
- Additional complexity
- KMS costs
- Key management responsibility

**Cost:** ~£0.023/GB + £1/key/month + API calls

### Option C: Third-Party Vault (Onfido, Yoti)

Use a dedicated identity verification service.

**Pros:**
- Purpose-built for ID documents
- Automated verification
- Compliance certifications
- Fraud detection

**Cons:**
- High cost
- Vendor dependency
- Data leaves your infrastructure

**Cost:** £1-3 per verification + storage fees

## Decision

**Option B: S3 with KMS Customer-Managed Keys (Recommended)**

With phased verification approach:
1. **Phase 1:** Manual admin verification
2. **Phase 2:** Automated OCR extraction + admin review
3. **Phase 3:** Third-party verification for high-risk documents

### Implementation Details

#### Storage Structure

```
s3://medibee-credentials-{env}/
├── candidates/
│   └── {candidateId}/
│       ├── dbs/
│       │   └── {uuid}.pdf  # Original document
│       ├── rtw/
│       │   └── {uuid}.pdf
│       └── training/
│           └── {uuid}.pdf
└── metadata/  # Optional: extracted data
```

#### Encryption Configuration

```typescript
const credentialsBucket = new s3.Bucket(this, 'CredentialsBucket', {
  bucketName: `medibee-credentials-${environment}`,
  encryption: s3.BucketEncryption.KMS,
  encryptionKey: credentialsKey,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  versioned: true,
  lifecycleRules: [
    {
      // Move to IA after 90 days
      transitions: [
        {
          storageClass: s3.StorageClass.INFREQUENT_ACCESS,
          transitionAfter: Duration.days(90),
        },
      ],
    },
  ],
});
```

#### Access Pattern

```typescript
// Generate pre-signed URL for upload
const uploadUrl = await s3.getSignedUrl('putObject', {
  Bucket: 'medibee-credentials-prod',
  Key: `candidates/${candidateId}/dbs/${uuid}.pdf`,
  ContentType: 'application/pdf',
  Expires: 300, // 5 minutes
});

// Generate pre-signed URL for viewing (admin/verified only)
const viewUrl = await s3.getSignedUrl('getObject', {
  Bucket: 'medibee-credentials-prod',
  Key: `candidates/${candidateId}/dbs/${uuid}.pdf`,
  Expires: 3600, // 1 hour
});
```

## Verification Model

### Verification States

| State | Description | Display |
|-------|-------------|---------|
| `uploaded` | Document uploaded, not reviewed | ⏳ Pending Review |
| `reviewing` | Admin is reviewing | 🔍 Under Review |
| `verified` | Admin verified authentic | ✅ Verified |
| `rejected` | Admin rejected (reason provided) | ❌ Rejected |
| `expired` | Document validity expired | ⚠️ Expired |

### Verification Workflow

```
Candidate uploads document
        │
        ▼
┌─────────────────┐
│   uploaded      │
└─────────────────┘
        │
        ▼ (Admin claims task)
┌─────────────────┐
│   reviewing     │
└─────────────────┘
        │
    ┌───┴───┐
    ▼       ▼
┌────────┐ ┌────────┐
│verified│ │rejected│
└────────┘ └────────┘
    │
    ▼ (time passes)
┌─────────────────┐
│   expired       │
└─────────────────┘
```

### Data Model

```typescript
interface Credential {
  credentialId: string;           // CRED#{uuid}
  candidateId: string;            // CAND#{uuid}
  type: 'dbs' | 'rtw' | 'training' | 'immunisation';
  documentKey: string;            // S3 key
  status: 'uploaded' | 'reviewing' | 'verified' | 'rejected' | 'expired';

  // Extracted/verified data
  issueDate?: string;             // ISO date
  expiryDate?: string;            // ISO date
  certificateNumber?: string;     // For DBS
  issuingBody?: string;

  // Verification details
  verifiedBy?: string;            // Admin ID
  verifiedAt?: string;
  rejectionReason?: string;

  // Metadata
  uploadedAt: string;
  updatedAt: string;
}
```

## Retention Policy

| Document Type | Retention Period | Basis |
|---------------|------------------|-------|
| DBS Certificate | Until expiry + 1 year | Business need |
| Right to Work | Until candidate deletes account | GDPR |
| Training Certificates | Until expiry + 1 year | Business need |
| Immunisation Records | 5 years after upload | Healthcare standard |

### Deletion Process

1. **Candidate Request:** GDPR deletion request
2. **Account Deletion:** All documents deleted with account
3. **Expired Documents:** Flagged but not auto-deleted
4. **Retention Expiry:** Auto-archived after retention period

## Security Controls

1. **Access Control:**
   - Candidates: Own documents only
   - Admins: All documents (audit logged)
   - Providers: Never see documents (only verification status)

2. **Audit Logging:**
   - All uploads logged
   - All views logged
   - All verification actions logged

3. **Bucket Policy:**
   - Block all public access
   - Require SSL
   - VPC endpoint only (if applicable)

## Consequences

### Positive
- Strong encryption with key control
- Clear audit trail
- GDPR compliant
- Cost-effective at scale

### Negative
- Manual verification initially (admin time)
- KMS key management
- No automated fraud detection (Phase 1)

### Mitigations
- Build efficient admin verification UI
- Document key rotation procedures
- Plan for Phase 2 OCR automation

## Related Documents

- [Product Backlog](../PRODUCT_BACKLOG_V1.md) - FO-101: Credential Wallet
- [Open Questions](../OPEN_QUESTIONS.md) - OQ-003: Credential Storage
- [ADR-001](ADR-001-BACKEND-ARCHITECTURE.md) - Backend Architecture

---

*This ADR will be updated when a decision is made.*
