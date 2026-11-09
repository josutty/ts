export interface DemoStripProps {
  className?: string;
}

export function DemoStrip({ className }: DemoStripProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border bg-surface px-4 py-2 text-sm text-fg ${className ?? ''}`.trim()}
      role="status"
    >
      <span className="font-semibold tracking-wide">PROTOTYPE</span>
      <span>Simulated vehicle telemetry and driver scores</span>
      <span>Not connected to live VECV systems</span>
    </div>
  );
}
