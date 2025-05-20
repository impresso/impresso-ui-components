import type { Meta, StoryObj } from '@storybook/vue3'
import BFormInput from './BFormInput.vue'
import type { BFormInputProps } from './BFormInput.vue'

const meta = {
  title: 'legacy/BFormInput',
  component: BFormInput,
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
    components: { BFormInput },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <BFormInput v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof BFormInput>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    autofocus: false,
  } as BFormInputProps,
}

export const WithAutofocus: Story = {
  args: {
    autofocus: true,
  } as BFormInputProps,
}
