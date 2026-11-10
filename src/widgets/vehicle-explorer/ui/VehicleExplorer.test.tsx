import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { server } from '@mocks/node';
import { apiUrl } from '@mocks/lib';
import { VehicleExplorer } from './VehicleExplorer';

const vehiclesSlow = [
  http.get(apiUrl('/api/vehicles'), async () => {
    await delay('infinite');
    return HttpResponse.json({ data: [], total: 0, page: 1 });
  }),
];

const vehiclesServerError = [
  http.get(apiUrl('/api/vehicles'), () =>
    HttpResponse.json({ code: 'VEHICLES_UNAVAILABLE', message: 'Something went wrong' }, { status: 500 }),
  ),
];

describe('VehicleExplorer', () => {
  it('shows a loading state first', () => {
    server.use(...vehiclesSlow);
    renderWithProviders(<VehicleExplorer />);
    expect(screen.getByRole('status', { name: /loading vehicles/i })).toBeInTheDocument();
  });

  it('renders the exact heading, search placeholder, and three categories on success', async () => {
    renderWithProviders(<VehicleExplorer />);

    expect(await screen.findByRole('heading', { name: 'Explore Eicher Vehicles' })).toBeInTheDocument();
    expect(screen.getByText('3 categories')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search by vehicle model, e.g. Pro 3015' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View Vehicles ▼' })).toHaveLength(3);
  });

  it('typing filters model rows and updates the result count', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VehicleExplorer />);
    const search = await screen.findByRole('textbox', {
      name: 'Search by vehicle model, e.g. Pro 3015',
    });

    await user.type(search, 'Pro 3015');

    expect(screen.getByRole('button', { name: /Pro 3015/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Pro 6048/ })).not.toBeInTheDocument();
    expect(screen.getByText(/1 of/i)).toBeInTheDocument();
  });

  it('shows the empty message when no model matches the search', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VehicleExplorer />);
    const search = await screen.findByRole('textbox', {
      name: 'Search by vehicle model, e.g. Pro 3015',
    });

    await user.type(search, 'does-not-exist');
    expect(screen.getByText('No vehicles found. Try a different model name.')).toBeInTheDocument();
  });

  it('selects a model and shows its selected state and name', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VehicleExplorer />);
    const model = await screen.findByRole('button', { name: /Pro 3015/ });

    await user.click(model);

    expect(model).toHaveTextContent('✓ Selected');
    expect(screen.getByText('Pro 3015')).toBeInTheDocument();
  });

  it('shows a retryable error state', async () => {
    server.use(...vehiclesServerError);
    const { user } = renderWithProviders(<VehicleExplorer />);
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Something went wrong')).toBeInTheDocument();

    server.resetHandlers();
    await user.click(within(alert).getByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('heading', { name: 'Explore Eicher Vehicles' })).toBeInTheDocument();
  });
});
