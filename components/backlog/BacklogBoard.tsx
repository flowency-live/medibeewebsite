'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import type {
  BacklogItem,
  CreateBacklogItem,
  BacklogItemStatusValue,
} from '@/lib/schemas/backlog';
import { BacklogColumn } from './BacklogColumn';
import { BacklogItemForm } from './BacklogItemForm';
import { BacklogItemDetail } from './BacklogItemDetail';

export function BacklogBoard() {
  const [items, setItems] = useState<BacklogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BacklogItem | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch('/api/backlog');
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
      } else {
        setError('Failed to fetch items');
      }
    } catch {
      setError('Failed to fetch items');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const itemsByStatus = useMemo(() => {
    const grouped: Record<BacklogItemStatusValue, BacklogItem[]> = {
      todo: [],
      doing: [],
      done: [],
    };

    items.forEach((item) => {
      grouped[item.status].push(item);
    });

    // Sort each group by stackPosition
    Object.values(grouped).forEach((group) => {
      group.sort((a, b) => a.stackPosition - b.stackPosition);
    });

    return grouped;
  }, [items]);

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;

      // Same position, no change
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourceStatus = source.droppableId as BacklogItemStatusValue;
      const destStatus = destination.droppableId as BacklogItemStatusValue;
      const newPosition = destination.index + 1;

      // Optimistic update
      const movingItem = items.find((i) => i.id === draggableId);
      if (!movingItem) return;

      // Create new items array with updated positions
      const newItems = [...items];
      const itemIndex = newItems.findIndex((i) => i.id === draggableId);
      newItems[itemIndex] = {
        ...movingItem,
        status: destStatus,
        stackPosition: newPosition,
      };

      // Recalculate positions for affected items
      const destItems = newItems
        .filter((i) => i.status === destStatus && i.id !== draggableId)
        .sort((a, b) => a.stackPosition - b.stackPosition);

      destItems.splice(newPosition - 1, 0, newItems[itemIndex]);

      destItems.forEach((item, index) => {
        const idx = newItems.findIndex((i) => i.id === item.id);
        if (idx !== -1) {
          newItems[idx] = { ...newItems[idx], stackPosition: index + 1 };
        }
      });

      setItems(newItems);

      // Send to API
      try {
        const response = await fetch('/api/backlog/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemId: draggableId,
            sourceStatus,
            destinationStatus: destStatus,
            newPosition,
          }),
        });

        if (!response.ok) {
          // Revert on error
          await fetchItems();
        }
      } catch {
        // Revert on error
        await fetchItems();
      }
    },
    [items, fetchItems]
  );

  const handleCreate = async (data: CreateBacklogItem) => {
    const response = await fetch('/api/backlog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create item');
    }

    const result = await response.json();
    setItems((prev) => [...prev, result.data]);
  };

  const handleUpdate = async (id: string, data: CreateBacklogItem) => {
    const response = await fetch(`/api/backlog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update item');
    }

    const result = await response.json();
    setItems((prev) => prev.map((item) => (item.id === id ? result.data : item)));
    setSelectedItem(result.data);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/backlog/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete item');
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ash">Loading backlog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-status-expired">{error}</div>
        <Button variant="outline-gold" onClick={fetchItems}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-ash">
            {items.length} item{items.length !== 1 ? 's' : ''} total
          </div>
          <Button variant="gold" onClick={() => setShowCreateForm(true)}>
            + Add Item
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
            <BacklogColumn
              status="todo"
              items={itemsByStatus.todo}
              onItemClick={setSelectedItem}
            />
            <BacklogColumn
              status="doing"
              items={itemsByStatus.doing}
              onItemClick={setSelectedItem}
            />
            <BacklogColumn
              status="done"
              items={itemsByStatus.done}
              onItemClick={setSelectedItem}
            />
          </div>
        </DragDropContext>
      </div>

      <BacklogItemForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreate}
        mode="create"
      />

      {selectedItem && (
        <BacklogItemDetail
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          item={selectedItem}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
