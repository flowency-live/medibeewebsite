import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, name, options, placeholder, error, required, ...props },
    ref
  ) => {
    const errorId = `${name}-error`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block font-body text-body-sm text-ink"
        >
          {label}
          {required && (
            <>
              <span className="text-red-600 ml-1" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </>
          )}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={name}
            name={name}
            required={required}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              // Base styles - matching input, no rounded corners
              'block w-full px-4 py-3 pr-10',
              'font-body text-body-md text-ink',
              'bg-white border-2 border-neutral-grey',
              // Focus state
              'focus:border-rich-gold focus:outline-none',
              // Transition
              'transition-colors duration-150',
              // Appearance - remove default arrow
              'appearance-none cursor-pointer',
              // Error state
              error && 'border-red-600 focus:border-red-600',
              // Disabled
              'disabled:bg-mist disabled:text-neutral-grey disabled:cursor-not-allowed',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className="h-4 w-4 text-neutral-grey"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p id={errorId} className="text-body-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
