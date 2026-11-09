import type { Session } from '@shared/api/generated/models';

export const buildSession = (overrides: Partial<Session> = {}): Session => ({
  userId: 'user-1',
  username: 'admin',
  displayName: 'Admin',
  ...overrides,
});
