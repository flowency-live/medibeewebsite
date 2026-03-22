# MEDIBEE STRATEGIC PIVOT ANALYSIS
## From Talent Showcase to Cell/Hive/Colony Model

**Document Owner:** CPO/COO
**Date:** 22 March 2026
**Version:** 1.0
**Classification:** Strategic

---

# EXECUTIVE SUMMARY

This document analyses the strategic pivot from Medibee's current "Talent Showcase" model to the new "Cell/Hive/Colony" membership model. This is a **fundamental business model change** that affects:

- Revenue structure (both sides of marketplace can now pay)
- Product architecture (new Vault, Passport, Badge systems)
- User segmentation (tiered membership vs flat access)
- Competitive positioning (professional identity platform vs job board)

**Key Finding:** This pivot transforms Medibee from a B2B-focused recruitment platform into a B2C+B2B professional identity and trust platform.

---

# 1. MODEL COMPARISON

## 1.1 Previous Model (Talent Showcase)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        TALENT SHOWCASE MODEL                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CANDIDATES (HCAs)                    CLIENTS (Care Providers)           │
│  ─────────────────                    ────────────────────────           │
│  Price: FREE                          Price: £99-£499/month              │
│                                                                          │
│  Features:                            Features:                          │
│  • Full profile                       • Browse candidates                │
│  • Credential wallet                  • Shortlists                       │
│  • Availability toggle                • Contact credits                  │
│  • All features equal                 • Tiered by credits                │
│                                                                          │
│  Value Prop:                          Value Prop:                        │
│  "Free exposure to employers"         "Pay to access talent pool"        │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  REVENUE MODEL:                                                          │
│  • 100% from Clients (subscription + credits)                            │
│  • Bronze £99 (5 credits) / Silver £249 (20) / Gold £499 (unlimited)    │
│  • Introduction = Credit deduction                                       │
└─────────────────────────────────────────────────────────────────────────┘
```

## 1.2 New Model (Cell/Hive/Colony)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CELL / HIVE / COLONY MODEL                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CELL (Basic)           HIVE (Premium)          COLONY (Employers)       │
│  ────────────           ──────────────          ─────────────────        │
│  Price: FREE            Price: £4.99/month      Price: £49.99/month      │
│                                                                          │
│  Features:              Features:               Features:                │
│  • Basic profile        • Everything in Cell    • Search & filter        │
│  • Photo, headline      • Vault (doc storage)   • View all profiles      │
│  • Basic visibility     • Passport (QR verify)  • Shortlist tools        │
│  • Searchable           • Verification workflow • See Cell vs Hive       │
│                         • Badges (earned)       • Recruiter dashboard    │
│                         • Expiry reminders      • Verification viewing   │
│                         • Partner perks         │                        │
│                         • Wellbeing benefits    │                        │
│                                                                          │
│  + VERIFICATION PACK    │                                                │
│  ──────────────────     │                                                │
│  Price: £29 one-off     │                                                │
│  • Document review      │                                                │
│  • Badge outcomes       │                                                │
│  • Passport population  │                                                │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  REVENUE MODEL:                                                          │
│  • Hive subscriptions (£4.99/month × candidates)                         │
│  • Verification Packs (£29 one-off × candidates)                         │
│  • Colony subscriptions (£49.99/month × employers)                       │
│  • 3 revenue streams vs 1 previously                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

## 1.3 Key Differences Summary

| Dimension | Previous (Talent Showcase) | New (Cell/Hive/Colony) |
|-----------|---------------------------|------------------------|
| **Candidate pricing** | Free | Free (Cell) or £4.99/mo (Hive) |
| **Employer pricing** | £99-499/month | £49.99/month |
| **Revenue sources** | 1 (Clients only) | 3 (Hive + Pack + Colony) |
| **Candidate differentiation** | By profile completeness | By membership tier + badges |
| **Verification model** | Admin-verified (free) | Paid Verification Pack (£29) |
| **Document storage** | Credential Wallet (free) | Vault (Hive only) |
| **Trust signalling** | Basic badges | Structured Passport + earned badges |
| **Contact mechanism** | Credit-based introductions | TBD (see Open Questions) |
| **Target market focus** | B2B (employers pay) | B2C+B2B (both pay) |

---

# 2. STRATEGIC IMPLICATIONS

## 2.1 Revenue Model Impact

### Previous Model Revenue Projection (Annual)
```
10 Bronze clients × £99/mo × 12   = £11,880
5 Silver clients × £249/mo × 12   = £14,940
2 Gold clients × £499/mo × 12     = £11,976
───────────────────────────────────────────
Total Annual Revenue              = £38,796
```

### New Model Revenue Projection (Annual)
```
1,000 Hive members × £4.99/mo × 12        = £59,880
500 Verification Packs × £29              = £14,500
50 Colony members × £49.99/mo × 12        = £29,994
───────────────────────────────────────────────────
Total Annual Revenue                      = £104,374
```

**Key Insight:** The new model has **2.7x revenue potential** but requires **20x more candidate conversions** to achieve it. This fundamentally changes the growth strategy from B2B sales to B2C conversion optimization.

## 2.2 Market Positioning Shift

### Previous Position
> "A verified talent marketplace where care providers find healthcare assistants"

**Competitor Set:** Indeed, Reed, NHS Jobs, Healthcare recruitment agencies

### New Position
> "A professional identity and verification platform for healthcare workers"

**Competitor Set:** LinkedIn, DocLibrary, CredCheck, professional registries

**Strategic Implication:** The new model positions Medibee closer to a "professional credential wallet" than a recruitment platform. This is more defensible but requires different go-to-market.

## 2.3 Network Effects Analysis

| Model | Primary Network Effect | Secondary Effect |
|-------|----------------------|------------------|
| Previous | More candidates → More employers → More candidates | Weak (commodity talent pool) |
| New | More Hive members → Stronger trust signal → More Colony interest → More Hive upgrades | Strong (verification density creates moat) |

**The new model creates stronger network effects** because:
1. Hive badge density creates trust differentiation
2. Passport becomes a portable professional asset
3. Verification costs favour early adopters

---

# 3. PRODUCT IMPACT ANALYSIS

## 3.1 New Core Concepts

### VAULT (New)
- Secure document upload and storage
- Categorised by document type (ID, DBS, RTW, Qualifications, Training)
- Expiry tracking and reminders
- **NOT automatic verification** (critical distinction)
- Hive-only feature

### PASSPORT (New)
- Public-facing verification summary page
- QR code for instant verification
- Badge display
- Compliance status overview
- Shareable/downloadable (future)
- Hive-only feature

### BADGE SYSTEM (Enhanced)
Two distinct types:
1. **Membership Badges** (automatic)
   - Medibee Cell Member
   - Medibee Hive Member

2. **Status/Verification Badges** (earned via Verification Pack)
   - Verified Profile
   - Passport Ready
   - ID Verified
   - DBS Verified
   - Right to Work Verified
   - Qualifications Verified
   - Training Verified

### VERIFICATION PACK (New Product)
- Separate £29 one-off purchase
- Requires Hive subscription
- Triggers document review process
- Unlocks verification badges
- Not a guarantee of employment

## 3.2 Feature Migration Matrix

| Current Feature | Cell | Hive | Colony | Notes |
|-----------------|------|------|--------|-------|
| Create profile | ✅ | ✅ | ❌ | Colony creates employer profile |
| Profile photo | ✅ | ✅ | ❌ | |
| Headline/summary | ✅ | ✅ | ❌ | |
| Experience history | Limited | ✅ | ❌ | Cell gets basic fields only |
| Skills | Limited | ✅ | ❌ | |
| Availability toggle | ✅ | ✅ | ❌ | |
| Be searchable | ✅ | ✅ | ❌ | |
| Credential Wallet → Vault | ❌ | ✅ | ❌ | **BREAKING: Cell loses document storage** |
| Passport | ❌ | ✅ | View only | |
| Verification badges | ❌ | ✅ | View | Requires Verification Pack |
| Expiry reminders | ❌ | ✅ | ❌ | |
| Browse candidates | ❌ | ❌ | ✅ | |
| Shortlists | ❌ | ❌ | ✅ | |
| Filter/search | ❌ | ❌ | ✅ | |
| Introduction credits | N/A | N/A | TBD | **Open question: How do introductions work?** |

## 3.3 Breaking Changes

### For Existing Candidates
1. **Credential Wallet access removed** for free tier users
2. Must upgrade to Hive (£4.99/mo) to retain document storage
3. Verification badges require separate purchase (£29)

### For Existing Clients
1. Subscription model changes from credit-based to flat fee
2. Price point changes (£99-499 → £49.99)
3. Introduction mechanism unclear (see Open Questions)

---

# 4. IMPLEMENTATION IMPACT

## 4.1 Backend Changes Required

| Component | Current State | Required Change | Effort |
|-----------|---------------|-----------------|--------|
| User Model | Single candidate type | Cell/Hive membership tiers | Medium |
| Subscription | Client-only (Stripe) | Client + Candidate (Stripe) | High |
| Document Storage | Credential bucket | Vault with tier gating | Medium |
| Verification | Admin-reviewed (free) | Paid workflow trigger | High |
| Passport | N/A (doesn't exist) | New feature | High |
| Badge System | Simple status badges | Membership + Verification badges | Medium |
| Search | Basic filters | Cell/Hive differentiation | Low |

## 4.2 Frontend Changes Required

| Page/Component | Change Type | Effort |
|----------------|-------------|--------|
| Candidate registration | Add tier selection | Low |
| Candidate dashboard | Tier-aware feature gating | Medium |
| Credential Wallet → Vault | Rename + gate for Hive | Medium |
| Passport page | New page | High |
| Badge display | Enhanced badge system | Medium |
| Verification Pack purchase | New checkout flow | High |
| Colony dashboard | New employer dashboard | Medium |
| Pricing page | New tier comparison | Medium |
| Marketing pages | Messaging update | Low |

## 4.3 Data Model Changes

### New/Modified Entities

```typescript
// NEW: Membership entity
interface Membership {
  memberId: string;
  userId: string;
  tier: 'cell' | 'hive' | 'colony';
  status: 'active' | 'cancelled' | 'past_due';
  stripeSubscriptionId?: string;
  startDate: string;
  currentPeriodEnd?: string;
}

