'use client';

/**
 * DevPersonaSwitcher
 *
 * Development-only component for bypassing auth and switching between test personas.
 * Displays a floating panel that allows quick persona switching.
 *
 * IMPORTANT: This component only renders in development mode.
 */

import { useState, type ReactNode } from 'react';
import { useAuth } from '@/lib/auth';
import { personas, type PersonaData } from '@/lib/test-data';

// Test client persona
const testClientProfile = {
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
  status: 'active' as const,
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-03-15T14:30:00Z',
};

const testClientSubscription = {
  tier: 'gold' as const,
  status: 'active' as const,
  creditsRemaining: 25,
  currentPeriodEnd: '2024-04-01',
};

interface PersonaOption {
  key: string;
  type: 'candidate' | 'client';
  name: string;
  subtitle: string;
  data?: PersonaData;
}

const personaOptions: PersonaOption[] = [
  // Candidates
  {
    key: 'amara',
    type: 'candidate',
    name: 'Amara Okonkwo',
    subtitle: '5+ yrs Mental Health • Active',
    data: personas.amara,
  },
  {
    key: 'james',
    type: 'candidate',
    name: 'James Fletcher',
    subtitle: 'Newly Qualified • Pending',
    data: personas.james,
  },
  {
    key: 'priya',
    type: 'candidate',
    name: 'Priya Sharma',
    subtitle: '3-5 yrs Acute Care • Active',
    data: personas.priya,
  },
  {
    key: 'david',
    type: 'candidate',
    name: 'David Chen',
    subtitle: '5+ yrs End of Life • Active',
    data: personas.david,
  },
  {
    key: 'sarah',
    type: 'candidate',
    name: 'Sarah Williams',
    subtitle: 'Returning • Pending Verification',
    data: personas.sarah,
  },
  // Client
  {
    key: 'sunrise',
    type: 'client',
    name: 'Sunrise Care Group',
    subtitle: 'Care Home • Gold Tier',
  },
];

export function DevPersonaSwitcher(): ReactNode {
  const { state, devLoginAsCandidate, devLoginAsClient, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // TODO(PROD-WIRE): Remove this component before production launch
  // Currently enabled for demo/testing purposes

  // Check if dev login functions are available
  if (!devLoginAsCandidate || !devLoginAsClient) {
    return null;
  }

  const handleSelectPersona = async (option: PersonaOption) => {
    if (option.type === 'candidate' && option.data) {
      devLoginAsCandidate(option.data.profile);
    } else if (option.type === 'client') {
      devLoginAsClient(testClientProfile, testClientSubscription);
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Get current persona info
  const getCurrentPersona = (): string => {
    if (state.status !== 'authenticated') {
      return 'Not logged in';
    }

    if (state.userType === 'candidate') {
      return `${state.profile.firstName} ${state.profile.lastName}`;
    }

    if (state.userType === 'client') {
      return state.profile.organisationName;
    }

    if (state.userType === 'admin') {
      return `Admin: ${state.profile.email}`;
    }

    return 'Unknown';
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="
          fixed bottom-4 right-4 z-[9999]
          w-12 h-12 rounded-full
          bg-portal-highlight text-white
          shadow-card-elevated
          flex items-center justify-center
          hover:bg-portal-highlight/90
          transition-colors duration-portal
        "
        title="Open Dev Persona Switcher"
      >
        <span className="text-lg">🧪</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex items-center gap-2 px-4 py-2
            bg-portal-highlight text-white
            rounded-card shadow-card-elevated
            font-portal text-portal-meta font-medium
            hover:bg-portal-highlight/90
            transition-colors duration-portal
          "
        >
          <span>🧪</span>
          <span className="hidden sm:inline">Dev: {getCurrentPersona()}</span>
          <span className="sm:hidden">Dev</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="
            absolute -top-2 -right-2
            w-6 h-6 rounded-full
            bg-portal-graphite text-white
            text-xs flex items-center justify-center
            hover:bg-portal-graphite-muted
            transition-colors duration-portal
          "
          title="Minimize"
        >
          −
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="
          absolute bottom-full right-0 mb-2
          w-72 bg-surface-0 rounded-card-lg shadow-card-elevated
          border border-portal-stone
          overflow-hidden
          animate-scale-in
        ">
          {/* Header */}
          <div className="p-3 border-b border-portal-stone bg-portal-highlight/5">
            <div className="flex items-center justify-between">
              <span className="font-portal text-portal-meta font-medium text-portal-graphite">
                Test Persona Switcher
              </span>
              <span className="px-2 py-0.5 rounded bg-portal-alert/10 text-portal-alert font-portal text-ui-xs font-medium">
                DEV ONLY
              </span>
            </div>
            <p className="font-portal text-ui-xs text-portal-graphite-muted mt-1">
              Bypass auth with test personas
            </p>
          </div>

          {/* Candidates Section */}
          <div className="p-2">
            <p className="px-2 py-1 font-portal text-ui-xs text-portal-graphite-muted uppercase tracking-wide">
              Candidates
            </p>
            {personaOptions
              .filter((o) => o.type === 'candidate')
              .map((option) => {
                const isActive =
                  state.status === 'authenticated' &&
                  state.userType === 'candidate' &&
                  option.data?.profile.candidateId === state.profile.candidateId;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectPersona(option)}
                    className={`
                      w-full text-left px-3 py-2 rounded-card
                      transition-colors duration-portal
                      ${isActive
                        ? 'bg-portal-teal/10 border border-portal-teal'
                        : 'hover:bg-portal-stone'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${isActive ? 'bg-portal-teal text-white' : 'bg-portal-blue/10 text-portal-blue'}
                      `}>
                        <span className="font-portal text-portal-meta font-medium">
                          {option.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-portal text-portal-meta text-portal-graphite truncate">
                          {option.name}
                        </p>
                        <p className="font-portal text-ui-xs text-portal-graphite-muted truncate">
                          {option.subtitle}
                        </p>
                      </div>
                      {isActive && (
                        <span className="text-portal-teal text-sm">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Clients Section */}
          <div className="p-2 border-t border-portal-stone">
            <p className="px-2 py-1 font-portal text-ui-xs text-portal-graphite-muted uppercase tracking-wide">
              Clients
            </p>
            {personaOptions
              .filter((o) => o.type === 'client')
              .map((option) => {
                const isActive =
                  state.status === 'authenticated' &&
                  state.userType === 'client' &&
                  state.profile.clientId === testClientProfile.clientId;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectPersona(option)}
                    className={`
                      w-full text-left px-3 py-2 rounded-card
                      transition-colors duration-portal
                      ${isActive
                        ? 'bg-portal-teal/10 border border-portal-teal'
                        : 'hover:bg-portal-stone'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-card flex items-center justify-center
                        ${isActive ? 'bg-portal-teal text-white' : 'bg-portal-highlight/10 text-portal-highlight'}
                      `}>
                        <span className="text-sm">🏢</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-portal text-portal-meta text-portal-graphite truncate">
                          {option.name}
                        </p>
                        <p className="font-portal text-ui-xs text-portal-graphite-muted truncate">
                          {option.subtitle}
                        </p>
                      </div>
                      {isActive && (
                        <span className="text-portal-teal text-sm">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Logout */}
          {state.status === 'authenticated' && (
            <div className="p-2 border-t border-portal-stone">
              <button
                onClick={handleLogout}
                className="
                  w-full text-left px-3 py-2 rounded-card
                  font-portal text-portal-meta text-portal-alert
                  hover:bg-portal-alert/5
                  transition-colors duration-portal
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
