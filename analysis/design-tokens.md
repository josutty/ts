# Design token mapping

Source: `analysis/design-tokens-raw.md` generated from `inputs/ux/dealer.html`. Dark values are explicitly `(same as light)` for every extracted CSS variable; no dark theme is defined by the design.

## Colors

| Raw variable/value | Semantic token | Light | Dark | Where used |
|---|---|---|---|---|
| `--blue` | `primary` | `#001868` | `#001868` | Eicher headings, navigation, primary text |
| `--red` | `danger` / action accent | `#e62f32` | `#e62f32` | primary actions, active underline, alerts |
| `--ink` | `fg` | `#172a4a` | `#172a4a` | body text |
| `--muted` | `fg-muted` | `#62718c` | `#62718c` | helper and secondary text |
| `--bg` | `surface-muted` | `#f6f8fc` | `#f6f8fc` | page background |
| `--line` | `border` | `#e3e9f2` | `#e3e9f2` | cards, controls and header |
| `--white` | `surface` | `#fff` | `#fff` | cards, inputs and header |
| `--green` | `success` | `#15803d` | `#15803d` | score/status success |
| `--amber` | `warning` | `#c17800` | `#c17800` | warning/demo accents |
| palette `rgb(129,91,19)` | `warning-fg` | `#815b13` | `#815b13` | prototype access notice |
| palette `rgb(255,249,237)` | `warning-soft` | `#fff9ed` | `#fff9ed` | prototype access notice background |
| palette `rgb(243,216,165)` | `warning-border` | `#f3d8a5` | `#f3d8a5` | prototype access notice border |
| palette `rgb(203,213,225)` | `border-strong` | `#cbd5e1` | `#cbd5e1` | login inputs |
| palette `rgb(238,243,252)` | `primary-soft` | `#eef3fc` | `#eef3fc` | login hero gradient stop |

The raw shadow is preserved as a non-colour token: `--shadow: 0 8px 28px rgba(14,39,88,.055)`.

## Gradients and backgrounds

| Raw design value | Token/class proposal | Use |
|---|---|---|
| `linear-gradient(145deg, rgb(238,243,252), rgb(255,255,255))` on `section.login-hero` | `--gradient-login-hero` / `bg-login-hero` | Login hero background; must not be flattened |
| page `rgb(246,248,252)` | `surface-muted` / `bg-surface-muted` | Login page background |

## Typography

| Family | Role | Weights | Package |
|---|---|---|---|
| Arial, Helvetica, sans-serif | sans | 400, 600, 700, 800, 900 as used | system; no web-font package |

Measured semantic type roles: heading-1 44px/700 (hero), heading-2 38px/700 (Sign in), body 14–15px/400, body-sm 13px/400–700, caption 12px/400–900. Mono is not used.

## Rhythm and shape

- Controls: 9px radius; inputs 50px high; primary Sign In 46px high.
- Cards: 20px login radius; panel radius 16px in the refined CSS; smaller notices 10px.
- Main card: white, 460px wide, 42px padding, shadow enabled.
- Responsive breakpoints in source: 900px and 620px.
- Focus: 3px outline with 3px offset; the design uses red in the V8 refinement.
