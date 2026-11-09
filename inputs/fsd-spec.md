VECV Fleet Intelligence Platform \| Premium Eicher-Branded Prototype V8

Document version: 1.0 • Date: 09 November 2026 • Status: Draft for stakeholder review

Basis: approved conversation requirements, V8 standalone HTML prototype, and supplied Eicher Brand Book. This document describes intended production behavior; it does not certify that the prototype implements backend capabilities.

# 1. Document control and approvals

| Role                          | Name / status                                      |
|-------------------------------|----------------------------------------------------|
| Business owner / VECV sponsor | TBD                                                |
| Product owner                 | TBD                                                |
| Pravah telemetry owner        | TBD                                                |
| Technology / security owner   | TBD                                                |
| Prepared for                  | Stakeholder validation and implementation planning |
| Approval status               | Not yet approved                                   |

# 2. Executive summary

The platform provides a guided journey for non-technical fleet users to select an Eicher vehicle, enter trip details, view vehicle telemetry, obtain a driver performance score, and download a sample or official certificate. A separate Drivers Score view supports searching historical driver results. Production deployment requires authenticated users, approved master data, live Pravah integrations, an agreed scoring engine, and persistent records.

# 3. Business objectives and success measures

• Reduce friction in vehicle selection through clear category labels, model search, expanded category and selected-vehicle preview.

• Give fleet users a consistent view of driver, vehicle, route and trip status across screens.

• Enable trustworthy performance reporting with explainable scores, date context and downloadable certificates.

• Present a premium, brand-consistent Eicher experience across desktop and tablet.

• Enable future integration with Pravah live telemetry and production data services.

Proposed measures (targets TBD): trip setup completion rate, time to select vehicle, score retrieval success rate, certificate generation success rate, user task completion, accessibility conformance, and telemetry freshness.

# 4. Stakeholders and user roles

| Role                            | Primary needs                                                             |
|---------------------------------|---------------------------------------------------------------------------|
| Fleet user / operator           | Login, select vehicle, configure trip, view embedded Pravah telemetry and driver score    |
| Fleet manager                   | Review drivers’ scores and download certificates                          |
| System administrator (proposed) | Manage user access and approved master data; scope TBD                    |
| Pravah integration team         | Own, develop, deliver and maintain the Pravah React telemetry application and agree the embedding contract    |
| VECV brand / product team       | Approve visual assets, vehicle information, terminology and scoring rules |

# 5. Scope

## In scope — V8 experience and production target

Login and sign-out; consistent header/profile menu; home/vehicle explorer; category expansion and model search; selected-vehicle preview; trip setup; Pravah React application placeholder and host-owned trip banner; driver score retrieval; analytics; Drivers Score listing; certificate generation; navigation, responsive and accessibility requirements.

## Out of scope unless separately approved

Vehicle dispatch or control, route optimization, driver payroll, fuel billing, real-time navigation, vehicle diagnostics write-back, external identity federation, multi-language localization and mobile native applications.

# 6. End-to-end process

Login → Home / Vehicle Selection → Choose category or search model → Select model and inspect preview → Explore Vehicle → Trip Setup (Driver Name, Company Name, selected Vehicle, Route) → Proceed → Live Telemetry → Get Driver Score → Driver Analytics → Download Certificate or Exit to Home. From Home, Drivers Score opens a searchable history table with certificate downloads and Back to Home.

# 7. Detailed functional requirements

## 7.1 Authentication and header

| ID     | Functional requirement                | Acceptance criteria / expected behavior                                                                                                                                    | Priority |
|--------|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| FR-001 | Provide username and password login   | Required fields; invalid credentials show safe error; successful login redirects to Home. Demo accepts nonempty values; production must validate against identity service. | Must     |
| FR-002 | Show logged-in user in header         | Username and profile chevron visible on authenticated pages.                                                                                                               | Must     |
| FR-003 | Provide profile dropdown and Sign Out | Chevron opens menu; outside click closes; Sign Out invalidates session and returns to Login.                                                                               | Must     |
| FR-004 | Protect authenticated screens         | Unauthenticated access redirects to Login; session expiration handled. Production requirement, not demonstrated securely in standalone HTML.                               | Must     |

## 7.2 Home and vehicle selection

