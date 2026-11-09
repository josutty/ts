---
id: TASK-006
status: open
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-006: widgets/vehicle-explorer — searchable catalog
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/vehicle-explorer/ui/VehicleExplorer.tsx | connected | coder | new |
| src/widgets/vehicle-explorer/ui/VehicleCategory.tsx | presentational | component-generator | new |
| src/widgets/vehicle-explorer/ui/VehicleModelOption.tsx | presentational | component-generator | new |
| src/widgets/vehicle-explorer/index.ts | public api | coder | new |
| src/widgets/vehicle-explorer/ui/VehicleExplorer.test.tsx | test | test-engineer | new |
| src/widgets/vehicle-explorer/ui/VehicleCategory.test.tsx | test | test-engineer | new |
| src/widgets/vehicle-explorer/ui/VehicleModelOption.test.tsx | test | test-engineer | new |
| src/widgets/vehicle-explorer/ui/VehicleCategory.stories.tsx | story | component-generator | new |
| src/widgets/vehicle-explorer/ui/VehicleModelOption.stories.tsx | story | component-generator | new |
## Integration contract
Use `useListVehiclesQuery({})`, search selectors/actions, and selected-vehicle actions. Loading/error(empty)/success all rendered with retry.
## Components
Search, 3 categories, expand/collapse, model selection and selected state per analysis.
## UI states
Default, searching, empty, expanded/collapsed, selected model, loading/error with retry.
## Tests
Typing filters rows/count, empty message, category `aria-expanded`, selected model callback/name, loading/error retry, exact search placeholder.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /
Labels (exact, in order): Explore Eicher Vehicles · 3 categories · Search by vehicle model, e.g. Pro 3015 · View Vehicles ▼ · Hide Vehicles ▲ · Select → · ✓ Selected · No vehicles found. Try a different model name.
Display rules: only matching categories/models show while searching; manual toggle clears search expansion behavior.
## Acceptance
- Labels/order and category/model interaction match the spec.
- Every server state has loading, retryable error, empty, and success rendering.
## Teardown
RTK Query subscription cleanup is automatic.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/vehicle-explorer`
## Reflections applied
none
