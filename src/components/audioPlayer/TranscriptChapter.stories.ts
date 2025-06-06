import type { Meta, StoryObj } from '@storybook/vue3'
import TranscriptChapter from './TranscriptChapter.vue'
import type { TranscriptChapterProps } from './TranscriptChapter.vue'

const meta = {
  title: 'audioPlayer/TranscriptChapter',
  component: TranscriptChapter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that displays a chapter segment of a transcript, allowing users to see the start and end times along with the text content. It is useful for highlighting specific sections of an audio transcript.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { TranscriptChapter },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 600px; height: 300px;">
        <TranscriptChapter v-bind="args">
        </TranscriptChapter>
      </div>
    `,
  }),
} satisfies Meta<typeof TranscriptChapter>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    currentTime: 9,
    segment: {
      startTime: 0,
      endTime: 25,
      text: 'This is a sample chapter segment that spans multiple lines. It is used for demonstration purposes and showcases how the component handles longer text.',
    },
  } as TranscriptChapterProps,
}
