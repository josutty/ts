import { http, HttpResponse } from 'msw';
import type { ApiErrorBody, GetTelemetryContextResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const telemetryHandlers = [
  http.get(apiUrl('/api/trips/:tripId/telemetry-context'), ({ params }) => {
    const context = db.telemetry.find((item) => item.tripId === params.tripId);
    if (!context) {
      const error: ApiErrorBody = { code: 'NOT_FOUND', message: 'Trip telemetry context not found' };
      return HttpResponse.json(error, { status: 404 });
    }
    const response: GetTelemetryContextResponse = { data: context };
    return HttpResponse.json(response);
  }),
];
