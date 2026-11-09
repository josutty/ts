import { authHandlers } from './auth';
import { certificateHandlers } from './certificate';
import { fleetHandlers } from './fleet';
import { routeHandlers } from './route';
import { scoreHandlers } from './score';
import { telemetryHandlers } from './telemetry';
import { tripHandlers } from './trip';
import { vehicleHandlers } from './vehicle';

export const allHandlers = [
  ...authHandlers,
  ...vehicleHandlers,
  ...fleetHandlers,
  ...routeHandlers,
  ...tripHandlers,
  ...telemetryHandlers,
  ...scoreHandlers,
  ...certificateHandlers,
];

export const mockOnlyHandlers = allHandlers;
