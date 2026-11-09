# Display rules

| Rule | Where | Evidence | Meaning known? |
|---|---|---|---|
| Demo/prototype status is shown as text | DemoStrip, telemetry, scores | `PROTOTYPE`; `SIMULATED TELEMETRY`; `Demo only`; simulated-data notes | yes |
| Vehicle payload uses a range with en dash and unit T | SelectedVehiclePreview | `2.5–5.5 T`, `7.5–16 T`, etc. | yes |
| Score displays as integer out of 100 | DriverAnalytics, ScoreHistoryTable | `88 / 100`, `92/100` | yes; algorithm/rounding TBD |
| Score badge uses green success styling | DriverAnalytics, ScoreHistoryTable | `Safe Driver`, `Great Driving!`, `.score-pill` green | presentation known; threshold meaning unclear |
| Zero event counts are displayed as `0` | DriverAnalytics | Fast Cornering and Handbraking rows | yes |
| Event bars scale with count | DriverAnalytics | inline widths derived from count × 30% | visual rule known; maximum/overflow behavior unclear |
| Evaluation date uses localized `en-IN` day/month/year | DriverAnalytics | `today()` output such as `20 May 2026` | timezone/cutoff TBD |
| Missing history date displays em dash | ScoreHistoryTable | `r.date || '—'` | yes |
| Certificate is explicitly sample/nonofficial | CertificateDownload, score notes | sample certificate and simulated-data copy | yes for prototype; official issuance TBD |
| Vehicle image fallback is explicitly labelled | VehicleVisual | `PRODUCT IMAGE · REPLACEABLE`; temporary reference alt | yes |
| Telemetry values are simulated and not live | TelemetryPage/PravahEmbed | notice and `SIMULATED TELEMETRY` | yes |
| Radar chart dimensions are named | DrivingStyleBreakdown | Safety, Efficiency, Fuel Economy, Idle Management, Speed | yes; score calculation/thresholds unclear |
| Error text is safe and non-sensitive | LoginForm and all server data components | FSD safe auth error and normalized errors requirement | exact production copy TBD |
