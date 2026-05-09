'use client';

import { useState } from 'react';
import { PortalModal } from '@/components/portal/PortalModal';
import { Button } from '@/components/ui/button';
import type { BacklogItem, CreateBacklogItem } from '@/lib/schemas/backlog';
import { BacklogTypeBadge } from './BacklogTypeBadge';
import { BacklogEffortBadge } from './BacklogEffortBadge';
import { BacklogItemForm } from './BacklogItemForm';

interface BacklogItemDetailProps {
  isOpen: boolean;
  onClose: () => void;
  item: BacklogItem;
  onUpdate: (id: string, data: CreateBacklogItem) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function BacklogItemDetail({
  isOpen,
  onClose,
  item,
  onUpdate,
  onDelete,
}: BacklogItemDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = async (data: CreateBacklogItem) => {
    await onUpdate(item.id, data);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(item.id);
      onClose();
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isEditing) {
    return (
      <BacklogItemForm
        isOpen={isOpen}
        onClose={() => setIsEditing(false)}
        onSubmit={handleUpdate}
        initialData={item}
        mode="edit"
      />
    );
  }

  return (
    <>
      <PortalModal
        isOpen={isOpen}
        onClose={onClose}
        title={`#${item.stackPosition} ${item.title}`}
        size="md"
        footer={
          <div className="flex items-center justify-between">
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
            >
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button variant="gold" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <BacklogTypeBadge type={item.type} />
            <BacklogEffortBadge effort={item.effort} />
            <span className="text-xs text-ash capitalize px-2 py-0.5 bg-void-medium rounded">
              {item.status.replace('-', ' ')}
            </span>
          </div>

          {item.description && (
            <div>
              <h4 className="text-xs font-medium text-ash mb-1">Description</h4>
              <p className="text-sm text-pearl-soft whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-ash-border space-y-2">
            {item.pageContext && (
              <div className="flex justify-between text-xs">
                <span className="text-ash">Context</span>
                <code className="px-1.5 py-0.5 bg-void rounded text-gold text-[10px]">
                  {item.pageContext}
                </code>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-ash">Created</span>
              <span className="text-pearl-soft">{formatDate(item.createdAt)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ash">Updated</span>
              <span className="text-pearl-soft">{formatDate(item.updatedAt)}</span>
            </div>
          </div>
        </div>
      </PortalModal>

      {/* Delete Confirmation Modal */}
      <PortalModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Item"
        size="sm"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        }
      >
        <p className="text-pearl-soft">
          Are you sure you want to delete &quot;{item.title}&quot;? This action
          cannot be undone.
        </p>
      </PortalModal>
    </>
  );
}
