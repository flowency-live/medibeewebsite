# MEDIBEE TECHNICAL ARCHITECTURE
## Cell / Hive / Colony - DDD, TDD, Hexagonal Architecture

**Document Owner:** CTO
**Date:** 22 March 2026
**Version:** 1.0
**Status:** READY FOR DEVELOPMENT

---

# 1. ARCHITECTURE PRINCIPLES

This implementation follows CLAUDE.md mandatory standards:

| Principle | Implementation |
|-----------|----------------|
| **TDD** | All code written in response to failing tests |
| **DDD** | Bounded contexts, ubiquitous language, value objects |
| **Hexagonal** | Ports and adapters, infrastructure at edges |
| **Immutability** | All domain entities are immutable |
| **Validation** | Zod schemas at all boundaries |
| **No Escape Hatches** | No `as`, `!`, `any`, or `@ts-ignore` |

---

# 2. BOUNDED CONTEXTS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MEDIBEE BOUNDED CONTEXTS                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │   MEMBERSHIP    │  │      VAULT      │  │   VERIFICATION  │             │
│  │    CONTEXT      │  │    CONTEXT      │  │    CONTEXT      │             │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤             │
│  │ • Cell          │  │ • VaultDocument │  │ • VerificationPack│            │
│  │ • Hive          │  │ • DocumentCategory│ │ • PackStatus    │             │
│  │ • Colony        │  │ • DocumentStatus│  │ • ReviewWorkflow│             │
│  │ • Membership    │  │ • StoragePolicy │  │ • Badge         │             │
│  │ • Subscription  │  │                 │  │ • BadgeExpiry   │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│         │                    │                    │                         │
│         └────────────────────┼────────────────────┘                         │
│                              │                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │    PASSPORT     │  │     PROFILE     │  │     COLONY      │             │
│  │    CONTEXT      │  │    CONTEXT      │  │    CONTEXT      │             │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤             │
│  │ • Passport      │  │ • CandidateProfile│ │ • ColonyProfile │             │
│  │ • PublicView    │  │ • WorkHistory   │  │ • Shortlist     │             │
│  │ • QRCode        │  │ • Skills        │  │ • Search        │             │
│  │ • BadgeSummary  │  │ • ProfileStatus │  │ • Contact       │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                              │
│  ┌─────────────────┐                                                        │
│  │   SHARED KERNEL │ ← Used by all contexts                                │
│  ├─────────────────┤                                                        │
│  │ • UserId        │                                                        │
│  │ • TenantId      │                                                        │
│  │ • Money         │                                                        │
│  │ • Email         │                                                        │
│  │ • Phone         │                                                        │
│  └─────────────────┘                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 3. HEXAGONAL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HEXAGONAL ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DRIVING ADAPTERS (Input)              DRIVEN ADAPTERS (Output)             │
│  ────────────────────────              ─────────────────────────            │
│                                                                              │
│  ┌─────────────┐                                      ┌─────────────┐       │
│  │ API Gateway │                                      │  DynamoDB   │       │
│  │  Handler    │─────┐                         ┌──────│  Adapter    │       │
│  └─────────────┘     │                         │      └─────────────┘       │
│                      │                         │                            │
│  ┌─────────────┐     │   ┌───────────────┐    │      ┌─────────────┐       │
│  │   Stripe    │     │   │               │    │      │     S3      │       │
│  │  Webhook    │─────┼──▶│    DOMAIN     │◀───┼──────│   Adapter   │       │
│  └─────────────┘     │   │    (CORE)     │    │      └─────────────┘       │
│                      │   │               │    │                            │
│  ┌─────────────┐     │   │  • Entities   │    │      ┌─────────────┐       │
│  │  Cognito    │     │   │  • Services   │    │      │   Stripe    │       │
│  │   Events    │─────┘   │  • Ports      │    └──────│  Adapter    │       │
│  └─────────────┘         └───────────────┘           └─────────────┘       │
│                                 │                                           │
│                                 │                    ┌─────────────┐       │
│                                 │                    │  Cognito    │       │
│                                 └────────────────────│  Adapter    │       │
│                                                      └─────────────┘       │
│                                                                              │
│                                                      ┌─────────────┐       │
│                                                      │Verification │       │
│                                                      │  Partner    │       │
│                                                      │  Adapter    │       │
│                                                      └─────────────┘       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 4. DOMAIN LAYER (Core)

