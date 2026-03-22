# MEDIBEE TALENT SHOWCASE PLATFORM
## Product Backlog v1.1 — CPO Review (REVISED)

**Document Owner:** CPO/COO
**Date:** 19 March 2026 (REVISED)
**PRD Version:** v3
**Gap Analysis Status:** REVISED

---

# ⚠️ REVISION NOTICE

**Version 1.0 contained incorrect information stating the backend API did not exist.**

The `medibee-serverless-api` repository EXISTS with fully functional backend handlers. This revision corrects all status indicators to reflect actual build state.

---

# EXECUTIVE SUMMARY

## Current State Assessment (REVISED)

| Dimension | PRD Vision | Actual Build | Gap Severity |
|-----------|------------|--------------|--------------|
| **Platform Type** | SaaS Talent Showcase | Backend API + Marketing Website | 🟡 Integration needed |
| **Backend API** | Full microservices | ✅ **COMPLETE** | ✅ None |
| **Candidate Identity** | Full profile + credential wallet | ✅ Backend complete, ⚠️ Frontend needed | 🟡 Integration |
| **Discovery Engine** | Browse, filter, shortlist, introduce | ✅ Backend complete, ⚠️ Frontend needed | 🟡 Integration |
| **Trust Layer** | Badges, testimonials, verification | ⚠️ Partial (verification done) | 🟡 Medium |
| **Employer Profiles** | Workplace transparency pages | ❌ Not started | 🔴 Missing |
| **University Pipeline** | Institutional accounts + portfolios | ❌ Not started | 🟡 DEFERRED |
| **Monetisation** | Subscriptions + credits | ❌ Not started | 🔴 Missing |

### Bottom Line

**Backend is ~90% complete. Frontend integration is the main remaining work.**

The `medibee-serverless-api` repository contains:
- CDK infrastructure (API Gateway, Lambda, DynamoDB, S3, Cognito)
- Auth handlers (registration, login, verification)
- Candidate handlers (profile CRUD, credentials, experience)
- Client handlers (browse, shortlists, introductions)
- Admin handlers (analytics, approvals, verification queues)

---

# FEATURE INVENTORY: BUILT vs. MISSING

## ✅ BACKEND API (`medibee-serverless-api`) — COMPLETE

| Handler | Endpoints | Status |
|---------|-----------|--------|
| Auth | Register candidate/client, login, verify email, health | ✅ Complete |
| Candidates | List, get, update profile, add experience, credentials | ✅ Complete |
| Clients | Browse candidates, org CRUD, shortlists, introductions | ✅ Complete |
| Admin | Analytics, client approval, credential verification, introduction status | ✅ Complete |
| Infrastructure | CDK stack, DynamoDB, S3, Cognito, API Gateway | ✅ Complete |

## ✅ FRONTEND (Marketing Website) — COMPLETE

| Feature | Location | Quality | Notes |
|---------|----------|---------|-------|
| Home Page | `/` | ✅ Production | Hero, audience split, CTAs |
| Services Page | `/services` | ✅ Production | For care providers |
| Work With Us Page | `/work-with-us` | ✅ Production | For HCAs |
| About Page | `/about` | ✅ Production | Company story |
| Contact Page | `/contact` | ✅ Production | Care provider form |
| Privacy Policy | `/privacy-policy` | ✅ Production | GDPR compliant |
| Policy Pages (6) | `/policies/*` | ✅ Production | Legal compliance |
| Candidate Login | `/candidate/login` | ✅ Production | UI ready |
| Admin Login | `/admin/login` | ✅ Production | UI ready |
| Client Login | `/client/login` | ✅ Production | UI ready |
| Component Library | `components/` | ✅ Production | 40+ components |
| Test Suite | `*.test.tsx` | ✅ Good | 179 tests |

## ⚠️ FRONTEND (Portal UI) — SCAFFOLDED, NEEDS API WIRING

| Feature | Location | Status | Work Needed |
|---------|----------|--------|-------------|
| Candidate Dashboard | `/candidate/dashboard` | ⚠️ Scaffold | Wire to API |
| Admin Dashboard | `/admin/dashboard` | ⚠️ Scaffold | Wire to API |
| Auth Context | `lib/auth/` | ⚠️ Ready | Point to deployed API |
| API Client | `lib/api/` | ⚠️ Ready | Update endpoint URL |

