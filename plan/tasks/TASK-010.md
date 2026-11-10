---
id: TASK-010
status: done
revision: 1
tests: first
depends-on: [TASK-001, TASK-008]
created: 2026-11-09
---
# TASK-010: widgets/pravah-embed — telemetry boundary
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/pravah-embed/ui/PravahEmbed.tsx | connected | coder | new |
| src/widgets/pravah-embed/index.ts | public api | coder | new |
| src/widgets/pravah-embed/ui/PravahEmbed.test.tsx | test | test-engineer | new |
## Integration contract
Use `useGetTelemetryContextQuery(tripId)` and `getErrorMessage`; host owns loading/error/mount boundary, Pravah owns telemetry UI. No fake sensor dashboard.
## Components
Props `tripContext`, `status`, `fallbackMessage`; labelled region and retry.
## UI states
Loading aria-busy, ready placeholder/mount, integration error alert/retry.
## Tests
Loading/error/ready states, no fabricated readings, accessible label and retry callback/query refetch.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /telemetry/:tripId
Labels (exact, in order): Pravah — Embedded Application Placeholder · SIMULATED TELEMETRY · Integration unavailable
Display rules: telemetry is explicitly simulated; host never renders Pravah-owned readings.
## Acceptance
- Host boundary handles loading/error/ready and preserves the FSD ownership boundary.
## Teardown
Abort/unsubscribe any embed mount resource on unmount; RTK Query cleanup is automatic.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/pravah-embed`
## Reflections applied
none
