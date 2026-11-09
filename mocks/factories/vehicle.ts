import type { Vehicle } from '@shared/api/generated/models';

export const buildVehicle = (overrides: Partial<Vehicle> = {}): Vehicle => ({
  id: 'vehicle-1',
  modelName: 'Pro 3015',
  category: 'Medium Duty',
  payloadOrGvwBand: '2.5–5.5 T',
  fuel: 'Diesel',
  imageUrl: 'https://picsum.photos/seed/pro3015/400/300',
  ...overrides,
});
