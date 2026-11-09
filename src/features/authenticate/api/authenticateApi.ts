import { baseApi, type LoginRequest, type LoginUserResponse } from '@shared/api';
import { signedIn } from '@entities/session';

export const authenticateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginUserResponse, LoginRequest>({
      query: (body) => ({ url: '/api/auth/login', method: 'POST', body }),
      invalidatesTags: [{ type: 'Session', id: 'CURRENT' }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signedIn(data.data));
        } catch {
          // The mutation hook owns rendering the normalized error.
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authenticateApi;
