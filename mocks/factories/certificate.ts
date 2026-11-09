import type { Certificate } from '@shared/api/generated/models';

export const buildCertificate = (overrides: Partial<Certificate> = {}): Certificate => ({
  reference: 'CERT-2026-0001',
  resultId: 'score-1',
  downloadUrl: 'https://example.com/certificates/CERT-2026-0001.pdf',
  official: false,
  ...overrides,
});
