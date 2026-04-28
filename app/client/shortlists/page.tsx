'use client';

/**
 * Shortlists Page
 *
 * List all shortlists with create/delete functionality.
 * Uses dark theme with void/gold color system.
 */

import * as React from 'react';
import Link from 'next/link';
import { useAuth, isClient } from '@/lib/auth';
import { shortlistsApi } from '@/lib/api';
import { Button, AlertBanner } from '@/components/ui';

interface Shortlist {
  shortlistId: string;
  name: string;
  description?: string;
  candidateCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function ShortlistsPage() {
  const { state } = useAuth();

  const [shortlists, setShortlists] = React.useState<Shortlist[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // Create form state
  const [newName, setNewName] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

  const loadShortlists = React.useCallback(async () => {
    setIsLoading(true);

    const response = await shortlistsApi.list();

    if (response.success && response.data) {
      const data = response.data as { shortlists: Shortlist[] };
      setShortlists(data.shortlists);
    }

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    loadShortlists();
  }, [loadShortlists]);

  const handleCreate = async () => {
    if (!newName.trim()) {
      setError('Please enter a shortlist name');
      return;
    }

    setIsCreating(true);
    setError('');

    const response = await shortlistsApi.create({
      name: newName.trim(),
    });

    if (response.success) {
      setShowCreateModal(false);
      setNewName('');
      setNewDescription('');
      setSuccess('Shortlist created successfully!');
      await loadShortlists();
    } else {
      setError((response as { message?: string }).message || 'Failed to create shortlist.');
    }

    setIsCreating(false);
  };

  const handleDelete = async (shortlistId: string) => {
    const response = await shortlistsApi.delete(shortlistId);

    if (response.success) {
      setDeleteId(null);
      setSuccess('Shortlist deleted successfully!');
      await loadShortlists();
    } else {
      setError((response as { message?: string }).message || 'Failed to delete shortlist.');
    }
  };

  if (!isClient(state)) {
    return null;
  }

  const { subscription } = state;

  if (!subscription) {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <h1 className="font-display text-display-sm text-pearl mb-4">Subscription Required</h1>
        <p className="font-body text-body-md text-ash mb-6">
          You need an active subscription to manage shortlists.
        </p>
        <Link href="/client/subscription">
          <Button>View Plans</Button>
        </Link>
      </div>
    );
  }

  // Tier limits
  const tierLimits: Record<string, { shortlists: number; candidates: number }> = {
    Bronze: { shortlists: 1, candidates: 10 },
    Silver: { shortlists: 3, candidates: 25 },
    Gold: { shortlists: -1, candidates: -1 }, // Unlimited
  };

  const limits = tierLimits[subscription.tier] || tierLimits.Bronze;
  const canCreateMore = limits.shortlists === -1 || shortlists.length < limits.shortlists;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-display-sm text-pearl mb-2">Shortlists</h1>
          <p className="font-body text-body-md text-ash">
            {limits.shortlists === -1
              ? 'Unlimited shortlists'
              : `${shortlists.length} of ${limits.shortlists} shortlists used`}
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} disabled={!canCreateMore} className="w-full sm:w-auto">
          Create Shortlist
        </Button>
      </div>

      {/* Alerts */}
      {error && (
        <AlertBanner type="error" className="mb-6">
          {error}
        </AlertBanner>
      )}

      {success && (
        <AlertBanner type="success" className="mb-6">
          {success}
        </AlertBanner>
      )}

      {!canCreateMore && (
        <AlertBanner type="warning" className="mb-6">
          You&apos;ve reached your shortlist limit.{' '}
          <Link href="/client/subscription" className="text-gold hover:underline">
            Upgrade your plan
          </Link>{' '}
          to create more.
        </AlertBanner>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-ash/20 rounded-full mx-auto" />
          </div>
          <p className="font-body text-body-md text-ash">Loading shortlists...</p>
        </div>
      ) : shortlists.length === 0 ? (
        <div className="text-center py-12 bg-void-medium rounded-card border border-ash-border">
          <p className="font-body text-body-md text-pearl mb-2">No shortlists yet</p>
          <p className="font-body text-body-sm text-ash mb-6">
            Create your first shortlist to start organising candidates
          </p>
          <Button onClick={() => setShowCreateModal(true)}>Create Shortlist</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlists.map((shortlist) => (
            <div
              key={shortlist.shortlistId}
              className="bg-void-medium p-6 rounded-card border border-ash-border hover:border-gold/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <Link
                  href={`/client/shortlists/${shortlist.shortlistId}`}
                  className="font-display text-lg text-pearl hover:text-gold transition-colors"
                >
                  {shortlist.name}
                </Link>
                <button
                  onClick={() => setDeleteId(shortlist.shortlistId)}
                  className="text-ash hover:text-status-expired transition-colors"
                  aria-label="Delete shortlist"
                >
                  ✕
                </button>
              </div>

              {shortlist.description && (
                <p className="font-body text-body-sm text-ash mb-4 line-clamp-2">
                  {shortlist.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="font-body text-body-sm text-pearl-soft">
                  {shortlist.candidateCount} candidate
                  {shortlist.candidateCount !== 1 ? 's' : ''}
                </span>
                <span className="font-body text-body-sm text-ash">
                  {new Date(shortlist.updatedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-ash-border/50">
                <Link href={`/client/shortlists/${shortlist.shortlistId}`}>
                  <Button variant="secondary" className="w-full">
                    View Shortlist
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-void-medium p-6 rounded-card border border-ash-border max-w-md w-full mx-4">
            <h2 className="font-display text-lg text-pearl mb-4">Create Shortlist</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-body text-body-sm text-pearl-soft mb-1">
                  Name <span className="text-status-expired">*</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Mental Health Specialists"
                  className="w-full px-4 py-3 bg-void border border-ash-border rounded-card font-body text-body-md text-pearl placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-body text-body-sm text-pearl-soft mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full px-4 py-3 bg-void border border-ash-border rounded-card font-body text-body-md text-pearl placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={isCreating} className="w-full sm:w-auto">
                {isCreating ? 'Creating...' : 'Create Shortlist'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-void-medium p-6 rounded-card border border-ash-border max-w-md w-full mx-4">
            <h2 className="font-display text-lg text-pearl mb-4">Delete Shortlist?</h2>
            <p className="font-body text-body-md text-ash mb-6">
              This will permanently delete this shortlist and remove all candidates from it. This
              action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <Button variant="secondary" onClick={() => setDeleteId(null)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteId)} className="w-full sm:w-auto">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
