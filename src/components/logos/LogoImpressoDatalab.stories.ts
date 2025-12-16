import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LogoImpressoDatalab from './LogoImpressoDatalab.vue'
import type { LogoImpressoDatalabProps } from './LogoImpressoDatalab.vue'

const meta = {
  title: 'logos/LogoImpressoDatalab',
  component: LogoImpressoDatalab,
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
    components: { LogoImpressoDatalab },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <LogoImpressoDatalab v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof LogoImpressoDatalab>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    width: 200,
  } as LogoImpressoDatalabProps,
}
