import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useGetDriverScoreQuery } from '@entities/driver-score';
import { getErrorMessage } from '@shared/api';
import { routes } from '@shared/config';

type DriverEvent = { name?: string; type?: string; value?: string | number };
type ScoreView = {
  score?: number;
  driverName?: string;
  company?: string;
  tripId?: string;
  tripDate?: string;
  date?: string;
  vehicle?: string;
  route?: string;
  distance?: string | number;
  duration?: string | number;
  events?: DriverEvent[];
  breakdown?: Record<string, string | number>;
};

function formatDate(value: string | undefined) {
  if (!value) return '–';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-IN').format(date);
}

function DetailRow({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="text-right font-semibold text-fg">{value ?? '–'}</dd>
    </div>
  );
}

export function DriverAnalytics() {
  const { tripId = '' } = useParams<{ tripId: string }>();
  const location = useLocation();
  const routeTripId = tripId || location.pathname.split('/').filter(Boolean).at(-1) || '';
  const { data, error, isLoading, refetch } = useGetDriverScoreQuery({ tripId: routeTripId });
  const [isDownloading, setIsDownloading] = useState(false);
  const [certificateError, setCertificateError] = useState<string | undefined>();
  const result = data as unknown as ScoreView | undefined;
  const events = result?.events ?? [];
  const breakdown = result?.breakdown ?? {};
  const date = formatDate(result?.tripDate ?? result?.date);
  const score = typeof result?.score === 'number' ? Math.round(result.score) : undefined;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div role="status" aria-label="Loading driver score" aria-busy="true" className="text-fg-muted">
          Loading driver score…
        </div>
      </main>
    );
  }

  if (error) {
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

  function downloadCertificate() {
    setCertificateError(undefined);
    setIsDownloading(true);
    try {
      const certificate = `Driver Analytics\nTrip: ${result?.tripId ?? routeTripId}\nScore: ${score ?? '–'}/100\nSample certificate — nonofficial`;
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
    } catch {
      setCertificateError('Certificate could not be downloaded. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-fg sm:px-7">
      <div className="mx-auto max-w-[1384px]">
        <header className="mb-6 flex flex-col gap-5 border-b border-border bg-surface-raised px-6 py-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">FLEET INTELLIGENCE CENTER</p>
            <div className="mt-3 flex flex-wrap gap-5 text-sm font-bold text-primary">
              <Link to={routes.home}>Home</Link>
              <span>Drivers Score</span>
              <span aria-label="admin">♙ admin ▾</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadCertificate}
              disabled={isDownloading}
              className="rounded-control bg-primary px-4 py-3 font-bold text-primary-fg disabled:opacity-60"
            >
              {isDownloading ? 'Preparing certificate…' : '↓ Download Certificate'}
            </button>
            <Link to={routes.home} className="rounded-control border border-border px-4 py-3 font-bold text-primary">
              Exit to Home
            </Link>
          </div>
        </header>

        <section className="mb-5 rounded-card border border-danger bg-surface-raised p-5 shadow-card">
          <p className="text-sm font-bold text-danger">Step 4 · Driver performance</p>
          <h1 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Driver Analytics</h1>
          <p className="mt-2 text-sm text-fg-muted">Demonstration driver score and trip event summary · {date}</p>
        </section>

        <section className="mb-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold text-primary">Driver Details</h2>
            <div className="mt-4 flex items-center gap-4 border-b border-border pb-4">
              <span aria-hidden="true" className="text-3xl text-primary">
                ♙
              </span>
              <div>
                <p className="text-xl font-bold text-primary">{result?.driverName ?? '–'}</p>
                <p className="text-xs font-bold text-success">Safe Driver</p>
              </div>
            </div>
            <dl className="mt-3 text-sm">
              <DetailRow label="Company" value={result?.company} />
              <DetailRow label="Trip" value={result?.tripId ?? routeTripId} />
              <DetailRow label="Vehicle" value={result?.vehicle} />
              <DetailRow label="Route" value={result?.route} />
              <DetailRow label="Date" value={date} />
              <DetailRow label="Duration" value={result?.duration} />
            </dl>
          </section>

          <section className="rounded-card border border-border bg-surface-raised p-6 text-center shadow-card">
            <h2 className="text-left text-xl font-bold text-primary">Driver Score</h2>
            <div className="mx-auto mt-8 flex size-44 items-center justify-center rounded-full border-[14px] border-success bg-surface">
              <p aria-label={`Score ${score ?? '–'} out of 100`} className="text-5xl font-bold text-primary">
                {score ?? '–'}
                <span className="text-base font-normal text-fg"> / 100</span>
              </p>
            </div>
            <p className="mt-5 text-2xl font-bold text-success">Great Driving!</p>
            <p className="mt-1 text-sm text-fg-muted">Keep it up!</p>
          </section>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-primary">Events During Trip</h2>
              <span className="font-bold text-danger">{events.length} total</span>
            </div>
            {events.length === 0 ? (
              <p className="mt-4 text-fg-muted">–</p>
            ) : (
              <ul className="mt-4">
                {events.map((event, index) => (
                  <li
                    key={`${event.name ?? event.type ?? 'event'}-${index}`}
                    className="flex justify-between gap-4 border-b border-border py-3"
                  >
                    <span>{event.name ?? event.type ?? '–'}</span>
                    <span className="font-bold">{event.value ?? '–'}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-card border border-border bg-surface-raised p-6 shadow-card">
            <h2 className="text-xl font-bold text-primary">Driving Style Breakdown</h2>
            {Object.keys(breakdown).length === 0 ? (
              <p className="mt-4 text-fg-muted">–</p>
            ) : (
              <dl className="mt-4">
                {Object.entries(breakdown).map(([label, value]) => (
                  <DetailRow key={label} label={label} value={value} />
                ))}
              </dl>
            )}
            <p className="mt-5 rounded-control border border-border bg-surface px-4 py-3 text-sm text-fg-muted">
              Score and event counts are sample values for demonstration.
            </p>
          </section>
        </section>
        {certificateError ? (
          <p role="alert" className="mt-4 text-sm font-semibold text-danger">
            {certificateError}
          </p>
        ) : null}
      </div>
    </main>
  );
}
