# MEDIBEE TALENT SHOWCASE PLATFORM
## Open Questions Register (REVISED)

**Document Owner:** CPO/COO
**Date:** 19 March 2026 (REVISED)
**Status:** UPDATED — Critical blockers RESOLVED

---

# ⚠️ REVISION NOTICE

**Questions OQ-001 through OQ-005 have been RESOLVED and IMPLEMENTED.**

The `medibee-serverless-api` repository contains a fully functional backend implementing the decisions made.

---

# RESOLVED QUESTIONS (Previously Critical Blockers)

## OQ-001: Backend Infrastructure Location — ✅ RESOLVED & IMPLEMENTED

**Status:** ✅ RESOLVED
**Resolution Date:** 19 March 2026

**Decision:** Option C (Hybrid) — Standalone `medibee-serverless-api` repository exists with full CDK stack.

**Implementation:**
- Repository: `C:\VSProjects\medibee-serverless-api`
- Stack: `lib/medibee-api-stack.ts`
- Handlers: Auth, Candidates, Clients, Admin

---

## OQ-002: Authentication Provider — ✅ RESOLVED & IMPLEMENTED

**Status:** ✅ RESOLVED
**Resolution Date:** 19 March 2026

**Decision:** AWS Cognito

**Implementation:**
- User Pool with custom attributes (userType, tenantId)
- Email/password registration and login
- OAuth configuration ready (handlers need completion)

---

## OQ-003: Credential Storage & Verification — ✅ RESOLVED & IMPLEMENTED

**Status:** ✅ RESOLVED
**Resolution Date:** 19 March 2026

**Decision:** S3 with KMS encryption + Manual admin verification

**Implementation:**
- S3 bucket: `medibee-credentials-{env}` with KMS
- Upload via presigned URLs
- Admin verification queue in admin handler
- Verify/reject API implemented

---

## OQ-004: Introduction Facilitation Process — ✅ RESOLVED & IMPLEMENTED

**Status:** ✅ RESOLVED
**Resolution Date:** 19 March 2026

**Decision:** Phone call + email introduction (15 min per intro)

**Implementation:**
- Introduction request API in clients handler
- Credit checking logic
- Admin facilitation queue
- Status workflow: pending → accepted → facilitating → completed

---

## OQ-005: Subscription Pricing — ✅ APPROVED

**Status:** ✅ APPROVED (Stripe not yet implemented)
**Resolution Date:** 19 March 2026

**Decision:** Pricing approved as proposed
- Explorer: Free
- Starter: £99/month (5 intros)
- Growth: £299/month (20 intros)
- Enterprise: Custom

**Note:** Backend has credit tracking, but Stripe integration not built yet.

---

# HIGH PRIORITY QUESTIONS

## OQ-006: Care Setting Taxonomy

**Status:** 🟡 HIGH PRIORITY
**Owner:** Product Lead
**Due:** Before FO-100 (Candidate Profile)

**Question:**
What care settings should candidates be able to select? Current list in schema:

```typescript
'mental-health' | 'acute-care' | 'private-hospital' |
'care-home' | 'supported-living' | 'end-of-life' | 'other'
```

**Suggested expanded list:**
- Mental Health
- Acute Care (NHS)
- Private Hospital
- Care Home (Residential)
- Nursing Home
- Supported Living
- Domiciliary Care
- End of Life / Hospice
- Learning Disabilities
- Dementia Care
- Paediatric
- Community Care
- Other

**Required Decisions:**
- [ ] Confirm care setting taxonomy
- [ ] Determine if settings are hierarchical (e.g., Care Home > Dementia)
- [ ] Align with CQC categories

---

## OQ-007: Geographic Coverage

**Status:** 🟡 HIGH PRIORITY
**Owner:** Commercial Lead
**Due:** Before FO-102 (Discovery)

**Question:**
What geographic areas should the platform cover at launch?

**Options:**
| Option | Description | Complexity |
|--------|-------------|------------|
| A | Nationwide UK | High (postcode/distance search) |
| B | England only | Medium |
| C | South England regions | Low |
| D | Specific pilot areas | Very Low |

**Required Decisions:**
- [ ] Define launch geography
- [ ] Define postcode search radius options
- [ ] Define expansion roadmap

---

## OQ-008: Experience Level Taxonomy

**Status:** 🟡 HIGH PRIORITY
**Owner:** Product Lead
**Due:** Before FO-100 (Candidate Profile)

**Question:**
Current experience levels:

```typescript
'newly-qualified' | '1-2-years' | '3-5-years' | '5-plus-years'
```

**Is this sufficient?** Consider:
- Bands vs years (Band 2, Band 3, Band 4)
- Specialist qualifications (NVQ Level 2, 3, etc.)
- Registration status (awaiting registration, registered)

**Required Decisions:**
- [ ] Confirm experience level options
- [ ] Determine if qualification levels needed separately
- [ ] Align with NHS bands

---

## OQ-009: Profile Visibility Rules

