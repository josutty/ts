import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { VehicleModelOption } from './VehicleModelOption';

const meta = {
  component: VehicleModelOption,
  args: { id: 'pro-3015', name: 'Pro 3015', selected: false, onSelect: fn() },
} satisfies Meta<typeof VehicleModelOption>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true } };
