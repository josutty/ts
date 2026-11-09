# Store design

## Store shape

| Reducer path | Source | Fields |
|---|---|---|
| `api` | `src/shared/api/baseApi.ts` | RTK Query cache and subscriptions |
| `session` | `entities/session/model/sessionSlice.ts` | `user`, `status`, `authError` |
| `selectedVehicle` | `features/select-vehicle/model/selectedVehicleSlice.ts` | `vehicleId` |
| `vehicleSearch` | `features/search-vehicles/model/vehicleSearchSlice.ts` | `query`, `expandedCategory` |
| `driverScoreSearch` | `features/search-driver-scores/model/driverScoreSearchSlice.ts` | `query`, `sort` |

## Endpoints

| Name | Type | Path | Tags | Hook | File |
|---|---|---|---|---|---|
| loginUser | mutation | `POST /api/auth/login` | invalidates Session | `useLoginUserMutation` | `features/authenticate/api/authenticateApi.ts` |
| listVehicles | query | `GET /api/vehicles` | provides Vehicle LIST/category/model/id | `useListVehiclesQuery` | `entities/vehicle/api/vehicleApi.ts` |
| getFleetOverview | query | `GET /api/fleet-overview` | provides FleetOverview | `useGetFleetOverviewQuery` | `entities/fleet-overview/api/fleetOverviewApi.ts` |
| listRoutes | query | `GET /api/routes` | provides Route LIST/id | `useListRoutesQuery` | `entities/route/api/routeApi.ts` |
| createTrip | mutation | `POST /api/trips` | invalidates Trip LIST/new id | `useCreateTripMutation` | `features/create-trip/api/createTripApi.ts` |
| getTelemetryContext | query | `GET /api/trips/{tripId}/telemetry-context` | provides Trip and TelemetryContext | `useGetTelemetryContextQuery` | `entities/trip/api/tripApi.ts` |
| getDriverScore | query | `GET /api/trips/{tripId}/score` | provides DriverScore trip id | `useGetDriverScoreQuery` | `entities/driver-score/api/driverScoreApi.ts` |
| listDriverScores | query | `GET /api/driver-scores` | provides DriverScore LIST/id | `useListDriverScoresQuery` | `entities/driver-score/api/driverScoreApi.ts` |
| generateCertificate | mutation | `POST /api/certificates` | invalidates Certificate result id | `useGenerateCertificateMutation` | `features/download-certificate/api/downloadCertificateApi.ts` |

## Slice actions/selectors

| Slice | Actions | Selectors |
|---|---|---|
| session | `signedIn`, `signedOut`, `authFailed` | `selectUser`, `selectIsAuthenticated`, `selectAuthError` |
| selectedVehicle | `vehicleSelected`, `vehicleCleared` | `selectVehicleId` |
| vehicleSearch | `searchChanged`, `categoryExpanded` | `selectQuery`, `selectExpandedCategory` |
| driverScoreSearch | `searchChanged`, `sortChanged` | `selectQuery`, `selectSort` |

## Tag strategy

Tags are entity-specific and use `LIST` for collection queries, stable entity ids for individual records, and scoped ids for derived category/model or certificate resources. A 401 dispatches `sessionExpired`; all fetch errors are normalized to `ApiError`.
