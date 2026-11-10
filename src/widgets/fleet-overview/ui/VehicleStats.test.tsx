import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';

import { VehicleStats } from './VehicleStats';

describe('VehicleStats', () => {
  it('renders the label, value, and caption with semantic grouping', () => {
    render(<VehicleStats label="Vehicles connected" value="Demo" caption="Illustrative fleet overview" />);

    const card = screen.getByRole('article');
    const label = within(card).getByText('Vehicles connected');
    const value = within(card).getByText('Demo');

    expect(label).toHaveProperty('tagName', 'DT');
    expect(value).toHaveProperty('tagName', 'DD');
    expect(within(card).getByText('Illustrative fleet overview')).toBeInTheDocument();
  });

  it('renders KPI cards with the design labels and values in order', () => {
    render(
      <section aria-label="Fleet overview">
        <VehicleStats label="Vehicles connected" value="Demo" caption="Illustrative fleet overview" />
        <VehicleStats label="Fuel efficiency gain" value="Demo" caption="CO₂ reduction" />
      </section>,
    );

    expect(screen.getByRole('region', { name: 'Fleet overview' })).toHaveTextContent(
      'Vehicles connectedDemoIllustrative fleet overviewFuel efficiency gainDemoCO₂ reduction',
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('uses responsive card layout classes', () => {
    render(<VehicleStats label="Vehicles connected" value="Demo" caption="Illustrative fleet overview" />);

    expect(screen.getByRole('article')).toHaveClass('w-full', 'min-w-0', 'flex-1', 'sm:flex-row', 'sm:min-w-[12rem]');
  });
});
