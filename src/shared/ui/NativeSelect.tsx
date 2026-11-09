import type { SelectHTMLAttributes } from 'react';

export interface NativeSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: NativeSelectOption[];
  error?: string;
  hint?: string;
}

export function NativeSelect({ id, label, options, error, hint, className, required, ...props }: NativeSelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId, props['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-fg" htmlFor={selectId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        {...props}
        aria-describedby={describedBy}
        aria-invalid={error ? true : props['aria-invalid']}
        className={`min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-fg focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-danger' : ''} ${className ?? ''}`.trim()}
        id={selectId}
        required={required}
      >
        {options.map((option) => (
          <option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
