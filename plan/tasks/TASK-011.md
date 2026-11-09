---
id: TASK-011
status: open
revision: 1
tests: first
depends-on: [TASK-002, TASK-005, TASK-006, TASK-007, TASK-008, TASK-009]
created: 2026-11-09
---
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
