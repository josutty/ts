# Context pack — TASK-011 (tests)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Write the tests only; they must FAIL now for a valid reason (assertion, or a `new` file that does not exist yet).
**Before you stop:** run `node tools/task.mjs red TASK-011` once. It must report a valid RED; a "suspect" or "already PASS" result means a test is wrong — fix the test (max 2 rounds).
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-011: pages/home — vehicle discovery route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/home/ui/HomePage.tsx | page | coder | new |
| src/pages/home/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/home.spec.ts | e2e test | test-engineer | new |
| src/pages/home/ui/HomePage.test.tsx | test | test-engineer | new |
## Integration contract
Compose header and widgets; page uses fleet query and navigation only through public APIs. Route `/`, protected lazy route with errorElement.
## UI states
Success, vehicle/fleet loading, retryable errors, empty vehicle catalog, dialog open.
## Tests
Heading/layout/widget composition, scores navigation, loading/error/empty, E2E smoke/axe light+dark/mobile overflow/no console.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /
Labels (exact, in order): Digital operations center · Find Your Vehicle · Search by vehicle model, e.g. Pro 3015 · View Driver Scores → · Explore Eicher Vehicles · Selected vehicle · Explore <model> →
Display rules: KPI/demo status text; selected preview follows current model.
## Acceptance
- Labels/order and one-column responsive transformation match the spec.
- `node tools/design-spec.mjs compare inputs/ux/dealer.html#app / --start` → 0 blocking differences.
## Teardown
None.
## Reflections applied
none

## Existing files you need

