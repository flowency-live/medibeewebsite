'use client';

import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

const animationClasses = {
  'fade-up': 'animate-on-scroll',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
} as const;

const delayClasses: Record<number, string> = {
  100: 'animate-delay-100',
  200: 'animate-delay-200',
  300: 'animate-delay-300',
  400: 'animate-delay-400',
};

interface AnimatedSectionProps {
  animation?: keyof typeof animationClasses;
  delay?: 100 | 200 | 300 | 400;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
  'data-testid'?: string;
}

export function AnimatedSection({
  animation = 'fade-up',
  delay,
  threshold = 0.1,
  className,
  children,
  'data-testid': testId,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        animationClasses[animation],
        delay && delayClasses[delay],
        isVisible && 'is-visible',
        className
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
