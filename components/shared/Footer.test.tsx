import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('displays company name', () => {
    render(<Footer />);
    expect(screen.getByText(/medibee recruitment ltd/i)).toBeInTheDocument();
  });

  it('shows registration information', () => {
    render(<Footer />);
    expect(screen.getByText(/england & wales/i)).toBeInTheDocument();
  });

  it('shows contact email', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /hello@medibee-recruitment\.co\.uk/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@medibee-recruitment.co.uk');
  });

  it('links to privacy policy', () => {
    render(<Footer />);
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
  });

  it('links to safeguarding page', () => {
    render(<Footer />);
    const safeguardingLink = screen.getByRole('link', { name: /safeguarding/i });
    expect(safeguardingLink).toHaveAttribute('href', '/safeguarding');
  });

  it('links to complaints page', () => {
    render(<Footer />);
    const complaintsLink = screen.getByRole('link', { name: /complaints/i });
    expect(complaintsLink).toHaveAttribute('href', '/complaints');
  });

  it('shows copyright with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('shows ICO registration status', () => {
    render(<Footer />);
    expect(screen.getByText(/ico/i)).toBeInTheDocument();
  });
});
