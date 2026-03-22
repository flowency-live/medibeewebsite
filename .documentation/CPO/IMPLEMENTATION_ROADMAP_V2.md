# MEDIBEE IMPLEMENTATION ROADMAP v2
## Cell / Hive / Colony Model

**Document Owner:** CPO/CTO
**Date:** 22 March 2026
**Version:** 2.1
**Status:** ✅ READY FOR DEVELOPMENT (All questions resolved)

**Related Documents:**
- [DECISIONS_LOG.md](./DECISIONS_LOG.md) - All stakeholder decisions
- [TECHNICAL_ARCHITECTURE_DDD_TDD.md](./TECHNICAL_ARCHITECTURE_DDD_TDD.md) - TDD/DDD/Hexagonal implementation

---

# 1. ROADMAP OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MEDIBEE IMPLEMENTATION ROADMAP v2                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 0 ─────────────────────────────────────────────── DECISION PHASE ──  │
│  BUSINESS DECISIONS                                            [COMPLETE]   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │ BQ-01→05     │  │ Legal        │  │ Migration    │                       │
│  │ Critical Qs  │  │ Review       │  │ Strategy     │                       │
│  │ ✅ RESOLVED  │  │ ✅ INTERNAL  │  │ ✅ N/A       │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  PHASE 1 ─────────────────────────────────────────────── FOUNDATION ───────  │
│  INFRASTRUCTURE & AUTH                                         [3 weeks]    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Data Model   │  │ Membership   │  │ Stripe       │  │ Feature      │    │
│  │ Updates      │  │ System       │  │ Products     │  │ Flags        │    │
│  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  PHASE 2 ─────────────────────────────────────────────── CANDIDATE MVP ────  │
│  CELL & HIVE TIERS                                             [4 weeks]    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Cell         │  │ Hive         │  │ Vault        │  │ Passport     │    │
│  │ Registration │  │ Subscription │  │ Feature      │  │ Feature      │    │
│  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  PHASE 3 ─────────────────────────────────────────────── VERIFICATION ─────  │
│  VERIFICATION PACK                                             [2 weeks]    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │ Pack         │  │ Admin        │  │ Badge        │                       │
│  │ Purchase     │  │ Review Queue │  │ Awarding     │                       │
│  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  PHASE 4 ─────────────────────────────────────────────── COLONY MVP ───────  │
│  EMPLOYER EXPERIENCE                                           [2 weeks]    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Colony       │  │ Search &     │  │ Shortlists   │  │ Tier         │    │
│  │ Registration │  │ Filters      │  │              │  │ Indicators   │    │
│  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  PHASE 5 ─────────────────────────────────────────────── MIGRATION ────────  │
│  EXISTING USER MIGRATION                                       [1 week]     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │ Data         │  │ User         │  │ Comms &      │                       │
│  │ Migration    │  │ Comms        │  │ Launch       │                       │
│  │ ❌ NOT START │  │ ❌ NOT START │  │ ❌ NOT START │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  TOTAL DURATION: 12 weeks                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 2. PHASE 0: BUSINESS DECISIONS (Weeks 1-2)

## 2.1 Objectives
- Resolve all CRITICAL business questions
- Complete legal review
- Define migration strategy
- Finalise pricing and features

## 2.2 Deliverables

| Deliverable | Owner | Due |
|-------------|-------|-----|
| BQ-01 decided (Introduction mechanism) | CEO/CPO | Day 3 |
| BQ-02 decided (Candidate migration) | CEO/COO | Day 3 |
| BQ-03 decided (Client migration) | CEO/COO | Day 3 |
| BQ-04 decided (Verification delivery) | COO | Day 5 |
| BQ-05 complete (Legal review) | Legal | Day 10 |
| HIGH priority questions resolved | CPO | Day 10 |
| Migration strategy documented | CTO/COO | Day 10 |

## 2.3 Exit Criteria
- [x] All CRITICAL questions have documented decisions ✅
- [x] Legal sign-off on Verification Pack positioning (internal review sufficient) ✅
- [x] Migration strategy approved (N/A - no existing users) ✅
- [x] Phase 1 planning complete ✅

**All Phase 0 criteria met on 22 March 2026.**

---

# 3. PHASE 1: FOUNDATION (Weeks 3-5)

## 3.1 Objectives
- Update data model for Cell/Hive/Colony
- Implement membership system
- Configure Stripe products
- Set up feature flags

## 3.2 Week 3: Data Model & Infrastructure

| Task | Owner | Days |
|------|-------|------|
| Update DynamoDB schema | Backend | 2 |
| Create Membership entity | Backend | 1 |
| Create Badge entity (enhanced) | Backend | 1 |
| Create Passport entity | Backend | 1 |
| Create Verification Pack entity | Backend | 1 |
| Set up feature flags (LaunchDarkly/custom) | Full-stack | 1 |

## 3.3 Week 4: Membership System

| Task | Owner | Days |
|------|-------|------|
| Membership CRUD operations | Backend | 2 |
| Membership → Candidate linking | Backend | 1 |
| Tier-based feature gating logic | Backend | 2 |
| Unit tests for membership | Backend | 1 |

