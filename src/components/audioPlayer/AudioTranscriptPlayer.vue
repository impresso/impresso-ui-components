<template>
  <div class="AudioTranscriptPlayer">
    <AudioPlayer
      class="position-sticky top-0 w-100"
      style="z-index: 1"
      :src="props.src"
      :is-playing="isPlaying"
      :current-time="currentTime"
      @loadedmetadata="duration = $event"
      @timeupdate="currentTime = $event"
    />

    <TranscriptViewer
      :utterances="utterances"
      :rrrebs="rrrebs"
      :current-time="currentTime"
      :disabled="duration === 0"
      @click="onTranscriptViewerClick"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AudioPlayer from './AudioPlayer.vue'
import TranscriptViewer from './TranscriptViewer.vue'
import type { Rrreb, Utterance } from './TranscriptViewer.vue'

export interface AudioTranscriptPlayerProps {
  rrrebs: Rrreb[]
  utterances: Utterance[]
  src: string
}

const props = withDefaults(defineProps<AudioTranscriptPlayerProps>(), {
  rrrebs: () => [],
  utterances: () => [],
  src: '',
})
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)

const handleSeeking = (targetTime: number) => {
  console.debug('[AudioTranscriptPlayer] handleSeeking targetTime:', targetTime)
  currentTime.value = targetTime
  isPlaying.value = true
}

function onTranscriptViewerClick(word: TranscriptWord) {
  console.log('Clicked word:', word)
  handleSeeking(word.startTime)
}
</script>
