import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import { logger } from '@shared/lib/logger';

export function RouteErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();
  logger.error('Route failed', { error });

  const message =
    isRouteErrorResponse(error) && error.status === 404
      ? 'The page you requested does not exist.'
      : 'Please return to the previous page or reload the application.';

  return (
    <main
      role="alert"
      className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <h1 className="text-3xl font-bold text-fg">Unable to load this page</h1>
      <p className="max-w-md text-body text-fg-muted">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className="rounded-control border border-border-strong px-4 py-2 font-semibold text-fg"
          onClick={() => navigate(-1)}
          type="button"
        >
          Go back
        </button>
        <button
          className="rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg"
          onClick={() => window.location.reload()}
          type="button"
        >
          Reload application
        </button>
      </div>
    </main>
  );
}
