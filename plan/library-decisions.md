# Library decisions

Approve: change Status to `approved` (or run `node tools/task.mjs approve-libs --all-proposed`); `rejected` = no.
Only `approved` rows are installed (app-bootstrap Run L). Facts from tools/lib-facts.mjs on 2026-11-09.

| Capability | Component | Features (copied) | Decision | Install | Why | Status |
| --- | --- | --- | --- | --- | --- | --- |
| none | LoginPage | no complex widgets found | plain JSX + Tailwind | — | Native form controls are sufficient for the visible login fields, trip route select, score search, and score sort select; the base stack already covers forms, data fetching, state, routing, dates, and styling. | approved |

## Details

### none → plain JSX + Tailwind

Evidence: `inputs/ux/dealer.html` contains native username/password fields, a route `<select>`, score search, and score sort controls. The detector reported no complex widgets. Alternative: no library; plain controls preserve the prototype's behavior and avoid unnecessary dependencies.

Facts: no library considered; no `lib-facts.mjs` lookup was needed.

### Fonts → system fonts

Evidence: `analysis/design-tokens-raw.md` lists only system fonts. No Fontsource package is needed.
