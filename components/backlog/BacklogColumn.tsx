'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import type { BacklogItem, BacklogItemStatusValue } from '@/lib/schemas/backlog';
import { BacklogCard } from './BacklogCard';

interface BacklogColumnProps {
  status: BacklogItemStatusValue;
  items: BacklogItem[];
  onItemClick?: (item: BacklogItem) => void;
  className?: string;
}

const columnConfig: Record<
  BacklogItemStatusValue,
  { title: string; headerClass: string }
> = {
  todo: {
    title: 'To Do',
    headerClass: 'border-ash',
  },
  doing: {
    title: 'Doing',
    headerClass: 'border-gold',
  },
  done: {
    title: 'Done',
    headerClass: 'border-status-verified',
  },
};

export function BacklogColumn({
  status,
  items,
  onItemClick,
  className,
}: BacklogColumnProps) {
  const config = columnConfig[status];

  return (
    <div
      className={cn(
        'flex flex-col min-h-0 rounded-lg',
        'bg-void-light border border-ash-border',
        className
      )}
    >
      <div
        className={cn(
          'p-3 border-b-2 flex items-center justify-between',
          config.headerClass
        )}
      >
        <h3 className="text-sm font-semibold text-pearl">{config.title}</h3>
        <span className="text-xs text-ash bg-void-medium px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 p-2 space-y-2 overflow-y-auto min-h-[200px]',
              snapshot.isDraggingOver && 'bg-gold/5'
            )}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <BacklogCard
                      item={item}
                      onClick={() => onItemClick?.(item)}
                      isDragging={dragSnapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {items.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex items-center justify-center h-24 text-xs text-ash">
                No items
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
