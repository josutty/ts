import type { Route } from '@shared/api/generated/models';

export const buildRoute = (overrides: Partial<Route> = {}): Route => ({
  id: 'route-1',
  label: 'Chennai → Bengaluru',
  ...overrides,
});
