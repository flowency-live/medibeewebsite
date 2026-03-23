# Medibee-Website - Project-Specific Development Guidelines

> **Inherits from:** `C:\VSProjects\CLAUDE.md` (global rules apply)
>
> This document adds project-specific context. Global rules CANNOT be overridden.

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

## Relationship to PulsePlatform

Medibee Recruitment Ltd is the **first tenant** of PulsePlatform.

```
Day-1 (Static):                     Future:
┌─────────────────────┐             ┌─────────────────────┐
│ medibee.co.uk       │             │ medibee.co.uk       │
│                     │             │                     │
│ Contact Form        │             │ Contact Form        │
│     │               │             │     │               │
│     ▼               │             │     ▼               │
│  SES Email          │             │  POST /v1/enquiries │
│  (no backend)       │             │  pulse.api.opstack  │
└─────────────────────┘             └─────────────────────┘
```

**Tenant ID:** `TENANT#MEDIBEE`

---

## Technology Stack

Following DorsetTransferCompany-Website patterns:

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
// tailwind.config.ts
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

  // Legacy (being phased out)
  'slate-blue': { ... },
  gold: { ... },
  mist: '#E6E3CF',
}
```

### Tier-Specific Styling

| Tier | Badge Color | Accent | CTA Style |
|------|-------------|--------|-----------|
| Cell | Gold outline on dark | Gold checkmarks | Gold filled button |
| Hive | Gold filled badge | Gold checkmarks | Gold filled button |
| Colony | Gold outline on dark | Gold checkmarks | Gold outline button ("Contact Us") |

### Typography

```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'Arial', 'Helvetica', 'sans-serif'],
}
```

| Element | Font | Size (Desktop) | Size (Mobile) |
|---------|------|----------------|---------------|
| H1 | Inter SemiBold | 36-42px | 28-32px |
| H2 | Inter SemiBold | 28-32px | 24-28px |
| Body | Inter Regular | 16-18px | 16px |

### Design Principles

- **Dark theme with gold accents** - Professional, premium feel
- **Hexagonal everything** - Badges, icons, decorative patterns
- **Honeycomb textures** - Denim-textured honeycomb backgrounds
- **Glassmorphism cards** - Semi-transparent with backdrop blur on dark
- **Generous whitespace** - Clear content blocks
- **Max content width:** 1100-1200px
- **Mobile-first** responsive design

### Background Pattern

The signature Medibee background is a **denim-textured honeycomb pattern** on dark slate. This appears:
- Behind pricing/tier cards
- On portal dashboard backgrounds
- As subtle texture throughout

Implementation: Use `HoneycombPattern` or `LayeredHoneycomb` components with appropriate opacity.

---

## Page Structure

### Marketing Pages
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Platform showcase, tier cards, audience selector |
| Services | `/services` | For care providers |
| Work with Us | `/work-with-us` | For healthcare assistants |
| About | `/about` | Company story |
| Contact | `/contact` | Lead capture forms |
| Team | `/team` | Team page |

### Policy Pages
| Page | Route | Purpose |
|------|-------|---------|
| Privacy Policy | `/privacy-policy` | GDPR compliance |
| Safeguarding | `/safeguarding` | Public policy summary |
| Complaints | `/complaints` | Procedure explanation |
| Policies Hub | `/policies` | Links to all policy pages |
| Cookies | `/policies/cookies` | Cookie policy |
| Data Retention | `/policies/data-retention` | Data retention policy |
| Accessibility | `/policies/accessibility` | Accessibility statement |
| Modern Slavery | `/policies/modern-slavery` | Modern slavery statement |
| Equality & Diversity | `/policies/equality-diversity` | E&D policy |
| Right to Work | `/policies/right-to-work` | RTW policy |

### Candidate Portal (Cell/Hive)
| Page | Route | Purpose |
|------|-------|---------|
| Login | `/candidate/login` | Candidate authentication |
| Register | `/candidate/register` | Cell account creation |
| Onboarding | `/candidate/onboarding` | Post-registration setup |
| Dashboard | `/candidate/dashboard` | Main candidate hub |
| Profile | `/candidate/profile` | Profile management |
| Credentials | `/candidate/credentials` | Vault document management |
| Passport | `/candidate/passport` | QR verification summary (Hive only) |
| Introductions | `/candidate/introductions` | Colony contact requests |
| Settings | `/candidate/settings` | Account settings |

### Client Portal (Colony)
| Page | Route | Purpose |
|------|-------|---------|
| Login | `/client/login` | Colony authentication |
| Register | `/client/register` | Colony account creation |
| Verify Email | `/client/verify-email` | Email verification |
| Dashboard | `/client/dashboard` | Main Colony hub |
| Candidates | `/client/candidates` | Search & browse candidates |
| Candidate Detail | `/client/candidates/[id]` | Full candidate profile |
| Shortlists | `/client/shortlists` | Saved candidate lists |
| Shortlist Detail | `/client/shortlists/[id]` | Individual shortlist |
| Contacts | `/client/contacts` | Contact history |
| Organisation | `/client/organisation` | Company profile |
| Subscription | `/client/subscription` | Billing & subscription |
| Settings | `/client/settings` | Account settings |

### Admin Portal
| Page | Route | Purpose |
|------|-------|---------|
| Login | `/admin/login` | Admin authentication |
| Dashboard | `/admin/dashboard` | Admin overview |
| Candidates | `/admin/candidates` | Candidate management |
| Candidate Detail | `/admin/candidates/[id]` | Individual candidate admin |
| Clients | `/admin/clients` | Colony/employer management |
| Contacts | `/admin/contacts` | All contact requests |
| Analytics | `/admin/analytics` | Platform metrics |

---

## Contact Forms

### Care Provider Form

```typescript
const CareProviderFormSchema = z.object({
  organisationName: z.string().min(1, 'Required'),
  contactName: z.string().min(1, 'Required'),
  role: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^(?:0|\+44)[0-9\s]{9,13}$/, 'Invalid UK phone'),
  serviceType: z.enum([
    'mental-health',
    'acute-care',
    'private-hospital',
    'care-home',
    'supported-living',
    'end-of-life',
    'other',
  ]),
  location: z.string().min(1, 'Required'),
  requirements: z.string().min(10, 'Please provide more detail'),
  preferredContact: z.enum(['email', 'phone', 'either']),
});
```

### HCA Form

```typescript
const HCAFormSchema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^(?:0|\+44)[0-9\s]{9,13}$/, 'Invalid UK phone'),
  experienceLevel: z.enum(['newly-qualified', '1-2-years', '3-5-years', '5-plus-years']),
  preferredSettings: z.array(z.enum([
    'mental-health',
    'acute-care',
    'private-hospital',
    'care-home',
    'supported-living',
    'end-of-life',
    'community',
  ])).min(1, 'Select at least one'),
  location: z.string().min(1, 'Required'),
  message: z.string().optional(),
});
```

### Form Submission (Day-1)

Day-1 forms submit via email only (SES or third-party service):

```typescript
// lib/services/formApi.ts
export async function submitEnquiry(
  type: 'care-provider' | 'hca',
  data: CareProviderFormData | HCAFormData
): Promise<SubmitResult> {
  // Day-1: Email via serverless function or third-party
  const response = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  return response.json();
}
```

### Form Submission (Future PulsePlatform)

When PulsePlatform Enquiries context is ready:

```typescript
export async function submitEnquiry(
  type: 'care-provider' | 'hca',
  data: CareProviderFormData | HCAFormData
): Promise<SubmitResult> {
  const response = await fetch('https://pulse.api.opstack.uk/v1/enquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Id': 'TENANT#MEDIBEE',
    },
    body: JSON.stringify({ type, ...data }),
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  return response.json();
}
```

---

## Testing Strategy

### Component Tests (Vitest)

```typescript
// components/ContactForm.test.tsx
describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<CareProviderForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('submits valid form data', async () => {
    const onSubmit = vi.fn();
    render(<CareProviderForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/organisation/i), 'Test NHS Trust');
    // ... fill other fields
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      organisationName: 'Test NHS Trust',
    }));
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/contact-form.spec.ts
test('care provider can submit enquiry', async ({ page }) => {
  await page.goto('/contact');

  await page.getByLabel('Organisation name').fill('Test Hospital');
  await page.getByLabel('Contact name').fill('Jane Smith');
  // ... fill other fields

  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page.getByText(/thank you/i)).toBeVisible();
});
```

---

## Accessibility Requirements

Following WCAG 2.1 AA:

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All interactive elements focusable |
| Focus indicators | Visible focus ring on all controls |
| Labels | Visible labels on all form fields (not placeholder-only) |
| Contrast | 4.5:1 minimum for text |
| Screen readers | Semantic HTML, ARIA where needed |
| Mobile | Touch targets min 44x44px |

---

## SEO Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Medibee Recruitment Ltd | Healthcare Staffing',
  description: 'Specialist healthcare recruitment agency supplying healthcare assistants to NHS and private healthcare providers across the UK.',
  keywords: ['healthcare recruitment', 'healthcare assistants', 'HCA agency', 'NHS staffing'],
  openGraph: {
    title: 'Medibee Recruitment Ltd',
    description: 'Specialist healthcare recruitment',
    url: 'https://medibee.co.uk',
    siteName: 'Medibee Recruitment',
    locale: 'en_GB',
    type: 'website',
  },
};
```

