import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@test/test-utils';
import userEvent from '@testing-library/user-event';
import { VehicleCategory } from './VehicleCategory';

const models = [
  { id: 'pro-3015', name: 'Pro 3015' },
  { id: 'pro-6048', name: 'Pro 6048' },
];

describe('VehicleCategory', () => {
  it('renders a collapsed category and expands it with the exact toggle labels', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <VehicleCategory
        name="Eicher Pro"
        models={models}
        expanded={false}
        onToggle={onToggle}
        selectedModelId={null}
        onSelect={vi.fn()}
      />,
    );

    const toggle = screen.getByRole('button', { name: 'View Vehicles ▼' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('renders the expanded state with the Hide Vehicles label and selected model', () => {
    render(
      <VehicleCategory
        name="Eicher Pro"
        models={models}
        expanded
        onToggle={vi.fn()}
        selectedModelId="pro-3015"
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Hide Vehicles ▲' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /Pro 3015/ })).toHaveTextContent('✓ Selected');
  });
});
