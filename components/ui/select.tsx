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
          className="block font-body text-body-sm text-pearl-soft"
        >
          {label}
          {required && (
            <>
              <span className="text-gold ml-1" aria-hidden="true">*</span>
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
              // Base styles - dark theme
              'block w-full px-4 py-3 pr-10',
              'font-body text-body-md text-pearl-soft',
              'bg-void-medium border border-ash-border rounded-sm',
              // Focus state - gold accent
              'focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30',
              // Transition
              'transition-all duration-normal',
              // Appearance - remove default arrow
              'appearance-none cursor-pointer',
              // Error state
              error && 'border-status-expired focus:border-status-expired focus:ring-status-expired/30',
              // Disabled
              'disabled:bg-void-elevated disabled:text-ash-dark disabled:cursor-not-allowed',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-ash">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-void-medium text-pearl-soft">
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow - gold accent */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className="h-4 w-4 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p id={errorId} className="text-body-sm text-status-expired" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
