import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BacklogTypeBadge } from './BacklogTypeBadge';

describe('BacklogTypeBadge', () => {
  it('renders feature badge with correct text', () => {
    render(<BacklogTypeBadge type="feature" />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
  });

  it('renders bug badge with correct text', () => {
    render(<BacklogTypeBadge type="bug" />);
    expect(screen.getByText('Bug')).toBeInTheDocument();
  });

  it('renders text-change badge with correct text', () => {
    render(<BacklogTypeBadge type="text-change" />);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('renders idea badge with correct text', () => {
    render(<BacklogTypeBadge type="idea" />);
    expect(screen.getByText('Idea')).toBeInTheDocument();
  });

  it('applies feature styling', () => {
    render(<BacklogTypeBadge type="feature" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-gold/10', 'text-gold');
  });

  it('applies bug styling', () => {
    render(<BacklogTypeBadge type="bug" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-expired/10', 'text-status-expired');
  });

  it('applies text-change styling', () => {
    render(<BacklogTypeBadge type="text-change" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-active/10', 'text-status-active');
  });

  it('applies idea styling', () => {
    render(<BacklogTypeBadge type="idea" data-testid="badge" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-status-pending/10', 'text-status-pending');
  });

  it('accepts custom className', () => {
    render(<BacklogTypeBadge type="feature" className="custom-class" data-testid="badge" />);
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });
});
