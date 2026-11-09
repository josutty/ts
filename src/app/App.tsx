import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router/dom';
import { store } from './store';
import { router } from './router';
import { AppCrashFallback } from './providers/AppCrashFallback';

export function App() {
  return (
    <ErrorBoundary FallbackComponent={AppCrashFallback}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}
