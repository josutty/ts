export type ScoreCardProps = {
  score: number;
  status?: string;
  title?: string;
  message?: string;
};

export function ScoreCard({
  score,
  status = 'Safe Driver',
  title = 'Great Driving!',
  message = 'Keep it up!',
}: ScoreCardProps) {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <section aria-labelledby="driver-score-heading" className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{status}</p>
          <h2 id="driver-score-heading" className="mt-1 text-lg font-bold text-fg">
            Driver Score
          </h2>
        </div>
        <div aria-label={`${boundedScore} out of 100`} className="text-right">
          <span className="text-4xl font-bold text-primary">{boundedScore}</span>
          <span className="text-sm text-muted">/100</span>
        </div>
      </div>
      <p className="mt-5 text-xl font-bold text-fg">{title}</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
    </section>
  );
}
