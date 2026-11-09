# Requirements questions

Questions below cover only decisions that could change libraries or setup. Defaults allow planning to continue.

| # | Question | Why it matters (library / setup) | Default if unanswered | Answer |
| --- | --- | --- | --- | --- |
| 1 | Which languages? Any right-to-left? | i18n library and `dir` handling | English only, no i18n library | |
| 2 | Will the prototype need real-time vehicle updates, or remain simulated? | WebSocket/polling approach and API setup | Simulated data; no real-time library | |
| 3 | Is offline use required? | Service worker, cache strategy, and data persistence | Online-only | |
| 4 | Which devices and browsers must be supported? | Responsive breakpoints, browser targets, and test matrix | Current desktop and mobile Chrome, Firefox, Safari, and Edge | |
| 5 | What production data volume should score tables support? | Virtualized list/grid decision and pagination strategy | Fewer than 200 rows per view; plain table | |
| 6 | What accessibility target is required? | Automated/manual accessibility setup | WCAG 2.2 AA | |
| 7 | Is error tracking or analytics required, and what consent rules apply? | Sentry/analytics dependency and consent UI | No third-party tracking; shared logger only | |
