<template>
  <form class="SignUpForm container">
    <BFormGroup
      id="input-group-1"
      label="Email (please use institution email if available) *"
      label-for="email"
      :description="(v$.email!.$errors[0]?.$message as string)"
    >
      <BFormInput
        id="email"
        name="email"
        type="email"
        required
        autocomplete="email"
        :class="{
          'border-danger': v$.email!.$error,
          'border-success': !v$.email!.$error && v$.email!.$dirty,
        }"
        class="rounded-sm shadow-sm"
        v-model.trim="formData.email"
      ></BFormInput>
    </BFormGroup>
    <p class="text-muted very-small pt-0 px-3">
      Note: for Student User or Academic User plans, your institution email
      address is
      <b>required</b>.
    </p>
    <div class="row" v-if="!hideAffiliationFields">
      <div class="col">
        <BFormGroup
          label="Affiliation"
          label-for="affiliation"
          :description="(v$.affiliation?.$errors[0]?.$message as string)"
        >
          <bFormInput
            id="affiliation"
            name="affiliation"
            :required="doesPlanRequireAffiliation"
            v-model.trim="formData.affiliation"
            :class="{
              'border-danger': v$.affiliation?.$error,
              'border-success':
                !v$.affiliation?.$error && v$.affiliation?.$dirty,
            }"
            class="rounded-sm shadow-sm"
            placeholder="University, Company, ..."
          ></bFormInput>
        </BFormGroup>
      </div>
      <div class="col">
        <BFormGroup
          label="Institutional URL"
          label-for="institutional-url"
          :description="(v$.institutionalUrl?.$errors[0]?.$message as string)"
        >
          <bFormInput
            id="institutional-url"
            name="institutional-url"
            type="url"
            :required="doesPlanRequireAffiliation"
            autocomplete="url"
            v-model.trim="formData.institutionalUrl"
            :class="{
              'border-danger': v$.institutionalUrl?.$error,
              'border-success':
                !v$.institutionalUrl?.$error && v$.institutionalUrl?.$dirty,
            }"
            class="rounded-sm shadow-sm"
            placeholder="https://"
          ></bFormInput>
        </BFormGroup>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <BFormGroup
          label="First Name *"
          label-for="firstname"
          :description="(v$.firstname?.$errors[0]?.$message as string)"
        >
          <bFormInput
            id="firstname"
            name="firstname"
            required
            autocomplete="url"
            v-model.trim="formData.firstname"
            :class="{
              'border-danger': v$.firstname?.$error,
              'border-success': !v$.firstname?.$error && v$.firstname?.$dirty,
            }"
            class="rounded-sm shadow-sm"
            placeholder="First Name"
          ></bFormInput>
        </BFormGroup>
      </div>
      <div class="col">
        <BFormGroup
          label="Last Name *"
          label-for="lastname"
          :description="(v$.lastname?.$errors[0]?.$message as string)"
        >
          <bFormInput
            id="lastname"
            name="lastname"
            :required="doesPlanRequireAffiliation"
            autocomplete="url"
            v-model.trim="formData.lastname"
            :class="{
              'border-danger': v$.lastname?.$error,
              'border-success': !v$.lastname?.$error && v$.lastname?.$dirty,
            }"
            class="rounded-sm shadow-sm"
            placeholder="Last Name *"
          ></bFormInput>
        </BFormGroup>
      </div>
    </div>
    <!-- password -->
    <div class="row" v-if="mode === 'create'">
      <div class="col">
        <BFormGroup
          label="Password *"
          label-for="password"
          :description="(v$.password?.$errors[0]?.$message as string)"
        >
          <bFormInput
            id="password"
            name="password"
            required
            type="password"
            autocomplete="password"
            v-model.trim="formData.password"
            :class="{
              'border-danger': v$.password?.$error,
              'border-success': !v$.password?.$error && v$.password?.$dirty,
            }"
            class="rounded-sm shadow-sm"
            placeholder="Password"
          ></bFormInput>
        </BFormGroup>
      </div>
      <div class="col">
        <BFormGroup
          label="Repeat password *"
          label-for="repeatPassword"
          :description="(v$.repeatPassword?.$errors[0]?.$message as string)"
        >
          <bFormInput
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            :required="doesPlanRequireAffiliation"
            autocomplete="new-password"
            v-model.trim="formData.repeatPassword"
            :class="{
              'border-danger': v$.repeatPassword?.$error,
              'border-success':
                !v$.repeatPassword?.$error && v$.repeatPassword?.$dirty,
            }"
            class="rounded-sm shadow-sm"
            placeholder="Repeat Password"
          ></bFormInput>
        </BFormGroup>
      </div>
    </div>
    <ColorPatternPicker
      class="my-3"
      v-model:colors="colors"
      :num-colors="initialColors.length || 7"
      :initial-colors="initialColors"
    ></ColorPatternPicker>

    <slot></slot>
    <AcceptTermsOfUse
      class="mb-3"
      v-if="mode === 'create'"
      :disabled="isLoading"
      @change="(event: Event) => {
        emit('changeAcceptTerms', (event.target as HTMLInputElement).checked)
      }"
    >
      <slot name="accept-terms-of-use-label"> </slot>
    </AcceptTermsOfUse>
    <!-- error ma,nagemend and form submission -->
    <div class="position-sticky bottom-0 bg-white border-top py-3">
      <slot name="form-errors">
        <Alert type="warning" class="mb-3" role="alert" v-if="v$.$error">
          <div>
            Please correct the errors in the form before submitting:
            <ul class="m-0">
              <li v-for="error in v$.$errors" :key="error.$uid">
                <b>{{ error.$property }}</b
                >:
                {{ error.$message }}
              </li>
            </ul>
          </div>
        </Alert>
      </slot>
      <slot name="submit-button" v-bind:submit="submitForm">
        <button
          class="btn btn-outline-secondary btn-md px-4 border border-dark btn-block"
          type="button"
          @click="submitForm"
          :disabled="isLoading"
          aria-label="Register"
        >
          <Icon name="key" :strokeWidth="1.5" />
          <span class="ml-2" v-if="isLoading">Saving...</span>
          <span class="ml-2" v-else-if="mode === 'edit'">Save changes</span>
          <span class="ml-2" v-else>Create Account</span>
        </button>
      </slot>
    </div>
  </form>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import Icon from './Icon.vue'
