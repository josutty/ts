type DriverFacts = {
  name?: string;
  vehicle?: string;
  date?: string;
  duration?: string;
  distance?: string;
};

export type DriverDetailsProps = DriverFacts & {
  driver?: DriverFacts;
};

export function DriverDetails({ driver, name, vehicle, date, duration, distance }: DriverDetailsProps) {
  const facts = driver ?? { name, vehicle, date, duration, distance };
  const rows = [
    ['Driver', facts.name],
    ['Vehicle', facts.vehicle],
    ['Date', facts.date],
    ['Duration', facts.duration],
    ['Distance', facts.distance],
  ].filter(([, value]) => value);

  return (
    <section aria-labelledby="driver-details-heading" className="rounded-xl border border-border bg-surface p-5">
      <h2 id="driver-details-heading" className="mb-4 text-lg font-bold text-fg">
        Driver Details
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-semibold text-fg">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
