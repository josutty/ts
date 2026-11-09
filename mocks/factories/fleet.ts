import type { FleetOverview } from '@shared/api/generated/models';

export const buildFleetOverview = (overrides: Partial<FleetOverview> = {}): FleetOverview => ({
  vehiclesConnected: 247,
  fuelEfficiencyGain: '+8.2%',
  co2Reduction: '−12.4%',
  ...overrides,
});
