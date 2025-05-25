import type { Meta, StoryObj } from '@storybook/vue3'
import OverlayTrigger from './OverlayTrigger.vue'
import type { OverlayTriggerProps } from './OverlayTrigger.vue'

const meta = {
  title: 'components/OverlayTrigger',
  component: OverlayTrigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that triggers an overlay when hovered or clicked.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args: any) => ({
    components: { OverlayTrigger },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <OverlayTrigger  v-bind="args">
          <button>Trigger tooltip</button>
          <template #tooltip>
            <strong>Bold text</strong> with <em>emphasis</em>
          </template>
        </OverlayTrigger>
      </div>
    `,
  }),
} satisfies Meta<typeof OverlayTrigger>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    trigger: 'hover',
    placement: 'top',
    delay: 100,
    show: false,
  } as OverlayTriggerProps,
}

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    placement: 'bottom',
    delay: 100,
    show: false,
  } as OverlayTriggerProps,
}
