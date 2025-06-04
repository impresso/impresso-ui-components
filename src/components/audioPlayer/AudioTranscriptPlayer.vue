<template>
  <div class="AudioTranscriptPlayer">
    <AudioPlayer
      :src="props.src"
      ref="audioPlayerRef"
      :current-time="currentTime"
      @loadedmetadata="duration = $event"
      @timeupdate="currentTime = $event"
    />
    {{ duration }}
    <TranscriptViewer
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
  src: string
}

type AudioPlayerInstance = ComponentPublicInstance<{
  seekTo: (time: number) => void
}>

const currentTime = ref(0)
const duration = ref(0)
import type { ComponentPublicInstance } from 'vue'

const audioPlayerRef = ref<AudioPlayerInstance | null>(null)
const props = defineProps<AudioTranscriptPlayerProps>()

const handleSeeking = (targetTime: number) => {
  console.debug('[AudioTranscriptPlayer] handleSeeking targetTime:', targetTime)

  currentTime.value = targetTime
  audioPlayerRef.value?.seekTo(targetTime)
}

function onTranscriptViewerClick(word: TranscriptWord) {
  console.log('Clicked word:', word)
  handleSeeking(word.startTime)
}
</script>
