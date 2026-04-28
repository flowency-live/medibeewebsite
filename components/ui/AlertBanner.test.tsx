import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertBanner } from './AlertBanner';

describe('AlertBanner', () => {
  describe('renders content', () => {
    it('renders children content', () => {
      render(<AlertBanner type="warning">Test message</AlertBanner>);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(
        <AlertBanner type="warning" title="Warning Title">
          Message content
        </AlertBanner>
      );
      expect(screen.getByText('Warning Title')).toBeInTheDocument();
      expect(screen.getByText('Message content')).toBeInTheDocument();
    });
  });

  describe('dark theme variants (no light backgrounds)', () => {
    it('warning variant uses status-pending colors with /10 opacity background', () => {
      render(
        <AlertBanner type="warning" data-testid="alert">
          Warning
        </AlertBanner>
      );
      const alert = screen.getByTestId('alert');
      // Must use dark-compatible bg-status-pending/10, NOT bg-amber-50
      expect(alert).toHaveClass('bg-status-pending/10');
      expect(alert).toHaveClass('border-status-pending');
      expect(alert).not.toHaveClass('bg-amber-50');
    });

    it('error variant uses status-expired colors with /10 opacity background', () => {
      render(
        <AlertBanner type="error" data-testid="alert">
          Error
        </AlertBanner>
      );
      const alert = screen.getByTestId('alert');
      // Must use dark-compatible bg-status-expired/10, NOT bg-red-50
      expect(alert).toHaveClass('bg-status-expired/10');
      expect(alert).toHaveClass('border-status-expired');
      expect(alert).not.toHaveClass('bg-red-50');
    });

    it('success variant uses status-verified colors with /10 opacity background', () => {
      render(
        <AlertBanner type="success" data-testid="alert">
          Success
        </AlertBanner>
      );
      const alert = screen.getByTestId('alert');
      // Must use dark-compatible bg-status-verified/10, NOT bg-green-50
      expect(alert).toHaveClass('bg-status-verified/10');
      expect(alert).toHaveClass('border-status-verified');
      expect(alert).not.toHaveClass('bg-green-50');
    });

    it('info variant uses status-active colors with /10 opacity background', () => {
      render(
        <AlertBanner type="info" data-testid="alert">
          Info
        </AlertBanner>
      );
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('bg-status-active/10');
      expect(alert).toHaveClass('border-status-active');
    });
  });

  describe('styling', () => {
    it('uses rounded-card border radius (not rounded-sm)', () => {
      render(
        <AlertBanner type="warning" data-testid="alert">
          Test
        </AlertBanner>
      );
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('rounded-card');
      expect(alert).not.toHaveClass('rounded-sm');
    });

    it('has left border accent', () => {
      render(
        <AlertBanner type="warning" data-testid="alert">
          Test
        </AlertBanner>
      );
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('border-l-[3px]');
    });

    it('accepts custom className', () => {
      render(
        <AlertBanner type="warning" className="custom-class" data-testid="alert">
          Test
        </AlertBanner>
      );
      expect(screen.getByTestId('alert')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has role="alert" for screen readers', () => {
      render(<AlertBanner type="warning">Test</AlertBanner>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('title is rendered as heading for structure', () => {
      render(
        <AlertBanner type="error" title="Error Title">
          Content
        </AlertBanner>
      );
      expect(screen.getByRole('heading', { name: 'Error Title' })).toBeInTheDocument();
    });
  });
});
