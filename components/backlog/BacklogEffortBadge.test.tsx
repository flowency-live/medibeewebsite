import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BacklogEffortBadge } from './BacklogEffortBadge';

describe('BacklogEffortBadge', () => {
  it('renders XS effort badge', () => {
    render(<BacklogEffortBadge effort="XS" />);
    expect(screen.getByText('XS')).toBeInTheDocument();
  });

  it('renders S effort badge', () => {
    render(<BacklogEffortBadge effort="S" />);
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders M effort badge', () => {
    render(<BacklogEffortBadge effort="M" />);
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('renders L effort badge', () => {
    render(<BacklogEffortBadge effort="L" />);
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('renders XL effort badge', () => {
    render(<BacklogEffortBadge effort="XL" />);
    expect(screen.getByText('XL')).toBeInTheDocument();
  });

  it('renders nothing when effort is null', () => {
    const { container } = render(<BacklogEffortBadge effort={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies green styling for XS', () => {
    render(<BacklogEffortBadge effort="XS" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-verified/10', 'text-status-verified');
  });

  it('applies green styling for S', () => {
    render(<BacklogEffortBadge effort="S" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-verified/10', 'text-status-verified');
  });

  it('applies amber styling for M', () => {
    render(<BacklogEffortBadge effort="M" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-pending/10', 'text-status-pending');
  });

  it('applies red styling for L', () => {
    render(<BacklogEffortBadge effort="L" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-expired/10', 'text-status-expired');
  });

  it('applies red styling for XL', () => {
    render(<BacklogEffortBadge effort="XL" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-expired/10', 'text-status-expired');
  });

  it('accepts custom className', () => {
    render(<BacklogEffortBadge effort="M" className="custom-class" data-testid="badge" />);
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });
});
