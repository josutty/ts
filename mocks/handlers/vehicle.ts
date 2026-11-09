import { http, HttpResponse } from 'msw';
import type { ApiErrorBody, ListVehiclesResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const vehicleHandlers = [
  http.get(apiUrl('/api/vehicles'), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const category = url.searchParams.get('category');
    const data = db.vehicles.filter(
      (vehicle) =>
        (!search || vehicle.modelName.toLowerCase().includes(search)) && (!category || vehicle.category === category),
    );
    const response: ListVehiclesResponse = { data, total: data.length, page: 1 };
    return HttpResponse.json(response);
  }),
];
export const vehicleUnauthorized = (): Response => {
  const error: ApiErrorBody = { code: 'UNAUTHORIZED', message: 'Sign in to view vehicles' };
  return HttpResponse.json(error, { status: 401 });
};
