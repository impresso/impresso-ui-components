<template>
  <div class="TranscriptViewer">
    <slot name="header"><h3>Transcript</h3></slot>
    <p v-for="(utterance, i) in utterances" :key="i">
      <span
        v-for="(idx, j) in utterance.indices"
        :key="j"
        :class="getWordClasses(rrrebs[idx])"
        @click="() => onTranscriptWordClick(rrrebs[idx])"
      >
        <span v-if="debug" class="text-muted small ms-1 ml-1">{{
          rrrebs[idx].startTime
        }}</span>
        {{ rrrebs[idx].text }}{{ ' ' }}
        <span v-if="debug" class="text-muted small me-1 mr-1">{{
          rrrebs[idx].endTime
        }}</span>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Utterance {
  startTime: number
  endTime: number
  indices: number[] // indices of TranscriptPartialText contained in this utterance
}

export interface Rrreb {
  idx: number
  text: string
  startTime: number
  endTime: number
}

export interface TranscriptViewerProps {
  utterances?: Utterance[]
  disabled?: boolean
  rrrebs: Rrreb[]
  currentTime: number
  debug?: boolean
}

const props = defineProps<TranscriptViewerProps>()
const emit = defineEmits<{ click: [Rrreb] }>()

const activeUtterance = computed<Utterance | null>(() => {
  if (!props.utterances || props.utterances.length === 0) return null
  const found = props.utterances.find(
    (u) => props.currentTime >= u.startTime && props.currentTime < u.endTime
  )
  return found ?? null
})

const onTranscriptWordClick = (word: Rrreb) => {
  if (!props.disabled) emit('click', word)
}

const isWordActive = (word: Rrreb) =>
  props.currentTime >= word.startTime && props.currentTime < word.endTime

const isWordInActiveSegment = (word: Rrreb) => {
  if (!activeUtterance.value) return false
  return (
    word.startTime >= activeUtterance.value.startTime &&
    word.endTime <= activeUtterance.value.endTime
  )
}

const getWordClasses = (word: Rrreb) => ({
  'transcript-word': true,
  active: isWordActive(word),
  'in-segment': isWordInActiveSegment(word),
})

// // 🧠 Auto-scroll to active paragraph
// const paragraphRefs = ref<HTMLElement[]>([])

// const isUtteranceActive = (utterance: TranscriptSegment) =>
//   props.currentTime >= utterance.startTime &&
//   props.currentTime < utterance.endTime

// watch(
//   () => props.currentTime,
//   () => {
//     const index = utteranceParagraphs.value.findIndex(
//       (u) => props.currentTime >= u.startTime && props.currentTime < u.endTime
//     )
//     if (index !== -1) {
//       const el = paragraphRefs.value[index]
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     }
//   }
// )
</script>

<style>
.TranscriptViewer .transcript-word.active {
  background-color: #d1e7dd;
  font-variation-settings: var(--impresso-wght-bold, 600);
}
.TranscriptViewer .transcript-word {
  cursor: pointer;
  /* opacity: 0.6; */
  transition: background-color 0.3s ease, opacity 0.3s ease;
}
/* .TranscriptViewer .transcript-word.in-segment {
  /* opacity: 1; 
} */
.TranscriptViewer .transcript-word:hover {
  background-color: #ddd;
}
.TranscriptViewer .transcript-word.active:hover {
  background-color: #d1e7dd;
}
.transcript-paragraph {
  margin-bottom: 1rem;
  line-height: 1.6;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}
.TranscriptViewer .transcript-paragraph.active {
  opacity: 1;
}
</style>
