<template>
  <div class="AudioItem d-flex align-items-center">
    <div class="flex-shrink-0 mr-2" style="width: 50px">
      <Icon name="pause" v-if="isPlaying" />
      <Icon name="play" v-else />
    </div>
    <div class="flex-grow-1">
      <slot name="title">
        <h2
          v-if="item.title"
          class="mb-0 font-weight-bold"
          data-testid="article-title"
        >
          <RouterLink
            v-if="showLink"
            :to="routerLinkUrl"
            v-html="item.title"
          ></RouterLink>
          <a
            v-else-if="showHref"
            v-on:click.prevent="onClick"
            v-html="item.title"
          ></a>
          <span v-else v-html="item.title"></span>
        </h2>
        <div v-else>
          <RouterLink v-if="showLink" :to="routerLinkUrl"
            >(untitled)</RouterLink
          >
          <a v-else-if="showHref" v-on:click.prevent="onClick"></a>
          <span v-else></span>
        </div>
      </slot>
      <div>
        <MediaSourceLabel
          :item="item.mediaSource"
          show-link
          class="d-inline-block"
        />
        <span>{{ $d(new Date(item.publicationDate), 'long') }}</span>
      </div>
      <div class="article-meta">
        <span>{{ $t(`contentItem.type.${item.type}`) }}</span>
        <span v-if="item.duration"> – {{ item.duration }} </span>
      </div>
      <div v-if="item.excerpt" class="article-excerpt mt-2">
        <blockquote class="text-muted">{{ item.excerpt }}[...]</blockquote>
        <div class="badge bg-light me-1 mr-1 pt-1">
          <span v-if="item.transcriptLength > 1200">{{
            $t('readingTime', { min: Math.round(item.transcriptLength / 1200) })
          }}</span>
          <span v-else>{{ $t('contentItem.reducedReadingTime') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from './Icon.vue'
import type { AudioContentItem } from '../types'
import MediaSourceLabel from './labels/MediaSourceLabel.vue'
import { useLegacyI18n } from '../utils/i18n'
const { $t, $d } = useLegacyI18n()

export interface AudioItemProps {
  item: AudioContentItem
  isPlaying?: boolean
  showLink?: boolean
  showHref?: boolean
  routerLinkUrl?: string
}
withDefaults(defineProps<AudioItemProps>(), {
  showLink: true,
  showHref: false,
  isPlaying: false,
  routerLinkUrl: '',
})

defineEmits<{
  click: []
}>()
</script>
