import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
const meta = { component: Button, title: 'Shared UI/Button', args: { children: 'Continue' } } satisfies Meta<
  typeof Button
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
