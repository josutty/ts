# Token check — design vs build

Design: analysis/design-tokens-raw.json (9 colour variables, 0 font families) · Build: src/shared/ui/theme/tokens.css

| | Where | What | Design | Build |
|---|---|---|---|---|
| ✔ | --blue (light) | colour | #001868 | --color-primary |
| ✔ | --red (light) | colour | #e62f32 | --color-danger |
| ✔ | --ink (light) | colour | #172a4a | --color-fg |
| ✔ | --muted (light) | colour | #62718c | --color-fg-muted |
| ✔ | --bg (light) | colour | #f6f8fc | --color-surface-muted |
| ✔ | --line (light) | colour | #e3e9f2 | --color-border |
| ✔ | --white (light) | colour | #fff | --color-surface |
| ✔ | --green (light) | colour | #15803d | --color-success |
| ✔ | --amber (light) | colour | #c17800 | --color-warning |

**Everything from the design is in the build.**
