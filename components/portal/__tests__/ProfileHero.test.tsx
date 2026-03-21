/**
 * ProfileHero Component Tests
 *
 * TDD: Written FIRST before implementation.
 * Tests the hero section with avatar, name, tagline, and availability.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileHero } from '../ProfileHero';
import type { CandidateProfile } from '@/lib/auth/types';

// Factory function for test data
function createTestProfile(overrides: Partial<CandidateProfile> = {}): CandidateProfile {
  return {
    candidateId: 'test-123',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    available: true,
    ...overrides,
  };
}

describe('ProfileHero', () => {
  describe('name and initials', () => {
    it('displays candidate full name', () => {
      const profile = createTestProfile({ firstName: 'Sarah', lastName: 'Connor' });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
    });

    it('displays initials in avatar', () => {
      const profile = createTestProfile({ firstName: 'Sarah', lastName: 'Connor' });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText('SC')).toBeInTheDocument();
    });

    it('handles single name gracefully', () => {
      const profile = createTestProfile({ firstName: 'Madonna', lastName: '' });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText('Madonna')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument();
    });
  });

  describe('tagline', () => {
    it('displays tagline when provided', () => {
      const profile = createTestProfile({
        tagline: 'Compassionate HCA with 5+ years experience',
      });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText('Compassionate HCA with 5+ years experience')).toBeInTheDocument();
    });

    it('does not display tagline section when not provided', () => {
      const profile = createTestProfile({ tagline: undefined });

      render(<ProfileHero profile={profile} />);

      // Should not have a tagline element
      expect(screen.queryByTestId('profile-tagline')).not.toBeInTheDocument();
    });
  });

  describe('availability beacon', () => {
    it('shows available badge when available is true', () => {
      const profile = createTestProfile({ available: true, status: 'active' });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText(/available/i)).toBeInTheDocument();
    });

    it('does not show available badge when available is false', () => {
      const profile = createTestProfile({ available: false, status: 'active' });

      render(<ProfileHero profile={profile} />);

      expect(screen.queryByText(/available/i)).not.toBeInTheDocument();
    });

    it('does not show available badge when status is not active', () => {
      const profile = createTestProfile({ available: true, status: 'pending_review' });

      render(<ProfileHero profile={profile} />);

      expect(screen.queryByText(/available/i)).not.toBeInTheDocument();
    });
  });

  describe('location and experience', () => {
    it('displays city when provided', () => {
      const profile = createTestProfile({ city: 'Bournemouth' });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText(/Bournemouth/)).toBeInTheDocument();
    });

    it('displays experience level when provided', () => {
      const profile = createTestProfile({ experienceLevel: '5-plus-years' });

      render(<ProfileHero profile={profile} />);

      expect(screen.getByText(/5\+ Years/i)).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    it('calls onRequestIntroduction when button clicked', async () => {
      const mockFn = vi.fn();
      const profile = createTestProfile();
      const user = userEvent.setup();

      render(<ProfileHero profile={profile} onRequestIntroduction={mockFn} />);

      const button = screen.getByRole('button', { name: /request introduction/i });
      await user.click(button);

      expect(mockFn).toHaveBeenCalledOnce();
    });

    it('calls onAddToShortlist when button clicked', async () => {
      const mockFn = vi.fn();
      const profile = createTestProfile();
      const user = userEvent.setup();

      render(<ProfileHero profile={profile} onAddToShortlist={mockFn} />);

      const button = screen.getByRole('button', { name: /shortlist/i });
      await user.click(button);

      expect(mockFn).toHaveBeenCalledOnce();
    });

    it('hides action buttons in own profile view', () => {
      const profile = createTestProfile();

      render(
        <ProfileHero
          profile={profile}
          isOwnProfile
          onRequestIntroduction={vi.fn()}
          onAddToShortlist={vi.fn()}
        />
      );

      expect(screen.queryByRole('button', { name: /request introduction/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /shortlist/i })).not.toBeInTheDocument();
    });
  });
});