## ❌ NOT BUILT

| Feature | Backend | Frontend | Notes |
|---------|---------|----------|-------|
| Admin authentication | ❌ Missing | ⚠️ UI exists | Need admin login handler |
| OAuth (Google/Apple) | ⚠️ Cognito configured | ⚠️ UI exists | Need OAuth handlers |
| Stripe integration | ❌ Missing | ❌ Missing | Revenue blocked |
| Testimonials | ❌ Missing | ❌ Missing | Phase 2 |
| Employer public profiles | ❌ Missing | ❌ Missing | Phase 2 |
| QR verification | ❌ Missing | ❌ Missing | Phase 3 |
| University pipeline | ❌ Missing | ❌ Missing | Deferred |

---

# EXECUTABLE PRODUCT BACKLOG (REVISED)

## PHASE 0: INFRASTRUCTURE FOUNDATION — ✅ COMPLETE

> **Status:** DONE
> **Actual Duration:** Already built

### FO-001: Backend API Foundation — ✅ COMPLETE

| Acceptance Criteria | Status |
|---------------------|--------|
| API Gateway deployed | ✅ Done |
| Candidate CRUD operations | ✅ Done |
| Client CRUD operations | ✅ Done |
| JWT validation | ✅ Done (Cognito) |
| Tenant isolation | ✅ Done (TENANT#MEDIBEE) |

### FO-002: Candidate Registration Flow — ✅ BACKEND COMPLETE

| Acceptance Criteria | Status |
|---------------------|--------|
| Registration API | ✅ Done |
| Email verification | ✅ Done |
| Phone verification | ⚠️ Cognito supports, needs testing |
| OAuth registration | ⚠️ Cognito configured, handlers needed |
| Frontend wiring | ❌ Needs integration |

### FO-003: Client Registration Flow — ✅ BACKEND COMPLETE

| Acceptance Criteria | Status |
|---------------------|--------|
| Organisation registration API | ✅ Done |
| Email verification | ✅ Done |
| Admin approval queue API | ✅ Done |
| Frontend wiring | ❌ Needs integration |

---

## PHASE 1: MVP IDENTITY & DISCOVERY — ⚠️ BACKEND COMPLETE, FRONTEND NEEDED

### FO-100: Candidate Profile System — ✅ BACKEND COMPLETE

| Acceptance Criteria | Backend | Frontend |
|---------------------|---------|----------|
| Profile CRUD API | ✅ Done | ❌ Needs UI |
| Experience timeline API | ✅ Done | ❌ Needs UI |
| Care settings | ✅ Done | ❌ Needs UI |
| Profile completion | ✅ Done | ❌ Needs UI |

### FO-101: Credential Wallet — ✅ BACKEND COMPLETE

| Acceptance Criteria | Backend | Frontend |
|---------------------|---------|----------|
| Document upload (S3 presigned) | ✅ Done | ❌ Needs UI |
| Credential listing | ✅ Done | ❌ Needs UI |
| Admin verification queue | ✅ Done | ❌ Needs UI |
| Document viewing | ✅ Done | ❌ Needs UI |

### FO-102: Provider Candidate Discovery — ✅ BACKEND COMPLETE

| Acceptance Criteria | Backend | Frontend |
|---------------------|---------|----------|
| Browse candidates API | ✅ Done | ❌ Needs UI |
| Filtering (availability, care setting) | ✅ Done | ❌ Needs UI |
| Candidate cards | N/A | ❌ Needs UI |

### FO-103: Shortlist Management — ✅ BACKEND COMPLETE

| Acceptance Criteria | Backend | Frontend |
|---------------------|---------|----------|
| Create shortlist | ✅ Done | ❌ Needs UI |
| Add to shortlist | ✅ Done | ❌ Needs UI |
| List shortlists | ✅ Done | ❌ Needs UI |

### FO-104: Introduction Request Workflow — ✅ BACKEND COMPLETE

| Acceptance Criteria | Backend | Frontend |
|---------------------|---------|----------|
| Request introduction API | ✅ Done | ❌ Needs UI |
| Credit checking | ✅ Done | N/A |
| Introduction listing | ✅ Done | ❌ Needs UI |
| Admin facilitation queue | ✅ Done | ❌ Needs UI |
| Status updates | ✅ Done | ❌ Needs UI |

### FO-105/106/107: Dashboards — ⚠️ API READY, UI SCAFFOLDED

| Dashboard | API | UI |
|-----------|-----|-----|
| Candidate | ✅ Profile/credentials APIs exist | ⚠️ Scaffold exists |
| Client | ✅ Shortlist/intro APIs exist | ⚠️ Scaffold exists |
| Admin | ✅ Analytics API exists | ⚠️ Scaffold exists |

---

## PHASE 2: TRUST EXPANSION — ❌ NOT STARTED

> **Status:** Not started
> **Blocked by:** Phase 1 frontend integration should complete first

### FO-200: Candidate Testimonials — ❌ NOT STARTED
### FO-201: Employer Brand Profiles — ❌ NOT STARTED
### FO-202: Premium Visibility — ❌ NOT STARTED

---

## PHASE 3: MONETISATION — ❌ NOT STARTED

> **Status:** Not started
> **Note:** Data model for credits exists in client handler

### FO-300: Stripe Integration — ❌ NOT STARTED
### FO-301: Employer Subscriptions — ❌ NOT STARTED
### FO-302: Candidate Subscriptions — ❌ NOT STARTED
### FO-303: Introduction Credit Packs — ❌ NOT STARTED

---

## PHASE 4: TRUST SIGNALS (ADVANCED) — ❌ NOT STARTED

### FO-400: QR Verification — ❌ NOT STARTED
### FO-401: Compliance Readiness Scoring — ❌ NOT STARTED
### FO-402: Advanced Search & Matching — ❌ NOT STARTED

---

# REVISED RELEASE PLAN

## Release 1: Frontend Integration (Week 1-3)

**Goal:** Wire existing frontend UI to deployed backend API

| Task | Effort |
|------|--------|
| Deploy backend to dev | 1 day |
| Update API client URLs | 0.5 day |
| Wire login pages to auth API | 2 days |
| Test registration e2e | 1 day |
| Wire candidate profile pages | 3 days |
| Wire client browse/shortlist | 3 days |
| Wire admin dashboard | 2 days |

**Exit Criteria:** Users can register, login, and use basic portal features.

---

## Release 2: Dashboard Completion (Week 4-5)

**Goal:** Dashboards show real data

| Task | Effort |
|------|--------|
| Candidate dashboard widgets | 3 days |
| Client dashboard widgets | 3 days |
| Admin dashboard widgets | 3 days |
| Error handling & loading states | 2 days |

**Exit Criteria:** All dashboards fully functional with real data.

---

## Release 3: Monetisation (Week 6-9)

**Goal:** Stripe subscriptions operational

| Task | Effort |
|------|--------|
| Stripe integration (backend) | 5 days |
| Subscription UI | 5 days |
| Credit gating | 3 days |
| Subscription management | 3 days |

**Exit Criteria:** Providers can subscribe and introductions are credit-gated.

---

## Release 4: Trust Features (Week 10-13)

**Goal:** Testimonials and employer profiles

| Task | Effort |
|------|--------|
| Testimonials (full stack) | 8 days |
| Employer profiles (full stack) | 8 days |
| Admin moderation | 3 days |

**Exit Criteria:** Trust layer operational.

---

# METRICS & SUCCESS CRITERIA

## PRD Section 8 Metrics (Unchanged)

| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Candidate Profile Activation | 100 | 500 |
| Exposure-to-Introduction Conversion | 5% | 10% |
| Employer Subscription Growth | 10 | 50 |
| Credential Wallet Utilisation | 60% | 80% |
| Repeat Introduction Rate | 20% | 40% |

---

# DOCUMENT HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-19 | CPO/COO | Initial backlog (contained errors) |
| 1.1 | 2026-03-19 | CPO/COO | **REVISED** - Corrected backend status from "not started" to "complete" |

---

*End of Product Backlog v1.1 (REVISED)*
