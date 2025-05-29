<template>
  <div class="d-flex w-100 mb-3 align-items-center">
    <div
      class="py-3"
      :style="{
        background: backgroundGradient,
        width: '100%',
        height: 'var(--bs-btn-height)',
        borderRadius: '0.5rem',
      }"
    ></div>
    <button
      type="button"
      class="ml-3 ms-3 btn btn-sm"
      @click="onGenerateRandomPatternClick"
    >
      change colors
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, watchEffect } from 'vue'

export interface ColorPatternPickerProps {
  numColors?: number
  availableColors?: string[]
  initialColors?: string[] // Optional prop to set initial colors
}

const colors = defineModel<string[]>('colors', {
  default: () => [],
})

const props = withDefaults(defineProps<ColorPatternPickerProps>(), {
  numColors: 7,
  initialColors: () => [],
  availableColors: () => [
    '#96ceb4',
    '#ffeead',
    '#ffcc5c',
    '#ff6f69',
    '#588c7e',
    '#f2e394',
    '#f2ae72',
    '#d96459',
    '#a9bdc8',
    '#677e96',
    '#4a9bb1',
    '#ccd6e6',
    '#4f615b',
    '#3d95a6',
    '#d3deec',
    '#3c4b54',
    '#3e8696',
    '#dce5f4',
    '#45535f',
    '#4a818a',
    '#b2bdcc',
    '#2e4051',
    '#62797d',
    '#EF476F',
    '#06D6A0',
    '#EE6123',
    '#21295C',
    '#FA003F',
    '#00916E',
  ],
})

// Initialize colors from props and keep them synced

const backgroundGradient = computed(() => {
  const n = colors.value.length
  if (n === 0) return 'transparent'

  const stops = []
  const merge = 2 // percent overlap
  const bandWidth = 100 / n

  for (let i = 0; i < n; i++) {
    const color = colors.value[i]
    const start = i === 0 ? 0 : i * bandWidth - merge
    const end = i === n - 1 ? 100 : (i + 1) * bandWidth + merge

    stops.push(
      `${color} ${Math.max(0, start)}%`,
      `${color} ${Math.min(100, end)}%`
    )
  }

  return `linear-gradient(90deg, ${stops.join(', ')})`
})

function generateRandomPattern(length: number): string[] {
  return Array.from(
    { length },
    () =>
      props.availableColors[
        Math.floor(Math.random() * props.availableColors.length)
      ]
  )
}

function onGenerateRandomPatternClick(e: MouseEvent) {
  console.debug(
    '[ColorPatternPicker] @onGenerateRandomPatternClick',
    generateRandomPattern(props.numColors)
  )
  e.preventDefault()
  colors.value = generateRandomPattern(props.numColors)
}

watch(
  () => props.initialColors,
  (newColors: string[]) => {
    if (newColors.length > 0) {
      colors.value = newColors
    } else {
      colors.value = generateRandomPattern(props.numColors)
    }
  },
  { immediate: true }
)
watch(
  () => props.numColors,
  () => {
    if (colors.value.length !== props.numColors) {
      colors.value = generateRandomPattern(props.numColors)
    }
  }
)
</script>
