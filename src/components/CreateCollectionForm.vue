<template>
  <form class="createCollectionForm" @submit="submitForm">
    <BFormGroup
      id="input-group-1"
      :label="$t('name')"
      label-for="name"
      :description="(v$.name?.$errors[0]?.$message as string ?? '')"
    >
      <BFormInput
        id="name"
        name="name"
        type="name"
        required
        ref="nameInput"
        :class="{
          'border-danger': v$.name?.$error,
          'border-success': !v$.name?.$error && v$.name?.$dirty,
        }"
        class="rounded-sm shadow-sm"
        v-model.trim="formData.name"
      ></BFormInput>
    </BFormGroup>
    <p class="text-muted very-small pt-0 px-3" v-html="$t('nameUnique')"></p>
    <BFormGroup
      id="input-group-2"
      :label="$t('description')"
      label-for="description"
      :description="(v$.description?.$errors[0]?.$message as string ?? '')"
    >
      <BFormTextarea
        id="description"
        name="description"
        :class="{
          'border-danger': v$.description?.$error,
          'border-success': !v$.description?.$error && v$.description?.$dirty,
        }"
        class="rounded-sm shadow-sm"
        v-model.trim="formData.description"
        rows="3"
      ></BFormTextarea>
    </BFormGroup>

    <div class="mt-3">
      <p v-html="$t('noteCollectionLimited')" class="mb-0"></p>
      <p class="mb-0" v-html="$t('note')"></p>
    </div>
    <div class="position-sticky py-3 bottom-0 bg-white w-100">
      <slot name="form-errors">
        <Alert type="warning" class="mb-3" role="alert" v-if="v$.$error">
          <div>
            <p>{{ $t('formErrors') }}</p>
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
      <slot name="submit-button" :submit="submitForm" :disabled="isLoading">
        <button
          type="button"
          @click="submitForm"
          :disabled="isLoading"
          class="btn btn-outline-secondary btn-md px-4 border border-dark btn-block"
        >
          <Icon name="sendMail" />
          <span class="ml-2" v-html="submitLabel"></span>
        </button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { type Ref } from 'vue'
import useVuelidate, { type Validation } from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import BFormGroup from './legacy/BFormGroup.vue'
import BFormInput from './legacy/BFormInput.vue'
import Alert from './Alert.vue'
import Icon from './Icon.vue'
import { useTimeout } from '../utils/timers'
import BFormTextarea from './legacy/BFormTextarea.vue'

/**
 * Type definitions for the form payload
 */
export type CreateCollectionFormPayload = {
  name: string
  description?: string
}

const emit = defineEmits<{
  submit: [payload: CreateCollectionFormPayload]
}>()

export interface CreateCollectionFormProps {
  initialPayload?: CreateCollectionFormPayload
  submitLabel?: string
  isLoading?: boolean
  autofocus?: boolean
}
/**
 * Props definition for ChangePlanForm component
 */
const props = withDefaults(defineProps<CreateCollectionFormProps>(), {
  isLoading: false,
  autofocus: false,
  initiaPayload: () => ({
    name: '',
    description: '',
  }),
  submitLabel: 'Create collection',
})

// Template ref for the name input
const nameInput = ref<InstanceType<typeof BFormInput> | null>(null)

const formData = reactive({
  name: props.initialPayload?.name || '',
  description: props.initialPayload?.description || '',
})

const formRules = {
  name: {
    required: helpers.withMessage('Collection name is required', required),
    minLength: helpers.withMessage(
      'Collection name must be at least 5 characters long',
      minLength(5)
    ),
    maxLength: 100,
  },
  description: { maxLength: 500 },
}

// Initialize validation
const v$: Ref<Validation<typeof formRules, typeof formData>> = useVuelidate(
  formRules,
  formData
)

const { set: setDelayedFocus } = useTimeout()

function focusNameInput() {
  try {
    const inputElement = nameInput.value?.$el || nameInput.value
    if (inputElement && typeof inputElement.focus === 'function') {
      inputElement.focus()
    }
  } catch (error) {
    console.debug('[CreateCollectionForm] Could not focus name input:', error)
  }
}

// Watch for autofocus prop changes
watch(
  () => props.autofocus,
  (newVal) => {
    if (newVal) {
      setDelayedFocus(focusNameInput, 300)
    }
  }
)

// Also trigger on mount
onMounted(() => {
  if (props.autofocus) {
    setDelayedFocus(focusNameInput, 300)
  }
})

/**
 * Handles form submission
 */
const submitForm = async (event: Event) => {
  event.preventDefault()
  // check that there is no error in the form

  const isFormValid = await v$.value.$validate()

  console.debug('[CreateCollecitonForm] @submitForm:', isFormValid)
  if (!isFormValid) {
    console.warn(
      '[CreateCollecitonForm] Form validation failed:',
      v$.value.$errors
    )
    return
  }
  emit('submit', {
    name: formData.name,
    description: formData.description,
  })
}
</script>

<i18n>
{
  "en": {
    "name": "Name *",
    "description": "Description",
    "submitLabel": "Create Collection",
    "formErrors": "Please correct the errors in the form before submitting:",
    "nameUnique": "Note: You must choose a unique name not already used in your collections.",
    "noteCollectionLimited": "Please note: Collections are currently limited to 10.000 items.",
    "note": "If your search returned more results, only the 10.000 most relevant items will be stored."
  }
}
</i18n>
