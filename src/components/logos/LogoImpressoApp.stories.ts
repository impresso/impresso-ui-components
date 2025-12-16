import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LogoImpressoApp from './LogoImpressoApp.vue'
import type { LogoImpressoAppProps } from './LogoImpressoApp.vue'

const meta = {
  title: 'logos/LogoImpressoApp',
  component: LogoImpressoApp,
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
    components: { LogoImpressoApp },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <LogoImpressoApp v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof LogoImpressoApp>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    width: 200,
  } as LogoImpressoAppProps,
}
