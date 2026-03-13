/**
 * Authentication Types
 *
 * Discriminated union for auth state ensures type safety.
 * State machines over boolean flags - per CLAUDE.md
 */

// ============================================
// User Types
// ============================================

export type UserType = 'candidate' | 'client' | 'admin';

export interface CandidateProfile {
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  postcode?: string;
  experienceLevel?: string;
  preferredSettings?: string[];
  professionalSummary?: string;
  rightToWork?: boolean;
  dbsStatus?: string;
  available?: boolean;
  cvUploaded?: boolean;
  status: 'pending_verification' | 'pending_review' | 'active' | 'suspended' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

export interface ClientProfile {
  clientId: string;
  organisationName: string;
  organisationType: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  billingEmail?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    postcode?: string;
  };
  cqcNumber?: string;
  status: 'pending_verification' | 'active' | 'suspended';
  createdAt: string;
  updatedAt?: string;
}

export interface AdminProfile {
  adminId: string;
  email: string;
  name: string;
  status: 'active' | 'inactive';
}

export interface Subscription {
  tier: 'bronze' | 'silver' | 'gold';
  status: 'active' | 'past_due' | 'cancelled' | 'trialing';
  creditsRemaining: number;
  currentPeriodEnd: string;
}

// ============================================
// Auth State (Discriminated Union)
// ============================================

export type AuthState =
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | {
      status: 'authenticated';
      token: string;
      userType: 'candidate';
      userId: string;
      profile: CandidateProfile;
    }
  | {
      status: 'authenticated';
      token: string;
      userType: 'client';
      userId: string;
      profile: ClientProfile;
      subscription: Subscription | null;
    }
  | {
      status: 'authenticated';
      token: string;
      userType: 'admin';
      userId: string;
      profile: AdminProfile;
    };

// ============================================
// Auth Actions
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CandidateRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ClientRegistration {
  organisationName: string;
  organisationType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  billingEmail?: string;
  password: string;
}

// ============================================
// API Response Types
// ============================================

export interface AuthResponse {
  success: boolean;
  token?: string;
  candidateId?: string;
  clientId?: string;
  adminId?: string;
  email?: string;
  error?: string;
  message?: string;
}

export interface ProfileResponse<T> {
  success: boolean;
  profile?: T;
  candidate?: T;
  client?: T;
  error?: string;
  message?: string;
}

// ============================================
// JWT Payload
// ============================================

export interface JWTPayload {
  sub: string;
  email: string;
  type: UserType;
  iss: string;
  iat: number;
  exp: number;
}

/**
 * Decode JWT payload without verification
 * (Verification is done server-side)
 */
export function decodeJWTPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Check if JWT is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWTPayload(token);
  if (!payload) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}
