'use client';

/**
 * Candidate Credentials Page (Credential Wallet)
 *
 * Per design language: "Trust is the core product. This needs to feel
 * secure and professional."
 */

import { useState, useCallback } from 'react';
import { useAuth, isCandidate } from '@/lib/auth';
import {
  PortalCard,
  CredentialCard,
  AddCredentialCard,
  StatusBadge,
  type Credential,
} from '@/components/portal';

// Mock data - would come from API
const mockCredentials: Credential[] = [
  {
    id: 'cred-1',
    type: 'dbs',
    name: 'Enhanced DBS Certificate',
    status: 'verified',
    verifiedDate: '2024-01-15',
    expiryDate: '2027-01-15',
    documentKey: 'credentials/dbs-123.pdf',
  },
  {
    id: 'cred-2',
    type: 'rtw',
    name: 'Right to Work - British Passport',
    status: 'under-review',
    documentKey: 'credentials/rtw-456.pdf',
  },
  {
    id: 'cred-3',
    type: 'nvq',
    name: 'NVQ Level 3 Health and Social Care',
    status: 'verified',
    verifiedDate: '2023-11-20',
    documentKey: 'credentials/nvq-789.pdf',
  },
  {
    id: 'cred-4',
    type: 'training',
    name: 'Moving and Handling Certificate',
    status: 'expiring',
    verifiedDate: '2023-06-01',
    expiryDate: '2024-06-01',
    documentKey: 'credentials/training-101.pdf',
  },
];

// Credential types that can be added
const credentialTypes: Credential['type'][] = [
  'dbs',
  'rtw',
  'nvq',
  'training',
  'reference',
];

interface UploadModalProps {
  credentialType: Credential['type'];
  onClose: () => void;
  onUpload: (file: File, name: string) => Promise<void>;
}