| ID     | Functional requirement                      | Acceptance criteria / expected behavior                                                                                         | Priority |
|--------|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|----------|
| FR-005 | Present vehicle categories                  | Light Duty, Medium Duty and Heavy Duty are visibly labeled; counts reflect configured master data.                              | Must     |
| FR-006 | Discover models without technical knowledge | Prominent “View Vehicles” / “Hide Vehicles” controls; one category expanded by default; category panels accessible by keyboard. | Must     |
| FR-007 | Search models                               | Search by model name; show matching models and a clear no-results state.                                                        | Must     |
| FR-008 | Select a model                              | Selection highlighted and preview updates immediately with model name and category.                                             | Must     |
| FR-009 | Show accurate model imagery and attributes  | Display approved model-specific image and validated specifications; fallback is clearly labeled.                                | Must     |
| FR-010 | Explore selected model                      | Primary action names selected model and opens Trip Setup with same vehicle prefilled.                                           | Must     |
| FR-011 | Navigate to Drivers Score                   | Home header/tab opens driver result history; provide Back to Home.                                                              | Must     |

## 7.3 Trip setup

| ID     | Functional requirement | Acceptance criteria / expected behavior                                                                        | Priority |
|--------|------------------------|----------------------------------------------------------------------------------------------------------------|----------|
| FR-012 | Capture Driver Name    | Required free-text input; trim whitespace and validate length/characters per approved rules.                   | Must     |
| FR-013 | Capture Company Name   | Required input; production may optionally use company master dropdown (TBD).                                   | Must     |
| FR-014 | Auto-populate Vehicle  | Read-only selected vehicle carried from Home; cannot silently change within trip setup.                        | Must     |
| FR-015 | Select Route           | Required dropdown populated from approved route master; options and route identifiers TBD.                     | Must     |
| FR-016 | Proceed to telemetry   | Validate required inputs; create/identify trip context; open telemetry with correct driver, vehicle and route. | Must     |
| FR-017 | Cancel trip setup      | Close modal without losing current vehicle selection.                                                          | Should   |

## 7.4 Live telemetry

| ID     | Functional requirement        | Acceptance criteria / expected behavior                                                                                          | Priority |
|--------|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------|----------|
| FR-018 | Preserve application header   | Consistent Eicher branding, user menu and journey navigation.                                                                    | Must     |
| FR-019 | Show trip context banner      | Display Driver Name, Vehicle and Route prominently.                                                                              | Must     |
| FR-020 | Embed Pravah React application | Reserve the content region below the host trip banner for the separate Pravah React application; no host-built telemetry components. | Must |
| FR-021 | Placeholder and embed status | Prototype shows a clear Pravah placeholder; host shows loading/integration failure, while Pravah owns telemetry freshness and live-data indicators. | Must |
| FR-022 | Embed fallback and boundaries | Host displays a clear fallback if Pravah fails to load; Pravah owns internal disconnected, stale and telemetry error states. | Must |
| FR-023 | Get Driver Score              | Button retrieves/calculates result for selected trip and opens Driver Analytics; avoid duplicate submissions.                    | Must     |

## 7.5 Driver analytics

| ID     | Functional requirement         | Acceptance criteria / expected behavior                                                                                | Priority |
|--------|--------------------------------|------------------------------------------------------------------------------------------------------------------------|----------|
| FR-024 | Show driver score and details  | Display driver, company, vehicle, route, numeric score and evaluation date.                                            | Must     |
| FR-025 | Show score breakdown           | Present driver events, performance indicators and driving-style visualization; exact metrics/weights TBD.              | Must     |
| FR-026 | Use current date appropriately | Prototype shows today’s date; production must use actual evaluation date/time and configured timezone.                 | Must     |
| FR-027 | Download certificate           | Generate certificate for current result with accurate score, details and date; sample certificates marked nonofficial. | Must     |
| FR-028 | Exit to Home                   | Exit button returns to landing page.                                                                                   | Must     |

## 7.6 Driver Scores and certificates

| ID     | Functional requirement        | Acceptance criteria / expected behavior                                                                         | Priority |
|--------|-------------------------------|-----------------------------------------------------------------------------------------------------------------|----------|
| FR-029 | Show historical score table   | Columns: Driver Name, Company Name, Vehicle, Route, Score, Download Certificate.                                | Must     |
| FR-030 | Search and sort results       | Search visible records, sort supported columns and show result count; paging/filtering for large datasets TBD.  | Must     |
| FR-031 | Download certificate per row  | Download correct certificate for selected record; no cross-driver data leakage.                                 | Must     |
| FR-032 | Back to Home                  | Visible action returns to landing page.                                                                         | Must     |
| FR-033 | Store result history          | Production persists trip, score, version of scoring logic, timestamp and certificate reference; retention TBD.  | Must     |
| FR-034 | Produce printable certificate | A4-ready branded layout, unique reference and verified details; final PDF delivery and validation approach TBD. | Should   |

