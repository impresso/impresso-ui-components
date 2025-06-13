import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import ChangePlanForm from './ChangePlanForm.vue'
import type { AvailablePlan, ChangePlanFormProps } from './ChangePlanForm.vue'

const AvailablePlans: AvailablePlan[] = [
  {
    name: 'plan-basic',
    description: 'Select if not enrolled in an academic institution',
    label: 'Basic User',
  },
  {
    name: 'plan-educational',
    description:
      'Select if you are enrolled as a <b>student</b> in an academic institution',
    label: 'Student User',
    requireAffiliation: true,
  },
  {
    name: 'plan-researcher',
    description:
      'Select if you are <b>research staff</b> in an academic institution',
    label: 'Academic User',
    requireAffiliation: true,
    requireInstitutionalUrl: true,
  },
]

const meta = {
  title: 'forms/ChangePlanForm',
  component: ChangePlanForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form for changing the plan of a user. It allows users to select from available plans and submit their choice.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { ChangePlanForm },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <ChangePlanForm v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof ChangePlanForm>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    onChange: action('change'),
    onSubmit: action('submit'),
  } as ChangePlanFormProps,
}

export const WithCurrentPlan: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    onChange: action('change'),
    onSubmit: action('submit'),
    currentPlan: 'plan-researcher',
  } as ChangePlanFormProps,
}

export const WithPendingPlan: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    onChange: action('change'),
    onSubmit: action('submit'),
    pendingPlan: 'plan-researcher',
  } as ChangePlanFormProps,
}

export const WithRejectedPlan: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    onChange: action('change'),
    onSubmit: action('submit'),
    currentPlan: 'plan-basic',
    rejectedPlan: 'plan-researcher',
  } as ChangePlanFormProps,
}

export const AsInlineForm: Story = {
  args: {
    inline: true,
    isLoading: false,
    availablePlans: AvailablePlans,
    onChange: action('change'),
    onSubmit: action('submit'),
    currentPlan: 'plan-basic',
  } as ChangePlanFormProps,
}
export const WithExistingProfile: Story = {
  args: {
    inline: true,
    isLoading: false,
    availablePlans: AvailablePlans,
    currentInstitutionalUrl: 'https://example.edu',
    currentAffiliation: 'Example University',
    currentEmail: 'student@example.edu',
    onChange: action('change'),
    onSubmit: action('submit'),
    currentPlan: 'plan-basic',
  } as ChangePlanFormProps,
}
