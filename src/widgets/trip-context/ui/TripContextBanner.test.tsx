import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TripContextBanner } from './TripContextBanner';

const facts = {
  driverName: 'Aarav Mehta',
  company: 'Eicher Transport',
  vehicle: 'Pro 6055',
  route: 'Delhi → Jaipur',
};

describe('TripContextBanner', () => {
  it('renders trip facts in the specified order and keeps wrapped values readable', () => {
    render(<TripContextBanner {...facts} route="A very long route name that must remain readable when it wraps" />);

    const banner = screen.getByRole('region', { name: 'Trip details' });
    expect(
      within(banner)
        .getAllByRole('term')
        .map((term) => term.textContent),
    ).toEqual(['Driver Name', 'Company', 'Vehicle', 'Route']);
    expect(
      within(banner)
        .getAllByRole('definition')
        .map((definition) => definition.textContent),
    ).toEqual([
      'Aarav Mehta',
      'Eicher Transport',
      'Pro 6055',
      'A very long route name that must remain readable when it wraps',
    ]);
    expect(within(banner).getByText(/A very long route/)).toHaveClass('break-words');
  });

  it('renders an optional score action with its accessible name', () => {
    const { rerender } = render(<TripContextBanner {...facts} />);

    expect(screen.queryByRole('button', { name: 'Get Driver Score →' })).not.toBeInTheDocument();

    rerender(<TripContextBanner {...facts} action={<button type="button">Get Driver Score →</button>} />);

    expect(screen.getByRole('button', { name: 'Get Driver Score →' })).toBeInTheDocument();
  });
});
