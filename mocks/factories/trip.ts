import type { Trip } from '@shared/api/generated/models';
import { buildRoute } from './route';
import { buildVehicle } from './vehicle';

export const buildTrip = (overrides: Partial<Trip> = {}): Trip => ({
  id: 'trip-1',
  driverName: 'John Doe',
  companyName: 'Example Logistics',
  vehicle: buildVehicle(),
  route: buildRoute(),
  ...overrides,
});
