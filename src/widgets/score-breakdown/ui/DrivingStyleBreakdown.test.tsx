import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { DrivingStyleBreakdown } from './DrivingStyleBreakdown';

describe('DrivingStyleBreakdown', () => {
  it('names all five dimensions and provides an accessible chart equivalent', () => {
    renderWithProviders(
      <DrivingStyleBreakdown
        metrics={[
          { label: 'Safety', value: 92 },
          { label: 'Efficiency', value: 86 },
          { label: 'Fuel Economy', value: 78 },
          { label: 'Idle Management', value: 88 },
          { label: 'Speed', value: 81 },
        ]}
      />,
    );

    const section = screen.getByRole('region', { name: 'Driving Style Breakdown' });
    const chart = within(section).getByRole('img', {
      name: 'Driving style scores across five dimensions',
    });
    expect(chart).toBeInTheDocument();
    expect(within(chart).getAllByText(/^(Safety|Efficiency|Fuel Economy|Idle Management|Speed)$/)).toHaveLength(5);
    expect(within(section).getByText('Illustrative scores across five dimensions')).toBeInTheDocument();

    const equivalent = within(section).getByRole('list', { hidden: true });
    expect(equivalent).toHaveTextContent('Safety: 92');
    expect(equivalent).toHaveTextContent('Efficiency: 86');
    expect(equivalent).toHaveTextContent('Fuel Economy: 78');
    expect(equivalent).toHaveTextContent('Idle Management: 88');
    expect(equivalent).toHaveTextContent('Speed: 81');
  });
});
