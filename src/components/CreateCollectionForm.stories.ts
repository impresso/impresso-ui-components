import type { Meta, StoryObj } from '@storybook/vue3'
import CreateCollectionForm from './CreateCollectionForm.vue'
import type { CreateCollectionFormProps } from './CreateCollectionForm.vue'

const meta = {
  title: 'forms/CreateCollectionForm',
  component: CreateCollectionForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form for creating a new collection.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { CreateCollectionForm },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <CreateCollectionForm v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof CreateCollectionForm>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    initialPayload: {
      name: 'name',
      description: 'a description',
    },
    submitLabel: 'Create Collection',
    isLoading: false,
  } as CreateCollectionFormProps,
}
