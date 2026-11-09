import { baseApi, type GetTelemetryContextParams, type GetTelemetryContextResponse } from '@shared/api';

export const tripApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTelemetryContext: build.query<GetTelemetryContextResponse, GetTelemetryContextParams>({
      query: ({ tripId }) => `/api/trips/${tripId}/telemetry-context`,
      providesTags: (result, _error, { tripId }) => [
        { type: 'Trip', id: tripId },
        ...(result?.data ? [{ type: 'TelemetryContext' as const, id: result.data.tripId }] : []),
      ],
    }),
  }),
});

export const { useGetTelemetryContextQuery } = tripApi;
