import { baseApi, type ListRoutesResponse } from '@shared/api';

export const routeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listRoutes: build.query<ListRoutesResponse, undefined>({
      query: () => '/api/routes',
      providesTags: (result) => [
        { type: 'Route', id: 'LIST' },
        ...(result?.data.map(({ id }) => ({ type: 'Route' as const, id })) ?? []),
      ],
    }),
  }),
});

export const { useListRoutesQuery } = routeApi;
