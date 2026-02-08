import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - editorial, no rounded corners, uppercase tracking for UI
  [
    'inline-flex items-center justify-center',
    'font-body font-medium text-ui-sm tracking-ui uppercase',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rich-gold focus-visible:ring-offset-2 focus-visible:ring-offset-mist',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        // Primary - solid deep slate, no gradients, no rounded corners
        primary: [
          'bg-deep-slate text-mist',
          'hover:bg-ink',
          'border-0',
        ],
        // Secondary - outlined, transparent background
        secondary: [
          'bg-transparent text-deep-slate',
          'border-2 border-deep-slate',
          'hover:bg-deep-slate hover:text-mist',
        ],
        // Ghost - just underlined text, editorial style
        ghost: [
          'bg-transparent text-slate-blue',
          'underline underline-offset-4 decoration-1',
          'hover:text-deep-slate hover:decoration-2',
          'p-0',
        ],
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-10 px-6',
        lg: 'h-14 px-10',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
