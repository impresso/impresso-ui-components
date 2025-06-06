<template>
  <div class="TranscriptViewer">
    <h3>Transcript</h3>

    <p
      v-for="(utterance, pIndex) in utteranceParagraphs"
      :key="`utterance-${pIndex}`"
      :ref="(el) => (paragraphRefs[pIndex] = el)"
      class="transcript-paragraph"
      :class="{ active: isUtteranceActive(utterance) }"
    >
      <span
        v-for="(word, index) in utterance.words"
        :key="index"
        :class="getWordClasses(word)"
        @click="() => onTranscriptWordClick(word)"
        class="transcript-word"
      >
        <span class="text-muted small ms-1 ml-1">{{ word.startTime }}</span>
        {{ word.text }}{{ ' ' }}
        <span class="text-muted small me-1 mr-1">{{ word.endTime }}</span>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface TranscriptWord {
  text: string
  startTime: number
  endTime: number
}
export interface TranscriptSegment {
  startTime: number
  endTime: number
  text: string
  id?: string
}
export interface TranscriptViewerProps {
  utteranceBreaks?: TranscriptSegment[]
  disabled?: boolean
  transcript: TranscriptWord[]
  currentTime: number
  activeSegment?: TranscriptSegment
}
const props = defineProps<TranscriptViewerProps>()
const emit = defineEmits<{ click: [TranscriptWord] }>()

const onTranscriptWordClick = (word: TranscriptWord) => {
  if (!props.disabled) emit('click', word)
}

const isWordActive = (word: TranscriptWord) =>
  props.currentTime >= word.startTime && props.currentTime < word.endTime

const isWordInActiveSegment = (word: TranscriptWord) => {
  if (!props.activeSegment) return false
  return (
    word.startTime >= props.activeSegment.startTime &&
    word.endTime <= props.activeSegment.endTime
  )
}

const getWordClasses = (word: TranscriptWord) => ({
  active: isWordActive(word),
  'in-segment': isWordInActiveSegment(word),
})

const utteranceParagraphs = computed(() => {
  const segments = props.utteranceBreaks ?? [
    { startTime: 0, endTime: Infinity, text: '' },
  ]
  return segments
    .map((segment) => ({
      ...segment,
      words: props.transcript.filter(
        (word) =>
          word.startTime >= segment.startTime && word.endTime <= segment.endTime
      ),
    }))
    .filter((u) => u.words.length > 0)
})

// 🧠 Auto-scroll to active paragraph
const paragraphRefs = ref<HTMLElement[]>([])

const isUtteranceActive = (utterance: TranscriptSegment) =>
  props.currentTime >= utterance.startTime &&
  props.currentTime < utterance.endTime

watch(
  () => props.currentTime,
  () => {
    const index = utteranceParagraphs.value.findIndex(
      (u) => props.currentTime >= u.startTime && props.currentTime < u.endTime
    )
    if (index !== -1) {
      const el = paragraphRefs.value[index]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }
)
</script>

<style>
.TranscriptViewer .transcript-word.active {
  background-color: #d1e7dd;
  font-variation-settings: var(--impresso-wght-bold, 600);
}
.TranscriptViewer .transcript-word {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
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
