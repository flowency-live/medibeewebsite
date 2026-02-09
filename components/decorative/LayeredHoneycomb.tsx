import { cn } from '@/lib/utils';
import { HoneycombPattern } from './HoneycombPattern';

interface LayerConfig {
  scale: number;
  opacity: number;
  offset: { x: number; y: number };
}

const layerConfigs: LayerConfig[] = [
  { scale: 0.8, opacity: 0.04, offset: { x: -5, y: -5 } },
  { scale: 1, opacity: 0.06, offset: { x: 0, y: 0 } },
  { scale: 1.2, opacity: 0.03, offset: { x: 5, y: 5 } },
];

interface LayeredHoneycombProps {
  layers?: 2 | 3;
  className?: string;
  'data-testid'?: string;
}

export function LayeredHoneycomb({
  layers = 2,
  className,
  'data-testid': testId,
}: LayeredHoneycombProps) {
  const configs = layerConfigs.slice(0, layers);

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      aria-hidden="true"
      data-testid={testId}
    >
      {configs.map((config, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            transform: `scale(${config.scale}) translate(${config.offset.x}px, ${config.offset.y}px)`,
          }}
          aria-hidden="true"
        >
          <HoneycombPattern opacity={config.opacity} />
        </div>
      ))}
    </div>
  );
}
