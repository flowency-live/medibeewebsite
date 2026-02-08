import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('merges Tailwind conflicts correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('merges Tailwind background conflicts', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('preserves non-conflicting Tailwind classes', () => {
    expect(cn('px-2', 'py-4', 'text-lg')).toBe('px-2 py-4 text-lg');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles object syntax', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });
});
