---
stage: plan
scope: all
generated: 2026-11-09
extractor: node tools/list-html-elements.mjs
---

# Coverage — 15 elements · 15 covered · 0 partial · 0 missing

## Gaps (read this first)

None at plan stage. TASK, implementation, route, and test links are intentionally pending until task planning and release.

## Elements

| Screen | Element | Component | Slice | TASK | File | Route | Test | Status |
| -------- | --------- | --------- | ----- | ---- | ---- | ----- | ---- | ------ |
| dealer / shared | a.skip-link “Skip to main content” | SkipLink | shared/ui | — | — | — | — | covered |
| dealer / shared | div[role=status] “PROTOTYPE …” | DemoStrip | shared/ui | — | — | — | — | covered |
| dealer / shared | header#header | AppHeader | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | img “Eicher - Nayi Soch Naye Raaste” | AppHeader | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | nav#nav | AppHeader | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | button “Home” | AppHeader / Button | widgets/app-header/ui; shared/ui | — | — | — | — | covered |
| dealer / shared | button “Drivers Score” | AppHeader / Button | widgets/app-header/ui; shared/ui | — | — | — | — | covered |
| dealer / shared | button#userBtn “admin ▾” | AppHeader / ProfileMenu | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | span#usernameLabel “admin” | AppHeader | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | span#chevron “▾” | AppHeader / ProfileMenu | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | div#userMenu | ProfileMenu | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | b#menuUser | ProfileMenu | widgets/app-header/ui | — | — | — | — | covered |
| dealer / shared | button#signOut “↪ Sign Out” | ProfileMenu / Button | widgets/app-header/ui; shared/ui | — | — | — | — | covered |
| dealer / app | div#app | LoginPage | pages/login/ui | — | — | — | — | covered |
| dealer / app | div#modalRoot | TripSetupDialog | widgets/trip-setup/ui | — | — | — | — | covered |

The extractor found one screen, one shared chrome block, no overlays/toasts/reveals/select options, one in-place skip-link control, and hidden profile/dialog content. The generated interaction evidence is `plan/coverage-check/interactions.md`; all rows are represented above or by their owning component.

## UI states

| Component | State | Analysis evidence | Slice + owner | TASK | Test | Status |
| --------- | ----- | ----------------- | ------------- | ---- | ---- | ------ |
| LoginPage | default | analysis/ui-states.md:5 | pages/login/ui · coder | — | — | covered |
| LoginForm | default | analysis/ui-states.md:6 | features/authenticate/ui · coder | — | — | covered |
| LoginForm | focus | analysis/ui-states.md:7 | features/authenticate/ui · coder | — | — | covered |
| LoginForm | invalid | analysis/ui-states.md:8 | features/authenticate/ui · coder | — | — | covered |
| LoginForm | submitting | analysis/ui-states.md:9 | features/authenticate/ui · coder | — | — | covered |
| LoginPage | loading | analysis/ui-states.md:10 | pages/login/ui · coder | — | — | covered |
| LoginPage | error | analysis/ui-states.md:11 | pages/login/ui · coder | — | — | covered |
| AppHeader | profile closed | analysis/ui-states.md:12 | widgets/app-header/ui · coder | — | — | covered |
| ProfileMenu | open | analysis/ui-states.md:13 | widgets/app-header/ui · component-generator | — | — | covered |
| ProfileMenu | closed | analysis/ui-states.md:14 | widgets/app-header/ui · component-generator | — | — | covered |
| HomePage | success | analysis/ui-states.md:15 | pages/home/ui · coder | — | — | covered |
| VehicleExplorer | default | analysis/ui-states.md:16 | widgets/vehicle-explorer/ui · coder | — | — | covered |
| VehicleExplorer | searching | analysis/ui-states.md:17 | widgets/vehicle-explorer/ui · coder | — | — | covered |
| VehicleExplorer | empty | analysis/ui-states.md:18 | widgets/vehicle-explorer/ui · coder | — | — | covered |
| VehicleCategory | expanded | analysis/ui-states.md:19 | widgets/vehicle-explorer/ui · component-generator | — | — | covered |
| VehicleCategory | collapsed | analysis/ui-states.md:20 | widgets/vehicle-explorer/ui · component-generator | — | — | covered |
| VehicleModelOption | selected | analysis/ui-states.md:21 | widgets/vehicle-explorer/ui · component-generator | — | — | covered |
| SelectedVehiclePreview | fallback image | analysis/ui-states.md:22 | widgets/selected-vehicle/ui · coder/component-generator | — | — | covered |
| TripSetupDialog | open/default/focus/invalid/submitting/closed | analysis/ui-states.md:23-28 | widgets/trip-setup/ui · coder | — | — | covered |
| TelemetryPage | success/score submitting | analysis/ui-states.md:29,33 | pages/telemetry/ui · coder | — | — | covered |
| PravahEmbed | loading/error/ready | analysis/ui-states.md:30-32 | widgets/pravah-embed/ui · coder | — | — | covered |
| DriverAnalytics | success/error | analysis/ui-states.md:34-35 | pages/analytics/ui · coder | — | — | covered |
| CertificateDownload | success | analysis/ui-states.md:36 | widgets/certificate/ui · coder | — | — | covered |
| DriverScoresPage | success/loading/error/empty/search active/sorted | analysis/ui-states.md:37-42 | pages/driver-scores/ui · coder | — | — | covered |
| AppHeader | signed out | analysis/ui-states.md:43 | widgets/app-header/ui · coder | — | — | covered |

