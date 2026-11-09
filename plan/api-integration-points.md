# API integration points

| operationId | Mock? | RTK Query endpoint | Type | Defined in | Tags provides / invalidates | Consumers | Error UX |
|---|---|---|---|---|---|---|---|
| loginUser | mock | loginUser | mutation | features/authenticate/api | Session / invalidates Session | features/authenticate | safe alert, retry; 401 stays on login |
| listVehicles | mock | listVehicles | query | entities/vehicle/api | Vehicle LIST + category/model ids | widgets/vehicle-explorer, widgets/selected-vehicle | banner with retry; empty no-results state |
| getFleetOverview | mock | getFleetOverview | query | entities/fleet-overview/api | FleetOverview | widgets/fleet-overview | KPI error notice with retry |
| listRoutes | mock | listRoutes | query | entities/route/api | Route LIST + ids | widgets/trip-setup | field/form error with retry |
| createTrip | mock | createTrip | mutation | features/create-trip/api | Trip LIST + new trip id | widgets/trip-setup | field validation or alert; retry |
| getTelemetryContext | mock | getTelemetryContext | query | entities/trip/api | Trip id / TelemetryContext id | pages/telemetry, widgets/pravah-embed | integration-unavailable fallback, retry |
| getDriverScore | mock | getDriverScore | query | entities/driver-score/api | DriverScore trip id | pages/analytics, widgets/trip-context | alert with retry; prevent duplicate request |
| listDriverScores | mock | listDriverScores | query | entities/driver-score/api | DriverScore LIST + ids | pages/driver-scores, widgets/score-history | alert with retry; empty table state |
| generateCertificate | mock | generateCertificate | mutation | features/download-certificate/api | Certificate result id / invalidates Certificate | widgets/certificate, widgets/score-history | download error alert with retry |

All operations are marked mock in `endpoints-map.json`; `hybrid` mode therefore uses MSW for each until a real backend operation is supplied. Optional query parameters use an object argument (callers pass `{}` when needed). API errors normalize to `ApiError` and render through `getErrorMessage`.

## Client-state slices

| Slice | File | Fields | Consumers |
|---|---|---|---|
| session | `entities/session/model/sessionSlice.ts` | `user: User \| null`, `status: 'signedOut' \| 'signedIn'`, `authError?: string` | AppHeader, ProfileMenu, protected routing, LoginPage |
| selectedVehicle | `features/select-vehicle/model/selectedVehicleSlice.ts` | `vehicleId: string \| null` | VehicleExplorer, SelectedVehiclePreview, TripSetupDialog |
| vehicleSearch | `features/search-vehicles/model/vehicleSearchSlice.ts` | `query: string`, `expandedCategory?: string` | VehicleExplorer, VehicleCategory |
| driverScoreSearch | `features/search-driver-scores/model/driverScoreSearchSlice.ts` | `query: string`, `sort: 'mostRecent' \| 'highestScore' \| 'lowestScore' \| 'driverName'` | DriverScoresPage, ScoreHistoryTable |

Local-only state remains local: profile menu open/closed, modal open/closed, form fields/errors, embed status, and route navigation. Server data is never copied into a client slice.