## 4.1 Value Objects

All value objects are immutable and self-validating.

```typescript
// domain/shared/value-objects/UserId.ts
import { z } from 'zod';

const UserIdSchema = z.string().uuid();
type UserIdBrand = string & { readonly _brand: 'UserId' };

export class UserId {
  private constructor(private readonly value: UserIdBrand) {}

  static create(value: string): UserId {
    const validated = UserIdSchema.parse(value);
    return new UserId(validated as UserIdBrand);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}

// domain/shared/value-objects/Email.ts
const EmailSchema = z.string().email();
type EmailBrand = string & { readonly _brand: 'Email' };

export class Email {
  private constructor(private readonly value: EmailBrand) {}

  static create(value: string): Email {
    const validated = EmailSchema.parse(value);
    return new Email(validated.toLowerCase() as EmailBrand);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

// domain/shared/value-objects/Money.ts
const PenceSchema = z.number().int().nonnegative();
type Pence = number & { readonly _brand: 'Pence' };

export class Money {
  private constructor(
    private readonly amount: Pence,
    private readonly currency: 'GBP'
  ) {}

  static fromPence(pence: number): Money {
    const validated = PenceSchema.parse(pence);
    return new Money(validated as Pence, 'GBP');
  }

  static fromPounds(pounds: number): Money {
    const pence = Math.round(pounds * 100);
    return Money.fromPence(pence);
  }

  toPence(): number {
    return this.amount;
  }

  toPounds(): number {
    return this.amount / 100;
  }

  add(other: Money): Money {
    return Money.fromPence(this.amount + other.toPence());
  }

  equals(other: Money): boolean {
    return this.amount === other.toPence() && this.currency === 'GBP';
  }

  format(): string {
    return `£${this.toPounds().toFixed(2)}`;
  }
}
```

## 4.2 Membership Domain

```typescript
// domain/membership/entities/MembershipTier.ts
export type MembershipTier = 'cell' | 'hive' | 'colony';

export const MembershipTierSchema = z.enum(['cell', 'hive', 'colony']);

// domain/membership/entities/Membership.ts
export interface MembershipProps {
  readonly membershipId: string;
  readonly userId: UserId;
  readonly tier: MembershipTier;
  readonly status: MembershipStatus;
  readonly stripeSubscriptionId: string | null;
  readonly currentPeriodEnd: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type MembershipStatus = 'active' | 'past_due' | 'cancelled' | 'none';

export class Membership {
  private constructor(private readonly props: MembershipProps) {
    Object.freeze(this.props);
  }

  static create(props: MembershipProps): Membership {
    // Validate invariants
    if (props.tier === 'cell' && props.stripeSubscriptionId !== null) {
      throw new Error('Cell tier cannot have subscription');
    }
    if ((props.tier === 'hive' || props.tier === 'colony') &&
        props.status === 'active' &&
        props.stripeSubscriptionId === null) {
      throw new Error('Paid tier requires subscription when active');
    }
    return new Membership(props);
  }

  get membershipId(): string { return this.props.membershipId; }
  get userId(): UserId { return this.props.userId; }
  get tier(): MembershipTier { return this.props.tier; }
  get status(): MembershipStatus { return this.props.status; }
  get isActive(): boolean { return this.props.status === 'active'; }
  get isPaid(): boolean { return this.props.tier !== 'cell'; }

  canAccessVault(): boolean {
    return this.props.tier === 'hive' && this.isActive;
  }

  canAccessPassport(): boolean {
    return this.props.tier === 'hive' && this.isActive;
  }

  canSearchCandidates(): boolean {
    return this.props.tier === 'colony' && this.isActive;
  }

  // Immutable update - returns new instance
  upgradeTo(newTier: MembershipTier, subscriptionId: string): Membership {
    if (newTier === 'cell') {
      throw new Error('Cannot upgrade to Cell');
    }
    return Membership.create({
      ...this.props,
      tier: newTier,
      status: 'active',
      stripeSubscriptionId: subscriptionId,
      updatedAt: new Date(),
    });
  }

  downgradeToCell(): Membership {
    return Membership.create({
      ...this.props,
      tier: 'cell',
      status: 'none',
      stripeSubscriptionId: null,
      currentPeriodEnd: null,
      updatedAt: new Date(),
    });
  }
}
```

