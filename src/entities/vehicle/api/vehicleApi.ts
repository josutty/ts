import { baseApi, type ListVehiclesParams, type ListVehiclesResponse } from '@shared/api';

export const vehicleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listVehicles: build.query<ListVehiclesResponse, ListVehiclesParams>({
      query: (params) => ({ url: '/api/vehicles', params }),
      providesTags: (result) => [
        { type: 'Vehicle', id: 'LIST' },
        ...(result?.data
          .map(({ id, category, modelName }) => [
            { type: 'Vehicle' as const, id },
            { type: 'Vehicle' as const, id: `category:${category}` },
            { type: 'Vehicle' as const, id: `model:${modelName}` },
          ])
          .flat() ?? []),
      ],
    }),
  }),
});

export const { useListVehiclesQuery } = vehicleApi;
