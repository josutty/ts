import { useGetTelemetryContextQuery } from '@entities/trip';
import { getErrorMessage } from '@shared/api';

interface PravahEmbedProps {
  tripId: string;
  tripContext?: unknown;
  status?: 'loading' | 'ready' | 'error';
  fallbackMessage?: string;
  onRetry?: () => void;
}

const regionLabel = 'Pravah — Embedded Application Placeholder';

export function PravahEmbed({
  tripId,
  tripContext: providedTripContext,
  status: providedStatus,
  fallbackMessage,
  onRetry,
}: PravahEmbedProps) {
  const { isLoading, isError, error, refetch } = useGetTelemetryContextQuery({ tripId });
  const status = providedStatus ?? (isLoading ? 'loading' : isError ? 'error' : 'ready');
  const isBusy = status === 'loading';

  const retry = () => {
    void refetch();
    onRetry?.();
  };

  if (status === 'error') {
    const message = fallbackMessage ?? (error ? getErrorMessage(error) : 'Integration unavailable');

    return (
      <section
        aria-label={regionLabel}
        aria-busy={false}
        className="rounded-lg border border-border bg-surface p-6 text-fg"
      >
        <div role="alert" className="space-y-3">
          <h2>Integration unavailable</h2>
          <p>{message}</p>
          <button type="button" onClick={retry}>
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (isBusy) {
    return (
      <section
        aria-label={regionLabel}
        aria-busy="true"
        className="rounded-lg border border-border bg-surface p-6 text-fg"
      >
        <h2>{regionLabel}</h2>
      </section>
    );
  }

  void providedTripContext;

  return (
    <section
      aria-label={regionLabel}
      aria-busy="false"
      className="rounded-lg border border-border bg-surface p-6 text-fg"
    >
      <h2>{regionLabel}</h2>
      <p>SIMULATED TELEMETRY</p>
    </section>
  );
}
