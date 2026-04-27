'use client';

import { useState, useEffect } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the card animates into view. Default: 0 */
  delay?: number;
  'data-testid'?: string;
}

export function GlassCard({
  children,
  className = '',
  delay = 0,
  'data-testid': testId,
}: GlassCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      data-testid={testId}
      className={`
        relative rounded-2xl backdrop-blur-xl
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        border border-white/[0.1]
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
