import type { DriverScoreResult } from '@shared/api/generated/models';
import { buildRoute } from './route';
import { buildVehicle } from './vehicle';

export const buildDriverScore = (overrides: Partial<DriverScoreResult> = {}): DriverScoreResult => ({
  id: 'score-1',
  driverName: 'John Doe',
  companyName: 'Example Logistics',
  vehicle: buildVehicle({
    id: 'vehicle-2',
    modelName: 'Pro 8035 Tipper',
    category: 'Heavy Duty',
    payloadOrGvwBand: '8–12 T',
  }),
  route: buildRoute(),
  score: 88,
  evaluationDate: '2026-05-20',
  events: [
    { name: 'Seatbelt Violation', count: 1 },
    { name: 'Harsh Acceleration', count: 3 },
    { name: 'Harsh Braking', count: 2 },
    { name: 'Fast Cornering', count: 0 },
    { name: 'Handbraking', count: 0 },
    { name: 'Overspeeding', count: 1 },
  ],
  drivingStyle: [
    { name: 'Safety', value: 88 },
    { name: 'Efficiency', value: 74 },
    { name: 'Fuel Economy', value: 82 },
    { name: 'Idle Management', value: 68 },
    { name: 'Speed', value: 79 },
  ],
  ...overrides,
});
