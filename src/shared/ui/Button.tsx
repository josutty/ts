import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
}

export function Button({
  loading = false,
  loadingLabel = 'Loading…',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-on-primary transition-opacity focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${className ?? ''}`.trim()}
      disabled={disabled || loading}
      type={props.type ?? 'button'}
    >
      {loading ? loadingLabel : children}
    </button>
  );
}
