import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import { SelectedVehiclePreview } from './SelectedVehiclePreview';

describe('SelectedVehiclePreview', () => {
  it('renders the selected vehicle details in the specified order', async () => {
    renderWithProviders(<SelectedVehiclePreview onExplore={vi.fn()} />);

    const preview = await screen.findByRole('region', { name: 'Selected vehicle' });
    const labels = Array.from(preview.querySelectorAll('dt')).map((label) => label.textContent);

    expect(labels).toEqual(['Category', 'Payload / GVW band*', 'Fuel', 'Selection']);
    expect(preview).toHaveTextContent('✓ Selected');
  });

  it('uses an en dash and T for the payload / GVW band value', async () => {
    renderWithProviders(<SelectedVehiclePreview onExplore={vi.fn()} />);

    const preview = await screen.findByRole('region', { name: 'Selected vehicle' });
    expect(preview).toHaveTextContent(/\d+\s+–\s+\d+\s*T/);
  });

  it('calls onExplore with the selected vehicle id from the model-specific action', async () => {
    const onExplore = vi.fn();
    const { user } = renderWithProviders(<SelectedVehiclePreview onExplore={onExplore} />);

    const button = await screen.findByRole('button', { name: /^Explore .+ →$/ });
    await user.click(button);

    expect(onExplore).toHaveBeenCalledTimes(1);
    expect(onExplore).toHaveBeenCalledWith(expect.any(String));
  });

  it('does not crash when the selected vehicle has no image', async () => {
    renderWithProviders(<SelectedVehiclePreview onExplore={vi.fn()} />);

    const preview = await screen.findByRole('region', { name: 'Selected vehicle' });
    expect(await screen.findByText('PRODUCT IMAGE · REPLACEABLE')).toBeInTheDocument();
    expect(preview).toBeInTheDocument();
  });
});