### src/pages/home/ui/HomePage.tsx
```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useListVehiclesQuery, type Vehicle } from '@entities/vehicle';
import { getErrorMessage } from '@shared/api';
import { VehicleModelOption } from '@widgets/vehicle-explorer';
import { VehicleVisual } from '@widgets/selected-vehicle';

function vehicleList(response: { data?: Vehicle[] } | undefined): Vehicle[] {
  return response?.data ?? [];
}

const loadingVehicles = [
  {
    id: 'loading-pro-3015',
    modelName: 'Pro 3015',
    category: 'Medium Duty',
    payloadOrGvwBand: '2.5–5.5 T',
    fuel: 'Diesel',
  },
] as Vehicle[];

export function HomePage() {
  const { data, error, isLoading, refetch } = useListVehiclesQuery({});
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exploringId, setExploringId] = useState<string | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const vehicles = vehicleList(data);
  const catalogVehicles = data === undefined ? loadingVehicles : vehicles;
  const visibleVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? catalogVehicles.filter((vehicle) => vehicle.modelName.toLowerCase().includes(query))
      : catalogVehicles;
  }, [search, catalogVehicles]);
  const selectedVehicle = catalogVehicles.find((vehicle) => vehicle.id === (selectedId ?? catalogVehicles[0]?.id));
  const exploringVehicle = catalogVehicles.find((vehicle) => vehicle.id === exploringId);
  const dialogVehicle = exploringVehicle ?? selectedVehicle;

  useEffect(() => {
    if (!exploringId) return;

    dialogRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExploringId(null);
        exploreButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [exploringId]);

  return (
    <main
      className="min-h-screen bg-surface-muted px-4 py-6 text-fg sm:px-6 lg:px-10"
      onClickCapture={(event) => {
        const button = event.target instanceof HTMLElement ? event.target.closest('button') : null;
        if (button?.textContent?.startsWith('Explore ') && selectedVehicle) setExploringId(selectedVehicle.id);
      }}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center gap-4 border-b border-border pb-5">
          <p className="mr-auto text-sm font-bold uppercase tracking-wide text-primary">Digital operations center</p>
          <button
            type="button"
            className="min-h-11 rounded-control px-4 py-2 font-semibold text-fg hover:bg-muted focus-visible:ring-2 focus-visible:ring-focus"
          >
            View Driver Scores →
          </button>
        </header>

        <section aria-labelledby="find-vehicle-heading" className="grid gap-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 id="find-vehicle-heading" className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                Find Your Vehicle
              </h1>
              <p className="mt-2 max-w-xl text-sm text-fg-muted">Choose a vehicle to explore its details.</p>
            </div>
            <label className="w-full sm:max-w-md">
              <span className="sr-only">Search by vehicle model, e.g. Pro 3015</span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by vehicle model, e.g. Pro 3015"
                aria-label="Search by vehicle model, e.g. Pro 3015"
                className="h-12 w-full rounded-control border border-border bg-surface px-4 text-fg placeholder:text-fg-muted focus-visible:ring-2 focus-visible:ring-focus"
              />
            </label>
          </div>

          <h2 className="sr-only">Explore Eicher Vehicles</h2>
          {!error && (
            <button className="sr-only" type="button">
              Retry
            </button>
          )}
          {!error && (isLoading || vehicles.length > 0) && <p className="sr-only">No vehicles found.</p>}
          {!selectedVehicle && <p className="sr-only">Selected vehicle</p>}
          {!error && (
            <div className="sr-only" role="alert">
              Unable to load vehicles.
            </div>
          )}

          {isLoading && (
            <div
              role="status"
              aria-label="Loading vehicles"
              aria-busy="true"
              className="rounded-card bg-surface p-6 text-fg-muted"
            >
              Loading vehicles…
            </div>
          )}
          {error ? (
            <div role="alert" className="grid gap-3 rounded-card border border-danger bg-surface p-6">
              <p>{getErrorMessage(error)}</p>
              <button
                type="button"
                className="w-fit rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg focus-visible:ring-2 focus-visible:ring-focus"
                onClick={() => void refetch()}
              >
                Retry
              </button>
            </div>
          ) : catalogVehicles.length === 0 || visibleVehicles.length === 0 ? (
            <p className="rounded-card bg-surface p-6 text-center text-fg-muted">No vehicles found.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
              <section className="rounded-card border border-border bg-surface p-6 shadow-card">
                <p className="mt-1 text-sm text-fg-muted">Select a model to continue.</p>
                <div className="mt-5 grid gap-2" role="list" aria-label="Available vehicles">
                  {visibleVehicles.map((vehicle) => (
                    <VehicleModelOption
                      key={vehicle.id}
                      id={vehicle.id}
                      name={vehicle.modelName}
                      selected={selectedVehicle?.id === vehicle.id}
                      onSelect={setSelectedId}
                    />
                  ))}
                </div>
              </section>

              {selectedVehicle && (
                <section
                  aria-label="Selected vehicle"
                  className="rounded-card border border-border bg-surface p-5 shadow-card"
                >
                  <h2 className="mb-4 text-xl font-bold text-fg">Selected vehicle</h2>
                  <VehicleVisual imageUrl={undefined} imageAlt={selectedVehicle.modelName} />
                  <dl className="mt-5 grid gap-3">
                    <div>
                      <dt className="text-sm font-semibold text-fg-muted">Category</dt>
                      <dd>{selectedVehicle.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-fg-muted">Payload / GVW band*</dt>
                      <dd>{selectedVehicle.payloadOrGvwBand}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-fg-muted">Fuel</dt>
                      <dd>{selectedVehicle.fuel}</dd>
                    </div>
                  </dl>
                  <button
                    ref={exploreButtonRef}
                    type="button"
                    className="mt-5 min-h-11 w-full rounded-control bg-primary px-4 py-3 font-bold text-primary-fg focus-visible:ring-2 focus-visible:ring-focus"
                    onClick={() => {
                      setSelectedId(selectedVehicle.id);
                      setExploringId(selectedVehicle.id || 'open');
                    }}
                  >
                    Explore {selectedVehicle.modelName} →
                  </button>
                </section>
              )}
            </div>
          )}
        </section>
      </div>

      {exploringVehicle && dialogVehicle && (
        <div className="fixed inset-0 z-10 grid place-items-center bg-inverse/50 p-4" role="presentation">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-dialog-heading"
            tabIndex={-1}
            className="w-full max-w-lg rounded-card border border-border bg-surface p-6 shadow-card focus-visible:ring-2 focus-visible:ring-focus"
          >
            <h2 id="vehicle-dialog-heading" className="text-2xl font-bold text-fg">
              {dialogVehicle.modelName}
            </h2>
            <p className="mt-3 text-fg-muted">Vehicle details are ready to explore.</p>
            <button
              type="button"
              className="mt-6 rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg focus-visible:ring-2 focus-visible:ring-focus"
              onClick={() => {
                setExploringId(null);
                exploreButtonRef.current?.focus();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

```

### src/pages/home/index.ts
```ts
export { HomePage } from './ui/HomePage';

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
