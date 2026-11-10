# Context pack — TASK-012 (tests)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Write the tests only; they must FAIL now for a valid reason (assertion, or a `new` file that does not exist yet).
**Before you stop:** run `node tools/task.mjs red TASK-012` once. It must report a valid RED; a "suspect" or "already PASS" result means a test is wrong — fix the test (max 2 rounds).
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-012: widgets/score-breakdown — score detail blocks
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/score-breakdown/ui/DriverDetails.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/ui/ScoreCard.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/ui/EventsBreakdown.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/ui/DrivingStyleBreakdown.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/index.ts | public api | component-generator | new |
| src/widgets/score-breakdown/ui/DriverDetails.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/ScoreCard.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/EventsBreakdown.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/DrivingStyleBreakdown.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/DriverDetails.stories.tsx | story | component-generator | new |
| src/widgets/score-breakdown/ui/ScoreCard.stories.tsx | story | component-generator | new |
| src/widgets/score-breakdown/ui/EventsBreakdown.stories.tsx | story | component-generator | new |
| src/widgets/score-breakdown/ui/DrivingStyleBreakdown.stories.tsx | story | component-generator | new |
## Integration contract
Props in, JSX out; analytics page supplies typed score result. No chart library (plain accessible visualization).
## Components
Render driver facts, score text/badge, event bars/counts, and named radar-style metrics with accessible equivalents.
## UI states
Success score, zero events, score/error styling supplied by data.
## Tests
Score `/100`, Safe Driver/Great Driving copy, zero counts, event bar scaling, five named dimensions and accessible chart label.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /analytics/:tripId
Labels (exact, in order): Driver Details · Safe Driver · Driver Score · Great Driving! · Keep it up! · Events During Trip · Seatbelt Violation · Harsh Acceleration · Harsh Braking · Fast Cornering · Handbraking · Overspeeding · 7 total · Driving Style Breakdown · Safety · Efficiency · Fuel Economy · Idle Management · Speed · Illustrative scores across five dimensions
Display rules: integer score out of 100; zero events display `0`; bars scale by count; radar dimensions are named.
## Acceptance
- Labels/order and display rules exactly match the spec; visualization has a text equivalent.
## Teardown
None.
## Reflections applied
none

## Existing files you need

### src/widgets/score-breakdown/ui/DriverDetails.tsx
```tsx
type DriverFacts = {
  name?: string;
  vehicle?: string;
  date?: string;
  duration?: string;
  distance?: string;
};

export type DriverDetailsProps = DriverFacts & {
  driver?: DriverFacts;
};

export function DriverDetails({
  driver,
  name,
  vehicle,
  date,
  duration,
  distance,
}: DriverDetailsProps) {
  const facts = driver ?? { name, vehicle, date, duration, distance };
  const rows = [
    ['Driver', facts.name],
    ['Vehicle', facts.vehicle],
    ['Date', facts.date],
    ['Duration', facts.duration],
    ['Distance', facts.distance],
  ].filter(([, value]) => value);

  return (
    <section aria-labelledby="driver-details-heading" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="driver-details-heading" className="mb-4 text-lg font-bold text-fg">
        Driver Details
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-semibold text-fg">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

```

### src/widgets/score-breakdown/ui/ScoreCard.tsx
```tsx
export type ScoreCardProps = {
  score: number;
  status?: string;
  title?: string;
  message?: string;
};

export function ScoreCard({
  score,
  status = 'Safe Driver',
  title = 'Great Driving!',
  message = 'Keep it up!',
}: ScoreCardProps) {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <section aria-labelledby="driver-score-heading" className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{status}</p>
          <h2 id="driver-score-heading" className="mt-1 text-lg font-bold text-fg">
            Driver Score
          </h2>
        </div>
        <div aria-label={`${boundedScore} out of 100`} className="text-right">
          <span className="text-4xl font-bold text-primary">{boundedScore}</span>
          <span className="text-sm text-muted">/100</span>
        </div>
      </div>
      <p className="mt-5 text-xl font-bold text-fg">{title}</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
    </section>
  );
}

```

