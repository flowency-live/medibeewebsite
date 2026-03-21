/**
 * TrustMeter Component Tests
 *
 * TDD: Written FIRST before implementation.
 * Tests the verification/trust progress indicator.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustMeter } from '../TrustMeter';
import type { CandidateProfile } from '@/lib/auth/types';
import type { Credential } from '@/components/portal/CredentialCard';

// Factory function for test data
function createTestProfile(overrides: Partial<CandidateProfile> = {}): CandidateProfile {
  return {
    candidateId: 'test-123',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    ...overrides,
  };
}

function createCredential(overrides: Partial<Credential> = {}): Credential {
  return {
    id: 'cred-1',
    name: 'DBS Certificate',
    type: 'dbs',
    status: 'verified',
    uploadedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('TrustMeter', () => {
  describe('trust score calculation', () => {
    it('shows 0% when no verification items completed', () => {
      const profile = createTestProfile({
        rightToWork: false,
        dbsStatus: 'none',
        cvUploaded: false,
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      expect(screen.getByText(/0%/)).toBeInTheDocument();
    });

    it('increases score with Right to Work confirmed', () => {
      const profile = createTestProfile({
        rightToWork: true,
        dbsStatus: 'none',
        cvUploaded: false,
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      // Should show some progress
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow');
      const value = Number(progressBar.getAttribute('aria-valuenow'));
      expect(value).toBeGreaterThan(0);
    });

    it('increases score with DBS cleared', () => {
      const profile = createTestProfile({
        rightToWork: false,
        dbsStatus: 'cleared',
        cvUploaded: false,
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      const progressBar = screen.getByRole('progressbar');
      const value = Number(progressBar.getAttribute('aria-valuenow'));
      expect(value).toBeGreaterThan(0);
    });

    it('increases score with CV uploaded', () => {
      const profile = createTestProfile({
        rightToWork: false,
        dbsStatus: 'none',
        cvUploaded: true,
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      const progressBar = screen.getByRole('progressbar');
      const value = Number(progressBar.getAttribute('aria-valuenow'));
      expect(value).toBeGreaterThan(0);
    });

    it('increases score with verified credentials', () => {
      const profile = createTestProfile();
      const credentials = [
        createCredential({ status: 'verified' }),
        createCredential({ id: 'cred-2', status: 'verified' }),
      ];

      render(<TrustMeter profile={profile} credentials={credentials} />);

      const progressBar = screen.getByRole('progressbar');
      const value = Number(progressBar.getAttribute('aria-valuenow'));
      expect(value).toBeGreaterThan(0);
    });

    it('shows 100% when fully verified', () => {
      const profile = createTestProfile({
        rightToWork: true,
        dbsStatus: 'cleared',
        cvUploaded: true,
        professionalSummary: 'A detailed professional summary with enough content',
      });
      const credentials = [
        createCredential({ status: 'verified' }),
        createCredential({ id: 'cred-2', status: 'verified' }),
        createCredential({ id: 'cred-3', status: 'verified' }),
      ];

      render(<TrustMeter profile={profile} credentials={credentials} />);

      expect(screen.getByText(/100%/)).toBeInTheDocument();
    });
  });

  describe('visual indicators', () => {
    it('displays progress bar', () => {
      const profile = createTestProfile();

      render(<TrustMeter profile={profile} credentials={[]} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows verification checklist items', () => {
      const profile = createTestProfile();

      render(<TrustMeter profile={profile} credentials={[]} />);

      expect(screen.getByText(/Right to Work/i)).toBeInTheDocument();
      expect(screen.getByText(/DBS/i)).toBeInTheDocument();
      expect(screen.getByText(/CV/i)).toBeInTheDocument();
    });

    it('marks completed items with checkmark', () => {
      const profile = createTestProfile({
        rightToWork: true,
        dbsStatus: 'cleared',
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      const rtwItem = screen.getByTestId('trust-item-rtw');
      const dbsItem = screen.getByTestId('trust-item-dbs');

      expect(rtwItem).toHaveAttribute('data-completed', 'true');
      expect(dbsItem).toHaveAttribute('data-completed', 'true');
    });

    it('shows pending items as incomplete', () => {
      const profile = createTestProfile({
        rightToWork: false,
        dbsStatus: 'none',
        cvUploaded: false,
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      const rtwItem = screen.getByTestId('trust-item-rtw');
      expect(rtwItem).toHaveAttribute('data-completed', 'false');
    });
  });

  describe('trust level labels', () => {
    it('shows "Getting Started" for low trust', () => {
      const profile = createTestProfile({
        rightToWork: false,
        dbsStatus: 'none',
        cvUploaded: false,
      });

      render(<TrustMeter profile={profile} credentials={[]} />);

      expect(screen.getByText(/Getting Started/i)).toBeInTheDocument();
    });

    it('shows "Verified Professional" for high trust', () => {
      const profile = createTestProfile({
        rightToWork: true,
        dbsStatus: 'cleared',
        cvUploaded: true,
      });
      const credentials = [
        createCredential({ status: 'verified' }),
        createCredential({ id: 'cred-2', status: 'verified' }),
      ];

      render(<TrustMeter profile={profile} credentials={credentials} />);

      expect(screen.getByText(/Verified Professional/i)).toBeInTheDocument();
    });
  });

  describe('compact mode', () => {
    it('renders compact version when compact prop is true', () => {
      const profile = createTestProfile();

      render(<TrustMeter profile={profile} credentials={[]} compact />);

      // Compact mode should not show full checklist
      expect(screen.queryByText(/Right to Work/i)).not.toBeInTheDocument();
      // But should still show the meter
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
