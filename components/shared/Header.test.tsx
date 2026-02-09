import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders company name linking to home', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /medibee/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('displays navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /work with us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('displays contact link in mobile menu', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Open mobile menu to see contact link
    const menuButton = screen.getByRole('button', { name: /menu/i });
    await user.click(menuButton);

    const contactLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders navigation as accessible nav element', () => {
    render(<Header />);
    expect(screen.getByRole('navigation', { name: /main/i })).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();

    await user.click(menuButton);

    // Mobile menu should be visible
    const mobileNav = screen.getByTestId('mobile-nav');
    expect(mobileNav).toBeVisible();
  });

  it('closes mobile menu when menu button clicked again', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /menu/i });

    // Open
    await user.click(menuButton);
    expect(screen.getByTestId('mobile-nav')).toBeVisible();

    // Close
    await user.click(menuButton);
    expect(screen.getByTestId('mobile-nav')).not.toBeVisible();
  });

  it('has correct aria-expanded state on menu button', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /menu/i });

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });
});
