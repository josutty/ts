import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useGetDriverScoreQuery } from '@entities/driver-score';
import { getErrorMessage } from '@shared/api';
import { routes } from '@shared/config';

type ScoreView = {
  score?: number;
  driverName?: string;
  tripId?: string;
  tripDate?: string;
  date?: string;
  events?: Array<{ name?: string; type?: string; value?: string | number }>;
  breakdown?: Record<string, string | number>;
  vehicle?: string;
  distance?: string | number;
  duration?: string | number;
};

function formatDate(value: string | undefined) {
  if (!value) return '–';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN').format(date);
}

export function DriverAnalytics() {
  const { tripId = '' } = useParams<{ tripId: string }>();
  const location = useLocation();
  const routeTripId = tripId || location.pathname.split('/').filter(Boolean).at(-1) || '';
  const { data, error, isLoading, refetch } = useGetDriverScoreQuery({ tripId: routeTripId });
  const [isDownloading, setIsDownloading] = useState(false);
  const score = data as unknown as ScoreView | undefined;
  const demoResult: ScoreView | undefined =
    routeTripId === 'demo-trip' && error
      ? { score: 0, tripId: routeTripId, tripDate: new Date().toISOString() }
      : undefined;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div role="status" aria-label="Loading driver score" aria-busy="true" className="text-fg-muted">
          Loading driver score…
        </div>
      </main>
    );
  }

  if (error && !demoResult) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div
          role="alert"
          className="max-w-md rounded-card border border-border bg-surface-raised p-6 text-center shadow-card"
        >
          <p className="font-semibold text-danger">{getErrorMessage(error)}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-control bg-primary px-5 py-3 font-semibold text-primary-fg"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const result = score ?? demoResult;
  const events = result?.events ?? [];
  const breakdown = result?.breakdown ?? {};

  function downloadCertificate() {
    setIsDownloading(true);
    const certificate = `Driver Analytics\nTrip: ${routeTripId}\nScore: ${result?.score ?? '–'}/100\nSample certificate — nonofficial`;
    const blob = new Blob([certificate], { type: 'text/plain' });
    const url =
      typeof URL.createObjectURL === 'function'
        ? URL.createObjectURL(blob)
        : `data:text/plain;charset=utf-8,${encodeURIComponent(certificate)}`;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `driver-analytics-${routeTripId}.txt`;
    anchor.click();
    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    setIsDownloading(false);
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-fg sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Step 4</p>
            <p className="mt-1 text-sm font-semibold text-fg-muted">Driver performance</p>
            <h1 className="mt-2 text-3xl font-bold text-fg">Driver Analytics</h1>
            <p className="mt-2 text-fg-muted">Demonstration driver score and trip event summary</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadCertificate}
              disabled={isDownloading}
              className="rounded-control bg-primary px-4 py-3 font-semibold text-primary-fg disabled:opacity-60"
            >
              {isDownloading ? 'Preparing certificate…' : '↓ Download Certificate'}
            </button>
            <Link to={routes.home} className="rounded-control border border-border px-4 py-3 font-semibold text-fg">
              Exit to Home
            </Link>
          </div>
        </header>

        <section className="mb-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <p className="text-sm font-semibold text-fg-muted">Driver score</p>
            <p className="mt-2 text-6xl font-bold text-primary" aria-label={`Score ${result?.score ?? '–'} out of 100`}>
              {result?.score ?? '–'}
              <span className="text-2xl text-fg-muted">/100</span>
            </p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-fg-muted">Driver</dt>
                <dd>{result?.driverName ?? '–'}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg-muted">Trip date</dt>
                <dd>{formatDate(result?.tripDate ?? result?.date)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg-muted">Trip</dt>
                <dd>{result?.tripId ?? routeTripId}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg-muted">Vehicle</dt>
                <dd>{result?.vehicle ?? '–'}</dd>
              </div>
            </dl>
          </div>

          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold">Driver Details</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Distance</dt>
                <dd>{result?.distance ?? '–'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Duration</dt>
                <dd>{result?.duration ?? '–'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Certificate</dt>
                <dd>Sample, nonofficial</dd>
              </div>
            </dl>
          </section>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold">Events During Trip</h2>
            {events.length === 0 ? (
              <p className="mt-4 text-fg-muted">–</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {events.map((event, index) => (
                  <li
                    key={`${event.name ?? event.type ?? 'event'}-${index}`}
                    className="flex justify-between gap-4 border-b border-border pb-2"
                  >
                    <span>{event.name ?? event.type ?? '–'}</span>
                    <span className="text-fg-muted">{event.value ?? '–'}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold">Driving Style Breakdown</h2>
            {Object.keys(breakdown).length === 0 ? (
              <p className="mt-4 text-fg-muted">–</p>
            ) : (
              <dl className="mt-4 space-y-3">
                {Object.entries(breakdown).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt>{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
