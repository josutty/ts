import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { EventsBreakdown } from './EventsBreakdown';

describe('EventsBreakdown', () => {
  it('shows zero counts and scales event bars to the largest count', () => {
    renderWithProviders(
      <EventsBreakdown
        events={[
          { label: 'Seatbelt Violation', count: 0 },
          { label: 'Harsh Acceleration', count: 2 },
          { label: 'Harsh Braking', count: 1 },
          { label: 'Fast Cornering', count: 0 },
          { label: 'Handbraking', count: 0 },
          { label: 'Overspeeding', count: 4 },
        ]}
      />,
    );

    const section = screen.getByRole('region', { name: 'Events During Trip' });
    expect(within(section).getByRole('heading', { name: 'Events During Trip' })).toBeInTheDocument();
    expect(within(section).getByText('7 total')).toBeInTheDocument();
    expect(within(section).getByText('Seatbelt Violation')).toBeInTheDocument();
    expect(within(section).getByText('0')).toBeInTheDocument();
    expect(within(section).getByRole('progressbar', { name: 'Harsh Acceleration: 2' })).toHaveAttribute('max', '4');
    expect(within(section).getByRole('progressbar', { name: 'Harsh Acceleration: 2' })).toHaveAttribute('value', '2');
    expect(within(section).getByRole('progressbar', { name: 'Overspeeding: 4' })).toHaveAttribute('value', '4');
  });
});
