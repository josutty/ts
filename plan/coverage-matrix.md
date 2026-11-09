---
stage: tasks
scope: all
generated: 2026-11-09
extractor: node tools/list-html-elements.mjs
---

# Coverage — 15 elements · 15 covered · 0 partial · 0 missing

## Gaps (read this first)

| # | Type | Item | Missing link | Suggested route |
|---|---|---|---|---|
| G1 | api | all 9 proposed operations | no planned MSW handler file/owner is recorded; `api-integration-points.md` records mock endpoints but no handler evidence | mock-data-generator → add handlers for every endpoint |

## Elements

| Screen | Element | Component | Slice | TASK | File | Route | Test | Status |
|---|---|---|---|---|---|---|---|---|
| dealer/shared | a “Skip to main content” | SkipLink | shared/ui | TASK-001 | `src/shared/ui/SkipLink.tsx` | shared chrome | `src/shared/ui/SkipLink.test.tsx` | covered |
| dealer/shared | div[role=status] “PROTOTYPE …” | DemoStrip | shared/ui | TASK-001 | `src/shared/ui/DemoStrip.tsx` | shared chrome | `src/shared/ui/DemoStrip.test.tsx` | covered |
| dealer/shared | header#header | AppHeader | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/AppHeader.tsx` | authenticated chrome | `src/widgets/app-header/ui/AppHeader.test.tsx` | covered |
| dealer/shared | img “Eicher - Nayi Soch Naye Raaste” | AppHeader | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/AppHeader.tsx` | authenticated chrome | `src/widgets/app-header/ui/AppHeader.test.tsx` | covered |
| dealer/shared | nav#nav | AppHeader | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/AppHeader.tsx` | authenticated chrome | `src/widgets/app-header/ui/AppHeader.test.tsx` | covered |
| dealer/shared | button “Home” | AppHeader/Button | widgets/app-header/ui; shared/ui | TASK-002; TASK-001 | `src/widgets/app-header/ui/AppHeader.tsx`; `src/shared/ui/Button.tsx` | authenticated chrome | `AppHeader.test.tsx`; `Button.test.tsx` | covered |
| dealer/shared | button “Drivers Score” | AppHeader/Button | widgets/app-header/ui; shared/ui | TASK-002; TASK-001 | `src/widgets/app-header/ui/AppHeader.tsx`; `src/shared/ui/Button.tsx` | authenticated chrome | `AppHeader.test.tsx`; `Button.test.tsx` | covered |
| dealer/shared | button#userBtn “admin ▾” | AppHeader/ProfileMenu | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/AppHeader.tsx`; `ProfileMenu.tsx` | authenticated chrome | `AppHeader.test.tsx`; `ProfileMenu.test.tsx` | covered |
| dealer/shared | span#usernameLabel “admin” | AppHeader | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/AppHeader.tsx` | authenticated chrome | `AppHeader.test.tsx` | covered |
| dealer/shared | span#chevron “▾” | AppHeader/ProfileMenu | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/AppHeader.tsx`; `ProfileMenu.tsx` | authenticated chrome | `ProfileMenu.test.tsx` | covered |
| dealer/shared | div#userMenu | ProfileMenu | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/ProfileMenu.tsx` | authenticated chrome | `src/widgets/app-header/ui/ProfileMenu.test.tsx` | covered |
| dealer/shared | b#menuUser | ProfileMenu | widgets/app-header/ui | TASK-002 | `src/widgets/app-header/ui/ProfileMenu.tsx` | authenticated chrome | `src/widgets/app-header/ui/ProfileMenu.test.tsx` | covered |
| dealer/shared | button#signOut “↪ Sign Out” | ProfileMenu/Button | widgets/app-header/ui; shared/ui | TASK-002; TASK-001 | `ProfileMenu.tsx`; `src/shared/ui/Button.tsx` | authenticated chrome | `ProfileMenu.test.tsx`; `Button.test.tsx` | covered |
| dealer/app | div#app | LoginPage | pages/login/ui | TASK-004 | `src/pages/login/ui/LoginPage.tsx` | `/login` | `src/pages/login/ui/LoginPage.test.tsx`; `e2e/login.spec.ts` | covered |
| dealer/app | div#modalRoot | TripSetupDialog | widgets/trip-setup/ui | TASK-009 | `src/widgets/trip-setup/ui/TripSetupDialog.tsx` | `/` | `src/widgets/trip-setup/ui/TripSetupDialog.test.tsx` | covered |

