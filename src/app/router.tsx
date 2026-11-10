import { createBrowserRouter } from 'react-router';
import { routes } from '@shared/config';
import { RouteErrorFallback } from './providers/RouteErrorFallback';

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-fg-muted">404</p>
      <h1 className="text-3xl font-bold text-fg">Page not found</h1>
      <p className="max-w-md text-body text-fg-muted">The page you requested does not exist.</p>
      <a className="rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg" href={routes.home}>
        Return home
      </a>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: routes.login,
    lazy: async () => {
      const { LoginPage } = await import('@pages/login');
      return { Component: LoginPage };
    },
    errorElement: <RouteErrorFallback />,
  },
  {
    path: routes.notFound,
    element: <NotFoundPage />,
    errorElement: <RouteErrorFallback />,
  },
]);
