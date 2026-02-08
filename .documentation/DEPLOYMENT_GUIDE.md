# Medibee-Website - Deployment Guide

> AWS Amplify deployment for Next.js static marketing site

---

## Overview

Medibee-Website deploys to AWS Amplify as a static Next.js site, following the same pattern as DorsetTransferCompany-Website.

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Git Push      │ ───▶ │  Amplify Build  │ ───▶ │  CloudFront     │
│   (main)        │      │  (Next.js)      │      │  Distribution   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                                          │
                                                          ▼
                                                  ┌─────────────────┐
                                                  │  medibee.co.uk  │
                                                  └─────────────────┘
```

---

## Prerequisites

### AWS Account

- Account ID: 771551874768 (shared with RelayPlatform/PulsePlatform)
- Region: eu-west-2 (London)
- Amplify access configured

### Domain

- Primary: medibee.co.uk
- WWW redirect: www.medibee.co.uk → medibee.co.uk
- DNS: Managed at registrar or Route 53

### Repository

- GitHub repository created
- Connected to AWS Amplify
- Branch: `main` for production

---

## Initial Setup

### 1. Create Amplify App

```bash
# Via AWS Console or CLI
aws amplify create-app \
  --name Medibee-Website \
  --repository https://github.com/your-org/Medibee-Website \
  --platform WEB \
  --region eu-west-2
```

### 2. Connect Branch

```bash
aws amplify create-branch \
  --app-id YOUR_APP_ID \
  --branch-name main \
  --stage PRODUCTION \
  --enable-auto-build
```

### 3. Configure Build Settings

The `amplify.yml` in the repository root:

```yaml
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

### 4. Environment Variables

Set in Amplify Console → App settings → Environment variables:

| Variable | Value | Branch |
|----------|-------|--------|
| NEXT_PUBLIC_SITE_URL | https://medibee.co.uk | main |
| EMAIL_RECIPIENT | hello@medibee.co.uk | main |

---

## Custom Domain Setup

### 1. Add Domain in Amplify

Amplify Console → App settings → Domain management → Add domain

- Domain: medibee.co.uk
- Subdomains:
  - medibee.co.uk → main branch
  - www.medibee.co.uk → redirect to medibee.co.uk

### 2. DNS Configuration

Add these records at your DNS provider:

```
# CNAME for Amplify
medibee.co.uk    CNAME    d1234567890.cloudfront.net

# OR if using apex domain with Route 53
medibee.co.uk    A        ALIAS to Amplify distribution
```

### 3. SSL Certificate

Amplify automatically provisions SSL certificate via AWS Certificate Manager:

1. Amplify requests certificate
2. DNS validation records added automatically (if Route 53)
3. Or manually add CNAME validation records
4. Wait for validation (can take up to 48 hours)

---

## Deployment Process

### Automatic Deployment

Every push to `main` triggers automatic deployment:

1. GitHub webhook triggers Amplify
2. Amplify pulls latest code
3. Runs `npm ci` (clean install)
4. Runs `npm run build` (Next.js build)
5. Deploys to CloudFront
6. Invalidates CDN cache

### Manual Deployment

If needed, trigger from Amplify Console or CLI:

```bash
aws amplify start-deployment \
  --app-id YOUR_APP_ID \
  --branch-name main \
  --source-url https://github.com/your-org/Medibee-Website \
  --source-url-type BRANCH
```

### Deployment Verification

After deployment completes:

1. Check Amplify Console for build status
2. Visit https://medibee.co.uk
3. Test all pages load correctly
4. Test contact forms submit successfully
5. Check mobile responsive layout
6. Verify SSL certificate is valid

---

## Form Handling (Day-1)

Day-1 uses a simple approach for contact form submissions:

### Option A: Next.js API Route + SES

```typescript
// app/api/enquiry/route.ts
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'eu-west-2' });

export async function POST(request: Request) {
  const body = await request.json();

  const command = new SendEmailCommand({
    Source: 'noreply@opstack.uk',  // Verified SES domain
    Destination: {
      ToAddresses: ['hello@medibee.co.uk'],
    },
    Message: {
      Subject: {
        Data: `New ${body.type} enquiry from ${body.data.email}`,
      },
      Body: {
        Text: {
          Data: formatEnquiry(body),
        },
      },
    },
  });

  await ses.send(command);

  return Response.json({ success: true });
}
```

