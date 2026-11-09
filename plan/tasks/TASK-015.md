---
id: TASK-015
status: open
revision: 1
tests: first
depends-on: [TASK-002, TASK-008, TASK-012, TASK-013]
created: 2026-11-09
---
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
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /analytics/:tripId
Labels (exact, in order): Step 4 · Driver performance · Driver Analytics · Demonstration driver score and trip event summary · ↓ Download Certificate · Exit to Home · Driver Details · Events During Trip · Driving Style Breakdown
Display rules: score integer `/100`; certificate sample/nonofficial; dates localized en-IN.
## Acceptance
- Labels/order, score detail composition, and retryable error match the spec.
- `node tools/design-spec.mjs compare inputs/ux/dealer.html#app /analytics/demo-trip --start` → 0 blocking differences.
## Teardown
RTK Query cleanup automatic.
## Reflections applied
none
