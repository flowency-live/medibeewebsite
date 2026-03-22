# Medibee Talent Showcase Platform - Implementation Plan

> **Version:** 1.0.0
> **Status:** Draft
> **Created:** March 2026
> **Related:** [MVP PRD](./MEDIBEE_TALENT_SHOWCASE_MVP_PRD.md)

---

## Overview

This document provides a detailed, test-driven implementation plan for the Medibee Talent Showcase Platform. Every feature follows the mandatory sequence:

1. **Define API contract**
2. **Write integration test (RED)**
3. **Implement backend (GREEN)**
4. **Deploy backend**
5. **Write frontend tests**
6. **Implement frontend**

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        MEDIBEE TALENT SHOWCASE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  FRONTEND (Next.js 14 - Existing Repo)                                  │
│  ├── /                          Public marketing                        │
│  ├── /candidate/*               Candidate portal                        │
│  ├── /client/*                  Client portal                           │
│  └── /admin/*                   Admin portal                            │
│                                                                          │
│  BACKEND (New Repo: medibee-serverless-api)                             │
│  ├── medibee-auth-api           Cognito triggers, token enrichment      │
│  ├── medibee-candidate-api      Profile CRUD, CV upload                 │
│  ├── medibee-client-api         Organisation profile, team              │
│  ├── medibee-subscription-api   Stripe integration, billing             │
│  ├── medibee-matching-api       Browse, search, shortlist, contact      │
│  └── medibee-admin-api          Moderation, analytics                   │
│                                                                          │
│  INFRASTRUCTURE (CDK)                                                    │
│  ├── Cognito (3 user pools: candidate, client, admin)                   │
│  ├── API Gateway (REST API with authorizers)                            │
│  ├── DynamoDB (single-table design)                                     │
│  ├── S3 (CVs, profile photos)                                           │
│  ├── SES (transactional emails)                                         │
│  └── Secrets Manager (JWT secrets, Stripe keys)                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Repository Structure

### New Repository: `medibee-serverless-api`

```
medibee-serverless-api/
├── cdk/
│   ├── bin/
│   │   └── medibee-api.ts
│   ├── lib/
│   │   ├── stacks/
│   │   │   ├── foundation-stack.ts      # DynamoDB, S3, Cognito
│   │   │   ├── api-stack.ts             # API Gateway
│   │   │   ├── candidate-stack.ts       # Candidate Lambda
│   │   │   ├── client-stack.ts          # Client Lambda
│   │   │   ├── subscription-stack.ts    # Subscription Lambda
│   │   │   ├── matching-stack.ts        # Matching Lambda
│   │   │   └── admin-stack.ts           # Admin Lambda
│   │   └── constructs/
│   │       ├── lambda-with-layers.ts
│   │       ├── authorizer.ts
│   │       └── api-resource.ts
│   ├── cdk.json
│   └── tsconfig.json
├── lambdas/
│   ├── shared/
│   │   └── layers/
│   │       ├── common/
│   │       │   ├── nodejs/
│   │       │   │   ├── logger.mjs
│   │       │   │   ├── response.mjs
│   │       │   │   ├── errors.mjs
│   │       │   │   └── validation.mjs
│   │       │   └── package.json
│   │       └── auth/
│   │           └── nodejs/
│   │               ├── token-verifier.mjs
│   │               └── authorizer.mjs
│   ├── candidate-api/
│   │   ├── domain/
│   │   │   ├── types.ts
│   │   │   ├── value-objects.ts
│   │   │   ├── events.ts
│   │   │   └── rules.ts
│   │   ├── application/
│   │   │   ├── handlers.ts
│   │   │   └── use-cases.ts
│   │   ├── infrastructure/
│   │   │   ├── dynamo-repository.ts
│   │   │   └── s3-service.ts
│   │   └── index.ts
│   ├── client-api/
│   │   └── [same structure]
│   ├── subscription-api/
│   │   └── [same structure]
│   ├── matching-api/
│   │   └── [same structure]
│   └── admin-api/
│       └── [same structure]
├── tests/
│   ├── integration/
│   │   ├── candidate-api/
│   │   │   ├── register.test.ts
│   │   │   ├── profile-crud.test.ts
│   │   │   └── cv-upload.test.ts
│   │   ├── client-api/
│   │   ├── subscription-api/
│   │   ├── matching-api/
│   │   └── admin-api/
│   └── unit/
│       ├── candidate-api/
│       │   └── domain/
│       │       └── rules.test.ts
│       └── [other lambdas]
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── CLAUDE.md
```

### Existing Repository: `Medibee-Website` (Frontend Evolution)

```
Medibee-Website/
├── app/
│   ├── (marketing)/              # Public pages (existing)
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── work-with-us/
│   │   ├── about/
│   │   └── contact/
│   ├── (candidate)/              # Candidate portal (new)
│   │   ├── layout.tsx            # Auth wrapper
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx          # View/edit profile
│   │   │   └── preview/
│   │   │       └── page.tsx      # See as client sees
│   │   └── settings/
│   │       └── page.tsx
│   ├── (client)/                 # Client portal (new)
│   │   ├── layout.tsx            # Auth wrapper
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── candidates/
│   │   │   ├── page.tsx          # Browse candidates
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Candidate profile
│   │   ├── shortlists/
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   ├── subscription/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── (admin)/                  # Admin portal (new)
│   │   ├── layout.tsx            # Auth wrapper
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── candidates/
│   │   │   ├── page.tsx          # All candidates
│   │   │   ├── pending/
│   │   │   │   └── page.tsx      # Pending review
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── clients/
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   └── api/
│       └── [existing enquiry route]
├── lib/
│   ├── api/
│   │   ├── client.ts             # API client factory
│   │   ├── candidate-api.ts      # Typed API calls
│   │   ├── client-api.ts
│   │   └── admin-api.ts
│   ├── auth/
│   │   ├── cognito-client.ts
│   │   ├── auth-context.tsx
│   │   └── use-auth.ts
│   └── [existing lib code]
├── components/
│   ├── candidate/                # Candidate-specific components
│   │   ├── ProfileForm.tsx
│   │   ├── CVUpload.tsx
│   │   └── AvailabilityToggle.tsx
│   ├── client/                   # Client-specific components
│   │   ├── CandidateCard.tsx
│   │   ├── CandidateFilters.tsx
│   │   ├── ShortlistButton.tsx
│   │   └── ContactRequestButton.tsx
│   ├── admin/                    # Admin-specific components
│   │   ├── CandidateReview.tsx
│   │   ├── UserManagement.tsx
│   │   └── AnalyticsDashboard.tsx
│   └── [existing components]
└── [existing config files]
```

---

## Phase 1: Infrastructure Foundation

### 1.1 Create Backend Repository

**Task:** Initialize `medibee-serverless-api` repository

**Test:** N/A (infrastructure)

**Steps:**
1. Create new repository
2. Initialize npm project with TypeScript
3. Add CDK dependencies
4. Create CLAUDE.md with project-specific rules
5. Set up Vitest for testing
6. Set up ESLint + Prettier
7. Create GitHub Actions CI/CD pipeline

**Files to Create:**
```
medibee-serverless-api/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── CLAUDE.md
└── .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

---

### 1.2 Foundation Stack - DynamoDB

**Task:** Create DynamoDB single-table with GSIs

**Test:** Integration test for table creation and basic operations

```typescript
// tests/integration/foundation/dynamodb.test.ts
describe('DynamoDB Foundation', () => {
  it('creates table with correct schema', async () => {
    const table = await describeTable('medibee-main-dev');
    expect(table.KeySchema).toEqual([
      { AttributeName: 'PK', KeyType: 'HASH' },
      { AttributeName: 'SK', KeyType: 'RANGE' }
    ]);
  });

  it('creates GSI1 for email lookups', async () => {
    const table = await describeTable('medibee-main-dev');
    const gsi1 = table.GlobalSecondaryIndexes.find(g => g.IndexName === 'GSI1');
    expect(gsi1).toBeDefined();
    expect(gsi1.KeySchema).toEqual([
      { AttributeName: 'GSI1PK', KeyType: 'HASH' },
      { AttributeName: 'GSI1SK', KeyType: 'RANGE' }
    ]);
  });
});
```

**Table Design:**

| Attribute | Type | Description |
|-----------|------|-------------|
| PK | String | Partition key |
| SK | String | Sort key |
| GSI1PK | String | Email lookups |
| GSI1SK | String | Entity type |
| GSI2PK | String | Status queries |
| GSI2SK | String | Timestamp |
| GSI3PK | String | Location (outward postcode) |
| GSI3SK | String | Entity type |
| EntityType | String | candidate, client, subscription, etc. |
| Data | Map | Entity-specific data |
| CreatedAt | String | ISO 8601 |
| UpdatedAt | String | ISO 8601 |
| TTL | Number | Optional TTL |

**Access Patterns:**

| Access Pattern | Key Condition | Index |
|----------------|---------------|-------|
| Get candidate by ID | PK = CANDIDATE#id | Main |
| Get candidate by email | GSI1PK = EMAIL#email | GSI1 |
| List active candidates | GSI2PK = STATUS#active | GSI2 |
| List candidates by location | GSI3PK = LOCATION#BH8 | GSI3 |
| Get client by ID | PK = CLIENT#id | Main |
| Get subscription by client | PK = CLIENT#id, SK begins_with SUBSCRIPTION# | Main |
| List contact requests by client | PK = CLIENT#id, SK begins_with CONTACT# | Main |

---

### 1.3 Foundation Stack - S3

**Task:** Create S3 bucket for CVs and profile photos

**Test:** Integration test for presigned URL generation

```typescript
// tests/integration/foundation/s3.test.ts
describe('S3 Foundation', () => {
  it('generates presigned upload URL with correct constraints', async () => {
    const url = await generateUploadUrl({
      bucket: 'medibee-files-dev',
      key: 'candidates/CND-001/cv.pdf',
      contentType: 'application/pdf',
      maxSizeBytes: 5 * 1024 * 1024
    });

    expect(url).toContain('X-Amz-Algorithm');
    expect(url).toContain('X-Amz-Expires');
  });

  it('enforces tenant-scoped keys', async () => {
    await expect(
      generateUploadUrl({
        bucket: 'medibee-files-dev',
        key: '../other-tenant/cv.pdf', // Path traversal attempt
        contentType: 'application/pdf'
      })
    ).rejects.toThrow('Invalid key');
  });
});
```

**Bucket Configuration:**

```typescript
// cdk/lib/constructs/files-bucket.ts
const bucket = new s3.Bucket(this, 'FilesBucket', {
  bucketName: `medibee-files-${stage}`,
  encryption: s3.BucketEncryption.S3_MANAGED,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  versioned: true,
  lifecycleRules: [
    {
      id: 'delete-old-versions',
      noncurrentVersionExpiration: Duration.days(30),
    },
    {
      id: 'delete-incomplete-uploads',
      abortIncompleteMultipartUploadAfter: Duration.days(1),
    }
  ],
  cors: [
    {
      allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.POST],
      allowedOrigins: [
        'https://medibee.opstack.uk',
        'https://www.medibee-recruitment.co.uk',
        'http://localhost:3000'
      ],
      allowedHeaders: ['*'],
      maxAge: 3000
    }
  ]
});
```

**Key Structure:**
```
medibee-files-{stage}/
├── candidates/
│   └── {candidateId}/
│       ├── cv.pdf
│       └── photo.jpg
├── clients/
│   └── {clientId}/
│       └── logo.png
└── temp/
    └── {uploadId}/
        └── [pending uploads]
```

---

### 1.4 Foundation Stack - Cognito

**Task:** Create 3 Cognito user pools (candidate, client, admin)

**Test:** Integration test for user creation and authentication

```typescript
// tests/integration/foundation/cognito.test.ts
describe('Cognito Foundation', () => {
  describe('Candidate Pool', () => {
    it('allows sign up with email verification', async () => {
      const result = await signUp({
        pool: 'candidate',
        email: 'test@example.com',
        password: 'SecurePass123!'
      });

      expect(result.userConfirmed).toBe(false);
      expect(result.codeDeliveryDetails.DeliveryMedium).toBe('EMAIL');
    });

    it('rejects weak passwords', async () => {
      await expect(
        signUp({
          pool: 'candidate',
          email: 'test@example.com',
          password: 'weak'
        })
      ).rejects.toThrow('Password did not conform');
    });
  });

  describe('Client Pool', () => {
    it('allows sign up with email verification', async () => {
      // Similar test
    });
  });

  describe('Admin Pool', () => {
    it('does not allow public sign up', async () => {
      await expect(
        signUp({
          pool: 'admin',
          email: 'admin@example.com',
          password: 'SecurePass123!'
        })
      ).rejects.toThrow('SignUp is not permitted');
    });
  });
});
```

**Pool Configuration:**

```typescript
// cdk/lib/constructs/candidate-pool.ts
const candidatePool = new cognito.UserPool(this, 'CandidatePool', {
  userPoolName: `medibee-candidates-${stage}`,
  selfSignUpEnabled: true,
  signInAliases: { email: true },
  autoVerify: { email: true },
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireDigits: true,
    requireSymbols: false,
  },
  accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
  standardAttributes: {
    email: { required: true, mutable: false },
    fullname: { required: true, mutable: true },
    phoneNumber: { required: false, mutable: true },
  },
  customAttributes: {
    candidateId: new cognito.StringAttribute({ mutable: false }),
    profileStatus: new cognito.StringAttribute({ mutable: true }),
  },
  lambdaTriggers: {
    postConfirmation: postConfirmationLambda,
    preTokenGeneration: preTokenGenerationLambda,
  },
});

const candidateClient = candidatePool.addClient('WebClient', {
  authFlows: {
    userPassword: true,
    userSrp: true,
  },
  oAuth: {
    flows: { authorizationCodeGrant: true },
    scopes: [cognito.OAuthScope.EMAIL, cognito.OAuthScope.OPENID],
    callbackUrls: [`https://${domain}/candidate/callback`],
    logoutUrls: [`https://${domain}/candidate/logout`],
  },
  accessTokenValidity: Duration.hours(1),
  idTokenValidity: Duration.hours(1),
  refreshTokenValidity: Duration.days(30),
});
```

---

### 1.5 Lambda Authorizer

**Task:** Create JWT authorizer for API Gateway

**Test:** Unit test for token validation

```typescript
// tests/unit/shared/authorizer.test.ts
describe('Lambda Authorizer', () => {
  it('allows valid candidate token', async () => {
    const token = await generateTestToken({
      pool: 'candidate',
      sub: 'user-123',
      candidateId: 'CND-001'
    });

    const result = await authorizer({
      headers: { Authorization: `Bearer ${token}` },
      methodArn: 'arn:aws:execute-api:eu-west-2:123:api/dev/GET/candidates'
    });

    expect(result.principalId).toBe('user-123');
    expect(result.context.candidateId).toBe('CND-001');
    expect(result.policyDocument.Statement[0].Effect).toBe('Allow');
  });

  it('denies expired token', async () => {
    const expiredToken = await generateExpiredToken();

    await expect(
      authorizer({
        headers: { Authorization: `Bearer ${expiredToken}` },
        methodArn: 'arn:aws:execute-api:eu-west-2:123:api/dev/GET/candidates'
      })
    ).rejects.toThrow('Unauthorized');
  });

  it('denies token from wrong pool', async () => {
    const clientToken = await generateTestToken({ pool: 'client' });

    const result = await authorizer({
      headers: { Authorization: `Bearer ${clientToken}` },
      methodArn: 'arn:aws:execute-api:eu-west-2:123:api/dev/GET/candidates/me'
    });

    expect(result.policyDocument.Statement[0].Effect).toBe('Deny');
  });
});
```

---

## Phase 2: Candidate API

### 2.1 Candidate Registration

**API Contract:**

```yaml
POST /candidates/register
Content-Type: application/json

Request:
{
  "email": "string (email format)",
  "password": "string (min 8 chars)",
  "fullName": "string (2-100 chars)",
  "phone": "string (UK format)",
  "agreedToTerms": true
}

Response (201):
{
  "candidateId": "CND-xxx",
  "email": "string",
  "status": "pending_verification",
  "message": "Verification email sent"
}

Errors:
- 400: Validation error
- 409: Email already registered
```

**Integration Test:**

```typescript
// tests/integration/candidate-api/register.test.ts
describe('POST /candidates/register', () => {
  it('creates candidate and sends verification email', async () => {
    const response = await api.post('/candidates/register', {
      email: 'newhca@example.com',
      password: 'SecurePass123!',
      fullName: 'Jane Smith',
      phone: '07700900123',
      agreedToTerms: true
    });

    expect(response.status).toBe(201);
    expect(response.body.candidateId).toMatch(/^CND-/);
    expect(response.body.status).toBe('pending_verification');

    // Verify DynamoDB entry
    const candidate = await getCandidate(response.body.candidateId);
    expect(candidate.email).toBe('newhca@example.com');
    expect(candidate.profileStatus).toBe('pending_verification');
  });

  it('rejects duplicate email', async () => {
    await createTestCandidate({ email: 'existing@example.com' });

    const response = await api.post('/candidates/register', {
      email: 'existing@example.com',
      password: 'SecurePass123!',
      fullName: 'Another Person',
      phone: '07700900124',
      agreedToTerms: true
    });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe('Email already registered');
  });

  it('rejects invalid phone format', async () => {
    const response = await api.post('/candidates/register', {
      email: 'test@example.com',
      password: 'SecurePass123!',
      fullName: 'Test User',
      phone: '12345', // Invalid
      agreedToTerms: true
    });

    expect(response.status).toBe(400);
    expect(response.body.details).toContainEqual(
      expect.objectContaining({ path: ['phone'] })
    );
  });

  it('rejects if terms not agreed', async () => {
    const response = await api.post('/candidates/register', {
      email: 'test@example.com',
      password: 'SecurePass123!',
      fullName: 'Test User',
      phone: '07700900123',
      agreedToTerms: false
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('terms');
  });
});
```

**Domain Types:**

```typescript
// lambdas/candidate-api/domain/types.ts
import { z } from 'zod';

export const CandidateIdSchema = z.string().regex(/^CND-[A-Z0-9]{8}$/);
export type CandidateId = z.infer<typeof CandidateIdSchema>;

export const ProfileStatusSchema = z.enum([
  'pending_verification',
  'pending_profile',
  'pending_review',
  'active',
  'suspended',
  'deleted'
]);
export type ProfileStatus = z.infer<typeof ProfileStatusSchema>;

export const ExperienceLevelSchema = z.enum([
  'newly-qualified',
  '1-2-years',
  '3-5-years',
  '5-plus-years'
]);

export const CareSettingSchema = z.enum([
  'mental-health',
  'acute-care',
  'private-hospital',
  'care-home',
  'supported-living',
  'end-of-life',
  'community',
  'learning-disabilities',
  'dementia-care',
  'paediatric'
]);

export const CandidateSchema = z.object({
  candidateId: CandidateIdSchema,
  cognitoSub: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(2).max(100),
  phone: z.string().regex(/^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/),
  profileStatus: ProfileStatusSchema,
  location: z.object({
    outwardCode: z.string().regex(/^[A-Z]{1,2}\d{1,2}[A-Z]?$/),
    fullPostcode: z.string().optional(),
  }).optional(),
  experienceLevel: ExperienceLevelSchema.optional(),
  preferredSettings: z.array(CareSettingSchema).min(1).optional(),
  professionalSummary: z.string().min(50).max(500).optional(),
  rightToWork: z.boolean().optional(),
  dbsStatus: z.enum(['none', 'applied', 'cleared']).optional(),
  cvKey: z.string().optional(),
  photoKey: z.string().optional(),
  availableForWork: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Candidate = z.infer<typeof CandidateSchema>;
```

**Domain Rules:**

```typescript
// lambdas/candidate-api/domain/rules.ts
import type { Candidate, ProfileStatus } from './types';

export function canSubmitForReview(candidate: Candidate): boolean {
  // Must have completed all required fields
  if (!candidate.location) return false;
  if (!candidate.experienceLevel) return false;
  if (!candidate.preferredSettings || candidate.preferredSettings.length === 0) return false;
  if (!candidate.professionalSummary) return false;
  if (candidate.rightToWork !== true) return false;
  return true;
}

export function canTransitionStatus(
  current: ProfileStatus,
  target: ProfileStatus
): boolean {
  const allowedTransitions: Record<ProfileStatus, ProfileStatus[]> = {
    'pending_verification': ['pending_profile'],
    'pending_profile': ['pending_review'],
    'pending_review': ['active', 'pending_profile'], // reject goes back to pending_profile
    'active': ['suspended'],
    'suspended': ['active'],
    'deleted': [],
  };

  return allowedTransitions[current]?.includes(target) ?? false;
}

export function isProfileComplete(candidate: Candidate): boolean {
  return canSubmitForReview(candidate);
}

export function isVisibleToClients(candidate: Candidate): boolean {
  return (
    candidate.profileStatus === 'active' &&
    candidate.availableForWork === true
  );
}
```

---

### 2.2 Candidate Profile CRUD

**API Contract:**

```yaml
GET /candidates/me
Authorization: Bearer {candidateToken}

Response (200):
{
  "candidateId": "CND-xxx",
  "email": "string",
  "fullName": "string",
  "phone": "string",
  "profileStatus": "active",
  "location": {
    "outwardCode": "BH8"
  },
  "experienceLevel": "3-5-years",
  "preferredSettings": ["mental-health", "acute-care"],
  "professionalSummary": "string",
  "rightToWork": true,
  "dbsStatus": "cleared",
  "cvUrl": "string (presigned URL, 15 min expiry)",
  "photoUrl": "string (presigned URL, 15 min expiry)",
  "availableForWork": true,
  "profileComplete": true,
  "createdAt": "2026-03-12T10:00:00Z",
  "updatedAt": "2026-03-12T10:00:00Z"
}
```

```yaml
PATCH /candidates/me
Authorization: Bearer {candidateToken}
Content-Type: application/json

Request:
{
  "fullName": "string (optional)",
  "phone": "string (optional)",
  "location": {
    "outwardCode": "string (optional)",
    "fullPostcode": "string (optional)"
  },
  "experienceLevel": "string (optional)",
  "preferredSettings": ["string"] (optional),
  "professionalSummary": "string (optional)",
  "rightToWork": boolean (optional),
  "dbsStatus": "string (optional)",
  "availableForWork": boolean (optional)
}

Response (200):
{
  // Updated candidate object
}
```

**Integration Tests:**

```typescript
// tests/integration/candidate-api/profile-crud.test.ts
describe('Candidate Profile CRUD', () => {
  describe('GET /candidates/me', () => {
    it('returns candidate profile with presigned URLs', async () => {
      const { token, candidateId } = await createAuthenticatedCandidate({
        cvKey: 'candidates/CND-001/cv.pdf'
      });

      const response = await api
        .get('/candidates/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.candidateId).toBe(candidateId);
      expect(response.body.cvUrl).toContain('X-Amz-Signature');
      expect(response.body.cvUrl).toContain('X-Amz-Expires=900'); // 15 min
    });

    it('rejects unauthenticated request', async () => {
      const response = await api.get('/candidates/me');
      expect(response.status).toBe(401);
    });

    it('rejects client token', async () => {
      const { token } = await createAuthenticatedClient();

      const response = await api
        .get('/candidates/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });
  });

  describe('PATCH /candidates/me', () => {
    it('updates profile fields', async () => {
      const { token, candidateId } = await createAuthenticatedCandidate();

      const response = await api
        .patch('/candidates/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          fullName: 'Jane Updated',
          experienceLevel: '5-plus-years'
        });

      expect(response.status).toBe(200);
      expect(response.body.fullName).toBe('Jane Updated');
      expect(response.body.experienceLevel).toBe('5-plus-years');

      // Verify in database
      const candidate = await getCandidate(candidateId);
      expect(candidate.fullName).toBe('Jane Updated');
    });

    it('triggers status transition when profile complete', async () => {
      const { token, candidateId } = await createAuthenticatedCandidate({
        profileStatus: 'pending_profile',
        experienceLevel: undefined // Missing required field
      });

      const response = await api
        .patch('/candidates/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          experienceLevel: '3-5-years',
          preferredSettings: ['mental-health'],
          professionalSummary: 'Experienced HCA with 4 years in mental health settings...',
          rightToWork: true,
          location: { outwardCode: 'BH8' }
        });

      expect(response.status).toBe(200);
      expect(response.body.profileStatus).toBe('pending_review');
      expect(response.body.profileComplete).toBe(true);
    });

    it('validates field formats', async () => {
      const { token } = await createAuthenticatedCandidate();

      const response = await api
        .patch('/candidates/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          phone: 'not-a-phone'
        });

      expect(response.status).toBe(400);
    });
  });
});
```

---

### 2.3 CV Upload

**API Contract:**

```yaml
POST /candidates/me/cv/upload-url
Authorization: Bearer {candidateToken}
Content-Type: application/json

Request:
{
  "contentType": "application/pdf",
  "contentLength": 1234567
}

Response (200):
{
  "uploadUrl": "string (presigned PUT URL)",
  "key": "candidates/{candidateId}/cv.pdf",
  "expiresIn": 300
}

Errors:
- 400: Invalid content type (only PDF allowed)
- 400: File too large (max 5MB)
```

```yaml
POST /candidates/me/cv/confirm
Authorization: Bearer {candidateToken}
Content-Type: application/json

Request:
{
  "key": "candidates/{candidateId}/cv.pdf"
}

Response (200):
{
  "success": true,
  "cvUrl": "string (presigned GET URL)"
}

Errors:
- 400: File not found at key
- 400: File validation failed (magic bytes)
```

**Integration Tests:**

```typescript
// tests/integration/candidate-api/cv-upload.test.ts
describe('CV Upload', () => {
  describe('POST /candidates/me/cv/upload-url', () => {
    it('generates presigned URL for PDF upload', async () => {
      const { token } = await createAuthenticatedCandidate();

      const response = await api
        .post('/candidates/me/cv/upload-url')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'application/pdf',
          contentLength: 1024 * 1024 // 1MB
        });

      expect(response.status).toBe(200);
      expect(response.body.uploadUrl).toContain('X-Amz-Algorithm');
      expect(response.body.key).toMatch(/^candidates\/CND-.*\/cv\.pdf$/);
      expect(response.body.expiresIn).toBe(300);
    });

    it('rejects non-PDF content types', async () => {
      const { token } = await createAuthenticatedCandidate();

      const response = await api
        .post('/candidates/me/cv/upload-url')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'image/jpeg',
          contentLength: 1024
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('PDF');
    });

    it('rejects files over 5MB', async () => {
      const { token } = await createAuthenticatedCandidate();

      const response = await api
        .post('/candidates/me/cv/upload-url')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'application/pdf',
          contentLength: 6 * 1024 * 1024 // 6MB
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('5MB');
    });
  });

  describe('POST /candidates/me/cv/confirm', () => {
    it('validates uploaded file and updates profile', async () => {
      const { token, candidateId } = await createAuthenticatedCandidate();

      // Upload actual PDF file
      const uploadUrl = await getUploadUrl(token);
      await uploadTestPdf(uploadUrl);

      const response = await api
        .post('/candidates/me/cv/confirm')
        .set('Authorization', `Bearer ${token}`)
        .send({
          key: `candidates/${candidateId}/cv.pdf`
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify profile updated
      const candidate = await getCandidate(candidateId);
      expect(candidate.cvKey).toBe(`candidates/${candidateId}/cv.pdf`);
    });

    it('rejects file with wrong magic bytes', async () => {
      const { token, candidateId } = await createAuthenticatedCandidate();

      // Upload file with .pdf extension but wrong content
      const uploadUrl = await getUploadUrl(token);
      await uploadFakeFile(uploadUrl, 'not-a-pdf-content');

      const response = await api
        .post('/candidates/me/cv/confirm')
        .set('Authorization', `Bearer ${token}`)
        .send({
          key: `candidates/${candidateId}/cv.pdf`
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid file');
    });

    it('rejects key for different candidate', async () => {
      const { token: token1 } = await createAuthenticatedCandidate();
      const { candidateId: otherId } = await createAuthenticatedCandidate();

      const response = await api
        .post('/candidates/me/cv/confirm')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          key: `candidates/${otherId}/cv.pdf` // Other candidate's key
        });

      expect(response.status).toBe(403);
    });
  });
});
```

**File Validation:**

```typescript
// lambdas/candidate-api/infrastructure/file-validator.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const PDF_MAGIC_BYTES = [0x25, 0x50, 0x44, 0x46]; // %PDF

export async function validatePdfFile(
  bucket: string,
  key: string
): Promise<{ valid: boolean; error?: string }> {
  const s3 = new S3Client({ region: 'eu-west-2' });

  try {
    const response = await s3.send(new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      Range: 'bytes=0-3'
    }));

    const bytes = await response.Body?.transformToByteArray();
    if (!bytes) {
      return { valid: false, error: 'Could not read file' };
    }

    const magicMatch = PDF_MAGIC_BYTES.every((byte, i) => bytes[i] === byte);
    if (!magicMatch) {
      return { valid: false, error: 'File is not a valid PDF' };
    }

    // Check file size
    const contentLength = response.ContentLength ?? 0;
    if (contentLength > 5 * 1024 * 1024) {
      return { valid: false, error: 'File exceeds 5MB limit' };
    }

    return { valid: true };
  } catch (error) {
    if (error.name === 'NoSuchKey') {
      return { valid: false, error: 'File not found' };
    }
    throw error;
  }
}
```

---

## Phase 3: Client API

### 3.1 Client Registration

**API Contract:**

```yaml
POST /clients/register
Content-Type: application/json

Request:
{
  "email": "string (email format)",
  "password": "string (min 8 chars)",
  "organisationName": "string (2-200 chars)",
  "organisationType": "nhs-trust" | "private-hospital" | "care-home" | "supported-living" | "mental-health-service" | "other",
  "contactName": "string (2-100 chars)",
  "contactPhone": "string (UK format)",
  "agreedToTerms": true
}

Response (201):
{
  "clientId": "CLI-xxx",
  "email": "string",
  "status": "pending_verification",
  "message": "Verification email sent"
}
```

### 3.2 Organisation Profile

**API Contract:**

```yaml
GET /clients/me
Authorization: Bearer {clientToken}

Response (200):
{
  "clientId": "CLI-xxx",
  "organisationName": "string",
  "organisationType": "string",
  "contactName": "string",
  "contactEmail": "string",
  "contactPhone": "string",
  "billingEmail": "string",
  "address": {
    "line1": "string",
    "line2": "string",
    "city": "string",
    "postcode": "string"
  },
  "cqcNumber": "string",
  "subscription": {
    "tier": "bronze" | "silver" | "gold" | null,
    "status": "trialing" | "active" | "past_due" | "cancelled" | null,
    "currentPeriodEnd": "2026-04-12T00:00:00Z",
    "contactCreditsRemaining": 5,
    "contactCreditsUsed": 0
  },
  "teamMembers": [
    {
      "userId": "string",
      "email": "string",
      "name": "string",
      "role": "owner" | "admin" | "member"
    }
  ],
  "createdAt": "string",
  "updatedAt": "string"
}
```

---

## Phase 4: Subscription API

### 4.1 Stripe Integration

**API Contract:**

```yaml
POST /subscriptions/checkout
Authorization: Bearer {clientToken}
Content-Type: application/json

Request:
{
  "tier": "bronze" | "silver" | "gold"
}

Response (200):
{
  "checkoutUrl": "https://checkout.stripe.com/xxx",
  "sessionId": "cs_xxx"
}
```

```yaml
POST /subscriptions/webhook
X-Stripe-Signature: {signature}
Content-Type: application/json

# Stripe webhook payload
```

```yaml
GET /subscriptions/portal
Authorization: Bearer {clientToken}

Response (200):
{
  "portalUrl": "https://billing.stripe.com/xxx"
}
```

**Integration Tests:**

```typescript
// tests/integration/subscription-api/checkout.test.ts
describe('Subscription API', () => {
  describe('POST /subscriptions/checkout', () => {
    it('creates Stripe checkout session for new subscriber', async () => {
      const { token, clientId } = await createAuthenticatedClient({
        subscription: null
      });

      const response = await api
        .post('/subscriptions/checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ tier: 'bronze' });

      expect(response.status).toBe(200);
      expect(response.body.checkoutUrl).toContain('checkout.stripe.com');
      expect(response.body.sessionId).toMatch(/^cs_/);
    });

    it('creates upgrade checkout for existing subscriber', async () => {
      const { token } = await createAuthenticatedClient({
        subscription: { tier: 'bronze', status: 'active' }
      });

      const response = await api
        .post('/subscriptions/checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ tier: 'gold' });

      expect(response.status).toBe(200);
      // Stripe handles prorated upgrade
    });
  });

  describe('POST /subscriptions/webhook', () => {
    it('handles checkout.session.completed', async () => {
      const { clientId } = await createClient();

      const event = createStripeEvent('checkout.session.completed', {
        metadata: { clientId },
        subscription: 'sub_xxx',
        customer: 'cus_xxx'
      });

      const response = await api
        .post('/subscriptions/webhook')
        .set('Stripe-Signature', signWebhook(event))
        .send(event);

      expect(response.status).toBe(200);

      // Verify subscription created
      const client = await getClient(clientId);
      expect(client.subscription.status).toBe('active');
      expect(client.subscription.stripeSubscriptionId).toBe('sub_xxx');
    });

    it('handles invoice.payment_failed', async () => {
      const { clientId } = await createClientWithSubscription();

      const event = createStripeEvent('invoice.payment_failed', {
        subscription: 'sub_xxx'
      });

      await api
        .post('/subscriptions/webhook')
        .set('Stripe-Signature', signWebhook(event))
        .send(event);

      const client = await getClient(clientId);
      expect(client.subscription.status).toBe('past_due');
    });
  });
});
```

---

## Phase 5: Matching API

### 5.1 Browse Candidates

**API Contract:**

```yaml
GET /candidates
Authorization: Bearer {clientToken}
Query Parameters:
  - location: string (outward code, e.g., "BH8")
  - experienceLevel: string (enum)
  - settings: string (comma-separated)
  - available: boolean
  - cursor: string (pagination)
  - limit: number (default 20, max 50)

Response (200):
{
  "candidates": [
    {
      "candidateId": "CND-xxx",
      "fullName": "string",
      "location": { "outwardCode": "BH8" },
      "experienceLevel": "3-5-years",
      "preferredSettings": ["mental-health"],
      "professionalSummary": "string (truncated to 150 chars)",
      "availableForWork": true,
      "hasPhoto": true,
      "createdAt": "string"
    }
  ],
  "nextCursor": "string | null",
  "totalCount": 42
}

Errors:
- 401: Unauthorized
- 403: No active subscription
```

**Integration Tests:**

```typescript
// tests/integration/matching-api/browse.test.ts
describe('GET /candidates', () => {
  beforeEach(async () => {
    // Create test candidates
    await createCandidate({ location: 'BH8', experienceLevel: '3-5-years', status: 'active' });
    await createCandidate({ location: 'BH8', experienceLevel: '1-2-years', status: 'active' });
    await createCandidate({ location: 'SO14', experienceLevel: '5-plus-years', status: 'active' });
    await createCandidate({ location: 'BH8', status: 'pending_review' }); // Not visible
  });

  it('returns active candidates for subscribed client', async () => {
    const { token } = await createAuthenticatedClientWithSubscription();

    const response = await api
      .get('/candidates')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.candidates).toHaveLength(3);
    expect(response.body.candidates.every(c => c.profileStatus === undefined)).toBe(true);
  });

  it('filters by location', async () => {
    const { token } = await createAuthenticatedClientWithSubscription();

    const response = await api
      .get('/candidates?location=BH8')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.candidates).toHaveLength(2);
    expect(response.body.candidates.every(c => c.location.outwardCode === 'BH8')).toBe(true);
  });

  it('filters by experience level', async () => {
    const { token } = await createAuthenticatedClientWithSubscription();

    const response = await api
      .get('/candidates?experienceLevel=3-5-years')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.candidates).toHaveLength(1);
  });

  it('rejects client without subscription', async () => {
    const { token } = await createAuthenticatedClient({ subscription: null });

    const response = await api
      .get('/candidates')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('subscription');
  });

  it('paginates results', async () => {
    // Create 30 candidates
    await Promise.all(
      Array(30).fill(null).map(() => createCandidate({ status: 'active' }))
    );

    const { token } = await createAuthenticatedClientWithSubscription();

    const page1 = await api
      .get('/candidates?limit=20')
      .set('Authorization', `Bearer ${token}`);

    expect(page1.body.candidates).toHaveLength(20);
    expect(page1.body.nextCursor).toBeTruthy();

    const page2 = await api
      .get(`/candidates?limit=20&cursor=${page1.body.nextCursor}`)
      .set('Authorization', `Bearer ${token}`);

    expect(page2.body.candidates.length).toBeGreaterThan(0);
  });
});
```

### 5.2 View Candidate Profile

**API Contract:**

```yaml
GET /candidates/{candidateId}
Authorization: Bearer {clientToken}

Response (200):
{
  "candidateId": "CND-xxx",
  "fullName": "string",
  "phone": null, // Hidden until contact
  "email": null, // Hidden until contact
  "location": { "outwardCode": "BH8" },
  "experienceLevel": "3-5-years",
  "preferredSettings": ["mental-health", "acute-care"],
  "professionalSummary": "string (full text)",
  "rightToWork": true,
  "dbsStatus": "cleared",
  "cvUrl": "string (presigned URL)", // Only for Silver/Gold
  "photoUrl": "string (presigned URL)",
  "availableForWork": true,
  "createdAt": "string"
}

Errors:
- 401: Unauthorized
- 403: No active subscription
- 403: Bronze tier cannot view CV
- 404: Candidate not found or not active
```

### 5.3 Shortlists

**API Contract:**

```yaml
POST /shortlists
Authorization: Bearer {clientToken}
Content-Type: application/json

Request:
{
  "name": "string (2-100 chars)"
}

Response (201):
{
  "shortlistId": "SHL-xxx",
  "name": "string",
  "candidateCount": 0,
  "createdAt": "string"
}
```

```yaml
POST /shortlists/{shortlistId}/candidates
Authorization: Bearer {clientToken}
Content-Type: application/json

Request:
{
  "candidateId": "CND-xxx"
}

Response (201):
{
  "success": true
}

Errors:
- 400: Candidate already in shortlist
- 403: Shortlist limit reached for tier
- 404: Candidate not found
```

### 5.4 Contact Requests

**API Contract:**

```yaml
POST /contacts
Authorization: Bearer {clientToken}
Content-Type: application/json

Request:
{
  "candidateId": "CND-xxx",
  "message": "string (optional, max 500 chars)"
}

Response (201):
{
  "contactId": "CON-xxx",
  "candidateId": "CND-xxx",
  "status": "pending",
  "creditsRemaining": 4,
  "message": "Contact request sent. Medibee will facilitate the introduction."
}

Errors:
- 400: Contact request already exists for this candidate
- 403: Insufficient contact credits
- 404: Candidate not found
```

**Integration Tests:**

```typescript
// tests/integration/matching-api/contact-request.test.ts
describe('POST /contacts', () => {
  it('creates contact request and deducts credit', async () => {
    const { token, clientId } = await createAuthenticatedClientWithSubscription({
      tier: 'bronze',
      contactCreditsRemaining: 5
    });
    const { candidateId } = await createActiveCandidate();

    const response = await api
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ candidateId });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('pending');
    expect(response.body.creditsRemaining).toBe(4);

    // Verify credit deducted
    const client = await getClient(clientId);
    expect(client.subscription.contactCreditsRemaining).toBe(4);
    expect(client.subscription.contactCreditsUsed).toBe(1);

    // Verify contact request created
    const contact = await getContactRequest(response.body.contactId);
    expect(contact.clientId).toBe(clientId);
    expect(contact.candidateId).toBe(candidateId);
  });

  it('rejects when no credits remaining', async () => {
    const { token } = await createAuthenticatedClientWithSubscription({
      tier: 'bronze',
      contactCreditsRemaining: 0
    });
    const { candidateId } = await createActiveCandidate();

    const response = await api
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ candidateId });

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('credits');
  });

  it('allows unlimited contacts for Gold tier', async () => {
    const { token, clientId } = await createAuthenticatedClientWithSubscription({
      tier: 'gold'
    });

    // Make 100 contact requests
    const candidates = await Promise.all(
      Array(100).fill(null).map(() => createActiveCandidate())
    );

    for (const { candidateId } of candidates) {
      const response = await api
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ candidateId });

      expect(response.status).toBe(201);
    }
  });

  it('prevents duplicate contact request for same candidate', async () => {
    const { token } = await createAuthenticatedClientWithSubscription();
    const { candidateId } = await createActiveCandidate();

    // First request
    await api
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ candidateId });

    // Duplicate request
    const response = await api
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ candidateId });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('already');
  });

  it('sends emails to candidate and client', async () => {
    const { token } = await createAuthenticatedClientWithSubscription();
    const { candidateId, email: candidateEmail } = await createActiveCandidate();

    await api
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ candidateId });

    // Verify emails sent (mock SES)
    const sentEmails = await getSentEmails();
    expect(sentEmails).toContainEqual(
      expect.objectContaining({
        to: candidateEmail,
        subject: expect.stringContaining('interested')
      })
    );
  });

  it('uses atomic transaction to prevent race conditions', async () => {
    const { token } = await createAuthenticatedClientWithSubscription({
      contactCreditsRemaining: 1
    });
    const { candidateId: cand1 } = await createActiveCandidate();
    const { candidateId: cand2 } = await createActiveCandidate();

    // Simulate concurrent requests (1 credit, 2 requests)
    const [res1, res2] = await Promise.all([
      api.post('/contacts').set('Authorization', `Bearer ${token}`).send({ candidateId: cand1 }),
      api.post('/contacts').set('Authorization', `Bearer ${token}`).send({ candidateId: cand2 })
    ]);

    // Exactly one should succeed
    const successes = [res1, res2].filter(r => r.status === 201);
    const failures = [res1, res2].filter(r => r.status === 403);

    expect(successes).toHaveLength(1);
    expect(failures).toHaveLength(1);
  });
});
```

---

## Phase 6: Admin API

### 6.1 Candidate Moderation

**API Contract:**

```yaml
GET /admin/candidates
Authorization: Bearer {adminToken}
Query Parameters:
  - status: string (filter by profileStatus)
  - cursor: string
  - limit: number

Response (200):
{
  "candidates": [
    {
      "candidateId": "CND-xxx",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "profileStatus": "pending_review",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "nextCursor": "string | null"
}
```

```yaml
POST /admin/candidates/{candidateId}/approve
Authorization: Bearer {adminToken}

Response (200):
{
  "candidateId": "CND-xxx",
  "profileStatus": "active"
}
```

```yaml
POST /admin/candidates/{candidateId}/reject
Authorization: Bearer {adminToken}
Content-Type: application/json

Request:
{
  "reason": "string"
}

Response (200):
{
  "candidateId": "CND-xxx",
  "profileStatus": "pending_profile",
  "rejectionReason": "string"
}
```

```yaml
POST /admin/candidates/{candidateId}/suspend
Authorization: Bearer {adminToken}
Content-Type: application/json

Request:
{
  "reason": "string"
}

Response (200):
{
  "candidateId": "CND-xxx",
  "profileStatus": "suspended"
}
```

### 6.2 Contact Request Management

**API Contract:**

```yaml
GET /admin/contacts
Authorization: Bearer {adminToken}
Query Parameters:
  - status: pending | connected | declined | expired
  - cursor: string

Response (200):
{
  "contacts": [
    {
      "contactId": "CON-xxx",
      "client": {
        "clientId": "CLI-xxx",
        "organisationName": "string",
        "contactName": "string",
        "contactEmail": "string",
        "contactPhone": "string"
      },
      "candidate": {
        "candidateId": "CND-xxx",
        "fullName": "string",
        "email": "string",
        "phone": "string"
      },
      "status": "pending",
      "message": "string",
      "createdAt": "string"
    }
  ]
}
```

```yaml
POST /admin/contacts/{contactId}/resolve
Authorization: Bearer {adminToken}
Content-Type: application/json

Request:
{
  "status": "connected" | "declined" | "expired",
  "notes": "string (optional)"
}

Response (200):
{
  "contactId": "CON-xxx",
  "status": "connected"
}
```

### 6.3 Analytics Dashboard

**API Contract:**

```yaml
GET /admin/analytics
Authorization: Bearer {adminToken}
Query Parameters:
  - period: 7d | 30d | 90d

Response (200):
{
  "period": "30d",
  "candidates": {
    "total": 150,
    "active": 120,
    "pending": 15,
    "suspended": 5,
    "newThisPeriod": 25
  },
  "clients": {
    "total": 30,
    "active": 25,
    "byTier": {
      "bronze": 15,
      "silver": 7,
      "gold": 3
    },
    "newThisPeriod": 5
  },
  "contacts": {
    "totalThisPeriod": 45,
    "connected": 30,
    "declined": 5,
    "pending": 10
  },
  "mrr": {
    "current": 4500,
    "previousPeriod": 4000,
    "growth": 12.5
  }
}
```

---

## Phase 7: Frontend Evolution

### 7.1 Auth Context & Hooks

```typescript
// lib/auth/auth-context.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { candidatePool, clientPool, adminPool } from './cognito-pools';

type UserType = 'candidate' | 'client' | 'admin';

interface AuthState {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  user: CognitoUser | null;
  userType: UserType | null;
  token: string | null;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string, userType: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useRequireAuth(requiredType: UserType) {
  const auth = useAuth();

  useEffect(() => {
    if (auth.status === 'unauthenticated') {
      window.location.href = `/${requiredType}/login`;
    }
    if (auth.status === 'authenticated' && auth.userType !== requiredType) {
      window.location.href = `/${auth.userType}/dashboard`;
    }
  }, [auth.status, auth.userType, requiredType]);

  return auth;
}
```

### 7.2 API Client

```typescript
// lib/api/client.ts
import { useAuth } from '../auth/auth-context';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ApiClientOptions {
  token?: string;
}

export function createApiClient(options: ApiClientOptions = {}) {
  async function request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(response.status, error.message || 'Request failed', error);
    }

    return response.json();
  }

  return {
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
    patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
    delete: <T>(path: string) => request<T>('DELETE', path),
  };
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

// React hook for authenticated API calls
export function useApi() {
  const { token } = useAuth();
  return createApiClient({ token: token ?? undefined });
}
```

### 7.3 Component Tests

```typescript
// components/candidate/ProfileForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileForm } from './ProfileForm';
import { createMockAuthContext } from '@/test-utils/auth';

describe('ProfileForm', () => {
  it('displays current profile data', async () => {
    const profile = {
      fullName: 'Jane Smith',
      phone: '07700900123',
      experienceLevel: '3-5-years',
      preferredSettings: ['mental-health'],
    };

    render(
      <ProfileForm
        profile={profile}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Smith');
    expect(screen.getByLabelText(/phone/i)).toHaveValue('07700900123');
  });

  it('validates required fields before submit', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <ProfileForm
        profile={{}}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with updated data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <ProfileForm
        profile={{ fullName: 'Jane' }}
        onSubmit={onSubmit}
      />
    );

    await user.clear(screen.getByLabelText(/full name/i));
    await user.type(screen.getByLabelText(/full name/i), 'Jane Updated');
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ fullName: 'Jane Updated' })
      );
    });
  });
});
```

---

## CI/CD Pipeline

### GitHub Actions - Backend

```yaml
# .github/workflows/deploy-api.yml
name: Deploy API

on:
  push:
    branches: [main]
    paths:
      - 'medibee-serverless-api/**'
  pull_request:
    branches: [main]
    paths:
      - 'medibee-serverless-api/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        working-directory: medibee-serverless-api

      - name: Run unit tests
        run: npm run test:unit
        working-directory: medibee-serverless-api

      - name: Run integration tests
        run: npm run test:integration
        working-directory: medibee-serverless-api
        env:
          AWS_REGION: eu-west-2
          # Use test environment credentials

  deploy-dev:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: development
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        working-directory: medibee-serverless-api

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-2

      - name: Deploy to dev
        run: npm run deploy:dev
        working-directory: medibee-serverless-api
```

---

## Security Checklist

### Before Each Feature

- [ ] API contract defined with types
- [ ] Integration test written (RED state)
- [ ] Input validation with Zod at boundary
- [ ] Auth check uses JWT claims only
- [ ] Tenant isolation in queries (if applicable)
- [ ] No internal IDs in responses
- [ ] Error responses don't leak information
- [ ] Rate limiting considered

### File Upload Features

- [ ] Content-Type validated against magic bytes
- [ ] File size limits enforced
- [ ] No SVG/HTML allowed
- [ ] EXIF/metadata stripped from images
- [ ] Presigned URLs have short expiry
- [ ] Keys scoped to user/tenant

### Payment Features

- [ ] Stripe webhook signature validated
- [ ] Idempotency keys used
- [ ] Atomic transactions for credits
- [ ] Race conditions tested

---

## Rollout Plan

### Week 1-2: Infrastructure
- [ ] Create backend repository
- [ ] Deploy foundation stack (DynamoDB, S3, Cognito)
- [ ] Set up CI/CD pipeline
- [ ] Deploy Lambda authorizer

### Week 3-5: Candidate MVP
- [ ] Candidate registration flow
- [ ] Profile CRUD
- [ ] CV upload
- [ ] Availability toggle
- [ ] Frontend candidate portal

### Week 6-8: Client MVP
- [ ] Client registration flow
- [ ] Organisation profile
- [ ] Stripe subscription integration
- [ ] Frontend client portal

### Week 9-10: Matching MVP
- [ ] Browse candidates API
- [ ] Search/filter functionality
- [ ] Shortlists
- [ ] Contact requests
- [ ] Email notifications

### Week 11-12: Admin MVP
- [ ] Moderation dashboard
- [ ] Contact request management
- [ ] Basic analytics
- [ ] Frontend admin portal

### Week 13-14: Launch Prep
- [ ] Security audit
- [ ] Performance testing
- [ ] Documentation
- [ ] Soft launch with beta users

---

## Appendix: Environment Variables

### Backend (Lambda)

| Variable | Description |
|----------|-------------|
| `STAGE` | dev / staging / prod |
| `TABLE_NAME` | DynamoDB table name |
| `FILES_BUCKET` | S3 bucket name |
| `CANDIDATE_POOL_ID` | Cognito pool ID |
| `CLIENT_POOL_ID` | Cognito pool ID |
| `ADMIN_POOL_ID` | Cognito pool ID |
| `STRIPE_SECRET_KEY_ARN` | Secrets Manager ARN |
| `STRIPE_WEBHOOK_SECRET_ARN` | Secrets Manager ARN |
| `SES_FROM_EMAIL` | Sender email address |

### Frontend (Next.js)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_CANDIDATE_POOL_ID` | Cognito pool ID |
| `NEXT_PUBLIC_CANDIDATE_CLIENT_ID` | Cognito client ID |
| `NEXT_PUBLIC_CLIENT_POOL_ID` | Cognito pool ID |
| `NEXT_PUBLIC_CLIENT_CLIENT_ID` | Cognito client ID |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key |

---

*Document Control: This implementation plan should be updated as the project progresses. All changes tracked in git.*
