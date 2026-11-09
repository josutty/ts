# API schema summary

- **Base URL:** `/` (the application environment may prefix API requests).
- **Authentication:** HTTP bearer token in the `Authorization` header by default. The login operation is explicitly unauthenticated.
- **Pagination envelope:** list responses use `data` for items, `total` for the count, and `page` for the page number. The spec does not define pagination query parameters.
- **Error shape:** `ApiError` with required string fields `code` and `message`.

## Operations

| Operation | Method | Path | Real/mock | Response model |
|---|---|---|---|---|
| loginUser | POST | `/api/auth/login` | mock | LoginUserResponse |
| listVehicles | GET | `/api/vehicles` | mock | ListVehiclesResponse |
| getFleetOverview | GET | `/api/fleet-overview` | mock | GetFleetOverviewResponse |
| listRoutes | GET | `/api/routes` | mock | ListRoutesResponse |
| createTrip | POST | `/api/trips` | mock | CreateTripResponse |
| getTelemetryContext | GET | `/api/trips/{tripId}/telemetry-context` | mock | GetTelemetryContextResponse |
| getDriverScore | GET | `/api/trips/{tripId}/score` | mock | GetDriverScoreResponse |
| listDriverScores | GET | `/api/driver-scores` | mock | ListDriverScoresResponse |
| generateCertificate | POST | `/api/certificates` | mock | GenerateCertificateResponse |

## Vague or incomplete areas

- List operations define `total` and `page` in responses but no pagination request parameters.
- No operation declares a server-side `500` response; consumers should still use the normalized API error path for unexpected failures.
- The specification does not define token expiry, refresh, or bearer-token persistence behavior.
- All operations and schemas are marked proposed; all operations are marked mock.
