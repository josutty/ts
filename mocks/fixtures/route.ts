import { faker } from '@faker-js/faker';
import { buildRoute } from '../factories/route';

faker.seed(1004);
export const routeFixtures = [
  buildRoute({ id: '1', label: 'Chennai → Bengaluru' }),
  buildRoute({ id: '2', label: 'Bengaluru → Hyderabad' }),
  buildRoute({ id: '3', label: 'Mumbai → Pune' }),
  buildRoute({ id: '4', label: 'Delhi → Jaipur' }),
  buildRoute({ id: '5', label: 'Kochi → Bengaluru' }),
  buildRoute({ id: '6', label: 'Chennai → Coimbatore' }),
];
