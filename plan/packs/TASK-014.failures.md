# Failures for TASK-014

Fix only these. Touch only the files in the task's Files table.

### design vs build
command: node tools/design-spec.mjs compare "inputs/ux/dealer.html#app" /telemetry/:tripId --start
  | layout | page | card / panel | rgb(255, 255, 255), radius 20px, 460px | missing (no distinct panel) |
