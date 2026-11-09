import { faker } from '@faker-js/faker';
import { buildFleetOverview } from '../factories/fleet';

faker.seed(1003);
export const fleetOverviewFixtures = [buildFleetOverview()];
