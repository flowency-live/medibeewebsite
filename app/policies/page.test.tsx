import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PoliciesPage from './page';

describe('PoliciesPage', () => {
  it('renders the page title', () => {
    render(<PoliciesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /policies/i })).toBeInTheDocument();
  });

  it('renders privacy policy card', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders equality and diversity card', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('Equality, Diversity & Inclusion')).toBeInTheDocument();
  });

  it('renders modern slavery statement card', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('Modern Slavery Statement')).toBeInTheDocument();
  });

  it('renders data retention policy card', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('Data Retention Policy')).toBeInTheDocument();
  });

  it('renders cookie policy card', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
  });

  it('renders right to work policy card', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('Right to Work Policy')).toBeInTheDocument();
  });

  it('renders safeguarding link', () => {
    render(<PoliciesPage />);
    expect(screen.getByRole('link', { name: /safeguarding/i })).toBeInTheDocument();
  });

  it('renders complaints link', () => {
    render(<PoliciesPage />);
    expect(screen.getByRole('link', { name: /complaints/i })).toBeInTheDocument();
  });
});
