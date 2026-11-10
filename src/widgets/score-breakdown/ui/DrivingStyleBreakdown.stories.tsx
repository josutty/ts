import type { Meta, StoryObj } from '@storybook/react';
import { DrivingStyleBreakdown } from './DrivingStyleBreakdown';

const meta = { component: DrivingStyleBreakdown } satisfies Meta<typeof DrivingStyleBreakdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metrics: [
      { label: 'Safety', value: 92 },
      { label: 'Efficiency', value: 86 },
      { label: 'Fuel Economy', value: 78 },
      { label: 'Idle Management', value: 88 },
      { label: 'Speed', value: 81 },
    ],
  },
};
