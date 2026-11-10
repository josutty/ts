import { VehicleModelOption } from './VehicleModelOption';

type VehicleModel = { id: string; name: string };

type VehicleCategoryProps = {
  name: string;
  models: VehicleModel[];
  expanded: boolean;
  onToggle: () => void;
  selectedModelId: string | null;
  onSelect: (id: string) => void;
};

export function VehicleCategory({ name, models, expanded, onToggle, selectedModelId, onSelect }: VehicleCategoryProps) {
  return (
    <section className="border-b border-border py-4 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-fg">{name}</h2>
        <button
          type="button"
          aria-expanded={expanded}
          className="min-h-10 rounded-lg px-3 py-2 text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary"
          onClick={onToggle}
        >
          {expanded ? 'Hide Vehicles ▲' : 'View Vehicles ▼'}
        </button>
      </div>
      <div className={expanded ? 'mt-3 grid gap-2' : 'sr-only'} role="list">
        {models.map((model) => (
          <VehicleModelOption
            key={model.id}
            id={model.id}
            name={model.name}
            selected={selectedModelId === model.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
