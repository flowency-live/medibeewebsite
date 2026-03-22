# ADR-001: Backend Architecture Decision

**Status:** APPROVED (19 March 2026)
**Date:** 19 March 2026
**Decision Makers:** CTO, CPO/COO
**Context:** Medibee Talent Showcase Platform

---

## Context

The Medibee frontend is built and deployed, but the backend API does not exist. The frontend currently points to `https://4zq0km0w5a.execute-api.eu-west-2.amazonaws.com` which appears to be a placeholder or failed deployment.

We need to decide on the backend architecture for:
1. Authentication (multi-method: OAuth, OTP, magic link)
2. Candidate profiles and credential storage
3. Provider accounts and subscriptions
4. Introduction workflow
5. Admin operations

## Decision Drivers

1. **Time to Market:** We need to ship Phase 1 within 8 weeks
2. **Cost:** Startup budget constraints
3. **Scalability:** Must handle growth to 10,000+ candidates
4. **Security:** Handling sensitive credential data (DBS, RTW)
5. **Integration:** Future integration with PulsePlatform
6. **Maintainability:** Single engineering team

## Options Considered

### Option A: Dedicated Medibee CDK Stack

Build a standalone serverless API using AWS CDK:

```
medibee-api/
├── lib/
│   ├── medibee-api-stack.ts
│   ├── constructs/
│   │   ├── auth-construct.ts
│   │   ├── candidates-construct.ts
│   │   ├── clients-construct.ts
│   │   └── introductions-construct.ts
├── src/
│   ├── handlers/
│   └── services/
└── tests/
```

**Pros:**
- Full control over architecture
- Medibee-specific optimisations
- No external dependencies
- Clear ownership

**Cons:**
- More infrastructure to maintain
- Duplication if PulsePlatform has similar services
- Longer initial setup time

### Option B: Extend PulsePlatform Multi-Tenant API

Add Medibee as a tenant to the existing PulsePlatform API:

```
PulsePlatform/
└── packages/
    └── relayplatform-serverless-api/
        └── src/
            └── lambdas/
                └── medibee-api/  # New Lambda for Medibee
```

**Pros:**
- Shared infrastructure (auth, multi-tenant patterns)
- Faster development if patterns exist
- Centralised maintenance

**Cons:**
- Dependency on PulsePlatform roadmap
- Tight coupling
- May not fit Medibee's specific needs
- Complexity of multi-tenant data

### Option C: Hybrid Approach (Recommended)

Build Medibee-specific API now using PulsePlatform patterns and conventions, with planned migration path:

```
medibee-serverless-api/  # Standalone repo
├── lib/
│   └── medibee-api-stack.ts
├── src/
│   ├── handlers/  # Follow PulsePlatform patterns
│   └── services/
└── tests/
```

**Pros:**
- Fast start with proven patterns
- Clean separation for now
- Migration path to PulsePlatform when ready
- No blocking dependencies

**Cons:**
- Some code duplication initially
- Migration effort later

## Decision

**Option C: Hybrid Approach**

We will build a standalone `medibee-serverless-api` repository using PulsePlatform architectural patterns:

1. **CDK Infrastructure:** Same patterns as `relayplatform-serverless-api`
2. **Handler Structure:** Same Lambda handler patterns
3. **DynamoDB Design:** Single-table design with tenant prefix (`TENANT#MEDIBEE`)
4. **Testing:** Same integration test patterns

This allows us to:
- Ship quickly without PulsePlatform dependencies
- Maintain pattern consistency for future migration
- Have clear ownership and deployment

## Architecture Outline

```
┌─────────────────────────────────────────────────────────┐
│                    Route53 / ACM                        │
│                api.medibee.co.uk                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway (HTTP)                    │
│                   CORS configured                       │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Auth Lambda │   │Candidates   │   │ Clients     │
│             │   │ Lambda      │   │ Lambda      │
└─────────────┘   └─────────────┘   └─────────────┘
          │               │               │
          └───────────────┼───────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   DynamoDB Table                        │
│                 (Single-Table Design)                   │
│                                                         │
│  PK                    SK                    GSI1PK     │
│  ─────────────────────────────────────────────────────  │
│  TENANT#MEDIBEE        CAND#001              ...       │
│  TENANT#MEDIBEE        CLIENT#001            ...       │
│  TENANT#MEDIBEE        INTRO#001             ...       │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                        S3                               │
│            Credential Documents (Encrypted)             │
└─────────────────────────────────────────────────────────┘
```

## Consequences

### Positive
- Development can begin immediately
- Clear ownership and responsibility
- No blocking dependencies
- Follows proven patterns

### Negative
- Infrastructure setup time (1-2 days)
- Some duplication with future PulsePlatform
- Migration effort required later

### Mitigations
- Document migration path clearly
- Use same data structures as PulsePlatform where possible
- Abstract service layer for easier migration

## Implementation

1. Create `medibee-serverless-api` repository
2. Set up CDK stack with API Gateway + Lambda
3. Configure DynamoDB single-table
4. Set up S3 bucket for credentials
5. Configure domain and SSL
6. Deploy to AWS

## Related Documents

- [Product Backlog](../PRODUCT_BACKLOG_V1.md) - FO-001: Backend API Foundation
- [Open Questions](../OPEN_QUESTIONS.md) - OQ-001: Backend Infrastructure Location

---

*This ADR will be updated when a decision is made.*
