import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { TripSetupDialog } from './TripSetupDialog';

describe('TripSetupDialog', () => {
  it('opens with the specified labels in order and focuses the dialog', async () => {
    renderWithProviders(<TripSetupDialog open onClose={vi.fn()} />);

    const dialog = await screen.findByRole('dialog', { name: 'Trip setup' });
    expect(dialog).toHaveFocus();
    expect(
      within(dialog)
        .getAllByText(
          /^(Step 2|Trip setup|Start a Vehicle Trip|Driver Name|Company Name|Vehicle \(automatically selected\)|Route|Select a route to continue|Cancel|Proceed to Live Telemetry →|×)$/,
        )
        .map((element) => element.textContent),
    ).toEqual([
      'Step 2',
      'Trip setup',
      'Start a Vehicle Trip',
      'Driver Name',
      'Company Name',
      'Vehicle (automatically selected)',
      'Route',
      'Select a route to continue',
      'Cancel',
      'Proceed to Live Telemetry →',
      '×',
    ]);
  });

  it('shows required field errors without creating a trip', async () => {
    const onClose = vi.fn();
    const { user } = renderWithProviders(<TripSetupDialog open onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Proceed to Live Telemetry →' }));

    expect(screen.getByLabelText('Driver Name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Company Name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Route')).toHaveAttribute('aria-invalid', 'true');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('keeps the selected vehicle read-only', async () => {
    renderWithProviders(<TripSetupDialog open onClose={vi.fn()} />);

    const vehicle = await screen.findByLabelText('Vehicle (automatically selected)');
    expect(vehicle).toHaveAttribute('readonly');
    expect(vehicle).toBeDisabled();
  });

  it('creates a valid trip with the mutation and closes after unwrap succeeds', async () => {
    const onClose = vi.fn();
    const { user } = renderWithProviders(<TripSetupDialog open onClose={onClose} />);

    await user.type(screen.getByLabelText('Driver Name'), 'Alex Driver');
    await user.type(screen.getByLabelText('Company Name'), 'Example Logistics');
    const route = await screen.findByRole('combobox', { name: 'Route' });
    const firstRoute = within(route)
      .getAllByRole('option')
      .find((option) => option.getAttribute('value'));
    if (!firstRoute) throw new Error('Expected a route option.');
    const firstRouteValue = firstRoute.getAttribute('value');
    if (!firstRouteValue) throw new Error('Expected the route option to have a value.');
    await user.selectOptions(route, firstRouteValue);
    await user.click(screen.getByRole('button', { name: 'Proceed to Live Telemetry →' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes from Cancel, close, backdrop, and Escape', async () => {
    const onClose = vi.fn();
    const { user, rerender } = renderWithProviders(<TripSetupDialog open onClose={onClose} />);
    const dialog = await screen.findByRole('dialog', { name: 'Trip setup' });

    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledOnce();

    onClose.mockClear();
    await user.click(within(dialog).getByRole('button', { name: '×' }));
    expect(onClose).toHaveBeenCalledOnce();

    onClose.mockClear();
    await user.click(screen.getByTestId('trip-setup-backdrop'));
    expect(onClose).toHaveBeenCalledOnce();

    onClose.mockClear();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();

    rerender(<TripSetupDialog open={false} onClose={onClose} />);
    expect(screen.queryByRole('dialog', { name: 'Trip setup' })).not.toBeInTheDocument();
  });
});
