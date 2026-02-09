import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LayeredHoneycomb } from './LayeredHoneycomb';

describe('LayeredHoneycomb', () => {
  it('renders a container element', () => {
    render(<LayeredHoneycomb data-testid="layered" />);
    expect(screen.getByTestId('layered')).toBeInTheDocument();
  });

  it('renders multiple honeycomb layers by default', () => {
    render(<LayeredHoneycomb data-testid="layered" />);
    const container = screen.getByTestId('layered');
    const layers = container.querySelectorAll('[aria-hidden="true"]');
    expect(layers.length).toBeGreaterThanOrEqual(2);
  });

  it('has aria-hidden for decorative element', () => {
    render(<LayeredHoneycomb data-testid="layered" />);
    expect(screen.getByTestId('layered')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies absolute positioning', () => {
    render(<LayeredHoneycomb data-testid="layered" />);
    expect(screen.getByTestId('layered')).toHaveClass('absolute', 'inset-0');
  });

  it('accepts custom className', () => {
    render(<LayeredHoneycomb className="custom-class" data-testid="layered" />);
    expect(screen.getByTestId('layered')).toHaveClass('custom-class');
  });

  it('has more layers when layers prop is 3 vs default', () => {
    const { rerender } = render(<LayeredHoneycomb data-testid="layered" />);
    const containerDefault = screen.getByTestId('layered');
    const defaultLayerCount = containerDefault.querySelectorAll('[aria-hidden="true"]').length;

    rerender(<LayeredHoneycomb layers={3} data-testid="layered" />);
    const container3Layers = screen.getByTestId('layered');
    const threeLayerCount = container3Layers.querySelectorAll('[aria-hidden="true"]').length;

    expect(threeLayerCount).toBeGreaterThan(defaultLayerCount);
  });
});