# 8. Business rules and data definitions

| Entity / field | Rule / open decision                                                                           |
|----------------|------------------------------------------------------------------------------------------------|
| User           | Unique account ID, display name, role and session; authentication provider TBD                 |
| Vehicle        | Unique model ID, category, display name, approved image, verified attributes                   |
| Trip           | Unique trip ID, driver, company, vehicle, route, start time and status                         |
| Route          | Unique route ID and display label; route catalog owner TBD                                     |
| Telemetry      | Vehicle/trip association, measurement, unit, timestamp, source, quality/freshness              |
| Driver score   | Scale shown as 0–100 in prototype; actual algorithm, weighting, thresholds and eligibility TBD |
| Certificate    | Unique reference, result snapshot, issue timestamp, version and issuer authorization TBD       |
| Date/time      | Prototype uses today; production timezone and reporting cutoff TBD                             |


## Pravah application ownership and integration boundary (confirmed)

**Confirmed requirement:** On the **Live Telemetry** page, the entire region **below the host-owned summary row containing Driver Name, Vehicle, Trip and Get Driver Score** is a **separate React application named Pravah**. Pravah is developed, delivered, and maintained by a different team. **The VECV Fleet Intelligence team must not develop or duplicate telemetry dashboards, gauges, route visualizations, sensor panels, telemetry business logic, or Pravah's internal UI.**

**VECV host application responsibilities:** retain Eicher navigation and branding, display the trip summary and Get Driver Score control above the embedded region, render a responsive and accessible mount/embedding container, pass agreed trip context securely, coordinate authentication and navigation/event exchange, and provide loading/error/fallback states for the embedding itself.

**Pravah team responsibilities:** deliver the React application and its internal screens, telemetry visualizations, data integrations, real-time status, internal error handling, accessibility and responsive behavior, plus its release and maintenance lifecycle.

**Current prototype behavior:** show only a clearly labeled **“Pravah — Embedded Application Placeholder”** in the content region. No simulated telemetry UI is rendered. The host's Get Driver Score button may continue to demonstrate the existing sample scoring journey, explicitly labeled as simulated.

**Integration decisions pending:** iframe versus microfrontend/module integration; Pravah deployment URL and environment; shared authentication/SSO; trip/vehicle identifiers and context payload; cross-app messaging/events; sizing and scroll ownership; CSP/allowed origins; error handling; release coordination. **Driver score computation and ownership are not implied to belong to Pravah** and remain TBD.

# 9. Integration requirements

Pravah React embed: the Pravah team owns the complete telemetry UI, visualizations, data acquisition, API calls, data freshness, telemetry-specific errors and application maintenance. The VECV host team only provides a secure embedding container and the agreed trip context. Confirm delivery format (hosted URL, microfrontend/module, or other), authentication/SSO, allowed origins, responsive dimensions, context handoff, navigation/event messaging, versioning, deployment, loading/failure fallback and test environment. Scoring: confirm whether score is supplied by Pravah or computed by VECV, score formula, source events, normalization, rounding and versioning. Master data: establish authoritative vehicle/route/company sources. Identity: choose production authentication and authorization model. Certificates: choose server-side PDF and verification method.

# 10. Non-functional requirements

| ID      | Functional requirement       | Acceptance criteria / expected behavior                                                                                                                             | Priority |
|---------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| NFR-001 | Brand compliance             | Use approved Eicher logo artwork and clear space, Eicher Blue RGB 0/24/104, Red RGB 230/47/50; white/light neutrals; Hermes FB where licensed or approved fallback. | Must     |
| NFR-002 | Usability                    | Plain-language controls, explicit category expansion, visible selection and clear recovery paths for non-technical users.                                           | Must     |
| NFR-003 | Responsive design            | Support agreed desktop/tablet/mobile viewport matrix without obscured actions; matrix TBD.                                                                          | Must     |
| NFR-004 | Accessibility                | Keyboard operation, visible focus, meaningful labels, contrast checks and reduced-motion support; WCAG target TBD.                                                  | Must     |
| NFR-005 | Security and privacy         | HTTPS, secure session handling, role-based access, server-side validation, audit logs and privacy review; policy TBD.                                               | Must     |
| NFR-006 | Performance and availability | Define page-load, telemetry latency, availability and concurrent-user SLAs after architecture decisions.                                                            | Must     |
| NFR-007 | Observability                | Capture integration failures, score errors, certificate failures and user-visible correlation IDs.                                                                  | Should   |
| NFR-008 | Data governance              | Agree retention, export, deletion, consent and access rights for driver performance records.                                                                        | Must     |

