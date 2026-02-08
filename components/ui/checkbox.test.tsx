import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders with visible label', () => {
    render(<Checkbox label="Mental Health" name="mental-health" />);
    expect(screen.getByLabelText('Mental Health')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Option" name="option" />);
    expect(screen.getByLabelText('Option')).not.toBeChecked();
  });

  it('can be checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Option" name="option" />);

    await user.click(screen.getByLabelText('Option'));
    expect(screen.getByLabelText('Option')).toBeChecked();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Option" name="option" onChange={handleChange} />);

    await user.click(screen.getByLabelText('Option'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox label="Option" name="option" defaultChecked />);
    expect(screen.getByLabelText('Option')).toBeChecked();
  });

  it('can be disabled', () => {
    render(<Checkbox label="Option" name="option" disabled />);
    expect(screen.getByLabelText('Option')).toBeDisabled();
  });

  it('passes through value prop', () => {
    render(<Checkbox label="Option" name="option" value="mental-health" />);
    expect(screen.getByLabelText('Option')).toHaveAttribute('value', 'mental-health');
  });
});
