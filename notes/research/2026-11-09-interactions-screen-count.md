# why in analysis/interactions have only 1 png image. Actually ux have 4-5 screesn

Asked by: user for none

## Answer

`analysis/interactions.md` reports one screen because `discover-interactions.mjs` opened `dealer.html` in its initial unauthenticated state; it reached only `#app` and did not submit the login form or exercise the JavaScript-rendered authenticated states. The four additional screens—home, telemetry, analytics, and scores—are defined dynamically in the same HTML file (`show()` dispatches to `renderHome`, `renderTelemetry`, `renderAnalytics`, and `renderScores`) rather than as separate HTML files or crawler-reached screenshots. This is explicitly recorded in `analysis/components.md` § Open questions and `analysis/ui-states.md`, which marks those states as source-JS states and says the crawler did not reach them.

## Sources

- analysis/interactions.md § Screens — “1 screen(s)” and only `#app` evidence
- inputs/ux/dealer.html lines 21–35 — dynamic `show()` routing and render functions
- analysis/ui-states.md rows 15, 29, 34, 37 — authenticated states marked “source JS state; crawler did not reach”
- analysis/components.md § Open questions — Q1 asks whether dynamic states should be measured with authenticated fixtures

## Remaining uncertainty

The source documents do not establish whether the four dynamic states are approved design screens requiring separate screenshots, or only prototype states; the client/product owner must confirm that scope.

HANDOFF: status=DONE next=orchestrator task=none reason="Interactions has one screenshot because the crawler only reached unauthenticated #app; home, telemetry, analytics, and scores are JavaScript-rendered states not separately reached — notes/research/2026-11-09-interactions-screen-count.md (asked by user)"
