import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './select';

const options = [
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'acute-care', label: 'Acute Care' },
  { value: 'care-home', label: 'Care Home' },
];

describe('Select', () => {
  it('renders with visible label', () => {
    render(<Select label="Service type" name="service" options={options} />);
    expect(screen.getByLabelText('Service type')).toBeInTheDocument();
  });

  it('displays options from array', () => {
    render(<Select label="Service" name="service" options={options} />);
    const select = screen.getByLabelText('Service');

    expect(select).toContainElement(screen.getByText('Mental Health'));
    expect(select).toContainElement(screen.getByText('Acute Care'));
    expect(select).toContainElement(screen.getByText('Care Home'));
  });

  it('shows placeholder option when provided', () => {
    render(
      <Select
        label="Service"
        name="service"
        options={options}
        placeholder="Select a service"
      />
    );
    expect(screen.getByText('Select a service')).toBeInTheDocument();
  });

  it('calls onChange with selected value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select
        label="Service"
        name="service"
        options={options}
        onChange={handleChange}
      />
    );

    await user.selectOptions(screen.getByLabelText('Service'), 'acute-care');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error state', () => {
    render(
      <Select
        label="Service"
        name="service"
        options={options}
        error="Please select a service"
      />
    );
    expect(screen.getByText('Please select a service')).toBeInTheDocument();
    expect(screen.getByLabelText('Service')).toHaveClass('border-red-600');
  });

  it('shows required indicator', () => {
    render(
      <Select label="Service" name="service" options={options} required />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('sets aria-invalid when error present', () => {
    render(
      <Select
        label="Service"
        name="service"
        options={options}
        error="Error"
      />
    );
    expect(screen.getByLabelText('Service')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Select
        label="Service"
        name="service"
        options={options}
        data-testid="service-select"
      />
    );
    expect(screen.getByTestId('service-select')).toBeInTheDocument();
  });
});
