---
id: TASK-007
status: done
revision: 1
tests: after
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-007: widgets/fleet-overview — KPI cards
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/fleet-overview/ui/VehicleStats.tsx | presentational | component-generator | new |
| src/widgets/fleet-overview/index.ts | public api | component-generator | new |
| src/widgets/fleet-overview/ui/VehicleStats.test.tsx | test | test-engineer | new |
| src/widgets/fleet-overview/ui/VehicleStats.stories.tsx | story | component-generator | new |
## Integration contract
Props in, JSX out; page owns `useGetFleetOverviewQuery` and maps loading/error/empty/success.
## Components
VehicleStats props `label`, `value`, `caption`; group value and label semantically.
## UI states
KPI success and page-provided loading/error/empty alternatives.
## Tests
Renders label/value/caption and textual Demo status; responsive card markup.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /
Labels (exact, in order): Vehicles connected · Demo · Illustrative fleet overview · Fuel efficiency gain · Demo · CO₂ reduction · Demo
Display rules: demo status remains text; values are API-driven.
## Acceptance
- Labels/order exactly as the spec and no hard-coded fallback data in the component.
## Teardown
None.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/fleet-overview`
## Reflections applied
none