// NEW: Verification Pack purchase
interface VerificationPack {
  packId: string;
  userId: string;
  purchaseDate: string;
  status: 'pending' | 'in_review' | 'complete';
  reviewerId?: string;
  completedDate?: string;
  badgesAwarded: string[];
}

// MODIFIED: Badge entity
interface Badge {
  badgeId: string;
  userId: string;
  type: 'membership' | 'verification';
  name: string;
  awardedDate: string;
  expiryDate?: string;
  source: 'system' | 'verification_pack';
}

// NEW: Passport entity
interface Passport {
  passportId: string;
  userId: string;
  qrCode: string;
  publicUrl: string;
  lastUpdated: string;
  badges: Badge[];
  complianceStatus: 'not_ready' | 'partial' | 'ready';
}
```

---

# 5. RISK ASSESSMENT

## 5.1 Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cell-to-Hive conversion too low | High | High | Strong upgrade prompts, free trial |
| Existing free users churn | High | Medium | Grandfather existing users? |
| Colony price too low for value | Medium | Medium | Monitor and adjust |
| Verification Pack uptake low | Medium | High | Bundle options, urgency messaging |
| UK employment law compliance | Medium | Critical | Legal review of wording |

## 5.2 Legal/Compliance Risks

| Risk | Description | Mitigation |
|------|-------------|------------|
| Work-finding charges | UK law prohibits charging job-seekers for work-finding services | Position as "professional organisation service", not work-finding |
| Right to Work claims | Cannot claim to replace employer RTW obligations | Use "Reviewed" not "Verified" for RTW |
| DBS claims | Cannot claim ongoing DBS monitoring | Clear disclaimers, point-in-time verification |
| Data protection | Sensitive document storage | Existing S3/KMS architecture adequate |

## 5.3 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Subscription complexity | Medium | Medium | Use Stripe's tier management |
| Badge state management | Low | Medium | Clear state machine design |
| Verification workflow bottleneck | Medium | High | Outsource verification, SLAs |
| Migration of existing users | Medium | Medium | Careful migration script + communication |

---

# 6. OPEN QUESTIONS (CRITICAL)

## 6.1 Business Model Questions

| # | Question | Impact | Owner |
|---|----------|--------|-------|
| BQ-01 | How do introductions work in the new model? Are credits still used? | Critical | CEO/CPO |
| BQ-02 | What happens to existing free candidates? Grandfather or migrate? | Critical | CEO/COO |
| BQ-03 | What happens to existing paying clients? Honour contracts or migrate? | Critical | CEO/COO |
| BQ-04 | Is there a Colony tier structure (like Bronze/Silver/Gold)? | High | CEO |
| BQ-05 | Can Colony see Cell member contact details, or only Hive? | High | CPO |
| BQ-06 | What is the Verification Pack SLA (review time)? | High | COO |
| BQ-07 | Who performs verification reviews - in-house or outsourced? | High | COO |
| BQ-08 | Is there a Hive free trial period? | Medium | CEO |
| BQ-09 | Are there volume discounts for Verification Packs? | Medium | CEO |
| BQ-10 | What partner perks/wellbeing benefits are included in Hive? | Medium | CPO |

## 6.2 Product Questions

| # | Question | Impact | Owner |
|---|----------|--------|-------|
| PQ-01 | What specific profile fields are limited in Cell vs Hive? | High | CPO |
| PQ-02 | Can Cell members see that they're missing features (upgrade prompts)? | High | CPO |
| PQ-03 | What does the Passport QR code link to? Public page or verification check? | High | CPO |
| PQ-04 | Is Passport downloadable as PDF in v1 or later? | Medium | CPO |
| PQ-05 | What is the badge expiry policy? (e.g., DBS verified for 12 months?) | High | CPO/Legal |
| PQ-06 | Can badges be revoked? Under what circumstances? | High | CPO/Legal |
| PQ-07 | What analytics does Colony get about candidate engagement? | Medium | CPO |
| PQ-08 | Is there a candidate-facing "who viewed my profile" feature? | Low | CPO |
| PQ-09 | How does Colony differentiate Cell from Hive in search results? | High | CPO |
| PQ-10 | What happens if Hive subscription lapses? Documents deleted or frozen? | High | CPO |

## 6.3 Technical Questions

| # | Question | Impact | Owner |
|---|----------|--------|-------|
| TQ-01 | Do we need separate Cognito user pools for Cell/Hive/Colony? | Medium | CTO |
| TQ-02 | How do we handle subscription upgrade/downgrade mid-cycle? | Medium | CTO |
| TQ-03 | What is the Vault storage limit per user? | Medium | CTO |
| TQ-04 | How is the QR code generated and validated? | Medium | CTO |
| TQ-05 | What triggers badge expiry checks? Cron job or on-access? | Low | CTO |
| TQ-06 | How do we migrate existing Credential Wallet data to Vault? | High | CTO |
| TQ-07 | Is there a Colony team/seats feature in v1? | Medium | CTO |
| TQ-08 | What happens to shortlists if Colony subscription lapses? | Medium | CPO/CTO |

---

# 7. RECOMMENDATIONS

## 7.1 Immediate Actions (Before Development)

1. **RESOLVE BQ-01:** How do introductions work? This is foundational.
2. **RESOLVE BQ-02/BQ-03:** Migration strategy for existing users.
3. **LEGAL REVIEW:** Get sign-off on Verification Pack wording.
4. **DEFINE PQ-01:** Exact Cell vs Hive feature split.

## 7.2 Go-to-Market Considerations

1. **Soft launch** to new users only (avoid existing user disruption)
2. **A/B test** Cell-to-Hive conversion flows
3. **Create urgency** for Verification Pack (limited time pricing?)
4. **Partner with training providers** for Hive perks

## 7.3 Technical Approach

1. **Feature flags** for gradual rollout
2. **Subscription service abstraction** for Stripe integration
3. **Badge system** as separate microservice/module
4. **Passport** as SSR page with caching

---

# 8. NEXT STEPS

| Action | Owner | Due |
|--------|-------|-----|
| Review this document | CEO, CPO, COO | Week 1 |
| Answer critical business questions | CEO | Week 1 |
| Legal review of Verification Pack | Legal/COO | Week 1 |
| Create detailed PRD for Cell/Hive/Colony | CPO | Week 2 |
| Architecture design for new model | CTO | Week 2 |
| Migration plan for existing users | CTO/COO | Week 2 |
| Revised roadmap and timeline | CPO/CTO | Week 2 |

---

*Document ends. This is a living document and will be updated as questions are resolved.*