The extractor found one screen, one shared chrome block, no crawler-reached overlays/toasts/reveals/select options, and one in-place skip-link control. Hidden profile and dialog shells are traced above. Fresh evidence: `plan/coverage-check/interactions.md`.

## UI states

| Component | State | Analysis evidence | Slice + owner | TASK | Test file / planned test evidence | Status |
|---|---|---|---|---|---|---|
| LoginPage | default | `analysis/ui-states.md:5` | pages/login/ui · coder | TASK-004 | `LoginPage.test.tsx` — one h1/main | covered |
| LoginForm | default | `analysis/ui-states.md:6` | features/authenticate/ui · coder | TASK-003 | `LoginForm.test.tsx` — required fields | covered |
| LoginForm | focus | `analysis/ui-states.md:7` | features/authenticate/ui · coder | TASK-003 | `LoginForm.test.tsx` — focus/labels | covered |
| LoginForm | invalid | `analysis/ui-states.md:8` | features/authenticate/ui · coder | TASK-003 | `LoginForm.test.tsx` — validation/errors | covered |
| LoginForm | submitting | `analysis/ui-states.md:9` | features/authenticate/ui · coder | TASK-003 | `LoginForm.test.tsx` — disabled/loading submit | covered |
| LoginPage | loading | `analysis/ui-states.md:10` | pages/login/ui · coder | TASK-004 | `LoginPage.test.tsx` — busy rendering | covered |
| LoginPage | error | `analysis/ui-states.md:11` | pages/login/ui · coder | TASK-004 | `LoginPage.test.tsx` — auth error/retry | covered |
| AppHeader | profile closed | `analysis/ui-states.md:12` | widgets/app-header/ui · coder | TASK-002 | `AppHeader.test.tsx` — closed menu | covered |
| ProfileMenu | open | `analysis/ui-states.md:13` | widgets/app-header/ui · component-generator | TASK-002 | `ProfileMenu.test.tsx` — open/aria-expanded | covered |
| ProfileMenu | closed | `analysis/ui-states.md:14` | widgets/app-header/ui · component-generator | TASK-002 | `ProfileMenu.test.tsx` — Escape/outside close | covered |
| HomePage | success | `analysis/ui-states.md:15` | pages/home/ui · coder | TASK-011 | `HomePage.test.tsx` — widget composition | covered |
| VehicleExplorer | default | `analysis/ui-states.md:16` | widgets/vehicle-explorer/ui · coder | TASK-006 | `VehicleExplorer.test.tsx` — default catalog | covered |
| VehicleExplorer | searching | `analysis/ui-states.md:17` | widgets/vehicle-explorer/ui · coder | TASK-006 | `VehicleExplorer.test.tsx` — typing filters | covered |
| VehicleExplorer | empty | `analysis/ui-states.md:18` | widgets/vehicle-explorer/ui · coder | TASK-006 | `VehicleExplorer.test.tsx` — empty message | covered |
| VehicleCategory | expanded | `analysis/ui-states.md:19` | widgets/vehicle-explorer/ui · component-generator | TASK-006 | `VehicleCategory.test.tsx` — aria-expanded | covered |
| VehicleCategory | collapsed | `analysis/ui-states.md:20` | widgets/vehicle-explorer/ui · component-generator | TASK-006 | `VehicleCategory.test.tsx` — toggle | covered |
| VehicleModelOption | selected | `analysis/ui-states.md:21` | widgets/vehicle-explorer/ui · component-generator | TASK-006 | `VehicleModelOption.test.tsx` — selected name/callback | covered |
| SelectedVehiclePreview | fallback image | `analysis/ui-states.md:22` | widgets/selected-vehicle/ui · coder | TASK-005 | `VehicleVisual.test.tsx`; `SelectedVehiclePreview.test.tsx` — fallback | covered |
| TripSetupDialog | open | `analysis/ui-states.md:23` | widgets/trip-setup/ui · coder | TASK-009 | `TripSetupDialog.test.tsx` — opens/focuses | covered |
| TripSetupDialog | default | `analysis/ui-states.md:24` | widgets/trip-setup/ui · coder | TASK-009 | `TripSetupDialog.test.tsx` — read-only vehicle/route prompt | covered |
| TripSetupDialog | focus | `analysis/ui-states.md:25` | widgets/trip-setup/ui · coder | TASK-009 | `TripSetupDialog.test.tsx` — initial focus | covered |
| TripSetupDialog | invalid | `analysis/ui-states.md:26` | widgets/trip-setup/ui · coder | TASK-009 | `TripSetupDialog.test.tsx` — required errors | covered |
| TripSetupDialog | submitting | `analysis/ui-states.md:27` | widgets/trip-setup/ui · coder | TASK-009 | `TripSetupDialog.test.tsx` — disabled/loading | covered |
| TripSetupDialog | closed | `analysis/ui-states.md:28` | widgets/trip-setup/ui · coder | TASK-009 | `TripSetupDialog.test.tsx` — cancel/Escape/focus return | covered |
| TelemetryPage | success | `analysis/ui-states.md:29` | pages/telemetry/ui · coder | TASK-014 | `TelemetryPage.test.tsx` — trip context | covered |
| PravahEmbed | loading | `analysis/ui-states.md:30` | widgets/pravah-embed/ui · coder | TASK-010 | `PravahEmbed.test.tsx` — aria-busy | covered |
| PravahEmbed | error | `analysis/ui-states.md:31` | widgets/pravah-embed/ui · coder | TASK-010 | `PravahEmbed.test.tsx` — alert/retry | covered |
| PravahEmbed | ready | `analysis/ui-states.md:32` | widgets/pravah-embed/ui · coder | TASK-010 | `PravahEmbed.test.tsx` — placeholder/no readings | covered |
| TelemetryPage | score submitting | `analysis/ui-states.md:33` | pages/telemetry/ui · coder | TASK-014 | `TelemetryPage.test.tsx` — busy/duplicate protection | covered |
| DriverAnalytics | success | `analysis/ui-states.md:34` | pages/analytics/ui · coder | TASK-015 | `DriverAnalytics.test.tsx` — score result | covered |
| DriverAnalytics | error | `analysis/ui-states.md:35` | pages/analytics/ui · coder | TASK-015 | `DriverAnalytics.test.tsx` — error/retry | covered |
| CertificateDownload | success | `analysis/ui-states.md:36` | widgets/certificate/ui · coder | TASK-013 | `CertificateDownload.test.tsx` — sample certificate | covered |
| DriverScoresPage | success | `analysis/ui-states.md:37` | pages/driver-scores/ui · coder | TASK-017 | `DriverScoresPage.test.tsx` — summary/table | covered |
| DriverScoresPage | loading | `analysis/ui-states.md:38` | pages/driver-scores/ui · coder | TASK-017 | `DriverScoresPage.test.tsx` — loading | covered |
| DriverScoresPage | error | `analysis/ui-states.md:39` | pages/driver-scores/ui · coder | TASK-017 | `DriverScoresPage.test.tsx` — error/retry | covered |
| DriverScoresPage | empty | `analysis/ui-states.md:40` | pages/driver-scores/ui · coder | TASK-017 | `DriverScoresPage.test.tsx` — empty | covered |
| DriverScoresPage | search active | `analysis/ui-states.md:41` | pages/driver-scores/ui · coder | TASK-017 | `DriverScoresPage.test.tsx` — search/count | covered |
| DriverScoresPage | sorted | `analysis/ui-states.md:42` | pages/driver-scores/ui · coder | TASK-017 | `DriverScoresPage.test.tsx` — native sort | covered |
| AppHeader | signed out | `analysis/ui-states.md:43` | widgets/app-header/ui · coder | TASK-002 | `AppHeader.test.tsx` — sign-out callback | covered |

