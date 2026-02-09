'use client';

import { cn } from '@/lib/utils';
import { HexagonBadge } from '@/components/ui/HexagonBadge';
import { AnimatedSection } from './AnimatedSection';

type ColumnType = 'provider' | 'hca';

interface HowItWorksStep {
  text: string;
}

interface HowItWorksColumnProps {
  type: ColumnType;
  title: string;
  steps: HowItWorksStep[];
  className?: string;
  'data-testid'?: string;
}

export function HowItWorksColumn({
  type,
  title,
  steps,
  className,
  'data-testid': testId,
}: HowItWorksColumnProps) {
  const animationDirection = type === 'provider' ? 'slide-left' : 'slide-right';

  return (
    <AnimatedSection animation={animationDirection}>
      <div className={cn('', className)} data-testid={testId}>
        <h3 className="text-lg mb-8 uppercase tracking-[0.1em] text-mist">
          {title}
        </h3>

        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-6 items-start">
              <HexagonBadge number={index + 1} variant={type} />
              <p className="text-[1.0625rem] leading-normal pt-3 opacity-85 text-mist">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
