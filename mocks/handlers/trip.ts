import { http, HttpResponse } from 'msw';
import type { ApiErrorBody, CreateTripRequest, CreateTripResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const tripHandlers = [
  http.post(apiUrl('/api/trips'), async ({ request }) => {
    const body = (await request.json()) as CreateTripRequest;
    const vehicle = db.vehicles.find((item) => item.id === body.vehicleId);
    const route = db.routes.find((item) => item.id === body.routeId);
    if (!body.driverName || !body.companyName || !vehicle || !route) {
      const error: ApiErrorBody = { code: 'INVALID_TRIP', message: 'Complete trip details are required' };
      return HttpResponse.json(error, { status: 400 });
    }
    const trip = {
      id: `trip-${db.trips.length + 1}`,
      driverName: body.driverName,
      companyName: body.companyName,
      vehicle,
      route,
    };
    db.trips.push(trip);
    const response: CreateTripResponse = { data: trip };
    return HttpResponse.json(response, { status: 201 });
  }),
];
