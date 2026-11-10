# Backend gaps — generated 2026-11-09

No backend specification was supplied at `inputs/api/backend-api.yaml` (the input directory contains only `.gitkeep`). This is all-mock mode: every operation below is proposed and must be replaced or reconciled with the production backend contract.

## Proposed endpoints (mocked until built)

| Method | Path | operationId | Needed by | Schema |
|---|---|---|---|---|
| POST | `/api/auth/login` | `loginUser` | D1, LoginForm | LoginRequest, Session |
| GET | `/api/vehicles` | `listVehicles` | D3, VehicleExplorer | Vehicle |
| GET | `/api/fleet-overview` | `getFleetOverview` | D7, VehicleStats | FleetOverview |
| GET | `/api/routes` | `listRoutes` | D8, TripSetupDialog | Route |
| POST | `/api/trips` | `createTrip` | D9, TripSetupDialog | CreateTripRequest, Trip |
| GET | `/api/trips/{tripId}/telemetry-context` | `getTelemetryContext` | D10, PravahEmbed | TelemetryContext |
| GET | `/api/trips/{tripId}/score` | `getDriverScore` | D11–D13, DriverAnalytics | DriverScoreResult |
| GET | `/api/driver-scores` | `listDriverScores` | D14–D16, DriverScoresPage | DriverScoreResult |
| POST | `/api/certificates` | `generateCertificate` | D17, CertificateDownload | Certificate |

## Missing params on real endpoints

None — no real backend operations were supplied.

## Missing fields on real schemas

None — no real backend schemas were supplied.

## Open questions

- Confirm the identity provider, session mechanism, authorization roles, and whether sign-out requires a server operation.
- Confirm authoritative vehicle and route identifiers, attributes, approved images, and company master-data ownership.
- Confirm whether Pravah receives context through this API, a host integration contract, or another secure handoff; telemetry itself remains Pravah-owned.
- Confirm score ownership, algorithm/version, event definitions, metric weights, and evaluation timezone.
- Confirm whether certificates are PDF responses or download URLs, and the authorization and official/nonofficial rules.
- Confirm pagination, filtering, sorting, and maximum page size for score history and vehicle catalogs.

## Spec quality

Minimal Redocly lint: passed with zero errors. Recommended Redocly lint: passed with one informational warning, `info-license` at `info` (the Info object should contain a `license` field). The generated document is OpenAPI 3.0.3 and uses one unique operationId per operation.
