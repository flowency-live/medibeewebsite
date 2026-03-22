# MEDIBEE OPEN QUESTIONS REGISTER v2
## Cell / Hive / Colony Model

**Document Owner:** CPO/COO
**Date:** 22 March 2026
**Version:** 2.1 (Updated after stakeholder session)
**Status:** ✅ ALL CRITICAL AND HIGH PRIORITY QUESTIONS RESOLVED

---

# EXECUTIVE SUMMARY

All critical and high-priority questions have been resolved in the stakeholder session on 22 March 2026.

**See full decision details:** [DECISIONS_LOG.md](./DECISIONS_LOG.md)

**Status:** ✅ READY FOR DEVELOPMENT

---

# RESOLUTION SUMMARY

| Priority | Total | Resolved | Remaining |
|----------|-------|----------|-----------|
| CRITICAL | 5 | ✅ 5 | 0 |
| HIGH | 7 | ✅ 7 | 0 |
| MEDIUM | 6 | ✅ 6 | 0 |
| TECHNICAL | 5 | 0 | 5 (dev team decides) |

---

# CRITICAL QUESTIONS - ✅ ALL RESOLVED

## BQ-01: Introduction/Contact Mechanism ✅

**Decision:** Unlimited Direct Contact
- Colony subscription (£49.99/mo) includes unlimited contact
- Contact details visible for ALL candidates (Cell and Hive)
- No credit system, no facilitation layer required

**Resolved:** 22 March 2026

---

## BQ-02: Existing Candidate Migration ✅

**Decision:** N/A - No Existing Users
- Platform is not live yet
- Launch fresh with Cell/Hive/Colony model
- No migration required

**Resolved:** 22 March 2026

---

## BQ-03: Existing Client Migration ✅

**Decision:** N/A - No Existing Users
- Platform is not live yet
- Launch fresh with Colony model
- No migration required

**Resolved:** 22 March 2026

---

## BQ-04: Verification Pack Delivery Model ✅

**Decision:** Outsourced UK Partner
- Partner to be selected (Sterling, Experian, or specialist)
- SLA cascades from supplier agreement
- Medibee defines criteria, partner executes reviews

**Resolved:** 22 March 2026

---

## BQ-05: Legal Review of Verification Pack ✅

**Decision:** Internal Review Sufficient
- Positioning: "Verification and document review service" (NOT work-finding)
- Internal leadership sign-off on T&Cs
- No external legal counsel required

**Resolved:** 22 March 2026

---

# HIGH PRIORITY QUESTIONS - ✅ ALL RESOLVED

## BQ-06: Colony Tier Structure ✅

**Decision:** Single Tier @ £49.99/month
- One price, unlimited access
- No Bronze/Silver/Gold sub-tiers
- Can add tiers later if demand warrants

**Resolved:** 22 March 2026

---

## BQ-07: Cell Feature Limits ✅

**Decision:** No Hard Limits
- Cell and Hive have same profile field capacity
- No character limits, no entry limits
- Differentiation is ONLY: Vault, Passport, Badges

**Resolved:** 22 March 2026

---

## BQ-08: Hive Subscription Lapse Behaviour ✅

**Decision:** Downgrade to Cell, Vault Hidden
- User becomes Cell member
- Vault access completely hidden
- Documents preserved but inaccessible until resubscribe
- Passport goes inactive

**Resolved:** 22 March 2026

---

## BQ-09: Badge Expiry Policy ✅

**Decision:** 12 Months Standard
- All verification badges expire 12 months after award
- User must re-purchase Verification Pack to renew badges
- Creates recurring verification revenue

**Resolved:** 22 March 2026

---

## BQ-10: Hive Free Trial ✅

**Decision:** No Trial
- £4.99/month is low enough barrier
- Users pay immediately or stay as Cell
- No free trial period

**Resolved:** 22 March 2026

---

## BQ-11: Partner Perks Specifics ✅

**Decision:** Phase 2
- Partner perks and wellbeing benefits NOT in v1
- Focus v1 on core: Vault, Passport, Verification
- Add perks in Phase 2 once partnerships secured

**Resolved:** 22 March 2026

---

## BQ-12: Verification Pack Pricing Tiers ✅

**Decision:** Standard + Fast Track Add-on
- Standard Pack: £29 (normal SLA)
- Fast Track Add-on: +£15 (priority processing)
- Single pack type, optional expedite

**Resolved:** 22 March 2026

---

# MEDIUM PRIORITY QUESTIONS - ✅ ALL RESOLVED

## PQ-01: Passport QR Implementation ✅

**Decision:** Public Verification Page
- QR links to public page (no login required)
- Shows: Name, photo, membership status, badge summary, last verification date
- Quick trust check for anyone scanning

**Resolved:** 22 March 2026

---

## PQ-02: Colony Visibility of Cell Contact Details ✅

**Decision:** All Visible
- Colony can see contact details for BOTH Cell and Hive
- No facilitation layer needed
- Hive upgrade incentive is: Vault, Passport, Badges, Search Priority

**Resolved:** 22 March 2026

---

## PQ-03: Search Result Ranking ✅

**Decision:** Hive First, Then Activity
- Hive members appear before Cell in search results
- Within each tier, sort by recent activity
- Rewards premium users and engaged profiles

**Resolved:** 22 March 2026

---

## PQ-04: Shortlist Limits ✅

**Decision:** Unlimited
- Colony can create unlimited shortlists
- No candidate limit per shortlist
- £49.99/month subscription is the gate

**Resolved:** 22 March 2026

---

## PQ-05: Vault Storage Limits ✅

**Decision:** Unlimited
- No limits on documents per Hive member
- S3 storage is cheap (~£0.023/GB)
- Low risk of abuse for professional documents

**Resolved:** 22 March 2026

---

## PQ-06: Admin Verification Queue Priority ✅

**Decision:** Fast Track First, Then FIFO
- Fast Track (+£15) packs processed first
- Standard packs in first-come-first-served order
- Rewards upsell purchasers

**Resolved:** 22 March 2026

---

# TECHNICAL QUESTIONS - FOR ENGINEERING TEAM

These can be decided by engineering during development:

| ID | Question | Recommendation |
|----|----------|----------------|
| TQ-01 | Cognito pool structure | Single pool with user groups |
| TQ-02 | Stripe product setup | Hive, Colony, Pack, FastTrack products |
| TQ-03 | Badge storage | Embedded in user document (simple) |
| TQ-04 | Passport architecture | ISR (regenerate on badge change) |
| TQ-05 | QR generation | Server-side, cache data URL in DB |

---

# FINAL PRICING TABLE

| Product | Price | Billing | Notes |
|---------|-------|---------|-------|
| Cell | Free | N/A | Basic profile only |
| Hive | £4.99/month | Subscription | Vault + Passport + Badges |
| Colony | £49.99/month | Subscription | Unlimited search + contact |
| Verification Pack | £29 | One-off | Standard SLA |
| Fast Track | +£15 | One-off add-on | Priority processing |

---

# NEXT STEPS

1. ✅ All business questions resolved
2. → Engineering team to resolve technical questions
3. → Select verification partner (COO action)
4. → Begin Phase 1 development

---

*All questions resolved in stakeholder session 22 March 2026*
*Document updated to reflect decisions*
