---
id: TASK-017
status: open
revision: 1
tests: first
depends-on: [TASK-002, TASK-016]
created: 2026-11-09
---
# TASK-017: pages/driver-scores — history route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/driver-scores/ui/DriverScoresPage.tsx | page | coder | new |
| src/pages/driver-scores/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/driver-scores.spec.ts | e2e test | test-engineer | new |
| src/pages/driver-scores/ui/DriverScoresPage.test.tsx | test | test-engineer | new |
## Integration contract
Compose header/history/certificate; use driver-score search selectors/actions. Protected lazy route `/scores`; no duplicate data mechanism.
## UI states
Success, loading, error/retry, empty, search active, sorted.
## Tests
Summary/count, search and native sort wiring, back home, loading/error/empty, E2E smoke/axe light+dark/mobile overflow/no console.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /scores
Labels (exact, in order): Fleet performance · Demo · Drivers Score · ← Back to Home · Driver Score Results · Search · Sort by · Most recent · Highest score · Lowest score · Driver name · Simulated data
Display rules: demo/simulated status is textual; empty results use the exact table message.
## Acceptance
- Labels/order, summary/table layout and responsive collapse match the spec.
- `node tools/design-spec.mjs compare inputs/ux/dealer.html#app /scores --start` → 0 blocking differences.
## Teardown
None.
## Reflections applied
none
