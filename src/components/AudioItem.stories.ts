import type { Meta, StoryObj } from '@storybook/vue3'
import AudioItem from './AudioItem.vue'
import type { AudioItemProps } from './AudioItem.vue'
// import { action } from '@storybook/addon-actions'

import item from '../assets/CFCE-1996-09-08-a-i0001-mock.json'

const meta = {
  title: 'Components/AudioItem',
  component: AudioItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that displays a progress bar for audio playback, showing the current time and total duration. It allows users to visualize the progress of the audio being played.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { AudioItem },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 300px;">
        <AudioItem v-bind="args">
        </AudioItem>
      </div>
    `,
  }),
} satisfies Meta<typeof AudioItem>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    item,
  } as AudioItemProps,
}
