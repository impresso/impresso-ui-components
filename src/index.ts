import { useI18n } from 'vue-i18n'

const { t } = useI18n()
t('i18n added to be referenced in the code')

export { default as Alert } from './components/Alert.vue'
export { default as AudioItem } from './components/AudioItem.vue'
export { default as Icon } from './components/Icon.vue'
export { default as ChangePasswordForm } from './components/ChangePasswordForm.vue'
export { default as ProfileForm } from './components/ProfileForm.vue'
export { default as CreateCollectionForm } from './components/CreateCollectionForm.vue'
export { default as ChangePlanForm } from './components/ChangePlanForm.vue'
export { default as AcceptTermsOfUse } from './components/AcceptTermsOfUse.vue'
export { default as OverlayTrigger } from './components/OverlayTrigger.vue'
export { default as Sunset } from './components/Sunset.vue'
export { default as AudioPlayer } from './components/audioPlayer/AudioPlayer.vue'
export { default as AudioProgressBar } from './components/audioPlayer/AudioProgressBar.vue'
export { default as TranscriptViewer } from './components/audioPlayer/TranscriptViewer.vue'

export { default as LogoImpressoDatalab } from './components/logos/LogoImpressoDatalab.vue'
export { default as LogoImpressoApp } from './components/logos/LogoImpressoApp.vue'
export { default as SwitchBetweenAppDatalab } from './components/logos/SwitchBetweenAppDatalab.vue'
