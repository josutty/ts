export type DrivingStyleMetric = {
  label: string;
  value: number;
};

export type DrivingStyleBreakdownProps = {
  metrics: DrivingStyleMetric[];
};

export function DrivingStyleBreakdown({ metrics }: DrivingStyleBreakdownProps) {
  return (
    <section aria-labelledby="driving-style-heading" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="driving-style-heading" className="text-lg font-bold text-fg">
        Driving Style Breakdown
      </h2>
      <p id="driving-style-description" className="mt-1 text-sm text-muted">
        Illustrative scores across five dimensions
      </p>
      <div
        role="img"
        aria-label="Driving style scores across five dimensions"
        aria-describedby="driving-style-description"
        className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30 text-lg font-bold text-primary">
              {metric.value}
            </div>
            <p className="mt-2 text-sm font-semibold text-fg">{metric.label}</p>
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {metrics.map((metric) => (
          <li key={metric.label}>
            {metric.label}: {metric.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
