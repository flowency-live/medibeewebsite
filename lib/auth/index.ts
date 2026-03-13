/**
 * Auth Module Exports
 */

export {
  AuthProvider,
  useAuth,
  isAuthenticated,
  isCandidate,
  isClient,
  isAdmin,
} from './AuthContext';

export type {
  AuthState,
  UserType,
  CandidateProfile,
  ClientProfile,
  AdminProfile,
  Subscription,
  LoginCredentials,
  CandidateRegistration,
  ClientRegistration,
} from './types';

export {
  decodeJWTPayload,
  isTokenExpired,
} from './types';
