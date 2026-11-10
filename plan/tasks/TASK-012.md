---
id: TASK-012
status: done
revision: 1
tests: after
depends-on: [TASK-001, TASK-008]
created: 2026-11-09
---
# TASK-012: widgets/score-breakdown — score detail blocks
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/score-breakdown/ui/DriverDetails.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/ui/ScoreCard.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/ui/EventsBreakdown.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/ui/DrivingStyleBreakdown.tsx | presentational | component-generator | new |
| src/widgets/score-breakdown/index.ts | public api | component-generator | new |
| src/widgets/score-breakdown/ui/DriverDetails.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/ScoreCard.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/EventsBreakdown.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/DrivingStyleBreakdown.test.tsx | test | test-engineer | new |
| src/widgets/score-breakdown/ui/DriverDetails.stories.tsx | story | component-generator | new |
| src/widgets/score-breakdown/ui/ScoreCard.stories.tsx | story | component-generator | new |
| src/widgets/score-breakdown/ui/EventsBreakdown.stories.tsx | story | component-generator | new |
| src/widgets/score-breakdown/ui/DrivingStyleBreakdown.stories.tsx | story | component-generator | new |
## Integration contract
Props in, JSX out; analytics page supplies typed score result. No chart library (plain accessible visualization).
## Components
Render driver facts, score text/badge, event bars/counts, and named radar-style metrics with accessible equivalents.
## UI states
Success score, zero events, score/error styling supplied by data.
## Tests
Score `/100`, Safe Driver/Great Driving copy, zero counts, event bar scaling, five named dimensions and accessible chart label.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /analytics/:tripId
Labels (exact, in order): Driver Details · Safe Driver · Driver Score · Great Driving! · Keep it up! · Events During Trip · Seatbelt Violation · Harsh Acceleration · Harsh Braking · Fast Cornering · Handbraking · Overspeeding · 7 total · Driving Style Breakdown · Safety · Efficiency · Fuel Economy · Idle Management · Speed · Illustrative scores across five dimensions
Display rules: integer score out of 100; zero events display `0`; bars scale by count; radar dimensions are named.
## Acceptance
- Labels/order and display rules exactly match the spec; visualization has a text equivalent.
## Teardown
None.
## Reflections applied
none
