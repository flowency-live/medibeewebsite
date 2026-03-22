# MEDIBEE DECISIONS LOG
## Cell / Hive / Colony Model - Stakeholder Session

**Date:** 22 March 2026
**Attendees:** All Stakeholders
**Facilitator:** CPO/COO

---

# DECISIONS MADE

## CRITICAL DECISIONS (Resolved)

### BQ-01: Contact Mechanism
**Decision:** Unlimited Direct Contact

- Colony subscription (£49.99/mo) includes unlimited contact requests
- Colony can see contact details for ALL candidates (Cell and Hive)
- No facilitation required - direct contact for everyone
- No credit system - included in flat subscription

---

### BQ-02: Existing Candidate Migration
**Decision:** N/A - No Existing Users

- Platform is not live yet
- No migration required
- Launch fresh with Cell/Hive/Colony model

---

### BQ-03: Existing Client Migration
**Decision:** N/A - No Existing Users

- Platform is not live yet
- No migration required
- Launch fresh with Colony model

---

### BQ-04: Verification Delivery Model
**Decision:** Outsourced UK Partner

- Partner (to be selected): Sterling, Experian, or specialist verification company
- SLA: Determined by supplier agreement (cascading SLA)
- Medibee defines criteria, partner executes reviews

---

### BQ-05: Legal Review
**Decision:** Internal Review Sufficient

- Positioning: "Verification and document review service" (NOT work-finding)
- Internal leadership sign-off on T&Cs
- No external legal counsel required

---

## HIGH PRIORITY DECISIONS (Resolved)

### BQ-06: Colony Tier Structure
**Decision:** Single Tier @ £49.99/month

- One price, unlimited access
- No Bronze/Silver/Gold tiers
- Can add team seats or tiers later if demand warrants

---

### BQ-07: Cell Feature Limits
**Decision:** No Hard Limits on Profile Fields

- Cell and Hive have same profile field capacity
- No character limits, no entry limits
- Differentiation is ONLY: Vault, Passport, Badges
- Simpler to implement

---

### BQ-08: Hive Lapse Behaviour
**Decision:** Downgrade to Cell, Vault Hidden

- When Hive subscription lapses, user becomes Cell
- Vault access completely hidden
- Documents preserved but inaccessible until resubscribe
- Passport goes inactive

---

### BQ-09: Badge Expiry Policy
**Decision:** 12 Months Standard

- All verification badges expire 12 months after award
- User must re-purchase Verification Pack to renew badges
- Creates recurring verification revenue

---

### BQ-10: Hive Free Trial
**Decision:** No Trial

- £4.99/month is low enough barrier
- No free trial period
- Users pay immediately or stay as Cell

---

### BQ-11: Partner Perks
**Decision:** Phase 2

- Partner perks and wellbeing benefits are NOT v1
- Focus v1 on core: Vault, Passport, Verification
- Add perks in Phase 2 once partnerships secured

---

### BQ-12: Verification Pack Tiers
**Decision:** Standard + Fast Track Add-on

- Standard Pack: £29 (normal SLA)
- Fast Track Add-on: +£15 (priority processing)
- Single pack type, optional expedite

---

## MEDIUM PRIORITY DECISIONS (Resolved)

### PQ-01: Passport QR Destination
**Decision:** Public Verification Page

- QR links to public page (no login required)
- Shows: Name, photo, membership status, badge summary, last verification date
- Quick trust check for employers

---

### PQ-02: Cell Contact Visibility
**Decision:** All Visible

- Colony can see contact details for BOTH Cell and Hive
- No facilitation layer
- Hive upgrade incentive is purely: Vault, Passport, Badges

---

### PQ-03: Search Result Ranking
**Decision:** Hive First, Then Activity

- Hive members appear before Cell in search results
- Within each tier, sort by recent activity
- Rewards premium users and engaged profiles

---

### PQ-04: Shortlist Limits
**Decision:** Unlimited

- Colony can create unlimited shortlists
- No candidate limit per shortlist
- £49.99/month is the gate, no artificial restrictions

---

### PQ-05: Vault Storage Limits
**Decision:** No Limits

- Unlimited documents per Hive member
- S3 storage is cheap
- Low risk of abuse for professional documents

---

### PQ-06: Verification Queue Priority
**Decision:** Fast Track First, Then FIFO

- Fast Track (+£15) packs processed first
- Standard packs in first-come-first-served order
- Rewards upsell purchasers

---

# SUMMARY TABLE

| Decision ID | Question | Decision |
|-------------|----------|----------|
| BQ-01 | Contact mechanism | Unlimited direct contact |
| BQ-02 | Candidate migration | N/A (no users) |
| BQ-03 | Client migration | N/A (no users) |
| BQ-04 | Verification ops | Outsourced UK partner |
| BQ-05 | Legal review | Internal sufficient |
| BQ-06 | Colony tiers | Single tier £49.99 |
| BQ-07 | Cell limits | No hard limits |
| BQ-08 | Hive lapse | Downgrade to Cell, Vault hidden |
| BQ-09 | Badge expiry | 12 months |
| BQ-10 | Hive trial | No trial |
| BQ-11 | Partner perks | Phase 2 |
| BQ-12 | Pack tiers | Standard + Fast Track |
| PQ-01 | QR destination | Public verification page |
| PQ-02 | Cell contact | All visible |
| PQ-03 | Search ranking | Hive first, then activity |
| PQ-04 | Shortlist limits | Unlimited |
| PQ-05 | Vault limits | Unlimited |
| PQ-06 | Queue priority | Fast Track first, FIFO |

---

# PRICING SUMMARY

| Product | Price | Billing |
|---------|-------|---------|
| Cell | Free | N/A |
| Hive | £4.99/month | Monthly subscription |
| Colony | £49.99/month | Monthly subscription |
| Verification Pack (Standard) | £29 | One-off |
| Fast Track Add-on | £15 | One-off (with Pack) |

---

# IMPLICATIONS FOR DEVELOPMENT

1. **No credit system needed** - Contact is unlimited in Colony subscription
2. **No migration scripts needed** - Fresh launch
3. **Simple tier logic** - Cell/Hive/Colony, no sub-tiers
4. **Vault/Passport are the key differentiators** - Profile fields are equal
5. **Badge expiry system required** - 12-month auto-expiry
6. **Fast Track queue logic** - Priority queue management
7. **Public verification page** - Unauthenticated access to Passport summary

---

*All decisions recorded during stakeholder session on 22 March 2026*
