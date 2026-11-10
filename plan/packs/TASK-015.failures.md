# Failures for TASK-015

Fix only these. Touch only the files in the task's Files table.

### tests (related)
command: npx vitest related "src/pages/analytics/ui/DriverAnalytics.tsx" "src/pages/analytics/index.ts" "src/app/router.tsx" "src/shared/config/routes.ts" "src/pages/analytics/ui/DriverAnalytics.test.tsx" --run --reporter=dot --passWithNoTests
   Test Files  1 failed | 15 passed (16)
        Tests  1 failed | 54 passed (55)
    payload: { status: 404, code: 'NOT_FOUND', message: 'Score result not found' }
      message: 'Trip telemetry context not found'
      message: 'Trip telemetry context not found'
      message: 'Trip telemetry context not found'
      message: 'Trip telemetry context not found'
      message: 'Trip telemetry context not found'
  ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
   FAIL  src/widgets/selected-vehicle/ui/SelectedVehiclePreview.test.tsx > SelectedVehiclePreview > uses an en dash and T for the payload / GVW band value
  Error: expect(element).toHaveTextContent()
  Expected element to have text content:
  Received:
   ❯ src/widgets/selected-vehicle/ui/SelectedVehiclePreview.test.tsx:20:21

### design vs build
command: node tools/design-spec.mjs compare "inputs/ux/dealer.html#app" /analytics/:tripId --start
  | layout | page | card / panel | rgb(255, 255, 255), radius 20px, 460px | missing (no distinct panel) |
  | content | text | "Eicher Digital Operations" | present | missing |
  | content | text | "Smarter journeys. Clearer insights." | present | missing |
  | content | text | "An intuitive way to explore Eicher vehicles, monitor a trip and understand drive" | present | missing |
  | content | text | "Prototype access only. No real account verification or live vehicle data is conn" | present | missing |
  | content | text | "Welcome back" | present | missing |
  | content | text | "Sign in" | present | missing |
  | content | text | "Use demo credentials to explore the experience. Real authentication is not enabl" | present | missing |
  | content | text | "Username" | present | missing |
  | content | text | "Password" | present | missing |
  | content | text | extra "Driver score not found" | absent | present |
  | content | input "Username" | field | present | missing |
  | content | input "Password" | field | present | missing |
  | content | controls | control "Sign In →" | present | missing |
  | content | controls | extra control "Retry" | absent | present |
