type VehicleModelOptionProps = {
  id: string;
  name: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function VehicleModelOption({ id, name, selected, onSelect }: VehicleModelOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className="flex min-h-12 w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm font-semibold text-fg transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
      onClick={() => onSelect(id)}
    >
      <span>{name}</span>
      <span className="text-xs text-muted-fg">{selected ? '✓ Selected' : 'Select →'}</span>
    </button>
  );
}
