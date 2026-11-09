---
id: TASK-014
status: open
revision: 1
tests: first
depends-on: [TASK-002, TASK-008, TASK-010]
created: 2026-11-09
---
# TASK-014: pages/telemetry — live telemetry host route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/telemetry/ui/TelemetryPage.tsx | page | coder | new |
| src/pages/telemetry/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/telemetry.spec.ts | e2e test | test-engineer | new |
| src/pages/telemetry/ui/TelemetryPage.test.tsx | test | test-engineer | new |
## Integration contract
Read telemetry context and expose get-score action through `useGetDriverScoreQuery`/planned score action; no telemetry dashboard logic. Protected lazy route `/telemetry/:tripId`.
## UI states
Success, embed loading/error/ready, score submitting duplicate protection, score error retry.
## Tests
Trip context, SIMULATED TELEMETRY notice, busy score action, error retry, route, E2E smoke/axe/light-dark/mobile/no console.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /telemetry/:tripId
Labels (exact, in order): Step 3 · Vehicle monitoring · Live Telemetry · Demo vehicle health and performance overview · SIMULATED TELEMETRY · Get Driver Score → · Pravah — Embedded Application Placeholder
Display rules: telemetry values are simulated/not live; async regions use aria-busy and errors role=alert.
## Acceptance
- Host owns only summary/embed boundary and score transition.
- `node tools/design-spec.mjs compare inputs/ux/dealer.html#app /telemetry/demo-trip --start` → 0 blocking differences.
## Teardown
None.
## Reflections applied
none
