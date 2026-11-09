import type { AnchorHTMLAttributes } from 'react';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

export function SkipLink({
  targetId = 'main-content',
  children = 'Skip to main content',
  className,
  ...props
}: SkipLinkProps) {
  return (
    <a
      {...props}
      className={`absolute left-2 top-2 z-50 -translate-y-[calc(100%+0.5rem)] rounded-md bg-primary px-4 py-2 font-medium text-on-primary focus:translate-y-0 focus-visible:ring-2 focus-visible:ring-focus ${className ?? ''}`.trim()}
      href={props.href ?? `#${targetId}`}
    >
      {children}
    </a>
  );
}