## 4.3 Domain Services

```typescript
// domain/membership/services/MembershipService.ts
import { MembershipRepository } from '../ports/MembershipRepository';
import { PaymentGateway } from '../ports/PaymentGateway';

export class MembershipService {
  constructor(
    private readonly membershipRepo: MembershipRepository,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async upgradeToHive(userId: UserId): Promise<Membership> {
    const membership = await this.membershipRepo.findByUserId(userId);
    if (!membership) {
      throw new Error('Membership not found');
    }
    if (membership.tier !== 'cell') {
      throw new Error('Can only upgrade from Cell');
    }

    // Create subscription via payment gateway port
    const subscription = await this.paymentGateway.createSubscription(
      userId,
      'HIVE_MONTHLY',
    );

    const upgraded = membership.upgradeTo('hive', subscription.id);
    await this.membershipRepo.save(upgraded);

    return upgraded;
  }

  async handleSubscriptionCancelled(subscriptionId: string): Promise<void> {
    const membership = await this.membershipRepo.findBySubscriptionId(subscriptionId);
    if (!membership) {
      throw new Error('Membership not found for subscription');
    }

    const downgraded = membership.downgradeToCell();
    await this.membershipRepo.save(downgraded);
  }
}
```

## 4.4 Ports (Interfaces)

```typescript
// domain/membership/ports/MembershipRepository.ts
export interface MembershipRepository {
  findById(id: string): Promise<Membership | null>;
  findByUserId(userId: UserId): Promise<Membership | null>;
  findBySubscriptionId(subscriptionId: string): Promise<Membership | null>;
  save(membership: Membership): Promise<void>;
}

// domain/membership/ports/PaymentGateway.ts
export interface PaymentGateway {
  createSubscription(userId: UserId, productId: string): Promise<Subscription>;
  cancelSubscription(subscriptionId: string): Promise<void>;
  createOneOffPayment(userId: UserId, amount: Money, productId: string): Promise<Payment>;
}

// domain/vault/ports/DocumentStorage.ts
export interface DocumentStorage {
  upload(candidateId: string, category: VaultCategory, file: File): Promise<string>;
  download(documentKey: string): Promise<Buffer>;
  delete(documentKey: string): Promise<void>;
  getSignedUrl(documentKey: string, expiresIn: number): Promise<string>;
}

// domain/verification/ports/VerificationPartner.ts
export interface VerificationPartner {
  submitForVerification(pack: VerificationPack): Promise<string>;
  getVerificationStatus(externalId: string): Promise<VerificationStatus>;
}
```

---

# 5. INFRASTRUCTURE LAYER (Adapters)

## 5.1 DynamoDB Adapter

