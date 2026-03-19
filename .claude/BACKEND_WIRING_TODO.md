# Backend Wiring TODO

> **Status**: Frontend complete with mock data. Backend API deployed. Wiring needed.
>
> **Search for**: `TODO(PROD-WIRE)` to find all locations that need changes.

---

## Overview

The frontend portal is built with mock/test data for demonstration. The backend API (`medibee-serverless-api`) is fully deployed. This document outlines what needs to be done to wire them together.

### Backend API Location
- **Repository**: `C:\VSProjects\medibee-serverless-api`
- **API Gateway**: Check CDK outputs or AWS Console for URL
- **Auth**: AWS Cognito (configured in CDK stack)

---

## Files That Need Changes

### 1. API Client Configuration
**File**: `lib/api/client.ts`

```typescript
// TODO(PROD-WIRE): Update API_BASE_URL to deployed API Gateway URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api-gateway-url.execute-api.eu-west-2.amazonaws.com/prod';
```

### 2. Browse Candidates Page
**File**: `app/client/candidates/page.tsx`

Currently uses: `getAllPersonas()` from test data
Should use: `matchingApi.browseCandidates(params)`

```typescript
// TODO(PROD-WIRE): Replace with actual API call
// Current (mock):
const testCandidates = getTestCandidates();
setCandidates(testCandidates);

// Production:
const response = await matchingApi.browseCandidates(params);
if (response.success && response.data) {
  setCandidates(response.data.candidates);
  setNextCursor(response.data.nextCursor);
  setTotal(response.data.total);
}
```

### 3. Candidate Detail Page (Client View)
**File**: `app/client/candidates/[id]/page.tsx`

Currently uses: `getTestCandidate(candidateId)` from test data
Should use: `matchingApi.getCandidate(candidateId)`

```typescript
// TODO(PROD-WIRE): Replace with actual API call
// Current (mock):
const testData = getTestCandidate(candidateId);

// Production:
const response = await matchingApi.getCandidate(candidateId);
if (response.success && response.data) {
  setCandidateData({
    profile: response.data.candidate,
    credentials: response.data.credentials,
  });
}
```

### 4. Introduction Request
**File**: `app/client/candidates/[id]/page.tsx`

Currently uses: `setTimeout` mock
Should use: `contactsApi.request()`

```typescript
// TODO(PROD-WIRE): Replace with actual API call
// Current (mock):
setTimeout(() => { setContactRequested(true); }, 1000);

// Production:
const response = await contactsApi.request({
  candidateId,
  message: introductionMessage
});
if (response.success) {
  setContactRequested(true);
  await refreshProfile(); // Updates credit count
}
```

### 5. Shortlists
**File**: `app/client/candidates/[id]/page.tsx`

Currently uses: Hardcoded mock shortlists
Should use: `shortlistsApi.list()` and `shortlistsApi.addCandidate()`

```typescript
// TODO(PROD-WIRE): Replace with actual API call
// Current (mock):
setShortlists([
  { shortlistId: 'sl-1', name: 'Mental Health Specialists', candidateCount: 5 },
]);

// Production:
const response = await shortlistsApi.list();
if (response.success && response.data) {
  setShortlists(response.data.shortlists);
}
```

### 6. Candidate Profile Preview (Credentials)
**File**: `app/candidate/profile/page.tsx`

Currently uses: `amaraCredentials` from test data
Should use: Real credentials from auth state or API

```typescript
// TODO(PROD-WIRE): Use real credentials from API
// Current (mock):
import { amaraCredentials } from '@/lib/test-data';

// Production:
// Credentials should come from the candidate's profile API or a separate credentials endpoint
```

### 7. Dev Persona Switcher (Remove for Production)
**File**: `components/portal/DevPersonaSwitcher.tsx`

The component already checks `process.env.NODE_ENV === 'development'` and won't render in production. However, for a clean production build:

```typescript
// TODO(PROD-WIRE): Consider removing this component entirely for production
// Or ensure build process strips it
```

---

## Environment Variables Needed

Add to `.env.local` or Amplify environment:

```bash
# API Gateway URL (from CDK deploy output)
NEXT_PUBLIC_API_URL=https://xxxxxxxxxx.execute-api.eu-west-2.amazonaws.com/prod

# Cognito configuration (from CDK deploy output)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-2_XXXXXXXXX
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## API Endpoints Reference

Based on `medibee-serverless-api` handlers:

| Endpoint | Method | Lambda | Purpose |
|----------|--------|--------|---------|
| `/auth/register` | POST | auth-handler | Candidate registration |
| `/auth/login` | POST | auth-handler | Candidate login |
| `/auth/verify` | POST | auth-handler | Email verification |
| `/candidates/profile` | GET/PUT | candidates-handler | Profile CRUD |
| `/candidates/credentials` | GET/POST | candidates-handler | Credential management |
| `/clients/register` | POST | clients-handler | Client registration |
| `/clients/login` | POST | clients-handler | Client login |
| `/clients/browse` | GET | clients-handler | Browse candidates |
| `/clients/shortlists` | GET/POST | clients-handler | Shortlist management |
| `/introductions/request` | POST | introductions-handler | Request introduction |

---

## Testing After Wiring

1. **Auth Flow**
   - Register new candidate
   - Verify email
   - Login
   - Check profile loads

2. **Client Flow**
   - Login as client
   - Browse candidates (verify pagination works)
   - View candidate detail
   - Request introduction (verify credit decrements)

3. **Remove Dev Bypasses**
   - Ensure DevPersonaSwitcher doesn't appear in production
   - Remove or gate any console.log statements

---

## Quick Find Commands

```bash
# Find all production wiring TODOs
grep -r "TODO(PROD-WIRE)" --include="*.tsx" --include="*.ts"

# Find mock data usage
grep -r "getTestCandidates\|getTestCandidate\|getAllPersonas\|amaraCredentials" --include="*.tsx"

# Find setTimeout mocks
grep -r "setTimeout" app/client --include="*.tsx"
```

---

*Last updated: March 2026*
