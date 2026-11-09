# Dataflow

| # | Need | Used by | Classification | Fields seen in HTML | Notes |
|---|---|---|---|---|---|
| D1 | user authentication | LoginForm, AppHeader | `server mutation` | username, password | prototype accepts nonempty values; production identity provider TBD |
| D2 | current session/user | AppHeader, ProfileMenu, protected pages | `client global state` | admin, username, signed-in label | session is currently sessionStorage; protected-route behavior is required |
| D3 | vehicle category/model catalog | VehicleExplorer, VehicleCategory, VehicleModelOption | `server read` | Light Duty, Medium Duty, Heavy Duty; model names, payload/GVW band, Diesel | counts and approved images/specifications come from master data |
| D4 | selected vehicle | VehicleExplorer, SelectedVehiclePreview, TripSetupDialog | `client global state` | Pro 3015, Medium Duty, `2.5–5.5 T`-style payload, Diesel | survives category interaction and modal close; carried into trip |
| D5 | vehicle search query | VehicleExplorer | `local UI state` | `Search by vehicle model, e.g. Pro 3015` | client-side filtering shown; server-side scale unknown |
| D6 | expanded vehicle category | VehicleCategory | `local UI state` | Medium Duty expanded; View/Hide Vehicles | one category expanded by default |
| D7 | fleet overview KPIs | VehicleStats | `server read` | 247, +8.2%, −12.4% | explicitly illustrative/demo values |
| D8 | route catalog | TripSetupDialog, TripContextBanner | `server read` | Chennai → Bengaluru; Bengaluru → Hyderabad; Mumbai → Pune; Delhi → Jaipur; Kochi → Bengaluru; Chennai → Coimbatore | options and identifiers are TBD in FSD |
| D9 | trip creation/context | TripSetupDialog, TelemetryPage, DriverAnalytics | `server mutation` | driver name, company name, selected vehicle, route | required fields; production creates/identifies trip |
| D10 | Pravah embed context/status | PravahEmbed, TelemetryPage | `server read` | driver, company, vehicle, route; `SIMULATED TELEMETRY`; placeholder | integration contract, loading and failure behavior TBD; Pravah owns telemetry data |
| D11 | driver score result | TelemetryPage, DriverAnalytics, CertificateDownload | `server read` | 88, `/ 100`, evaluation date, `Safe Driver`, `Great Driving!`, `Keep it up!` | algorithm, thresholds and ownership TBD; avoid duplicate score requests |
| D12 | driver event breakdown | DriverAnalytics | `server read` | Seatbelt Violation 1; Harsh Acceleration 3; Harsh Braking 2; Fast Cornering 0; Handbraking 0; Overspeeding 1; `7 total` | exact metrics/weights TBD |
| D13 | driving-style metrics | DriverAnalytics | `server read` | Safety, Efficiency, Fuel Economy, Idle Management, Speed; illustrative radar values | visualization is prototype data; threshold meaning TBD |
| D14 | score history | DriverScoresPage, ScoreHistoryTable | `server read` | Driver Name, Company Name, Vehicle, Route, Date, Score, Certificate; John Doe / Example Logistics / Pro 8035 Tipper / Chennai → Bengaluru / 88 / 2026-05-20 | result count, paging/filtering for large datasets TBD |
| D15 | score history search | DriverScoresPage, ScoreHistoryTable | `server read` | driver, company, vehicle, route, date query; result count | prototype filters in browser; server/client responsibility unclear |
| D16 | score history sort | DriverScoresPage, ScoreHistoryTable | `server read` | Most recent, Highest score, Lowest score, Driver name | prototype sorts in browser; supported columns/paging TBD |
| D17 | certificate generation/download | CertificateDownload, ScoreHistoryTable | `server mutation` | driver, company, vehicle, route, score, date; sample/nonofficial marking; A4 | official issuance, PDF delivery and unique reference TBD |
| D18 | active page/navigation | AppHeader, HomePage, DriverScoresPage | `local UI state` | Home, Drivers Score, Back to Home, Exit to Home | route/state changes across journey |
| D19 | profile menu open | AppHeader, ProfileMenu | `local UI state` | user chevron, Signed in as, Sign Out | outside click and Escape close |
