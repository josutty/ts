| TASK     | Slice                    | Goal                                      | Depends on | Status |
| -------- | ------------------------ | ----------------------------------------- | ---------- | ------ |
| TASK-001 | shared/ui | Shared primitives and demo chrome | — | done |
| TASK-002 | widgets/app-header | Authenticated header and profile menu | TASK-001 | done |
| TASK-003 | features/authenticate | Login form | TASK-001 | done |
| TASK-004 | pages/login | Login route and composition | TASK-002, TASK-003 | done |
| TASK-005 | widgets/selected-vehicle | Vehicle visual and selected preview | TASK-001 | done |
| TASK-006 | widgets/vehicle-explorer | Vehicle search and category selection | TASK-001 | done |
| TASK-007 | widgets/fleet-overview | Fleet KPI cards | TASK-001 | done |
| TASK-008 | widgets/trip-context | Journey progress and context banner | TASK-001 | done |
| TASK-009 | widgets/trip-setup | Trip setup dialog | TASK-005, TASK-008 | done |
| TASK-010 | widgets/pravah-embed | Host-owned telemetry boundary | TASK-001, TASK-008 | done |
| TASK-011 | pages/home | Home route and vehicle discovery | TASK-002, TASK-005, TASK-006, TASK-007, TASK-008, TASK-009 | done |
| TASK-012 | widgets/score-breakdown | Driver score detail blocks | TASK-001, TASK-008 | done |
| TASK-013 | widgets/certificate | Certificate action and print boundary | TASK-001 | done |
| TASK-014 | pages/telemetry          | Telemetry route and score transition       | TASK-002, TASK-008, TASK-010 | open |
| TASK-015 | pages/analytics          | Analytics route and score result           | TASK-002, TASK-008, TASK-012, TASK-013 | open |
| TASK-016 | widgets/score-history    | Searchable score history table             | TASK-001, TASK-013 | open |
| TASK-017 | pages/driver-scores      | Driver scores route                         | TASK-002, TASK-016 | open |