---

## Deployment

### AWS Amplify Configuration

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Environment Variables

| Variable | Purpose | Dev | Production |
|----------|---------|-----|------------|
| NEXT_PUBLIC_SITE_URL | Canonical URL | https://medibee.opstack.uk | https://www.medibee-recruitment.co.uk |
| EMAIL_RECIPIENT | Form submissions | hello@medibee-recruitment.co.uk | hello@medibee-recruitment.co.uk |

---

## Footer Information

**Required elements (from PRD):**

- Company name: Medibee Recruitment Ltd (England & Wales)
- Company number: [TBC]
- Registered office: [TBC]
- ICO registration: [TBC]
- Contact email: hello@medibee-recruitment.co.uk
- Contact phone: [TBC]

---

## What NOT to Build (Current Phase)

- Testimonials (no real users yet)
- Published pay rates
- Blog/news section
- Downloadable Passport PDF (Phase 2)
- Partner perks integration (Phase 2)
- Wellbeing benefits (Phase 2)
- Mobile app (Phase 3)
- Automated verification/OCR (Phase 3)

## Design Patterns to Follow

### Tier Card Pattern
When showing Cell/Hive/Colony options:
- Dark card background (`bg-brand-slate`)
- Gold border/accent
- Tier badge at top (with bee icon)
- Price prominently displayed
- Feature list with gold checkmarks
- CTA button (gold filled for candidates, gold outline for Colony)

