# MEDIBEE PLATFORM PRD v4
## Cell / Hive / Colony Model

**Document Owner:** CPO
**Date:** 22 March 2026
**Version:** 4.0
**Status:** DRAFT - Pending Business Question Resolution
**Supersedes:** PRD v3 (Talent Showcase)

---

# 1. PLATFORM DEFINITION

## 1.1 What Medibee Is

Medibee is a **professional identity and verification platform for healthcare workers**.

It enables:
- Verified professional identity (profile, credentials, badges)
- Structured compliance readiness (Passport)
- Secure document management (Vault)
- Employer discovery and talent search (Colony)
- Trust signalling between candidates and employers

## 1.2 What Medibee Is NOT

Medibee is **NOT**:
- A job board (we don't post vacancies)
- A shift booking system (we don't manage schedules)
- A payroll provider (we don't process payments to workers)
- A staffing agency (we facilitate introductions, not placements)
- A replacement for employer compliance obligations (employers must still verify)

## 1.3 Platform Mental Model

```
LinkedIn     → Professional identity
DocLibrary   → Credential verification
NHS Jobs     → Healthcare focus
Recruitment agency → Human-facilitated introductions
─────────────────────────────────────────────────────
= Medibee
```

---

# 2. USER TYPES & MEMBERSHIP TIERS

## 2.1 Tier Overview

| Tier | Who | Price | Purpose |
|------|-----|-------|---------|
| **Cell** | Healthcare professionals | Free | Basic professional presence |
| **Hive** | Healthcare professionals | £4.99/month | Full professional toolkit |
| **Colony** | Recruiters & employers | £49.99/month | Talent discovery |

## 2.2 Cell Tier (Free)

### Target User
Healthcare professionals who want a basic digital presence without commitment.

### Included Features
| Feature | Description |
|---------|-------------|
| Account creation | Email + password registration |
| Basic profile | Photo, name, headline, location |
| Professional title | Role designation |
| Short bio/summary | 200 characters |
| Basic skills | Up to 5 skills |
| Basic experience | Up to 3 positions |
| Availability status | Available / Not looking |
| Platform visibility | Searchable by Colony members |
| Cell Member badge | Automatic membership badge |

### Excluded Features
| Feature | Why Excluded |
|---------|--------------|
| Vault | Premium feature |
| Passport | Premium feature |
| Verification workflow | Requires Vault |
| Verification badges | Requires verification |
| Expiry reminders | Requires Vault |
| Premium visibility | Upgrade incentive |
| Partner perks | Premium benefit |
| Wellbeing benefits | Premium benefit |
| Analytics | Premium feature |

### Intended Experience
> "I'm on Medibee and can be seen"

Cell members have a presence but limited capability. The experience should clearly show what they're missing.

## 2.3 Hive Tier (£4.99/month)

### Target User
Healthcare professionals who want to be organised, credible, and hire-ready.

### Included Features

**Everything in Cell, plus:**

| Category | Feature | Description |
|----------|---------|-------------|
| **Profile** | Enhanced profile | Extended bio (500 chars), unlimited skills/experience |
| **Profile** | Premium visibility | Priority in search results (optional) |
| **Profile** | Hive Member badge | Premium membership badge |
| **Vault** | Secure document upload | Encrypted storage for credentials |
| **Vault** | Document categories | ID, DBS, RTW, Qualifications, Training, etc. |
| **Vault** | Expiry tracking | Log expiry dates per document |
| **Vault** | Renewal reminders | Notifications before expiry |
| **Vault** | Document status | Uploaded / Pending / Verified / Expired |
| **Passport** | Passport page | Structured verification summary |
| **Passport** | QR verification | Scannable QR code for instant check |
| **Passport** | Compliance overview | Visual status of all credentials |
| **Passport** | Badge display | All earned badges shown |
| **Verification** | Verification workflow access | Ability to purchase Verification Pack |
| **Verification** | Status badges (if earned) | Verified Profile, ID Verified, etc. |
| **Tools** | Compliance dashboard | Overview of document status |
| **Tools** | Update prompts | Guidance on what to improve |
| **Benefits** | Partner perks | TBD - discounts, offers |
| **Benefits** | Wellbeing access | Discounted counselling (TBD) |
| **Support** | Premium support | Priority response |

### Excluded Features
| Feature | Why Excluded |
|---------|--------------|
| Recruiter search | Colony feature |
| Employer dashboard | Colony feature |
| Candidate shortlisting | Colony feature |

### Intended Experience
> "I'm organised, verified, and easier to shortlist"

## 2.4 Colony Tier (£49.99/month)

### Target User
Recruiters, employers, and hiring teams searching for healthcare professionals.

### Included Features

| Category | Feature | Description |
|----------|---------|-------------|
| **Search** | Candidate search | Full-text search across profiles |
| **Search** | Role filter | Filter by job title/role |
| **Search** | Location filter | Filter by location/radius |
| **Search** | Skills filter | Filter by skills |
| **Search** | Availability filter | Show only available candidates |
| **Search** | Badge/status filter | Filter by verification status |
| **Search** | Tier filter | Show Cell only, Hive only, or both |
| **Discovery** | Profile viewing | View full candidate profiles |
| **Discovery** | Cell vs Hive indicator | Clear visual distinction |
| **Discovery** | Verification status | See which badges earned |
| **Discovery** | Passport viewing | View candidate Passports (Hive only) |
| **Tools** | Shortlist creation | Create named shortlists |
| **Tools** | Save candidates | Quick save for later |
| **Tools** | Recruiter dashboard | Overview of activity |
| **Tools** | Employer profile | Organisation details |
| **Verification** | QR scanning | Verify candidate Passport via QR |

### Excluded Features
| Feature | Why Excluded |
|---------|--------------|
| Candidate Vault | Candidate feature |
| Candidate Passport | Candidate feature |
| Candidate perks | Candidate feature |

### Intended Experience
> "I can find suitable workers faster and with less admin"

### Open Question: Introduction Mechanism
**[BQ-01] How do Colony members contact candidates?**

Options:
1. Credit-based introductions (like previous model)
2. Unlimited contact requests (included in subscription)
3. Medibee-facilitated introductions only
4. Direct contact for Hive members, facilitated for Cell

---

# 3. VERIFICATION PACK (Add-on Product)

## 3.1 Product Definition

The Verification Pack is a **one-off paid service** for Hive members that reviews uploaded documents and awards verification badges.

| Attribute | Value |
|-----------|-------|
| Price | £29 (one-off) |
| Prerequisite | Active Hive subscription |
| Deliverable | Document review + badge outcomes |
| SLA | TBD (24-48 hours suggested) |

## 3.2 What's Included

| Item | Description |
|------|-------------|
| ID evidence review | Check uploaded ID document |
| Qualification review | Check uploaded qualifications |
| Right to Work review | Check uploaded RTW evidence |
| DBS review | Check uploaded DBS certificate |
| Profile consistency check | Verify profile matches documents |
| Passport population | Update Passport with verified data |
| Badge awarding | Apply earned badges |
| One follow-up cycle | Request missing info once |

## 3.3 Badge Outcomes

Successful verification can award:

| Badge | Criteria |
|-------|----------|
| Verified Profile | Core details match evidence |
| Passport Ready | All required items verified |
| ID Verified | ID document reviewed and matched |
| DBS Verified | DBS certificate reviewed |
| Right to Work Verified | RTW evidence reviewed |
| Qualifications Verified | Qualification certificates reviewed |

**Important:** Badges indicate "reviewed by Medibee at point in time", not ongoing verification or guarantee.

## 3.4 What's NOT Included

| Item | Reason |
|------|--------|
| Guaranteed selection | We cannot guarantee employment |
| Employer compliance replacement | Employers must still run own checks |
| Ongoing monitoring | Point-in-time review only |
| Automatic renewal | Must re-purchase for re-verification |
| Refunds after review starts | Service already consumed |

## 3.5 Legal Positioning

The Verification Pack is positioned as a **document review and professional organisation service**, not a work-finding service.

This is important because UK law (Employment Agencies Act 1973, Conduct Regulations 2003) prohibits charging work-seekers for work-finding services.

**Compliant wording:**
> "A one-off review service that helps organise, review, and structure your key professional records for stronger profile trust and Passport readiness."

**Non-compliant wording (DO NOT USE):**
- "Pay to be chosen"
- "Get hired faster"
- "Guaranteed interviews"
- "Verified for work"

---

# 4. VAULT (Feature)

## 4.1 Definition

The Vault is a **secure document storage system** for Hive members to upload, organise, and track their professional credentials.

## 4.2 Features

| Feature | Description |
|---------|-------------|
| Secure upload | Encrypted upload to S3 with KMS |
| File types | PDF, JPEG, PNG |
| File size limit | 5MB per document |
| Categories | ID, DBS, RTW, Qualifications, Training, OH, References, CV, Professional Registration |
| Expiry dates | Assign expiry date to each document |
| Renewal reminders | Email/notification before expiry |
| Document status | Uploaded, Pending Review, Verified, Expired, Update Required |
| Replace/update | Upload new version of document |
| Delete | Remove document (GDPR) |
| Category filter | Filter by document type |

## 4.3 Document Categories

| Category | Examples | Typical Expiry |
|----------|----------|----------------|
| ID | Passport, driving licence, national ID | Per document |
| DBS | DBS certificate, update service | Varies by policy |
| Right to Work | Passport, visa, share code, settled status | Per document |
| Qualifications | NVQ, diplomas, degrees | Usually none |
| Training Certificates | Manual handling, medication, PMVA | 1-3 years |
| Occupational Health | Health clearance, immunisation records | Varies |
| References | Employment references | Usually none |
| CV/Resume | Current CV | None |
| Professional Registration | NMC, HCPC, etc. | Annual renewal |
| Employment History | Contracts, P45s | None |

## 4.4 Important Distinction

**Vault upload ≠ Automatic verification**

A document can be:
- Uploaded (stored in Vault)
- Categorised (assigned to category)
- Expiry-tracked (reminder set)

WITHOUT being verified.

Verification requires purchasing a Verification Pack.

---

# 5. PASSPORT (Feature)

## 5.1 Definition

The Passport is a **public-facing structured summary** of a Hive member's professional readiness and verification status.

## 5.2 Components

| Component | Description |
|-----------|-------------|
| Profile photo | From main profile |
| Full name | From main profile |
| Professional title | From main profile |
| Medibee ID | Unique reference number |
| QR code | Links to verification check page |
| Membership badge | Hive Member badge |
| Verification badges | All earned status badges |
| Compliance summary | Status of key credentials |
| Expiry indicators | Visual warning for expiring items |
| Readiness status | Not Ready / Partial / Ready |
| Last updated | Timestamp |

## 5.3 Passport Ready Status Logic

| Status | Criteria |
|--------|----------|
| Not Ready | No verifications completed |
| Partial | Some verifications completed |
| Passport Ready | All role-relevant verifications completed |

## 5.4 QR Verification Flow

```
Colony scans QR code
        │
        ▼
Browser opens Passport verification page
        │
        ▼
Page shows:
• Member name + photo
• Membership status (active/lapsed)
• Badge status (valid/expired)
• Last verification date
• Compliance summary
```

## 5.5 Future Features (Not v1)

- Downloadable PDF Passport
- Shareable link with access controls
- Passport analytics (who viewed)
- Embeddable Passport widget

---

# 6. BADGE SYSTEM

## 6.1 Badge Types

### Membership Badges (Automatic)

| Badge | Awarded When | Expires |
|-------|-------------|---------|
| Medibee Cell Member | Cell account created | While account active |
| Medibee Hive Member | Hive subscription active | When subscription ends |

### Verification Badges (Earned)

| Badge | Awarded When | Expires | Notes |
|-------|-------------|---------|-------|
| Verified Profile | Core details reviewed and matched | 12 months or on major profile change | Good first trust badge |
| Passport Ready | All required items verified | When any item expires | Summary readiness badge |
| ID Verified | ID document reviewed | 12 months or on ID change | Point-in-time review |
| DBS Verified | DBS certificate reviewed | Per Medibee policy (6-12 months) | Point-in-time review |
| Right to Work Verified | RTW evidence reviewed | Until evidence expiry | Point-in-time review |
| Qualifications Verified | Qualification evidence reviewed | Usually long-lived | Point-in-time review |
| Training Verified | Training certificate reviewed | Until training expiry | Role-specific |
| Professional Registration Verified | Registration evidence reviewed | Until registration renewal | Regulated roles |

### System Status Badges

| Badge | Meaning | Visible to Colony? |
|-------|---------|-------------------|
| Expiring Soon | Item nearing expiry | Optional |
| Update Required | Item needs replacement | Optional |
| Pending Review | Evidence awaiting review | No |

## 6.2 Badge Display Rules

| Context | What Shows |
|---------|------------|
| Search results (Colony) | Hive badge + Passport Ready (if earned) |
| Profile view (Colony) | All membership + verification badges |
| Passport page | All membership + verification badges |
| Profile card (Member) | All badges with status |

## 6.3 Badge Revocation

Badges can be removed when:
- Subscription lapses (Hive badge)
- Document expires (relevant verification badge)
- Verification expires (time-based badges)
- Mismatch discovered (all relevant badges)
- Account suspended (all badges hidden)

---

# 7. COLONY SEARCH & DISCOVERY

## 7.1 Search Interface

Colony members can search by:

| Filter | Options |
|--------|---------|
| Keywords | Free text search |
| Role | Dropdown of roles |
| Location | Postcode + radius |
| Skills | Multi-select |
| Availability | Available only, All |
| Membership tier | Cell only, Hive only, Both |
| Verification status | Passport Ready only, Verified Profile only, Any |
| Specific badges | ID Verified, DBS Verified, etc. |

## 7.2 Search Results

Each result card shows:
- Profile photo
- Name
- Professional title
- Location
- Membership badge (Cell/Hive)
- Key badges (Passport Ready, Verified Profile)
- Availability indicator
- Quick actions (View, Shortlist, Save)

## 7.3 Profile View

When Colony views a candidate profile:

| Cell Member Shows | Hive Member Shows |
|-------------------|-------------------|
| Photo, name, title | Photo, name, title |
| Location | Location |
| Basic bio | Full bio |
| Basic skills | Full skills |
| Basic experience | Full experience |
| Availability | Availability |
| Cell badge | Hive badge |
| No Passport link | Passport link |
| No verification badges | All verification badges |
| Upgrade prompt visible | Full profile |

## 7.4 Shortlist Management

| Feature | Description |
|---------|-------------|
| Create shortlist | Named list (e.g., "Night shift nurses") |
| Add to shortlist | One-click from search or profile |
| Remove from shortlist | One-click |
| View shortlist | See all saved candidates |
| Delete shortlist | Remove entire list |
| Shortlist limit | TBD (unlimited or tiered?) |

---

# 8. PRICING & BILLING

## 8.1 Price Points

| Product | Price | Billing |
|---------|-------|---------|
| Cell | Free | N/A |
| Hive | £4.99/month | Monthly subscription |
| Colony | £49.99/month | Monthly subscription |
| Verification Pack | £29 | One-off purchase |

## 8.2 Stripe Integration

All paid products use Stripe:
- Hive: `price_hive_monthly`
- Colony: `price_colony_monthly`
- Verification Pack: One-off checkout session

## 8.3 Subscription Lifecycle

### Hive Subscription
```
Sign up → Trial? → Active → [Cancel/Lapse] → Grace period? → Inactive
```

### Lapsed Subscription Behaviour

**[PQ-10] What happens when Hive lapses?**

Options:
1. Vault documents frozen (can't upload, can view)
2. Vault documents hidden (can't access until resubscribe)
3. Vault documents deleted (data loss)
4. Downgrade to Cell (keep profile, lose Vault)

**Recommendation:** Option 1 or 4 (data preservation)

---

# 9. USER JOURNEYS

## 9.1 Cell Member Journey

```
1. Discover Medibee (marketing site)
2. Register (email + password)
3. Create basic profile
4. See limitations (no Vault, no Passport)
5. Receive upgrade prompts
6. Either:
   a. Stay as Cell (basic presence)
   b. Upgrade to Hive (full features)
```

## 9.2 Hive Member Journey

```
1. Register as Cell or upgrade from Cell
2. Start Hive subscription
3. Complete enhanced profile
4. Upload documents to Vault
5. Track expiry dates
6. Purchase Verification Pack (optional)
7. Receive verification badges
8. Passport becomes "Ready"
9. Appear more prominently to Colony
```

## 9.3 Colony Member Journey

```
1. Discover Medibee (marketing site)
2. Register as Colony
3. Start Colony subscription
4. Search for candidates
5. Filter by role, location, status
6. View profiles
7. Shortlist candidates
8. [BQ-01: Contact mechanism TBD]
9. Scan Passport QR for verification
```

---

# 10. SUCCESS METRICS

## 10.1 Acquisition Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Cell registrations | New Cell accounts | 500/month |
| Cell-to-Hive conversion | % of Cell who upgrade | 10% |
| Hive direct sign-ups | New Hive without Cell | 50/month |
| Colony sign-ups | New Colony accounts | 20/month |

## 10.2 Engagement Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Hive profile completion | % with complete profile | 80% |
| Vault utilisation | Avg documents per Hive | 5+ |
| Verification Pack purchase | % of Hive who buy | 30% |
| Colony search activity | Searches per Colony/month | 20+ |
| Shortlist activity | Candidates shortlisted/Colony | 15+ |

## 10.3 Revenue Metrics

| Metric | Definition |
|--------|------------|
| Hive MRR | Hive subscriptions × £4.99 |
| Colony MRR | Colony subscriptions × £49.99 |
| Verification Pack revenue | Packs sold × £29 |
| Total MRR | Hive MRR + Colony MRR |
| ARPU (Candidate) | Revenue / active candidates |
| ARPU (Employer) | Revenue / active employers |

## 10.4 Retention Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Hive monthly churn | % Hive cancelled/month | <5% |
| Colony monthly churn | % Colony cancelled/month | <10% |
| Hive LTV | Average lifetime value | >£60 |
| Colony LTV | Average lifetime value | >£300 |

---

# 11. PHASE 1 MVP SCOPE

## 11.1 In Scope

| Area | Features |
|------|----------|
| Cell | Registration, basic profile, visibility |
| Hive | Registration, subscription, full profile, Vault, Passport, badges |
| Colony | Registration, subscription, search, filters, shortlists, profile view |
| Verification Pack | Purchase flow, review queue, badge awarding |
| Payments | Stripe subscriptions + one-off |
| Admin | Verification queue, user management |

## 11.2 Out of Scope (Phase 2+)

| Feature | Phase |
|---------|-------|
| Downloadable Passport PDF | Phase 2 |
| Partner perks integration | Phase 2 |
| Wellbeing benefits | Phase 2 |
| Colony team seats | Phase 2 |
| Advanced analytics | Phase 2 |
| Automated verification (OCR) | Phase 3 |
| Mobile app | Phase 3 |

---

# 12. APPENDICES

## Appendix A: Terminology

| Term | Definition |
|------|------------|
| Cell | Free membership tier for healthcare professionals |
| Hive | Premium membership tier for healthcare professionals |
| Colony | Membership tier for recruiters and employers |
| Vault | Secure document storage (Hive feature) |
| Passport | Public verification summary (Hive feature) |
| Verification Pack | One-off document review service |
| Badge | Visual trust indicator on profile |

## Appendix B: Related Documents

- [Strategic Pivot Analysis](./STRATEGIC_PIVOT_ANALYSIS.md)
- [Open Questions Register](./OPEN_QUESTIONS_V2.md)
- [Implementation Impact Assessment](./IMPLEMENTATION_IMPACT_ASSESSMENT.md)
- [Data Model Changes](./DATA_MODEL_CHANGES.md)

---

*Document ends. Version 4.0 - DRAFT pending business question resolution.*
