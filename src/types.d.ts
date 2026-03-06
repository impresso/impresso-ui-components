export interface MediaSource {
  id: string
  name: string
  type: 'newspaper' | 'radio' | 'radio_broadcast'
  acronym?: string
  startYear?: number
  endYear?: number
}

export interface SpecialMembershipDataset {
  id: string
  title: string
  bitmapPosition?: number
  metadata: Record<string, any>
}

export interface SpecialMembershipRequest {
  id: string
  dataset: SpecialMembershipDataset
  createdAt: Date
  updatedAt: Date
  status: 'pending' | 'approved' | 'rejected'
}


export interface ContentItem {
  id: string
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
