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
          'A component that displays an audio player with a synchronized transcript. Please make sure that env.VITE_EXAMPLE_AUDIO_SRC is set with the correct audio mp3 url to test it properly. It allows users to play audio and see the corresponding text highlighted as it plays.',
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
      <div style="width: 600px; height: 300px;">
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
    src: import.meta.env.VITE_EXAMPLE_AUDIO_SRC,
    utterances: [
      { startTime: 0, endTime: 5, indices: [0] },
      { startTime: 5, endTime: 15, indices: [1, 2, 3] },
      { startTime: 25, endTime: 35, indices: [4] },
    ],
    rrrebs: [
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
      {
        startTime: 25,
        endTime: 35,
        text: ' This is the last part of the transcript.',
      },
    ],
  } as AudioTranscriptPlayerProps,
}