## API operations

| Operation | Endpoint | RTK Query endpoint / defined in | Consumer | MSW handler | Backend gap | Status |
|---|---|---|---|---|---|---|
| loginUser | POST `/api/auth/login` | `loginUser` / `features/authenticate/api` | LoginForm | not planned in task files (G1) | proposed mock; `backend-gaps.md:9` | partial |
| listVehicles | GET `/api/vehicles` | `listVehicles` / `entities/vehicle/api` | VehicleExplorer, SelectedVehiclePreview | not planned in task files (G1) | proposed mock; `backend-gaps.md:10` | partial |
| getFleetOverview | GET `/api/fleet-overview` | `getFleetOverview` / `entities/fleet-overview/api` | VehicleStats | not planned in task files (G1) | proposed mock; `backend-gaps.md:11` | partial |
| listRoutes | GET `/api/routes` | `listRoutes` / `entities/route/api` | TripSetupDialog | not planned in task files (G1) | proposed mock; `backend-gaps.md:12` | partial |
| createTrip | POST `/api/trips` | `createTrip` / `features/create-trip/api` | TripSetupDialog | not planned in task files (G1) | proposed mock; `backend-gaps.md:13` | partial |
| getTelemetryContext | GET `/api/trips/{tripId}/telemetry-context` | `getTelemetryContext` / `entities/trip/api` | TelemetryPage, PravahEmbed | not planned in task files (G1) | proposed mock; `backend-gaps.md:14` | partial |
| getDriverScore | GET `/api/trips/{tripId}/score` | `getDriverScore` / `entities/driver-score/api` | DriverAnalytics, TripContextBanner | not planned in task files (G1) | proposed mock; `backend-gaps.md:15` | partial |
| listDriverScores | GET `/api/driver-scores` | `listDriverScores` / `entities/driver-score/api` | DriverScoresPage, ScoreHistoryTable | not planned in task files (G1) | proposed mock; `backend-gaps.md:16` | partial |
| generateCertificate | POST `/api/certificates` | `generateCertificate` / `features/download-certificate/api` | CertificateDownload, ScoreHistoryTable | not planned in task files (G1) | proposed mock; `backend-gaps.md:17` | partial |

