# MEDIBEE IMPLEMENTATION IMPACT ASSESSMENT
## Cell / Hive / Colony Migration

**Document Owner:** CTO/CPO
**Date:** 22 March 2026
**Version:** 1.1
**Status:** ✅ READY FOR DEVELOPMENT

**Related Documents:**
- [TECHNICAL_ARCHITECTURE_DDD_TDD.md](./TECHNICAL_ARCHITECTURE_DDD_TDD.md) - TDD/DDD/Hexagonal implementation
- [DECISIONS_LOG.md](./DECISIONS_LOG.md) - All stakeholder decisions

---

# 1. EXECUTIVE SUMMARY

This document assesses the implementation impact of migrating from the current Talent Showcase model to the Cell/Hive/Colony model.

**Key Finding:** This is a **significant architectural change** requiring:
- New subscription system for candidates
- Feature gating based on membership tier
- New Passport feature (doesn't exist)
- New Verification Pack workflow
- Modified badge system
- Updated search/discovery logic

**Estimated Effort:** 8-12 weeks (depending on team size)

---

# 2. CURRENT STATE ANALYSIS

## 2.1 What Exists (Built)

### Backend (`medibee-serverless-api`)
| Component | Status | Reusable? |
|-----------|--------|-----------|
| CDK Infrastructure | ✅ Built | Yes |
| API Gateway | ✅ Built | Yes |
| DynamoDB (single-table) | ✅ Built | Modify |
| S3 Credentials Bucket | ✅ Built | Rename to Vault |
| Cognito User Pool | ✅ Built | Yes |
| Auth Handler | ✅ Built | Modify |
| Candidates Handler | ✅ Built | Significant changes |
| Clients Handler | ✅ Built | Rename to Colony |
| Admin Handler | ✅ Built | Add verification queue |

### Frontend (`Medibee-Website`)
| Component | Status | Reusable? |
|-----------|--------|-----------|
| Marketing pages | ✅ Built | Update messaging |
| Component library | ✅ Built | Yes |
| Auth UI | ✅ Built | Add tier selection |
| Candidate dashboard | ✅ Built | Significant changes |
| Candidate profile | ✅ Built | Tier-gate features |
| Credential Wallet | ✅ Built | Rename/gate as Vault |
| Client dashboard | ✅ Built | Rename to Colony |
| Client browse | ✅ Built | Add tier indicators |
| Admin dashboard | ✅ Built | Add verification queue |

## 2.2 What Doesn't Exist (Must Build)

| Feature | Effort | Priority |
|---------|--------|----------|
| Passport page | High | P0 |
| Passport QR system | Medium | P0 |
| Verification Pack checkout | High | P0 |
| Verification review queue | High | P0 |
| Badge system (enhanced) | Medium | P0 |
| Subscription for candidates (Hive) | High | P0 |
| Tier-based feature gating | Medium | P0 |
| Cell/Hive profile differentiation | Medium | P0 |

---

# 3. BACKEND IMPACT ANALYSIS

## 3.1 Data Model Changes

### New Entities Required

```
┌─────────────────────────────────────────────────────────────────┐
│                     NEW DATA ENTITIES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MEMBERSHIP (New)           VERIFICATION_PACK (New)              │
│  ───────────────            ─────────────────────                │
│  • membershipId             • packId                             │
│  • userId                   • userId                             │
│  • tier (cell/hive/colony)  • purchaseDate                       │
│  • status                   • status (pending/reviewing/done)    │
│  • stripeSubscriptionId     • reviewerId                         │
│  • startDate                • completedDate                      │
│  • currentPeriodEnd         • badgesAwarded[]                    │
│                                                                  │
│  PASSPORT (New)             BADGE (Enhanced)                     │
│  ──────────────             ──────────────────                   │
│  • passportId               • badgeId                            │
│  • userId                   • userId                             │
│  • qrCode                   • type (membership/verification)     │
│  • publicUrl                • name                               │
│  • lastUpdated              • awardedDate                        │
│  • complianceStatus         • expiryDate                         │
│  • badges[]                 • source (system/verification_pack)  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Modified Entities

```typescript
// MODIFIED: CandidateProfile
interface CandidateProfile {
  // Existing fields...

  // NEW FIELDS
  membershipTier: 'cell' | 'hive';        // NEW
  membershipStatus: 'active' | 'lapsed';   // NEW
  passportId?: string;                     // NEW (Hive only)
  badges: Badge[];                         // ENHANCED

  // RENAMED
  vaultEnabled: boolean;                   // Was implicit via credentials
}

// RENAMED: ClientProfile → ColonyProfile
interface ColonyProfile {
  colonyId: string;                        // Was clientId
  // Rest similar...
  membershipTier: 'colony';                // NEW (for consistency)
}

// RENAMED: Credential → VaultDocument
interface VaultDocument {
  documentId: string;                      // Was credentialId
  // Rest similar, add:
  reviewedInPackId?: string;               // Links to Verification Pack
}
```

## 3.2 DynamoDB Schema Changes

### Current Schema (Single Table)

```
PK                      SK                    Data
────────────────────────────────────────────────────
TENANT#MEDIBEE         CAND#{id}             Candidate profile
TENANT#MEDIBEE         CLIENT#{id}           Client profile
TENANT#MEDIBEE         CRED#{id}             Credential
TENANT#MEDIBEE         INTRO#{id}            Introduction
```

### New Schema (Single Table)

```
PK                      SK                    GSI1PK              GSI1SK
─────────────────────────────────────────────────────────────────────────
TENANT#MEDIBEE         CAND#{id}             TIER#cell           CAND#{id}
TENANT#MEDIBEE         CAND#{id}             TIER#hive           CAND#{id}
TENANT#MEDIBEE         COLONY#{id}           TIER#colony         COLONY#{id}
TENANT#MEDIBEE         VAULT#{id}            CAND#{candId}       VAULT#{id}
TENANT#MEDIBEE         BADGE#{id}            CAND#{candId}       BADGE#{id}
TENANT#MEDIBEE         PASSPORT#{id}         CAND#{candId}       PASSPORT#{id}
TENANT#MEDIBEE         PACK#{id}             CAND#{candId}       PACK#{id}
TENANT#MEDIBEE         MEMBERSHIP#{id}       USER#{userId}       MEMBERSHIP#{id}
```

### New GSIs Required

| GSI | Purpose | PK | SK |
|-----|---------|----|----|
| GSI-TIER | Query by membership tier | TIER#{tier} | Entity key |
| GSI-USER | Query by user across entities | USER#{userId} | Entity key |
| GSI-STATUS | Query by status (pending reviews) | STATUS#{status} | Entity key |

## 3.3 Lambda Handler Changes

### Auth Handler
| Change | Effort |
|--------|--------|
| Add tier selection to registration | Low |
| Create membership record on sign-up | Medium |
| Validate tier in token claims | Low |

### Candidates Handler → Member Handler
| Change | Effort |
|--------|--------|
| Rename to "members" or keep as "candidates" | Low |
| Add tier-based feature gating | Medium |
| Add Vault endpoints (enhanced credentials) | Medium |
| Add Passport endpoints | High |
| Add badge management | Medium |

### Clients Handler → Colony Handler
| Change | Effort |
|--------|--------|
| Rename to "colony" | Low |
| Update search to show tier indicators | Medium |
| Update profile viewing (tier-differentiated) | Medium |

### NEW: Verification Handler
| Endpoint | Effort |
|----------|--------|
| POST /verification/purchase | High |
| GET /verification/status | Low |
| POST /admin/verification/claim | Medium |
| POST /admin/verification/complete | Medium |

### NEW: Passport Handler
| Endpoint | Effort |
|----------|--------|
| GET /passport/{id} | Medium |
| GET /passport/{id}/verify (public) | Medium |
| POST /passport/generate-qr | Medium |

## 3.4 Stripe Integration Changes

### Current
- Client subscriptions only (Bronze/Silver/Gold)
- Credit-based system

### New
- Candidate subscriptions (Hive)
- Employer subscriptions (Colony)
- One-off purchases (Verification Pack)

### Required Stripe Products

```javascript
const stripeProducts = {
  // Subscriptions
  HIVE_MONTHLY: { price: 499, interval: 'month' },      // £4.99
  COLONY_MONTHLY: { price: 4999, interval: 'month' },   // £49.99

  // One-off
  VERIFICATION_PACK: { price: 2900 },                   // £29
  VERIFICATION_PACK_PLUS: { price: 4900 },              // £49
  FAST_TRACK_ADDON: { price: 1500 },                    // £15
};
```

### Webhook Events to Handle

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create membership, award badges |
| `invoice.paid` | Renew membership period |
| `invoice.payment_failed` | Mark membership as past_due |
| `customer.subscription.deleted` | Downgrade to Cell |

---

# 4. FRONTEND IMPACT ANALYSIS

## 4.1 Page Changes

### Marketing Site
| Page | Change | Effort |
|------|--------|--------|
| Home | Update messaging, add tier CTAs | Medium |
| Pricing | New page with Cell/Hive/Colony comparison | High |
| Work With Us | Update to mention Hive benefits | Low |
| Services | Update for Colony positioning | Low |

### Candidate Portal
| Page | Change | Effort |
|------|--------|--------|
| Registration | Add tier selection step | Medium |
| Dashboard | Tier-aware widgets, upgrade prompts | High |
| Profile | Feature gating by tier | Medium |
| Credentials → Vault | Rename, gate for Hive | Medium |
| Passport (NEW) | Entirely new page | High |
| Settings | Subscription management | Medium |

### Colony Portal (was Client)
| Page | Change | Effort |
|------|--------|--------|
| Registration | Rename, update flow | Low |
| Dashboard | Rename, update branding | Low |
| Browse Candidates | Add tier indicators, filters | Medium |
| Candidate Detail | Show tier, Passport link | Medium |
| Shortlists | No major changes | Low |

### Admin Portal
| Page | Change | Effort |
|------|--------|--------|
| Verification Queue (NEW) | New page for pack reviews | High |
| User Management | Show membership tiers | Medium |
| Analytics | Add tier metrics | Medium |

## 4.2 Component Changes

### New Components Required
| Component | Description | Effort |
|-----------|-------------|--------|
| `MembershipBadge` | Shows Cell/Hive/Colony badge | Low |
| `TierGate` | Conditionally renders based on tier | Medium |
| `UpgradePrompt` | CTA to upgrade from Cell to Hive | Medium |
| `PassportCard` | Passport summary card | Medium |
| `PassportPage` | Full Passport view | High |
| `QRCode` | QR code generator/display | Low |
| `VerificationStatus` | Badge status in verification | Medium |
| `PricingTable` | Tier comparison table | Medium |

### Modified Components
| Component | Change | Effort |
|-----------|--------|--------|
| `CredentialCard` → `VaultDocumentCard` | Rename, add pack linking | Low |
| `IdentityHero` | Add membership badge, tier | Low |
| `ProfileCompletionRing` | Tier-aware completion | Medium |
| `StatusBadge` | Support new badge types | Low |

## 4.3 Auth Context Changes

```typescript
// CURRENT
type AuthState =
  | { status: 'authenticated'; userType: 'candidate'; ... }
  | { status: 'authenticated'; userType: 'client'; ... }

// NEW
type AuthState =
  | { status: 'authenticated'; userType: 'candidate'; tier: 'cell' | 'hive'; ... }
  | { status: 'authenticated'; userType: 'colony'; ... }
```

---

# 5. MIGRATION STRATEGY

## 5.1 Data Migration

### Candidate Data
```
Current Candidate → Cell (default) or Hive (if has credentials)

Migration Script:
1. For each candidate:
   a. If has credentials: Migrate to Hive (grandfathered?)
   b. Else: Migrate to Cell
2. Create Membership record
3. Rename Credential → VaultDocument
4. Generate Passport (for Hive)
```

### Client Data
```
Current Client → Colony

Migration Script:
1. For each client:
   a. Create Colony membership
   b. Migrate subscription (or honour existing)
2. Rename Client → Colony throughout
```

## 5.2 Feature Rollout Strategy

### Option A: Big Bang
- Build everything, switch over in one release
- Risk: High (breaking changes)
- Effort: Lower (no parallel systems)

### Option B: Gradual (Recommended)
1. **Phase 1:** Backend changes, feature flags
2. **Phase 2:** New user registration with tiers
3. **Phase 3:** Existing user migration
4. **Phase 4:** Full feature enablement

### Option C: Parallel Systems
- Run old and new simultaneously
- Risk: Medium (complexity)
- Effort: Highest (two systems)

**Recommendation:** Option B (Gradual) with feature flags

## 5.3 Feature Flags Required

| Flag | Purpose |
|------|---------|
| `ENABLE_TIERS` | Enable Cell/Hive/Colony tiers |
| `ENABLE_VAULT` | Enable Vault (replaces Credentials) |
| `ENABLE_PASSPORT` | Enable Passport feature |
| `ENABLE_VERIFICATION_PACK` | Enable pack purchase |
| `MIGRATE_EXISTING_USERS` | Trigger migration for existing |

---

# 6. EFFORT ESTIMATES

## 6.1 Backend Effort

| Task | Days | Confidence |
|------|------|------------|
| Data model changes | 3 | High |
| Auth handler updates | 2 | High |
| Membership system | 5 | Medium |
| Vault (credentials rename + enhance) | 3 | High |
| Passport feature | 5 | Medium |
| Badge system | 3 | High |
| Verification Pack workflow | 5 | Medium |
| Stripe integration | 5 | Medium |
| Colony handler (client rename) | 2 | High |
| Admin verification queue | 3 | Medium |
| Migration scripts | 3 | Medium |
| Testing | 5 | High |
| **Backend Total** | **44 days** | |

## 6.2 Frontend Effort

| Task | Days | Confidence |
|------|------|------------|
| Registration flow update | 3 | High |
| Dashboard tier awareness | 3 | Medium |
| Profile feature gating | 3 | High |
| Vault UI (credentials rename) | 2 | High |
| Passport page | 5 | Medium |
| Passport QR | 2 | High |
| Colony renaming | 2 | High |
| Search tier indicators | 2 | High |
| Pricing page | 3 | Medium |
| Subscription management | 3 | Medium |
| Admin verification queue | 4 | Medium |
| Component updates | 3 | High |
| Marketing page updates | 2 | High |
| Testing | 5 | High |
| **Frontend Total** | **42 days** | |

## 6.3 Total Effort

| Category | Days | Weeks (1 dev) | Weeks (2 devs) |
|----------|------|---------------|----------------|
| Backend | 44 | 8.8 | 4.4 |
| Frontend | 42 | 8.4 | 4.2 |
| **Total** | **86** | **17.2** | **8.6** |

**With buffer (20%):** ~10-12 weeks with 2 developers

---

# 7. RISKS & MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Existing user churn | High | High | Grandfathering, communication |
| Data migration issues | Medium | High | Thorough testing, rollback plan |
| Stripe integration complexity | Medium | Medium | Follow Stripe best practices |
| Feature flag complexity | Medium | Medium | Clear flag management |
| Scope creep | High | High | Strict MVP definition |
| Legal compliance issues | Low | Critical | Legal review before launch |

---

# 8. DEPENDENCIES

| Dependency | Blocks | Owner |
|------------|--------|-------|
| Open questions resolved | All development | CEO/CPO |
| Legal review complete | Verification Pack | Legal |
| Stripe account configured | Payments | Finance |
| Partner perks defined | Hive marketing | Commercial |
| Verification partner selected | Verification Pack | COO |

---

# 9. RECOMMENDATIONS

1. **Resolve open questions FIRST** - No development until BQ-01 through BQ-05 are decided
2. **Use feature flags** - Enable gradual rollout and quick rollback
3. **Grandfather existing users** - Reduce churn risk (12-month grace period recommended)
4. **Start with new users** - Test tier system before migrating existing
5. **Prioritise Passport** - Core differentiator, build early
6. **Outsource verification** - Don't build internal ops team initially

---

*Document ends. This assessment should be reviewed with engineering team for validation.*
