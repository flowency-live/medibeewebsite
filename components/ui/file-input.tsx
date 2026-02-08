import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FileInputProps {
  label: string;
  name: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, name, accept, onChange, error, hint, required, className }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const errorId = `${name}-error`;
    const hintId = `${name}-hint`;

    const handleFileChange = (file: File | null) => {
      setFileName(file?.name ?? null);
      onChange?.(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      handleFileChange(file);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0] ?? null;
      if (file && inputRef.current) {
        // Validate file type if accept is specified
        if (accept) {
          const acceptedTypes = accept.split(',').map((t) => t.trim());
          const fileType = file.type;
          const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
          const isValid = acceptedTypes.some(
            (type) =>
              type === fileType ||
              type === fileExtension ||
              (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '')))
          );
          if (!isValid) {
            return;
          }
        }
        handleFileChange(file);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      handleFileChange(null);
    };

    return (
      <div className={cn('space-y-2', className)}>
        <label className="font-body text-body-sm text-ink block">
          {label}
          {required && (
            <span className="text-red-600 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative border-2 border-dashed p-6 cursor-pointer transition-colors',
            'flex flex-col items-center justify-center text-center',
            isDragging
              ? 'border-rich-gold bg-soft-gold/10'
              : error
                ? 'border-red-600 bg-red-50'
                : 'border-neutral-grey/50 hover:border-slate-blue'
          )}
        >
          <input
            ref={(el) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
            }}
            type="file"
            name={name}
            accept={accept}
            onChange={handleInputChange}
            className="sr-only"
            aria-invalid={!!error}
            aria-describedby={cn(error && errorId, hint && hintId)}
          />

          {fileName ? (
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-rich-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="square"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="font-body text-body-md text-ink">{fileName}</span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-neutral-grey hover:text-red-600 transition-colors"
                aria-label="Remove file"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <svg
                className="w-10 h-10 text-neutral-grey mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="square"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-body text-body-md text-ink mb-1">
                Click to upload or drag and drop
              </span>
              <span className="font-body text-body-sm text-neutral-grey">
                PDF, DOC, or DOCX (max 5MB)
              </span>
            </>
          )}
        </div>
        {hint && !error && (
          <p id={hintId} className="font-body text-body-sm text-neutral-grey">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="font-body text-body-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
