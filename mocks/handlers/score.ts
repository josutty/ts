import { http, HttpResponse } from 'msw';
import type { ApiErrorBody, GetDriverScoreResponse, ListDriverScoresResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const scoreHandlers = [
  http.get(apiUrl('/api/trips/:tripId/score'), ({ params }) => {
    const score = db.scores.find((item) => item.id === params.tripId || `trip-${item.id}` === params.tripId);
    if (!score) {
      const error: ApiErrorBody = { code: 'NOT_FOUND', message: 'Driver score not found' };
      return HttpResponse.json(error, { status: 404 });
    }
    const response: GetDriverScoreResponse = { data: score };
    return HttpResponse.json(response);
  }),
  http.get(apiUrl('/api/driver-scores'), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const sort = url.searchParams.get('sort');
    const data = [...db.scores]
      .filter(
        (score) =>
          !search ||
          `${score.driverName} ${score.companyName} ${score.vehicle.modelName} ${score.route.label}`
            .toLowerCase()
            .includes(search),
      )
      .sort((a, b) => {
        if (sort === 'highestScore') return b.score - a.score;
        if (sort === 'lowestScore') return a.score - b.score;
        if (sort === 'driverName') return a.driverName.localeCompare(b.driverName);
        return b.evaluationDate.localeCompare(a.evaluationDate);
      });
    const response: ListDriverScoresResponse = { data, total: data.length, page: 1 };
    return HttpResponse.json(response);
  }),
];
