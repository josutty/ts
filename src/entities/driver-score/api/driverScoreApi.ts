import {
  baseApi,
  type GetDriverScoreParams,
  type GetDriverScoreResponse,
  type ListDriverScoresParams,
  type ListDriverScoresResponse,
} from '@shared/api';

export const driverScoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDriverScore: build.query<GetDriverScoreResponse, GetDriverScoreParams>({
      query: ({ tripId }) => `/api/trips/${tripId}/score`,
      providesTags: (_result, _error, { tripId }) => [{ type: 'DriverScore', id: tripId }],
    }),
    listDriverScores: build.query<ListDriverScoresResponse, ListDriverScoresParams>({
      query: (params) => ({ url: '/api/driver-scores', params }),
      providesTags: (result) => [
        { type: 'DriverScore', id: 'LIST' },
        ...(result?.data.map(({ id }) => ({ type: 'DriverScore' as const, id })) ?? []),
      ],
    }),
  }),
});

export const { useGetDriverScoreQuery, useListDriverScoresQuery } = driverScoreApi;
