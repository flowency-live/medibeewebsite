import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - dark theme, uppercase tracking for UI
  [
    'inline-flex items-center justify-center gap-2',
    'font-body font-medium text-ui-sm tracking-ui uppercase',
    'transition-all duration-normal',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      variant: {
        // Gold - primary CTA, signature color
        gold: [
          'bg-gold text-void',
          'hover:bg-gold-light hover:shadow-gold-glow-sm',
          'border-0',
        ],
        // Outline Gold - secondary on dark backgrounds
        'outline-gold': [
          'bg-transparent text-gold',
          'border border-gold/40',
          'hover:border-gold hover:bg-gold/10',
        ],
        // Ghost - minimal style for dark backgrounds
        ghost: [
          'bg-transparent text-pearl-soft',
          'hover:bg-ash-border hover:text-pearl',
          'border-0',
        ],
        // Secondary - subtle dark button
        secondary: [
          'bg-void-elevated text-pearl-soft',
          'border border-ash-border',
          'hover:bg-void-medium hover:border-ash-border-light hover:text-pearl',
        ],
        // Destructive - for delete/danger actions
        destructive: [
          'bg-status-expired/10 text-status-expired',
          'border border-status-expired/30',
          'hover:bg-status-expired/20 hover:border-status-expired/50',
        ],
        // Link style - underlined text
        link: [
          'bg-transparent text-gold',
          'underline underline-offset-4 decoration-1',
          'hover:text-gold-light hover:decoration-2',
          'p-0 h-auto',
        ],
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-10 px-6 text-ui-xs',
        lg: 'h-14 px-10',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'gold',
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
