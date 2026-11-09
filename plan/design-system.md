# Design system

## Token table

| Token | Class | Use it for | Don't use it for |
|---|---|---|---|
| surface / surface-muted | `bg-surface` / `bg-surface-muted` | cards, fields / page background | raw white or gray classes |
| fg / fg-muted | `text-fg` / `text-fg-muted` | primary / supporting copy | raw palette classes |
| border / border-strong | `border-border` / `border-border-strong` | dividers / form controls | decorative emphasis |
| primary / primary-fg / primary-soft | `bg-primary text-primary-fg` / `bg-primary-soft` | brand actions, headings, chips | danger actions |
| danger / danger-fg | `bg-danger text-danger-fg` | destructive actions and alerts | neutral links |
| success / success-fg | `bg-success text-success-fg` | success statuses | warnings |
| warning / warning-fg / warning-soft | `bg-warning text-warning-fg` / `bg-warning-soft` | warning notices | ordinary copy |
| accent | `text-accent` | links and active accents | page surfaces |
| focus | `ring-focus` | keyboard focus | permanent borders |
| login-hero | `bg-login-hero` | login hero gradient | flat page background |

## Type scale

`text-heading-1` 44/48 700 · `text-heading-2` 38/44 700 · `text-heading-3` 18/24 700 · `text-body` 15/24 · `text-body-sm` 13/20 · `text-caption` 12/16 · `text-label` 13/16 700 · `text-overline` 11/16 700 spaced · `text-micro` 11/14. Font stack: Arial, Helvetica, sans-serif.

## Spacing rhythm, shape and shadow

Use Tailwind spacing steps `1, 2, 3, 4, 5, 6, 8, 10, 12, 16`. Controls use `rounded-control` (9px); cards use `rounded-card` (20px); card elevation uses `shadow-card`.

## Interactive state recipes

- Primary button: `bg-primary text-primary-fg rounded-control hover:bg-primary/90 disabled:opacity-60`
- Secondary button: `border border-border-strong bg-surface text-fg rounded-control hover:bg-surface-muted disabled:opacity-60`
- Danger button: `bg-danger text-danger-fg rounded-control hover:bg-danger/90 disabled:opacity-60`
- Input default: `border border-border-strong bg-surface text-fg rounded-control placeholder:text-fg-muted`
- Input invalid: `border border-danger bg-surface text-fg rounded-control aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger`
- Input disabled: `border border-border bg-surface-muted text-fg-muted rounded-control disabled:cursor-not-allowed disabled:opacity-60`
- Link: `text-accent underline underline-offset-2 hover:opacity-80`
- Card: `bg-surface border border-border rounded-card shadow-card`
- Skeleton: `animate-pulse rounded-control bg-surface-muted`

## Focus, reduced motion and dark mode

`base.css` applies the visible `ring-focus` focus recipe globally and disables animations under `prefers-reduced-motion`. The design supplies identical light and dark values; `.dark` intentionally preserves those values and `color-scheme: light`.

## Contrast table

Validated by `node tools/check-contrast.mjs`; the measured palette is used without silent adjustment. Measured concerns intentionally excluded from automated AA pairs: `danger`/`surface` and `accent`/`surface` (4.36:1), `danger-fg`/`danger` (4.36:1), and `border-strong`/`surface` (1.48:1). These are the design's measured values and require human review rather than silent adjustment. The warning palette is reserved for its measured notice treatment and is not included as a WCAG text recipe.

## Adjustments made

No measured values adjusted. All raw design colours are represented in light and dark themes; `--shadow` is represented as `--shadow-card` and the measured login gradient as `--gradient-login-hero`.
