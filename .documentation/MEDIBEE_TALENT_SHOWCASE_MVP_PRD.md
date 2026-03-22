# Medibee Talent Showcase Platform - MVP PRD

> **Version:** 1.0.0
> **Status:** Draft
> **Created:** March 2026
> **Supersedes:** [Day-1 Website PRD](./medibee_recruitment_ltd_website_prd_day_1.md)

---

## Executive Summary

**Medibee Talent Showcase Platform** evolves the existing Medibee Recruitment Ltd marketing website into a multi-sided talent marketplace connecting healthcare assistants (HCAs) with care providers.

### Platform Vision

> A trusted talent showcase where verified healthcare assistants can present their profiles and experience, and where care providers can browse, shortlist, and connect with suitable candidates through a subscription-based model.

### Key Differentiator

Unlike generic job boards, Medibee Talent Showcase is:
- **Specialist-focused**: Healthcare assistants only
- **Quality-controlled**: All candidates verified (DBS, Right to Work, references)
- **Relationship-driven**: Medibee facilitates introductions, not transactions
- **Privacy-respecting**: Candidates control what information is shared

---

## 1. Problem Statement

### For Care Providers
- **Discovery is hard**: Finding reliable HCAs requires time and effort
- **Quality is inconsistent**: Generic job boards have no vetting
- **Process is inefficient**: Multiple agencies, repeated conversations
- **No visibility**: Can't see available talent before engaging

### For Healthcare Assistants
- **Passive job seeking**: Must actively apply to each role
- **No showcase**: CV sits in email inboxes, unseen
- **Uncertain opportunities**: Don't know which providers are hiring
- **Privacy concerns**: Personal data scattered across multiple platforms

### For Medibee (Business)
- **Scaling limitations**: Manual matching doesn't scale
- **Revenue dependency**: Per-placement fees are unpredictable
- **No recurring revenue**: Each placement is a one-time transaction
- **Data underutilised**: Candidate information in spreadsheets/emails

---

## 2. Solution Overview

### Platform Components

| Component | Description |
|-----------|-------------|
| **Public Website** | Marketing pages, trust signals, conversion funnels |
| **Candidate Portal** | Profile management, CV upload, availability settings |
| **Client Portal** | Browse candidates, shortlist, contact requests |
| **Admin Portal** | Moderation, analytics, user management |
| **Serverless API** | Backend services (Lambda + DynamoDB + S3) |

### User Types

| User Type | Description | Authentication |
|-----------|-------------|----------------|
| **Visitor** | Anonymous user browsing marketing pages | None |
| **Candidate** | Healthcare assistant with profile | Cognito (email/password) |
| **Client** | Care provider organisation | Cognito (email/password) |
| **Client Member** | Team member of a client org | Cognito (invited by Client) |
| **Admin** | Medibee staff | Cognito (separate pool) |

---

## 3. MVP Scope

### In Scope (MVP)

#### Candidate Features
- [ ] Registration with email verification
- [ ] Profile creation (personal details, experience, preferences)
- [ ] CV upload (PDF only, max 5MB)
- [ ] Availability status toggle (available/not available)
- [ ] View own profile as clients see it
- [ ] Edit profile at any time
- [ ] Delete account and data (GDPR)

#### Client Features
- [ ] Registration with email verification
- [ ] Organisation profile creation
- [ ] Browse verified candidates (paginated list)
- [ ] Filter candidates (location, experience, settings)
- [ ] View candidate profiles (subscription required)
- [ ] Shortlist candidates
- [ ] Request contact with candidate (uses contact credits)
- [ ] Manage subscription (view plan, upgrade)

#### Admin Features
- [ ] View all candidates (pending, active, suspended)
- [ ] Approve/reject candidate profiles
- [ ] View all clients and subscriptions
- [ ] Suspend users
- [ ] View contact request history
- [ ] Basic analytics dashboard

#### Subscription Model
- [ ] Three tiers: Bronze, Silver, Gold
- [ ] Monthly billing via Stripe
- [ ] Contact credits per tier
- [ ] Feature gating based on tier

### Out of Scope (MVP)

