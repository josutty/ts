import { http, HttpResponse } from 'msw';
import type { ListRoutesResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const routeHandlers = [
  http.get(apiUrl('/api/routes'), () => {
    const response: ListRoutesResponse = { data: db.routes, total: db.routes.length, page: 1 };
    return HttpResponse.json(response);
  }),
];
