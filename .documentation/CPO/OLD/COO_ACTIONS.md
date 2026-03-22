# MEDIBEE TALENT SHOWCASE PLATFORM
## COO Action Items & Operational Readiness (REVISED)

**Document Owner:** COO
**Date:** 19 March 2026 (REVISED)
**Review Cycle:** Weekly

---

# ⚠️ REVISION NOTICE

**Backend infrastructure decisions (ACT-001 through ACT-005) are not just APPROVED but IMPLEMENTED.**

The `medibee-serverless-api` repository contains a fully functional backend. Critical blockers are now resolved.

---

# EXECUTIVE SUMMARY

~~The platform build is blocked on operational decisions.~~

**REVISED:** The backend is built. Remaining actions focus on frontend integration and launch preparation.

---

# CRITICAL PATH ACTIONS (BLOCKERS)

These items are blocking development. Must be resolved before engineering can proceed.

## ACT-001: Approve Backend Architecture

**Priority:** 🔴 CRITICAL BLOCKER
**Due:** ASAP
**Status:** ✅ APPROVED (19 March 2026)

**Context:**
Engineering has proposed three options for the backend. A decision is needed to begin Phase 0 development.

**Required Action:**
Review [ADR-001: Backend Architecture](ADR/ADR-001-BACKEND-ARCHITECTURE.md) and approve one of:
- Option A: Dedicated Medibee CDK Stack
- Option B: Extend PulsePlatform API
- Option C: Hybrid Approach (Recommended)

**Impact if Delayed:**
- All platform development blocked
- No candidate profiles, no discovery, no introductions
- 8-week delay minimum

---

## ACT-002: Approve Authentication Provider

**Priority:** 🔴 CRITICAL BLOCKER
**Due:** ASAP
**Status:** ✅ APPROVED — AWS Cognito (19 March 2026)

**Context:**
Four authentication methods are built into the frontend. Backend auth provider must be selected.

**Required Action:**
Review [ADR-002: Authentication Strategy](ADR/ADR-002-AUTHENTICATION-STRATEGY.md) and approve one of:
- AWS Cognito (Recommended for cost)
- Auth0 (Best DX, higher cost)
- Clerk (Modern alternative)
- Custom (Not recommended)

**Impact if Delayed:**
- No user registration
- No user login
- All portal functionality blocked

---

## ACT-003: Define Introduction Facilitation Process

**Priority:** 🔴 CRITICAL BLOCKER
**Due:** Before FO-104 development
**Status:** ✅ APPROVED — Phone call + email introduction (19 March 2026)

**Context:**
PRD states Medibee "facilitates introductions" but doesn't define the operational process.

**Required Decisions:**

| Question | Options | Your Decision |
|----------|---------|---------------|
| What happens when provider requests intro? | Auto-email / Phone call / Meeting setup | __________ |
| What info is shared with candidate? | Provider name only / Full details / Provider profile | __________ |
| What info is shared with provider? | Contact info / Profile link / Medibee-facilitated | __________ |
| Who makes first contact? | Medibee staff / Provider / Candidate | __________ |
| SLA for introduction? | Same day / 24 hours / 48 hours | __________ |
| How is success measured? | Introduction made / Meeting scheduled / Hire made | __________ |

**Deliverable:**
Write up the introduction workflow (1-2 pages) covering:
1. Request received
2. Candidate notification
3. Consent collection
4. Information exchange
5. Facilitation method
6. Follow-up process
7. Success criteria

**Impact if Delayed:**
- Cannot build introduction feature
- Core value proposition unavailable
- Revenue blocked

---

## ACT-004: Confirm Subscription Pricing

**Priority:** 🔴 CRITICAL
**Due:** Before FO-300 development
**Status:** ✅ APPROVED — Pricing as proposed (19 March 2026)

**Context:**
Stripe integration requires defined products and prices.

**Proposed Pricing (Review & Approve):**

### Employer Tiers

| Tier | Intros/Month | Monthly | Annual | Approve? |
|------|--------------|---------|--------|----------|
| Explorer | 0 | Free | Free | ☐ |
| Starter | 5 | £99 | £990 | ☐ |
| Growth | 20 | £299 | £2,990 | ☐ |
| Enterprise | Unlimited | Custom | Custom | ☐ |

### Candidate Tiers

| Tier | Features | Monthly | Approve? |
|------|----------|---------|----------|
| Free | Basic profile | Free | ☐ |
| Premium | Enhanced visibility, analytics | £9.99 | ☐ |

### Credit Packs

| Pack | Credits | Price | Price/Credit | Approve? |
|------|---------|-------|--------------|----------|
| 10 Pack | 10 | £150 | £15 | ☐ |
| 25 Pack | 25 | £300 | £12 | ☐ |
| 50 Pack | 50 | £500 | £10 | ☐ |