### Option B: Third-Party Form Service

Use a service like Formspree, Netlify Forms, or Basin:

```typescript
// lib/services/formApi.ts
export async function submitEnquiry(
  type: 'care-provider' | 'hca',
  data: FormData
): Promise<SubmitResult> {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, ...data }),
  });

  return { success: response.ok };
}
```

---

## Monitoring

### Build Notifications

Configure in Amplify Console → App settings → Notifications:

- Email on build success/failure
- Slack integration (optional)

### CloudWatch Logs

- Build logs: AWS CloudWatch → /aws/amplify/YOUR_APP_ID
- Access logs: CloudFront distribution logs (if enabled)

### Uptime Monitoring

Recommended: Set up external monitoring (e.g., Better Uptime, UptimeRobot):

- Monitor: https://medibee.co.uk
- Check interval: 5 minutes
- Alert channels: Email, Slack

---

## Rollback Procedure

If a deployment causes issues:

### Via Amplify Console

1. Go to Amplify Console → App → Deployments
2. Find last known good deployment
3. Click "Redeploy this version"

### Via CLI

```bash
# List deployments
aws amplify list-artifacts \
  --app-id YOUR_APP_ID \
  --branch-name main

# Redeploy specific version
aws amplify start-deployment \
  --app-id YOUR_APP_ID \
  --branch-name main \
  --job-id PREVIOUS_JOB_ID
```

---

## Future: PulsePlatform Integration

When PulsePlatform Enquiries context is ready:

### 1. Update Form API

```typescript
// lib/services/formApi.ts
const PULSE_API = 'https://pulse.api.opstack.uk';
const TENANT_ID = 'TENANT#MEDIBEE';

export async function submitEnquiry(
  type: 'care-provider' | 'hca',
  data: FormData
): Promise<SubmitResult> {
  const response = await fetch(`${PULSE_API}/v1/enquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Id': TENANT_ID,
    },
    body: JSON.stringify({ type, ...data }),
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  return response.json();
}
```

### 2. Add Environment Variable

In Amplify Console:

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_PULSE_API_URL | https://pulse.api.opstack.uk |

### 3. Verify CORS

Ensure PulsePlatform has domain mapping:

```javascript
// In pulse-tenants-dev DynamoDB table
{
  PK: 'DOMAIN#medibee.co.uk',
  SK: 'TENANT',
  tenantId: 'TENANT#MEDIBEE'
}
```

---

## Troubleshooting

### Build Fails

**Check Amplify build logs:**
1. Amplify Console → App → Build logs
2. Look for npm errors, TypeScript errors, etc.

**Common issues:**
- Missing dependencies: Run `npm ci` locally
- TypeScript errors: Run `npm run build` locally
- Environment variables: Verify all required vars are set

### Domain Not Working

**Check DNS propagation:**
```bash
dig medibee.co.uk
nslookup medibee.co.uk
```

**Check SSL:**
```bash
curl -I https://medibee.co.uk
```

**Verify Amplify domain status:**
- Amplify Console → Domain management
- Status should be "Available"

### Forms Not Submitting

**Check browser console for errors**

**Verify API route:**
```bash
curl -X POST https://medibee.co.uk/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"type":"hca","data":{"email":"test@test.com"}}'
```

**Check SES sending limits:**
- AWS Console → SES → Sending statistics

---

## Security Checklist

- [ ] HTTPS enforced (Amplify default)
- [ ] Security headers configured
- [ ] Form validation on client AND server
- [ ] Email addresses not exposed in client code
- [ ] No sensitive data in repository
- [ ] Rate limiting on form submissions

---

## Related Documentation

- [Project Guidelines](../.claude/CLAUDE.md)
- [PRD](./medibee_recruitment_ltd_website_prd_day_1.md)
- [Brand Guide](./medibee_recruitment_ltd_website_style_brand_guide.md)
- [DorsetTransferCompany Amplify Config](../../DorsetTransferCompany-Website/amplify.yml) - Reference

---

*Last Updated: February 2026*
