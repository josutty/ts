import { http, HttpResponse } from 'msw';
import type {
  ApiErrorBody,
  GenerateCertificateRequest,
  GenerateCertificateResponse,
} from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const certificateHandlers = [
  http.post(apiUrl('/api/certificates'), async ({ request }) => {
    const body = (await request.json()) as GenerateCertificateRequest;
    const certificate = db.certificates.find((item) => item.resultId === body.resultId);
    if (!certificate) {
      const error: ApiErrorBody = { code: 'NOT_FOUND', message: 'Score result not found' };
      return HttpResponse.json(error, { status: 404 });
    }
    const response: GenerateCertificateResponse = { data: certificate };
    return HttpResponse.json(response);
  }),
];
