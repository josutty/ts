import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VehicleVisual } from './VehicleVisual';

describe('VehicleVisual', () => {
  it('renders the vehicle image with its accessible model label', () => {
    render(<VehicleVisual imageUrl="/vehicles/atlas-x.jpg" imageAlt="Atlas X" />);

    expect(screen.getByRole('img', { name: 'Atlas X' })).toBeInTheDocument();
  });

  it('shows the replaceable product-image fallback when no approved image exists', () => {
    render(<VehicleVisual imageUrl={undefined} imageAlt="Atlas X" />);

    expect(screen.getByText('PRODUCT IMAGE · REPLACEABLE')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Atlas X' })).not.toBeInTheDocument();
  });

  it('falls back when the image cannot be loaded', () => {
    render(<VehicleVisual imageUrl="/vehicles/missing.jpg" imageAlt="Atlas X" />);

    const image = screen.getByRole('img', { name: 'Atlas X' });
    image.dispatchEvent(new Event('error'));

    expect(screen.getByText('PRODUCT IMAGE · REPLACEABLE')).toBeInTheDocument();
  });
});
