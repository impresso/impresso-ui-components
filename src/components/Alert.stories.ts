import type { Meta, StoryObj } from "@storybook/vue3";
import Alert from "./Alert.vue";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "warning", "error", "success"],
    },
    default: {
      control: "text",
      description: "Slot content",
    },
  },
  args: {
    type: "info",
    default: "This is an alert message.",
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert :type="args.type">{{ args.default }}</Alert>',
  }),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "info",
    default: "This is an informational alert.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    default: "This is a warning alert.",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    default: "This is an error alert.",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    default: "This is a success alert.",
  },
};
