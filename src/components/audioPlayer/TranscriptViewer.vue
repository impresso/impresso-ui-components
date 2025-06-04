<template>
  <div class="TranscriptViewer">
    <h3>Transcript</h3>

    <p>
      <span
        v-for="(word, index) in transcript"
        :key="index"
        :class="getWordClasses(word)"
        @click="() => onTranscriptWordClick(word)"
        class="transcript-word"
      >
        {{ word.text }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
export interface TranscriptWord {
  text: string
  startTime: number // Start time in seconds
  endTime: number // End time in seconds
}

export interface TranscriptSegment {
  start: number // Start time in seconds
  end: number // End time in seconds
  id?: string // Optional segment ID
  label?: string // Optional segment label
}
export interface TranscriptViewerProps {
  disabled?: boolean // Optional prop to disable interaction
  transcript: TranscriptWord[] // Array of words with start and end times
  currentTime: number // Current playback time in seconds
  activeSegment?: TranscriptSegment // Optional active segment info
}
const props = defineProps<TranscriptViewerProps>()

const emit = defineEmits<{
  click: [TranscriptWord]
}>()

const onTranscriptWordClick = (word: TranscriptWord) => {
  if (props.disabled) return // Ignore clicks if disabled
  emit('click', word)
}

const isWordActive = (word: TranscriptWord) => {
  return (
    props.currentTime > 0 &&
    props.currentTime >= word.startTime &&
    props.currentTime <= word.endTime
  )
}

const isWordInActiveSegment = (word: TranscriptWord) => {
  if (!props.activeSegment) return false
  return (
    word.startTime >= props.activeSegment.start &&
    word.endTime <= props.activeSegment.end
  )
}

const getWordClasses = (word: TranscriptWord) => {
  return {
    active: isWordActive(word),
    'in-segment': isWordInActiveSegment(word),
  }
}
</script>
<style>
.TranscriptViewer .active {
  background-color: #d1e7dd; /* Light green for active word */
  font-weight: bold;
}
</style>
