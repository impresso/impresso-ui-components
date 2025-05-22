<template>
  <div>
    <!-- Modal container -->
    <div
      v-if="isRendered"
      class="modal fade"
      :class="{ show: isVisible, [props.modalClass]: !!props.modalClass }"
      tabindex="-1"
      :aria-labelledby="`${id}-title`"
      aria-modal="true"
      role="dialog"
      :style="{ display: isRendered ? 'block' : 'none' }"
    >
      <div class="modal-dialog" :class="props.dialogClass">
        <div class="modal-content" :class="props.contentClass">
          <div class="modal-header d-flex align-items-center">
            <slot
              name="modal-header"
              v-bind:title-id="`${id}-title`"
              v-bind:close="() => close()"
            >
              <h5 class="modal-title small-caps" :id="`${id}-title`">
                {{ props.title }}
              </h5>
              <button
                class="btn btn-transparent text-dark"
                v-if="!props.hideHeaderClose"
                type="button"
                aria-label="Close"
                @click="close"
              >
                <Icon name="cross" color />
              </button>
            </slot>
          </div>

          <div :class="`modal-body ${props.bodyClass}`">
            <slot></slot>
          </div>

          <div v-if="!props.hideFooter" class="modal-footer">
            <slot name="modal-footer" v-bind:close="() => close()">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="close"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-sm btn-primary"
                :class="{ disabled: props.okDisabled }"
                :disabled="props.okDisabled"
                @click="emit('ok')"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal backdrop -->
    <div
      v-if="isRendered && !props.hideBackdrop"
      class="modal-backdrop fade"
      :class="{ show: isVisible }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { v4 } from 'uuid'
import Icon from 'impresso-ui-components/components/Icon.vue'

export interface BModalProps {
  show: boolean
  title?: string
  bodyClass?: string
  hideFooter?: boolean
  okDisabled?: boolean
  noFade?: boolean
  hideBackdrop?: boolean
  modalClass?: string
  dialogClass?: string
  contentClass?: string
  showDelay?: number
  hideHeaderClose?: boolean
}

const props = withDefaults(defineProps<BModalProps>(), {
  show: false,
  title: 'Untitled',
  bodyClass: '',
  hideFooter: false,
  okDisabled: false,
  noFade: false,
  hideBackdrop: false,
  modalClass: '',
  dialogClass: '',
  contentClass: '',
  showDelay: 500,
  hideHeaderClose: false,
})

const emit = defineEmits(['close', 'ok', 'shown'])
const id = v4()
const isVisible = ref(props.show)
const isRendered = ref(props.show)

const close = () => {
  isVisible.value = false
  emit('close')
}

watch(
  () => props.show,
  (show) => {
    if (show && !isRendered.value) {
      isRendered.value = true
      setTimeout(() => {
        isVisible.value = true
      }, 100)
    } else if (!show && isVisible.value) {
      isVisible.value = false
    }
  }
)

watch(isVisible, (visible) => {
  if (!visible) {
    setTimeout(() => {
      isRendered.value = false
    }, props.showDelay)
  } else {
    emit('shown')
  }
})

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isVisible.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
/* Modal fade effect */
.modal.fade {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.modal.fade.show {
  opacity: 1;
}

/* Modal dialog entrance */
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform: translateY(-20px);
  opacity: 0;
}

.modal.fade.show .modal-dialog {
  transform: translateY(0);
  opacity: 1;
}

/* Backdrop fade */
.modal-backdrop {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.modal-backdrop.show {
  opacity: 0.5;
}

/* Optional: icon stroke fix */
.modal .btn svg path {
  stroke: black;
}

/* Responsive modal width override */
@media (min-width: 1024px) {
  .modal-lg,
  .modal-xl,
  .modal-xxl {
    --bs-modal-width: 1000px !important;
  }
}
</style>
