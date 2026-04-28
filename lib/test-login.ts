/**
 * TEST LOGIN CONFIGURATION
 *
 * ============================================================================
 * PRODUCTION REMOVAL INSTRUCTIONS
 * ============================================================================
 *
 * Before go-live, remove test login functionality:
 *
 * 1. DELETE this file (lib/test-login.ts)
 *
 * 2. In lib/auth/AuthContext.tsx:
 *    - Remove devLoginAsCandidate function (lines ~403-423)
 *    - Remove devLoginAsClient function (lines ~425-445)
 *    - Remove them from the context value export
 *
 * 3. In app/candidate/login/page.tsx:
 *    - Remove the TestLoginSection component import and usage
 *
 * 4. In app/client/login/page.tsx:
 *    - Remove the TestLoginSection component import and usage
 *
 * 5. Search codebase for "TODO(PROD-WIRE)" to find any remaining test code
 *
 * ============================================================================
 */

import type { CandidateProfile, ClientProfile, Subscription } from './auth/types';

/**
 * Test Candidate - Sarah Williams
 *
 * A returning healthcare worker with 1-2 years experience.
 * Profile is pending verification (realistic new user state).
 */
export const TEST_CANDIDATE: CandidateProfile = {
  candidateId: 'CAND-TEST-001',
  email: 'sarah.williams@example.com',
  firstName: 'Sarah',
  lastName: 'Williams',
  phone: '07700 900654',
  city: 'Dorchester',
  postcode: 'DT1 1XJ',
  experienceLevel: '1-2-years',
  preferredSettings: ['care-home', 'supported-living'],
  professionalSummary:
    'Returning to healthcare after a 3-year career break to raise my family. Previous experience in residential care.',
  skills: ['Care Certificate', 'Level 2 Health & Social Care'],
  rightToWork: true,
  dbsStatus: 'pending',
  status: 'pending_verification',
  available: true,
  createdAt: '2024-03-01T10:00:00Z',
  updatedAt: '2024-03-15T14:30:00Z',
};

/**
 * Test Client - Sunrise Care Group
 *
 * A Gold-tier care home organisation with active subscription.
 */
export const TEST_CLIENT: ClientProfile = {
  clientId: 'CLIENT-TEST-001',
  organisationName: 'Sunrise Care Group',
  organisationType: 'care-home',
  contactName: 'Eleanor Hartley',
  contactEmail: 'eleanor@sunrisecare.example.com',
  contactPhone: '01onal 234567',
  address: {
    city: 'Bournemouth',
    postcode: 'BH1 1AA',
  },
  status: 'active',
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-03-15T14:30:00Z',
};

export const TEST_CLIENT_SUBSCRIPTION: Subscription = {
  tier: 'gold',
  status: 'active',
  creditsRemaining: 25,
  currentPeriodEnd: '2024-04-01',
};

/**
 * Check if test login should be available.
 * Returns true in development, false in production.
 */
export function isTestLoginEnabled(): boolean {
  // In production builds, this should return false
  // For now, always return true during development
  return process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ENABLE_TEST_LOGIN === 'true';
}