All nine operations are `mock: true` in `plan/generated/endpoints-map.json`; no real backend contract exists. The endpoint-to-backend-gap links are present, but handler evidence is the single tasks-stage gap above.

## Data needs

| Need | Endpoint or gap | Consumer(s) | Status |
|---|---|---|---|
| D1 user authentication | `loginUser`; `backend-gaps.md:9` | LoginForm, AppHeader | covered |
| D2 current session/user | session slice in `api-integration-points.md:21` | AppHeader, ProfileMenu, protected pages | covered |
| D3 vehicle catalog | `listVehicles`; `backend-gaps.md:10` | VehicleExplorer, VehicleCategory, VehicleModelOption | covered |
| D4 selected vehicle | selectedVehicle slice | explorer, preview, dialog | covered |
| D5 vehicle search | vehicleSearch slice | VehicleExplorer | covered |
| D6 expanded category | vehicleSearch slice | VehicleCategory | covered |
| D7 fleet KPIs | `getFleetOverview`; `backend-gaps.md:11` | VehicleStats | covered |
| D8 route catalog | `listRoutes`; `backend-gaps.md:12` | TripSetupDialog, TripContextBanner | covered |
| D9 trip context/creation | `createTrip`; `backend-gaps.md:13` | TripSetupDialog, TelemetryPage, DriverAnalytics | covered |
| D10 telemetry context | `getTelemetryContext`; `backend-gaps.md:14` | PravahEmbed, TelemetryPage | covered |
| D11 driver score | `getDriverScore`; `backend-gaps.md:15` | DriverAnalytics, CertificateDownload | covered |
| D12 event breakdown | `getDriverScore` response; `backend-gaps.md:15` | DriverAnalytics | covered |
| D13 driving-style metrics | `getDriverScore` response; `backend-gaps.md:15` | DriverAnalytics | covered |
| D14 score history | `listDriverScores`; `backend-gaps.md:16` | DriverScoresPage, ScoreHistoryTable | covered |
| D15 history search | `listDriverScores.search`; `backend-gaps.md:16` | DriverScoresPage, ScoreHistoryTable | covered |
| D16 history sort | `listDriverScores.sort`; `backend-gaps.md:16` | DriverScoresPage, ScoreHistoryTable | covered |
| D17 certificate | `generateCertificate`; `backend-gaps.md:17` | CertificateDownload, ScoreHistoryTable | covered |
| D18 active navigation | local router state; route rows in TASK-004/011/014/015/017 | AppHeader, HomePage, DriverScoresPage | covered |
| D19 profile menu | local UI state; TASK-002 | AppHeader, ProfileMenu | covered |

## Capabilities

| Feature | Component | In capabilities.md | Library decision | TASK Acceptance + test line | Code imports the library | Test exists |
|---|---|---|---|---|---|---|
| none detected; native forms/selects/search are sufficient | LoginPage, TripSetupDialog, DriverScoresPage | ✔ | ✔ plain JSX + Tailwind | ✔ TASK-003, TASK-009, TASK-016/017 native-control acceptance/tests | N/A — no library | ✔ planned in those TASK test files |

No complex detected capability requires a library or a separate capability test. `analysis/capabilities.md` and the detector output both report none.

## For Gate 1

No `proposed` or `needs-approval` library decisions. Unanswered requirement questions Q1–Q7 in `plan/requirements-questions.md` retain their documented defaults.

## Out of scope

None. `inputs/scope.md` is absent, so `inputs/ux/dealer.html` is the complete scope.
