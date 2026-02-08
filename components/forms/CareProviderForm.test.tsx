import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CareProviderForm } from './CareProviderForm';

describe('CareProviderForm', () => {
  const mockOnSubmit = vi.fn();

  it('renders all required fields', () => {
    render(<CareProviderForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/organisation name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred contact/i)).toBeInTheDocument();
  });

  it('renders optional requirements field', () => {
    render(<CareProviderForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/requirements/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<CareProviderForm onSubmit={mockOnSubmit} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders service type options', () => {
    render(<CareProviderForm onSubmit={mockOnSubmit} />);
    const select = screen.getByLabelText(/service type/i);

    expect(select).toContainHTML('Mental Health');
    expect(select).toContainHTML('Acute Care');
    expect(select).toContainHTML('Care Home');
  });
});
