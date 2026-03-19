/**
 * PortalModal
 *
 * Premium modal component for the Medibee portal.
 * Designed with "Refined Medical Luxury" aesthetic - elegant,
 * trustworthy, and distinctively premium.
 *
 * Features:
 * - Proper scroll behavior for long content
 * - Rich visual depth with layered shadows
 * - Gold accent details
 * - Refined typography hierarchy
 * - Smooth enter/exit animations
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
      {/* Backdrop with refined blur */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br from-portal-graphite/60 via-portal-blue-dark/50 to-portal-graphite/60
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
                bg-gradient-to-br from-rich-gold/30 via-soft-gold/20 to-rich-gold/30
                blur-[1px]
              "
              aria-hidden="true"
            />
          )}

          {/* Card body */}
          <div
            className={`
              relative
              bg-gradient-to-b from-white via-white to-surface-1
              rounded-[17px]
              shadow-[0_8px_32px_rgba(0,0,0,0.12),0_24px_64px_rgba(0,0,0,0.08)]
              overflow-hidden
              ${variant === 'elevated' ? 'ring-1 ring-portal-stone' : ''}
              ${variant === 'premium' ? 'ring-1 ring-rich-gold/20' : ''}
            `}
          >
            {/* Header with subtle gradient */}
            <div
              className={`
                px-6 sm:px-8 pt-6 sm:pt-8 pb-4
                ${variant === 'premium'
                  ? 'bg-gradient-to-r from-surface-0 via-soft-gold/5 to-surface-0'
                  : 'bg-surface-0'
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
                  text-portal-graphite-muted
                  hover:text-portal-graphite hover:bg-portal-stone
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-portal-teal/30
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
                  font-display text-[1.625rem] sm:text-[1.875rem]
                  text-portal-graphite
                  tracking-[-0.02em]
                  leading-tight
                  pr-8
                "
              >
                {title}
              </h2>

              {/* Subtitle */}
              {subtitle && (
                <p className="mt-2 font-body text-[0.9375rem] text-portal-graphite-muted leading-relaxed">
                  {subtitle}
                </p>
              )}

              {/* Decorative line with gold accent */}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-gradient-to-r from-rich-gold to-soft-gold rounded-full" />
                <div className="h-px flex-1 bg-portal-stone" />
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
                  bg-gradient-to-b from-surface-1/50 to-surface-1
                  border-t border-portal-stone/60
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
      bg-gradient-to-b from-portal-blue to-portal-blue-dark
      text-white
      shadow-[0_2px_8px_rgba(59,74,107,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_4px_12px_rgba(59,74,107,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:from-portal-blue-light hover:to-portal-blue
    `,
    danger: `
      bg-gradient-to-b from-portal-alert to-[#8a4a4a]
      text-white
      shadow-[0_2px_8px_rgba(154,90,90,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_4px_12px_rgba(154,90,90,0.4)]
    `,
    premium: `
      bg-gradient-to-b from-rich-gold to-[#c9a94a]
      text-portal-graphite
      shadow-[0_2px_8px_rgba(229,197,92,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]
      hover:shadow-[0_4px_12px_rgba(229,197,92,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]
      hover:from-soft-gold hover:to-rich-gold
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
          text-portal-graphite
          bg-surface-0
          border border-portal-stone
          shadow-[0_1px_2px_rgba(0,0,0,0.04)]
          hover:bg-portal-stone/50 hover:border-portal-graphite-muted/30
          active:scale-[0.98]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-portal-teal/30
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
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-portal-teal/50
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
      <label className="block font-body text-[0.875rem] font-medium text-portal-graphite">
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
          border border-portal-stone
          bg-surface-0
          font-body text-[0.9375rem] text-portal-graphite
          placeholder:text-portal-graphite-muted/60
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]
          focus:outline-none focus:ring-2 focus:ring-portal-teal/30 focus:border-portal-teal
          hover:border-portal-graphite-muted/50
          transition-all duration-200
          resize-none
        "
      />
      {helperText && (
        <p className="text-[0.8125rem] text-portal-graphite-muted">{helperText}</p>
      )}
    </div>
  );
}
