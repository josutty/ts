import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@test/test-utils';
import userEvent from '@testing-library/user-event';
import { VehicleModelOption } from './VehicleModelOption';

describe('VehicleModelOption', () => {
  it('calls the selection callback and exposes the selected state', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<VehicleModelOption id="pro-3015" name="Pro 3015" selected onSelect={onSelect} />);

    const option = screen.getByRole('button', { name: /Pro 3015/ });
    expect(option).toHaveTextContent('✓ Selected');
    expect(option).toHaveAttribute('aria-pressed', 'true');
    await user.click(option);
    expect(onSelect).toHaveBeenCalledWith('pro-3015');
  });

  it('renders an unselected model with the Select label', () => {
    render(<VehicleModelOption id="pro-6048" name="Pro 6048" selected={false} onSelect={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Pro 6048/ })).toHaveTextContent('Select →');
  });
});
