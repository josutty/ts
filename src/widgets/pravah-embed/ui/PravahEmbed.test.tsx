import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { PravahEmbed } from './PravahEmbed';

describe('PravahEmbed', () => {
  it('shows a loading boundary while telemetry context is loading', () => {
    renderWithProviders(<PravahEmbed tripId="trip-001" status="loading" />);

    expect(screen.getByRole('region', { name: 'Pravah — Embedded Application Placeholder' })).toHaveAttribute(
      'aria-busy',
      'true',
    );
  });

  it('renders the ready placeholder without fabricating telemetry readings', async () => {
    renderWithProviders(<PravahEmbed tripId="trip-001" status="ready" />);

    const region = await screen.findByRole('region', {
      name: 'Pravah — Embedded Application Placeholder',
    });

    expect(region).toHaveAttribute('aria-busy', 'false');
    expect(within(region).getByText('SIMULATED TELEMETRY')).toBeInTheDocument();
    expect(within(region).queryByText(/km\/h|rpm|°c|fuel|speed|reading/i)).not.toBeInTheDocument();
  });

  it('shows an integration error and retries the telemetry query', async () => {
    const fallbackMessage = 'Telemetry integration is temporarily unavailable';
    const onRetry = vi.fn();
    const { user } = renderWithProviders(
      <PravahEmbed tripId="trip-error" status="error" fallbackMessage={fallbackMessage} onRetry={onRetry} />,
    );

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Integration unavailable')).toBeInTheDocument();
    expect(within(alert).getByText(fallbackMessage)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('exposes the labelled telemetry region and keeps labels in order', async () => {
    renderWithProviders(<PravahEmbed tripId="trip-001" status="ready" />);

    const region = await screen.findByRole('region', {
      name: 'Pravah — Embedded Application Placeholder',
    });
    const labels = within(region)
      .getAllByText(/Pravah — Embedded Application Placeholder|SIMULATED TELEMETRY|Integration unavailable/)
      .map((element) => element.textContent);

    expect(labels).toEqual(['Pravah — Embedded Application Placeholder', 'SIMULATED TELEMETRY']);
  });
});
