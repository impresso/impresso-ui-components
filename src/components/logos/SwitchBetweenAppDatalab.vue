<template>
  <a :href="props.href" class="SwitchBetweenAppDatalab" :style="computedStyle">
    <component
      :is="LogoComponent"
      :color="props.color"
      :width="props.width"
      class="SwitchBetweenAppDatalab_logo"
    />
    <slot>
      <span v-html="label" />
    </slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LogoImpressoApp from './LogoImpressoApp.vue'
import LogoImpressoDatalab from './LogoImpressoDatalab.vue'
/**
 * Props for the SwitchBetweenAppDatalab component.
 * The switch is being shown center top of the screen to allow users to switch between
 * the App and Data Lab interfaces.
 */
export interface SwitchBetweenAppDatalabProps {
  /** If true, shows the Data Lab logo; otherwise, shows the App logo */
  isDatalab?: boolean
  isApp?: boolean
  /** background color */
  backgroundColor?: string
  /** front color */
  color?: string
  href?: string
  width?: number
}

const props = withDefaults(defineProps<SwitchBetweenAppDatalabProps>(), {
  isDatalab: false,
  isApp: false,
  backgroundColor: 'var(--impresso-color-white)',
  color: 'var(--impresso-color-black)',
  href: '#',
  width: 100,
})

const LogoComponent = computed(() => {
  if (props.isDatalab) {
    return LogoImpressoDatalab
  } else if (props.isApp) {
    return LogoImpressoApp
  } else {
    return null
  }
})

const computedStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.color,
}))

const label = computed(() => {
  if (props.isDatalab) {
    return 'Switch to Impresso App'
  } else if (props.isApp) {
    return 'Switch to Impresso DataLab'
  } else {
    return ''
  }
})
</script>
<style lang="css">
.SwitchBetweenAppDatalab {
  color: var(--impresso-color-black);
  background-color: var(--impresso-color-yellow);
  z-index: 1100;
  text-decoration: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50px);
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  padding: 50px var(--spacing-3) 2px;
  border-bottom-left-radius: var(--impresso-border-radius-xs);
  border-bottom-right-radius: var(--impresso-border-radius-xs);
  transition: transform var(--impresso-transition-duration)
    var(--impresso-transition-ease);
  box-shadow: var(--bs-box-shadow-lg);
}

.SwitchBetweenAppDatalab:hover {
  transform: translate(-50%, 0);
}
.SwitchBetweenAppDatalab_logo {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
