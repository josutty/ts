---
id: TASK-016
status: open
revision: 1
tests: first
depends-on: [TASK-001, TASK-013]
created: 2026-11-09
---
# TASK-016: widgets/score-history — score results table
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/score-history/ui/ScoreHistoryTable.tsx | connected | coder | new |
| src/widgets/score-history/index.ts | public api | coder | new |
| src/widgets/score-history/ui/ScoreHistoryTable.test.tsx | test | test-engineer | new |
## Integration contract
Use `useListDriverScoresQuery({search, sort})`, search/sort selectors, and certificate mutation public API. Handle loading/error(empty)/success with retry.
## Components
Semantic table with exact seven columns, row download names, filtered empty state, horizontal mobile scroll.
## UI states
Loading, error/retry, success, empty/no match, search active, sorted.
## Tests
Exact headers, search result count/filter, all four sort orders, empty message, missing date em dash, score `/100`, row certificate action.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /scores
Labels (exact, in order): Driver Name · Company Name · Vehicle · Route · Date · Score · Certificate · ↓ Download · No matching driver results. Try a different search.
Display rules: missing history date is `—`; score integer `/100`; download names include driver.
## Acceptance
- Labels/order and all server states match the spec; table remains usable with horizontal scroll on mobile.
## Teardown
RTK Query subscriptions clean automatically.
## Reflections applied
none
