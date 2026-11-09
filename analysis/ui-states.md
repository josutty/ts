# UI states

| Component | State | Trigger | Expected UI | In design? |
|---|---|---|---|---|
| LoginPage | default | initial unauthenticated visit | login hero and sign-in card | yes — `#app` initial render |
| LoginForm | default | initial render | empty Username and Password fields, Sign In button | yes |
| LoginForm | focus | keyboard/pointer focus | visible red focus ring | standard / CSS |
| LoginForm | invalid | empty submit or rejected credentials | field/form error; remain on login | standard; rejected message not drawn |
| LoginForm | submitting | submit accepted | disabled/loading Sign In button | standard |
| LoginPage | loading | auth request in flight | labelled busy form | standard |
| LoginPage | error | auth request fails | safe alert and retryable form | standard |
| AppHeader | profile closed | authenticated page | username and chevron visible | yes — hidden in static initial state |
| ProfileMenu | open | user button click | Signed in as, username, Sign Out menu | yes — hidden text in `#userMenu` |
| ProfileMenu | closed | outside click or Escape | menu hidden | yes |
| HomePage | success | login | vehicle explorer, stats and selected preview | source JS state; crawler did not reach |
| VehicleExplorer | default | home load | Medium Duty expanded; Pro 3015 selected | source JS state |
| VehicleExplorer | searching | type in vehicle search | matching categories/models only | source JS handler |
| VehicleExplorer | empty | no matching model | `No vehicles found. Try a different model name.` | source JS handler |
| VehicleCategory | expanded | View Vehicles click | model list and Hide Vehicles ▲ | source JS handler |
| VehicleCategory | collapsed | Hide Vehicles click | model list hidden and View Vehicles ▼ | source JS handler |
| VehicleModelOption | selected | model click | selected highlight, `✓ Selected`, preview updates | source JS handler |
| SelectedVehiclePreview | fallback image | image load error/no approved image | illustrative truck and `PRODUCT IMAGE · REPLACEABLE` | yes for fallback |
| TripSetupDialog | open | Explore model click | labelled modal with four fields and actions | source JS handler; hidden shell in static HTML |
| TripSetupDialog | default | opened | vehicle read-only; route prompt selected | source JS handler |
| TripSetupDialog | focus | opened | Driver Name receives focus | source JS handler |
| TripSetupDialog | invalid | missing driver/company/route submit | submission prevented; field errors required in production | partially — required attributes only |
| TripSetupDialog | submitting | valid submit | disabled/loading Proceed button | standard |
| TripSetupDialog | closed | Cancel, close, backdrop, Escape | modal removed; selected vehicle retained | source JS handler |
| TelemetryPage | success | valid trip submitted | trip banner, simulated status, embed region | source JS state |
| PravahEmbed | loading | embed starting | labelled busy placeholder | standard / FSD |
| PravahEmbed | error | embed unavailable | clear integration-unavailable fallback, no fake readings | FSD requirement, not drawn |
| PravahEmbed | ready | embed loads | Pravah-owned content below host banner | placeholder only in FSD |
| TelemetryPage | score submitting | Get Driver Score click | prevent duplicate submissions; busy button | standard / FR-023 |
| DriverAnalytics | success | score returned | score 88/100, details, events, radar and certificate action | source JS state |
| DriverAnalytics | error | score retrieval fails | alert with retry | standard |
| CertificateDownload | success | download click | printable certificate marked sample/nonofficial | source JS output |
| DriverScoresPage | success | Drivers Score navigation | summary, searchable/sortable table | source JS state |
| DriverScoresPage | loading | history request | labelled table loading state | standard |
| DriverScoresPage | error | history request fails | alert plus Retry | standard |
| DriverScoresPage | empty | no records or no query matches | `No matching driver results. Try a different search.` | yes for filtered empty |
| DriverScoresPage | search active | score search input | result count and matching rows update | source JS handler |
| DriverScoresPage | sorted | sort select | rows ordered by recent/high/low/name | source JS handler |
| AppHeader | signed out | Sign Out | session cleared and login shown | source JS handler |
