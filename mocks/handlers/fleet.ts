import { http, HttpResponse } from 'msw';
import type { GetFleetOverviewResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl, at } from '../lib';

export const fleetHandlers = [
  http.get(apiUrl('/api/fleet-overview'), () => {
    const response: GetFleetOverviewResponse = { data: at(db.fleetOverview, 0) };
    return HttpResponse.json(response);
  }),
];
