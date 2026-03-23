import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VerificationPackModal } from './VerificationPackModal';

describe('VerificationPackModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onPurchase: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('visibility', () => {
    it('renders when isOpen is true', () => {
      render(<VerificationPackModal {...defaultProps} />);
      expect(screen.getByText('Medibee Membership')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<VerificationPackModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Medibee Membership')).not.toBeInTheDocument();
    });
  });

  describe('tab navigation', () => {
    it('displays CELL, HIVE, and COLONY tabs', () => {
      render(<VerificationPackModal {...defaultProps} />);
      expect(screen.getByText('CELL')).toBeInTheDocument();
      expect(screen.getByText('HIVE')).toBeInTheDocument();
      expect(screen.getByText('COLONY')).toBeInTheDocument();
    });

    it('shows MOST POPULAR badge on HIVE tab', () => {
      render(<VerificationPackModal {...defaultProps} />);
      expect(screen.getByText('MOST POPULAR')).toBeInTheDocument();
    });

    it('defaults to HIVE tab', () => {
      render(<VerificationPackModal {...defaultProps} />);
      expect(screen.getByText('Verification Pack')).toBeInTheDocument();
      // £29 appears in both price section and total - use getAllByText
      const prices = screen.getAllByText(/£29/);
      expect(prices.length).toBeGreaterThan(0);
    });

    it('switches to CELL tab when clicked', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('CELL'));
      expect(screen.getByText('Cell members have free access to basic profile features.')).toBeInTheDocument();
    });

    it('switches to COLONY tab when clicked', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('COLONY'));
      expect(screen.getByText('Colony is for employers looking to hire healthcare professionals.')).toBeInTheDocument();
    });
  });

  describe('Hive tab - Verification Pack', () => {
    it('displays verification features list', () => {
      render(<VerificationPackModal {...defaultProps} />);
      expect(screen.getByText('ID Review')).toBeInTheDocument();
      expect(screen.getByText('Qualifications Review')).toBeInTheDocument();
      expect(screen.getByText('Right to Work Evidence Review')).toBeInTheDocument();
      expect(screen.getByText('DBS Evidence Review')).toBeInTheDocument();
      expect(screen.getByText('Passport Update')).toBeInTheDocument();
      expect(screen.getByText('Badge Outcomes')).toBeInTheDocument();
    });

    it('displays pricing information', () => {
      render(<VerificationPackModal {...defaultProps} />);
      // £29 appears in both price display and total
      const priceElements = screen.getAllByText(/£29/);
      expect(priceElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Fast Track add-on', () => {
    it('displays Fast Track option', () => {
      render(<VerificationPackModal {...defaultProps} />);
      expect(screen.getByText('Fast Track Processing')).toBeInTheDocument();
      expect(screen.getByText('+£15')).toBeInTheDocument();
    });

    it('updates total when Fast Track is selected', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      const fastTrackOption = screen.getByText('Fast Track Processing').closest('div');
      await userEvent.click(fastTrackOption!.parentElement!);

      // Total should now be £44 (£29 + £15)
      expect(screen.getByText(/£44/)).toBeInTheDocument();
    });
  });

  describe('purchase flow', () => {
    it('calls onPurchase when Add Verification Pack is clicked', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('Add Verification Pack'));

      expect(defaultProps.onPurchase).toHaveBeenCalledWith(false);
    });

    it('passes fastTrack=true when Fast Track is selected', async () => {
      render(<VerificationPackModal {...defaultProps} />);

      // Select fast track
      const fastTrackOption = screen.getByText('Fast Track Processing').closest('div');
      await userEvent.click(fastTrackOption!.parentElement!);

      // Click purchase
      await userEvent.click(screen.getByText('Add Verification Pack'));

      expect(defaultProps.onPurchase).toHaveBeenCalledWith(true);
    });

    it('shows loading state during purchase', async () => {
      const slowPurchase = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<VerificationPackModal {...defaultProps} onPurchase={slowPurchase} />);

      await userEvent.click(screen.getByText('Add Verification Pack'));

      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    it('closes modal after successful purchase', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('Add Verification Pack'));

      await waitFor(() => {
        expect(defaultProps.onClose).toHaveBeenCalled();
      });
    });
  });

  describe('close functionality', () => {
    it('calls onClose when close button is clicked', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('✕'));

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', async () => {
      const { container } = render(<VerificationPackModal {...defaultProps} />);
      const backdrop = container.querySelector('.bg-brand-dark\\/80');

      if (backdrop) {
        await userEvent.click(backdrop);
        expect(defaultProps.onClose).toHaveBeenCalled();
      }
    });
  });

  describe('Cell tab content', () => {
    it('shows upgrade prompt', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('CELL'));

      expect(screen.getByText('Explore Hive Benefits')).toBeInTheDocument();
    });

    it('switches to Hive when Explore Hive Benefits is clicked', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('CELL'));
      await userEvent.click(screen.getByText('Explore Hive Benefits'));

      expect(screen.getByText('Verification Pack')).toBeInTheDocument();
    });
  });

  describe('Colony tab content', () => {
    it('shows employer information', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('COLONY'));

      expect(screen.getByText('From £100/month for unlimited candidate access and contact.')).toBeInTheDocument();
    });

    it('has Contact Sales link', async () => {
      render(<VerificationPackModal {...defaultProps} />);
      await userEvent.click(screen.getByText('COLONY'));

      const link = screen.getByText('Contact Sales');
      expect(link).toHaveAttribute('href', '/contact?type=colony');
    });
  });
});
