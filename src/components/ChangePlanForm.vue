<template>
  <form
    class="ChangePlanForm"
    :class="{ 'd-flex flex-wrap align-items-center': props.inline }"
    @submit="handleOnSubmit"
  >
    <div v-for="plan in props.availablePlans" :key="plan.name">
      <OverlayTrigger :disabled="!inline" :placement="'bottom'">
        <template #tooltip>
          <p class="m-0 small" v-html="plan.description" />
        </template>
        <div class="d-flex align-items-center gap-2 m-2 p-1">
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
    <slot
      name="submit-button"
      :submit="handleOnSubmit"
      :disabled="!!pendingPlan || props.currentPlan === selectedPlan"
    >
      <button
        type="button"
        :disabled="!!pendingPlan || props.currentPlan === selectedPlan"
        class="btn btn-outline-secondary btn-md px-4 border border-dark btn-block"
      >
        <Icon name="sendMail" />
        <span class="ml-2">Confirm Plan Change Request</span>
      </button>
    </slot>
    {{ pendingPlan }}
  </form>
</template>
<script setup lang="ts">
import Icon from './Icon.vue'
import { ref, watch } from 'vue'
import OverlayTrigger from './OverlayTrigger.vue'

/**
 * Type definitions for the form payload
 */
export type ChangePlanFormPayload = {
  plan: string
}

export interface ChangePlanFormProps {
  inline?: boolean
  currentPlan?: string
  pendingPlan?: string
  rejectedPlan?: string
  availablePlans?: AvailablePlan[]
}

export type AvailablePlan = {
  name: string
  label: string
  description: string
}

/**
 * Props definition for ChangePlanForm component
 */
const props = withDefaults(defineProps<ChangePlanFormProps>(), {
  // Whether the form is displayed inline or not
  inline: false,
  availablePlans: () => [],
})

const emits = defineEmits(['submit', 'change'])

const selectedPlan = ref<string | undefined>(props.currentPlan)

/**
 * Watches for changes in the plan prop and updates selectedPlan
 */
watch(
  () => props.currentPlan,
  (newPlan) => {
    selectedPlan.value = newPlan
  }
)

// if selectedPlan change,  emits('change', { plan: newPlan })
watch(
  () => selectedPlan.value,
  (newPlan) => {
    emits('change', { plan: newPlan })
  }
)

/**
 * Handles form submission
 */
const handleOnSubmit = (event: Event) => {
  event.preventDefault()
  if (selectedPlan.value) {
    emits('submit', { plan: selectedPlan.value })
  } else {
    console.error('Selected plan is undefined')
  }
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
