import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the vehicle discovery labels in the specified order', async () => {
    renderWithProviders(<HomePage />);

    const labels = [
      screen.getByText('Digital operations center'),
      screen.getByRole('heading', { level: 1, name: 'Find Your Vehicle' }),
      screen.getByRole('textbox', { name: 'Search by vehicle model, e.g. Pro 3015' }),
      screen.getByRole('button', { name: 'View Driver Scores →' }),
      screen.getByRole('heading', { name: 'Explore Eicher Vehicles' }),
      screen.getByText('Selected vehicle'),
    ];

    expect(labels.map((label) => label.textContent)).toEqual([
      'Digital operations center',
      'Find Your Vehicle',
      '',
      'View Driver Scores →',
      'Explore Eicher Vehicles',
      'Selected vehicle',
    ]);
    expect(screen.getByRole('button', { name: /^Explore .+ →$/ })).toBeInTheDocument();
  });

  it('shows a loading state while the fleet is loading', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('provides a retryable fleet error state', async () => {
    renderWithProviders(<HomePage />);

    const retry = await screen.findByRole('button', { name: 'Retry' });
    expect(retry).toBeEnabled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows the empty vehicle catalog state', async () => {
    renderWithProviders(<HomePage />);

    expect(await screen.findByText(/no vehicles/i)).toBeInTheDocument();
  });

  it('opens the selected vehicle dialog and returns focus to its trigger', async () => {
    const { user } = renderWithProviders(<HomePage />);
    const trigger = await screen.findByRole('button', { name: /^Explore .+ →$/ });

    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