### Portal Card Pattern
- Dark card with subtle border
- Rounded corners (8px)
- Padding: 24px
- Optional honeycomb texture in background

### Badge Pattern
- Hexagonal frame where possible
- Medibee bee icon
- Tier-specific text: "MEDIBEE [TIER] MEMBER"
- Gold on dark color scheme

---

## Directory Structure

```
Medibee-Website/
├── app/
│   ├── layout.tsx            # Root layout with providers
│   ├── providers.tsx         # Context providers
│   ├── page.tsx              # Home (platform showcase)
│   ├── api/
│   │   └── enquiry/route.ts  # Form submission API
│   ├── admin/                # Admin portal
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── candidates/
│   │   ├── clients/
│   │   ├── contacts/
│   │   └── analytics/
│   ├── candidate/            # Candidate portal (Cell/Hive)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── credentials/      # Vault
│   │   ├── introductions/
│   │   └── settings/
│   ├── client/               # Client portal (Colony)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   ├── forgot-password/
│   │   ├── dashboard/
│   │   ├── candidates/
│   │   ├── shortlists/
│   │   ├── contacts/
│   │   ├── organisation/
│   │   ├── subscription/
│   │   └── settings/
│   ├── services/             # Marketing page
│   ├── work-with-us/         # Marketing page
│   ├── about/
│   ├── contact/
│   ├── team/
│   ├── policies/             # Policy hub + sub-pages
│   ├── privacy-policy/
│   ├── safeguarding/
│   └── complaints/
├── components/
│   ├── ui/                   # Base UI (Button, Input, etc.)
│   │   ├── HexagonIcon.tsx   # Hexagonal icon wrapper
│   │   ├── HexagonBadge.tsx  # Tier badges
│   │   └── HexagonBullet.tsx # Hex bullet points
│   ├── decorative/           # Visual elements
│   │   ├── HoneycombPattern.tsx
│   │   ├── HoneycombFade.tsx
│   │   ├── HoneycombCluster.tsx
│   │   └── LayeredHoneycomb.tsx
│   ├── forms/                # Contact forms
│   │   ├── CareProviderForm.tsx
│   │   ├── HCAForm.tsx
│   │   └── CandidateRegistrationForm.tsx
│   ├── portal/               # Portal-specific components
│   │   ├── PortalCard.tsx
│   │   ├── ProfileHero.tsx
│   │   ├── IdentityHero.tsx
│   │   ├── TrustMeter.tsx
│   │   ├── CredentialCard.tsx
│   │   ├── WorkHistoryTimeline.tsx
│   │   ├── AvailabilityToggle.tsx
│   │   └── ...
│   └── shared/               # Header, Footer, etc.
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── AudienceCard.tsx
│       └── AnimatedSection.tsx
├── lib/
│   └── utils.ts
├── public/
│   └── images/
├── .documentation/           # PRD and planning docs
│   └── CPO/                  # Product decisions
│       ├── DECISIONS_LOG.md
│       └── MEDIBEE_PRD_V4_CELL_HIVE_COLONY.md
├── .claude/
│   └── CLAUDE.md             # This file
├── tailwind.config.ts
└── package.json
```

---

## Related Documentation

### Product & Business
- [PRD v4 - Cell/Hive/Colony](.documentation/CPO/MEDIBEE_PRD_V4_CELL_HIVE_COLONY.md) - **PRIMARY**
- [UI/UX Baseline v1](.documentation/CPO/UI_UX_BASELINE_V1.md) - **DESIGN SOURCE OF TRUTH**
- [Decisions Log](.documentation/CPO/DECISIONS_LOG.md) - Stakeholder decisions
- [Open Questions](.documentation/CPO/OPEN_QUESTIONS_V2.md) - Unresolved items
- [Implementation Roadmap](.documentation/CPO/IMPLEMENTATION_ROADMAP_V2.md)

### Technical
- [Technical Architecture](.documentation/CPO/TECHNICAL_ARCHITECTURE_DDD_TDD.md)
- [Data Model](.documentation/CPO/DATA_MODEL_V2.md)
- [Deployment Guide](.documentation/DEPLOYMENT_GUIDE.md)

### Legacy (Reference Only)
- [Day-1 PRD](.documentation/medibee_recruitment_ltd_website_prd_day_1.md)
- [Original Brand Guide](.documentation/medibee_recruitment_ltd_website_style_brand_guide.md)

### Global Standards
- [Development Guidelines](C:\VSProjects\CLAUDE.md)

---

---

*Last Updated: 22 March 2026*
