---
id: TASK-013
status: open
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-11-09
---
# TASK-013: widgets/certificate — sample certificate action
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/certificate/ui/CertificateDownload.tsx | connected | coder | new |
| src/widgets/certificate/index.ts | public api | coder | new |
| src/widgets/certificate/ui/CertificateDownload.test.tsx | test | test-engineer | new |
## Integration contract
Use `useGenerateCertificateMutation`, `.unwrap()`, normalized error and print helper; selected result only. No sensitive data.
## Components
Download action and printable A4 output boundary with exact result details.
## UI states
Success, submitting/disabled, safe error with retry.
## Tests
Mutation payload matches result id, loading/error/retry, button accessible name, sample/nonofficial marking, print helper invocation.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /analytics/:tripId and /scores
Labels (exact, in order): ↓ Download Certificate · ↓ Download · Sample certificate · Nonofficial
Display rules: certificate explicitly sample/nonofficial; date uses localized en-IN formatting.
## Acceptance
- Download always targets exactly the selected result and is clearly nonofficial.
## Teardown
Mutation cleanup automatic; revoke object URLs after download if created.
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/certificate`
## Reflections applied
none
