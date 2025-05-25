import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import AcceptTermsOfUse from './AcceptTermsOfUse.vue'
import type { AcceptTermsOfUseProps } from './AcceptTermsOfUse.vue'

const meta = {
  title: 'components/AcceptTermsOfUse',
  component: AcceptTermsOfUse,
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
    components: { AcceptTermsOfUse },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <AcceptTermsOfUse v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof AcceptTermsOfUse>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    onChange: action('terms-checkbox-changed'),
  } as AcceptTermsOfUseProps,
}
