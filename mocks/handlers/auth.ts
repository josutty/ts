import { http, HttpResponse } from 'msw';
import type { LoginRequest, LoginUserResponse, ApiErrorBody } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl, at } from '../lib';

export const authHandlers = [
  http.post(apiUrl('/api/auth/login'), async ({ request }) => {
    const body = (await request.json()) as LoginRequest;
    if (!body.username || !body.password) {
      const error: ApiErrorBody = { code: 'INVALID_CREDENTIALS', message: 'Username and password are required' };
      return HttpResponse.json(error, { status: 401 });
    }
    const response: LoginUserResponse = { data: { ...at(db.sessions, 0), username: body.username } };
    return HttpResponse.json(response);
  }),
];