```typescript
// infrastructure/dynamodb/DynamoDBMembershipRepository.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { MembershipRepository } from '../../domain/membership/ports/MembershipRepository';
import { Membership } from '../../domain/membership/entities/Membership';

export class DynamoDBMembershipRepository implements MembershipRepository {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(client: DynamoDBClient, tableName: string) {
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  async findByUserId(userId: UserId): Promise<Membership | null> {
    const result = await this.docClient.send(new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI2',
      KeyConditionExpression: 'GSI2PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId.toString()}`,
      },
    }));

    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    return this.toDomain(result.Items[0]);
  }

  async save(membership: Membership): Promise<void> {
    await this.docClient.send(new PutCommand({
      TableName: this.tableName,
      Item: this.toPersistence(membership),
    }));
  }

  private toDomain(item: Record<string, unknown>): Membership {
    // Validate with Zod schema at boundary
    const validated = MembershipPersistenceSchema.parse(item);

    return Membership.create({
      membershipId: validated.membershipId,
      userId: UserId.create(validated.userId),
      tier: validated.tier,
      status: validated.status,
      stripeSubscriptionId: validated.stripeSubscriptionId ?? null,
      currentPeriodEnd: validated.currentPeriodEnd
        ? new Date(validated.currentPeriodEnd)
        : null,
      createdAt: new Date(validated.createdAt),
      updatedAt: new Date(validated.updatedAt),
    });
  }

  private toPersistence(membership: Membership): Record<string, unknown> {
    return {
      PK: 'TENANT#MEDIBEE',
      SK: `MEMBERSHIP#${membership.membershipId}`,
      membershipId: membership.membershipId,
      userId: membership.userId.toString(),
      tier: membership.tier,
      status: membership.status,
      // ... other fields
      GSI1PK: `TIER#${membership.tier}`,
      GSI1SK: `MEMBERSHIP#${membership.membershipId}`,
      GSI2PK: `USER#${membership.userId.toString()}`,
      GSI2SK: `MEMBERSHIP#${membership.membershipId}`,
    };
  }
}
```

## 5.2 Stripe Adapter

```typescript
// infrastructure/stripe/StripePaymentGateway.ts
import Stripe from 'stripe';
import { PaymentGateway, Subscription, Payment } from '../../domain/membership/ports/PaymentGateway';
import { Money } from '../../domain/shared/value-objects/Money';
import { UserId } from '../../domain/shared/value-objects/UserId';

const PRODUCT_MAP: Record<string, string> = {
  HIVE_MONTHLY: 'price_hive_monthly_499',
  COLONY_MONTHLY: 'price_colony_monthly_4999',
  VERIFICATION_PACK: 'price_verification_pack_2900',
  FAST_TRACK: 'price_fast_track_1500',
};

export class StripePaymentGateway implements PaymentGateway {
  private readonly stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey);
  }

  async createSubscription(userId: UserId, productId: string): Promise<Subscription> {
    const priceId = PRODUCT_MAP[productId];
    if (!priceId) {
      throw new Error(`Unknown product: ${productId}`);
    }

    // Get or create Stripe customer
    const customerId = await this.getOrCreateCustomer(userId);

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    return {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    };
  }

  async createOneOffPayment(
    userId: UserId,
    amount: Money,
    productId: string
  ): Promise<Payment> {
    const customerId = await this.getOrCreateCustomer(userId);

    const paymentIntent = await this.stripe.paymentIntents.create({
      customer: customerId,
      amount: amount.toPence(),
      currency: 'gbp',
      metadata: { productId, userId: userId.toString() },
    });

    return {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount,
    };
  }

  private async getOrCreateCustomer(userId: UserId): Promise<string> {
    // Implementation...
  }
}
```

## 5.3 S3 Adapter

```typescript
// infrastructure/s3/S3DocumentStorage.ts
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DocumentStorage } from '../../domain/vault/ports/DocumentStorage';

export class S3DocumentStorage implements DocumentStorage {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(s3Client: S3Client, bucketName: string) {
    this.s3 = s3Client;
    this.bucketName = bucketName;
  }

  async upload(
    candidateId: string,
    category: VaultCategory,
    file: Buffer,
    contentType: string
  ): Promise<string> {
    const documentId = crypto.randomUUID();
    const key = `candidates/${candidateId}/${category}/${documentId}`;

    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
      ServerSideEncryption: 'aws:kms',
    }));

    return key;
  }

  async getSignedUrl(documentKey: string, expiresIn: number): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: documentKey,
    });

    return getSignedUrl(this.s3, command, { expiresIn });
  }
}
```

---

# 6. APPLICATION LAYER (Use Cases)

## 6.1 Use Case Structure

```typescript
// application/membership/useCases/UpgradeToHiveUseCase.ts
import { z } from 'zod';

