import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              // Base - dark theme
              'peer h-5 w-5 appearance-none',
              'border border-ash-border bg-void-medium rounded-sm',
              // Focus state - gold ring
              'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-void',
              // Checked state - gold
              'checked:bg-gold checked:border-gold',
              // Transition
              'transition-all duration-normal',
              // Hover
              'hover:border-ash-border-light',
              // Disabled
              'disabled:bg-void-elevated disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
          {/* Custom checkmark - void color on gold background */}
          <svg
            className="absolute inset-0 h-5 w-5 text-void opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-normal"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              d="M5 10l3 3 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-body text-body-md text-pearl-soft group-hover:text-pearl transition-colors">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
