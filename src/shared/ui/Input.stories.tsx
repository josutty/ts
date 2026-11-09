import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
const meta = { component: Input, title: 'Shared UI/Input', args: { label: 'Driver name' } } satisfies Meta<
  typeof Input
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: 'Enter a driver name.' } };
