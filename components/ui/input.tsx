import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, name, error, hint, required, ...props }, ref) => {
    const errorId = `${name}-error`;
    const hintId = `${name}-hint`;

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

        <input
          ref={ref}
          id={name}
          name={name}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={cn(
            // Base styles - dark theme
            'block w-full px-4 py-3',
            'font-body text-body-md text-pearl-soft',
            'bg-void-medium border border-ash-border rounded-sm',
            // Focus state - gold accent
            'focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30',
            // Transition
            'transition-all duration-normal',
            // Placeholder
            'placeholder:text-ash',
            // Error state
            error && 'border-status-expired focus:border-status-expired focus:ring-status-expired/30',
            // Disabled
            'disabled:bg-void-elevated disabled:text-ash-dark disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-body-sm text-ash-light">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-body-sm text-status-expired" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
