import type { ReactNode } from 'react';

export type TripFacts = {
  driverName: string;
  company: string;
  vehicle: string;
  route: string;
};

export type TripContextBannerProps = TripFacts & {
  action?: ReactNode;
};

const FACT_LABELS: ReadonlyArray<readonly [keyof TripFacts, string]> = [
  ['driverName', 'Driver Name'],
  ['company', 'Company'],
  ['vehicle', 'Vehicle'],
  ['route', 'Route'],
];

export function TripContextBanner({ action, ...facts }: TripContextBannerProps) {
  return (
    <section
      aria-label="Trip details"
      className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-border bg-surface p-4"
    >
      <dl className="grid min-w-0 flex-1 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {FACT_LABELS.map(([key, label]) => (
          <div className="min-w-0" key={key}>
            <dt className="text-xs font-bold text-muted">{label}</dt>
            <dd className="mt-1 break-words text-sm font-semibold text-fg">{facts[key]}</dd>
          </div>
        ))}
      </dl>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  );
}