const UpgradeToHiveInputSchema = z.object({
  userId: z.string().uuid(),
});

type UpgradeToHiveInput = z.infer<typeof UpgradeToHiveInputSchema>;

export class UpgradeToHiveUseCase {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly badgeService: BadgeService,
    private readonly passportService: PassportService,
  ) {}

  async execute(input: unknown): Promise<UpgradeResult> {
    // Validate input at boundary
    const validated = UpgradeToHiveInputSchema.parse(input);
    const userId = UserId.create(validated.userId);

    // Execute domain logic
    const membership = await this.membershipService.upgradeToHive(userId);

    // Award Hive badge
    await this.badgeService.awardMembershipBadge(userId, 'hive_member');

    // Create Passport
    const passport = await this.passportService.createPassport(userId);

    return {
      membership,
      passport,
    };
  }
}
```

---

# 7. TDD IMPLEMENTATION APPROACH

## 7.1 Test Structure per Bounded Context

```
tests/
├── unit/
│   ├── domain/
│   │   ├── membership/
│   │   │   ├── Membership.test.ts
│   │   │   ├── MembershipService.test.ts
│   │   │   └── MembershipTier.test.ts
│   │   ├── vault/
│   │   │   ├── VaultDocument.test.ts
│   │   │   └── VaultService.test.ts
│   │   ├── verification/
│   │   │   ├── VerificationPack.test.ts
│   │   │   ├── Badge.test.ts
│   │   │   └── VerificationService.test.ts
│   │   └── passport/
│   │       ├── Passport.test.ts
│   │       └── PassportService.test.ts
│   │
│   └── application/
│       ├── UpgradeToHiveUseCase.test.ts
│       ├── PurchaseVerificationPackUseCase.test.ts
│       └── CreatePassportUseCase.test.ts
│
├── integration/
│   ├── membership/
│   │   ├── membershipApi.test.ts
│   │   └── stripeWebhook.test.ts
│   ├── vault/
│   │   └── vaultApi.test.ts
│   └── verification/
│       └── verificationApi.test.ts
│
└── e2e/
    ├── hiveUpgradeFlow.test.ts
    ├── verificationPackPurchase.test.ts
    └── passportVerification.test.ts
