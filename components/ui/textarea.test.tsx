import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders with visible label', () => {
    render(<Textarea label="Message" name="message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Textarea label="Message" name="message" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Textarea label="Message" name="message" error="Message is required" />);
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('applies error styling when error present', () => {
    render(<Textarea label="Message" name="message" error="Error" />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveClass('border-red-600');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea label="Message" name="message" onChange={handleChange} />);

    await user.type(screen.getByLabelText('Message'), 'Hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays hint text when provided', () => {
    render(<Textarea label="Message" name="message" hint="Max 500 characters" />);
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('sets aria-invalid when error present', () => {
    render(<Textarea label="Message" name="message" error="Invalid" />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies custom rows', () => {
    render(<Textarea label="Message" name="message" rows={6} />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('forwards ref to textarea element', () => {
    const ref = vi.fn();
    render(<Textarea label="Test" name="test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Textarea
        label="Message"
        name="message"
        placeholder="Enter your message"
        maxLength={500}
      />
    );
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('placeholder', 'Enter your message');
    expect(textarea).toHaveAttribute('maxLength', '500');
  });
});
