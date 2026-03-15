/**
 * API Client
 *
 * Centralized HTTP client for all API calls.
 * Handles authentication, error handling, and response parsing.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.medibee.opstack.uk';

// ============================================
// Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: unknown;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  status: number;
  details?: unknown;
}

// ============================================
// Token Management
// ============================================

const TOKEN_KEY = 'medibee_token';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  // Also set as cookie for middleware auth checks
  // Max-Age: 90 days (same as JWT expiry for candidates/clients, 8 hours for admin)
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${90 * 24 * 60 * 60}; SameSite=Lax`;
}

export function clearStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  // Also clear the cookie
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

// ============================================
// API Client Class
// ============================================

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make HTTP request with proper error handling
   */
  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    options: {
      body?: unknown;
      token?: string | null;
      headers?: Record<string, string>;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { body, token, headers: customHeaders } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    // Add auth header if token provided or stored
    const authToken = token ?? getStoredToken();
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (body && (method === 'POST' || method === 'PATCH')) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${path}`, config);

      let data: ApiResponse<T>;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response
        data = {
          success: false,
          error: 'PARSE_ERROR',
          message: 'Failed to parse response',
        };
      }

      if (!response.ok) {
        return {
          success: false,
          error: data.error ?? 'REQUEST_FAILED',
          message: data.message ?? `Request failed with status ${response.status}`,
          details: data.details,
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      // Network error
      return {
        success: false,
        error: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Network request failed',
      };
    }
  }

  // ============================================
  // HTTP Methods
  // ============================================

  async get<T>(path: string, token?: string | null): Promise<ApiResponse<T>> {
    return this.request<T>('GET', path, { token });
  }

  async post<T>(path: string, body?: unknown, token?: string | null): Promise<ApiResponse<T>> {
    return this.request<T>('POST', path, { body, token });
  }

  async patch<T>(path: string, body: unknown, token?: string | null): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', path, { body, token });
  }

  async delete<T>(path: string, token?: string | null): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', path, { token });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// ============================================
// Type-safe API functions
// ============================================

// Auth - Candidate
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => apiClient.post('/auth/register', data),

  verifyEmail: (data: { email: string; token: string }) =>
    apiClient.post('/auth/verify-email', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<{ token: string; candidateId: string }>('/auth/login', data),

  logout: () => apiClient.post('/auth/logout'),

  forgotPassword: (data: { email: string }) =>
    apiClient.post('/auth/forgot-password', data),

  resetPassword: (data: { email: string; token: string; password: string }) =>
    apiClient.post('/auth/reset-password', data),
};

// Candidates
export const candidatesApi = {
  getProfile: () =>
    apiClient.get<{ candidate: unknown }>('/candidates/me'),

  updateProfile: (data: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    postcode: string;
    experienceLevel: string;
    preferredSettings: string[];
    professionalSummary: string;
    rightToWork: boolean;
    dbsStatus: string;
  }>) => apiClient.patch('/candidates/me', data),

  updateAvailability: (data: { available: boolean }) =>
    apiClient.patch('/candidates/me/availability', data),

  deleteAccount: () => apiClient.delete('/candidates/me'),
};

// Uploads
export const uploadsApi = {
  getPresignedUrl: (data: { fileName: string; contentType: string }) =>
    apiClient.post<{ uploadUrl: string; key: string }>('/uploads/cv/presigned-url', data),

  confirmUpload: (data: { key: string }) =>
    apiClient.post('/uploads/cv/confirm', data),
};

// Clients
export const clientsApi = {
  register: (data: {
    organisationName: string;
    organisationType: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    billingEmail?: string;
    password: string;
  }) => apiClient.post('/clients/register', data),

  verifyEmail: (data: { email: string; token: string }) =>
    apiClient.post('/clients/verify-email', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<{ token: string; clientId: string }>('/clients/login', data),

  logout: () => apiClient.post('/clients/logout'),

  getProfile: () =>
    apiClient.get<{ client: unknown }>('/clients/me'),

  updateProfile: (data: Partial<{
    organisationName: string;
    contactName: string;
    contactPhone: string;
    billingEmail: string;
    address: {
      line1?: string;
      line2?: string;
      city?: string;
      postcode?: string;
    };
    cqcNumber: string;
  }>) => apiClient.patch('/clients/me', data),

  deleteAccount: () => apiClient.delete('/clients/me'),

  forgotPassword: (data: { email: string }) =>
    apiClient.post('/clients/forgot-password', data),

  resetPassword: (data: { email: string; token: string; password: string }) =>
    apiClient.post('/clients/reset-password', data),
};

// Subscriptions
export const subscriptionsApi = {
  getSubscription: () =>
    apiClient.get<{ subscription: unknown }>('/subscriptions/me'),

  createCheckout: (data: { tier: 'bronze' | 'silver' | 'gold' }) =>
    apiClient.post<{ checkoutUrl: string }>('/subscriptions/checkout', data),

  getBillingPortal: () =>
    apiClient.get<{ portalUrl: string }>('/subscriptions/portal'),
};

// Matching (for clients browsing candidates)
export const matchingApi = {
  browseCandidates: (params: {
    location?: string;
    experienceLevel?: string;
    settings?: string;
    available?: boolean;
    cursor?: string;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const query = searchParams.toString();
    return apiClient.get<{ candidates: unknown[]; cursor?: string }>(
      `/candidates${query ? `?${query}` : ''}`
    );
  },

  getCandidate: (candidateId: string) =>
    apiClient.get<{ candidate: unknown }>(`/candidates/${candidateId}`),
};

// Shortlists
export const shortlistsApi = {
  list: () =>
    apiClient.get<{ shortlists: unknown[] }>('/shortlists'),

  create: (data: { name: string }) =>
    apiClient.post<{ shortlist: unknown }>('/shortlists', data),

  get: (shortlistId: string) =>
    apiClient.get<{ shortlist: unknown }>(`/shortlists/${shortlistId}`),

  delete: (shortlistId: string) =>
    apiClient.delete(`/shortlists/${shortlistId}`),

  addCandidate: (shortlistId: string, candidateId: string) =>
    apiClient.post(`/shortlists/${shortlistId}/candidates`, { candidateId }),

  removeCandidate: (shortlistId: string, candidateId: string) =>
    apiClient.delete(`/shortlists/${shortlistId}/candidates/${candidateId}`),
};

// Contacts
export const contactsApi = {
  list: () =>
    apiClient.get<{ contacts: unknown[] }>('/contacts'),

  get: (contactId: string) =>
    apiClient.get<{ contact: unknown }>(`/contacts/${contactId}`),

  request: (data: { candidateId: string; message: string }) =>
    apiClient.post<{ contactId: string; creditsRemaining: number }>('/contacts', data),
};

// Admin
export const adminApi = {
  login: (data: { email: string; password: string }) =>
    apiClient.post<{ token: string; adminId: string }>('/admin/login', data),

  // Candidates
  listCandidates: (params?: { status?: string; limit?: number; cursor?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiClient.get<{ candidates: unknown[]; cursor?: string }>(
      `/admin/candidates${query ? `?${query}` : ''}`
    );
  },

  getCandidate: (candidateId: string) =>
    apiClient.get<{ candidate: unknown }>(`/admin/candidates/${candidateId}`),

  approveCandidate: (candidateId: string) =>
    apiClient.post(`/admin/candidates/${candidateId}/approve`),

  rejectCandidate: (candidateId: string, reason: string) =>
    apiClient.post(`/admin/candidates/${candidateId}/reject`, { reason }),

  suspendCandidate: (candidateId: string, reason: string) =>
    apiClient.post(`/admin/candidates/${candidateId}/suspend`, { reason }),

  reinstateCandidate: (candidateId: string) =>
    apiClient.post(`/admin/candidates/${candidateId}/reinstate`),

  // Clients
  listClients: (params?: { status?: string; limit?: number; cursor?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiClient.get<{ clients: unknown[]; cursor?: string }>(
      `/admin/clients${query ? `?${query}` : ''}`
    );
  },

  getClient: (clientId: string) =>
    apiClient.get<{ client: unknown }>(`/admin/clients/${clientId}`),

  suspendClient: (clientId: string, reason: string) =>
    apiClient.post(`/admin/clients/${clientId}/suspend`, { reason }),

  reinstateClient: (clientId: string) =>
    apiClient.post(`/admin/clients/${clientId}/reinstate`),

  // Contacts
  listContacts: (params?: { status?: string; limit?: number; cursor?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiClient.get<{ contacts: unknown[]; cursor?: string }>(
      `/admin/contacts${query ? `?${query}` : ''}`
    );
  },

  getContact: (contactId: string) =>
    apiClient.get<{ contact: unknown }>(`/admin/contacts/${contactId}`),

  resolveContact: (contactId: string, status: string, notes?: string) =>
    apiClient.post(`/admin/contacts/${contactId}/resolve`, { status, notes }),

  // Analytics
  getAnalytics: (params?: { startDate?: string; endDate?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiClient.get<{ metrics: unknown }>(`/admin/analytics${query ? `?${query}` : ''}`);
  },

  exportAnalytics: (params: { format: 'csv' | 'json'; entity?: string }) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    return apiClient.get<unknown>(`/admin/analytics/export?${searchParams.toString()}`);
  },
};