function UploadModal({ credentialType, onClose, onUpload }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
      setFile(droppedFile);
      if (!name) {
        setName(droppedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  }, [name]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!name) {
        setName(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async () => {
    if (!file || !name) return;
    setIsUploading(true);
    await onUpload(file, name);
    setIsUploading(false);
    onClose();
  };

  const typeLabels: Record<Credential['type'], string> = {
    dbs: 'DBS Certificate',
    rtw: 'Right to Work',
    nvq: 'NVQ Certificate',
    training: 'Training Certificate',
    reference: 'Reference',
    other: 'Document',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-portal-graphite/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-0 rounded-card-lg shadow-card-elevated w-full max-w-lg animate-scale-in">
        <div className="p-6">
          <h2 className="font-portal text-portal-name text-portal-graphite mb-2">
            Upload {typeLabels[credentialType]}
          </h2>
          <p className="font-portal text-portal-body text-portal-graphite-muted mb-6">
            Upload your document for verification. Accepted formats: PDF, JPG, PNG.
          </p>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-card-lg p-8 text-center
              transition-colors duration-portal
              ${dragOver
                ? 'border-portal-teal bg-portal-teal/5'
                : file
                  ? 'border-portal-verified bg-portal-verified/5'
                  : 'border-portal-stone bg-surface-1'
              }
            `}
          >
            {file ? (
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-card bg-portal-verified/10 flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <p className="font-portal text-portal-body text-portal-graphite font-medium">
                  {file.name}
                </p>
                <p className="font-portal text-portal-meta text-portal-graphite-muted">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={() => setFile(null)}
                  className="font-portal text-portal-meta text-portal-alert hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-card bg-portal-stone flex items-center justify-center">
                  <span className="text-2xl">📤</span>
                </div>
                <div>
                  <p className="font-portal text-portal-body text-portal-graphite">
                    Drag and drop your file here
                  </p>
                  <p className="font-portal text-portal-meta text-portal-graphite-muted">
                    or
                  </p>
                </div>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <span className="
                    cursor-pointer px-4 py-2 rounded-card
                    font-portal text-portal-meta font-medium
                    bg-portal-blue text-white hover:bg-portal-blue-dark
                    transition-colors duration-portal
                  ">
                    Browse Files
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Document name input */}
          <div className="mt-6">
            <label className="block font-portal text-portal-meta text-portal-graphite mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`e.g., ${typeLabels[credentialType]}`}
              className="
                w-full px-4 py-3 rounded-card border border-portal-stone
                font-portal text-portal-body text-portal-graphite
                focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
                transition-colors duration-portal
              "
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-portal-stone">
            <button
              onClick={onClose}
              className="
                flex-1 py-3 px-4 rounded-card
                font-portal text-portal-body font-medium
                bg-surface-1 text-portal-graphite border border-portal-stone
                hover:bg-portal-stone
                transition-colors duration-portal
              "
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!file || !name || isUploading}
              className="
                flex-1 py-3 px-4 rounded-card
                font-portal text-portal-body font-medium
                bg-portal-blue text-white
                hover:bg-portal-blue-dark
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-portal
              "
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateCredentialsPage() {
  const { state } = useAuth();
  const [credentials, setCredentials] = useState(mockCredentials);
  const [uploadType, setUploadType] = useState<Credential['type'] | null>(null);

  if (!isCandidate(state)) {
    return null;
  }

  // Group credentials by status
  const verifiedCredentials = credentials.filter((c) => c.status === 'verified');
  const pendingCredentials = credentials.filter((c) =>
    c.status === 'pending' || c.status === 'under-review'
  );
  const alertCredentials = credentials.filter((c) =>
    c.status === 'expiring' || c.status === 'expired'
  );

  // Find credential types not yet uploaded
  const uploadedTypes = credentials.map((c) => c.type);
  const missingTypes = credentialTypes.filter((t) => !uploadedTypes.includes(t));

  const handleView = (credential: Credential) => {
    console.log('View credential:', credential.id);
    // Would open document viewer or download
  };

  const handleReplace = (credential: Credential) => {
    setUploadType(credential.type);
  };

  const handleUpload = async (file: File, name: string) => {
    // Mock upload - would call API
    console.log('Uploading:', file.name, 'as', name, 'for type', uploadType);

    // Add new credential to state (mock)
    if (uploadType) {
      const newCredential: Credential = {
        id: `cred-${Date.now()}`,
        type: uploadType,
        name,
        status: 'pending',
        documentKey: `credentials/${file.name}`,
      };
      setCredentials((prev) => [...prev, newCredential]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="font-portal text-portal-name text-portal-graphite mb-2">
          Credential Wallet
        </h1>
        <p className="font-portal text-portal-body text-portal-graphite-muted">
          Upload and manage your professional credentials. Verified documents help
          you stand out to care providers.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-portal-verified/10 rounded-full">
          <span className="w-2 h-2 rounded-full bg-portal-verified" />
          <span className="font-portal text-portal-meta text-portal-verified font-medium">
            {verifiedCredentials.length} Verified
          </span>
        </div>
        {pendingCredentials.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-portal-pending/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-portal-pending" />
            <span className="font-portal text-portal-meta text-portal-pending font-medium">
              {pendingCredentials.length} Pending
            </span>
          </div>
        )}
        {alertCredentials.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-portal-alert/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-portal-alert" />
            <span className="font-portal text-portal-meta text-portal-alert font-medium">
              {alertCredentials.length} Need Attention
            </span>
          </div>
        )}
      </div>

      {/* Alert for expiring/expired credentials */}
      {alertCredentials.length > 0 && (
        <div className="p-4 bg-portal-alert/10 border border-portal-alert/20 rounded-card">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h2 className="font-portal text-portal-body font-medium text-portal-graphite mb-1">
                Some credentials need your attention
              </h2>
              <p className="font-portal text-portal-meta text-portal-graphite-light">
                {alertCredentials.length} credential(s) are expiring soon or have expired.
                Please upload updated documents to maintain your verified status.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {credentials.map((credential) => (
          <CredentialCard
            key={credential.id}
            credential={credential}
            onView={handleView}
            onReplace={handleReplace}
          />
        ))}
      </div>

      {/* Add Missing Credentials */}
      {missingTypes.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-portal text-portal-heading text-portal-graphite">
            Add More Credentials
          </h2>
          <p className="font-portal text-portal-body text-portal-graphite-muted">
            Complete your credential wallet to increase your visibility to care providers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missingTypes.map((type) => (
              <AddCredentialCard
                key={type}
                type={type}
                onClick={() => setUploadType(type)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Information Section */}
      <PortalCard
        title="About Credential Verification"
        className="bg-surface-1"
        elevation="flat"
      >
        <div className="space-y-4 font-portal text-portal-body text-portal-graphite-light">
          <p>
            When you upload a credential, our team will review it within 24-48 hours.
            Once verified, a green &quot;Verified&quot; badge will appear on your profile,
            visible to care providers.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <StatusBadge status="verified" label="Verified" size="sm" />
              <span className="text-portal-meta">Document confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="under-review" label="Under Review" size="sm" />
              <span className="text-portal-meta">Being checked</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="expiring" label="Expiring" size="sm" />
              <span className="text-portal-meta">Needs renewal</span>
            </div>
          </div>
        </div>
      </PortalCard>

      {/* Upload Modal */}
      {uploadType && (
        <UploadModal
          credentialType={uploadType}
          onClose={() => setUploadType(null)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}
