# Context pack — TASK-001 (builder)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Make the task's tests pass and match the design spec exactly. Never invent text, colors or behaviour the spec and display rules do not show.
**Before you stop:** run `node tools/task.mjs check TASK-001` (it prints only failures and writes plan/packs/TASK-001.failures.md). Fix only what it lists, at most 2 rounds; still failing → stop and say what is left.
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

## Design spec (measured — copy labels exactly)

(analysis/design-spec/dealer-app.md; not found — run: node tools/design-spec.mjs extract inputs/ux/dealer.html#app)

## Rules

## 4. Styling

- Tailwind utilities only. Colors via SEMANTIC tokens (`bg-surface`, `text-fg`, `bg-primary`,
  `text-danger`, `border-border`), which map to CSS variables in `src/shared/ui/theme/tokens.css`.
- Forbidden in `.tsx`: `style=`, hex/rgb literals, CSS modules, raw palette classes (`bg-blue-600`),
  dynamically built class names (`bg-${color}`) — use a map of full class strings instead.
- Dark mode = `class` on `<html>`; semantic tokens switch automatically, so `dark:` is rarely needed.
- Mobile-first breakpoints (`sm: md: lg: xl:`).
- Token names and state recipes: `plan/design-system.md` (styling-engineer). Contrast is verified
  by `node tools/check-contrast.mjs` (WCAG 2.2 AA, light and dark), never by eye.


---

## 12. UI conventions (senior-level defaults — PROJECT.md may override for existing projects)

**Accessibility — WCAG 2.2 AA is the bar, not a nice-to-have**
- Semantic elements first (`button`, `a`, `nav`, `main`, `h1–h3`, `ul/li`, `table`); one `h1` per page;
  heading levels never skip.
- Every interactive element has an accessible name; icon-only buttons use `aria-label`.
- Visible focus everywhere (base.css ring — never `outline-none` without a replacement); logical tab
  order; no keyboard traps; dialogs trap focus and return it on close; Escape closes overlays.
- Targets ≥ 24×24 px (2.2 AA); text contrast ≥ 4.5:1, control borders/focus ≥ 3:1 (checked by script).
- Errors use `role="alert"`; async regions use `aria-busy`; loading skeletons are `aria-hidden` with
  a labelled container.
- Respect `prefers-reduced-motion` (base.css); never convey state by color alone.

**Forms**
- react-hook-form + `zodResolver`; the schema lives in `<slice>/lib/<form>Schema.ts` (zod 4 syntax:
  `z.email({ error: '…' })`).
- Every field: visible `<label htmlFor>`; invalid → `aria-invalid` + `aria-describedby` pointing at the
  error text; `autoComplete` set; `noValidate` on the form (the schema is the validator).
- Submit: button shows `loading` and is disabled while submitting; mutation via `.unwrap()`; server
  field errors mapped with `setError`; a form-level server error renders in `role="alert"`.

**Routing & auth**
- Route paths only from `routes` in `@shared/config`; every page is a lazy route with `errorElement`.
- Guarded routes sit under app-bootstrap's `RequireAuth` layout route (redirects to sign-in with
  `state.from`); pages never check auth themselves. A 401 dispatches `sessionExpired`, which clears
  the session and sends guarded routes to sign-in.

**Text, numbers, dates**
- Numbers, currency and dates via `Intl` helpers in `shared/lib/format` — never string concatenation.
- i18n only when the client FSD doc or PROJECT.md requires it; then every user-facing string goes
  through the project's i18n library.

---

## Rules
1. **Content is copied, not interpreted** — labels, order, group headers, button texts, placeholders, exactly.
   A TASK that disagrees with the spec → BLOCKED-DESIGN.
2. **Every measured value maps to a token or a Tailwind step**; nearest step within 1px, otherwise styling-engineer
   adds a token. Never hex, never `style=`.
3. **Colors come only from tokens; tokens come from the spec's Palette.** Page background included.
4. **A gradient or background image is a design value like any colour**: every entry of the spec's "Gradients and
   background images" section becomes one token (`--gradient-<name>`, exact stops and angle) and one class (`bg-<name>`).
   Never approximate it with a flat colour, and never take the page colour from the `<body>` alone — the gradient may sit
   on the screen's own element.
