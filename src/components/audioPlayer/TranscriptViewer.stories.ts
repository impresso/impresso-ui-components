import type { Meta, StoryObj } from '@storybook/vue3'
import TranscriptViewer from './TranscriptViewer.vue'
import type { TranscriptViewerProps } from './TranscriptViewer.vue'
// import mockdata from '../../assets/mock-data/CFCE-1996-09-08-a-i0001.json'

// import { processMockData } from '../../logic/parse/transcript'

// console.log(
//   JSON.stringify(processMockData(mockdata, 'CFCE-1996-09-08-a-r0001'))
// )
const meta = {
  title: 'audioPlayer/TranscriptViewer',
  component: TranscriptViewer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A generic grouping component for form inputs, providing structure and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { TranscriptViewer },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 300px;">
        <TranscriptViewer v-bind="args">
        </TranscriptViewer>
      </div>
    `,
  }),
} satisfies Meta<typeof TranscriptViewer>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    currentTime: 9,
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
  } as TranscriptViewerProps,
}
