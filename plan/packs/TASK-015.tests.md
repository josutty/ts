# Context pack — TASK-015 (tests)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Write the tests only; they must FAIL now for a valid reason (assertion, or a `new` file that does not exist yet).
**Before you stop:** run `node tools/task.mjs red TASK-015` once. It must report a valid RED; a "suspect" or "already PASS" result means a test is wrong — fix the test (max 2 rounds).
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-015: pages/analytics — driver score result route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/analytics/ui/DriverAnalytics.tsx | page | coder | new |
| src/pages/analytics/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/analytics.spec.ts | e2e test | test-engineer | new |
| src/pages/analytics/ui/DriverAnalytics.test.tsx | test | test-engineer | new |
## Integration contract
Use `useGetDriverScoreQuery({tripId})`; compose breakdown/certificate/context; loading/error with retry. Protected lazy route `/analytics/:tripId`.
## UI states
Score loading, success, error/retry, certificate submitting/error.
## Tests
Score query states, result tied to trip, download/exit callbacks, date en-IN, E2E smoke/axe/light-dark/mobile/no console.
## Design
Source: inputs/ux/dealer.html#app (authenticated analytics state: `eicherUser=admin`, `eicherTrip` present, then `show('analytics')`)  Spec: analysis/design-spec/dealer-analytics-app.md
Route: /analytics/:tripId
Labels (exact, in order): Step 4 · Driver performance · Driver Analytics · Demonstration driver score and trip event summary · ↓ Download Certificate · Exit to Home · Driver Details · Events During Trip · Driving Style Breakdown
Display rules: score integer `/100`; certificate sample/nonofficial; dates localized en-IN.
## Acceptance
- Labels/order, score detail composition, and retryable error match the spec.
- `node tools/design-spec.mjs compare inputs/ux/dealer.html#app /analytics/demo-trip --start` → 0 blocking differences against the authenticated analytics fixture and `analysis/design-spec/dealer-analytics-app.md`.
## Teardown
RTK Query cleanup automatic.
## Reflections applied
none

## Existing files you need

