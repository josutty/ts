import type { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ id, label, error, hint, className, required, ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId, props['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-fg" htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        {...props}
        aria-describedby={describedBy}
        aria-invalid={error ? true : props['aria-invalid']}
        className={`min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-fg placeholder:text-muted focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-danger' : ''} ${className ?? ''}`.trim()}
        id={inputId}
        required={required}
      />
      {hint ? (
        <p className="text-sm text-muted" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-danger" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
