import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ColonyDashboardPreviewCard } from './ColonyDashboardPreviewCard';

describe('ColonyDashboardPreviewCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('content rendering', () => {
    it('renders the default dashboard title', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('Colony Dashboard')).toBeInTheDocument();
    });

    it('renders custom title when provided', () => {
      render(<ColonyDashboardPreviewCard title="Custom Dashboard" />);
      expect(screen.getByText('Custom Dashboard')).toBeInTheDocument();
    });

    it('renders Active Candidates label', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('Active Candidates')).toBeInTheDocument();
    });
  });

  describe('filter tabs', () => {
    it('renders Shortlisted tab', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('Shortlisted')).toBeInTheDocument();
    });

    it('renders All Matches tab', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('All Matches')).toBeInTheDocument();
    });

    it('shows Shortlisted with active styling', () => {
      render(<ColonyDashboardPreviewCard />);
      const shortlistedTab = screen.getByText('Shortlisted');
      expect(shortlistedTab).toHaveClass('bg-indigo-500/20');
      expect(shortlistedTab).toHaveClass('text-indigo-300');
    });
  });

  describe('candidate cards', () => {
    it('renders all default candidates', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('Hannah P.')).toBeInTheDocument();
      expect(screen.getByText('Jenny C.')).toBeInTheDocument();
      expect(screen.getByText('Claire S.')).toBeInTheDocument();
    });

    it('renders candidate roles', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('Senior HCA')).toBeInTheDocument();
      expect(screen.getByText('Care Assistant')).toBeInTheDocument();
      expect(screen.getByText('Mental Health HCA')).toBeInTheDocument();
    });

    it('renders match percentages', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('98%')).toBeInTheDocument();
      expect(screen.getByText('94%')).toBeInTheDocument();
      expect(screen.getByText('91%')).toBeInTheDocument();
    });

    it('renders candidate avatars with initials', () => {
      render(<ColonyDashboardPreviewCard />);
      expect(screen.getByText('HP')).toBeInTheDocument();
      expect(screen.getByText('JC')).toBeInTheDocument();
      expect(screen.getByText('CS')).toBeInTheDocument();
    });

    it('renders custom candidates when provided', () => {
      const customCandidates = [
        { name: 'Test User', role: 'Test Role', matchPercentage: 85, initials: 'TU' },
      ];
      render(<ColonyDashboardPreviewCard candidates={customCandidates} />);
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('Test Role')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
      expect(screen.getByText('TU')).toBeInTheDocument();
      expect(screen.queryByText('Hannah P.')).not.toBeInTheDocument();
    });
  });

  describe('GlassCard integration', () => {
    it('wraps content in GlassCard', () => {
      render(<ColonyDashboardPreviewCard data-testid="dashboard" />);
      const dashboard = screen.getByTestId('dashboard');
      expect(dashboard).toHaveClass('backdrop-blur-xl');
      expect(dashboard).toHaveClass('rounded-2xl');
    });

    it('defaults to 600ms delay', () => {
      render(<ColonyDashboardPreviewCard data-testid="dashboard" />);
      const dashboard = screen.getByTestId('dashboard');

      expect(dashboard).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(600);
      });
      expect(dashboard).toHaveClass('opacity-100');
    });

    it('passes custom delay to GlassCard', () => {
      render(<ColonyDashboardPreviewCard data-testid="dashboard" delay={300} />);
      const dashboard = screen.getByTestId('dashboard');

      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(dashboard).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(dashboard).toHaveClass('opacity-100');
    });
  });

  describe('styling', () => {
    it('applies positioning className', () => {
      render(<ColonyDashboardPreviewCard data-testid="dashboard" className="absolute right-0" />);
      const dashboard = screen.getByTestId('dashboard');
      expect(dashboard).toHaveClass('absolute');
      expect(dashboard).toHaveClass('right-0');
    });
  });

  describe('accessibility', () => {
    it('passes data-testid to container', () => {
      render(<ColonyDashboardPreviewCard data-testid="my-dashboard" />);
      expect(screen.getByTestId('my-dashboard')).toBeInTheDocument();
    });
  });

  describe('hover enhancements', () => {
    it('has hover transition classes', () => {
      render(<ColonyDashboardPreviewCard data-testid="dashboard" />);
      const dashboard = screen.getByTestId('dashboard');
      expect(dashboard).toHaveClass('hover:scale-[1.02]');
      expect(dashboard).toHaveClass('hover:shadow-gold-glow-sm');
    });
  });
});
