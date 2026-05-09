'use client';

import { useState } from 'react';
import { PortalModal, ModalActions } from '@/components/portal/PortalModal';
import type {
  BacklogItem,
  CreateBacklogItem,
  BacklogItemTypeValue,
  BacklogItemStatusValue,
  BacklogItemEffortValue,
} from '@/lib/schemas/backlog';

interface BacklogItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBacklogItem) => Promise<void>;
  initialData?: BacklogItem;
  mode?: 'create' | 'edit';
}

const typeOptions: { value: BacklogItemTypeValue; label: string }[] = [
  { value: 'feature', label: 'Feature' },
  { value: 'bug', label: 'Bug' },
  { value: 'text-change', label: 'Text Change' },
  { value: 'idea', label: 'Idea' },
];

const statusOptions: { value: BacklogItemStatusValue; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'doing', label: 'Doing' },
  { value: 'done', label: 'Done' },
];

const effortOptions: { value: BacklogItemEffortValue | ''; label: string }[] = [
  { value: '', label: 'No estimate' },
  { value: 'XS', label: 'XS (hours)' },
  { value: 'S', label: 'S (1-2 days)' },
  { value: 'M', label: 'M (3-5 days)' },
  { value: 'L', label: 'L (1-2 weeks)' },
  { value: 'XL', label: 'XL (2+ weeks)' },
];

export function BacklogItemForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = 'create',
}: BacklogItemFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [type, setType] = useState<BacklogItemTypeValue>(
    initialData?.type || 'feature'
  );
  const [status, setStatus] = useState<BacklogItemStatusValue>(
    initialData?.status || 'todo'
  );
  const [effort, setEffort] = useState<BacklogItemEffortValue | ''>(
    initialData?.effort || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        type,
        status,
        effort: effort || undefined,
      });
      onClose();
    } catch {
      setError('Failed to save item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setType(initialData?.type || 'feature');
    setStatus(initialData?.status || 'todo');
    setEffort(initialData?.effort || '');
    setError(null);
    onClose();
  };

  const inputClass = `
    w-full px-4 py-3 rounded-lg
    bg-void-medium border border-ash-border
    text-pearl placeholder:text-ash
    focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
    transition-all duration-200
  `;

  const selectClass = `
    w-full px-4 py-3 rounded-lg
    bg-void-medium border border-ash-border
    text-pearl appearance-none cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
    transition-all duration-200
  `;

  return (
    <PortalModal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Add Backlog Item' : 'Edit Backlog Item'}
      size="md"
      footer={
        <ModalActions
          onCancel={handleClose}
          onConfirm={handleSubmit}
          confirmLabel={mode === 'create' ? 'Add Item' : 'Save Changes'}
          isLoading={isSubmitting}
          variant="premium"
        />
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-status-expired/10 border border-status-expired/30 rounded-lg text-sm text-status-expired">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="backlog-title"
            className="block text-sm font-medium text-pearl mb-2"
          >
            Title *
          </label>
          <input
            id="backlog-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of the item"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="backlog-description"
            className="block text-sm font-medium text-pearl mb-2"
          >
            Description
          </label>
          <textarea
            id="backlog-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional details (optional)"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="backlog-type"
              className="block text-sm font-medium text-pearl mb-2"
            >
              Type
            </label>
            <select
              id="backlog-type"
              value={type}
              onChange={(e) => setType(e.target.value as BacklogItemTypeValue)}
              className={selectClass}
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="backlog-status"
              className="block text-sm font-medium text-pearl mb-2"
            >
              Status
            </label>
            <select
              id="backlog-status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as BacklogItemStatusValue)
              }
              className={selectClass}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="backlog-effort"
            className="block text-sm font-medium text-pearl mb-2"
          >
            Effort Estimate
          </label>
          <select
            id="backlog-effort"
            value={effort}
            onChange={(e) =>
              setEffort(e.target.value as BacklogItemEffortValue | '')
            }
            className={selectClass}
          >
            {effortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </PortalModal>
  );
}
