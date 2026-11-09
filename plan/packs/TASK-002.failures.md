# Failures for TASK-002

Fix only these. Touch only the files in the task's Files table.

### typecheck
command: npm run typecheck --silent
  src/widgets/app-header/ui/AppHeader.test.tsx(2,53): error TS2307: Cannot find module '@test/test-utils' or its corresponding type declarations.
  src/widgets/app-header/ui/AppHeader.test.tsx(24,50): error TS7006: Parameter 'button' implicitly has an 'any' type.
  src/widgets/app-header/ui/ProfileMenu.test.tsx(2,32): error TS2307: Cannot find module '@test/test-utils' or its corresponding type declarations.

### tests (related)
command: npx vitest related "src/widgets/app-header/ui/AppHeader.tsx" "src/widgets/app-header/ui/ProfileMenu.tsx" "src/widgets/app-header/index.ts" "src/widgets/app-header/ui/AppHeader.test.tsx" "src/widgets/app-header/ui/ProfileMenu.test.tsx" --run --reporter=dot --passWithNoTests
   Test Files  2 failed (2)
  ⎯⎯⎯⎯⎯⎯ Failed Suites 2 ⎯⎯⎯⎯⎯⎯⎯
   FAIL  src/widgets/app-header/ui/AppHeader.test.tsx [ src/widgets/app-header/ui/AppHeader.test.tsx ]
  Error: Failed to resolve import "@test/test-utils" from "src/widgets/app-header/ui/AppHeader.test.tsx". Does the file exist?
    File: F:/SOP/truck simulation/src/widgets/app-header/ui/AppHeader.test.tsx:2:52
   FAIL  src/widgets/app-header/ui/ProfileMenu.test.tsx [ src/widgets/app-header/ui/ProfileMenu.test.tsx ]
  Error: Failed to resolve import "@test/test-utils" from "src/widgets/app-header/ui/ProfileMenu.test.tsx". Does the file exist?
    File: F:/SOP/truck simulation/src/widgets/app-header/ui/ProfileMenu.test.tsx:2:31
