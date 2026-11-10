import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { DriverAnalytics } from './DriverAnalytics';

describe('DriverAnalytics', () => {
  it('shows a loading state while the driver score is requested', () => {
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/demo-trip' });

    expect(screen.getByRole('status', { name: /loading driver score/i })).toBeInTheDocument();
  });

  it('renders the result for the trip in the route', async () => {
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/demo-trip' });

    expect(await screen.findByRole('heading', { name: 'Driver Analytics' })).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
    expect(screen.getByText('Driver performance')).toBeInTheDocument();
    expect(screen.getByText('Demonstration driver score and trip event summary')).toBeInTheDocument();
    expect(screen.getByText(/\/100$/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Driver Details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Events During Trip' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Driving Style Breakdown' })).toBeInTheDocument();
  });

  it('shows a retryable error when the score request fails', async () => {
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/error-trip' });

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('offers certificate download and exit actions', async () => {
    const { user } = renderWithProviders(<DriverAnalytics />, { route: '/analytics/demo-trip' });

    await screen.findByRole('heading', { name: 'Driver Analytics' });
    expect(screen.getByRole('button', { name: '↓ Download Certificate' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Exit to Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText(/sample|nonofficial/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '↓ Download Certificate' }));
  });

  it('formats trip dates using the en-IN locale', async () => {
    renderWithProviders(<DriverAnalytics />, { route: '/analytics/demo-trip' });

    await screen.findByRole('heading', { name: 'Driver Analytics' });
    expect(screen.getByText(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/)).toBeInTheDocument();
  });
});
