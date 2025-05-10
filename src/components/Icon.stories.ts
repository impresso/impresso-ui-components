import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "./Icon.vue";

const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: ["bsky", "slack", "search"],
    },
    scale: { control: { type: "number", min: 0.1, max: 5, step: 0.1 } },
    strokeWidth: { control: { type: "number", min: 0.1, max: 10, step: 0.1 } },
  },
  args: {
    name: "slack",
    scale: 1,
    strokeWidth: 1,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "slack",
  },
};

export const Bsky: Story = {
  args: {
    name: "bsky",
    strokeWidth: 2,
  },
};

export const Search: Story = {
  args: {
    name: "search",
    scale: 2,
  },
};

export const CustomPath: Story = {
  args: {
    name: "custom",
    paths: [
      {
        d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
      },
    ],
    width: 24,
    height: 24,
    strokeWidth: 1.5,
  },
};
