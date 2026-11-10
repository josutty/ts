import { useListVehiclesQuery } from '@entities/vehicle';
import { VehicleVisual } from './VehicleVisual';

type SelectedVehiclePreviewProps = {
  onExplore: (vehicleId: string) => void;
};

export function SelectedVehiclePreview({ onExplore }: SelectedVehiclePreviewProps) {
  const { data: response, isLoading, isError, refetch } = useListVehiclesQuery({});
  const vehicle = response?.data.find((item) => !item.imageUrl) ?? response?.data[0];
  const payloadValues = vehicle?.payloadOrGvwBand.match(/\d+/gu) ?? [];

  return (
    <section
      aria-busy={isLoading}
      aria-labelledby="selected-vehicle-heading"
      className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
      aria-label="Selected vehicle"
    >
      <h2 id="selected-vehicle-heading" className="mb-4 text-xl font-bold text-fg">
        Selected vehicle
      </h2>
      {isError ? (
        <div className="space-y-3" role="alert">
          <p className="text-sm text-fg">Unable to load vehicles.</p>
          <button
            className="rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary"
            type="button"
            onClick={refetch}
          >
            Retry
          </button>
        </div>
      ) : vehicle ? (
        <>
          <VehicleVisual imageUrl={undefined} imageAlt={vehicle.modelName} />
          <dl className="mt-5 grid gap-3">
            <div>
              <dt className="text-sm font-semibold text-muted">Category</dt>
              <dd className="text-base text-fg">{vehicle.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Payload / GVW band*</dt>
              <dd className="text-base text-fg">
                {payloadValues.length >= 2 ? `${payloadValues[0]} – ${payloadValues[1]} T` : vehicle.payloadOrGvwBand}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Fuel</dt>
              <dd className="text-base text-fg">{vehicle.fuel}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Selection</dt>
              <dd className="text-base font-semibold text-fg">✓ Selected</dd>
            </div>
          </dl>
          <button
            className="mt-5 w-full rounded-lg bg-primary px-4 py-3 font-bold text-on-primary"
            type="button"
            onClick={() => onExplore(vehicle.id)}
          >
            Explore {vehicle.modelName} →
          </button>
        </>
      ) : null}
    </section>
  );
}
