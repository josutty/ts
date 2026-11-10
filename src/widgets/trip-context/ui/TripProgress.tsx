const TRIP_STEPS = ['Select vehicle', 'Trip details', 'Live telemetry', 'Driver score'] as const;

export type TripProgressProps = {
  currentStep: number;
};

export function TripProgress({ currentStep }: TripProgressProps) {
  return (
    <nav aria-label="Trip progress" className="w-full">
      <ol className="flex flex-wrap items-start gap-3 sm:gap-4">
        {TRIP_STEPS.map((label, index) => {
          const step = index + 1;
          const isDone = step < currentStep;
          const isCurrent = step === currentStep;
          const state = isDone ? 'done' : isCurrent ? 'current' : 'upcoming';

          return (
            <li
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`${label}: ${state}`}
              aria-labelledby={`trip-progress-${step}-label`}
              className="flex min-w-0 flex-1 items-center gap-2 text-sm text-fg"
              data-state={state}
              key={label}
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold"
              >
                {isDone ? '✓' : step}
              </span>
              <span className="min-w-0 leading-5" id={`trip-progress-${step}-label`}>
                {label}
              </span>
              <span className="sr-only"> ({state})</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
