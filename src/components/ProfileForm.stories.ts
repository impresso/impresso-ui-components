import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import ProfileForm from './ProfileForm.vue'
import type { ProfileFormProps } from './ProfileForm.vue'

const meta = {
  title: 'forms/ProfileForm',
  component: ProfileForm,
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
    components: { ProfileForm },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; height: 600px;">
        <ProfileForm v-bind="args">
          <div class="text-center mb-3">Additional content can be placed here.</div>
        </ProfileForm>
      </div>
    `,
  }),
} satisfies Meta<typeof ProfileForm>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    onSubmit: action('@submit'),
  } as ProfileFormProps,
}

export const EditMode: Story = {
  args: {
    mode: 'edit',
    initialValues: {
      email: 'johndoe@uni.lu',
      firstname: 'John',
      lastname: 'Doe',
      affiliation: 'University of Luxembourg',
      institutionalUrl: 'https://www.uni.lu',
    },
    onSubmit: action('@submit'),
  } as ProfileFormProps,
}

export const EditModeButDisabled: Story = {
  args: {
    mode: 'edit',
    initialValues: {
      email: 'johndoe@uni.lu',
      firstname: 'John',
      lastname: 'Doe',
      affiliation: 'University of Luxembourg',
      institutionalUrl: 'https://www.uni.lu',
    },
    onSubmit: action('@submit'),
    isLoading: true,
  } as ProfileFormProps,
}

export const WithoutAffiliationFields: Story = {
  args: {
    hideAffiliationFields: true,
  } as ProfileFormProps,
}
