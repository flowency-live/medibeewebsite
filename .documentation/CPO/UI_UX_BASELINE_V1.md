# MEDIBEE UI/UX BASELINE v1

**Date:** 22 March 2026
**Status:** ACTIVE - This is the source of truth
**Supersedes:** All previous design specs, brand guides, and PRD UI references

---

## 1. DESIGN PHILOSOPHY

### Core Principle
**Professional healthcare platform with premium SaaS aesthetic.**

Not a recruitment agency website. Not a job board. A **platform** that healthcare professionals and employers trust with their credentials and hiring.

### Visual Identity
- **Dark theme** - Near-black backgrounds (#0D0D0D)
- **Gold accents** - Premium feel, trust signal
- **Honeycomb patterns** - Denim-textured, brand signature (5-10% opacity, NOT loud)
- **Glassmorphism cards** - Elevated, modern UI elements
- **Healthcare imagery** - Real people in professional settings

---

## 2. TWO PERSONAS (FUNDAMENTAL)

**This drives ALL design and UX decisions.**

```
CANDIDATES (Healthcare Professionals)
├── Cell (Free) ─────── Basic profile, visibility
└── Hive (£4.99/mo) ─── Vault, Passport, verification badges

CLIENTS (Employers)
└── Colony (From £100/mo) ─── Talent discovery, full profiles
```

### Persona-Driven Design Rules

| Element | Candidates (Cell/Hive) | Clients (Colony) |
|---------|------------------------|------------------|
| Portal | `/candidate/*` | `/client/*` |
| Hero CTA | "Join as a Candidate" (gold filled) | "Join as an Employer" (outline) |
| Tier Card CTA | "Get Started" (gold filled) | "Contact Us" (gold outline) |
| Badge Style | Cell=outline, Hive=filled | Colony=outline |
| Core Features | Profile, Vault, Passport | Search, Shortlist, Contact |

### Cell vs Hive Distinction

| Feature | Cell (Free) | Hive (£4.99/mo) |
|---------|-------------|-----------------|
| Profile | ✓ Basic | ✓ Full |
| Vault | ✗ | ✓ Secure document storage |
| Passport | ✗ | ✓ QR verification summary |
| Verification Badges | ✗ | ✓ (via £29 Verification Pack) |
| Search Visibility | Basic | Premium (appears first) |
| Tier Badge | "MEDIBEE CELL MEMBER" outline | "MEDIBEE HIVE MEMBER" filled |

---

## 3. HOMEPAGE HERO

### Background
- Healthcare professionals photo (real, not stock-looking)
- Dark gradient overlay (heavy - 75-90% opacity)
- Subtle honeycomb texture fading in at bottom edges

### Headline
```
Connecting Healthcare Professionals & Employers
```
- "Healthcare" and "Employers" in **gold**
- "Connecting" and "&" in **white/cream**

### Subline
```
Join the most trusted platform for compliant healthcare hiring.
```

### Dual CTAs
| CTA | Style | Link |
|-----|-------|------|
| "Join as a Candidate" | Gold filled button | `/candidate/register` |
| "Join as an Employer" | White/cream outline button | `/client/register` |

---

## 3. PLATFORM PREVIEW CARDS (Hero Section)

Three floating glassmorphism cards showcasing the product:

### Card 1: Medibee Passport (Left)
**Position:** Left side, slight rotation (-3°)
**Header:** Green checkmark icon + "Your Medibee Passport"
**Content:**
- QR code (actual scannable placeholder)
- Verification checklist:
  - ✓ Verified DBS Check
  - ✓ ID Verified
  - ✓ Right to Work Approved
  - ✓ Training Completed
  - ✓ Documents Up to Date

### Card 2: Candidate Profile (Center)
**Position:** Center, largest card, no rotation
**Header:** Medibee logo bar with "Medibee" text
**Content:**
- Avatar (initials or photo)
- Name: "Sarah Mitchell"
- Role: "Healthcare Assistant, London, UK"
- Tab navigation: Summary | Skills | Experience
- Summary text block
- Skills tags

### Card 3: Colony Dashboard (Right)
**Position:** Right side, slight rotation (+2°)
**Header:** Purple/indigo icon + "Colony Dashboard"
**Content:**
- Filter tabs: "Active Candidates" | "Interviews Scheduled" | "Job Listings"
- Candidate shortlist cards:
  - Hannah P. - Senior HCA - 98% match
  - James R. - [role] - [match]%
  - Claire S. - [role] - [match]%
- Each with avatar, "Save to list" button

---

## 4. TRUST SIGNALS BAR

Position: Bottom of hero, above fold
Background: Subtle dark gradient with border-top

Three trust badges with gold icons:

| Icon | Label |
|------|-------|
| Shield/checkmark | Secure & Compliant |
| Lightning/bee | Streamlined Hiring |
| Star/award | Trusted by the Industry |

---

## 5. TIER CARDS SECTION (Membership)

### Section Header
```
Medibee Membership
Tailored plans for healthcare professionals and employers.
```

### Background
- Dark slate
- **Prominent honeycomb texture** (denim-style, the signature look)

### Three Tier Cards

#### Cell (Free)
- **Badge:** "MEDIBEE CELL MEMBER" with bee icon, gold outline
- **Price:** "FREE"
- **Features:**
  - ✓ Free Profile
  - ✓ Basic Visibility
  - ✓ For Healthcare Workers
- **CTA:** "Get Started" (gold filled)
- **Footer:** "Need verification? Upgrade to Hive"

#### Hive (£4.99/mo)
- **Badge:** "MEDIBEE HIVE MEMBER" with bee icon, gold filled
- **Price:** "£4.99/mo" + "billed monthly"
- **Features:**
  - ✓ Full Platform Access
  - ✓ Vault & Passport Tools
  - ✓ Stay Verified & Compliant
  - ✓ For Healthcare Workers
- **CTA:** "Get Started" (gold filled)
- **Footer:** "Unlock advanced features"

#### Colony (From £100/mo)
- **Badge:** "MEDIBEE COLONY MEMBER" with bee icon, gold outline
- **Price:** "From £100/mo" + "billed monthly"
- **Features:**
  - ✓ Find & Recruit Talent
  - ✓ Unlock Full Profiles
  - ✓ Streamline Hiring Process
- **CTA:** "Contact Us" (gold outline button)
- **Footer:** "Custom solutions for employers"

---

## 6. TIER BADGE COMPONENT

### Structure
```
┌─────────────────────────────┐
│  🐝  MEDIBEE               │
│     [TIER] MEMBER          │
└─────────────────────────────┘
```

### Styling
- Hexagonal or pill shape
- Bee icon on left
- Gold text on dark background
- Subtle gold border (outline variant) or gold fill (Hive)

---

## 7. HEADER/NAVIGATION

### Logo
- Medibee bee icon + "Medibee" text
- Gold bee, white text

### Nav Items
```
Features | Pricing | About | Login
```

### CTA
- "Get Started" button (gold filled)

---

## 8. COLOR SYSTEM (CONFIRMED)

```css
/* Backgrounds */
--void: #0D0D0D;           /* Primary background */
--void-elevated: #1A1A2E;  /* Card backgrounds */
--void-light: #2D2D3A;     /* Borders, dividers */

/* Gold Accent System */
--gold: #D4AF37;           /* Primary gold */
--gold-light: #E5C158;     /* Hover states */
--gold-muted: #A08830;     /* Subdued accents */

/* Text */
--pearl: #FFFFFF;          /* Primary headings */
--pearl-soft: #F5F5DC;     /* Body text */
--pearl-muted: #9CA3AF;    /* Secondary text */

/* Tier-Specific */
--cell: #7C8A99;           /* Cell tier accent (slate) */
--hive: #D4AF37;           /* Hive tier accent (gold) */
--colony: #6366F1;         /* Colony tier accent (indigo) */
```

---

## 9. TYPOGRAPHY

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Inter | 600 (SemiBold) | 36-48px |
| H2 | Inter | 600 (SemiBold) | 28-36px |
| H3 | Inter | 600 (SemiBold) | 20-24px |
| Body | Inter | 400 (Regular) | 16-18px |
| Small | Inter | 400 (Regular) | 14px |
| Caption | Inter | 500 (Medium) | 12px |

---

## 10. COMPONENTS TO BUILD/UPDATE

### High Priority
- [ ] `TierBadge` - "MEDIBEE [TIER] MEMBER" badges with bee icon
- [ ] `TierCard` - Full pricing cards matching mockup
- [ ] `PassportPreviewCard` - For hero section
- [ ] `ProfilePreviewCard` - For hero section
- [ ] `ColonyDashboardPreviewCard` - For hero section
- [ ] `HoneycombBackground` - Denim-textured pattern

### Update Required
- [ ] Homepage hero section
- [ ] Homepage tier cards section
- [ ] Header navigation
- [ ] Trust signals bar styling

---

## 11. IMAGERY REQUIREMENTS

### Hero Background
- Professional healthcare setting
- Real people (not obviously stock)
- Natural lighting
- UK healthcare context preferred

### Placeholder for now
- Use gradient/color overlay until proper photo sourced

---

## 12. PRICING (CONFIRMED)

| Tier | Price | Billing |
|------|-------|---------|
| Cell | Free | N/A |
| Hive | £4.99/month | Monthly subscription |
| Colony | From £100/month | Monthly, custom pricing available |
| Verification Pack | £29 | One-off |
| Fast Track | +£15 | Add-on to Verification Pack |

**Note:** Colony changed from £49.99 to £100 minimum. "From" indicates custom pricing.

---

---

## 13. DESIGN FUNDAMENTALS (Match Mockups Exactly)

### Honeycomb Background
- **Opacity:** 5-10% (barely visible, NOT loud)
- **Color:** Gold lines (#D4AF37) on near-black (#0D0D0D)
- **Usage:** Behind tier cards, portal pages

### Badge Hierarchy
| Badge Type | Style |
|------------|-------|
| Hive tier | Gold FILLED |
| Cell/Colony tier | Gold OUTLINE |
| Verification badges | Dark card + colored icon |

### Button Hierarchy
| Priority | Style |
|----------|-------|
| Primary | Gold filled |
| Secondary | Dark + gold outline |
| Tertiary | Dark + gray outline |

### Typography Hierarchy
| Element | Color | Weight |
|---------|-------|--------|
| Name/heading | Cream (#F5F5DC) | SemiBold |
| Role/subtitle | Gold (#D4AF37) | Regular |
| Body text | Gray (#9CA3AF) | Regular |
| Labels | Gold, italic | Medium |

### Card Styling
- Background: #1A1A2E
- Border: Gold accent (subtle)
- Corners: 12-16px radius

---

*This document is the UI/UX source of truth. All implementation should reference this.*
