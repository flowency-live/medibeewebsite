import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HCAForm } from './HCAForm';

describe('HCAForm', () => {
  const mockOnSubmit = vi.fn();

  it('renders all required fields', () => {
    render(<HCAForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
  });

  it('renders preferred settings checkboxes', () => {
    render(<HCAForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/preferred care settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mental health/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/care home/i)).toBeInTheDocument();
  });

  it('renders optional message field', () => {
    render(<HCAForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<HCAForm onSubmit={mockOnSubmit} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
