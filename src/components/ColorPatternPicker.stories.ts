import type { Meta, StoryObj } from '@storybook/vue3'
import ColorPatternPicker from './ColorPatternPicker.vue'
import type { ColorPatternPickerProps } from './ColorPatternPicker.vue'

const meta = {
  title: 'components/ColorPatternPicker',
  component: ColorPatternPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that displays a gradient pattern of colors with the ability to randomly generate new color combinations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    colors: {
      control: {
        type: 'object',
      },
      description: 'Array of color values for the gradient pattern',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    numColors: {
      control: {
        type: 'range',
        min: 1,
        max: 15,
        step: 1,
      },
      description: 'Number of colors to generate in random patterns',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '7' },
      },
    },
    availableColors: {
      control: {
        type: 'object',
      },
      description:
        'Pool of colors to choose from when generating random patterns',
      table: {
        type: { summary: 'string[]' },
      },
    },
  },
  render: (args: any) => ({
    components: { ColorPatternPicker },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 400px;">
        <ColorPatternPicker v-bind="args"  v-model:colors="args.colors"/>
        <label style="display: block; margin-bottom: 8px; font-weight: bold;">
            Number of Colors: {{ args.numColors }}
          </label>
          <input 
            type="range" 
            min="1" 
            max="15" 
            step="1"
            v-model="args.numColors"
            style="width: 100%;"
          />
        <div style="margin-top: 16px; font-family: monospace; font-size: 12px; max-width: 400px; word-wrap: break-word;;">
          <strong>Model Value:</strong> {{ JSON.stringify(args.colors) }}
        </div>
      </div>
    `,
  }),
} satisfies Meta<typeof ColorPatternPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    colors: [],
    numColors: 7,
    availableColors: [
      '#96ceb4',
      '#ffeead',
      '#ffcc5c',
      '#ff6f69',
      '#588c7e',
      '#f2e394',
      '#f2ae72',
      '#d96459',
      '#a9bdc8',
      '#677e96',
      '#4a9bb1',
      '#ccd6e6',
      '#4f615b',
      '#3d95a6',
      '#d3deec',
      '#3c4b54',
      '#3e8696',
      '#dce5f4',
      '#45535f',
      '#4a818a',
      '#b2bdcc',
      '#2e4051',
      '#62797d',
      '#EF476F',
      '#06D6A0',
      '#EE6123',
      '#21295C',
      '#FA003F',
      '#00916E',
    ],
  } as ColorPatternPickerProps,
}

export const CustomColors: Story = {
  args: {
    colors: ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#9B59B6'],
    numColors: 5,
  } as ColorPatternPickerProps,
}

export const FewColors: Story = {
  args: {
    colors: [],
    numColors: 3,
  } as ColorPatternPickerProps,
}

export const ManyColors: Story = {
  args: {
    colors: [],
    numColors: 12,
  } as ColorPatternPickerProps,
}
