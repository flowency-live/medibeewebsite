'use client';

/**
 * Authentication Context
 *
 * Provides authentication state management for all user types.
 * Uses discriminated union for type-safe state handling.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type AuthState,
  type UserType,
  type CandidateProfile,
  type ClientProfile,
  type AdminProfile,
  type Subscription,
  type LoginCredentials,
  decodeJWTPayload,
  isTokenExpired,
} from './types';
import {
  getStoredToken,
  setStoredToken,
  clearStoredToken,
  authApi,
  clientsApi,
  adminApi,
  candidatesApi,
  subscriptionsApi,
} from '../api/client';

// ============================================
// Context Types
// ============================================

interface AuthContextValue {
  state: AuthState;

  // Candidate auth
  loginCandidate: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  registerCandidate: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<{ success: boolean; error?: string }>;

  // Client auth
  loginClient: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  registerClient: (data: {
    organisationName: string;
    organisationType: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;

  // Admin auth
  loginAdmin: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;

  // Common
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;

  // Dev-only: Test persona login bypass
  devLoginAsCandidate?: (profile: CandidateProfile) => void;
  devLoginAsClient?: (profile: ClientProfile, subscription?: Subscription) => void;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================
// Provider
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });

  // ============================================
  // Initialize auth state from stored token
  // ============================================
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getStoredToken();

      if (!token) {
        setState({ status: 'unauthenticated' });
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        clearStoredToken();
        setState({ status: 'unauthenticated' });
        return;
      }

      // Decode token to get user type
      const payload = decodeJWTPayload(token);
      if (!payload) {
        clearStoredToken();
        setState({ status: 'unauthenticated' });
        return;
      }

      // Fetch profile based on user type
      try {
        await loadProfile(token, payload.type as UserType, payload.sub);
      } catch {
        clearStoredToken();
        setState({ status: 'unauthenticated' });
      }
    };

    initializeAuth();
  }, []);

  // ============================================
  // Load profile based on user type
  // ============================================
  const loadProfile = async (token: string, userType: UserType, userId: string) => {
    switch (userType) {
      case 'candidate': {
        const response = await candidatesApi.getProfile();
        if (response.success && response.data) {
          const data = response.data as { candidate: CandidateProfile };
          setState({
            status: 'authenticated',
            token,
            userType: 'candidate',
            userId,
            profile: data.candidate,
          });
        } else {
          throw new Error('Failed to load candidate profile');
        }
        break;
      }

      case 'client': {
        const [profileResponse, subscriptionResponse] = await Promise.all([
          clientsApi.getProfile(),
          subscriptionsApi.getSubscription(),
        ]);

        if (profileResponse.success && profileResponse.data) {
          const profileData = profileResponse.data as { client: ClientProfile };
          let subscription: Subscription | null = null;

          if (subscriptionResponse.success && subscriptionResponse.data) {
            const subData = subscriptionResponse.data as { subscription: Subscription };
            subscription = subData.subscription;
          }

          setState({
            status: 'authenticated',
            token,
            userType: 'client',
            userId,
            profile: profileData.client,
            subscription,
          });
        } else {
          throw new Error('Failed to load client profile');
        }
        break;
      }

      case 'admin': {
        // Admin profile comes from the JWT payload for now
        const payload = decodeJWTPayload(token);
        if (payload) {
          setState({
            status: 'authenticated',
            token,
            userType: 'admin',
            userId,
            profile: {
              adminId: payload.sub,
              email: payload.email,
              name: payload.email.split('@')[0], // Simple fallback
              status: 'active',
            },
          });
        } else {
          throw new Error('Failed to decode admin token');
        }
        break;
      }
    }
  };

  // ============================================
  // Candidate Login
  // ============================================
  const loginCandidate = useCallback(async (credentials: LoginCredentials) => {
    setState({ status: 'loading' });

    const response = await authApi.login(credentials);

    if (!response.success || !response.data) {
      setState({ status: 'unauthenticated' });
      return {
        success: false,
        error: (response as { message?: string }).message ?? 'Login failed',
      };
    }

    const { token, candidateId } = response.data;
    setStoredToken(token);

    try {
      await loadProfile(token, 'candidate', candidateId);
      return { success: true };
    } catch (error) {
      clearStoredToken();
      setState({ status: 'unauthenticated' });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load profile',
      };
    }
  }, []);

  // ============================================
  // Candidate Registration
  // ============================================
  const registerCandidate = useCallback(async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    const response = await authApi.register(data);

    if (!response.success) {
      return {
        success: false,
        error: (response as { message?: string }).message ?? 'Registration failed',
      };
    }

    return { success: true };
  }, []);

  // ============================================
  // Client Login
  // ============================================
  const loginClient = useCallback(async (credentials: LoginCredentials) => {
    setState({ status: 'loading' });

    const response = await clientsApi.login(credentials);

    if (!response.success || !response.data) {
      setState({ status: 'unauthenticated' });
      return {
        success: false,
        error: (response as { message?: string }).message ?? 'Login failed',
      };
    }

    const { token, clientId } = response.data;
    setStoredToken(token);

    try {
      await loadProfile(token, 'client', clientId);
      return { success: true };
    } catch (error) {
      clearStoredToken();
      setState({ status: 'unauthenticated' });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load profile',
      };
    }
  }, []);

  // ============================================
  // Client Registration
  // ============================================
  const registerClient = useCallback(async (data: {
    organisationName: string;
    organisationType: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    password: string;
  }) => {
    const response = await clientsApi.register(data);

    if (!response.success) {
      return {
        success: false,
        error: (response as { message?: string }).message ?? 'Registration failed',
      };
    }

    return { success: true };
  }, []);

  // ============================================
  // Admin Login
  // ============================================
  const loginAdmin = useCallback(async (credentials: LoginCredentials) => {
    setState({ status: 'loading' });

    const response = await adminApi.login(credentials);

    if (!response.success || !response.data) {
      setState({ status: 'unauthenticated' });
      return {
        success: false,
        error: (response as { message?: string }).message ?? 'Login failed',
      };
    }

    const { token, adminId } = response.data;
    setStoredToken(token);

    try {
      await loadProfile(token, 'admin', adminId);
      return { success: true };
    } catch (error) {
      clearStoredToken();
      setState({ status: 'unauthenticated' });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load profile',
      };
    }
  }, []);

  // ============================================
  // Logout
  // ============================================
  const logout = useCallback(async () => {
    const currentState = state;

    // Call logout API based on user type
    if (currentState.status === 'authenticated') {
      try {
        switch (currentState.userType) {
          case 'candidate':
            await authApi.logout();
            break;
          case 'client':
            await clientsApi.logout();
            break;
          // Admin logout is just clearing the token
        }
      } catch {
        // Ignore logout API errors
      }
    }

    clearStoredToken();
    setState({ status: 'unauthenticated' });
  }, [state]);

  // ============================================
  // Refresh Profile
  // ============================================
  const refreshProfile = useCallback(async () => {
    if (state.status !== 'authenticated') return;

    const token = getStoredToken();
    if (!token) {
      setState({ status: 'unauthenticated' });
      return;
    }

    try {
      await loadProfile(token, state.userType, state.userId);
    } catch {
      // Keep current state on refresh failure
    }
  }, [state]);

  // ============================================
  // Dev-Only: Test Persona Login Bypass
  // ============================================
  // Enable in development OR when NEXT_PUBLIC_ENABLE_DEV_LOGIN is set
  const isDev = process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_ENABLE_DEV_LOGIN === 'true';

  const devLoginAsCandidate = useCallback((profile: CandidateProfile) => {
    if (!isDev) return;

    // Create a fake token for dev purposes
    const fakeToken = 'dev-test-token-candidate';

    setState({
      status: 'authenticated',
      token: fakeToken,
      userType: 'candidate',
      userId: profile.candidateId,
      profile,
    });
  }, [isDev]);

  const devLoginAsClient = useCallback((profile: ClientProfile, subscription?: Subscription) => {
    if (!isDev) return;

    // Create a fake token for dev purposes
    const fakeToken = 'dev-test-token-client';

    setState({
      status: 'authenticated',
      token: fakeToken,
      userType: 'client',
      userId: profile.clientId,
      profile,
      subscription: subscription ?? null,
    });
  }, [isDev]);

  // ============================================
  // Context Value
  // ============================================
  const value: AuthContextValue = {
    state,
    loginCandidate,
    registerCandidate,
    loginClient,
    registerClient,
    loginAdmin,
    logout,
    refreshProfile,
    // Only expose dev functions in development
    ...(isDev && {
      devLoginAsCandidate,
      devLoginAsClient,
    }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// Hook
// ============================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// ============================================
// Type Guards for Auth State
// ============================================

export function isAuthenticated(
  state: AuthState
): state is Extract<AuthState, { status: 'authenticated' }> {
  return state.status === 'authenticated';
}

export function isCandidate(
  state: AuthState
): state is Extract<AuthState, { status: 'authenticated'; userType: 'candidate' }> {
  return state.status === 'authenticated' && state.userType === 'candidate';
}

export function isClient(
  state: AuthState
): state is Extract<AuthState, { status: 'authenticated'; userType: 'client' }> {
  return state.status === 'authenticated' && state.userType === 'client';
}

export function isAdmin(
  state: AuthState
): state is Extract<AuthState, { status: 'authenticated'; userType: 'admin' }> {
  return state.status === 'authenticated' && state.userType === 'admin';
}
