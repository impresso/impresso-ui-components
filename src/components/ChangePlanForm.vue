<template>
  <form
    class="ChangePlanForm"
    :class="{ 'd-flex flex-wrap align-items-center': props.inline }"
    @submit="submitForm"
  >
    <div v-for="plan in props.availablePlans" :key="plan.name">
      <OverlayTrigger :disabled="!inline" :placement="'bottom'">
        <template #tooltip>
          <p class="m-0 small" v-html="plan.description" />
        </template>
        <div class="d-flex align-items-center gap-2 m-1 p-1">
          <label
            :class="[
              'border rounded-md shadow-sm d-block py-2 pr-3 pl-2 d-flex m-0',
              { active: selectedPlan === plan.name },
              { current: props.currentPlan === plan.name },
              { pending: pendingPlan === plan.name },
            ]"
          >
            <input
              type="radio"
              :name="'plan'"
              :id="`ChangePlanForm.${plan.name}`"
              :checked="pendingPlan === plan.name || selectedPlan === plan.name"
              @change="selectedPlan = plan.name"
              :disabled="!!pendingPlan || plan.name === rejectedPlan"
            />
            <div class="ml-2">
              {{ plan.label }}
              <div v-if="props.currentPlan === plan.name">
                <span class="badge bg-primary text-white small-caps"
                  >Your plan</span
                >
              </div>
              <div v-if="pendingPlan === plan.name">
                <span class="badge bg-info text-dark small-caps"
                  >Pending change</span
                >
              </div>
              <div v-if="rejectedPlan === plan.name">
                <span class="badge bg-warning text-dark small-caps"
                  >rejected change</span
                >
              </div>
            </div>
          </label>
          <p class="m-0 small" v-html="plan.description" v-if="!inline" />
        </div>
      </OverlayTrigger>
    </div>
    <!-- optionally toggle the affiliation field -->
    <div
      class="container-fluid mt-3 border-top pt-3"
      v-if="requireAffiliation || requireInstitutionalUrl"
    >
      <p>Please review and update your information below:</p>
      <BFormGroup
        id="input-group-1"
        label="Institution Email *"
        label-for="email"
        :description="(v$.email?.$errors[0]?.$message as string)"
      >
        <BFormInput
          id="email"
          name="email"
          type="email"
          required
          autocomplete="email"
          :class="{
            'border-danger': v$.email?.$error,
            'border-success': !v$.email?.$error && v$.email?.$dirty,
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
      <div class="row">
        <div class="col-md-6">
          <BFormGroup
            label="Affiliation"
            label-for="affiliation"
            :description="(v$.affiliation?.$errors[0]?.$message as string)"
          >
            <bFormInput
              id="affiliation"
              name="affiliation"
              :required="requireAffiliation"
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
        <div class="col-md-6" v-if="requireInstitutionalUrl">
          <BFormGroup
            label="Institutional URL"
            label-for="institutional-url"
            :description="(v$.institutionalUrl?.$errors[0]?.$message as string)"
          >
            <bFormInput
              id="institutional-url"
              name="institutional-url"
              type="url"
              :required="requireInstitutionalUrl"
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
    </div>
    <div class="position-sticky bottom-0 bg-white border-top mt-2 py-3 w-100">
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
      <slot
        name="submit-button"
        :submit="submitForm"
        :disabled="!!pendingPlan || props.currentPlan === selectedPlan"
      >
        <button
          type="button"
          @click="submitForm"
          :disabled="!!pendingPlan || props.currentPlan === selectedPlan"
          class="btn btn-outline-secondary btn-md px-4 border border-dark btn-block"
        >
          <Icon name="sendMail" />
          <span class="ml-2">Confirm Plan Change Request</span>
        </button>
      </slot>
    </div>
  </form>
</template>
<script setup lang="ts">
import Icon from './Icon.vue'
import Alert from './Alert.vue'
import { computed, reactive, ref, watch } from 'vue'
import OverlayTrigger from './OverlayTrigger.vue'
import useVuelidate from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import BFormGroup from './legacy/BFormGroup.vue'
import BFormInput from './legacy/BFormInput.vue'
/**
 * Type definitions for the form payload
 */
export type ChangePlanFormPayload = {
  plan: string
  email?: string
  affiliation?: string
  institutionalUrl?: string
}

