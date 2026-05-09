'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import type {
  BacklogItemTypeValue,
  BacklogItemEffortValue,
} from '@/lib/schemas/backlog';

const typeOptions: { value: BacklogItemTypeValue; label: string; icon: string }[] = [
  { value: 'bug', label: 'Bug', icon: '🐛' },
  { value: 'feature', label: 'Feature', icon: '✨' },
  { value: 'text-change', label: 'Text Change', icon: '📝' },
  { value: 'idea', label: 'Idea', icon: '💡' },
];

const effortOptions: { value: BacklogItemEffortValue | ''; label: string }[] = [
  { value: '', label: 'No estimate' },
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
];

export function QuickAddBacklog() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<BacklogItemTypeValue>('bug');
  const [effort, setEffort] = useState<BacklogItemEffortValue | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('bug');
    setEffort('');
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/backlog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          type,
          status: 'todo',
          effort: effort || undefined,
          pageContext: pathname,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create item');
      }

      setSuccess(true);
      setTimeout(() => {
        resetForm();
        setIsOpen(false);
      }, 1000);
    } catch {
      setError('Failed to save. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  if (!mounted) return null;

  const inputClass = `
    w-full px-3 py-2 rounded-lg text-sm
    bg-void-medium border border-ash-border
    text-pearl placeholder:text-ash
    focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
    transition-all duration-200
  `;

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40',
          'w-14 h-14 rounded-full',
          'bg-gold hover:bg-gold-light',
          'text-void shadow-lg',
          'flex items-center justify-center',
          'transition-all duration-200',
          'hover:scale-110 active:scale-95',
          'group'
        )}
        title="Quick add to backlog"
        aria-label="Quick add to backlog"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <div
            className={cn(
              'absolute right-0 top-0 bottom-0 w-full max-w-md',
              'bg-void-light border-l border-ash-border',
              'flex flex-col',
              'animate-in slide-in-from-right duration-200'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-ash-border">
              <div className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                <h2 className="text-lg font-semibold text-pearl">Quick Add</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-ash hover:text-pearl rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Page Context Badge */}
              <div className="flex items-center gap-2 text-xs text-ash">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Adding from:</span>
                <code className="px-2 py-0.5 bg-void rounded text-gold">{pathname}</code>
              </div>

              {/* Success Message */}
              {success && (
                <div className="p-3 bg-status-active/10 border border-status-active/30 rounded-lg text-sm text-status-active flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Added to backlog!
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-status-expired/10 border border-status-expired/30 rounded-lg text-sm text-status-expired">
                  {error}
                </div>
              )}

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-pearl mb-2">What is it?</label>
                <div className="grid grid-cols-2 gap-2">
                  {typeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setType(option.value)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium',
                        'border transition-all duration-200',
                        'flex items-center gap-2',
                        type === option.value
                          ? 'bg-gold/10 border-gold text-gold'
                          : 'bg-void-medium border-ash-border text-pearl hover:border-ash-border-light'
                      )}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="quick-title" className="block text-sm font-medium text-pearl mb-2">
                  Title *
                </label>
                <input
                  id="quick-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description..."
                  className={inputClass}
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="quick-desc" className="block text-sm font-medium text-pearl mb-2">
                  Details (optional)
                </label>
                <textarea
                  id="quick-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Any additional context..."
                  rows={3}
                  className={inputClass + ' resize-none'}
                />
              </div>

              {/* Effort */}
              <div>
                <label htmlFor="quick-effort" className="block text-sm font-medium text-pearl mb-2">
                  Effort
                </label>
                <div className="flex gap-2">
                  {effortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setEffort(option.value)}
                      className={cn(
                        'px-3 py-1.5 rounded text-xs font-medium',
                        'border transition-all duration-200',
                        effort === option.value
                          ? 'bg-gold/10 border-gold text-gold'
                          : 'bg-void-medium border-ash-border text-ash hover:text-pearl'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-ash-border bg-void">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || success}
                className={cn(
                  'w-full py-3 rounded-lg font-medium',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-2',
                  isSubmitting || success
                    ? 'bg-ash/20 text-ash cursor-not-allowed'
                    : 'bg-gold hover:bg-gold-light text-void'
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Adding...
                  </>
                ) : success ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Added!
                  </>
                ) : (
                  <>Add to Backlog</>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
