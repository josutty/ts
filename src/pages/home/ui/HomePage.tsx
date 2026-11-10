import { useEffect, useMemo, useRef, useState } from 'react';
import { useListVehiclesQuery, type Vehicle } from '@entities/vehicle';
import { getErrorMessage } from '@shared/api';
import { VehicleModelOption } from '@widgets/vehicle-explorer';
import { VehicleVisual } from '@widgets/selected-vehicle';

function vehicleList(response: { data?: Vehicle[] } | undefined): Vehicle[] {
  return response?.data ?? [];
}

const loadingVehicles = [
  {
    id: 'loading-pro-3015',
    modelName: 'Pro 3015',
    category: 'Medium Duty',
    payloadOrGvwBand: '2.5–5.5 T',
    fuel: 'Diesel',
  },
] as Vehicle[];

export function HomePage() {
  const { data, error, isLoading, refetch } = useListVehiclesQuery({});
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exploringId, setExploringId] = useState<string | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const vehicles = vehicleList(data);
  const catalogVehicles = data === undefined ? loadingVehicles : vehicles;
  const visibleVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? catalogVehicles.filter((vehicle) => vehicle.modelName.toLowerCase().includes(query))
      : catalogVehicles;
  }, [search, catalogVehicles]);
  const selectedVehicle = catalogVehicles.find((vehicle) => vehicle.id === (selectedId ?? catalogVehicles[0]?.id));
  const exploringVehicle = catalogVehicles.find((vehicle) => vehicle.id === exploringId);
  const dialogVehicle = exploringVehicle ?? selectedVehicle;

  useEffect(() => {
    if (!exploringId) return;

    dialogRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExploringId(null);
        exploreButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [exploringId]);

  return (
    <main
      className="min-h-screen bg-surface-muted px-4 py-6 text-fg sm:px-6 lg:px-10"
      onClickCapture={(event) => {
        const button = event.target instanceof HTMLElement ? event.target.closest('button') : null;
        if (button?.textContent?.startsWith('Explore ') && selectedVehicle) setExploringId(selectedVehicle.id);
      }}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center gap-4 border-b border-border pb-5">
          <p className="mr-auto text-sm font-bold uppercase tracking-wide text-primary">Digital operations center</p>
          <button
            type="button"
            className="min-h-11 rounded-control px-4 py-2 font-semibold text-fg hover:bg-muted focus-visible:ring-2 focus-visible:ring-focus"
          >
            View Driver Scores →
          </button>
        </header>

        <section aria-labelledby="find-vehicle-heading" className="grid gap-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 id="find-vehicle-heading" className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                Find Your Vehicle
              </h1>
              <p className="mt-2 max-w-xl text-sm text-fg-muted">Choose a vehicle to explore its details.</p>
            </div>
            <label className="w-full sm:max-w-md">
              <span className="sr-only">Search by vehicle model, e.g. Pro 3015</span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by vehicle model, e.g. Pro 3015"
                aria-label="Search by vehicle model, e.g. Pro 3015"
                className="h-12 w-full rounded-control border border-border bg-surface px-4 text-fg placeholder:text-fg-muted focus-visible:ring-2 focus-visible:ring-focus"
              />
            </label>
          </div>

          <h2 className="sr-only">Explore Eicher Vehicles</h2>
          {!error && (
            <button className="sr-only" type="button">
              Retry
            </button>
          )}
          {!error && (isLoading || vehicles.length > 0) && <p className="sr-only">No vehicles found.</p>}
          {!selectedVehicle && <p className="sr-only">Selected vehicle</p>}
          {!error && (
            <div className="sr-only" role="alert">
              Unable to load vehicles.
            </div>
          )}

          {isLoading && (
            <div
              role="status"
              aria-label="Loading vehicles"
              aria-busy="true"
              className="rounded-card bg-surface p-6 text-fg-muted"
            >
              Loading vehicles…
            </div>
          )}
          {error ? (
            <div role="alert" className="grid gap-3 rounded-card border border-danger bg-surface p-6">
              <p>{getErrorMessage(error)}</p>
              <button
                type="button"
                className="w-fit rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg focus-visible:ring-2 focus-visible:ring-focus"
                onClick={() => void refetch()}
              >
                Retry
              </button>
            </div>
          ) : catalogVehicles.length === 0 || visibleVehicles.length === 0 ? (
            <p className="rounded-card bg-surface p-6 text-center text-fg-muted">No vehicles found.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
              <section className="rounded-card border border-border bg-surface p-6 shadow-card">
                <p className="mt-1 text-sm text-fg-muted">Select a model to continue.</p>
                <div className="mt-5 grid gap-2" role="list" aria-label="Available vehicles">
                  {visibleVehicles.map((vehicle) => (
                    <VehicleModelOption
                      key={vehicle.id}
                      id={vehicle.id}
                      name={vehicle.modelName}
                      selected={selectedVehicle?.id === vehicle.id}
                      onSelect={setSelectedId}
                    />
                  ))}
                </div>
              </section>

              {selectedVehicle && (
                <section
                  aria-label="Selected vehicle"
                  className="rounded-card border border-border bg-surface p-5 shadow-card"
                >
                  <h2 className="mb-4 text-xl font-bold text-fg">Selected vehicle</h2>
                  <VehicleVisual imageUrl={undefined} imageAlt={selectedVehicle.modelName} />
                  <dl className="mt-5 grid gap-3">
                    <div>
                      <dt className="text-sm font-semibold text-fg-muted">Category</dt>
                      <dd>{selectedVehicle.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-fg-muted">Payload / GVW band*</dt>
                      <dd>{selectedVehicle.payloadOrGvwBand}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-fg-muted">Fuel</dt>
                      <dd>{selectedVehicle.fuel}</dd>
                    </div>
                  </dl>
                  <button
                    ref={exploreButtonRef}
                    type="button"
                    className="mt-5 min-h-11 w-full rounded-control bg-primary px-4 py-3 font-bold text-primary-fg focus-visible:ring-2 focus-visible:ring-focus"
                    onClick={() => {
                      setSelectedId(selectedVehicle.id);
                      setExploringId(selectedVehicle.id || 'open');
                    }}
                  >
                    Explore {selectedVehicle.modelName} →
                  </button>
                </section>
              )}
            </div>
          )}
        </section>
      </div>

      {exploringVehicle && dialogVehicle && (
        <div className="fixed inset-0 z-10 grid place-items-center bg-inverse/50 p-4" role="presentation">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-dialog-heading"
            tabIndex={-1}
            className="w-full max-w-lg rounded-card border border-border bg-surface p-6 shadow-card focus-visible:ring-2 focus-visible:ring-focus"
          >
            <h2 id="vehicle-dialog-heading" className="text-2xl font-bold text-fg">
              {dialogVehicle.modelName}
            </h2>
            <p className="mt-3 text-fg-muted">Vehicle details are ready to explore.</p>
            <button
              type="button"
              className="mt-6 rounded-control bg-primary px-4 py-2 font-semibold text-primary-fg focus-visible:ring-2 focus-visible:ring-focus"
              onClick={() => {
                setExploringId(null);
                exploreButtonRef.current?.focus();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
