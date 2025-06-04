import type { Meta, StoryObj } from '@storybook/vue3'
import AudioTranscriptPlayer from './AudioTranscriptPlayer.vue'
import type { AudioTranscriptPlayerProps } from './AudioTranscriptPlayer.vue'

const meta = {
  title: 'audioPlayer/AudioTranscriptPlayer',
  component: AudioTranscriptPlayer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that displays an audio player with a synchronized transcript. It allows users to play audio and see the corresponding text highlighted as it plays.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { AudioTranscriptPlayer },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 300px;">
        <AudioTranscriptPlayer v-bind="args">
        </AudioTranscriptPlayer>
      </div>
    `,
  }),
} satisfies Meta<typeof AudioTranscriptPlayer>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    src: 'https://gilberttrausch.uni.lu/audio/ch1-1fkl02trauschfetenationale.mp3',
    transcript: [
      {
        startTime: 0,
        endTime: 5,
        text: 'Hello,',
      },
      {
        startTime: 5,
        endTime: 15,
        text: ' this is a sample transcript.',
      },
      {
        startTime: 15,
        endTime: 20,
        text: ' It is used for demonstration purposes.',
      },
      {
        startTime: 20,
        endTime: 25,
        text: ' Enjoy exploring the features!',
      },
    ],
  } as AudioTranscriptPlayerProps,
}
