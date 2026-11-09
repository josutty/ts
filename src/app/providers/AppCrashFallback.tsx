import type { FallbackProps } from 'react-error-boundary';
import { logger } from '@shared/lib/logger';

export function AppCrashFallback({ error }: FallbackProps) {
  logger.error('Application crashed', { error });

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold text-fg">Something went wrong</h1>
      <p className="max-w-md text-body text-fg-muted">Please reload the application and try again.</p>
      <button
        className="rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg"
        onClick={() => window.location.reload()}
        type="button"
      >
        Reload application
      </button>
    </main>
  );
}
