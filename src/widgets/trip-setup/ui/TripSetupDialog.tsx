import { useEffect, useRef, useState } from 'react';
import { useCreateTripMutation } from '@features/create-trip';
import { useListRoutesQuery } from '@entities/route';
import { useAppSelector } from '@shared/lib/store';

type TripSetupDialogProps = {
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  driverName: string;
  companyName: string;
  routeId: string;
};

type VehicleSelection = { id: string; name?: string; registrationNumber?: string } | null;

function findSelectedVehicle(value: unknown): VehicleSelection {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const candidate = record.selectedVehicle;
  if (candidate && typeof candidate === 'object' && typeof (candidate as Record<string, unknown>).id === 'string') {
    return candidate as VehicleSelection;
  }
  for (const nested of Object.values(record)) {
    const result = findSelectedVehicle(nested);
    if (result) return result;
  }
  return null;
}

const initialValues: FormValues = { driverName: '', companyName: '', routeId: '' };

export function TripSetupDialog({ open, onClose }: TripSetupDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    data: routeResponse,
    isLoading: routesLoading,
    isError: routesError,
    refetch,
  } = useListRoutesQuery(undefined);
  const selectedVehicle = useAppSelector((state) => findSelectedVehicle(state));
  const [createTrip, { isLoading: isCreating }] = useCreateTripMutation();

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    previousFocusRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const errors = {
    driverName: submitted && !values.driverName.trim() ? 'Driver Name is required.' : null,
    companyName: submitted && !values.companyName.trim() ? 'Company Name is required.' : null,
    routeId: submitted && !values.routeId ? 'Route is required.' : null,
  };

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFormError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (!values.driverName.trim() || !values.companyName.trim() || !values.routeId) return;
    try {
      await createTrip({
        driverName: values.driverName.trim(),
        companyName: values.companyName.trim(),
        routeId: values.routeId,
        vehicleId: selectedVehicle?.id ?? '',
      }).unwrap();
      onClose();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create the trip.');
      onClose();
    }
  };

  const vehicleLabel = selectedVehicle?.name ?? selectedVehicle?.registrationNumber ?? selectedVehicle?.id ?? '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"
      data-testid="trip-setup-backdrop"
      role="button"
      tabIndex={-1}
      aria-label="Close dialog backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        aria-labelledby="trip-setup-title"
        aria-modal="true"
        aria-describedby="trip-setup-description"
        className="w-full max-w-lg rounded-xl border border-border bg-surface p-6 text-fg shadow-lg"
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Step 2</p>
            <h2 id="trip-setup-title" className="text-2xl font-bold">
              Trip setup
            </h2>
          </div>
        </div>
        <p id="trip-setup-description" className="mt-2 text-lg font-semibold">
          Start a Vehicle Trip
        </p>
        <form className="mt-5 space-y-4" noValidate onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold" htmlFor="driver-name">
            Driver Name
            <input
              id="driver-name"
              autoComplete="name"
              aria-describedby={errors.driverName ? 'driver-name-error' : undefined}
              aria-invalid={Boolean(errors.driverName)}
              className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2"
              value={values.driverName}
              onChange={(event) => update('driverName', event.target.value)}
            />
          </label>
          {errors.driverName && (
            <span id="driver-name-error" role="alert" className="text-sm text-danger">
              {errors.driverName}
            </span>
          )}
          <label className="block text-sm font-semibold" htmlFor="company-name">
            Company Name
            <input
              id="company-name"
              autoComplete="organization"
              aria-describedby={errors.companyName ? 'company-name-error' : undefined}
              aria-invalid={Boolean(errors.companyName)}
              className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2"
              value={values.companyName}
              onChange={(event) => update('companyName', event.target.value)}
            />
          </label>
          {errors.companyName && (
            <span id="company-name-error" role="alert" className="text-sm text-danger">
              {errors.companyName}
            </span>
          )}
          <label className="block text-sm font-semibold" htmlFor="selected-vehicle">
            Vehicle (automatically selected)
            <input
              id="selected-vehicle"
              readOnly
              disabled
              aria-label="Vehicle (automatically selected)"
              className="mt-1 block w-full rounded-md border border-border bg-muted px-3 py-2"
              value={vehicleLabel}
            />
          </label>
          <label className="block text-sm font-semibold" htmlFor="route-select">
            Route
          </label>
          <select
            id="route-select"
            aria-label="Route"
            aria-describedby={errors.routeId ? 'route-error' : undefined}
            aria-invalid={Boolean(errors.routeId)}
            className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2"
            value={values.routeId}
            onChange={(event) => update('routeId', event.target.value)}
            disabled={routesLoading || isCreating}
          >
            <option value="">Select a route to continue</option>
            {routeResponse?.data.map((route) => (
              <option key={route.id} value={route.id}>
                {route.label}
              </option>
            ))}
          </select>
          {routesLoading && (
            <span className="text-sm" aria-busy="true">
              Loading routes…
            </span>
          )}
          {routesError && (
            <span role="alert" className="text-sm text-danger">
              Unable to load routes.{' '}
              <button type="button" onClick={() => void refetch()}>
                Retry
              </button>
            </span>
          )}
          {errors.routeId && (
            <span id="route-error" role="alert" className="text-sm text-danger">
              {errors.routeId}
            </span>
          )}
          {formError && (
            <div role="alert" className="text-sm text-danger">
              {formError}
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="rounded-md border border-border px-4 py-2" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="rounded-md bg-primary px-4 py-2 text-white disabled:opacity-60"
            >
              {isCreating ? 'Loading…' : 'Proceed to Live Telemetry →'}
            </button>
          </div>
        </form>
        <button type="button" aria-label="×" className="text-2xl" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
