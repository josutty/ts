# Context pack — TASK-001 (tests)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Write the tests only; they must FAIL now for a valid reason (assertion, or a `new` file that does not exist yet).
**Before you stop:** run `node tools/task.mjs red TASK-001` once. It must report a valid RED; a "suspect" or "already PASS" result means a test is wrong — fix the test (max 2 rounds).
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-001: shared/ui — primitives and prototype strip
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/shared/ui/DemoStrip.tsx | presentational | component-generator | new |
| src/shared/ui/SkipLink.tsx | presentational | component-generator | new |
| src/shared/ui/Input.tsx | presentational | component-generator | new |
| src/shared/ui/NativeSelect.tsx | presentational | component-generator | new |
| src/shared/ui/Button.tsx | presentational | component-generator | new |
| src/shared/ui/Notice.tsx | presentational | component-generator | new |
| src/shared/ui/index.ts | public api | component-generator | edit |
| src/shared/ui/DemoStrip.stories.tsx | story | component-generator | new |
| src/shared/ui/SkipLink.stories.tsx | story | component-generator | new |
| src/shared/ui/Input.stories.tsx | story | component-generator | new |
| src/shared/ui/NativeSelect.stories.tsx | story | component-generator | new |
| src/shared/ui/Button.stories.tsx | story | component-generator | new |
| src/shared/ui/Notice.stories.tsx | story | component-generator | new |
| src/shared/ui/DemoStrip.test.tsx | test | test-engineer | new |
| src/shared/ui/SkipLink.test.tsx | test | test-engineer | new |
| src/shared/ui/Input.test.tsx | test | test-engineer | new |
| src/shared/ui/NativeSelect.test.tsx | test | test-engineer | new |
| src/shared/ui/Button.test.tsx | test | test-engineer | new |
| src/shared/ui/Notice.test.tsx | test | test-engineer | new |
## Integration contract
Props in, JSX out; no store, query, fetch, or local server state. Semantic tokens only.
## Components
Implement the six props described in analysis/components.md, including labelled/error inputs, native select, disabled/loading button, tone-aware notice, skip target, and role=status demo strip.
## UI states
Default, focus, disabled/loading, invalid/error, and responsive wrapping as applicable; visible focus and alert/status semantics.
## Tests
Test role/label association, error descriptions, button loading/disabled, notice semantics, skip-link target, and exact `PROTOTYPE` text.
## Design
Source: inputs/ux/dealer.html#app and inputs/ux/dealer.html#.demo-strip  Spec: analysis/design-spec/dealer-app.md; analysis/design-spec/dealer-demo-strip.md
Route: shared chrome
Labels (exact, in order): PROTOTYPE · Simulated vehicle telemetry and driver scores · Not connected to live VECV systems · Skip to main content
Display rules: demo/prototype status is text; controls retain accessible names.
## Acceptance
- Labels and order exactly as the spec.
- Semantic tokens, keyboard focus, reduced-motion-compatible markup, and no raw palette/style attributes.
## Teardown
None.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/shared/ui && npm run build-storybook`
## Reflections applied
none

## Existing files you need

### src/shared/ui/DemoStrip.tsx
```tsx
export interface DemoStripProps { className?: string; }

export function DemoStrip({ className }: DemoStripProps) {
  return <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border bg-surface px-4 py-2 text-sm text-fg ${className ?? ''}`.trim()} role="status">
    <span className="font-semibold tracking-wide">PROTOTYPE</span>
    <span>Simulated vehicle telemetry and driver scores</span>
    <span>Not connected to live VECV systems</span>
  </div>;
}

```

### src/shared/ui/SkipLink.tsx
```tsx
import type { AnchorHTMLAttributes } from 'react';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { targetId?: string; }

export function SkipLink({ targetId = 'main-content', children = 'Skip to main content', className, ...props }: SkipLinkProps) {
  return <a {...props} className={`absolute left-2 top-2 z-50 -translate-y-[calc(100%+0.5rem)] rounded-md bg-primary px-4 py-2 font-medium text-on-primary focus:translate-y-0 focus-visible:ring-2 focus-visible:ring-focus ${className ?? ''}`.trim()} href={props.href ?? `#${targetId}`}>{children}</a>;
}

```

### src/shared/ui/Input.tsx
```tsx
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> { label: string; error?: string; hint?: string; }

