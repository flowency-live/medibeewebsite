# Medibee-Website - Project-Specific Development Guidelines

> **Inherits from:** `C:\VSProjects\CLAUDE.md` (global rules apply)
>
> This document adds project-specific context. Global rules CANNOT be overridden.
>
> **Agent boundaries**: [.claude/agent-charter.yaml](.claude/agent-charter.yaml)

---

## Project Overview

**Medibee-Website** is the marketing website AND platform for Medibee - a professional identity and verification platform for healthcare workers.

- **Purpose:** Marketing + Cell/Hive/Colony membership platform
- **Type:** Next.js application with authentication and portal features
- **Deployment:** AWS Amplify
- **Domain (Dev):** medibee.opstack.uk
- **Domain (Prod):** www.medibee-recruitment.co.uk
- **Backend:** AWS serverless (future PulsePlatform integration)

---

## Cell/Hive/Colony Membership Model

**This is the core product structure. Understand it thoroughly.**

| Tier | Price | User Type | Purpose |
|------|-------|-----------|---------|
| **Cell** | Free | Healthcare professional | Basic digital presence |
| **Hive** | £4.99/mo | Healthcare professional | Vault, Passport, verification badges |
| **Colony** | From £100/mo | Employers/recruiters | Talent discovery, full profile access |

### Cell (Free - Healthcare Workers)
- Free profile creation
- Basic visibility in search
- Cell Member badge
- **Upgrade incentive:** "Need verification? Upgrade to Hive"

### Hive (£4.99/mo - Healthcare Workers)
- Full platform access
- **Vault:** Secure document storage (DBS, RTW, qualifications)
- **Passport:** QR-scannable verification summary
- Verification badges (purchased separately via Verification Pack £29)
- Premium visibility in search results

### Colony (From £100/mo - Employers)
- Find & recruit talent
- Unlock full profiles
- Streamline hiring process
- Custom solutions available

### Verification Pack (£29 one-off, Hive only)
- Document review service
- Awards verification badges (ID Verified, DBS Verified, etc.)
- Fast Track add-on: +£15 for priority processing
- Badges expire after 12 months

**Key terminology:**
- Cell = Free tier (like a single cell in the hive)
- Hive = Premium candidate tier (full hive membership)
- Colony = Employer tier (the collective that recruits from the hive)
- Vault = Secure document storage
- Passport = Public verification summary with QR code

---

## Design System

### CRITICAL: Hexagonal/Bee Theme

**Everything is bee-themed. Hexagons are fundamental to the brand.**

When building ANY UI component, consider:
- Hexagonal shapes for badges, icons, decorative elements
- Honeycomb patterns for backgrounds and textures
- Bee imagery (the Medibee bee logo)
- Cell/Hive/Colony terminology (never generic "tier" or "plan")

**Hexagonal components already built:**
- `HexagonIcon` - Icon wrapper with hexagonal frame
- `HexagonBadge` - Tier badges (Cell/Hive/Colony Member)
- `HexagonBullet` - Bullet points with hexagon shape
- `HoneycombPattern` - SVG honeycomb background
- `HoneycombFade` - Fading honeycomb overlay
- `HoneycombCluster` - Decorative honeycomb grouping
- `LayeredHoneycomb` - Multi-layer honeycomb effect

### Brand Colours (Dark Theme)

**Primary approach: Dark backgrounds with gold accents**

```typescript
colors: {
  // Dark backgrounds
  'brand-dark': '#0D0D0D',      // Primary background (near-black)
  'brand-slate': '#1A1A2E',     // Card backgrounds, elevated surfaces
  'brand-charcoal': '#2D2D3A',  // Borders, dividers

  // Gold accent system
  'brand-gold': '#D4AF37',      // Primary gold (CTAs, highlights)
  'brand-gold-light': '#E5C158', // Hover states
  'brand-gold-muted': '#A08830', // Subdued gold, borders

  // Text colors
  'brand-cream': '#F5F5DC',     // Primary text on dark
  'brand-gray': '#9CA3AF',      // Secondary text
}
```

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | Framework (App Router) |
| TypeScript | 5.x | Type safety (strict mode) |
| Tailwind CSS | 3.x | Styling |
| Zod | 4.x | Form validation |
| React Hook Form | 7.x | Form handling |
| Vitest | 2.x | Unit testing |
| Playwright | 1.x | E2E testing |

---

## Page Structure

### Candidate Portal (Cell/Hive)
| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/candidate/dashboard` | Main candidate hub |
| Profile | `/candidate/profile` | Profile management |
| Credentials | `/candidate/credentials` | Vault document management |
| Passport | `/candidate/passport` | QR verification summary (Hive only) |

### Client Portal (Colony)
| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/client/dashboard` | Main Colony hub |
| Candidates | `/client/candidates` | Search & browse candidates |
| Shortlists | `/client/shortlists` | Saved candidate lists |

---

## Related Documentation

- [PRD v4 - Cell/Hive/Colony](.documentation/CPO/MEDIBEE_PRD_V4_CELL_HIVE_COLONY.md)
- [UI/UX Baseline v1](.documentation/CPO/UI_UX_BASELINE_V1.md)
- [Global Development Guidelines](C:\VSProjects\CLAUDE.md)

---

*Last Updated: 22 March 2026*
