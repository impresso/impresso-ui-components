import type { Meta, StoryObj } from '@storybook/vue3'
import AudioTranscriptPlayer from './AudioTranscriptPlayer.vue'
import type { AudioTranscriptPlayerProps } from './AudioTranscriptPlayer.vue'
// import mockdata from '../../assets/mockData.json'
// import type { TranscriptWord } from './TranscriptViewer.vue'
// import {
//   processUtteranceBreaks,
//   type MockData,
// } from '../../logic/parse/transcript'
// export interface TranscriptWord {
//   text: string
//   startTime: number
//   endTime: number
// }

// interface Token {
//   tc: [number, number] // [startTime, duration]
//   s: number // start index in content
//   l: number // length of token
// }

// interface TranscriptBlock {
//   id: string
//   n: number
//   t: Token[]
// }

// interface MockData {
//   content: string
//   rrreb_plain: TranscriptBlock[]
// }

// export const processTranscript = (
//   mockdata: MockData
// ): { id: string; n: number; t: TranscriptWord[] }[] => {
//   return mockdata.rrreb_plain.map((block) => {
//     const grouped: TranscriptWord[] = []
//     let buffer: TranscriptWord[] = []
//     let tokenCount = 0

//     const tokens: TranscriptWord[] = block.t.map((token) => {
//       const start = token.s
//       const length = token.l
//       const text = mockdata.content.slice(start, start + length)
//       const startTime = token.tc[0]
//       const duration = token.tc[1]
//       const endTime = startTime + duration
//       return { text, startTime, endTime }
//     })

//     tokens.forEach((token, index) => {
//       buffer.push(token)
//       tokenCount++

//       const endsWithPunctuation = /[.,]$/.test(token.text)
//       const isMaxGroupSize = tokenCount >= 10
//       const isLastToken = index === tokens.length - 1

//       const shouldGroupNow =
//         (endsWithPunctuation || isMaxGroupSize || isLastToken) &&
//         (tokenCount >= 4 || isLastToken)

//       if (shouldGroupNow) {
//         const mergedText = buffer.map((t) => t.text).join(' ')
//         const startTime = buffer[0].startTime
//         const endTime = buffer[buffer.length - 1].endTime

//         grouped.push({ text: mergedText, startTime, endTime })

//         buffer = []
//         tokenCount = 0
//       }
//     })

//     return {
//       ...block,
//       t: grouped,
//     }
//   })
// // }
// console.log(
//   'enrichedTranscript',
//   JSON.stringify(
//     processUtteranceBreaks(mockdata as unknown as MockData),
//     null,
//     2
//   )
// )

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
    src: 'https://gilberttrausch.uni.lu/audio/ch1-1fkl02trauschfetenationale.mp3',
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
