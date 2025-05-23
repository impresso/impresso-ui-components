import type { Meta, StoryObj } from '@storybook/vue3'
import BFormGroup from './BFormGroup.vue'
import BFormInput from './BFormInput.vue'
import type { BFormGroupProps } from './BFormGroup.vue'

const meta = {
  title: 'legacy/BFormGroup',
  component: BFormGroup,
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
    components: { BFormGroup, BFormInput },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <BFormGroup v-bind="args">
        <BFormInput
          id="affiliation"
          name="affiliation"
          type="text"
          autocomplete="organization"
          class="rounded-sm shadow-sm"
          placeholder="Enter your affiliation"
        ></BFormInput>
        </BFormGroup>
      </div>
    `,
  }),
} satisfies Meta<typeof BFormGroup>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    id: 'input-group-5',
    label: 'group Label',
    labelFor: 'affiliation',
    description: 'group Label Description',
  } as BFormGroupProps,
}
