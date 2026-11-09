---
id: TASK-002
status: in-progress
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-002: widgets/app-header — authenticated navigation
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/app-header/ui/AppHeader.tsx | connected | coder | new |
| src/widgets/app-header/ui/ProfileMenu.tsx | presentational | component-generator | new |
| src/widgets/app-header/index.ts | public api | coder | new |
| src/widgets/app-header/ui/AppHeader.test.tsx | test | test-engineer | new |
| src/widgets/app-header/ui/ProfileMenu.test.tsx | test | test-engineer | new |
| src/widgets/app-header/ui/ProfileMenu.stories.tsx | story | component-generator | new |
## Integration contract
Read session selectors/actions and sign-out public API; navigation callback is supplied by the page/router. No server query.
## Components
AppHeader props: `username`, `activePage`, `onNavigate`, `onSignOut`; ProfileMenu props from analysis. Escape/outside close returns focus.
## UI states
Signed-in, profile closed/open, signed-out callback, narrow wrapped navigation.
## Tests
Open/close menu, `aria-expanded`, Escape/outside close, focus return, Home/Drivers Score callbacks, sign-out callback, exact labels.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: authenticated shared chrome
Labels (exact, in order): FLEET INTELLIGENCE CENTER · Home · Drivers Score · admin · Signed in as · ↪ Sign Out
Display rules: signed-out state clears session; menu content is hidden when closed.
## Acceptance
- Labels/order and accessible header/nav landmarks match the spec.
- Header uses session/sign-out contracts and never duplicates auth state.
## Teardown
Remove document pointer/keyboard listeners on unmount if used.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/app-header`
## Reflections applied
none
