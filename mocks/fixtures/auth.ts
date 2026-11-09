import { faker } from '@faker-js/faker';
import { buildSession } from '../factories/auth';

faker.seed(1001);
export const sessionFixtures = [buildSession()];
