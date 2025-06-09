<template>
  <div class="MediaSourceLabel">
    <router-link v-if="showLink" :to="routerLinkUrl">
      <span :class="titleClass">{{ title }}</span
      >{{ ' ' }}
      <span class="small-caps" v-if="showType">{{ t(item.type) }}</span>
    </router-link>
    <div v-else>
      <span :class="titleClass">{{ title }}</span
      >{{ ' ' }}
      <span class="small-caps" v-if="showType">{{ t(item.type) }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MediaSource } from '../../types'

const { t } = useI18n()

export interface MediaSourceLabelProps {
  item: MediaSource
  showLink?: boolean
  showType?: boolean
  titleClass?: string
}

const props = withDefaults(defineProps<MediaSourceLabelProps>(), {
  showType: true,
  titleClass: 'font-weight-medium text-decoration-underline',
})

const routerLinkUrl = computed(() => ({
  name: 'newspaper_metadata',
  params: { newspaper_uid: props.item.uid },
}))

const glob = window as any

const title = computed(() => {
  if (
    props.item.type === 'newspaper' &&
    typeof glob.impressoNewspapers === 'object'
  ) {
    try {
      return glob.impressoNewspapers[props.item.uid].name
    } catch (e) {
      // debugger
      return props.item.name || props.item.uid
    }
  }
  return props.item.name || props.item.uid
})
</script>
<i18n lang="json">
{
  "en": {
    "newspaper_label": "Newspaper",
    "radio_label": "Radio"
  }
}
</i18n>
