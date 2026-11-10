import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { TelemetryPage } from './TelemetryPage';

describe('TelemetryPage', () => {
  it('renders the trip context and simulated telemetry notice', async () => {
    renderWithProviders(<TelemetryPage />, { route: '/telemetry/demo-trip' });

    expect(await screen.findByRole('heading', { name: 'Live Telemetry' })).toBeInTheDocument();
    expect(screen.getByText('Step 3 · Vehicle monitoring')).toBeInTheDocument();
    expect(screen.getByText('SIMULATED TELEMETRY')).toBeInTheDocument();
    expect(screen.getByText('Demo vehicle health and performance overview')).toBeInTheDocument();
  });

  it('shows a busy score action while the score is submitting', async () => {
    const { user } = renderWithProviders(<TelemetryPage />, { route: '/telemetry/demo-trip' });
    const button = await screen.findByRole('button', { name: 'Get Driver Score' });

    await user.click(button);

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('prevents duplicate score submissions while busy', async () => {
    const { user } = renderWithProviders(<TelemetryPage />, { route: '/telemetry/demo-trip' });
    const button = await screen.findByRole('button', { name: 'Get Driver Score' });

    await user.click(button);
    await user.click(button);

    expect(screen.getByRole('button', { name: 'Get Driver Score' })).toBeDisabled();
  });

  it('exposes the embedded application boundary and async state', async () => {
    renderWithProviders(<TelemetryPage />, { route: '/telemetry/demo-trip' });

    const embed = await screen.findByRole('region', { name: 'Pravah — Embedded Application Placeholder' });
    expect(embed).toHaveAttribute('aria-busy', 'true');
    expect(within(embed).getByText('Pravah — Embedded Application Placeholder')).toBeInTheDocument();
  });

  it('renders an accessible retry action for score errors', async () => {
    renderWithProviders(<TelemetryPage />, { route: '/telemetry/demo-trip' });

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(within(alert).getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });
});
