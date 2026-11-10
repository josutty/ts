type VehicleStatsProps = {
  label: string;
  value: string;
  caption: string;
};

export function VehicleStats({ label, value, caption }: VehicleStatsProps) {
  return (
    <article className="flex w-full min-w-0 flex-1 flex-col rounded-xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:min-w-[12rem]">
      <dl>
        <dt className="text-sm font-semibold text-fg-muted">{label}</dt>
        <dd className="mt-2 text-3xl font-bold tracking-tight text-fg">{value}</dd>
      </dl>
      <p className="mt-3 text-sm text-fg-muted">{caption}</p>
    </article>
  );
}