### src/pages/analytics/ui/DriverAnalytics.tsx
```tsx
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useGetDriverScoreQuery } from '@entities/driver-score';
import { getErrorMessage } from '@shared/api';
import { routes } from '@shared/config';

type ScoreView = {
  score?: number;
  driverName?: string;
  tripId?: string;
  tripDate?: string;
  date?: string;
  events?: Array<{ name?: string; type?: string; value?: string | number }>;
  breakdown?: Record<string, string | number>;
  vehicle?: string;
  distance?: string | number;
  duration?: string | number;
};

function formatDate(value: string | undefined) {
  if (!value) return '–';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN').format(date);
}

export function DriverAnalytics() {
  const { tripId = '' } = useParams<{ tripId: string }>();
  const location = useLocation();
  const routeTripId = tripId || location.pathname.split('/').filter(Boolean).at(-1) || '';
  const { data, error, isLoading, refetch } = useGetDriverScoreQuery({ tripId: routeTripId });
  const [isDownloading, setIsDownloading] = useState(false);
  const score = data as unknown as ScoreView | undefined;
  const demoResult: ScoreView | undefined =
    routeTripId === 'demo-trip' && error
      ? { score: 0, tripId: routeTripId, tripDate: new Date().toISOString() }
      : undefined;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div role="status" aria-label="Loading driver score" aria-busy="true" className="text-fg-muted">
          Loading driver score…
        </div>
      </main>
    );
  }

  if (error && !demoResult) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div
          role="alert"
          className="max-w-md rounded-card border border-border bg-surface-raised p-6 text-center shadow-card"
        >
          <p className="font-semibold text-danger">{getErrorMessage(error)}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-control bg-primary px-5 py-3 font-semibold text-primary-fg"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const result = score ?? demoResult;
  const events = result?.events ?? [];
  const breakdown = result?.breakdown ?? {};

  function downloadCertificate() {
    setIsDownloading(true);
    const certificate = `Driver Analytics\nTrip: ${routeTripId}\nScore: ${result?.score ?? '–'}/100\nSample certificate — nonofficial`;
    const blob = new Blob([certificate], { type: 'text/plain' });
    const url =
      typeof URL.createObjectURL === 'function'
        ? URL.createObjectURL(blob)
        : `data:text/plain;charset=utf-8,${encodeURIComponent(certificate)}`;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `driver-analytics-${routeTripId}.txt`;
    anchor.click();
    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    setIsDownloading(false);
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-fg sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Step 4</p>
            <p className="mt-1 text-sm font-semibold text-fg-muted">Driver performance</p>
            <h1 className="mt-2 text-3xl font-bold text-fg">Driver Analytics</h1>
            <p className="mt-2 text-fg-muted">Demonstration driver score and trip event summary</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadCertificate}
              disabled={isDownloading}
              className="rounded-control bg-primary px-4 py-3 font-semibold text-primary-fg disabled:opacity-60"
            >
              {isDownloading ? 'Preparing certificate…' : '↓ Download Certificate'}
            </button>
            <Link to={routes.home} className="rounded-control border border-border px-4 py-3 font-semibold text-fg">
              Exit to Home
            </Link>
          </div>
        </header>

        <section className="mb-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <p className="text-sm font-semibold text-fg-muted">Driver score</p>
            <p className="mt-2 text-6xl font-bold text-primary" aria-label={`Score ${result?.score ?? '–'} out of 100`}>
              {result?.score ?? '–'}
              <span className="text-2xl text-fg-muted">/100</span>
            </p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-fg-muted">Driver</dt>
                <dd>{result?.driverName ?? '–'}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg-muted">Trip date</dt>
                <dd>{formatDate(result?.tripDate ?? result?.date)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg-muted">Trip</dt>
                <dd>{result?.tripId ?? routeTripId}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg-muted">Vehicle</dt>
                <dd>{result?.vehicle ?? '–'}</dd>
              </div>
            </dl>
          </div>

          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold">Driver Details</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Distance</dt>
                <dd>{result?.distance ?? '–'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Duration</dt>
                <dd>{result?.duration ?? '–'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Certificate</dt>
                <dd>Sample, nonofficial</dd>
              </div>
            </dl>
          </section>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold">Events During Trip</h2>
            {events.length === 0 ? (
              <p className="mt-4 text-fg-muted">–</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {events.map((event, index) => (
                  <li
                    key={`${event.name ?? event.type ?? 'event'}-${index}`}
                    className="flex justify-between gap-4 border-b border-border pb-2"
                  >
                    <span>{event.name ?? event.type ?? '–'}</span>
                    <span className="text-fg-muted">{event.value ?? '–'}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold">Driving Style Breakdown</h2>
            {Object.keys(breakdown).length === 0 ? (
              <p className="mt-4 text-fg-muted">–</p>
            ) : (
              <dl className="mt-4 space-y-3">
                {Object.entries(breakdown).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt>{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

```

### src/pages/analytics/index.ts
```ts
export { DriverAnalytics } from './ui/DriverAnalytics';

```

## Public APIs you may import (signatures)

### src/shared/config/index.ts
```ts
export { env } from './env';
export { routes } from './routes';

```

## Rules

## 5. Testing

- Vitest + RTL, role-first queries (`getByRole`, `getByLabelText`), `user-event` for interaction.
- Render connected components with `renderWithProviders` from `@test/test-utils` (fresh store per test).
- API is mocked ONLY by MSW (`@mocks/node`); per-test overrides via `server.use(...scenarios.x)`.
  Never `vi.mock` the API layer. `onUnhandledRequest: 'error'`.
- No snapshot tests. Deterministic data only (seeded faker fixtures). No real timers without fake timers.
- Fixtures by index via `at(fixtures, i)` from `@mocks/lib` — strict lint forbids `fixtures[0]!`.
- No Vitest globals: import `describe/it/expect/vi` from `vitest`; test/setup.ts calls `cleanup()`.
- **E2E**: Playwright specs in `e2e/`, run against `npm run dev` in mock mode, desktop + mobile
  projects. One smoke spec per route: renders, axe (WCAG 2.2 AA) has no serious/critical violations in
  light AND dark, no horizontal overflow at mobile width, no console errors. Browser-only bugs get an
  e2e regression spec. Vitest never collects `e2e/` (`test.include` in vite.config.ts).
- Coverage (enforced in vite.config.ts): global 70%; `src/features/**` and `src/widgets/**` 80%.
- **Valid RED** = a test fails on an assertion, OR fails because a file listed as `new` in the
  TASK's Files table doesn't exist yet. Any other failure (setup crash, missing mock, syntax) is an invalid RED.


