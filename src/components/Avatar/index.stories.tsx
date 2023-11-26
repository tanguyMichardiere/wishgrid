import type { Meta, StoryObj } from "@storybook/react";
import Avatar from ".";

export default {
  component: Avatar,
} satisfies Meta;

type Story = StoryObj<typeof Avatar>;

export const SmallDefault: Story = {
  render: () => <Avatar size="small" user={{ id: "", name: "", image: null }} />,
};

export const LargeDefault: Story = {
  render: () => <Avatar size="large" user={{ id: "", name: "", image: null }} />,
};
