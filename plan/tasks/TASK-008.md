---
id: TASK-008
status: open
revision: 1
tests: after
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-008: widgets/trip-context — journey context
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/trip-context/ui/TripProgress.tsx | presentational | component-generator | new |
| src/widgets/trip-context/ui/TripContextBanner.tsx | presentational | component-generator | new |
| src/widgets/trip-context/index.ts | public api | component-generator | new |
| src/widgets/trip-context/ui/TripProgress.test.tsx | test | test-engineer | new |
| src/widgets/trip-context/ui/TripContextBanner.test.tsx | test | test-engineer | new |
| src/widgets/trip-context/ui/TripProgress.stories.tsx | story | component-generator | new |
| src/widgets/trip-context/ui/TripContextBanner.stories.tsx | story | component-generator | new |
## Integration contract
Props in, JSX out; action slot is supplied by telemetry/analytics pages.
## Components
Progress current step and labelled trip facts/action exactly as analysis.
## UI states
Steps 1–4 current/done, narrow wrapping, optional score action.
## Tests
Progress accessible labels and non-color state, trip facts, optional action, exact step labels.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: home, telemetry, analytics
Labels (exact, in order): Select vehicle · Trip details · Live telemetry · Driver score · Driver Name · Company · Vehicle · Route · Get Driver Score →
Display rules: facts remain readable when wrapped; action has explicit accessible name.
## Acceptance
- Labels/order exactly as the spec and no business state/fetching in presentational components.
## Teardown
None.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/trip-context`
## Reflections applied
none
