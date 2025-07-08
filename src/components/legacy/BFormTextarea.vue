<template>
  <textarea
    ref="textareaRef"
    :class="iClass"
    :value="props.modelValue"
    @input="handleChanged"
    v-bind="$attrs"
    :data-testid="dataTestid"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, useAttrs } from 'vue'

export interface BFormTextareaProps {
  modelValue?: string
  autofocus?: boolean
  size?: string
  dataTestid?: string
}

const props = withDefaults(defineProps<BFormTextareaProps>(), {
  modelValue: '',
  autofocus: false,
  size: 'md',
  dataTestid: undefined,
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const allowedAttrs = [
  'onClick',
  'placeholder',
  'class',
  'style',
  'rows',
  'cols',
  'maxlength',
  'minlength',
  'readonly',
  'disabled',
  'wrap',
  'autocomplete',
  'spellcheck',
]

const unknownAttrs = Object.keys(attrs).filter(
  (key) => !allowedAttrs.includes(key)
)
if (unknownAttrs.length) {
  console.warn(`BFormTextarea: Unknown attributes: ${unknownAttrs.join(', ')}`)
}

const iClass = computed(() => ({
  'form-control': true,
  [`form-control-${props.size}`]: !!props.size,
}))

onMounted(() => {
  nextTick(() => {
    window.requestAnimationFrame(() => {
      if (props.autofocus) textareaRef.value?.focus()
    })
  })
})

const handleChanged = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>
