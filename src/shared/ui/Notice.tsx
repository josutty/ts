import type { ReactNode } from 'react';

export type NoticeTone = 'info' | 'success' | 'warning' | 'danger';
export interface NoticeProps {
  children: ReactNode;
  tone?: NoticeTone;
  title?: string;
  className?: string;
}
const toneClasses: Record<NoticeTone, string> = {
  info: 'border-border bg-surface text-fg',
  success: 'border-success bg-surface text-fg',
  warning: 'border-warning bg-surface text-fg',
  danger: 'border-danger bg-surface text-fg',
};

export function Notice({ children, tone = 'info', title, className }: NoticeProps) {
  return (
    <div
      className={`rounded-md border p-4 ${toneClasses[tone]} ${className ?? ''}`.trim()}
      role={tone === 'danger' ? 'alert' : 'status'}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      {title ? ' ' : null}
      <div>{children}</div>
    </div>
  );
}
