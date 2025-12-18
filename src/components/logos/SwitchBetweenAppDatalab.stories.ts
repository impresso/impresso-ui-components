import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SwitchBetweenAppDatalab from './SwitchBetweenAppDatalab.vue'
import type { SwitchBetweenAppDatalabProps } from './SwitchBetweenAppDatalab.vue'

const meta = {
  title: 'logos/SwitchBetweenAppDatalab',
  component: SwitchBetweenAppDatalab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component to switch between Impresso App and Datalab.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args: SwitchBetweenAppDatalabProps) => ({
    components: { SwitchBetweenAppDatalab },
    setup() {
      return { args }
    },
    template: `
      <div 
    class="very-small-caps-bold" style="width: 500px; height: 600px; position:relative; overflow:hidden">
        <SwitchBetweenAppDatalab v-bind="args" class="text-decoration-none"/>
      </div>
    `,
  }),
} satisfies Meta<typeof SwitchBetweenAppDatalab>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    width: 90,
    color: 'green',
    isDatalab: true,
  } as SwitchBetweenAppDatalabProps,
}

export const AppVersion: Story = {
  args: {
    width: 90,
    color: 'blue',
    isApp: true,
  } as SwitchBetweenAppDatalabProps,
}

export const AppVersionUsingSlot: Story = {
  args: {
    width: 90,
    color: 'blue',
    isApp: true,
  } as SwitchBetweenAppDatalabProps,
  render: (args: SwitchBetweenAppDatalabProps) => ({
    components: { SwitchBetweenAppDatalab },
    setup() {
      return { args }
    },
    template: `
      <div 
    class="very-small-caps-bold" style="width: 500px; height: 600px; position:relative; overflow:hidden">
        <SwitchBetweenAppDatalab v-bind="args" class="text-decoration-none">
          Custom label to switch to Impresso DataLab
        </SwitchBetweenAppDatalab>
      </div>
    `,
  }),
}