---

One test per feature listed in the TASK's `Acceptance:` bullets. Name the test after the feature.

| Feature | Unit test (Vitest + RTL) | E2E (page TASK) |
|---|---|---|
| frozen column | `getByRole('rowheader', …)` has `sticky left-0` | scroll the grid sideways; first column's x is unchanged |
| grouped headers | group `columnheader` has `colspan` = number of child columns | — |
| editable cell | type + Enter commits (total/value updates), Esc reverts, invalid input reverts on blur | edit one cell, reload: value persisted (when saved) |
| keyboard grid movement | Arrow keys and Enter move focus to the right cell | — |
| previous value ("was N") | input's accessible description is "was N" | — |
| totals / summary | `role="status"` text updates after an edit | — |
| search / filter | typing filters rows and updates the "x of y" count | — |
| dialog | opens on trigger, focus moves inside, Esc closes, focus returns to trigger | axe clean while open |
| dropdown-menu / tabs / select | keyboard: arrows move, Enter selects, Esc closes | — |
| tooltip | shows on focus as well as hover | — |
| virtual-list | only a window of rows is in the DOM; scrolling renders later rows | — |
| toggle-group | click/arrow to an option → it has `data-state="on"` and its effect is applied | — |
| column-visibility | focus "Columns", Enter, pick an item, Esc (the open menu hides the page from screen readers) → column gone | — |
| design labels | the header/button label list `toEqual`s the list in analysis/design-spec (exact text, exact order) | design compare (reviewer) |
| display rule | each rule in analysis/display-rules.md: e.g. low stock has `text-danger`, empty shows "–" | — |


---

PROJECT.md wins for existing projects. Copied into every context pack; costs no tool calls.

| Library | Use | Never (wrong major) |
|---|---|---|
| React 19 | `ref` is a normal prop (no `forwardRef` needed) · `createRoot` · `act` from `react` | `ReactDOM.render`, `react-dom/test-utils` |
| react-router 7 | import from `react-router` · routes from `routes` in `@shared/config` · lazy route `lazy: async () => ({ Component })` | `react-router-dom`, `<Switch>`, `useHistory` |
| Redux Toolkit 2 | `createSlice({ …, selectors })` · `extraReducers: (builder) => …` · `combineSlices` · project's `useAppSelector`/`useAppDispatch` | object-syntax `extraReducers`, `createStore`, plain `useSelector` |
| RTK Query | `baseApi.injectEndpoints` · `build.query<Result, Arg>` · `providesTags`/`invalidatesTags` · `await mutate(arg).unwrap()` | `fetch`/`axios` in components, manual refetch after a mutation |
| zod 4 | `z.email()`, `z.url()` · messages via `{ error: '…' }` · `z.strictObject()` · `zodResolver` from `@hookform/resolvers/zod` | `z.string().email()`, `{ message: '…' }`, `.flatten()` |
| Tailwind 3.4 | `tailwind.config.ts` + `@tailwind base/components/utilities` · semantic token classes only | v4 `@import "tailwindcss"`, `@theme`, `@tailwindcss/vite`, hex or `style=` |
| Vitest 3 | `import { describe, it, expect, vi } from 'vitest'` (globals are OFF) · `vi.fn`/`vi.spyOn`/`vi.mock` | `jest.*`, relying on global `describe` |
| Testing Library 16 + user-event 14 | render via `test/test-utils.tsx` · `screen.getByRole` · `const user = userEvent.setup(); await user.click(…)` | `fireEvent` for user actions, `getByTestId` first, un-awaited `userEvent.click` |
| MSW 2 | `import { http, HttpResponse } from 'msw'` · `http.get(url, () => HttpResponse.json(data))` · `server.use(…)` per test | `rest.*`, `res(ctx.json())` |
| Storybook 8 | CSF3: `const meta = { component, args } satisfies Meta<typeof X>` · `type Story = StoryObj<typeof meta>` · `fn()` from `@storybook/test` | Storybook 9 imports (`storybook/test`), CSF2 `Template.bind` |
| faker 9 | `faker.seed(n)` · `faker.person.fullName()` · `faker.string.uuid()` · `faker.internet.email({ provider: 'example.com' })` | `faker.name.*`, `faker.datatype.uuid()` |
| Playwright 1 + axe | `import AxeBuilder from '@axe-core/playwright'` · `await new AxeBuilder({ page }).analyze()` | `axe-playwright`, `page.waitForTimeout` as a fix |
| ESLint 9 | flat `eslint.config.js` | `.eslintrc*` |

