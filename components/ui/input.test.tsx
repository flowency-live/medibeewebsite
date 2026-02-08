import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('renders with visible label', () => {
    render(<Input label="Email address" name="email" />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Email" name="email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Input label="Email" name="email" error="Invalid email address" />);
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('applies error styling when error present', () => {
    render(<Input label="Email" name="email" error="Error" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red-600');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input label="Name" name="name" onChange={handleChange} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays hint text when provided', () => {
    render(<Input label="Phone" name="phone" hint="Include area code" />);
    expect(screen.getByText('Include area code')).toBeInTheDocument();
  });

  it('associates error message with input via aria-describedby', () => {
    render(<Input label="Email" name="email" error="Invalid" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('sets aria-invalid when error present', () => {
    render(<Input label="Email" name="email" error="Invalid" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Input label="Test" name="test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Input label="Email" name="email" type="email" placeholder="you@example.com" />
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
  });
});