| Feature | Reason | Future Phase |
|---------|--------|--------------|
| Messaging system | Complexity, compliance | Phase 2 |
| Video profiles | Infrastructure cost | Phase 2 |
| Mobile app | Web-first approach | Phase 3 |
| API access for clients | Enterprise feature | Phase 2 |
| Automated matching | Requires ML/data | Phase 3 |
| Shift booking | Different product | Future |
| Payroll integration | Compliance complexity | Future |
| Multi-tenant (white-label) | Single brand focus | Future |
| Social login (Google, LinkedIn) | Simplify MVP | Phase 2 |
| Two-factor authentication | Good-to-have | Phase 2 |

---

## 4. User Stories

### Candidate Stories

```
As a healthcare assistant,
I want to create a profile showcasing my experience,
So that care providers can find and contact me about opportunities.

As a healthcare assistant,
I want to upload my CV,
So that providers can see my full work history.

As a healthcare assistant,
I want to set my availability status,
So that providers know when I'm looking for work.

As a healthcare assistant,
I want to control my profile visibility,
So that I can pause my job search when needed.

As a healthcare assistant,
I want to delete my account and all data,
So that I can exercise my GDPR rights.
```

### Client Stories

```
As a care provider,
I want to browse verified healthcare assistants,
So that I can find suitable candidates for my organisation.

As a care provider,
I want to filter candidates by location and experience,
So that I can find relevant matches quickly.

As a care provider,
I want to shortlist candidates I'm interested in,
So that I can compare options before making contact.

As a care provider,
I want to request contact with a candidate,
So that I can discuss opportunities with them.

As a care provider,
I want to manage my subscription,
So that I can access the features I need.
```

### Admin Stories

```
As a Medibee admin,
I want to review pending candidate profiles,
So that I can ensure quality and compliance.

As a Medibee admin,
I want to view all clients and their subscriptions,
So that I can manage the business.

As a Medibee admin,
I want to suspend problematic users,
So that I can protect the platform integrity.

As a Medibee admin,
I want to see platform analytics,
So that I can understand usage and growth.
```

---

## 5. Candidate Profile Structure

### Required Fields

| Field | Type | Validation |
|-------|------|------------|
| Full Name | String | 2-100 chars |
| Email | Email | Valid format, unique |
| Phone | String | UK format |
| Location | Postcode | UK postcode, stored as outward code |
| Experience Level | Enum | newly-qualified, 1-2-years, 3-5-years, 5-plus-years |
| Preferred Settings | Array | Min 1 selection from settings list |
| Professional Summary | Text | 50-500 chars |
| Right to Work | Boolean | Must be true |
| DBS Status | Enum | none, applied, cleared |

### Optional Fields

| Field | Type | Notes |
|-------|------|-------|
| CV | File | PDF only, max 5MB |
| Profile Photo | File | JPEG/PNG, max 2MB, stripped EXIF |
| Certifications | Array | Name + expiry date |
| Languages | Array | Language + proficiency |
| Shift Preferences | Array | days, nights, weekends, flexible |
| Travel Radius | Number | Miles from location |

### Settings List (Care Environments)

```typescript
type CareSettings =
  | 'mental-health'
  | 'acute-care'
  | 'private-hospital'
  | 'care-home'
  | 'supported-living'
  | 'end-of-life'
  | 'community'
  | 'learning-disabilities'
  | 'dementia-care'
  | 'paediatric';
```

### Profile Status State Machine

```
                    ┌─────────────┐
                    │   DRAFT     │ (profile incomplete)
                    └──────┬──────┘
                           │ submit
                    ┌──────▼──────┐
                    │  PENDING    │ (awaiting admin review)
                    └──────┬──────┘
                    ┌──────┴──────┐
            approve │             │ reject
             ┌──────▼──────┐ ┌────▼─────┐
             │   ACTIVE    │ │ REJECTED │
             └──────┬──────┘ └────┬─────┘
                    │             │ resubmit
      ┌─────────────┼─────────────┘
      │      ┌──────▼──────┐
      │      │  PENDING    │
      │      └─────────────┘
      │
      │ suspend (by admin)
┌─────▼─────┐
│ SUSPENDED │
└─────┬─────┘
      │ reinstate (by admin)
      │
┌─────▼─────┐
│  ACTIVE   │
└───────────┘
```

---

## 6. Client Organisation Structure

### Organisation Profile

| Field | Type | Validation |
|-------|------|------------|
| Organisation Name | String | 2-200 chars |
| Organisation Type | Enum | nhs-trust, private-hospital, care-home, supported-living, mental-health-service, other |
| Primary Contact Name | String | 2-100 chars |
| Primary Contact Email | Email | Valid format |
| Primary Contact Phone | String | UK format |
| Billing Email | Email | Valid format |
| Address | Object | UK address structure |
| CQC Number | String | Optional, validated format |

