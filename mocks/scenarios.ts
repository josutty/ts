import { delay, http, HttpResponse } from 'msw';
import { apiUrl } from './lib';

const error = (code: string, message: string, status: number) => HttpResponse.json({ code, message }, { status });

export const scenarios = {
  loginInvalidCredentials: [
    http.post(apiUrl('/api/auth/login'), () => error('INVALID_CREDENTIALS', 'Invalid username or password', 401)),
  ],
  loginNetworkError: [http.post(apiUrl('/api/auth/login'), () => HttpResponse.error())],
  vehiclesUnauthorized: [
    http.get(apiUrl('/api/vehicles'), () => error('UNAUTHORIZED', 'Sign in to view vehicles', 401)),
  ],
  vehiclesEmpty: [http.get(apiUrl('/api/vehicles'), () => HttpResponse.json({ data: [], total: 0, page: 1 }))],
  fleetOverviewUnauthorized: [
    http.get(apiUrl('/api/fleet-overview'), () => error('UNAUTHORIZED', 'Sign in to view fleet metrics', 401)),
  ],
  routesUnauthorized: [http.get(apiUrl('/api/routes'), () => error('UNAUTHORIZED', 'Sign in to view routes', 401))],
  routesEmpty: [http.get(apiUrl('/api/routes'), () => HttpResponse.json({ data: [], total: 0, page: 1 }))],
  createTripInvalid: [
    http.post(apiUrl('/api/trips'), () => error('INVALID_TRIP', 'Complete trip details are required', 400)),
  ],
  telemetryContextNotFound: [
    http.get(apiUrl('/api/trips/:tripId/telemetry-context'), () =>
      error('NOT_FOUND', 'Trip telemetry context not found', 404),
    ),
  ],
  telemetryEmbedUnavailable: [
    http.get(apiUrl('/api/trips/:tripId/telemetry-context'), () =>
      error('INTEGRATION_UNAVAILABLE', 'Telemetry integration is unavailable', 503),
    ),
  ],
  driverScoreNotFound: [
    http.get(apiUrl('/api/trips/:tripId/score'), () => error('NOT_FOUND', 'Driver score not found', 404)),
  ],
  driverScoreError: [
    http.get(apiUrl('/api/trips/:tripId/score'), () =>
      error('SCORE_UNAVAILABLE', 'Driver score could not be retrieved', 500),
    ),
  ],
  driverScoresUnauthorized: [
    http.get(apiUrl('/api/driver-scores'), () => error('UNAUTHORIZED', 'Sign in to view driver scores', 401)),
  ],
  driverScoresEmpty: [http.get(apiUrl('/api/driver-scores'), () => HttpResponse.json({ data: [], total: 0, page: 1 }))],
  driverScoresSlow: [
    http.get(apiUrl('/api/driver-scores'), async () => {
      await delay('infinite');
      return HttpResponse.json({ data: [], total: 0, page: 1 });
    }),
  ],
  certificateNotFound: [
    http.post(apiUrl('/api/certificates'), () => error('NOT_FOUND', 'Score result not found', 404)),
  ],
  certificateError: [
    http.post(apiUrl('/api/certificates'), () =>
      error('CERTIFICATE_UNAVAILABLE', 'Certificate could not be generated', 500),
    ),
  ],
};
