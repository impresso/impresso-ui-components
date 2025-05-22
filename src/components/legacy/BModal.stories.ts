import type { Meta, StoryObj } from '@storybook/vue3'
import BModal from './BModal.vue'
import type { BModalProps } from './BModal.vue'

const meta = {
  title: 'legacy/BModal',
  component: BModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form for changing the password of a user.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { BModal },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <BModal v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof BModal>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    show: true,
    title: 'Modal Title',
    body: 'This is the body of the modal.',
  } as BModalProps,
}
