import { sessionFixtures } from './fixtures/auth';
import { certificateFixtures } from './fixtures/certificate';
import { fleetOverviewFixtures } from './fixtures/fleet';
import { routeFixtures } from './fixtures/route';
import { scoreFixtures } from './fixtures/score';
import { telemetryFixtures } from './fixtures/telemetry';
import { tripFixtures } from './fixtures/trip';
import { vehicleFixtures } from './fixtures/vehicle';

const clone = <T>(value: T): T => structuredClone(value);

export const db = {
  sessions: clone(sessionFixtures),
  vehicles: clone(vehicleFixtures),
  fleetOverview: clone(fleetOverviewFixtures),
  routes: clone(routeFixtures),
  trips: clone(tripFixtures),
  telemetry: clone(telemetryFixtures),
  scores: clone(scoreFixtures),
  certificates: clone(certificateFixtures),
};

export const resetDb = (): void => {
  db.sessions = clone(sessionFixtures);
  db.vehicles = clone(vehicleFixtures);
  db.fleetOverview = clone(fleetOverviewFixtures);
  db.routes = clone(routeFixtures);
  db.trips = clone(tripFixtures);
  db.telemetry = clone(telemetryFixtures);
  db.scores = clone(scoreFixtures);
  db.certificates = clone(certificateFixtures);
};
