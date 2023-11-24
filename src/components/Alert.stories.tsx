import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

export default {
  component: Alert,
} satisfies Meta;

type Story = StoryObj<typeof Alert>;

export const Blank: Story = {
  render: () => <Alert text="Blank" />,
};

export const Info: Story = {
  render: () => <Alert text="Info" type="info" />,
};

export const Success: Story = {
  render: () => <Alert text="Success" type="success" />,
};

export const Warning: Story = {
  render: () => <Alert text="Warning" type="warning" />,
};

export const Error: Story = {
  render: () => <Alert text="Error" type="error" />,
};
