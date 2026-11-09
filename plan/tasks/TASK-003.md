---
id: TASK-003
status: open
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-003: features/authenticate — sign-in form
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/authenticate/ui/LoginForm.tsx | connected | coder | new |
| src/features/authenticate/index.ts | public api | coder | new |
| src/features/authenticate/ui/LoginForm.test.tsx | test | test-engineer | new |
## Integration contract
Use `useLoginUserMutation`; map errors with `getErrorMessage`; update session through the planned auth contract. Use react-hook-form/zod schema owned by this slice if needed. No fetch.
## Components
LoginForm props and validation from analysis/components.md; visible labels, autocomplete, `noValidate`, field/form errors, `.unwrap()` and loading button.
## UI states
Default, focus, invalid, submitting, rejected safe alert.
## Tests
Required Username/Password validation, `aria-invalid` descriptions, successful mutation, safe error, disabled/loading submit, exact demo copy.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /login
Labels (exact, in order): Welcome back · Sign in · Use demo credentials to explore the experience. Real authentication is not enabled. · Username · Password · Demo credentials: admin / admin123. This is not a secure production login. · Sign In →
Display rules: errors are safe/non-sensitive; prototype copy remains visible.
## Acceptance
- Labels and order exactly as the spec.
- Login request uses RTK Query mutation and exposes loading/error/retry without copying server data into local state.
## Teardown
RTK Query subscription cleanup is automatic.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/authenticate`
## Reflections applied
none