**Status:** 🟡 HIGH PRIORITY
**Owner:** Product Lead
**Due:** Before FO-102 (Discovery)

**Question:**
When should a candidate profile be visible to providers?

**Options:**
| Scenario | Visible? |
|----------|----------|
| Profile <50% complete | No |
| Profile >50% but no credentials | Maybe (limited) |
| Profile complete, credentials unverified | Yes |
| Profile complete, credentials verified | Yes (priority) |
| Availability = "Not Looking" | No (or hidden) |

**Required Decisions:**
- [ ] Define minimum profile threshold for visibility
- [ ] Define credential requirements for visibility
- [ ] Define availability impact on visibility

---

## OQ-010: Candidate Consent Model

**Status:** 🟡 HIGH PRIORITY
**Owner:** Legal / Compliance
**Due:** Before FO-104 (Introductions)

**Question:**
What consent is required from candidates?

**Consent Points:**
1. Profile visibility to all registered providers
2. Profile visibility to verified providers only
3. Introduction request permission (per-request vs blanket)
4. Contact details sharing
5. Credential verification results sharing

**GDPR Considerations:**
- Legal basis for processing (consent vs legitimate interest)
- Right to erasure implications
- Data portability requirements

**Required Decisions:**
- [ ] Define consent model
- [ ] Legal review of consent flows
- [ ] Privacy policy updates

---

# MEDIUM PRIORITY QUESTIONS

## OQ-011: Admin Roles & Permissions

**Status:** 🟢 MEDIUM PRIORITY
**Owner:** CTO
**Due:** Before FO-107 (Admin Dashboard)

**Question:**
What admin roles are needed?

**Suggested Roles:**
| Role | Permissions |
|------|-------------|
| Super Admin | Full access |
| Operations | Credential verification, introductions |
| Support | Read-only candidate/client access |
| Finance | Subscription management |

---

## OQ-012: Mobile App Requirement

**Status:** 🟢 MEDIUM PRIORITY
**Owner:** Product Lead
**Due:** Phase 2+

**Question:**
Is a mobile app needed? PRD doesn't mention mobile.

**Options:**
| Option | Description | Effort |
|--------|-------------|--------|
| A | PWA (responsive web) | Low |
| B | React Native app | High |
| C | Web only | None |

---

## OQ-013: Email Template System

**Status:** 🟢 MEDIUM PRIORITY
**Owner:** Engineering
**Due:** Before FO-002 (Registration)

**Question:**
What email templates are needed and how should they be managed?

**Required Templates:**
- Welcome / Verification
- Introduction Request (to candidate)
- Introduction Accepted (to provider)
- Introduction Declined (to provider)
- Credential Expiry Warning
- Subscription Renewal Reminder
- Password Reset

---

## OQ-014: Analytics & Reporting

**Status:** 🟢 MEDIUM PRIORITY
**Owner:** Product Lead
**Due:** Before FO-107 (Admin Dashboard)

**Question:**
What analytics should the admin dashboard show?

**Suggested Metrics:**
- Daily/weekly/monthly active users
- Registration funnel conversion
- Profile completion rates
- Credential verification rates
- Introduction conversion rates
- Subscription metrics
- Revenue metrics

---

## OQ-015: Testimonial Moderation Policy

**Status:** 🟢 MEDIUM PRIORITY
**Owner:** Operations
**Due:** Before FO-200 (Testimonials)

**Question:**
What criteria should testimonials meet for approval?

**Moderation Criteria:**
- Minimum character count?
- No profanity/offensive content?
- Employer verification?
- Edit vs reject?

---

# RESOLUTION TRACKING

| Question | Status | Owner | Due Date | Resolution Date |
|----------|--------|-------|----------|-----------------|
| OQ-001 | ✅ RESOLVED | CTO | — | 19 March 2026 |
| OQ-002 | ✅ RESOLVED | CTO | — | 19 March 2026 |
| OQ-003 | ✅ RESOLVED | CTO | — | 19 March 2026 |
| OQ-004 | ✅ RESOLVED | COO | — | 19 March 2026 |
| OQ-005 | ✅ APPROVED | CEO | — | 19 March 2026 |
| OQ-006 | 🟡 HIGH | Product | Before FO-100 | - |
| OQ-007 | 🟡 HIGH | Commercial | Before FO-102 | - |
| OQ-008 | 🟡 HIGH | Product | Before FO-100 | - |
| OQ-009 | 🟡 HIGH | Product | Before FO-102 | - |
| OQ-010 | 🟡 HIGH | Legal | Before FO-104 | - |
| OQ-011 | 🟢 MEDIUM | CTO | Before FO-107 | - |
| OQ-012 | 🟢 MEDIUM | Product | Phase 2+ | - |
| OQ-013 | 🟢 MEDIUM | Engineering | Before FO-002 | - |
| OQ-014 | 🟢 MEDIUM | Product | Before FO-107 | - |
| OQ-015 | 🟢 MEDIUM | Operations | Before FO-200 | - |

---

*End of Open Questions Register*