## 3.4 Week 5: Stripe Integration

| Task | Owner | Days |
|------|-------|------|
| Create Stripe products (Hive, Colony, Packs) | Backend | 1 |
| Subscription checkout flow | Backend | 2 |
| One-off payment flow (Verification Pack) | Backend | 1 |
| Webhook handlers | Backend | 2 |
| Integration tests | Backend | 1 |

## 3.5 Exit Criteria
- [ ] Membership system functional
- [ ] Stripe subscriptions working (test mode)
- [ ] Feature flags operational
- [ ] All Phase 1 tests passing

---

# 4. PHASE 2: CANDIDATE MVP (Weeks 6-9)

## 4.1 Objectives
- Implement Cell and Hive registration
- Build Vault feature
- Build Passport feature
- Tier-based UI gating

## 4.2 Week 6: Registration & Tier Selection

| Task | Owner | Days |
|------|-------|------|
| Cell registration flow (frontend) | Frontend | 2 |
| Hive registration + checkout (frontend) | Frontend | 2 |
| Registration API updates (backend) | Backend | 2 |
| Membership badge assignment | Backend | 1 |

## 4.3 Week 7: Vault Feature

| Task | Owner | Days |
|------|-------|------|
| Vault API endpoints | Backend | 2 |
| Vault UI (rename from Credential Wallet) | Frontend | 2 |
| Document categories & filtering | Frontend | 1 |
| Expiry tracking & reminders | Backend | 2 |

## 4.4 Week 8: Passport Feature

| Task | Owner | Days |
|------|-------|------|
| Passport API endpoints | Backend | 2 |
| Passport page UI | Frontend | 3 |
| QR code generation | Backend | 1 |
| Public verification page | Frontend | 2 |

## 4.5 Week 9: Tier Gating & Polish

| Task | Owner | Days |
|------|-------|------|
| Cell feature limitations (frontend) | Frontend | 2 |
| Upgrade prompts & CTAs | Frontend | 2 |
| Dashboard tier awareness | Frontend | 2 |
| Integration testing | Full-stack | 2 |

## 4.6 Exit Criteria
- [ ] Cell users can register and create limited profile
- [ ] Hive users can subscribe and access full features
- [ ] Vault functional for Hive users
- [ ] Passport viewable and QR working
- [ ] Upgrade path from Cell to Hive working

---

# 5. PHASE 3: VERIFICATION PACK (Weeks 10-11)

## 5.1 Objectives
- Implement Verification Pack purchase
- Build admin review queue
- Implement badge awarding

## 5.2 Week 10: Purchase & Queue

| Task | Owner | Days |
|------|-------|------|
| Verification Pack checkout | Frontend | 2 |
| Pack creation API | Backend | 1 |
| Admin verification queue UI | Frontend | 3 |
| Claim & review workflow API | Backend | 2 |

## 5.3 Week 11: Review & Badges

| Task | Owner | Days |
|------|-------|------|
| Document review interface | Frontend | 2 |
| Badge awarding logic | Backend | 2 |
| Passport update on badge award | Backend | 1 |
| Email notifications | Backend | 1 |
| Testing | Full-stack | 2 |

## 5.4 Exit Criteria
- [ ] Hive users can purchase Verification Pack
- [ ] Admins can claim and review packs
- [ ] Badges awarded correctly
- [ ] Passport updates reflect badges

---

# 6. PHASE 4: COLONY MVP (Weeks 12-13)

## 6.1 Objectives
- Implement Colony registration and subscription
- Update search with tier indicators
- Shortlist functionality

## 6.2 Week 12: Colony Registration & Search

| Task | Owner | Days |
|------|-------|------|
| Colony registration flow | Frontend | 2 |
| Colony subscription checkout | Frontend | 1 |
| Rename Client → Colony throughout | Full-stack | 1 |
| Search UI with tier indicators | Frontend | 2 |
| Search filters (tier, badges) | Backend | 2 |

## 6.3 Week 13: Shortlists & Polish

| Task | Owner | Days |
|------|-------|------|
| Shortlist updates (tier info) | Frontend | 1 |
| Candidate detail with tier info | Frontend | 2 |
| Passport viewing from Colony | Frontend | 1 |
| QR scanning capability | Frontend | 1 |
| Integration testing | Full-stack | 2 |

## 6.4 Exit Criteria
- [ ] Colony users can register and subscribe
- [ ] Search shows Cell vs Hive differentiation
- [ ] Colony can view Passports of Hive members
- [ ] Shortlists work with tier info

---

# 7. PHASE 5: MIGRATION & LAUNCH (Week 14)

## 7.1 Objectives
- Migrate existing users
- Communicate changes
- Launch new model

## 7.2 Week 14: Migration & Launch

| Task | Owner | Days |
|------|-------|------|
| Run migration script (staging) | Backend | 1 |
| Verify migration results | QA | 1 |
| User communication (email, in-app) | Marketing | 1 |
| Run migration script (production) | Backend | 1 |
| Monitor and hotfix | Full-stack | 2 |
| Launch announcement | Marketing | 1 |

