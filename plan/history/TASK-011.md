start-sha: 0fd4250233ddd2e4978ec6cb9e2a59a71ec4f261
started: 2026-11-10T14:01:41.195Z
RED evidence: `npx vitest run "src/pages/home/ui/HomePage.test.tsx" --reporter=dot` → valid RED
RED evidence: `npx vitest run "src/pages/home/ui/HomePage.test.tsx" --reporter=dot` → valid RED
Implementation: `src/pages/home/ui/HomePage.tsx` uses `useListVehiclesQuery({})`, composes `VehicleModelOption` and `VehicleVisual`, and owns search, selection, retryable loading/error/empty states, plus the focus-returning Escape dialog. Teardown: the dialog keydown listener is removed in its effect cleanup. Login design comparison is stale because vehicle discovery is now authoritative for `/`.
GREEN checks: `node tools/run.mjs npm run typecheck` passed; `node tools/run.mjs npx eslint src/pages/home/ui/HomePage.tsx` passed; `node tools/run.mjs npx steiger ./src` completed with 14 pre-existing warnings. HomePage test remains RED because its error and empty assertions do not install the corresponding MSW scenarios, while the label assertion queries async vehicle content synchronously.
