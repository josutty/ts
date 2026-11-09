import { faker } from '@faker-js/faker';
import { buildTelemetryContext } from '../factories/telemetry';

faker.seed(1008);
export const telemetryFixtures = [buildTelemetryContext()];