**Required Action:**
- Review pricing against market
- Approve or adjust prices
- Confirm free tier limitations

**Impact if Delayed:**
- Cannot implement subscription gating
- Revenue collection blocked

---

## ACT-005: Credential Verification Policy

**Priority:** 🔴 CRITICAL
**Due:** Before FO-101 development
**Status:** ✅ APPROVED — Manual admin verification, 24-48h SLA (19 March 2026)

**Context:**
Candidates upload DBS certificates, RTW documents, etc. Who verifies them?

**Required Decisions:**

| Question | Options | Your Decision |
|----------|---------|---------------|
| Who verifies documents? | Medibee admin / Automated / Third-party | __________ |
| What is verification SLA? | Same day / 24 hours / 3 business days | __________ |
| What does "verified" mean? | Admin viewed / Authenticity confirmed / Third-party checked | __________ |
| What if document rejected? | Notify candidate / Allow resubmit / Block profile | __________ |
| Staff needed for verification? | 0.5 FTE / 1 FTE / Outsource | __________ |

**Impact if Delayed:**
- Cannot build credential wallet
- "Verified" badges have no meaning
- Trust proposition undermined

---

# HIGH PRIORITY ACTIONS

## ACT-006: Confirm Care Setting Taxonomy

**Priority:** 🟡 HIGH
**Due:** Before FO-100 development
**Status:** ⏳ Awaiting Confirmation

**Current List:**
- Mental Health
- Acute Care (NHS)
- Private Hospital
- Care Home (Residential)
- Supported Living
- End of Life
- Other

**Questions:**
- Is this list complete?
- Should we add: Nursing Home, Dementia Care, Learning Disabilities, Paediatric, Community Care, Domiciliary?
- Should settings be hierarchical (e.g., Care Home > Dementia)?
- Should we align with CQC service types?

**Required Action:**
Confirm final list of care settings for candidate profiles and filtering.

---

## ACT-007: Define Launch Geography

**Priority:** 🟡 HIGH
**Due:** Before FO-102 development
**Status:** ⏳ Awaiting Decision

**Options:**
| Option | Description | Complexity | Recommended |
|--------|-------------|------------|-------------|
| Nationwide UK | All of UK | High | For later |
| England | England only | Medium | ✓ Phase 1 |
| South England | South regions | Low | Pilot option |
| Specific Areas | Named counties/cities | Very Low | Testing only |

**Required Action:**
Decide launch geography and postcode radius options (5mi, 10mi, 25mi, 50mi, nationwide).

---

## ACT-008: Appoint Verification Operators

**Priority:** 🟡 HIGH
**Due:** Before platform launch
**Status:** ⏳ Planning

**Context:**
Manual credential verification requires staff. Estimate 10-15 minutes per document.

**Staffing Scenarios:**

| Daily Documents | Hours/Day | FTE Needed |
|-----------------|-----------|------------|
| 10 | 2.5 hrs | 0.3 |
| 50 | 12.5 hrs | 1.5 |
| 100 | 25 hrs | 3.0 |

**Required Action:**
- Determine expected document volume
- Plan verification staffing
- Consider outsourcing vs internal

---

## ACT-009: Define Admin User Roles

**Priority:** 🟡 HIGH
**Due:** Before FO-107 development
**Status:** ⏳ Awaiting Definition

**Proposed Roles:**

| Role | Access | Who |
|------|--------|-----|
| Super Admin | Full access, user management | CEO/CTO |
| Operations Manager | Verifications, introductions, client approval | Ops lead |
| Operations Staff | Verifications, introductions (own queue) | Ops team |
| Support | Read-only candidate/client access | Support team |
| Finance | Subscription, billing, refunds | Finance |

**Required Action:**
- Confirm role structure
- Assign initial users
- Define role creation process

---

## ACT-010: Draft Introduction Email Templates

**Priority:** 🟡 HIGH
**Due:** Before FO-104 development
**Status:** ⏳ Not Started

**Required Templates:**

| Template | Recipient | Purpose |
|----------|-----------|---------|
| Introduction Request | Candidate | Provider wants to connect |
| Introduction Accepted | Provider | Candidate agreed |
| Introduction Declined | Provider | Candidate declined |
| Introduction Facilitated | Both | Contact details shared |
| Introduction Follow-up | Both | Check-in after 7 days |

**Required Action:**
Draft template content for each email. Engineering will implement.

---

# MEDIUM PRIORITY ACTIONS

## ACT-011: Company Registration Details

**Priority:** 🟢 MEDIUM
**Due:** Before launch
**Status:** ⏳ Pending

