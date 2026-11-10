---
id: TASK-009
status: done
revision: 1
tests: first
depends-on: [TASK-005, TASK-008]
created: 2026-11-09
---
# TASK-009: widgets/trip-setup — create-trip dialog
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/trip-setup/ui/TripSetupDialog.tsx | connected | coder | new |
| src/widgets/trip-setup/index.ts | public api | coder | new |
| src/widgets/trip-setup/ui/TripSetupDialog.test.tsx | test | test-engineer | new |
## Integration contract
Use `useListRoutesQuery({})`, `useCreateTripMutation`, selected vehicle selector, and `getErrorMessage`; no fetch. Dialog owns form fields/local errors only.
## Components
Modal fields and props per analysis; native route select, read-only vehicle, cancel/close/backdrop/Escape, proceed.
## UI states
Open/default/focus/invalid/submitting/closed; route loading/error/retry; selected vehicle survives close.
## Tests
Open focus, required field errors, read-only vehicle, route loading/error retry, valid `.unwrap()` create, disabled/loading, Cancel/close/backdrop/Escape and focus return.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /
Labels (exact, in order): Step 2 · Trip setup · Start a Vehicle Trip · Driver Name · Company Name · Vehicle (automatically selected) · Route · Select a route to continue · Cancel · Proceed to Live Telemetry → · ×
Display rules: vehicle is read-only; required route prompt remains visible; no fabricated route values.
## Acceptance
- Labels/order and dialog focus behavior match the spec.
- Modal interaction is keyboard safe and closes without losing selected vehicle.
## Teardown
RTK Query subscriptions clean automatically; remove any document listeners on close/unmount.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/trip-setup`
## Reflections applied
none