### Subscription Structure

| Field | Type | Notes |
|-------|------|-------|
| Tier | Enum | bronze, silver, gold |
| Status | Enum | trialing, active, past_due, cancelled |
| Current Period Start | DateTime | ISO 8601 |
| Current Period End | DateTime | ISO 8601 |
| Contact Credits Remaining | Number | Resets monthly |
| Contact Credits Used | Number | This period |
| Stripe Customer ID | String | External reference |
| Stripe Subscription ID | String | External reference |

---

## 7. Subscription Tiers

### Tier Comparison

| Feature | Bronze | Silver | Gold |
|---------|--------|--------|------|
| **Monthly Price** | £99 | £249 | £499 |
| **Contact Credits/Month** | 5 | 20 | Unlimited |
| **Browse Candidates** | Yes | Yes | Yes |
| **View Full Profiles** | Yes | Yes | Yes |
| **Shortlists** | 1 list, 10 candidates | 3 lists, 25 each | Unlimited |
| **Filter by Location** | Yes | Yes | Yes |
| **Filter by Experience** | Basic | Advanced | Advanced |
| **Filter by Availability** | No | Yes | Yes |
| **Priority Support** | No | No | Yes |
| **Dedicated Account Manager** | No | No | Yes |
| **Team Members** | 1 | 3 | 10 |

### Contact Credit Mechanics

- Each "Request Contact" action consumes 1 credit
- Credits reset at the start of each billing period
- Unused credits do not roll over
- Gold tier has unlimited credits (no deduction)
- Failed contacts (candidate unresponsive) are not refunded in MVP

---

## 8. Contact Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTACT REQUEST FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Client clicks "Request Contact"                                 │
│       │                                                          │
│       ▼                                                          │
│  System checks subscription + credits                            │
│       │                                                          │
│       ├── Insufficient credits → Show upgrade prompt             │
│       │                                                          │
│       ▼                                                          │
│  System creates ContactRequest (status: pending)                 │
│  System deducts 1 credit                                         │
│       │                                                          │
│       ▼                                                          │
│  Email sent to Candidate:                                        │
│  "A care provider is interested in your profile"                 │
│  (Organisation name revealed, contact hidden)                    │
│       │                                                          │
│       ▼                                                          │
│  Email sent to Client:                                           │
│  "Your contact request has been sent"                            │
│  (Candidate name + summary, contact hidden)                      │
│       │                                                          │
│       ▼                                                          │
│  Medibee Admin receives notification                             │
│  Admin contacts Candidate + Client to facilitate intro           │
│       │                                                          │
│       ▼                                                          │
│  Admin updates ContactRequest status:                            │
│  → connected (intro made)                                        │
│  → declined (candidate not interested)                           │
│  → expired (no response after 7 days)                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Why this flow?**
- Privacy protection: Direct contact details not shared until mutual interest
- Quality control: Medibee facilitates, ensuring professional introductions
- Compliance: Medibee maintains oversight of all connections
- Human touch: Differentiator from automated job boards

---

## 9. Data Privacy & GDPR

### Candidate Data

| Data Category | Retention | Legal Basis |
|---------------|-----------|-------------|
| Profile data | Until account deleted | Consent (contract performance) |
| CV file | Until account deleted | Consent |
| Activity logs | 2 years | Legitimate interest |
| Contact request history | 2 years | Legitimate interest |

### Client Data

| Data Category | Retention | Legal Basis |
|---------------|-----------|-------------|
| Organisation profile | Until account deleted | Contract performance |
| Subscription history | 7 years | Legal requirement (accounting) |
| Contact request history | 2 years | Contract performance |
| Activity logs | 2 years | Legitimate interest |

### Candidate Rights (GDPR)

- **Access**: Download all personal data (JSON export)
- **Rectification**: Edit profile at any time
- **Erasure**: Delete account (hard delete within 30 days)
- **Portability**: Export data in machine-readable format
- **Objection**: Opt out of marketing communications