## API operations

| Operation | Endpoint | RTK Query integration | Consumer | Mock | Backend gap | Status |
| --------- | -------- | --------------------- | -------- | ---- | ----------- | ------ |
| loginUser | POST /api/auth/login | `loginUser`, features/authenticate/api | LoginForm | true | none listed | covered |
| listVehicles | GET /api/vehicles | `listVehicles`, entities/vehicle/api | VehicleExplorer, SelectedVehiclePreview | true | none listed | covered |
| getFleetOverview | GET /api/fleet-overview | `getFleetOverview`, entities/fleet-overview/api | VehicleStats | true | none listed | covered |
| listRoutes | GET /api/routes | `listRoutes`, entities/route/api | TripSetupDialog | true | none listed | covered |
| createTrip | POST /api/trips | `createTrip`, features/create-trip/api | TripSetupDialog | true | none listed | covered |
| getTelemetryContext | GET /api/trips/{tripId}/telemetry-context | `getTelemetryContext`, entities/trip/api | TelemetryPage, PravahEmbed | true | none listed | covered |
| getDriverScore | GET /api/trips/{tripId}/score | `getDriverScore`, entities/driver-score/api | DriverAnalytics, TripContextBanner | true | none listed | covered |
| listDriverScores | GET /api/driver-scores | `listDriverScores`, entities/driver-score/api | DriverScoresPage, ScoreHistoryTable | true | none listed | covered |
| generateCertificate | POST /api/certificates | `generateCertificate`, features/download-certificate/api | CertificateDownload, ScoreHistoryTable | true | none listed | covered |

All operations are `mock: true`; this is recorded as planned mock coverage, not production backend coverage.

## Data needs

| Need | Endpoint or gap | Consumer(s) | Status |
| ---- | --------------- | ----------- | ------ |
| D1 user authentication | loginUser | LoginForm, AppHeader | covered |
| D2 current session/user | client session slice | AppHeader, ProfileMenu, protected pages | covered |
| D3 vehicle catalog | listVehicles | VehicleExplorer, VehicleCategory, VehicleModelOption | covered |
| D4 selected vehicle | selectedVehicle slice | explorer, preview, dialog | covered |
| D5 vehicle search | local vehicleSearch slice | VehicleExplorer | covered |
| D6 expanded category | local vehicleSearch slice | VehicleCategory | covered |
| D7 fleet KPIs | getFleetOverview | VehicleStats | covered |
| D8 route catalog | listRoutes | TripSetupDialog, TripContextBanner | covered |
| D9 trip context/creation | createTrip | TripSetupDialog, TelemetryPage, DriverAnalytics | covered |
| D10 telemetry context | getTelemetryContext | PravahEmbed, TelemetryPage | covered |
| D11 driver score | getDriverScore | DriverAnalytics, CertificateDownload | covered |
| D12 event breakdown | getDriverScore response | DriverAnalytics | covered |
| D13 driving-style metrics | getDriverScore response | DriverAnalytics | covered |
| D14 score history | listDriverScores | DriverScoresPage, ScoreHistoryTable | covered |
| D15 history search | listDriverScores.search | DriverScoresPage, ScoreHistoryTable | covered |
| D16 history sort | listDriverScores.sort | DriverScoresPage, ScoreHistoryTable | covered |
| D17 certificate | generateCertificate | CertificateDownload, ScoreHistoryTable | covered |
| D18 active navigation | local router state | AppHeader, HomePage, DriverScoresPage | covered |
| D19 profile menu | local UI state | AppHeader, ProfileMenu | covered |

## Capabilities

| Feature | Component | In capabilities.md | Library decision | TASK Acceptance + test line | Code imports the library | Test exists |
| ------- | --------- | ------------------ | ---------------- | -------------------------- | ------------------------ | ----------- |
| none detected; native forms/selects/search are sufficient | LoginPage, TripSetupDialog, DriverScoresPage | ✔ | ✔ plain JSX + Tailwind | — | — | — |

## For Gate 1

No `proposed` or `needs-approval` library decisions. Unanswered requirement questions apply with their documented defaults: Q1–Q7 in `plan/requirements-questions.md`.

## Out of scope

None. `inputs/scope.md` is absent, so the supplied `inputs/ux/dealer.html` is the complete scope.
