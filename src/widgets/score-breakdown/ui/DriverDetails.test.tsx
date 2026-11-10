import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { DriverDetails } from './DriverDetails';

describe('DriverDetails', () => {
  it('renders the driver detail labels and supplied facts in order', () => {
    renderWithProviders(
      <DriverDetails name="Demo Driver" vehicle="Eicher Pro" date="Today" duration="2h 15m" distance="84 km" />,
    );

    const section = screen.getByRole('region', { name: 'Driver Details' });
    expect(within(section).getByRole('heading', { name: 'Driver Details' })).toBeInTheDocument();
    expect(
      within(section)
        .getAllByRole('term')
        .map((term) => term.textContent),
    ).toEqual(['Driver', 'Vehicle', 'Date', 'Duration', 'Distance']);
    expect(within(section).getByText('Demo Driver')).toBeInTheDocument();
    expect(within(section).getByText('Eicher Pro')).toBeInTheDocument();
    expect(within(section).getByText('Today')).toBeInTheDocument();
    expect(within(section).getByText('2h 15m')).toBeInTheDocument();
    expect(within(section).getByText('84 km')).toBeInTheDocument();
  });
});
