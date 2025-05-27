import type { Meta, StoryObj } from '@storybook/vue3'
import Sunset from './Sunset.vue'
import type { SunsetProps } from './Sunset.vue'

const meta = {
  title: 'components/Sunset',
  component: Sunset,
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
  argTypes: {
    colors: {
      control: {
        type: 'object',
      },
      description: 'Array of colors for the sunset gradient',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  render: (args: any) => ({
    components: { Sunset },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 100px; height: 100px;">
        <Sunset v-bind="args">
        </Sunset>
      </div>
    `,
  }),
} satisfies Meta<typeof Sunset>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    colors: ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#9B59B6'],
  } as SunsetProps,
}

export const WarmSunset: Story = {
  args: {
    colors: ['#FF4500', '#FF6347', '#FFA500', '#FFD700', '#FF69B4'],
  } as SunsetProps,
}

export const CoolSunset: Story = {
  args: {
    colors: ['#4169E1', '#6495ED', '#87CEEB', '#B0C4DE', '#E6E6FA'],
  } as SunsetProps,
}

export const MinimalSunset: Story = {
  args: {
    colors: ['#FF8C00', '#FF4500'],
  } as SunsetProps,
}
