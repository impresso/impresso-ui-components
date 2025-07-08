import type { Meta, StoryObj } from '@storybook/vue3'
import BFormTextarea from './BFormTextarea.vue'
import type { BFormTextareaProps } from './BFormTextarea.vue'

const meta = {
  title: 'legacy/BFormTextarea',
  component: BFormTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form textarea for entering multi-line text input.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { BFormTextarea },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <BFormTextarea v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof BFormTextarea>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    autofocus: false,
  } as BFormTextareaProps,
}

export const WithAutofocus: Story = {
  args: {
    autofocus: true,
  } as BFormTextareaProps,
}
