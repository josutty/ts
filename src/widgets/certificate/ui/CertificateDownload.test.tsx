import { describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { server } from '@mocks/node';
import { CertificateDownload } from './CertificateDownload';

const selectedResult = {
  id: 'result-012',
  driverName: 'Aarav Mehta',
  vehicle: 'Eicher Pro',
  score: 92,
  date: '2025-01-15T10:30:00.000Z',
};

describe('CertificateDownload', () => {
  it('targets only the selected result and invokes the print helper', async () => {
    const requests: unknown[] = [];
    server.use(
      http.post('*', async ({ request }) => {
        requests.push(await request.json());
        return HttpResponse.json({ certificateId: 'certificate-012' });
      }),
    );
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    const user = userEvent.setup();

    renderWithProviders(<CertificateDownload result={selectedResult} />);
    await user.click(screen.getByRole('button', { name: '↓ Download Certificate' }));

    expect(requests).toEqual([{ resultId: 'result-012' }]);
    expect(print).toHaveBeenCalledTimes(1);
    print.mockRestore();
  });

  it('renders an explicitly sample, nonofficial certificate with localized result details', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CertificateDownload result={selectedResult} />);

    await user.click(screen.getByRole('button', { name: '↓ Download Certificate' }));

    const certificate = await screen.findByRole('document', { name: 'Sample certificate' });
    expect(within(certificate).getByText('Sample certificate')).toBeInTheDocument();
    expect(within(certificate).getByText('Nonofficial')).toBeInTheDocument();
    expect(within(certificate).getByText('Aarav Mehta')).toBeInTheDocument();
    expect(within(certificate).getByText('15/01/2025')).toBeInTheDocument();
  });

  it('disables the download action while submitting', async () => {
    server.use(
      http.post(
        '*',
        async () =>
          new Promise(() => {
            // Keep the mutation pending while the submitting state is checked.
          }),
      ),
    );
    const user = userEvent.setup();
    renderWithProviders(<CertificateDownload result={selectedResult} />);
    const button = screen.getByRole('button', { name: '↓ Download Certificate' });

    await user.click(button);

    expect(button).toBeDisabled();
  });

  it('shows a safe error and retries the selected result', async () => {
    let attempts = 0;
    server.use(
      http.post('*', () => {
        attempts += 1;
        return attempts === 1
          ? HttpResponse.json({ message: 'certificate unavailable' }, { status: 500 })
          : HttpResponse.json({ certificateId: 'certificate-012' });
      }),
    );
    const user = userEvent.setup();
    renderWithProviders(<CertificateDownload result={selectedResult} />);

    await user.click(screen.getByRole('button', { name: '↓ Download Certificate' }));
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Something went wrong');

    await user.click(within(alert).getByRole('button', { name: 'Retry' }));

    expect(await screen.findByRole('document', { name: 'Sample certificate' })).toBeInTheDocument();
    expect(attempts).toBe(2);
  });
});
