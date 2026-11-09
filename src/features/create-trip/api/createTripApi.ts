import { baseApi, type CreateTripRequest, type CreateTripResponse } from '@shared/api';

export const createTripApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTrip: build.mutation<CreateTripResponse, CreateTripRequest>({
      query: (body) => ({ url: '/api/trips', method: 'POST', body }),
      invalidatesTags: (result) => [
        { type: 'Trip', id: 'LIST' },
        ...(result ? [{ type: 'Trip' as const, id: result.data.id }] : []),
      ],
    }),
  }),
});

export const { useCreateTripMutation } = createTripApi;
