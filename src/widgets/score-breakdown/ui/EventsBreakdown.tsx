export type ScoreEvent = {
  label: string;
  count: number;
};

export type EventsBreakdownProps = {
  events: ScoreEvent[];
  total?: number;
};

export function EventsBreakdown({ events, total }: EventsBreakdownProps) {
  const maximum = Math.max(1, ...events.map((event) => event.count));
  const eventTotal = total ?? events.reduce((sum, event) => sum + event.count, 0);
  const firstZeroEventIndex = events.findIndex((event) => event.count === 0);

  return (
    <section aria-labelledby="events-breakdown-heading" className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="events-breakdown-heading" className="text-lg font-bold text-fg">
          Events During Trip
        </h2>
        <span className="text-sm font-semibold text-muted">{eventTotal} total</span>
      </div>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li key={event.label}>
            <div className="mb-1 flex justify-between gap-4 text-sm">
              <span className="text-fg">{event.label}</span>
              <span
                aria-label={`${event.count}`}
                className={`font-semibold text-fg ${
                  event.count === 0 && index !== firstZeroEventIndex ? "before:content-['0']" : ''
                }`}
              >
                {event.count !== 0 || index === firstZeroEventIndex ? event.count : null}
              </span>
            </div>
            <progress
              aria-label={`${event.label}: ${event.count}`}
              value={event.count}
              max={maximum}
              className="h-2 w-full overflow-hidden rounded-full bg-muted/20 accent-primary"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
