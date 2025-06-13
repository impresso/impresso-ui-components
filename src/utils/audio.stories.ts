import type { Meta, StoryObj } from '@storybook/vue3'

import { formatTime, processPartialAudioContentItem } from './audio'
import type { PartialAudioContentItem } from './audio'

const mockData: PartialAudioContentItem = {
  transcript:
    'Hello world. This is a test of the rrreb generator! Another sentence here.',
  ub_plain: [12, 63], // arbitrary utterance boundaries
  rrreb_plain: [
    {
      id: 'test',
      t: [
        { s: 0, l: 5, tc: [0, 0.5] }, // Hello
        { s: 6, l: 5, tc: [0.5, 0.5] }, // world
        { s: 11, l: 1, tc: [1, 0.2] }, // .
        { s: 13, l: 4, tc: [1.2, 0.4] }, // This
        { s: 18, l: 2, tc: [1.6, 0.2] }, // is
        { s: 21, l: 1, tc: [1.8, 0.1] }, // a
        { s: 23, l: 4, tc: [1.9, 0.4] }, // test
        { s: 28, l: 2, tc: [2.3, 0.3] }, // of
        { s: 31, l: 3, tc: [2.6, 0.4] }, // the
        { s: 35, l: 5, tc: [3.0, 0.4] }, // rrreb
        { s: 41, l: 9, tc: [3.4, 0.6] }, // generator
        { s: 50, l: 1, tc: [4.0, 0.1] }, // !
        { s: 52, l: 7, tc: [4.1, 0.4] }, // Another
        { s: 60, l: 8, tc: [4.5, 0.5] }, // sentence
        { s: 69, l: 4, tc: [5.0, 0.4] }, // here
        { s: 73, l: 1, tc: [5.4, 0.1] }, // .
      ],
    },
  ],
}

const longMockdata = {
  transcript:
    "C'est en Rafnnx, c'est en Europe avec Air Rafnnx. C'est en Rafnnx, c'est en Europe, c'est une nouvelle émission, Le ZOZOZO. On ne sait pas encore exactement quand les Européens utiliseront une monnaie unique.",
  ub_plain: [50], // arbitrary utterance boundaries
  rrreb_plain: [
    {
      id: 'test',
      t: [
        { tc: [0.0, 0.333], s: 0, l: 5 },
        { tc: [0.333, 0.333], s: 6, l: 2 },
        { tc: [0.666, 0.333], s: 9, l: 7 },
        { tc: [1.0, 0.333], s: 17, l: 5 },
        { tc: [1.333, 0.333], s: 23, l: 2 },
        { tc: [1.666, 0.333], s: 26, l: 6 },
        { tc: [2.0, 0.333], s: 33, l: 4 },
        { tc: [2.333, 0.333], s: 38, l: 3 },
        { tc: [2.666, 0.334], s: 42, l: 7 },
        { tc: [30.0, 1.916], s: 50, l: 5 },
        { tc: [31.916, 1.916], s: 56, l: 2 },
        { tc: [33.833, 1.916], s: 59, l: 7 },
        { tc: [35.75, 1.916], s: 67, l: 5 },
        { tc: [37.666, 1.916], s: 73, l: 2 },
        { tc: [39.583, 1.916], s: 76, l: 7 },
        { tc: [41.5, 1.916], s: 84, l: 5 },
        { tc: [43.416, 1.916], s: 90, l: 3 },
        { tc: [45.333, 1.916], s: 94, l: 8 },
        { tc: [47.25, 1.916], s: 103, l: 9 },
        { tc: [49.166, 1.916], s: 113, l: 2 },
        { tc: [51.083, 1.917], s: 116, l: 7 },
        { tc: [53.0, 0.307], s: 124, l: 2 },
        { tc: [53.307, 0.307], s: 127, l: 2 },
        { tc: [53.615, 0.307], s: 130, l: 4 },
        { tc: [53.923, 0.307], s: 135, l: 3 },
        { tc: [54.23, 0.307], s: 139, l: 6 },
        { tc: [54.538, 0.307], s: 146, l: 10 },
        { tc: [54.846, 0.307], s: 157, l: 5 },
        { tc: [55.153, 0.307], s: 163, l: 3 },
        { tc: [55.461, 0.307], s: 167, l: 9 },
        { tc: [55.769, 0.307], s: 177, l: 11 },
        { tc: [56.076, 0.307], s: 189, l: 3 },
        { tc: [56.384, 0.307], s: 193, l: 7 },
        { tc: [56.692, 0.308], s: 201, l: 7 },
      ],
    },
  ],
}

const meta: Meta = {
  title: 'utils/audio',
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    setup() {
      // Process the mock data to generate utterances and rrrebs
      const { utterances, rrrebs } = processPartialAudioContentItem(
        args as PartialAudioContentItem,
        'test'
      )
      const duration = formatTime(rrrebs[rrrebs.length - 1].endTime)
      return { utterances, rrrebs, args, duration }
    },
    template: `
      duration: {{ duration }}<br>
      <div style="width: 500px; height: 300px;font-size:.9em; display: flex; flex-direction: row; gap: 1em;">
  
      <div>
          <h3>Utterances</h3>
          <pre>{{ JSON.stringify(utterances, null, 2) }}</pre>
        </div>
        <div>
          <h3>Rrrebs</h3>
          <pre>{{ JSON.stringify(rrrebs, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...mockData,
  } as PartialAudioContentItem,
}

export const EmptyUtterances: Story = {
  args: {
    ...mockData,
    ub_plain: [], // No utterance boundaries
  } as PartialAudioContentItem,
}

export const LongTranscript: Story = {
  args: {
    ...longMockdata,
  } as PartialAudioContentItem,
}
