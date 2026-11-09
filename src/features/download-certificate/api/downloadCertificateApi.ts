import { baseApi, type GenerateCertificateRequest, type GenerateCertificateResponse } from '@shared/api';

export const downloadCertificateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    generateCertificate: build.mutation<GenerateCertificateResponse, GenerateCertificateRequest>({
      query: (body) => ({ url: '/api/certificates', method: 'POST', body }),
      invalidatesTags: (_result, _error, request) => [{ type: 'Certificate', id: request.resultId }],
    }),
  }),
});

export const { useGenerateCertificateMutation } = downloadCertificateApi;
