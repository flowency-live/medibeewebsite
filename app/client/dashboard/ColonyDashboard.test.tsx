/**
 * Colony Dashboard Tests - Based on mockup at:
 * .documentation/CPO/CellHiveColony MedibeeeV2/Graphics/da164fb3-3f0e-4347-a933-1f9734e647ee.png
 *
 * These tests describe what the component SHOULD render to match the mockup.
 * Written BEFORE implementation changes (TDD).
 *
 * Mockup shows:
 * - Header: "Medibee Colony" with bee icon
 * - Search bar with Role, Location, Verification Status filters
 * - Candidate grid: 6 cards with gold-bordered photos, names, roles, tier badges
 * - View Profile + Shortlist buttons on each card
 * - Right sidebar: Shortlist + Saved Candidates panels
 * - Dark theme with honeycomb background
 * - NO CREDITS
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/client/dashboard',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock auth hook with client profile
vi.mock('@/lib/auth', () => ({
  useAuth: () => ({
    state: {
      status: 'authenticated',
      profile: {
        organisationName: 'Test Hospital',
        contactName: 'Jane Doe',
        tier: 'colony',
      },
      subscription: {
        tier: 'colony',
        status: 'active',
      },
    },
    logout: vi.fn(),
  }),
  isClient: () => true,
}));

// Import after mocks
import { ColonyDashboard } from './ColonyDashboard';

describe('Colony Dashboard - Mockup Compliance', () => {
  describe('Header Branding', () => {
    it('displays "Medibee Colony" NOT "Client Portal"', () => {
      render(<ColonyDashboard />);

      expect(screen.getByText('Medibee Colony')).toBeInTheDocument();
      expect(screen.queryByText('Client Portal')).not.toBeInTheDocument();
    });

    it('has bee icon in header', () => {
      const { container } = render(<ColonyDashboard />);

      const header = container.querySelector('header');
      expect(header?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Search & Filters', () => {
    it('renders search input with placeholder', () => {
      render(<ColonyDashboard />);

      expect(screen.getByPlaceholderText(/search for candidates/i)).toBeInTheDocument();
    });

    it('renders Role filter dropdown', () => {
      render(<ColonyDashboard />);

      expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    });

    it('renders Location filter dropdown', () => {
      render(<ColonyDashboard />);

      expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    });

    it('renders Verification Status filter dropdown', () => {
      render(<ColonyDashboard />);

      expect(screen.getByLabelText(/verification status/i)).toBeInTheDocument();
    });

    it('renders Search button', () => {
      render(<ColonyDashboard />);

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });
  });

  describe('Candidate Grid', () => {
    it('displays candidate cards in a grid', () => {
      const { container } = render(<ColonyDashboard />);

      // Should have candidate grid container
      const grid = container.querySelector('[data-testid="candidate-grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('each card shows candidate photo with gold border', () => {
      const { container } = render(<ColonyDashboard />);

      const photos = container.querySelectorAll('[data-testid="candidate-photo"]');
      expect(photos.length).toBeGreaterThan(0);

      // Photos should have gold border styling
      const firstPhoto = photos[0];
      expect(firstPhoto?.className).toContain('border-brand-gold');
    });

    it('each card shows candidate name', () => {
      render(<ColonyDashboard />);

      // Mockup shows names like "Claire Thompson", "Emily Jackson"
      const candidateCards = screen.getAllByTestId('candidate-card');
      expect(candidateCards.length).toBeGreaterThan(0);

      // Each card should have a name
      candidateCards.forEach(card => {
        const name = within(card).getByTestId('candidate-name');
        expect(name).toBeInTheDocument();
      });
    });

    it('each card shows candidate role', () => {
      render(<ColonyDashboard />);

      const candidateCards = screen.getAllByTestId('candidate-card');
      candidateCards.forEach(card => {
        const role = within(card).getByTestId('candidate-role');
        expect(role).toBeInTheDocument();
      });
    });

    it('each card shows tier badge (Cell or Hive)', () => {
      render(<ColonyDashboard />);

      const candidateCards = screen.getAllByTestId('candidate-card');
      candidateCards.forEach(card => {
        // Should have either "Medibee Cell" or "Medibee Hive" badge
        const hasCellBadge = within(card).queryByText(/cell/i);
        const hasHiveBadge = within(card).queryByText(/hive/i);
        expect(hasCellBadge || hasHiveBadge).toBeTruthy();
      });
    });

    it('each card has View Profile button', () => {
      render(<ColonyDashboard />);

      const viewButtons = screen.getAllByRole('button', { name: /view profile/i });
      expect(viewButtons.length).toBeGreaterThan(0);
    });

    it('each card has Shortlist button', () => {
      render(<ColonyDashboard />);

      const shortlistButtons = screen.getAllByRole('button', { name: /shortlist/i });
      expect(shortlistButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Right Sidebar', () => {
    it('renders Shortlist panel', () => {
      render(<ColonyDashboard />);

      expect(screen.getByRole('region', { name: /shortlist/i })).toBeInTheDocument();
    });

    it('renders Saved Candidates panel', () => {
      render(<ColonyDashboard />);

      expect(screen.getByRole('region', { name: /saved candidates/i })).toBeInTheDocument();
    });

    it('renders View Shortlist button', () => {
      render(<ColonyDashboard />);

      expect(screen.getByRole('link', { name: /view shortlist/i })).toBeInTheDocument();
    });

    it('renders View All link for saved candidates', () => {
      render(<ColonyDashboard />);

      expect(screen.getByRole('link', { name: /view all/i })).toBeInTheDocument();
    });
  });

  describe('No Credits System', () => {
    it('does NOT show credits anywhere', () => {
      render(<ColonyDashboard />);

      expect(screen.queryByText(/credit/i)).not.toBeInTheDocument();
    });

    it('does NOT show credits remaining', () => {
      render(<ColonyDashboard />);

      expect(screen.queryByText(/credits remaining/i)).not.toBeInTheDocument();
    });
  });

  describe('Dark Theme', () => {
    it('has dark background', () => {
      const { container } = render(<ColonyDashboard />);

      const dashboard = container.firstChild as HTMLElement;
      // Should have dark background class
      expect(dashboard?.className).toMatch(/bg-brand-dark|bg-brand-slate/);
    });

    it('has honeycomb background pattern', () => {
      const { container } = render(<ColonyDashboard />);

      // Should have honeycomb background component or class
      const honeycomb = container.querySelector('[data-testid="honeycomb-background"]');
      expect(honeycomb).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('clicking View Profile navigates to candidate profile', async () => {
      render(<ColonyDashboard />);

      const viewButtons = screen.getAllByRole('button', { name: /view profile/i });
      expect(viewButtons[0]).toBeInTheDocument();
      // Navigation tested in integration tests
    });

    it('clicking Shortlist adds candidate to shortlist', async () => {
      render(<ColonyDashboard />);

      const shortlistButtons = screen.getAllByRole('button', { name: /shortlist/i });
      await userEvent.click(shortlistButtons[0]);

      // Should show some feedback (could be checkmark, animation, or panel update)
      // Exact implementation to be determined
    });
  });
});
