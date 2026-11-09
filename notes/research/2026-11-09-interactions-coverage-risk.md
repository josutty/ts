# so will this be a problem

Asked by: user for none

## Answer

It is not an immediate analysis or planning blocker because `components.md` and `ui-states.md` already record the dynamic screens and their states. It can become a coverage/release problem if those screens are approved product scope: `interactions.md` is the crawler evidence used to measure screens, while its current output has no authenticated screen rows or screenshots, and Q1 explicitly leaves authenticated measurement undecided. If the four dynamic screens are in scope, they need authenticated-fixture measurement and tests before release; otherwise they should be explicitly treated as prototype-only/out of measured scope.

## Sources

- analysis/interactions.md § Screens — only initial `#app` was reached; output is generated and must not be edited by hand
- analysis/components.md § Open questions Q1 — asks whether dynamic states should be measured with authenticated fixtures
- analysis/ui-states.md rows 15–42 — dynamic screen states are documented but marked as not reached by the crawler
- agent-docs/rules/testing.md § E2E — one smoke spec per route and design/axe checks are required at release

## Remaining uncertainty

The client/product owner must confirm whether Home, Telemetry, Analytics, and Scores are approved measured screens. That decision determines whether authenticated crawler evidence is required.

HANDOFF: status=DONE next=orchestrator task=none reason="Not an immediate planning blocker, but it becomes a release coverage risk if the four dynamic screens are approved scope; confirm scope and capture authenticated evidence — notes/research/2026-11-09-interactions-coverage-risk.md (asked by user)"
