import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      name,
      options,
      value,
      onChange,
      error,
      required,
      className,
      columns = 1,
    },
    ref
  ) => {
    const errorId = `${name}-error`;

    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    };

    return (
      <div ref={ref} className={cn('space-y-3', className)}>
        <fieldset>
          <legend className="font-body text-body-sm text-pearl-soft mb-3 block">
            {label}
            {required && (
              <span className="text-gold ml-1" aria-hidden="true">
                *
              </span>
            )}
          </legend>
          <div
            className={cn('grid gap-3', gridCols[columns])}
            role="radiogroup"
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          >
            {options.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'relative flex items-start gap-3 p-4 cursor-pointer',
                  'border border-ash-border bg-void-medium rounded-sm',
                  'hover:border-ash-border-light transition-all duration-normal',
                  value === option.value && 'border-gold bg-gold/5'
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    'flex-shrink-0 w-5 h-5 border rounded-full mt-0.5',
                    'flex items-center justify-center transition-all duration-normal',
                    value === option.value
                      ? 'border-gold bg-gold'
                      : 'border-ash-border'
                  )}
                >
                  {value === option.value && (
                    <span className="w-2 h-2 bg-void rounded-full" />
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="font-body text-body-md text-pearl-soft">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="font-body text-body-sm text-ash-light mt-1">
                      {option.description}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {error && (
          <p id={errorId} className="font-body text-body-sm text-status-expired" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
