<template>
  <div class="AudioTranscriptPlayer">
    <AudioPlayer
      class="position-sticky top-0"
      :src="props.src"
      :is-playing="isPlaying"
      :current-time="currentTime"
      @loadedmetadata="duration = $event"
      @timeupdate="currentTime = $event"
    />

    <TranscriptViewer
      :utterance-breaks="props.utteranceBreaks"
      :transcript="transcript"
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
import type { TranscriptWord } from './TranscriptViewer.vue'

export interface AudioTranscriptPlayerProps {
  transcript: TranscriptWord[]
  utteranceBreaks?: TranscriptWord[]
  src: string
}

const props = withDefaults(defineProps<AudioTranscriptPlayerProps>(), {
  transcript: () => [],
  utteranceBreaks: () => [],
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
