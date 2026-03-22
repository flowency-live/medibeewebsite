/**
 * PortalModal
 *
 * Premium modal component for the Medibee portal.
 * Dark theme with gold accents and smooth animations.
 */

'use client';

import { type ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'premium';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function PortalModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  variant = 'default',
}: PortalModalProps): ReactNode {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  // Use portal to ensure modal is at root level
  if (typeof window === 'undefined') return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="
          absolute inset-0
          bg-void/80
          backdrop-blur-md
          animate-[fadeIn_0.2s_ease-out]
        "
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container with scroll */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Modal card */}
        <div
          className={`
            relative w-full ${sizeClasses[size]}
            my-auto
            animate-[modalSlideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]
            ${variant === 'premium' ? 'premium-modal' : ''}
          `}
        >
          {/* Premium variant: subtle gold border glow */}
          {variant === 'premium' && (
            <div
              className="
                absolute -inset-[1px] rounded-[18px]
                bg-gradient-to-br from-gold/30 via-gold-soft/20 to-gold/30
                blur-[1px]
              "
              aria-hidden="true"
            />
          )}

          {/* Card body */}
          <div
            className={`
              relative
              bg-gradient-to-b from-void-medium via-void-medium to-void-light
              rounded-[17px]
              shadow-[0_8px_32px_rgba(0,0,0,0.4),0_24px_64px_rgba(0,0,0,0.3)]
              overflow-hidden
              ${variant === 'elevated' ? 'ring-1 ring-ash-border' : ''}
              ${variant === 'premium' ? 'ring-1 ring-gold/20' : ''}
            `}
          >
            {/* Header */}
            <div
              className={`
                px-6 sm:px-8 pt-6 sm:pt-8 pb-4
                ${variant === 'premium'
                  ? 'bg-gradient-to-r from-void-medium via-gold/5 to-void-medium'
                  : 'bg-void-medium'
                }
              `}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="
                  absolute top-4 right-4
                  w-8 h-8 rounded-full
                  flex items-center justify-center
                  text-ash
                  hover:text-pearl hover:bg-void-elevated
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-gold/30
                "
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Title */}
              <h2
                id="modal-title"
                className="
                  font-body text-[1.625rem] sm:text-[1.875rem] font-semibold
                  text-pearl
                  tracking-[-0.02em]
                  leading-tight
                  pr-8
                "
              >
                {title}
              </h2>

              {/* Subtitle */}
              {subtitle && (
                <p className="mt-2 font-body text-[0.9375rem] text-ash leading-relaxed">
                  {subtitle}
                </p>
              )}

              {/* Decorative line with gold accent */}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-gradient-to-r from-gold to-gold-soft rounded-full" />
                <div className="h-px flex-1 bg-ash-border" />
              </div>
            </div>

            {/* Content area */}
            <div className="px-6 sm:px-8 py-5">
              {children}
            </div>

            {/* Footer with subtle separator */}
            {footer && (
              <div
                className="
                  px-6 sm:px-8 py-5
                  bg-gradient-to-b from-void-light/50 to-void-light
                  border-t border-ash-border/60
                "
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

/**
 * Pre-styled modal footer with action buttons
 */
interface ModalActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'danger' | 'premium';
}

export function ModalActions({
  onCancel,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isLoading = false,
  disabled = false,
  variant = 'default',
}: ModalActionsProps): ReactNode {
  const confirmClasses = {
    default: `
      bg-gradient-to-b from-tier-colony to-tier-colony/80
      text-white
      shadow-[0_2px_8px_rgba(129,140,248,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_4px_12px_rgba(129,140,248,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
    `,
    danger: `
      bg-gradient-to-b from-status-expired to-status-expired/80
      text-white
      shadow-[0_2px_8px_rgba(248,113,113,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_4px_12px_rgba(248,113,113,0.4)]
    `,
    premium: `
      bg-gradient-to-b from-gold to-gold-dim
      text-void
      shadow-[0_2px_8px_rgba(212,175,55,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]
      hover:shadow-[0_4px_12px_rgba(212,175,55,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]
      hover:from-gold-light hover:to-gold
    `,
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="
          flex-1 py-3 px-5 rounded-xl
          font-body text-[0.9375rem] font-medium
          text-pearl
          bg-void-medium
          border border-ash-border
          shadow-[0_1px_2px_rgba(0,0,0,0.2)]
          hover:bg-void-elevated hover:border-ash
          active:scale-[0.98]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-gold/30
        "
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={isLoading || disabled}
        className={`
          flex-1 py-3 px-5 rounded-xl
          font-body text-[0.9375rem] font-medium
          ${confirmClasses[variant]}
          active:scale-[0.98]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold/50
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          confirmLabel
        )}
      </button>
    </div>
  );
}

/**
 * Premium textarea with refined styling
 */
interface ModalTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  helperText?: string;
}

export function ModalTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  helperText,
}: ModalTextareaProps): ReactNode {
  return (
    <div className="space-y-2">
      <label className="block font-body text-[0.875rem] font-medium text-pearl">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="
          w-full px-4 py-3.5
          rounded-xl
          border border-ash-border
          bg-void-medium
          font-body text-[0.9375rem] text-pearl
          placeholder:text-ash/60
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]
          focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold
          hover:border-ash
          transition-all duration-200
          resize-none
        "
      />
      {helperText && (
        <p className="text-[0.8125rem] text-ash">{helperText}</p>
      )}
    </div>
  );
}
