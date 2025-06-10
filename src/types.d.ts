export interface MediaSource {
  uid: string
  name: string
  type: 'newspaper' | 'radio' | 'radio_broadcast'
  acronym?: string
  startYear?: number
  endYear?: number
}

export interface ContentItem {
  uid: string
  type: 'audio' | 'ar'
  publicationDate: string
  title?: string
  excerpt?: string
  transcript?: string
  transcriptLength: number
  href?: string
  link?: string
  mediaSource: MediaSource
  dataProvider?: string
  copyright?: string
}

export interface AudioContentItem extends ContentItem {
  duration: number
  startTime: number
  audioSrc?: string
  audioSrcType?: 'mp3' | 'ogg' | 'wav'
  radioChannel?: string
}