import Alert from './Alert.vue'
import AcceptTermsOfUse from './AcceptTermsOfUse.vue'
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'
import BFormGroup from './legacy/BFormGroup.vue'
import BFormInput from './legacy/BFormInput.vue'
import { reactive, computed, watch, ref } from 'vue'
import ColorPatternPicker from './ColorPatternPicker.vue'

export interface ProfileFormPayload {
  firstname: string
  lastname: string
  email: string
  password?: string
  repeatPassword?: string
  institutionalUrl: string
  affiliation: string
  pattern?: string
}

export interface ProfileFormProps {
  initialValues?: ProfileFormPayload
  hideAffiliationFields?: boolean
  doesPlanRequireAffiliation?: boolean
  isLoading?: boolean
  mode?: 'create' | 'edit'
}

const props = withDefaults(defineProps<ProfileFormProps>(), {
  initialValues: () => ({
    firstname: '',
    lastname: '',
    institutionalUrl: '',
    affiliation: '',
    email: '',
    password: '',
    repeatPassword: '',
    pattern: '',
  }),
  mode: 'create',
})
const initialColors = props.initialValues.pattern?.length
  ? props.initialValues.pattern.split(',')
  : []
const colors = ref<string[]>([])
// const showNewPassword = ref(false)
// const showRepeatPassword = ref(false)
// Form data
const formData = reactive<ProfileFormPayload>(props.initialValues)
const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_])(?!.*\s).{8,}$/
// Vuelidate rules
const formRules = computed(
  (): {
    firstname: any
    lastname: any
    email: any
    password?: any
    repeatPassword?: any
    affiliation?: any
    institutionalUrl?: any
  } => {
    let affiliationRules: { affiliation?: any; institutionalUrl?: any } = {}
    if (!props.hideAffiliationFields) {
      affiliationRules.affiliation = props.doesPlanRequireAffiliation
        ? {
            $autoDirty: true,
            required,
            minLength: minLength(2),
          }
        : {}
      affiliationRules.institutionalUrl = {
        $autoDirty: true,
        required: false,
        urlRegex: helpers.withMessage(
          'Please enter a valid URL',
          (value: string) => {
            if (!value || value.length === 0) {
              return true
            }
            const urlPattern =
              /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
            return urlPattern.test(value)
          }
        ),
      }
    }

    const passwordRules =
      props.mode === 'edit'
        ? {}
        : {
            password: {
              minLength: minLength(8),
              urlRegex: helpers.withMessage(
                'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                (value: string) => PasswordRegex.exec(value) != null
              ),
              required,
              $autoDirty: true,
            }, // min: 8, regex: passwordRegex
            repeatPassword: {
              required,
              sameAsPassword: helpers.withMessage(
                'Passwords do not match.',
                sameAs(computed(() => formData.password))
              ),
              $autoDirty: true,
            }, // required|confirmed:repeatPassword
          }
    return {
      firstname: { required, minLength: minLength(2), $autoDirty: true }, // required|min:2
      lastname: { required, minLength: minLength(2), $autoDirty: true }, // required|min:2
      email: { required, minLength: minLength(4), email, $autoDirty: true }, // required|email

      ...passwordRules,
      ...affiliationRules,
    }
  }
)

// Define emits with type safety
const emit = defineEmits<{
  submit: [payload: ProfileFormPayload]
  changeAcceptTerms: [value: boolean]
}>()

// Form submission handler
const submitForm = async () => {
  // Trigger validation
  const isFormValid = await v$.value.$validate()
  console.info(
    '[SignUpForm] Form validation result:',
    isFormValid,
    colors.value.join(',')
  )
  if (isFormValid) {
    // Form is valid, emit event with password data
    emit('submit', {
      ...formData,
      pattern: colors.value.join(','),
    })
  } else {
    // log the errors
    console.error('[SignUpForm] Form validation errors:', v$.value.$errors)
  }
}

// Initialize validation
const v$ = useVuelidate(formRules, formData)
watch(
  () => props.initialValues,
  (newInitialValues) => {
    // Reset form data to new initial values
    Object.assign(formData, newInitialValues)

    // Reset validation state
    v$.value.$reset()
  },
  { deep: true, immediate: true }
)
</script>
