import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, name, error, hint, required, rows = 4, ...props }, ref) => {
    const errorId = `${name}-error`;
    const hintId = `${name}-hint`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block font-body text-body-sm text-ink"
        >
          {label}
          {required && (
            <span className="text-red-600 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={rows}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={cn(
            // Base styles - matching input, no rounded corners
            'block w-full px-4 py-3',
            'font-body text-body-md text-ink',
            'bg-white border-2 border-neutral-grey',
            // Focus state - gold accent
            'focus:border-rich-gold focus:outline-none',
            // Transition
            'transition-colors duration-150',
            // Placeholder
            'placeholder:text-neutral-grey',
            // Resize behaviour
            'resize-y min-h-[120px]',
            // Error state
            error && 'border-red-600 focus:border-red-600',
            // Disabled
            'disabled:bg-mist disabled:text-neutral-grey disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-body-sm text-neutral-grey">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-body-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
