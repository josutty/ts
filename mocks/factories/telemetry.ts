import type { TelemetryContext } from '@shared/api/generated/models';
import { buildRoute } from './route';
import { buildVehicle } from './vehicle';

export const buildTelemetryContext = (overrides: Partial<TelemetryContext> = {}): TelemetryContext => ({
  tripId: 'trip-1',
  driverName: 'John Doe',
  companyName: 'Example Logistics',
  vehicle: buildVehicle(),
  route: buildRoute(),
  status: 'ready',
  ...overrides,
});
