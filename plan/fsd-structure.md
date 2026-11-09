# FSD structure

## pages/

- `pages/login/` `ui/LoginPage.tsx` — unauthenticated sign-in composition, route `/login`
- `pages/home/` `ui/HomePage.tsx` — vehicle discovery and fleet overview composition, route `/`
- `pages/telemetry/` `ui/TelemetryPage.tsx` — host trip context and Pravah mount composition, route `/telemetry/:tripId`
- `pages/analytics/` `ui/DriverAnalytics.tsx` — score result and certificate composition, route `/analytics/:tripId`
- `pages/driver-scores/` `ui/DriverScoresPage.tsx` — historical score composition, route `/scores`

## widgets/

- `widgets/app-header/` `ui/AppHeader.tsx`, `ui/ProfileMenu.tsx` — authenticated navigation, user menu, and sign-out affordance
- `widgets/vehicle-explorer/` `ui/VehicleExplorer.tsx`, `ui/VehicleCategory.tsx`, `ui/VehicleModelOption.tsx` — searchable category/model discovery
- `widgets/selected-vehicle/` `ui/SelectedVehiclePreview.tsx`, `ui/VehicleVisual.tsx` — selected vehicle details and imagery
- `widgets/fleet-overview/` `ui/VehicleStats.tsx` — fleet KPI cards
- `widgets/trip-setup/` `ui/TripSetupDialog.tsx` — trip form modal and trip creation flow
- `widgets/trip-context/` `ui/TripContextBanner.tsx`, `ui/TripProgress.tsx` — shared journey context and progress
- `widgets/pravah-embed/` `ui/PravahEmbed.tsx` — host-owned loading/error/mount boundary; no telemetry dashboard logic
- `widgets/score-history/` `ui/ScoreHistoryTable.tsx` — score table rows and empty state
- `widgets/score-breakdown/` `ui/DriverDetails.tsx`, `ui/ScoreCard.tsx`, `ui/EventsBreakdown.tsx`, `ui/DrivingStyleBreakdown.tsx` — analytics detail blocks
- `widgets/certificate/` `ui/CertificateDownload.tsx` — current/history certificate action and printable output boundary

## features/

- `features/authenticate/` `api/`, `ui/LoginForm.tsx` — login mutation and form submission state
- `features/sign-out/` `ui/` — session invalidation action exposed to app header
- `features/select-vehicle/` `model/` — selected vehicle client state and selection behavior
- `features/search-vehicles/` `model/` — vehicle search query and category expansion UI state
- `features/create-trip/` `api/` — trip setup submission mutation
- `features/get-driver-score/` `api/` — score retrieval action and duplicate-submit protection
- `features/download-certificate/` `api/` — certificate generation/download mutation
- `features/search-driver-scores/` `model/` — history search/sort UI state

## entities/

- `entities/session/` `model/sessionSlice.ts` — authenticated user/session client state
- `entities/vehicle/` `api/vehicleApi.ts` — vehicle catalog read API and vehicle models
- `entities/fleet-overview/` `api/fleetOverviewApi.ts` — fleet KPI read API
- `entities/route/` `api/routeApi.ts` — approved route catalog read API
- `entities/trip/` `api/tripApi.ts` — telemetry context read API and trip models
- `entities/driver-score/` `api/driverScoreApi.ts` — score result/history read APIs

## shared/

- `shared/api/` — `baseApi`, normalized errors, generated API types, and endpoint configuration
- `shared/ui/` — `DemoStrip`, `SkipLink`, `Button`, `Input`, `NativeSelect`, `Notice`, `Dialog`, `Badge`, and theme primitives
- `shared/lib/` — typed store hooks, formatting, certificate print helpers, and logger
- `shared/config/` — routes and environment configuration

Each listed slice exposes its public UI/model/api symbols from `index.ts`; consumers use slice public APIs only. `app/` owns providers, store composition and routing but is not a feature slice.

## Public slice exports

