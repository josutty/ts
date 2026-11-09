---
id: TASK-001
status: done
revision: 1
tests: after
depends-on: []
created: 2026-11-09
---
# TASK-001: shared/ui — primitives and prototype strip
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/shared/ui/DemoStrip.tsx | presentational | component-generator | new |
| src/shared/ui/SkipLink.tsx | presentational | component-generator | new |
| src/shared/ui/Input.tsx | presentational | component-generator | new |
| src/shared/ui/NativeSelect.tsx | presentational | component-generator | new |
| src/shared/ui/Button.tsx | presentational | component-generator | new |
| src/shared/ui/Notice.tsx | presentational | component-generator | new |
| src/shared/ui/index.ts | public api | component-generator | edit |
| src/shared/ui/DemoStrip.stories.tsx | story | component-generator | new |
| src/shared/ui/SkipLink.stories.tsx | story | component-generator | new |
| src/shared/ui/Input.stories.tsx | story | component-generator | new |
| src/shared/ui/NativeSelect.stories.tsx | story | component-generator | new |
| src/shared/ui/Button.stories.tsx | story | component-generator | new |
| src/shared/ui/Notice.stories.tsx | story | component-generator | new |
| src/shared/ui/DemoStrip.test.tsx | test | test-engineer | new |
| src/shared/ui/SkipLink.test.tsx | test | test-engineer | new |
| src/shared/ui/Input.test.tsx | test | test-engineer | new |
| src/shared/ui/NativeSelect.test.tsx | test | test-engineer | new |
| src/shared/ui/Button.test.tsx | test | test-engineer | new |
| src/shared/ui/Notice.test.tsx | test | test-engineer | new |
## Integration contract
Props in, JSX out; no store, query, fetch, or local server state. Semantic tokens only.
## Components
Implement the six props described in analysis/components.md, including labelled/error inputs, native select, disabled/loading button, tone-aware notice, skip target, and role=status demo strip.
## UI states
Default, focus, disabled/loading, invalid/error, and responsive wrapping as applicable; visible focus and alert/status semantics.
## Tests
Test role/label association, error descriptions, button loading/disabled, notice semantics, skip-link target, and exact `PROTOTYPE` text.
## Design
Source: inputs/ux/dealer.html#app and inputs/ux/dealer.html#.demo-strip  Spec: analysis/design-spec/dealer-app.md; analysis/design-spec/dealer-demo-strip.md
Route: shared chrome
Labels (exact, in order): PROTOTYPE · Simulated vehicle telemetry and driver scores · Not connected to live VECV systems · Skip to main content
Display rules: demo/prototype status is text; controls retain accessible names.
## Acceptance
- Labels and order exactly as the spec.
- Semantic tokens, keyboard focus, reduced-motion-compatible markup, and no raw palette/style attributes.
## Teardown
None.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/shared/ui && npm run build-storybook`
## Reflections applied
none
