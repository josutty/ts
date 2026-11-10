import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TripProgress } from './TripProgress';

describe('TripProgress', () => {
  it('renders the exact step labels in order', () => {
    render(<TripProgress currentStep={3} />);

    const progress = screen.getByRole('navigation', { name: 'Trip progress' });
    const items = within(progress).getAllByRole('listitem');
    const labels = ['Select vehicle', 'Trip details', 'Live telemetry', 'Driver score'];

    expect(items).toHaveLength(labels.length);
    items.forEach((item, index) => {
      expect(item).toHaveAccessibleName(labels[index]);
    });
  });

  it('exposes current, done, and upcoming states without relying on color', () => {
    render(<TripProgress currentStep={3} />);

    const items = within(screen.getByRole('navigation', { name: 'Trip progress' })).getAllByRole('listitem');

    expect(items.map((item) => item)).toHaveLength(4);
    expect(items[0]).toHaveAttribute('data-state', 'done');
    expect(items[1]).toHaveAttribute('data-state', 'done');
    expect(items[2]).toHaveAttribute('data-state', 'current');
    expect(items[2]).toHaveAttribute('aria-current', 'step');
    expect(items[3]).toHaveAttribute('data-state', 'upcoming');
    expect(items.map((item) => item.getAttribute('aria-label'))).toEqual([
      'Select vehicle: done',
      'Trip details: done',
      'Live telemetry: current',
      'Driver score: upcoming',
    ]);
  });
});