- `pages/login/index.ts`: `LoginPage`; `pages/home/index.ts`: `HomePage`; `pages/telemetry/index.ts`: `TelemetryPage`; `pages/analytics/index.ts`: `DriverAnalytics`; `pages/driver-scores/index.ts`: `DriverScoresPage`
- `widgets/app-header/index.ts`: `AppHeader`, `ProfileMenu`; `widgets/vehicle-explorer/index.ts`: `VehicleExplorer`, `VehicleCategory`, `VehicleModelOption`; `widgets/selected-vehicle/index.ts`: `SelectedVehiclePreview`, `VehicleVisual`; `widgets/fleet-overview/index.ts`: `VehicleStats`
- `widgets/trip-setup/index.ts`: `TripSetupDialog`; `widgets/trip-context/index.ts`: `TripContextBanner`, `TripProgress`; `widgets/pravah-embed/index.ts`: `PravahEmbed`; `widgets/score-history/index.ts`: `ScoreHistoryTable`; `widgets/score-breakdown/index.ts`: `DriverDetails`, `ScoreCard`, `EventsBreakdown`, `DrivingStyleBreakdown`; `widgets/certificate/index.ts`: `CertificateDownload`
- `features/authenticate/index.ts`: `LoginForm`, `useLoginUserMutation`; `features/sign-out/index.ts`: sign-out action; `features/select-vehicle/index.ts`: selected-vehicle selectors/actions; `features/search-vehicles/index.ts`: search selectors/actions; `features/create-trip/index.ts`: `useCreateTripMutation`; `features/get-driver-score/index.ts`: score action; `features/download-certificate/index.ts`: `useGenerateCertificateMutation`; `features/search-driver-scores/index.ts`: search/sort selectors/actions
- `entities/session/index.ts`: session selectors/actions; `entities/vehicle/index.ts`: vehicle models, `useListVehiclesQuery`; `entities/fleet-overview/index.ts`: `useGetFleetOverviewQuery`; `entities/route/index.ts`: `useListRoutesQuery`; `entities/trip/index.ts`: trip models, `useGetTelemetryContextQuery`; `entities/driver-score/index.ts`: score models, `useGetDriverScoreQuery`, `useListDriverScoresQuery`
- `shared/ui/index.ts`: `DemoStrip`, `SkipLink`, `Button`, `Input`, `NativeSelect`, `Notice`, `Dialog`, `Badge`; `shared/api/index.ts`: `baseApi`, `ApiError`, `getErrorMessage`; `shared/lib/index.ts`: typed hooks, formatters, print helpers, logger; `shared/config/index.ts`: routes and env access

## Client FSD compliance

| Client doc section | Requirement | Where planned | Status |
|---|---|---|---|
| §5 In scope | Login, header/profile, vehicle explorer, trip setup, telemetry host, score, analytics, history, certificates | pages, widgets, features, entities above | as specified |
| §6 End-to-end process | Login → vehicle → trip → telemetry → score → analytics/certificate; scores from Home | page routes and feature/entity APIs | as specified |
| §7.1 | Required login, protected screens, profile menu and sign-out | pages/login, features/authenticate, entities/session, widgets/app-header | as specified |
| §7.2 | Category expansion, search, selection, preview and score navigation | widgets/vehicle-*, features/select-vehicle, features/search-vehicles | as specified |
| §7.3 | Required trip fields, read-only vehicle, route, cancel/proceed | widgets/trip-setup, features/create-trip, entities/route | as specified |
| §7.4 and §8 | Host owns summary/embed boundary; Pravah owns telemetry UI; no duplicated telemetry | widgets/trip-context, widgets/pravah-embed, pages/telemetry | as specified |
| §7.5–§7.6 | Score details, searchable/sortable history, accurate certificate per result | pages/analytics, pages/driver-scores, widgets/score-*, features/download-certificate | as specified |
| §11 | Eicher branding, light surfaces, restrained red actions, approved imagery | shared/ui/theme, widgets/vehicle-* | as specified |
| §12 | UAT journey and recovery states | all route pages and owning widgets/features | as specified |
| §14 | TBD integration, score, master-data and certificate decisions remain configurable | shared/config plus API contracts; no invented ownership | as specified |
