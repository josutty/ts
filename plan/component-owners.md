# Component owners

| Component | Slice / segment | Kind | Owner | Depends on |
|---|---|---|---|---|
| DemoStrip | shared/ui | presentational | component-generator | — |
| SkipLink | shared/ui | presentational | component-generator | — |
| AppHeader | widgets/app-header/ui | connected | coder | entities/session, features/sign-out, shared/ui |
| ProfileMenu | widgets/app-header/ui | presentational | component-generator | shared/ui |
| LoginPage | pages/login/ui | page | coder | features/authenticate, shared/ui |
| LoginForm | features/authenticate/ui | connected | coder | features/authenticate api, shared/ui |
| VehicleVisual | widgets/selected-vehicle/ui | presentational | component-generator | shared/ui |
| TripProgress | widgets/trip-context/ui | presentational | component-generator | shared/ui |
| HomePage | pages/home/ui | page | coder | widgets/app-header, widgets/vehicle-explorer, widgets/selected-vehicle, widgets/fleet-overview, widgets/trip-context |
| VehicleStats | widgets/fleet-overview/ui | presentational | component-generator | shared/ui |
| VehicleExplorer | widgets/vehicle-explorer/ui | connected | coder | entities/vehicle, features/search-vehicles, features/select-vehicle, shared/ui |
| VehicleCategory | widgets/vehicle-explorer/ui | presentational | component-generator | shared/ui |
| VehicleModelOption | widgets/vehicle-explorer/ui | presentational | component-generator | shared/ui |
| SelectedVehiclePreview | widgets/selected-vehicle/ui | connected | coder | entities/vehicle, features/select-vehicle, features/create-trip, shared/ui |
| TripSetupDialog | widgets/trip-setup/ui | connected | coder | entities/route, features/create-trip, features/select-vehicle, shared/ui |
| TripContextBanner | widgets/trip-context/ui | presentational | component-generator | shared/ui |
| TelemetryPage | pages/telemetry/ui | page | coder | widgets/app-header, widgets/trip-context, widgets/pravah-embed, features/get-driver-score |
| PravahEmbed | widgets/pravah-embed/ui | connected | coder | entities/trip, shared/ui |
| DriverAnalytics | pages/analytics/ui | page | coder | widgets/app-header, widgets/trip-context, widgets/score-breakdown, widgets/certificate |
| DriverScoresPage | pages/driver-scores/ui | page | coder | widgets/app-header, widgets/score-history, features/search-driver-scores, shared/ui |
| ScoreHistoryTable | widgets/score-history/ui | connected | coder | entities/driver-score, features/download-certificate, shared/ui |
| CertificateDownload | widgets/certificate/ui | connected | coder | features/download-certificate, shared/ui |
| Input | shared/ui | presentational | component-generator | — |
| NativeSelect | shared/ui | presentational | component-generator | — |
| Button | shared/ui | presentational | component-generator | — |
| Notice | shared/ui | presentational | component-generator | — |
| DriverDetails | widgets/score-breakdown/ui | presentational | component-generator | shared/ui |
| ScoreCard | widgets/score-breakdown/ui | presentational | component-generator | shared/ui |
| EventsBreakdown | widgets/score-breakdown/ui | presentational | component-generator | shared/ui |
| DrivingStyleBreakdown | widgets/score-breakdown/ui | presentational | component-generator | shared/ui |

## Non-component work

| Work | Owner |
|---|---|
| RTK Query base API, endpoint injections, session slice, typed store/hooks | store-architect |
| Tokens, light/dark variables, focus/reduced-motion base styles | styling-engineer |
| Providers, route registration, protected-route composition and global styles import | app-bootstrap; page TASKs add their route rows |
| MSW handlers, fixtures, mutation database and error scenarios | mock-data-generator |

All presentational components are props-in/JSX-out and have no store or query hooks. Pages compose widgets/features/entities only; no page owns business state or data fetching. No same-layer slice imports are planned.
