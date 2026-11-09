import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProfileMenu } from './ProfileMenu';

const meta = {
  title: 'Widgets/AppHeader/ProfileMenu',
  component: ProfileMenu,
  args: {
    username: 'admin',
    onNavigate: fn(),
    onSignOut: fn(),
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-64 bg-surface p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
