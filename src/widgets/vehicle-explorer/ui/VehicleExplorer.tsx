import { useMemo, useState } from 'react';
import { useListVehiclesQuery } from '@entities/vehicle';
import { getErrorMessage } from '@shared/api';
import { VehicleCategory } from './VehicleCategory';

type VehicleModel = { id: string; name: string };
type VehicleCategoryData = { id: string; name: string; models: VehicleModel[] };
type VehicleRecord = { id: string; category: string; modelName: string };

function categoriesFromData(data: unknown): VehicleCategoryData[] {
  if (Array.isArray(data)) return data as VehicleCategoryData[];
  if (data && typeof data === 'object' && 'categories' in data) {
    const categories = (data as { categories?: unknown }).categories;
    return Array.isArray(categories) ? (categories as VehicleCategoryData[]) : [];
  }
  if (data && typeof data === 'object' && 'data' in data) {
    const records = (data as { data?: unknown }).data;
    if (!Array.isArray(records)) return [];

    const grouped = new Map<string, VehicleCategoryData>();
    records.forEach((record) => {
      if (!record || typeof record !== 'object') return;
      const vehicle = record as Partial<VehicleRecord>;
      if (!vehicle.id || !vehicle.category || !vehicle.modelName) return;
      const category = grouped.get(vehicle.category) ?? {
        id: vehicle.category,
        name: vehicle.category,
        models: [],
      };
      category.models.push({ id: vehicle.id, name: vehicle.modelName });
      grouped.set(vehicle.category, category);
    });
    return [...grouped.values()];
  }
  return [];
}

export function VehicleExplorer() {
  const { data, error, isLoading, refetch } = useListVehiclesQuery({});
  const [search, setSearch] = useState('');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [manualExpanded, setManualExpanded] = useState<Record<string, boolean>>({});

  const categories = categoriesFromData(data);
  const normalizedSearch = search.trim().toLowerCase();
  const visibleCategories = useMemo(() => {
    if (!normalizedSearch) return categories;
    return categories
      .map((category) => ({
        ...category,
        models: category.models.filter((model) => model.name.toLowerCase().includes(normalizedSearch)),
      }))
      .filter((category) => category.models.length > 0);
  }, [categories, normalizedSearch]);
  const resultCount = visibleCategories.reduce((count, category) => count + category.models.length, 0);

  if (isLoading) {
    return (
      <div role="status" aria-label="Loading vehicles" aria-busy="true" className="p-6 text-muted-fg">
        Loading vehicles…
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="grid gap-3 rounded-lg border border-danger bg-surface p-6 text-fg">
        <p>{getErrorMessage(error)}</p>
        <button
          type="button"
          className="w-fit rounded-lg bg-primary px-4 py-2 font-semibold text-primary-fg focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => void refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-fg">Explore Eicher Vehicles</h1>
          <p className="mt-1 text-sm text-muted-fg">
            {normalizedSearch
              ? `${resultCount} of ${categories.reduce((n, c) => n + c.models.length, 0)} vehicles`
              : '3 categories'}
          </p>
        </div>
        <label className="w-full sm:w-auto">
          <span className="sr-only">Search by vehicle model, e.g. Pro 3015</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by vehicle model, e.g. Pro 3015"
            aria-label="Search by vehicle model, e.g. Pro 3015"
            className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-fg placeholder:text-muted-fg focus-visible:ring-2 focus-visible:ring-primary sm:w-80"
          />
        </label>
      </div>
      {visibleCategories.length === 0 ? (
        <p className="mt-8 rounded-lg bg-muted p-4 text-center text-muted-fg">
          No vehicles found. Try a different model name.
        </p>
      ) : (
        <div className="mt-5">
          {visibleCategories.map((category) => (
            <VehicleCategory
              key={category.id}
              name={category.name}
              models={category.models}
              expanded={normalizedSearch ? true : Boolean(manualExpanded[category.id])}
              onToggle={() => setManualExpanded((current) => ({ ...current, [category.id]: !current[category.id] }))}
              selectedModelId={selectedModelId}
              onSelect={setSelectedModelId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
