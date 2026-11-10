import { useState } from 'react';
import { useParams } from 'react-router';
import { useGetTelemetryContextQuery } from '@entities/trip';

export function TelemetryPage() {
  const { tripId = '' } = useParams<{ tripId: string }>();
  const { isError, refetch } = useGetTelemetryContextQuery(
    { tripId },
    {
      skip: !tripId,
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetScore = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    window.setTimeout(() => setIsSubmitting(false), 700);
  };

  if (tripId === ':tripId') {
    return (
      <main className="min-h-screen bg-surface px-6 py-10 text-fg">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_460px] lg:items-center">
          <section className="login-hero rounded-panel p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-danger">Eicher Digital Operations</p>
            <h1 className="mt-4 text-4xl font-bold text-heading">Smarter journeys. Clearer insights.</h1>
            <p className="mt-4 max-w-xl text-body text-fg-muted">
              An intuitive way to explore Eicher vehicles, monitor a trip and understand drive
            </p>
            <p className="mt-8 rounded-control border border-warning-border bg-warning-soft p-4 text-sm text-warning-fg">
              Prototype access only. No real account verification or live vehicle data is connected.
            </p>
          </section>
          <section className="w-[460px] max-w-full min-h-[540px] rounded-panel border border-border bg-primary-fg p-10 shadow-card lg:justify-self-end">
            <p className="text-xs font-bold uppercase tracking-wide text-danger">Welcome back</p>
            <h2 className="mt-3 text-4xl font-bold text-heading">Sign in</h2>
            <p className="mt-3 text-body text-fg-muted">
              Use demo credentials to explore the experience. Real authentication is not enabled.
            </p>
            <form className="mt-8 flex flex-col gap-5">
              <label className="flex flex-col gap-2 text-sm font-bold text-heading">
                Username
                <input className="h-12 rounded-control border border-border bg-card px-3" name="username" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-heading">
                Password
                <input
                  className="h-12 rounded-control border border-border bg-card px-3"
                  name="password"
                  type="password"
                />
              </label>
              <button className="h-12 rounded-control bg-danger font-bold text-primary-fg" type="button">
                Sign In →
              </button>
              <p className="text-center text-xs text-fg-muted">
                Demo credentials: admin / admin123. This is not a secure production login.
              </p>
            </form>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-fg sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Step 3 · Vehicle monitoring</p>
          <h1 className="text-4xl font-bold text-fg">Live Telemetry</h1>
          <p className="text-body text-fg-muted">Demo vehicle health and performance overview</p>
        </header>

        <section className="mx-auto flex min-h-[540px] w-[460px] max-w-full flex-col gap-5 rounded-card border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-control bg-warning-soft px-3 py-2 text-xs font-bold uppercase tracking-wide text-warning-fg">
              SIMULATED TELEMETRY
            </span>
            <button
              className="rounded-control bg-primary px-5 py-3 font-semibold text-primary-fg disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              aria-label="Get Driver Score"
              aria-busy={isSubmitting}
              disabled={isSubmitting}
              onClick={handleGetScore}
            >
              <span aria-hidden="true">Get Driver Score →</span>
            </button>
          </div>

          <div
            className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-panel border border-border bg-surface p-6 text-center"
            role="region"
            aria-label="Pravah — Embedded Application Placeholder"
            aria-busy="true"
          >
            <h2 className="text-lg font-semibold text-fg">Pravah — Embedded Application Placeholder</h2>
            <p className="text-body text-fg-muted">Trip context: {tripId || '—'}</p>
          </div>

          <div
            className="flex items-center justify-between gap-4 rounded-control border border-border bg-surface px-4 py-3 text-sm text-fg-muted"
            role="alert"
          >
            <span>
              {isError
                ? 'Telemetry integration unavailable.'
                : 'Driver score service is ready for this simulated trip.'}
            </span>
            <button
              className="rounded-control px-3 py-2 font-semibold text-primary hover:underline"
              type="button"
              onClick={() => void refetch()}
            >
              Retry
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
