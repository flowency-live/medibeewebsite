import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('content rendering', () => {
    it('renders children content', () => {
      render(<GlassCard><div data-testid="child">Content</div></GlassCard>);
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies glassmorphism styling classes', () => {
      render(<GlassCard data-testid="glass-card">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('backdrop-blur-xl');
      expect(card).toHaveClass('rounded-2xl');
    });

    it('has gradient background', () => {
      render(<GlassCard data-testid="glass-card">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('bg-gradient-to-br');
    });

    it('has border styling', () => {
      render(<GlassCard data-testid="glass-card">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('border');
    });
  });

  describe('animation behavior', () => {
    it('starts hidden with opacity-0 and translate-y-8', () => {
      render(<GlassCard data-testid="glass-card">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('opacity-0');
      expect(card).toHaveClass('translate-y-8');
    });

    it('becomes visible after delay with opacity-100 and translate-y-0', () => {
      render(<GlassCard data-testid="glass-card" delay={0}>Content</GlassCard>);
      const card = screen.getByTestId('glass-card');

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(card).toHaveClass('opacity-100');
      expect(card).toHaveClass('translate-y-0');
    });

    it('respects custom delay before becoming visible', () => {
      render(<GlassCard data-testid="glass-card" delay={500}>Content</GlassCard>);
      const card = screen.getByTestId('glass-card');

      // Still hidden before delay
      expect(card).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(499);
      });
      expect(card).toHaveClass('opacity-0');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(card).toHaveClass('opacity-100');
    });

    it('defaults to 0ms delay when not provided', () => {
      render(<GlassCard data-testid="glass-card">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(card).toHaveClass('opacity-100');
    });

    it('has transition classes for smooth animation', () => {
      render(<GlassCard data-testid="glass-card">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('duration-700');
      expect(card).toHaveClass('ease-out');
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<GlassCard data-testid="glass-card" className="custom-class w-64">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('w-64');
    });

    it('merges custom className with default classes', () => {
      render(<GlassCard data-testid="glass-card" className="my-custom">Content</GlassCard>);
      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('my-custom');
      expect(card).toHaveClass('backdrop-blur-xl');
      expect(card).toHaveClass('rounded-2xl');
    });
  });

  describe('accessibility', () => {
    it('passes data-testid to container', () => {
      render(<GlassCard data-testid="my-card">Content</GlassCard>);
      expect(screen.getByTestId('my-card')).toBeInTheDocument();
    });
  });
});
