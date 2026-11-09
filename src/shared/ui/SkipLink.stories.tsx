import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';
const meta = { component: SkipLink, title: 'Shared UI/SkipLink' } satisfies Meta<typeof SkipLink>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <>
      <SkipLink {...args} />
      <main id="main-content" className="pt-16">
        Main content
      </main>
    </>
  ),
};