5. **Text must be readable where the design puts it.** White text stays white only on the design's dark gradient — if the
   background is not built, the text vanishes. The check blocks any text under 1.6:1.
6. **Display rules are rules** (conditional colors, "–" for empty, formats) → `analysis/display-rules.md`; unclear →
   Gate 1 question. **Never invent a rule** and **never hard-code the design's sample data** as a fallback — show the API
   value, or the error state. In mock mode the mock returns the design's sample values (mock-data-generator).
7. **Match the design — contrast included.** If a measured design value fails WCAG contrast (e.g. a faint input border),
   KEEP the design value and list it under "Contrast concerns" in plan/design-system.md (where, both ratios). The human
   decides at Gate 1/3; a difference they accept goes into `plan/design-accepted.md` (humans only — agents never edit it).
   Never change a measured look silently.
8. **Pages are compared after their route exists** — the coder wires the route inside the page TASK.
9. **Done** = 0 blocking differences; every style difference has its one-line reason.

Tolerances: font ±0.5px · padding ±2px · heights ±4px · widths ±15% · colors ±12 per RGB channel = same, 13–40 = style,
over 40 = look · gradient angle ±25° · texts on one line ±4px.
Not compared — check by eye at Gate 3: exact vertical spacing between blocks, icons/images, shadows, hover/focus states, animation.

## Screens and overlays are discovered, not described (rule 10)
`node tools/discover-interactions.mjs <file.html>` → `analysis/interactions.md`. It clicks every control of the prototype in a
browser and lists what a static read cannot see: screens reached by a click, the shared top bar, drawers / modals / popovers
(their content is filled in by JavaScript), toasts, controls that change the page in place, hidden messages.
- **No human names screens or overlays in a prompt.** The file is the list; every row must be planned, built and checked.
- A screen is any selector: `node tools/design-spec.mjs extract <file.html#vWb>` or `<file.html#.topbar>` (the shared chrome).
- An overlay is measured with `--open "<trigger name>"` (the trigger's `aria-label`, `title` or text): `extract <screen> --open "Line detail"`
  and `compare <screen> <route> --start --open "Line detail"` → `plan/design-diff/<screen>-open-<trigger>/`. The build must give the
  trigger that exact accessible name; if it doesn't, the check fails with "no visible control named …" — that is a `content` miss.
- Same severities and "Done = 0 blocking differences" as any screen. A drawer or modal that does not exist is a missing feature, not a style gap.
- Not detectable by clicking (check by eye at Gate 3): hover-only tooltips, drag and drop, keyboard shortcuts, behaviour for other roles.

## Colours and fonts come from the design's own variables (rule 11)
`node tools/design-spec.mjs tokens inputs/ux/<file>.html` → `analysis/design-tokens-raw.md` + `.json`: every CSS variable of the design
(light + dark) and every font family (weights, where the design loads it from). wireframe-analyzer runs it; nobody types these values.
- Every design colour is a token in `tokens.css`, by value: light in `:root`, dark in `.dark`. A template default may only stay where the design has no value.
- Every design font family is proposed by library-advisor as a `web-font` row (`@fontsource/<family>`), approved at Gate 1, installed by
  app-bootstrap Run L, imported weight by weight in `base.css` by styling-engineer, and set in `--font-sans` / `--font-mono`. No CDN.
- `node tools/check-tokens.mjs` (styling-engineer, reviewer) compares design and build → `plan/token-check.md`. ✘ = a design colour or font
  is missing; a human accepts one only by naming it in `plan/design-accepted.md`.

## Blocks and the picture (rule 12)
`extract` / `compare` also measure **blocks** — every card / panel (own background, border or shadow) with its heading, row, x, width,
background, border, radius, shadow, padding and the gap to the row above. `compare` matches blocks by heading:
| Difference | Severity |
|---|---|
| a heading exists in the build but not inside a card / panel of its own · a block in another column or row · blocks side by side in the design but stacked in the build · order down the page changed · width off by > 15% of the screen | layout (blocks) |
| width off by 5–15% · shadow, border, radius (> 2px), padding (> 3px) or background different · gap between rows off by > 12px | style (one-line reason) / look (colour > 40) |
`compare` also writes `visual.png` (the design with every 40px area that looks different in red) and `visual` rows in differences.md. They are
information and never block: data and fonts add noise. Look at the picture at Gate 3; a red area nobody can explain is a finding.


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
