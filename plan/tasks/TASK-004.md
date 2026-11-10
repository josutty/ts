---
id: TASK-004
status: done
revision: 1
tests: first
depends-on: [TASK-002, TASK-003]
created: 2026-11-09
---
# TASK-004: pages/login — login composition and route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/login/ui/LoginPage.tsx | page | coder | new |
| src/pages/login/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/login.spec.ts | e2e test | test-engineer | new |
| src/pages/login/ui/LoginPage.test.tsx | test | test-engineer | new |
## Integration contract
Compose LoginForm, VehicleVisual, Notice, DemoStrip/SkipLink. Route `/login` is lazy with errorElement; no page fetch/state.
## UI states
Default, auth loading/error, responsive hero/card layout.
## Tests
One h1/main, login callback wiring, busy/error rendering, route exists, E2E smoke/axe light+dark/mobile overflow/no console errors.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /login
Labels (exact, in order): Eicher Digital Operations · Smarter journeys. Clearer insights. · An intuitive way to explore Eicher vehicles, monitor a trip and understand driver performance. · Prototype access only. No real account verification or live vehicle data is connected. · Welcome back · Sign in · Use demo credentials to explore the experience. Real authentication is not enabled. · Username · Password · Demo credentials: admin / admin123. This is not a secure production login. · Sign In →
Display rules: hero uses the measured gradient; prototype notice is textual.
## Acceptance
- Labels/order, card placement, gradient and responsive layout match the spec.
- `node tools/design-spec.mjs compare inputs/ux/dealer.html#app /login --start` → 0 blocking differences.
## Teardown
None.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/pages/login && npm run build-storybook`
## Reflections applied
none