### Data Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Encryption at rest | DynamoDB encryption, S3 SSE-S3 |
| Encryption in transit | TLS 1.3 everywhere |
| Access control | IAM least privilege, no wildcards |
| Audit logging | All mutations logged with actor |
| PII handling | No internal IDs in responses |
| File validation | Magic bytes, no SVG/HTML, EXIF stripped |
| Password policy | Cognito defaults (8+ chars, complexity) |
| Session management | JWT with 1-hour expiry, refresh tokens |

---

## 10. Success Metrics

### MVP Launch Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Candidate registrations | 50 | 30 days post-launch |
| Active candidate profiles | 30 | Approved and available |
| Client registrations | 10 | Paying subscribers |
| Contact requests | 20 | Made through platform |
| System uptime | 99.5% | AWS monitoring |
| Page load time | <3s | Core Web Vitals |

### Ongoing KPIs

| Metric | Definition |
|--------|------------|
| Candidate activation rate | Registrations → Active profiles |
| Client conversion rate | Sign-ups → Paid subscribers |
| Contact request rate | Profile views → Contact requests |
| Connection success rate | Contact requests → Introductions made |
| Churn rate | Cancelled subscriptions / Total subscriptions |
| MRR (Monthly Recurring Revenue) | Sum of all active subscription values |
| NPS (Net Promoter Score) | Candidate + Client satisfaction |

---

## 11. Technical Constraints

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Accessibility
- WCAG 2.1 AA compliance (existing standard)
- Keyboard navigation
- Screen reader compatible
- Colour contrast ratios

### Performance
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- API response time < 500ms (p95)

### Security
- OWASP Top 10 compliance
- No sensitive data in URLs
- Rate limiting on all endpoints
- Input validation at all boundaries

---

## 12. Dependencies

### External Services

| Service | Purpose | Criticality |
|---------|---------|-------------|
| AWS Cognito | Authentication | Critical |
| AWS Lambda | API compute | Critical |
| AWS DynamoDB | Database | Critical |
| AWS S3 | File storage | Critical |
| AWS SES | Email delivery | Critical |
| Stripe | Payment processing | Critical |
| CloudWatch | Monitoring | High |

### Internal Dependencies

| Dependency | Description |
|------------|-------------|
| Existing website | Marketing pages, brand assets |
| Email domain | SES verified sender |
| SSL certificates | ACM managed |
| DNS | Route 53 or external |

---

## 13. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Low candidate sign-ups | High | Medium | Marketing push, simplify registration |
| Low client conversions | High | Medium | Free trial tier, clear value prop |
| Data breach | Critical | Low | Security-first architecture, audits |
| Stripe integration issues | High | Low | Thorough testing, fallback processes |
| Scalability limits | Medium | Low | Serverless architecture, load testing |
| Regulatory changes | Medium | Low | Flexible architecture, legal review |

---

## 14. Timeline

### Phase 1: Infrastructure (Weeks 1-2)
- CDK project setup
- Cognito user pools
- DynamoDB table
- S3 bucket with policies
- Lambda authorizer
- CI/CD pipeline

### Phase 2: Candidate MVP (Weeks 3-5)
- Registration + verification
- Profile CRUD
- CV upload
- Availability toggle

### Phase 3: Client MVP (Weeks 6-8)
- Registration + verification
- Organisation profile
- Stripe subscription integration
- Browse candidates

### Phase 4: Matching MVP (Weeks 9-10)
- Search + filters
- Shortlists
- Contact requests
- Email notifications

### Phase 5: Admin MVP (Weeks 11-12)
- Moderation dashboard
- User management
- Basic analytics

### Phase 6: Launch Prep (Weeks 13-14)
- Security audit
- Performance testing
- Documentation
- Soft launch

---

## 15. Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | |
| Technical Lead | | | |
| Business Stakeholder | | | |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| Candidate | Healthcare assistant registered on the platform |
| Client | Care provider organisation with subscription |
| Contact Request | Request from client to be introduced to candidate |
| Contact Credit | Unit of currency for contact requests |
| Shortlist | Client's saved list of interesting candidates |
| Verification | Process of checking candidate credentials |

---

## Appendix B: Related Documents

- [Day-1 Website PRD](./medibee_recruitment_ltd_website_prd_day_1.md)
- [Brand Guide](./medibee_recruitment_ltd_website_style_brand_guide.md)
- [Implementation Plan](./MEDIBEE_TALENT_SHOWCASE_IMPLEMENTATION_PLAN.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)

---

*Document Control: This PRD should be reviewed and updated as requirements evolve. Version history maintained in git.*
