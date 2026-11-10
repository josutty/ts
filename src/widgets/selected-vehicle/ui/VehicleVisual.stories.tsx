import type { Meta, StoryObj } from '@storybook/react';
import { VehicleVisual } from './VehicleVisual';

const meta = {
  component: VehicleVisual,
  args: {
    imageUrl: '/vehicles/atlas-x.jpg',
    imageAlt: 'Atlas X',
  },
} satisfies Meta<typeof VehicleVisual>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {};

export const ReplaceableFallback: Story = {
  args: { imageUrl: undefined },
};