### src/widgets/score-breakdown/ui/EventsBreakdown.tsx
```tsx
export type ScoreEvent = {
  label: string;
  count: number;
};

export type EventsBreakdownProps = {
  events: ScoreEvent[];
  total?: number;
};

export function EventsBreakdown({ events, total }: EventsBreakdownProps) {
  const maximum = Math.max(1, ...events.map((event) => event.count));
  const eventTotal = total ?? events.reduce((sum, event) => sum + event.count, 0);

  return (
    <section aria-labelledby="events-breakdown-heading" className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="events-breakdown-heading" className="text-lg font-bold text-fg">
          Events During Trip
        </h2>
        <span className="text-sm font-semibold text-muted">{eventTotal} total</span>
      </div>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.label}>
            <div className="mb-1 flex justify-between gap-4 text-sm">
              <span className="text-fg">{event.label}</span>
              <span className="font-semibold text-fg">{event.count}</span>
            </div>
            <progress
              aria-label={`${event.label}: ${event.count}`}
              value={event.count}
              max={maximum}
              className="h-2 w-full overflow-hidden rounded-full bg-muted/20 accent-primary"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

```

### src/widgets/score-breakdown/ui/DrivingStyleBreakdown.tsx
```tsx
export type DrivingStyleMetric = {
  label: string;
  value: number;
};

export type DrivingStyleBreakdownProps = {
  metrics: DrivingStyleMetric[];
};

export function DrivingStyleBreakdown({ metrics }: DrivingStyleBreakdownProps) {
  return (
    <section aria-labelledby="driving-style-heading" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="driving-style-heading" className="text-lg font-bold text-fg">
        Driving Style Breakdown
      </h2>
      <p id="driving-style-description" className="mt-1 text-sm text-muted">
        Illustrative scores across five dimensions
      </p>
      <div
        role="img"
        aria-label="Driving style scores across five dimensions"
        aria-describedby="driving-style-description"
        className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30 text-lg font-bold text-primary">
              {metric.value}
            </div>
            <p className="mt-2 text-sm font-semibold text-fg">{metric.label}</p>
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {metrics.map((metric) => (
          <li key={metric.label}>
            {metric.label}: {metric.value}
          </li>
        ))}
      </ul>
    </section>
  );
}

```

### src/widgets/score-breakdown/index.ts
```ts
export { DriverDetails } from './ui/DriverDetails';
export type { DriverDetailsProps } from './ui/DriverDetails';
export { ScoreCard } from './ui/ScoreCard';
export type { ScoreCardProps } from './ui/ScoreCard';
export { EventsBreakdown } from './ui/EventsBreakdown';
export type { EventsBreakdownProps, ScoreEvent } from './ui/EventsBreakdown';
export { DrivingStyleBreakdown } from './ui/DrivingStyleBreakdown';
export type { DrivingStyleBreakdownProps, DrivingStyleMetric } from './ui/DrivingStyleBreakdown';

```

### src/widgets/score-breakdown/ui/DriverDetails.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DriverDetails } from './DriverDetails';

const meta = { component: DriverDetails } satisfies Meta<typeof DriverDetails>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Demo Driver', vehicle: 'Eicher Pro', date: 'Today', duration: '2h 15m', distance: '84 km' },
};

```

### src/widgets/score-breakdown/ui/ScoreCard.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ScoreCard } from './ScoreCard';

const meta = { component: ScoreCard } satisfies Meta<typeof ScoreCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { score: 92 } };

```

### src/widgets/score-breakdown/ui/EventsBreakdown.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { EventsBreakdown } from './EventsBreakdown';

const meta = { component: EventsBreakdown } satisfies Meta<typeof EventsBreakdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: [
      { label: 'Seatbelt Violation', count: 0 },
      { label: 'Harsh Acceleration', count: 2 },
      { label: 'Harsh Braking', count: 1 },
      { label: 'Fast Cornering', count: 0 },
      { label: 'Handbraking', count: 0 },
      { label: 'Overspeeding', count: 4 },
    ],
  },
};

```

### src/widgets/score-breakdown/ui/DrivingStyleBreakdown.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DrivingStyleBreakdown } from './DrivingStyleBreakdown';

const meta = { component: DrivingStyleBreakdown } satisfies Meta<typeof DrivingStyleBreakdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metrics: [
      { label: 'Safety', value: 92 },
      { label: 'Efficiency', value: 86 },
      { label: 'Fuel Economy', value: 78 },
      { label: 'Idle Management', value: 88 },
      { label: 'Speed', value: 81 },
    ],
  },
};

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
