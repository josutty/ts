import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { VehicleCategory } from './VehicleCategory';

const meta = {
  component: VehicleCategory,
  args: {
    name: 'Eicher Pro',
    models: [
      { id: 'pro-3015', name: 'Pro 3015' },
      { id: 'pro-6048', name: 'Pro 6048' },
    ],
    expanded: true,
    selectedModelId: null,
    onToggle: fn(),
    onSelect: fn(),
  },
} satisfies Meta<typeof VehicleCategory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Expanded: Story = {};
