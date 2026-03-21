/**
 * WorkHistoryTimeline Component Tests
 *
 * TDD: Written FIRST before implementation.
 * Tests the work history timeline visualization.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkHistoryTimeline } from '../WorkHistoryTimeline';
import type { WorkHistoryEntry } from '@/lib/auth/types';

// Factory function for test data
function createWorkHistoryEntry(overrides: Partial<WorkHistoryEntry> = {}): WorkHistoryEntry {
  return {
    role: 'Healthcare Assistant',
    employer: 'Sunrise Care Home',
    startDate: '2022-01-15',
    endDate: '2024-03-01',
    isCurrent: false,
    ...overrides,
  };
}

describe('WorkHistoryTimeline', () => {
  describe('rendering entries', () => {
    it('displays all work history entries', () => {
      const entries = [
        createWorkHistoryEntry({ role: 'Senior HCA', employer: 'NHS Trust' }),
        createWorkHistoryEntry({ role: 'HCA', employer: 'Care Home' }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      expect(screen.getByText('Senior HCA')).toBeInTheDocument();
      expect(screen.getByText('NHS Trust')).toBeInTheDocument();
      expect(screen.getByText('HCA')).toBeInTheDocument();
      expect(screen.getByText('Care Home')).toBeInTheDocument();
    });

    it('displays empty state when no entries', () => {
      render(<WorkHistoryTimeline entries={[]} />);

      expect(screen.getByText(/no work history/i)).toBeInTheDocument();
    });

    it('displays role and employer for each entry', () => {
      const entries = [
        createWorkHistoryEntry({
          role: 'Mental Health Support Worker',
          employer: 'Pines Mental Health Unit',
        }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      expect(screen.getByText('Mental Health Support Worker')).toBeInTheDocument();
      expect(screen.getByText('Pines Mental Health Unit')).toBeInTheDocument();
    });
  });

  describe('date formatting', () => {
    it('formats dates in UK format (Mon YYYY)', () => {
      const entries = [
        createWorkHistoryEntry({
          startDate: '2022-01-15',
          endDate: '2024-03-01',
        }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      expect(screen.getByText(/Jan 2022/)).toBeInTheDocument();
      expect(screen.getByText(/Mar 2024/)).toBeInTheDocument();
    });

    it('shows "Present" for current roles', () => {
      const entries = [
        createWorkHistoryEntry({
          startDate: '2024-03-15',
          endDate: null,
          isCurrent: true,
        }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      expect(screen.getByText(/Present/)).toBeInTheDocument();
    });

    it('calculates duration correctly', () => {
      const entries = [
        createWorkHistoryEntry({
          startDate: '2022-01-01',
          endDate: '2024-01-01',
        }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      expect(screen.getByText(/2 years/i)).toBeInTheDocument();
    });
  });

  describe('description', () => {
    it('displays description when provided', () => {
      const entries = [
        createWorkHistoryEntry({
          description: 'Provided personal care to elderly residents',
        }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      expect(screen.getByText('Provided personal care to elderly residents')).toBeInTheDocument();
    });

    it('does not show description section when not provided', () => {
      const entries = [createWorkHistoryEntry({ description: undefined })];

      render(<WorkHistoryTimeline entries={entries} />);

      // Should still render the entry without description
      expect(screen.getByText('Healthcare Assistant')).toBeInTheDocument();
    });
  });

  describe('current role highlight', () => {
    it('highlights current role with visual indicator', () => {
      const entries = [
        createWorkHistoryEntry({ isCurrent: true, role: 'Current Role' }),
        createWorkHistoryEntry({ isCurrent: false, role: 'Past Role' }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      // Current role should have a special indicator
      const currentEntry = screen.getByTestId('timeline-entry-current');
      expect(currentEntry).toBeInTheDocument();
    });
  });

  describe('timeline visual', () => {
    it('renders timeline connector between entries', () => {
      const entries = [
        createWorkHistoryEntry({ role: 'Role 1' }),
        createWorkHistoryEntry({ role: 'Role 2' }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      // Should have timeline visual elements
      expect(screen.getByTestId('timeline-connector')).toBeInTheDocument();
    });
  });

  describe('ordering', () => {
    it('displays entries in chronological order (most recent first)', () => {
      const entries = [
        createWorkHistoryEntry({ role: 'Older Role', startDate: '2020-01-01' }),
        createWorkHistoryEntry({ role: 'Newer Role', startDate: '2023-01-01' }),
      ];

      render(<WorkHistoryTimeline entries={entries} />);

      const roles = screen.getAllByTestId(/timeline-entry/);
      // Most recent should be first
      expect(roles[0]).toHaveTextContent('Newer Role');
    });
  });
});
