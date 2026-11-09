import { baseApi, type GetFleetOverviewResponse } from '@shared/api';

export const fleetOverviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFleetOverview: build.query<GetFleetOverviewResponse, undefined>({
      query: () => '/api/fleet-overview',
      providesTags: [{ type: 'FleetOverview', id: 'SINGLE' }],
    }),
  }),
});

export const { useGetFleetOverviewQuery } = fleetOverviewApi;
