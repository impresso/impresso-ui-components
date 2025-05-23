import type { Meta, StoryObj } from '@storybook/vue3'
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
  },
  {
    name: 'plan-researcher',
    description:
      'Select if you are <b>research staff</b> in an academic institution',
    label: 'Academic User',
  },
]

const meta = {
  title: 'forms/ChangePlanForm',
  component: ChangePlanForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form for changing the password of a user.',
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
  } as ChangePlanFormProps,
}

export const WithCurrentPlan: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    currentPlan: 'plan-researcher',
  } as ChangePlanFormProps,
}

export const WithPendingPlan: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    pendingPlan: 'plan-researcher',
  } as ChangePlanFormProps,
}

export const WithRejectedPlan: Story = {
  args: {
    isLoading: false,
    availablePlans: AvailablePlans,
    currentPlan: 'plan-basic',
    rejectedPlan: 'plan-researcher',
  } as ChangePlanFormProps,
}
