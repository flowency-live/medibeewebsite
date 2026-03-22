# MEDIBEE TALENT SHOWCASE PLATFORM
## Implementation Roadmap (REVISED)

**Document Owner:** CPO/COO
**Date:** 19 March 2026 (REVISED)
**Version:** 1.1

---

# ⚠️ REVISION NOTICE

**Phase 0 is ALREADY COMPLETE.** The backend API exists in `medibee-serverless-api`.

The roadmap has been revised to reflect actual progress and the remaining work (primarily frontend integration).

---

# ROADMAP OVERVIEW (REVISED)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MEDIBEE IMPLEMENTATION ROADMAP (REVISED)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 0 ─────────────────────────────────────────────── ✅ COMPLETE ──────  │
│  INFRASTRUCTURE FOUNDATION                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │ FO-001       │  │ FO-002       │  │ FO-003       │                       │
│  │ Backend API  │──│ Candidate    │──│ Client       │                       │
│  │ ✅ COMPLETE  │  │ ✅ BACKEND   │  │ ✅ BACKEND   │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  PHASE 1 ─────────────────────────────────────────────── ⚠️ FRONTEND ──────  │
│  MVP IDENTITY & DISCOVERY                                     [3-5 weeks]   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ FO-100       │  │ FO-101       │  │ FO-102       │  │ FO-103       │    │
│  │ Candidate    │──│ Credential   │──│ Provider     │──│ Shortlist    │    │
│  │ ✅ BACKEND   │  │ ✅ BACKEND   │  │ ✅ BACKEND   │  │ ✅ BACKEND   │    │
│  │ ⚠️ FRONTEND  │  │ ⚠️ FRONTEND  │  │ ⚠️ FRONTEND  │  │ ⚠️ FRONTEND  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│         │                                                                    │
│         └──────────────┐                                                     │
│                        ▼                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ FO-104       │  │ FO-105       │  │ FO-106       │  │ FO-107       │    │
│  │ Introduction │──│ Candidate    │──│ Client       │──│ Admin        │    │
│  │ ✅ BACKEND   │  │ Dashboard    │  │ Dashboard    │  │ Dashboard    │    │
│  │ ⚠️ FRONTEND  │  │ ⚠️ SCAFFOLD  │  │ ⚠️ SCAFFOLD  │  │ ⚠️ SCAFFOLD  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  PHASE 2 ──────────────────────────────────────────────────────────────────  │
│  TRUST & MONETISATION                                         [4 weeks]     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ FO-200       │  │ FO-201       │  │ FO-300       │  │ FO-301       │    │
│  │ Testimonials │  │ Employer     │  │ Stripe       │  │ Employer     │    │
│  │ ❌ NOT BUILT │  │ Profiles     │  │ Integration  │  │ Subscriptions│    │
│  │              │  │ ❌ NOT BUILT │  │ ❌ NOT BUILT │  │ ❌ NOT BUILT │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  PHASE 3 ──────────────────────────────────────────────────────────────────  │
│  TRUST SIGNALS & GROWTH                                       [4 weeks]     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ FO-302       │  │ FO-400       │  │ FO-401       │  │ FO-402       │    │
│  │ Candidate    │  │ QR           │  │ Compliance   │  │ Advanced     │    │
│  │ Subscriptions│  │ Verification │  │ Scoring      │  │ Search       │    │
│  │ ❌ NOT BUILT │  │ ❌ NOT BUILT │  │ ❌ NOT BUILT │  │ ❌ NOT BUILT │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PHASE 0: INFRASTRUCTURE FOUNDATION — ✅ COMPLETE

**Status:** DONE
**Duration:** Already built

## What Was Built

