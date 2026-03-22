# ADR-002: Authentication Strategy

**Status:** APPROVED (19 March 2026)
**Date:** 19 March 2026
**Decision Makers:** CTO, CPO/COO, Security Lead
**Context:** Medibee Talent Showcase Platform

---

## Context

The Medibee frontend has implemented 4 authentication methods for candidates:
1. Google OAuth
2. Apple OAuth
3. Phone OTP
4. Email Magic Link

Plus standard email/password for clients and admins.

We need to decide which authentication provider will handle these methods and how tokens will be managed.

## Current State

The frontend has:
- Auth context with JWT handling (`lib/auth/AuthContext.tsx`)
- API client with token management (`lib/api/client.ts`)
- Multi-user type support (candidate, client, admin)
- Login UI for all 4 methods implemented

Backend currently does not exist.

## Decision Drivers

1. **Feature Support:** Must support OAuth, OTP, and magic links
2. **Cost:** Budget constraints (startup)
3. **Security:** Healthcare data requires strong auth
4. **DX:** Developer experience for implementation
5. **Scale:** Handle 10,000+ users
6. **Compliance:** GDPR, data residency

## Options Considered

### Option A: AWS Cognito

Use Amazon Cognito User Pools with hosted UI or custom UI.

**Pros:**
- Native AWS integration
- Supports all required auth methods
- Amplify integration available
- Low cost at scale
- EU region data residency

**Cons:**
- Complex configuration
- Limited customisation
- Awkward error handling
- Cognito Hosted UI has limited branding

**Cost:** ~$0.0055/MAU after 50k free tier

### Option B: Auth0

Use Auth0 with custom login forms.

**Pros:**
- Excellent DX
- Full feature support
- Great documentation
- Easy social login
- Actions for custom logic

**Cons:**
- Cost increases at scale
- External vendor dependency
- US-based company (GDPR considerations)

**Cost:** $240/month for Essentials (7500 MAU)

### Option C: Custom JWT Implementation

Build our own auth system with JWT tokens.

**Pros:**
- Full control
- No vendor lock-in
- No recurring costs

**Cons:**
- Security responsibility
- Significant development effort
- OAuth implementation complexity
- OTP/SMS infrastructure needed

**Cost:** Development time + SES/SNS costs

### Option D: Clerk

Modern auth provider with React SDK.

**Pros:**
- Excellent React integration
- Beautiful pre-built components
- All auth methods supported
- Good DX

**Cons:**
- Newer company
- Cost at scale
- US-based

**Cost:** $25/month for Pro (10k MAU)

## Analysis

| Criteria | Cognito | Auth0 | Custom | Clerk |
|----------|---------|-------|--------|-------|
| OAuth Support | ✅ | ✅ | ⚠️ | ✅ |
| Phone OTP | ✅ | ✅ | ⚠️ | ✅ |
| Magic Link | ⚠️ | ✅ | ⚠️ | ✅ |
| Cost (10k MAU) | Free | £200+ | Dev time | £20 |
| Cost (50k MAU) | £50 | £500+ | Dev time | £200 |
| Dev Experience | ⚠️ | ✅ | ❌ | ✅ |
| UK Data Residency | ✅ | ⚠️ | ✅ | ⚠️ |
| Customisation | ⚠️ | ✅ | ✅ | ✅ |

## Decision

**Option A: AWS Cognito (Recommended)**

Rationale:
1. **Cost:** Free tier covers initial growth; cheap at scale
2. **Data Residency:** EU-WEST-2 keeps data in UK/EU
3. **Integration:** Natural fit with AWS backend
4. **Feature Support:** All methods supported (with some configuration)
5. **Security:** AWS handles security updates

### Implementation Plan

1. **User Pool Configuration:**
   - Enable email + phone sign-up
   - Configure Google and Apple identity providers
   - Enable MFA options
   - Set up password policy

2. **Lambda Triggers:**
   - Pre-sign-up: Validate candidate vs client registration
   - Post-confirmation: Create DynamoDB records
   - Custom message: Branded email templates

3. **Token Configuration:**
   - Access token: 1 hour expiry
   - Refresh token: 30 days expiry
   - ID token: Contains user type claim

4. **Frontend Integration:**
   - Use `@aws-amplify/auth` for Cognito
   - Or use API calls to custom auth Lambda

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend                             │
│         (Login forms, Auth context)                     │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Google    │   │   Apple     │   │   Phone     │
│   OAuth     │   │   OAuth     │   │   OTP       │
└─────────────┘   └─────────────┘   └─────────────┘
          │               │               │
          └───────────────┼───────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 AWS Cognito User Pool                   │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Identity    │  │ Lambda      │  │ User        │     │
│  │ Providers   │  │ Triggers    │  │ Groups      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   JWT Tokens                            │
│         (Access, ID, Refresh)                           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway                           │
│            (Cognito Authorizer)                         │
└─────────────────────────────────────────────────────────┘
```

## User Groups

| Group | Description | Default Claims |
|-------|-------------|----------------|
| candidates | Healthcare Assistants | `custom:userType=candidate` |
| clients | Care Providers | `custom:userType=client` |
| admins | Medibee Staff | `custom:userType=admin` |

## Token Handling

Frontend already has token handling in place:
- Tokens stored in localStorage
- Tokens synced to cookies for middleware
- Auth context validates token expiry
- Refresh flow needed

## Consequences

### Positive
- Low cost at current scale
- Data stays in UK/EU
- Native AWS integration
- Security updates handled by AWS

### Negative
- Cognito can be complex to configure
- Error messages are cryptic
- Magic link requires custom implementation
- Rate limiting on SMS

### Mitigations
- Create comprehensive setup documentation
- Use Lambda triggers for custom flows
- Build custom email/SMS templates

## Implementation Tasks

1. [ ] Create Cognito User Pool in CDK
2. [ ] Configure identity providers (Google, Apple)
3. [ ] Set up Lambda triggers
4. [ ] Configure email templates (SES)
5. [ ] Configure SMS (SNS)
6. [ ] Update frontend to use Cognito SDK
7. [ ] Test all auth flows
8. [ ] Document auth architecture

## Related Documents

- [Product Backlog](../PRODUCT_BACKLOG_V1.md) - FO-002: Candidate Registration
- [Open Questions](../OPEN_QUESTIONS.md) - OQ-002: Authentication Provider
- [ADR-001](ADR-001-BACKEND-ARCHITECTURE.md) - Backend Architecture

---

*This ADR will be updated when a decision is made.*
