import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import { ScoreCard } from './ScoreCard';

describe('ScoreCard', () => {
  it('shows the score out of 100 and the safe-driver copy', () => {
    renderWithProviders(<ScoreCard score={92} />);

    expect(screen.getByRole('region', { name: 'Driver Score' })).toBeInTheDocument();
    expect(screen.getByText('Safe Driver')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Driver Score' })).toBeInTheDocument();
    expect(screen.getByLabelText('92 out of 100')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument();
    expect(screen.getByText('/100')).toBeInTheDocument();
    expect(screen.getByText('Great Driving!')).toBeInTheDocument();
    expect(screen.getByText('Keep it up!')).toBeInTheDocument();
  });
});
