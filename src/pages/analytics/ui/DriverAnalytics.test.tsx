import { http, HttpResponse, type JsonBodyType } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { server } from '@mocks/node';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { DriverAnalytics } from './DriverAnalytics';

const score = {
  score: 87,
  driverName: 'Aarav Sharma',
  tripId: 'trip-015',
  tripDate: '2024-01-15T12:00:00.000Z',
  vehicle: 'Pro 6048',
  distance: '248 km',
  duration: '4h 20m',
  events: [{ name: 'Harsh braking', value: 2 }],
  breakdown: { Smoothness: '92%', 'Speed control': '84%' },
};

const scoreHandler = (body: JsonBodyType = score) => http.all('*', () => HttpResponse.json(body));

describe('DriverAnalytics', () => {
  it('shows the score loading state', () => {
    server.use(http.all('*', () => new Promise(() => {})));
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/trip-015' });
    expect(screen.getByRole('status', { name: 'Loading driver score' })).toBeInTheDocument();
  });

  it('renders the result for the requested trip with its breakdown and localized date', async () => {
    server.use(scoreHandler());
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/trip-015' });

    expect(await screen.findByRole('heading', { name: 'Driver Analytics' })).toBeInTheDocument();
    expect(screen.getByLabelText('Score 87 out of 100')).toBeInTheDocument();
    expect(screen.getByText('trip-015')).toBeInTheDocument();
    expect(screen.getByText(new Intl.DateTimeFormat('en-IN').format(new Date(score.tripDate)))).toBeInTheDocument();
    expect(screen.getByText('Harsh braking')).toBeInTheDocument();
    expect(screen.getByText('Smoothness')).toBeInTheDocument();
  });

  it('displays the score as an integer out of 100', async () => {
    server.use(scoreHandler({ ...score, score: 87.5 }));
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/trip-015' });

    expect(await screen.findByLabelText('Score 88 out of 100')).toBeInTheDocument();
    expect(screen.getByText('88')).toBeInTheDocument();
  });

  it('shows a retryable error and retries the score query', async () => {
    let attempts = 0;
    server.use(
      http.all('*', () => {
        attempts += 1;
        return attempts === 1
          ? HttpResponse.json({ message: 'Score unavailable' }, { status: 500 })
          : HttpResponse.json(score);
      }),
    );
    const { user } = renderWithProviders(<DriverAnalytics />, { route: '/analytics/trip-015' });

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/score unavailable|something went wrong/i)).toBeInTheDocument();
    await user.click(within(alert).getByRole('button', { name: 'Retry' }));
    expect(await screen.findByLabelText('Score 87 out of 100')).toBeInTheDocument();
  });

  it('downloads a sample nonofficial certificate and provides an exit link', async () => {
    server.use(scoreHandler());
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const createObjectURL = vi.fn(() => 'blob:certificate');
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
    const { user } = renderWithProviders(<DriverAnalytics />, { route: '/analytics/trip-015' });

    await screen.findByRole('heading', { name: 'Driver Analytics' });
    await user.click(screen.getByRole('button', { name: '↓ Download Certificate' }));
    expect(click).toHaveBeenCalled();
    expect(createObjectURL).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:certificate');
    expect(screen.getByRole('link', { name: 'Exit to Home' })).toHaveAttribute('href', '/');
  });
});
