<template>
  <div class="TranscriptChapter border-b py-2">
    <div class="d-flex mb-2 w-100 align-items-center justify-content-between">
      <div class="text-muted mr-2 me-2 small" style="width: 50px">
        {{ formatTime(segment.startTime) }}
      </div>
      <div class="text-sm text-gray-900 flex-grow-1">
        <p>{{ preview }}</p>
        <AudioProgressBar
          :startTime="segment.startTime"
          :currentTime="isActive ? currentTime : 0"
          :disabled="!isActive"
          :duration="segment.endTime - segment.startTime"
        />
      </div>
      <div
        class="text-muted ml-2 ms-2 small"
        style="width: 50px; text-align: right"
      >
        {{ formatTime(segment.endTime) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatTime } from './utils'
import AudioProgressBar from './AudioProgressBar.vue'
interface TranscriptWord {
  text: string
  startTime: number
  endTime: number
}

export interface TranscriptChapterProps {
  segment: TranscriptWord
  currentTime: number // seconds
}

const props = defineProps<TranscriptChapterProps>()

// Formatted text preview
const preview = computed(() => {
  const words = props.segment.text.trim().split(/\s+/)
  if (words.length <= 10) return props.segment.text
  const start = words.slice(0, 3).join(' ')
  const end = words.slice(-3).join(' ')
  return `${start} [...] ${end}`
})

// Active state
const isActive = computed(() => {
  return (
    props.currentTime >= props.segment.startTime &&
    props.currentTime <= props.segment.endTime
  )
})
</script>

<style scoped>
/* Optional: subtle animation or style enhancements */
</style>
<!-- 
</template>
<script setup lang="ts">
import type { TranscriptWord } from './TranscriptViewer.vue'
  // "ub": [
  //   {
  //     "text": "Les accords économiques internationaux sont dans certains domaines indispensables pour établir les fondations d'une construction européenne. Dans d'autres, au contraire, on n'a pas trouvé de difficultés essentielles et la répartition s'est faite en quelque sorte d'elle-même. N'est-ce pas le cas du charbon européen ? Comment se pose aujourd'hui le problème du charbon ? Quelles sont les perspectives pour un avenir prochain ? C'est ce que nous allons demander à trois économistes groupés autour du micro de la ronde des nations, Paul Devina, député ancien ministre, Jacques Gascuel, directeur de perspectives et Émile Servan-Schreiber, directeur des échos. Émile Servan-Schreiber, je crois que vous pourriez d'abord nous donner quelques chiffres et poser en quelque sorte le problème.",
  //     "startTime": 31,
  //     "endTime": 82
  //   },
  //   {
  //     "text": "Je réponds volontiers à votre désir, encore que les statistiques en général sont fortes ennuyeuses. Nous sommes certains qu'elles seront brèves. Aussi, je les prie aussi brèves que possible. L'OCE, l'organisation européenne de coopération économique, a publié un rapport disant qu'en 52-53 l'Europe pourrait produire 511 millions de tonnes de charbon, ce qui sera une production légèrement excédentaire. Comment nous trouvons-nous aujourd'hui par rapport à ce projet futur ? Eh bien, si on prend la production du mois de septembre, chiffre fourni par le Comité européen du charbon, on trouve en gros, bien entendu, un chiffre tout à fait rond. Grande-Bretagne pour un seul mois. Grande-Bretagne, 18. Roux, Rexton-Chapel, par conséquent Allemagne occidentale, 8. Pologne, 6. France, 4. Saar, un peu plus d'un. Belgique, 2. Tchécoslovaquie, 1 et quelque chose. Hollande, 1. Si vous additionnez, vous constaterez, nous ne prône pas la multiplication ici, qu'on arrive à un peu moins des 511 millions prévus pour l'année 53. Donc on manque encore de charbon.",
  //     "startTime": 83,
  //     "endTime": 156
  //   },
  interface TranscriptChapterProps {
    chapter: TranscriptWord
    currentTime: number
  }
  withDefaults(defineProps<TranscriptChapterProps>(), {
    currentTime: 0,
  })

  function formatTime(seconds: number): string {
    return seconds.toFixed(2) + 's'
  }

</script> -->