## Templates

### agent-docs/templates/test-engineer.md

Verified on the reference app (typecheck, strict lint, tests, build, Storybook).
Copy them exactly; adapt only names, fields and paths from the TASK.

## 1. test/setup.ts

```typescript
// test/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '@mocks/node';
import { resetDb } from '@mocks/db';

// jsdom lacks matchMedia; applyTheme() and responsive hooks rely on it.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: () => {}, removeListener: () => {},
    addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
  });
}

// Radix primitives (menus, popovers) call these browser APIs that jsdom doesn't implement.
Element.prototype.scrollIntoView ??= () => {};
Element.prototype.hasPointerCapture ??= () => false;
Element.prototype.releasePointerCapture ??= () => {};
globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup(); // explicit: RTL auto-cleanup needs Vitest globals, which we don't enable
  server.resetHandlers();
  resetDb();
});
afterAll(() => server.close());
```

## 2. test/test-utils.tsx

```tsx
// test/test-utils.tsx
import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { makeStore } from '@app/store';

interface ProviderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Parameters<typeof makeStore>[0];
  store?: ReturnType<typeof makeStore>;
  route?: string;
}

/** Fresh store per call (AGENTS.md §5). Returns the store and a user-event instance. */
export function renderWithProviders(ui: ReactElement, { preloadedState, store = makeStore(preloadedState), route = '/', ...options }: ProviderOptions = {}) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...options }) };
}

export * from '@testing-library/react';
```

## 3. connected component — all four data states, retry, mutation

```tsx
// connected component — all four data states, retry, mutation
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { server } from '@mocks/node';
import { scenarios } from '@mocks/scenarios';
import { productFixtures } from '@mocks/fixtures/product';
import { at } from '@mocks/lib';
import { ProductCatalog } from './ProductCatalog';

describe('ProductCatalog', () => {
  it('shows a loading skeleton first', () => {
    server.use(...scenarios.productsSlow);
    renderWithProviders(<ProductCatalog />);
    expect(screen.getByRole('list', { name: 'Loading products' })).toBeInTheDocument();
  });

  it('renders products on success', async () => {
    renderWithProviders(<ProductCatalog />);
    expect(await screen.findByRole('heading', { name: at(productFixtures, 0).name })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(20);
  });

  it('shows the empty state', async () => {
    server.use(...scenarios.productsEmpty);
    renderWithProviders(<ProductCatalog />);
    expect(await screen.findByText('No products match your filters')).toBeInTheDocument();
  });

  it('shows an error with a working retry', async () => {
    server.use(...scenarios.productsServerError);
    const { user } = renderWithProviders(<ProductCatalog />);
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Something went wrong')).toBeInTheDocument();
    server.resetHandlers(); // the next request succeeds
    await user.click(within(alert).getByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('heading', { name: at(productFixtures, 0).name })).toBeInTheDocument();
  });
});
```

## 4. form (excerpt — imports as in the presentational test) — accessible errors, no s

```tsx
// form (excerpt — imports as in the presentational test) — accessible errors, no submit on invalid input
it('shows linked field errors and does not submit invalid input', async () => {
  const onSubmit = vi.fn(() => Promise.resolve());
  const user = userEvent.setup();
  render(<SignInForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText('Email'), 'nope');
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
  const email = screen.getByLabelText('Email');
  expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(email).toHaveAccessibleDescription('Enter a valid email address');
  expect(onSubmit).not.toHaveBeenCalled();
});
```

## 5. e2e/products.spec.ts — page smoke: render, a11y (light + dark), no overflow, no 

```typescript
// e2e/products.spec.ts — page smoke: render, a11y (light + dark), no overflow, no console errors
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('/ (products)', () => {
  test('renders, has no serious a11y violations, and no horizontal overflow', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Products' })).toBeVisible();
    await expect(page.getByRole('article').first()).toBeVisible();

    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('dark mode keeps a11y clean', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
  });
});
```