| Component | Status | Location |
|-----------|--------|----------|
| CDK Stack | ✅ Complete | `lib/medibee-api-stack.ts` |
| API Gateway | ✅ Complete | HTTP API with CORS |
| DynamoDB | ✅ Complete | Single-table with GSI1, GSI2 |
| Cognito | ✅ Complete | User pool with custom attributes |
| S3 Bucket | ✅ Complete | KMS encryption for credentials |
| Auth Handler | ✅ Complete | Registration, login, verification |
| Candidates Handler | ✅ Complete | Profile CRUD, credentials, experience |
| Clients Handler | ✅ Complete | Browse, shortlists, introductions |
| Admin Handler | ✅ Complete | Analytics, approvals, verification |

### Phase 0 Exit Criteria — ALL MET

- [x] API Gateway deployed
- [x] Candidate registration API works
- [x] Client registration API works
- [x] Admin APIs work
- [x] Tenant isolation (TENANT#MEDIBEE)

---

# PHASE 1: FRONTEND INTEGRATION — ⚠️ IN PROGRESS

**Duration:** 3-5 weeks
**Team:** 1-2 engineers
**Goal:** Wire frontend UI to deployed backend API

## Week 1: Authentication Integration

| Day | Task | Effort |
|-----|------|--------|
| 1 | Deploy backend to dev environment | 0.5 day |
| 2 | Update API client URLs | 0.5 day |
| 3-4 | Wire candidate login page to auth API | 1 day |
| 5-6 | Wire client login page to auth API | 1 day |
| 7 | Test registration e2e (candidate) | 0.5 day |
| 8 | Test registration e2e (client) | 0.5 day |
| 9-10 | Admin authentication handler | 1 day |
| **Total** | | **5 days** |

## Week 2-3: Profile & Credential UI

| Day | Task | Effort |
|-----|------|--------|
| 11-12 | Candidate profile edit form | 2 days |
| 13-14 | Experience timeline UI | 2 days |
| 15-16 | Credential upload UI | 2 days |
| 17-18 | Credential list display | 1 day |
| 19-20 | Admin credential verification UI | 2 days |
| **Total** | | **9 days** |

## Week 3-4: Discovery & Shortlists

| Day | Task | Effort |
|-----|------|--------|
| 21-23 | Candidate browse page UI | 3 days |
| 24-25 | Candidate card component | 1 day |
| 26-27 | Filter sidebar | 1 day |
| 28-29 | Shortlist management UI | 2 days |
| 30 | Add to shortlist flow | 1 day |
| **Total** | | **8 days** |

## Week 4-5: Introductions & Dashboards

| Day | Task | Effort |
|-----|------|--------|
| 31-32 | Introduction request UI | 2 days |
| 33-34 | Admin introduction queue UI | 2 days |
| 35-36 | Candidate dashboard widgets | 2 days |
| 37-38 | Client dashboard widgets | 2 days |
| 39-40 | Admin dashboard widgets | 2 days |
| **Total** | | **10 days** |

### Phase 1 Exit Criteria

- [ ] Users can register and log in (all portals)
- [ ] Candidates can edit profiles
- [ ] Candidates can upload credentials
- [ ] Admins can verify credentials
- [ ] Providers can browse candidates
- [ ] Providers can create shortlists
- [ ] Providers can request introductions
- [ ] All dashboards show real data

---

# PHASE 2: MONETISATION — ❌ NOT STARTED

**Duration:** 4 weeks
**Team:** 1-2 engineers
**Goal:** Stripe subscriptions operational

## Week 6-7: Stripe Integration

| Task | Effort |
|------|--------|
| Stripe handler Lambda | 3 days |
| Webhook processing | 2 days |
| Customer creation | 1 day |
| Checkout session API | 1 day |
| Subscription UI | 3 days |
| **Total** | **10 days** |

## Week 8-9: Credit System

| Task | Effort |
|------|--------|
| Credit tracking logic | 2 days |
| Credit deduction on introduction | 1 day |
| Access control enforcement | 2 days |
| Subscription management UI | 3 days |
| Credit pack purchases | 2 days |
| **Total** | **10 days** |

### Phase 2 Exit Criteria

- [ ] Providers can subscribe via Stripe
- [ ] Introduction requests deduct credits
- [ ] Unsubscribed providers cannot request introductions
- [ ] Credit packs available for purchase

---

# PHASE 3: TRUST FEATURES — ❌ NOT STARTED

**Duration:** 4 weeks
**Team:** 1-2 engineers
**Goal:** Testimonials, employer profiles, advanced features

## Week 10-11: Testimonials & Profiles

| Task | Effort |
|------|--------|
| Testimonial request flow | 3 days |
| Testimonial submission | 2 days |
| Moderation queue | 2 days |
| Employer profile pages | 3 days |
| **Total** | **10 days** |

## Week 12-13: Trust Signals

| Task | Effort |
|------|--------|
| QR code generation | 2 days |
| Verification page | 1 day |
| Compliance scoring | 3 days |
| Advanced search/filters | 3 days |
| **Total** | **9 days** |

### Phase 3 Exit Criteria

- [ ] Candidates can receive testimonials
- [ ] Employers have public profiles
- [ ] QR verification works
- [ ] Compliance scores visible

---

# REVISED RESOURCE REQUIREMENTS

## Engineering Team

| Phase | Engineers | Duration | Total Days |
|-------|-----------|----------|------------|
| Phase 0 | — | ✅ COMPLETE | — |
| Phase 1 (Frontend) | 1-2 | 5 weeks | 25-32 |
| Phase 2 (Monetisation) | 1-2 | 4 weeks | 20 |
| Phase 3 (Trust) | 1-2 | 4 weeks | 19 |
| **Total Remaining** | | **13 weeks** | **64-71 days** |

## Original vs Revised Timeline

| | Original Estimate | Revised Estimate |
|---|-------------------|------------------|
| Total Duration | 26 weeks | **13 weeks** |
| Total Days | 240-340 | **64-71 days** |
| Saving | — | **~50%** |

---

# REVISED MILESTONES

| Milestone | Target | Status |
|-----------|--------|--------|
| **M0: Backend Live** | — | ✅ COMPLETE |
| **M1: First Login** | Week 1 | ⏳ Next |
| **M2: First Profile** | Week 3 | ⏳ Pending |
| **M3: First Introduction** | Week 5 | ⏳ Pending |
| **M4: First Subscriber** | Week 9 | ⏳ Pending |
| **M5: Platform Launch** | Week 13 | ⏳ Pending |

---

# DEPENDENCIES (REVISED)

Most original blockers are now RESOLVED because backend exists:

| Dependency | Status |
|------------|--------|
| ACT-001 (Backend Decision) | ✅ RESOLVED - Backend built |
| ACT-002 (Auth Decision) | ✅ RESOLVED - Cognito implemented |
| ACT-003 (Intro Process) | ✅ APPROVED - Phone + email |
| ACT-004 (Pricing) | ✅ APPROVED - £99/£299/Custom |
| ACT-005 (Verification Policy) | ✅ APPROVED - Manual admin |
| FO-001 (Backend API) | ✅ COMPLETE |
| FO-002 (Registration Backend) | ✅ COMPLETE |
| FO-003 (Client Backend) | ✅ COMPLETE |
| FO-100-104 (Backend) | ✅ COMPLETE |

## Remaining Dependencies

| From | To | Type |
|------|-----|------|
| Backend deployment | Frontend integration | Blocker |
| FO-300 (Stripe) | FO-301 (Subscriptions) | Blocker |
| FO-300 (Stripe) | FO-302 (Candidate Subs) | Blocker |

---

# RISKS (REVISED)

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| ~~Backend delays~~ | ~~Medium~~ | ~~High~~ | ✅ RESOLVED - Backend exists |
| ~~Auth complexity~~ | ~~Medium~~ | ~~High~~ | ✅ RESOLVED - Cognito works |
| Frontend integration bugs | Medium | Medium | Incremental integration, testing |
| API deployment issues | Low | Medium | Standard CDK deployment |
| Stripe integration issues | Low | Medium | Follow Stripe best practices |

---

*Last Updated: 19 March 2026 (REVISED)*