## 7.3 Exit Criteria
- [ ] All existing users migrated
- [ ] No data loss
- [ ] Users informed of changes
- [ ] System stable post-migration

---

# 8. RISK REGISTER

## 8.1 Strategic Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Cell-to-Hive conversion too low | High | High | A/B test upgrade flows, free trial | CPO |
| Existing users churn at migration | High | Medium | Grandfather period, clear comms | COO |
| Colony price point wrong | Medium | Medium | Monitor, adjust in 90 days | CEO |
| Legal challenge on Verification Pack | Low | Critical | Pre-launch legal review | Legal |

## 8.2 Operational Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Verification Pack backlog | Medium | High | Outsource, SLA monitoring | COO |
| Verification quality issues | Medium | High | QA process, training | COO |
| Support volume increase | Medium | Medium | FAQs, self-service | COO |

## 8.3 Technical Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Data migration issues | Medium | High | Staging test, rollback plan | CTO |
| Stripe integration problems | Low | Medium | Follow Stripe best practices | CTO |
| Feature flag complexity | Medium | Medium | Clear documentation | CTO |
| Performance degradation | Low | Medium | Load testing pre-launch | CTO |

## 8.4 Financial Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Revenue dip during transition | Medium | Medium | Grandfather existing revenue | CFO |
| Verification Pack unit economics | Medium | Medium | Monitor cost per review | CFO |
| Churn higher than modelled | Medium | High | Retention campaigns | CEO |

---

# 9. RESOURCE REQUIREMENTS

## 9.1 Team Structure

| Role | FTE | Notes |
|------|-----|-------|
| Backend Engineer | 1.0 | Full-time on project |
| Frontend Engineer | 1.0 | Full-time on project |
| Product Manager | 0.5 | Part-time oversight |
| QA Engineer | 0.5 | Part-time testing |
| Designer | 0.25 | As needed |

## 9.2 Timeline Summary

| Phase | Duration | Team Days |
|-------|----------|-----------|
| Phase 0: Decisions | 2 weeks | 10 (leadership) |
| Phase 1: Foundation | 3 weeks | 30 |
| Phase 2: Candidate MVP | 4 weeks | 40 |
| Phase 3: Verification | 2 weeks | 20 |
| Phase 4: Colony MVP | 2 weeks | 20 |
| Phase 5: Migration | 1 week | 10 |
| **Total** | **14 weeks** | **130 days** |

## 9.3 Dependencies

| Dependency | Blocks | Status |
|------------|--------|--------|
| Open questions resolved | Phase 1 start | PENDING |
| Legal review complete | Phase 3 start | PENDING |
| Stripe account ready | Phase 1 | DONE |
| Verification partner | Phase 3 | PENDING |

---

# 10. SUCCESS CRITERIA

## 10.1 Launch Criteria (Week 14)

- [ ] All features functional per PRD
- [ ] All tests passing
- [ ] Legal sign-off complete
- [ ] Migration successful
- [ ] Monitoring in place

## 10.2 30-Day Post-Launch Metrics

| Metric | Target |
|--------|--------|
| Cell registrations | 200+ |
| Hive conversions | 20+ |
| Colony registrations | 10+ |
| Verification Packs sold | 5+ |
| System uptime | >99.5% |
| Critical bugs | 0 |

## 10.3 90-Day Success Metrics

| Metric | Target |
|--------|--------|
| Monthly Hive MRR | £500+ |
| Monthly Colony MRR | £500+ |
| Verification Pack revenue | £500+ |
| Hive retention (monthly) | >85% |
| Colony retention (monthly) | >90% |
| NPS (candidates) | >30 |
| NPS (employers) | >30 |

---

# 11. NEXT STEPS (Immediate)

| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| ~~Schedule leadership meeting for BQ decisions~~ | CPO | Day 1 | ✅ Complete |
| ~~Engage legal for Verification Pack review~~ | COO | Day 1 | ✅ Internal review sufficient |
| Brief engineering team on scope | CTO | Day 1 | → Start |
| Review [TECHNICAL_ARCHITECTURE_DDD_TDD.md](./TECHNICAL_ARCHITECTURE_DDD_TDD.md) | CTO | Day 1 | → Start |
| Create detailed sprint plan for Phase 1 | CTO | Day 3 | Pending |
| Identify verification partner options | COO | Day 5 | Pending |
| Set up Stripe products in test mode | Backend | Day 3 | Pending |

---

# 12. TDD IMPLEMENTATION APPROACH

**Per CLAUDE.md, all development follows TDD:**

1. **Write failing test first** (RED)
2. **Write minimum code to pass** (GREEN)
3. **Refactor only if clear value** (REFACTOR)

See [TECHNICAL_ARCHITECTURE_DDD_TDD.md](./TECHNICAL_ARCHITECTURE_DDD_TDD.md) for:
- Bounded context definitions
- Hexagonal architecture ports/adapters
- Domain entity test examples
- Integration test patterns
- Folder structure

---

*Document updated 22 March 2026. Phase 0 complete. Ready for Phase 1 development.*
