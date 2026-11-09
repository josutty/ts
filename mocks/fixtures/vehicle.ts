import { faker } from '@faker-js/faker';
import { buildVehicle } from '../factories/vehicle';

faker.seed(1002);
export const vehicleFixtures = [
  buildVehicle({ id: '1', modelName: 'Pro 3015', category: 'Medium Duty', payloadOrGvwBand: '2.5–5.5 T' }),
  buildVehicle({ id: '2', modelName: 'Pro 8035 Tipper', category: 'Heavy Duty', payloadOrGvwBand: '8–12 T' }),
  buildVehicle({ id: '3', modelName: 'Pro 2040', category: 'Light Duty', payloadOrGvwBand: '1–2.5 T' }),
  buildVehicle({ id: '4', modelName: 'Pro 6025', category: 'Medium Duty', payloadOrGvwBand: '5.5–8 T' }),
];