**Required Information for Website:**
- [ ] Company registration number
- [ ] Registered office address
- [ ] ICO registration number
- [ ] VAT number (if applicable)
- [ ] Contact phone number

---

## ACT-012: Privacy Policy Updates

**Priority:** 🟢 MEDIUM
**Due:** Before launch
**Status:** ⏳ Pending

**Context:**
Current privacy policy covers marketing website. Platform features require updates.

**New Processing Activities:**
- Candidate profile data
- Credential document storage
- Provider organisation data
- Introduction request data
- Subscription/payment data
- Analytics data

**Required Action:**
Legal review and update of privacy policy.

---

## ACT-013: Terms of Service

**Priority:** 🟢 MEDIUM
**Due:** Before launch
**Status:** ⏳ Not Started

**Required Terms:**
- Candidate terms
- Provider/client terms
- Introduction facilitation terms
- Subscription terms
- Credential verification disclaimers

**Required Action:**
Draft or commission Terms of Service.

---

## ACT-014: Support Process Definition

**Priority:** 🟢 MEDIUM
**Due:** Before launch
**Status:** ⏳ Not Started

**Questions:**
- Support email address?
- Support hours?
- SLA for responses?
- Escalation process?
- FAQ content?

---

## ACT-015: Marketing Launch Plan

**Priority:** 🟢 MEDIUM
**Due:** 2 weeks before launch
**Status:** ⏳ Not Started

**Required:**
- Launch announcement
- Candidate acquisition strategy
- Provider outreach plan
- PR/press
- Social media

---

# ACTION TRACKING SUMMARY (REVISED)

| ID | Action | Priority | Status | Due | Owner |
|----|--------|----------|--------|-----|-------|
| ACT-001 | Backend Architecture | ✅ COMPLETE | ✅ IMPLEMENTED | — | CTO/COO |
| ACT-002 | Auth Provider | ✅ COMPLETE | ✅ IMPLEMENTED | — | CTO/COO |
| ACT-003 | Introduction Process | ✅ COMPLETE | ✅ APPROVED + BACKEND BUILT | — | COO |
| ACT-004 | Subscription Pricing | ✅ APPROVED | ⏳ Stripe not yet built | Before FO-300 | CEO/COO |
| ACT-005 | Verification Policy | ✅ COMPLETE | ✅ BACKEND BUILT | — | COO |
| ACT-006 | Care Settings | 🟡 HIGH | ⏳ | Before FO-100 | Product |
| ACT-007 | Launch Geography | 🟡 HIGH | ⏳ | Before FO-102 | Commercial |
| ACT-008 | Verification Staff | 🟡 HIGH | ⏳ | Before launch | COO |
| ACT-009 | Admin Roles | 🟡 HIGH | ⏳ | Before FO-107 | COO |
| ACT-010 | Email Templates | 🟡 HIGH | ⏳ | Before FO-104 | COO |
| ACT-011 | Company Details | 🟢 MEDIUM | ⏳ | Before launch | COO |
| ACT-012 | Privacy Policy | 🟢 MEDIUM | ⏳ | Before launch | Legal |
| ACT-013 | Terms of Service | 🟢 MEDIUM | ⏳ | Before launch | Legal |
| ACT-014 | Support Process | 🟢 MEDIUM | ⏳ | Before launch | COO |
| ACT-015 | Marketing Plan | 🟢 MEDIUM | ⏳ | 2 weeks before | Marketing |

**Note:** 5 of 15 actions are now COMPLETE or IMPLEMENTED. Remaining focus is on operational readiness for launch.

---

# DECISION LOG

Record decisions here as they are made.

| Date | Decision | Made By | Notes |
|------|----------|---------|-------|
| 2026-03-19 | ADR-001: Hybrid backend architecture | CPO/COO | Build standalone `medibee-serverless-api` using PulsePlatform patterns |
| 2026-03-19 | ADR-002: AWS Cognito for auth | CPO/COO | All 4 auth methods, UK data residency, cost-effective |
| 2026-03-19 | ADR-003: S3+KMS for credentials | CPO/COO | Manual verification Phase 1, automate later |
| 2026-03-19 | Introduction process: Phone + Email | CPO/COO | 15 min per intro, human touch differentiation |
| 2026-03-19 | Pricing: Explorer/Starter/Growth/Enterprise | CPO/COO | £0/£99/£299/Custom per month |
| 2026-03-19 | Verification SLA: 24-48 hours | CPO/COO | Manual admin review Phase 1 |
| 2026-03-19 | **Backend IMPLEMENTED** | Engineering | `medibee-serverless-api` exists with full handlers |

---

*Last Updated: 19 March 2026 (REVISED)*
