import type { Meta, StoryObj } from '@storybook/vue3'
import SignUpForm from './SignUpForm.vue'
import type { SignUpFormProps } from './SignUpForm.vue'

const meta = {
  title: 'forms/SignUpForm',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form to sign up a user.',
      },
    },
  },
  tags: ['autodocs'],
  render: (args: any) => ({
    components: { SignUpForm },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <SignUpForm v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {} as SignUpFormProps,
}

export const WithInitialValues: Story = {
  args: {
    initialValues: {
      email: 'johndoe@uni.lu',
      firstname: 'John',
      lastname: 'Doe',
      affiliation: 'University of Luxembourg',
      institutionalUrl: 'https://www.uni.lu',
    },
  } as SignUpFormProps,
}