export function Input({ id, label, error, hint, className, required, ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId, props['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return <div className="grid gap-1.5">
    <label className="text-sm font-medium text-fg" htmlFor={inputId}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
    <input {...props} aria-describedby={describedBy} aria-invalid={error ? true : props['aria-invalid']} className={`min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-fg placeholder:text-muted focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-danger' : ''} ${className ?? ''}`.trim()} id={inputId} required={required} />
    {hint ? <p className="text-sm text-muted" id={hintId}>{hint}</p> : null}
    {error ? <p className="text-sm text-danger" id={errorId} role="alert">{error}</p> : null}
  </div>;
}

```

### src/shared/ui/NativeSelect.tsx
```tsx
import type { SelectHTMLAttributes } from 'react';

export interface NativeSelectOption { label: string; value: string; disabled?: boolean; }
export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label: string; options: NativeSelectOption[]; error?: string; hint?: string; }

export function NativeSelect({ id, label, options, error, hint, className, required, ...props }: NativeSelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId, props['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return <div className="grid gap-1.5">
    <label className="text-sm font-medium text-fg" htmlFor={selectId}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
    <select {...props} aria-describedby={describedBy} aria-invalid={error ? true : props['aria-invalid']} className={`min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-fg focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-danger' : ''} ${className ?? ''}`.trim()} id={selectId} required={required}>
      {options.map((option) => <option disabled={option.disabled} key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    {hint ? <p className="text-sm text-muted" id={hintId}>{hint}</p> : null}
    {error ? <p className="text-sm text-danger" id={errorId} role="alert">{error}</p> : null}
  </div>;
}

```

### src/shared/ui/Button.tsx
```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { loading?: boolean; loadingLabel?: string; children: ReactNode; }

export function Button({ loading = false, loadingLabel = 'Loading…', children, className, disabled, ...props }: ButtonProps) {
  return <button {...props} aria-busy={loading || undefined} className={`inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-on-primary transition-opacity focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${className ?? ''}`.trim()} disabled={disabled || loading} type={props.type ?? 'button'}>{loading ? loadingLabel : children}</button>;
}

```

### src/shared/ui/Notice.tsx
```tsx
import type { ReactNode } from 'react';

export type NoticeTone = 'info' | 'success' | 'warning' | 'danger';
export interface NoticeProps { children: ReactNode; tone?: NoticeTone; title?: string; className?: string; }
const toneClasses: Record<NoticeTone, string> = { info: 'border-border bg-surface text-fg', success: 'border-success bg-surface text-fg', warning: 'border-warning bg-surface text-fg', danger: 'border-danger bg-surface text-fg' };

export function Notice({ children, tone = 'info', title, className }: NoticeProps) {
  return <div className={`rounded-md border p-4 ${toneClasses[tone]} ${className ?? ''}`.trim()} role={tone === 'danger' ? 'alert' : 'status'}>{title ? <p className="mb-1 font-semibold">{title}</p> : null}<div>{children}</div></div>;
}

```

### src/shared/ui/DemoStrip.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DemoStrip } from './DemoStrip';
const meta = { component: DemoStrip, title: 'Shared UI/DemoStrip' } satisfies Meta<typeof DemoStrip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

```

### src/shared/ui/SkipLink.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';
const meta = { component: SkipLink, title: 'Shared UI/SkipLink' } satisfies Meta<typeof SkipLink>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <><SkipLink {...args} /><main id="main-content" className="pt-16">Main content</main></> };

```

### src/shared/ui/Input.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
const meta = { component: Input, title: 'Shared UI/Input', args: { label: 'Driver name' } } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: 'Enter a driver name.' } };

```

### src/shared/ui/NativeSelect.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NativeSelect } from './NativeSelect';
const meta = { component: NativeSelect, title: 'Shared UI/NativeSelect', args: { label: 'Vehicle', options: [{ label: 'Truck 01', value: 'truck-01' }, { label: 'Truck 02', value: 'truck-02' }] } } satisfies Meta<typeof NativeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: 'Select a vehicle.' } };

```

### src/shared/ui/Button.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
const meta = { component: Button, title: 'Shared UI/Button', args: { children: 'Continue' } } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

```

### src/shared/ui/Notice.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './Notice';
const meta = { component: Notice, title: 'Shared UI/Notice', args: { children: 'Telemetry is simulated.' } } satisfies Meta<typeof Notice>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Info: Story = {};
export const Danger: Story = { args: { tone: 'danger', title: 'Unable to connect.' } };

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
