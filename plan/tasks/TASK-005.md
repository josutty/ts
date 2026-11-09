---
id: TASK-005
status: open
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-005: widgets/selected-vehicle — visual and preview
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/selected-vehicle/ui/VehicleVisual.tsx | presentational | component-generator | new |
| src/widgets/selected-vehicle/ui/SelectedVehiclePreview.tsx | connected | coder | new |
| src/widgets/selected-vehicle/index.ts | public api | coder | new |
| src/widgets/selected-vehicle/ui/VehicleVisual.test.tsx | test | test-engineer | new |
| src/widgets/selected-vehicle/ui/SelectedVehiclePreview.test.tsx | test | test-engineer | new |
| src/widgets/selected-vehicle/ui/VehicleVisual.stories.tsx | story | component-generator | new |
## Integration contract
Use vehicle query and selected-vehicle selector/action; `onExplore(vehicleId)` opens trip setup. No invented vehicle data.
## Components
Props exactly from analysis; preview displays category, payload/GVW, fuel, selected confirmation, and model-specific Explore action.
## UI states
Selected preview, image success/fallback, no approved image.
## Tests
Vehicle image alt/fallback label, selected vehicle details, payload en-dash/unit rule, Explore id callback, no crash without image.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /
Labels (exact, in order): Selected vehicle · Category · Payload / GVW band* · Fuel · Selection · ✓ Selected · Explore <model> →
Display rules: payload uses en dash and unit T; fallback says PRODUCT IMAGE · REPLACEABLE.
## Acceptance
- Labels/order and model-specific button name match the spec.
- Preview updates immediately from the selected-vehicle slice.
## Teardown
None.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/selected-vehicle`
## Reflections applied
none
