import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ProfilePreviewCard } from './ProfilePreviewCard';

describe('ProfilePreviewCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('content rendering', () => {
    it('renders the Medibee header', () => {
      render(<ProfilePreviewCard />);
      expect(screen.getByText('Medibee')).toBeInTheDocument();
    });

    it('renders default candidate name', () => {
      render(<ProfilePreviewCard />);
      expect(screen.getByText('Sarah Mitchell')).toBeInTheDocument();
    });

    it('renders custom candidate name when provided', () => {
      render(<ProfilePreviewCard name="Jane Doe" />);
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.queryByText('Sarah Mitchell')).not.toBeInTheDocument();
    });

    it('renders default subtitle', () => {
      render(<ProfilePreviewCard />);
      expect(screen.getByText('Healthcare Assistant, London, UK')).toBeInTheDocument();
    });

    it('renders custom subtitle when provided', () => {
      render(<ProfilePreviewCard subtitle="Senior HCA, Manchester" />);
      expect(screen.getByText('Senior HCA, Manchester')).toBeInTheDocument();
    });

    it('renders summary content', () => {
      render(<ProfilePreviewCard />);
      expect(screen.getByText(/HCA ideally required/)).toBeInTheDocument();
    });

    it('renders custom summary when provided', () => {
      render(<ProfilePreviewCard summary="Custom summary text" />);
      expect(screen.getByText('Custom summary text')).toBeInTheDocument();
    });
  });

  describe('avatar', () => {
    it('displays default initials in avatar', () => {
      render(<ProfilePreviewCard />);
      expect(screen.getByText('SM')).toBeInTheDocument();
    });

    it('displays custom initials when provided', () => {
      render(<ProfilePreviewCard initials="JD" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('tab navigation', () => {
    it('renders all three tabs', () => {
      render(<ProfilePreviewCard />);
      const tabs = screen.getAllByRole('button');
      expect(tabs).toHaveLength(3);
      expect(tabs[0]).toHaveTextContent('Summary');
      expect(tabs[1]).toHaveTextContent('Skills');
      expect(tabs[2]).toHaveTextContent('Experience');
    });

    it('shows Summary tab with active styling', () => {
      render(<ProfilePreviewCard data-testid="profile" />);
      const profile = screen.getByTestId('profile');
      const summaryTab = profile.querySelector('button:first-child');
      expect(summaryTab).toHaveClass('bg-gold/20');
      expect(summaryTab).toHaveClass('text-gold');
    });
  });

  describe('skills', () => {
    it('renders default skills', () => {
      render(<ProfilePreviewCard />);
      expect(screen.getByText('Elderly Care')).toBeInTheDocument();
      expect(screen.getByText('Mental Health')).toBeInTheDocument();
      expect(screen.getByText('First Aid')).toBeInTheDocument();
    });

    it('renders custom skills when provided', () => {
      render(<ProfilePreviewCard skills={['Nursing', 'Pediatrics']} />);
      expect(screen.getByText('Nursing')).toBeInTheDocument();
      expect(screen.getByText('Pediatrics')).toBeInTheDocument();
      expect(screen.queryByText('Elderly Care')).not.toBeInTheDocument();
    });
  });

  describe('GlassCard integration', () => {
    it('wraps content in GlassCard', () => {
      render(<ProfilePreviewCard data-testid="profile" />);
      const profile = screen.getByTestId('profile');
      expect(profile).toHaveClass('backdrop-blur-xl');
      expect(profile).toHaveClass('rounded-2xl');
    });

    it('defaults to 200ms delay', () => {
      render(<ProfilePreviewCard data-testid="profile" />);
      const profile = screen.getByTestId('profile');

      expect(profile).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(profile).toHaveClass('opacity-100');
    });

    it('passes custom delay to GlassCard', () => {
      render(<ProfilePreviewCard data-testid="profile" delay={500} />);
      const profile = screen.getByTestId('profile');

      act(() => {
        vi.advanceTimersByTime(499);
      });
      expect(profile).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(profile).toHaveClass('opacity-100');
    });
  });

  describe('styling', () => {
    it('applies positioning className', () => {
      render(<ProfilePreviewCard data-testid="profile" className="absolute left-1/2" />);
      const profile = screen.getByTestId('profile');
      expect(profile).toHaveClass('absolute');
      expect(profile).toHaveClass('left-1/2');
    });
  });

  describe('accessibility', () => {
    it('passes data-testid to container', () => {
      render(<ProfilePreviewCard data-testid="my-profile" />);
      expect(screen.getByTestId('my-profile')).toBeInTheDocument();
    });
  });

  describe('hover enhancements', () => {
    it('has hover transition classes', () => {
      render(<ProfilePreviewCard data-testid="profile" />);
      const profile = screen.getByTestId('profile');
      expect(profile).toHaveClass('hover:scale-[1.02]');
      expect(profile).toHaveClass('hover:shadow-gold-glow-sm');
    });
  });
});
