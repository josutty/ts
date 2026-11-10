import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '@mocks/node';
import { transferableAbortController } from 'node:util';

const nodeController = transferableAbortController();
const nodeAbortController = nodeController.constructor as typeof AbortController;
const nodeAbortSignal = nodeController.signal.constructor as typeof AbortSignal;

globalThis.AbortController = nodeAbortController;
globalThis.AbortSignal = nodeAbortSignal;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
