import type { Meta, StoryObj } from '@storybook/react';

import { TripProgress } from './TripProgress';

const meta = {
  component: TripProgress,
  args: {
    currentStep: 3,
  },
} satisfies Meta<typeof TripProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LiveTelemetry: Story = {};

export const DriverScore: Story = {
  args: {
    currentStep: 4,
  },
};
