import type { Meta, StoryObj } from '@storybook/vue3'
import AudioItem from './AudioItem.vue'
import type { AudioItemProps } from './AudioItem.vue'

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
    item: {
      uid: 'RDN-1950-01-12-a-i0001',
      title: 'Accords économiques internationaux',
      excerpt:
        'La ronde des nations, revue hebdomadaire de la coopération internationale, réalisée et présentée par Fabrice Lamart. Les accords économiques internati',
      type: 'audio',
      radioChannel: 'Chaîne Parisienne (RTF)',
      publicationDate: '1950-01-12T00:00:00Z',
      mediaType: 'audio',
      languageCode: 'fr',
      originalLanguageCode: 'fr',
      dataProvider: 'INA',
      mediaSource: {
        id: 'RDN',
        uid: 'RDN',
        name: 'La ronde des nations',
        type: 'radio_broadcast',
      },
      transcriptLength: 3037,
      duration: 1033,
      startTime: 0,
      copyright: 'in_cpy',
    },
  } as AudioItemProps,
}
