# Medibee-Website - Project-Specific Development Guidelines

> **Inherits from:** `C:\VSProjects\CLAUDE.md` (global rules apply)
>
> This document adds project-specific context. Global rules CANNOT be overridden.

---

## Project Overview

**Medibee-Website** is the Day-1 marketing website for Medibee Recruitment Ltd.

- **Purpose:** Credibility website and enquiry capture
- **Type:** Static marketing site (NOT a platform or portal)
- **Deployment:** AWS Amplify
- **Domain (Dev):** medibee.opstack.uk
- **Domain (Prod):** www.medibee-recruitment.co.uk
- **Backend:** Day-1 = email-only forms, Future = PulsePlatform integration

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

### Brand Colours (from brand guide)

```typescript
// tailwind.config.ts
colors: {
  'slate-blue': {
    DEFAULT: '#696F8B',  // Primary CTAs, links
    dark: '#545971',     // Headers, navigation, footer
    light: '#7d8299',    // Hover states
  },
  gold: {
    soft: '#E5D7A2',     // Subtle accents, dividers
    rich: '#D3B25B',     // Highlights, focus states
  },
  mist: '#E6E3CF',       // Primary background
  neutral: '#9A999B',    // Borders, secondary UI
  ink: '#09080A',        // Primary text
}
```

### Typography

```typescript
// tailwind.config.ts
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

- Generous whitespace, clear content blocks
- Max content width: 1100-1200px
- No animations, gradients, dark mode
- Elegance through restraint
- Mobile-first responsive design

---

## Page Structure

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Entry point, audience selector |
| Services | `/services` | For care providers |
| Work with Us | `/work-with-us` | For healthcare assistants |
| About | `/about` | Company story |
| Contact | `/contact` | Lead capture forms |
| Privacy Policy | `/privacy-policy` | GDPR compliance |
| Safeguarding | `/safeguarding` | Public policy summary |
| Complaints | `/complaints` | Procedure explanation |

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

## What NOT to Build (Day-1)

Per PRD exclusions:

- Testimonials
- Published pay rates
- Blog/news section
- Portals or login areas
- File upload functionality
- Animations/transitions
- Dark mode
- Gradients

---

## Directory Structure

```
Medibee-Website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── services/
│   │   └── page.tsx
│   ├── work-with-us/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── safeguarding/
│   │   └── page.tsx
│   └── complaints/
│       └── page.tsx
├── components/
│   ├── ui/                   # Base components
│   ├── forms/                # Contact forms
│   └── shared/               # Header, Footer, etc.
├── lib/
│   ├── config/
│   │   └── site.ts           # Site configuration
│   ├── services/
│   │   └── formApi.ts        # Form submission
│   └── utils.ts
├── public/
│   └── images/
├── .documentation/           # PRD and brand guide
├── .claude/
│   └── CLAUDE.md             # This file
├── amplify.yml
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Related Documentation

- [PRD](.documentation/medibee_recruitment_ltd_website_prd_day_1.md)
- [Brand Guide](.documentation/medibee_recruitment_ltd_website_style_brand_guide.md)
- [Deployment Guide](.documentation/DEPLOYMENT_GUIDE.md)
- [PulsePlatform Architecture](../PulsePlatform/.documentation/PLATFORM_ARCHITECTURE.md)
- [Global Development Standards](C:\VSProjects\CLAUDE.md)

---

*Last Updated: February 2026*
