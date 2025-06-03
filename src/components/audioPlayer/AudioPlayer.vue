<template>
  <div class="audio-player">
    <div class="audio-controls">
      <button @click="togglePlay" :disabled="!src" class="play-button" :aria-label="isPlaying ? 'Pause' : 'Play'">
        <span v-if="isPlaying">⏸️</span>
        <span v-else>▶️</span>
      </button>

      <div class="progress-container">
        <input type="range" min="0" :max="duration" :value="currentTime" @input="seek" class="progress-bar"
          :disabled="!src" />
        <div class="time-display">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <span class="duration">{{ formatTime(duration) }}</span>
        </div>
      </div>

      <div class="volume-container">
        <button @click="toggleMute" class="volume-button">
          <span v-if="isMuted || volume === 0">🔇</span>
          <span v-else-if="volume < 0.5">🔉</span>
          <span v-else>🔊</span>
        </button>
        <input type="range" min="0" max="1" step="0.1" :value="volume" @input="setVolume" class="volume-slider" />
      </div>
    </div>

    <audio ref="audioElement" :src="src" @loadedmetadata="onLoadedMetadata" @timeupdate="onTimeUpdate" @ended="onEnded"
      @error="onError" preload="metadata" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  src?: string
  autoplay?: boolean
  loop?: boolean
  authToken?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  autoplay: false,
  loop: false,
  authToken: ''
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  error: [error: Event]
  timeupdate: [currentTime: number]
}>()

// Refs
const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isMuted = ref(false)

// Methods
const togglePlay = async () => {
  if (!audioElement.value) return

  try {
    if (isPlaying.value) {
      audioElement.value.pause()
      isPlaying.value = false
      emit('pause')
    } else {
      await audioElement.value.play()
      isPlaying.value = true
      emit('play')
    }
  } catch (error) {
    console.error('Error playing audio:', error)
  }
}

const seek = (event: Event) => {
  if (!audioElement.value) return

  const target = event.target as HTMLInputElement
  const seekTime = parseFloat(target.value)
  audioElement.value.currentTime = seekTime
  currentTime.value = seekTime
}

const setVolume = (event: Event) => {
  if (!audioElement.value) return

  const target = event.target as HTMLInputElement
  const newVolume = parseFloat(target.value)
  volume.value = newVolume
  audioElement.value.volume = newVolume
  isMuted.value = newVolume === 0
}

const toggleMute = () => {
  if (!audioElement.value) return

  if (isMuted.value) {
    audioElement.value.volume = volume.value
    isMuted.value = false
  } else {
    audioElement.value.volume = 0
    isMuted.value = true
  }
}

const formatTime = (time: number): string => {
  if (isNaN(time) || time === 0) return '0:00'

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Event handlers
const onLoadedMetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
    if (props.autoplay) {
      togglePlay()
    }
  }
}

const onTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
    emit('timeupdate', currentTime.value)
  }
}

const onEnded = () => {
  isPlaying.value = false
  if (props.loop && audioElement.value) {
    audioElement.value.currentTime = 0
    togglePlay()
  } else {
    emit('ended')
  }
}

const onError = (error: Event) => {
  console.error('Audio error:', error)
  emit('error', error)
}

// Lifecycle
onMounted(async () => {
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }
})

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
  }
})
</script>

<style scoped>
.audio-player {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-button {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.play-button:hover:not(:disabled) {
  background: #0056b3;
}

.play-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.progress-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  appearance: none;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.progress-bar::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.progress-bar::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  border: none;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
  appearance: none;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  border: none;
}
</style>