```

## 7.2 TDD Cycle for Each Feature

**RED → GREEN → REFACTOR**

### Example: Membership Entity

**Step 1: RED - Write failing test**

```typescript
// tests/unit/domain/membership/Membership.test.ts
describe('Membership', () => {
  describe('create', () => {
    it('should create a Cell membership without subscription', () => {
      const membership = Membership.create({
        membershipId: 'mem-123',
        userId: UserId.create('user-123'),
        tier: 'cell',
        status: 'none',
        stripeSubscriptionId: null,
        currentPeriodEnd: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(membership.tier).toBe('cell');
      expect(membership.isActive).toBe(false);
      expect(membership.canAccessVault()).toBe(false);
    });

    it('should throw if Cell tier has subscription', () => {
      expect(() => Membership.create({
        membershipId: 'mem-123',
        userId: UserId.create('user-123'),
        tier: 'cell',
        status: 'active',
        stripeSubscriptionId: 'sub_123', // Should fail
        currentPeriodEnd: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })).toThrow('Cell tier cannot have subscription');
    });
  });

  describe('canAccessVault', () => {
    it('should return true for active Hive member', () => {
      const membership = createHiveMembership({ status: 'active' });
      expect(membership.canAccessVault()).toBe(true);
    });

    it('should return false for Cell member', () => {
      const membership = createCellMembership();
      expect(membership.canAccessVault()).toBe(false);
    });

    it('should return false for past_due Hive member', () => {
      const membership = createHiveMembership({ status: 'past_due' });
      expect(membership.canAccessVault()).toBe(false);
    });
  });

  describe('upgradeTo', () => {
    it('should upgrade Cell to Hive with subscription', () => {
      const cell = createCellMembership();
      const hive = cell.upgradeTo('hive', 'sub_new');

      expect(hive.tier).toBe('hive');
      expect(hive.status).toBe('active');
      // Original unchanged (immutability)
      expect(cell.tier).toBe('cell');
    });

    it('should throw if upgrading to Cell', () => {
      const hive = createHiveMembership();
      expect(() => hive.upgradeTo('cell', 'sub_123'))
        .toThrow('Cannot upgrade to Cell');
    });
  });
});

// Test factories
function createCellMembership(overrides = {}): Membership {
  return Membership.create({
    membershipId: 'mem-' + crypto.randomUUID(),
    userId: UserId.create(crypto.randomUUID()),
    tier: 'cell',
    status: 'none',
    stripeSubscriptionId: null,
    currentPeriodEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
}

function createHiveMembership(overrides = {}): Membership {
  return Membership.create({
    membershipId: 'mem-' + crypto.randomUUID(),
    userId: UserId.create(crypto.randomUUID()),
    tier: 'hive',
    status: 'active',
    stripeSubscriptionId: 'sub_' + crypto.randomUUID(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
}
```

**Step 2: GREEN - Implement minimum code to pass**

```typescript
// domain/membership/entities/Membership.ts
export class Membership {
  private constructor(private readonly props: MembershipProps) {
    Object.freeze(this.props);
  }

  static create(props: MembershipProps): Membership {
    if (props.tier === 'cell' && props.stripeSubscriptionId !== null) {
      throw new Error('Cell tier cannot have subscription');
    }
    return new Membership(props);
  }

  get tier(): MembershipTier { return this.props.tier; }
  get status(): MembershipStatus { return this.props.status; }
  get isActive(): boolean { return this.props.status === 'active'; }

  canAccessVault(): boolean {
    return this.props.tier === 'hive' && this.isActive;
  }

  upgradeTo(newTier: MembershipTier, subscriptionId: string): Membership {
    if (newTier === 'cell') {
      throw new Error('Cannot upgrade to Cell');
    }
    return Membership.create({
      ...this.props,
      tier: newTier,
      status: 'active',
      stripeSubscriptionId: subscriptionId,
      updatedAt: new Date(),
    });
  }
}
```

**Step 3: REFACTOR - Only if clear value**

After tests pass, commit. Refactor only if it improves clarity.

## 7.3 Integration Test Example

```typescript
// tests/integration/membership/membershipApi.test.ts
describe('Membership API', () => {
  describe('POST /members/upgrade', () => {
    it('should upgrade Cell to Hive and return checkout session', async () => {
      // Arrange
      const cellUser = await createTestUser('cell');
      const token = await getAuthToken(cellUser);

      // Act
      const response = await request(app)
        .post('/api/members/upgrade')
        .set('Authorization', `Bearer ${token}`)
        .send({ targetTier: 'hive' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        checkoutUrl: expect.stringContaining('checkout.stripe.com'),
        sessionId: expect.stringMatching(/^cs_/),
      });
    });

    it('should return 403 if already Hive', async () => {
      const hiveUser = await createTestUser('hive');
      const token = await getAuthToken(hiveUser);

      const response = await request(app)
        .post('/api/members/upgrade')
        .set('Authorization', `Bearer ${token}`)
        .send({ targetTier: 'hive' });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Already at Hive tier');
    });
  });

  describe('Stripe Webhook: customer.subscription.deleted', () => {
    it('should downgrade Hive to Cell when subscription cancelled', async () => {
      // Arrange
      const hiveUser = await createTestUser('hive');
      const subscriptionId = hiveUser.stripeSubscriptionId;

      // Act: Simulate Stripe webhook
      const response = await request(app)
        .post('/api/webhooks/stripe')
        .set('stripe-signature', generateStripeSignature(webhookPayload))
        .send({
          type: 'customer.subscription.deleted',
          data: { object: { id: subscriptionId } },
        });

      // Assert
      expect(response.status).toBe(200);

      const membership = await getMembershipByUserId(hiveUser.userId);
      expect(membership.tier).toBe('cell');
      expect(membership.status).toBe('none');
    });
  });
});
```

---

# 8. IMPLEMENTATION PHASES (TDD-ALIGNED)

## Phase 1: Foundation (Weeks 1-3)

| Task | Tests First | Implementation |
|------|-------------|----------------|
| Value Objects | `UserId.test.ts`, `Email.test.ts`, `Money.test.ts` | Value object classes |
| Membership Entity | `Membership.test.ts` | Membership class |
| Membership Repository Port | `MembershipRepository.test.ts` (mock) | Interface definition |
| DynamoDB Adapter | `DynamoDBMembershipRepository.test.ts` | Repository implementation |
| Stripe Adapter | `StripePaymentGateway.test.ts` | Payment gateway implementation |

## Phase 2: Candidate MVP (Weeks 4-7)

| Task | Tests First | Implementation |
|------|-------------|----------------|
| Vault Document Entity | `VaultDocument.test.ts` | VaultDocument class |
| Vault Service | `VaultService.test.ts` | Upload, list, delete |
| S3 Adapter | `S3DocumentStorage.test.ts` | S3 operations |
| Badge Entity | `Badge.test.ts` | Badge class |
| Badge Service | `BadgeService.test.ts` | Award, revoke, expire |
| Passport Entity | `Passport.test.ts` | Passport class |
| Passport Service | `PassportService.test.ts` | Create, update, QR |

## Phase 3: Verification (Weeks 8-9)

| Task | Tests First | Implementation |
|------|-------------|----------------|
| VerificationPack Entity | `VerificationPack.test.ts` | VerificationPack class |
| Verification Service | `VerificationService.test.ts` | Purchase, claim, complete |
| Admin Queue | `VerificationQueueService.test.ts` | List, claim, process |

## Phase 4: Colony (Weeks 10-11)

| Task | Tests First | Implementation |
|------|-------------|----------------|
| Colony Profile Entity | `ColonyProfile.test.ts` | ColonyProfile class |
| Search Service | `SearchService.test.ts` | Filter, rank by tier |
| Shortlist Entity | `Shortlist.test.ts` | Shortlist class |
| Shortlist Service | `ShortlistService.test.ts` | Add, remove, list |

---

# 9. FOLDER STRUCTURE

```
medibee-serverless-api/
├── src/
│   ├── domain/                           # CORE (no external dependencies)
│   │   ├── shared/
│   │   │   ├── value-objects/
│   │   │   │   ├── UserId.ts
│   │   │   │   ├── Email.ts
│   │   │   │   ├── Phone.ts
│   │   │   │   └── Money.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── membership/
│   │   │   ├── entities/
│   │   │   │   ├── Membership.ts
│   │   │   │   └── MembershipTier.ts
│   │   │   ├── services/
│   │   │   │   └── MembershipService.ts
│   │   │   └── ports/
│   │   │       ├── MembershipRepository.ts
│   │   │       └── PaymentGateway.ts
│   │   │
│   │   ├── vault/
│   │   │   ├── entities/
│   │   │   │   ├── VaultDocument.ts
│   │   │   │   └── VaultCategory.ts
│   │   │   ├── services/
│   │   │   │   └── VaultService.ts
│   │   │   └── ports/
│   │   │       └── DocumentStorage.ts
│   │   │
│   │   ├── verification/
│   │   │   ├── entities/
│   │   │   │   ├── VerificationPack.ts
│   │   │   │   └── Badge.ts
│   │   │   ├── services/
│   │   │   │   └── VerificationService.ts
│   │   │   └── ports/
│   │   │       └── VerificationPartner.ts
│   │   │
│   │   └── passport/
│   │       ├── entities/
│   │       │   └── Passport.ts
│   │       └── services/
│   │           └── PassportService.ts
│   │
│   ├── application/                      # USE CASES
│   │   ├── membership/
│   │   │   ├── UpgradeToHiveUseCase.ts
│   │   │   └── HandleSubscriptionCancelledUseCase.ts
│   │   ├── vault/
│   │   │   ├── UploadDocumentUseCase.ts
│   │   │   └── ListDocumentsUseCase.ts
│   │   ├── verification/
│   │   │   ├── PurchasePackUseCase.ts
│   │   │   └── CompleteReviewUseCase.ts
│   │   └── passport/
│   │       ├── CreatePassportUseCase.ts
│   │       └── VerifyPassportUseCase.ts
│   │
│   ├── infrastructure/                   # ADAPTERS
│   │   ├── dynamodb/
│   │   │   ├── DynamoDBMembershipRepository.ts
│   │   │   ├── DynamoDBVaultDocumentRepository.ts
│   │   │   ├── DynamoDBBadgeRepository.ts
│   │   │   └── DynamoDBPassportRepository.ts
│   │   ├── s3/
│   │   │   └── S3DocumentStorage.ts
│   │   ├── stripe/
│   │   │   └── StripePaymentGateway.ts
│   │   ├── cognito/
│   │   │   └── CognitoIdentityProvider.ts
│   │   └── verification-partner/
│   │       └── ExternalVerificationAdapter.ts
│   │
│   └── handlers/                         # LAMBDA ENTRY POINTS
│       ├── membership/
│       │   ├── upgrade.ts
│       │   └── webhookStripe.ts
│       ├── vault/
│       │   ├── upload.ts
│       │   └── list.ts
│       ├── verification/
│       │   ├── purchase.ts
│       │   └── adminQueue.ts
│       └── passport/
│           ├── get.ts
│           └── publicVerify.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── lib/                                  # CDK INFRASTRUCTURE
    └── medibee-stack.ts
```

---

# 10. VALIDATION SCHEMAS (Boundary)

```typescript
// infrastructure/validation/schemas.ts
import { z } from 'zod';

// Membership API Schemas
export const UpgradeRequestSchema = z.object({
  targetTier: z.enum(['hive', 'colony']),
});

export const MembershipResponseSchema = z.object({
  membershipId: z.string().uuid(),
  tier: z.enum(['cell', 'hive', 'colony']),
  status: z.enum(['active', 'past_due', 'cancelled', 'none']),
  currentPeriodEnd: z.string().datetime().nullable(),
});

// Vault API Schemas
export const UploadDocumentRequestSchema = z.object({
  category: z.enum([
    'id', 'dbs', 'right-to-work', 'qualifications',
    'training', 'occupational-health', 'references',
    'cv', 'professional-registration', 'employment-history', 'other',
  ]),
  documentName: z.string().min(1).max(100),
  issueDate: z.string().date().optional(),
  expiryDate: z.string().date().optional(),
});

// Verification Pack Schemas
export const PurchasePackRequestSchema = z.object({
  packType: z.enum(['standard', 'fast_track']),
  documentIds: z.array(z.string().uuid()).min(1),
});

// Passport Public Verification Schema
export const PassportPublicResponseSchema = z.object({
  publicId: z.string(),
  candidateName: z.string(),
  profilePhoto: z.string().url().nullable(),
  membershipTier: z.literal('hive'),
  membershipStatus: z.enum(['active', 'past_due']),
  badges: z.array(z.object({
    badgeName: z.string(),
    displayName: z.string(),
    awardedAt: z.string().datetime(),
    expiresAt: z.string().datetime().nullable(),
    status: z.enum(['active', 'expired']),
  })),
  lastVerificationDate: z.string().datetime().nullable(),
  complianceStatus: z.enum(['not_ready', 'partial', 'ready']),
});
```

---

# 11. SUMMARY

This architecture ensures:

| Principle | How It's Achieved |
|-----------|-------------------|
| **TDD** | All entities, services, and use cases start with failing tests |
| **DDD** | 6 bounded contexts with clear boundaries and ubiquitous language |
| **Hexagonal** | Domain has no dependencies; infrastructure implements ports |
| **Immutability** | All entities return new instances on state change |
| **Validation** | Zod schemas at every boundary (API, webhooks, DB reads) |
| **Type Safety** | No `as`, `!`, `any`; value objects with branded types |

**Development starts with tests. No exceptions.**

---

*Document ready for engineering team. All implementation must follow TDD cycle: RED → GREEN → REFACTOR.*
