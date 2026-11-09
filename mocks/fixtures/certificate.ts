import { faker } from '@faker-js/faker';
import { buildCertificate } from '../factories/certificate';

faker.seed(1007);
export const certificateFixtures = [buildCertificate()];
