import { faker } from '@faker-js/faker';
import { buildDriverScore } from '../factories/score';

faker.seed(1006);
export const scoreFixtures = [
  buildDriverScore({ id: '1' }),
  buildDriverScore({
    id: '2',
    driverName: 'Priya Sharma',
    companyName: 'Southern Freight',
    score: 94,
    evaluationDate: '2026-05-18',
  }),
  buildDriverScore({
    id: '3',
    driverName: 'Arjun Rao',
    companyName: 'Metro Haulage',
    score: 76,
    evaluationDate: '2026-05-12',
  }),
];