# 11. UX / visual standards

Use white and light-grey surfaces, Eicher Blue navigation and headings, restrained Eicher Red primary actions, consistent button styles, predictable spacing and a uniform header. Preserve logo integrity; do not place the Eicher logo on Eicher Blue or red backgrounds contrary to the supplied brand guidance. Use approved model photography in a consistent visual format. Differentiate critical alerts from ordinary accent color.

# 12. Acceptance and UAT scenarios

| Test ID | Scenario                                | Expected result                                                                 |
|---------|-----------------------------------------|---------------------------------------------------------------------------------|
| UAT-01  | Login with valid / invalid credentials  | Valid user enters Home; invalid user sees error; protected routes remain secure |
| UAT-02  | Expand Medium Duty and select Pro 3015  | Model highlighted; preview shows Pro 3015; Explore button updates               |
| UAT-03  | Search for known / unknown model        | Matches shown; empty state for no match                                         |
| UAT-04  | Open Trip Setup                         | Selected vehicle is prefilled and read-only                                     |
| UAT-05  | Submit missing driver, company or route | Validation prevents proceeding                                                  |
| UAT-06  | Proceed with complete trip              | Telemetry banner displays exact submitted context                               |
| UAT-07  | Pravah embed unavailable | Host displays integration-unavailable fallback; no fake telemetry readings |
| UAT-08  | Get Driver Score                        | Correct trip result opens analytics; date and score match source                |
| UAT-09  | Download certificate                    | Correct driver/vehicle/route/score/date and sample/official marking             |
| UAT-10  | View Drivers Score history              | Search, sort, result count and row certificate operate correctly                |
| UAT-11  | Exit and Sign Out                       | Exit returns Home; Sign Out clears session and returns Login                    |
| UAT-12  | Responsive and keyboard checks          | All primary actions usable at agreed viewports and with keyboard                |

# 13. Dependencies, assumptions and risks

| Type       | Description                                             | Mitigation / owner                                      |
|------------|---------------------------------------------------------|---------------------------------------------------------|
| Dependency | Pravah React application delivery and embedding contract             | Joint API workshop; integration contract                |
| Dependency | Official Eicher model images and specifications         | Client-approved asset pack and master-data validation   |
| Decision   | Driver scoring formula and grading thresholds           | VECV business sign-off before implementation            |
| Risk       | Prototype demonstration values mistaken for live values | Persistent demo label and environment indicator         |
| Risk       | Prototype login mistaken for production authentication  | Replace with secure identity provider                   |
| Risk       | Certificate mistaken for official recognition           | Sample watermark until issuer and verification approved |
| Risk       | Driver performance data access/privacy                  | Role-based access and data governance review            |

# 14. Open questions for stakeholder sign-off

□ Which users and roles may access all drivers’ scores versus only their company?

□ What are the authoritative vehicle model list, categories, specifications and approved photographs?

□ What is the complete route list and are routes vehicle-dependent?

□ Who owns the driver score calculation and which events/weights/thresholds are authoritative?

□ Is score computed per trip, per day or per driver over a chosen period?

□ Which Pravah telemetry fields, refresh rates, units and error states are required?

□ Should certificate downloads be PDF only, and who authorizes official issuance?

□ What is the required timezone, retention period and access-control policy?

□ What are the supported browsers/devices, performance targets and hosting requirements?

# 15. Implementation phases and traceability

| Phase                              | Scope                                                      | Exit criteria                                  |
|------------------------------------|------------------------------------------------------------|------------------------------------------------|
| Phase 1 — UX sign-off              | Validate V8 layouts, branding, vehicle imagery, content    | Approved UI screens and assets                 |
| Phase 2 — Functional backend       | Authentication, master data, trip creation, result history | Integrated user journey with persisted records |
| Phase 3 — Pravah and scoring       | Pravah React embed, context/event contract, scoring contract         | Verified embedded Pravah experience and reconciled score cases  |
| Phase 4 — Certificates and quality | PDF service, security, accessibility, UAT and load tests   | Business sign-off and release readiness        |

# 16. Source and status notes

Source A: VECV_Fleet_Intelligence_Premium_Branded_v8.html, local standalone prototype. UI features are demonstrative and should not be interpreted as secure or integrated production capabilities.

Source B: Eicher Brand Book (55 pages), particularly brand colors, logo correct/misuse and typography guidance. Formal digital product approval remains with the client.

Source C: Approved requirements from this conversation, including vehicle discovery, trip form, telemetry-to-score journey, profile dropdown and driver score history.

Items marked TBD are proposals or open decisions, not confirmed client requirements.
