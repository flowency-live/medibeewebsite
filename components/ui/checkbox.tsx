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
              // Base - square, no rounded corners
              'peer h-5 w-5 appearance-none',
              'border-2 border-neutral-grey bg-white',
              // Focus state
              'focus:outline-none focus:border-rich-gold',
              // Checked state
              'checked:bg-deep-slate checked:border-deep-slate',
              // Transition
              'transition-colors duration-150',
              // Disabled
              'disabled:bg-mist disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {/* Custom checkmark */}
          <svg
            className="absolute inset-0 h-5 w-5 text-mist opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-150"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              d="M5 10l3 3 7-7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
        <span className="font-body text-body-md text-ink group-hover:text-deep-slate transition-colors">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
