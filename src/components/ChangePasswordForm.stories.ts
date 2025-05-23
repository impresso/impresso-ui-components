import type { Meta, StoryObj } from '@storybook/vue3'
import ChangePasswordForm from './ChangePasswordForm.vue'
import type { ChangePasswordFormProps } from './ChangePasswordForm.vue'

const meta = {
  title: 'forms/ChangePasswordForm',
  component: ChangePasswordForm,
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
    components: { ChangePasswordForm },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <ChangePasswordForm v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof ChangePasswordForm>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    isLoading: false,
  } as ChangePasswordFormProps,
}
