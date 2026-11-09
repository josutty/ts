import { faker } from '@faker-js/faker';
import { buildTrip } from '../factories/trip';

faker.seed(1005);
export const tripFixtures = [buildTrip()];