export interface ChangePlanFormProps {
  inline?: boolean
  currentPlan?: string
  pendingPlan?: string
  rejectedPlan?: string
  availablePlans?: AvailablePlan[]
  currentEmail?: string
  currentAffiliation?: string
  currentInstitutionalUrl?: string
}

export type AvailablePlan = {
  name: string
  label: string
  description: string
  requireAffiliation?: boolean
  requireInstitutionalUrl?: boolean
}

/**
 * Props definition for ChangePlanForm component
 */
const props = withDefaults(defineProps<ChangePlanFormProps>(), {
  // Whether the form is displayed inline or not
  inline: false,
  currentAffiliation: '',
  currentInstitutionalUrl: '',
  currentEmail: '',
  availablePlans: () => [],
})

const emit = defineEmits<{
  submit: [payload: ChangePlanFormPayload]
  change: [payload: ChangePlanFormPayload]
}>()

const selectedPlan = ref<string | undefined>(props.currentPlan)
const formData = reactive<{
  affiliation: string
  institutionalUrl: string
  email: string
}>({
  affiliation: props.currentAffiliation,
  institutionalUrl: props.currentInstitutionalUrl,
  email: props.currentEmail,
})
const requireAffiliation = computed(() => {
  return !!props.availablePlans.find((d) => d.name === selectedPlan.value)
    ?.requireAffiliation
})
const requireInstitutionalUrl = computed(() => {
  return !!props.availablePlans.find((d) => d.name === selectedPlan.value)
    ?.requireInstitutionalUrl
})
const formRules = computed(
  (): {
    email?: string
    affiliation?: string
    institutionalUrl?: string
  } => {
    let affiliationRules: {
      email?: any
      affiliation?: any
      institutionalUrl?: any
    } = {}
    if (requireAffiliation.value || requireInstitutionalUrl.value) {
      affiliationRules.email = {
        required,
        minLength: minLength(4),
        email,
        $autoDirty: true,
      }
    }
    if (requireAffiliation.value) {
      affiliationRules.affiliation = {
        $autoDirty: true,
        required,
        minLength: minLength(2),
      }
    }
    if (requireInstitutionalUrl.value) {
      affiliationRules.institutionalUrl = {
        $autoDirty: true,
        required,
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
    return affiliationRules
  }
)
// Initialize validation
const v$ = useVuelidate(formRules, formData)
/**
 * Watches for changes in the plan prop and updates selectedPlan
 */
watch(
  () => props.currentPlan,
  (newPlan) => {
    selectedPlan.value = newPlan
  }
)

function getPayloadForPlan(planName: string): ChangePlanFormPayload {
  const payload: ChangePlanFormPayload = {
    plan: planName,
  }
  if (requireAffiliation.value || requireInstitutionalUrl.value) {
    payload.email = formData.email
  }
  if (requireAffiliation.value) {
    payload.affiliation = formData.affiliation
  }
  if (requireInstitutionalUrl.value) {
    payload.institutionalUrl = formData.institutionalUrl
  }
  return payload
}
// if selectedPlan change,  emits('change', { plan: newPlan })
watch(
  () => selectedPlan.value,
  (newPlan) => {
    if (!newPlan) {
      return
    }
    emit('change', getPayloadForPlan(newPlan))
  }
)

/**
 * Handles form submission
 */
const submitForm = async (event: Event) => {
  event.preventDefault()
  // check that there is no error in the form

  if (requireAffiliation.value || requireInstitutionalUrl.value) {
    const isFormValid = await v$.value.$validate()
    console.debug('[ChangePlanForm] @submitForm:', isFormValid)
    if (!isFormValid) {
      console.warn('Form validation failed:', v$.value.$errors)
      return
    }
  }
  if (!selectedPlan.value) {
    console.warn('No plan selected')
    return
  }
  emit('submit', getPayloadForPlan(selectedPlan.value))
}
</script>

<style>
.ChangePlanForm label {
  cursor: pointer;
  white-space: nowrap;
}
.ChangePlanForm .active {
  border-color: var(--impresso-color-black) !important;
  /* add semi transparent shadow, solid */
  box-shadow: 0 0 0 4px var(--impresso-color-black-alpha-20) !important;
}
.ChangePlanForm .current {
  border-color: var(--impresso-color-black) !important;
}
.ChangePlanForm .pending {
  border-color: var(--info-darker) !important;
  /* add semi transparent shadow, solid */
  box-shadow: 0 0 0 4px rgba(var(--info-rgb), 0.7) !important;
}
</style>
