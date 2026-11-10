import type { Meta, StoryObj } from '@storybook/react';

import { VehicleStats } from './VehicleStats';

const meta = {
  title: 'Widgets/Fleet Overview/VehicleStats',
  component: VehicleStats,
  args: {
    label: 'Vehicles connected',
    value: 'Demo',
    caption: 'Illustrative fleet overview',
  },
} satisfies Meta<typeof VehicleStats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
