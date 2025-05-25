<template>
  <div
    class="OverlayTrigger"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="triggerRef"
  >
    <slot />

    <Teleport to="body">
      <div
        v-if="showTooltip"
        ref="tooltipRef"
        :class="tooltipClasses"
        :style="tooltipStyles"
        role="tooltip"
        @mouseenter="handleTooltipMouseEnter"
        @mouseleave="handleTooltipMouseLeave"
      >
        <div class="tooltip-arrow" :style="arrowStyles"></div>
        <div class="tooltip-inner">
          <slot name="tooltip" :tooltip="tooltip">
            {{ tooltip }}
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto'
type Trigger = 'hover' | 'click' | 'focus' | 'manual'

interface OverlayTriggerProps {
  placement?: Placement
  trigger?: Trigger | Trigger[]
  tooltip?: string
  delay?: number | { show: number; hide: number }
  disabled?: boolean
  offset?: [number, number]
}

const props = withDefaults(defineProps<OverlayTriggerProps>(), {
  placement: 'top',
  trigger: 'hover',
  tooltip: '',
  delay: 0,
  disabled: false,
  offset: () => [0, 8],
})

const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const showTooltip = ref(false)
const actualPlacement = ref<Placement>('top')
const tooltipPosition = ref({ x: 0, y: 0 })

let showTimeout: number | null = null
let hideTimeout: number | null = null

const triggers = computed(() =>
  Array.isArray(props.trigger) ? props.trigger : [props.trigger]
)

const showDelay = computed(() =>
  typeof props.delay === 'number' ? props.delay : props.delay.show
)

const hideDelay = computed(() =>
  typeof props.delay === 'number' ? props.delay : props.delay.hide
)

const tooltipClasses = computed(() => [
  'tooltip',
  `bs-tooltip-${actualPlacement.value}`,
  'show',
])

const tooltipStyles = computed(() => ({
  position: 'absolute' as const,
  top: `${tooltipPosition.value.y}px`,
  left: `${tooltipPosition.value.x}px`,
  zIndex: 1080,
}))

const arrowStyles = computed(() => {
  const placement = actualPlacement.value
  const arrowSize = 8

  const styles: Record<string, any> = {
    position: 'absolute',
    width: 0,
    height: 0,
  }

  switch (placement) {
    case 'top':
      styles.bottom = '0'
      styles.left = '50%'
      styles.transform = 'translateX(-50%)'
      styles.borderLeft = `${arrowSize}px solid transparent`
      styles.borderRight = `${arrowSize}px solid transparent`
      styles.borderTop = `${arrowSize}px solid #000`
      break
    case 'bottom':
      styles.top = '0'
      styles.left = '50%'
      styles.transform = 'translateX(-50%)'
      styles.borderLeft = `${arrowSize}px solid transparent`
      styles.borderRight = `${arrowSize}px solid transparent`
      styles.borderBottom = `${arrowSize}px solid #000`
      break
    case 'left':
      styles.right = '0'
      styles.top = '50%'
      styles.transform = 'translateY(-50%)'
      styles.borderTop = `${arrowSize}px solid transparent`
      styles.borderBottom = `${arrowSize}px solid transparent`
      styles.borderLeft = `${arrowSize}px solid #000`
      break
    case 'right':
      styles.left = '0'
      styles.top = '50%'
      styles.transform = 'translateY(-50%)'
      styles.borderTop = `${arrowSize}px solid transparent`
      styles.borderBottom = `${arrowSize}px solid transparent`
      styles.borderRight = `${arrowSize}px solid #000`
      break
  }

  return styles
})

const clearTimeouts = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const show = () => {
  if (props.disabled) return

  clearTimeouts()

  if (showDelay.value > 0) {
    showTimeout = window.setTimeout(() => {
      showTooltip.value = true
      nextTick(updatePosition)
    }, showDelay.value)
  } else {
    showTooltip.value = true
    nextTick(updatePosition)
  }
}

const hide = () => {
  clearTimeouts()

  if (hideDelay.value > 0) {
    hideTimeout = window.setTimeout(() => {
      showTooltip.value = false
    }, hideDelay.value)
  } else {
    showTooltip.value = false
  }
}

const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  // Get absolute screen coordinates including scroll offset
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft
  const scrollY = window.pageYOffset || document.documentElement.scrollTop

  const triggerScreenRect = {
    top: triggerRect.top + scrollY,
    bottom: triggerRect.bottom + scrollY,
    left: triggerRect.left + scrollX,
    right: triggerRect.right + scrollX,
    width: triggerRect.width,
    height: triggerRect.height,
  }

  let placement = props.placement

  // Auto placement logic using viewport coordinates
  if (placement === 'auto') {
    const spaceTop = triggerRect.top
    const spaceBottom = viewport.height - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewport.width - triggerRect.right

    const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight)

    if (maxSpace === spaceTop) placement = 'top'
    else if (maxSpace === spaceBottom) placement = 'bottom'
    else if (maxSpace === spaceLeft) placement = 'left'
    else placement = 'right'
  }

  actualPlacement.value = placement

  let x = 0
  let y = 0

  // Calculate position using screen coordinates
  switch (placement) {
    case 'top':
      x =
        triggerScreenRect.left +
        triggerScreenRect.width / 2 -
        tooltipRect.width / 2
      y = triggerScreenRect.top - tooltipRect.height - props.offset[1]
      break
    case 'bottom':
      x =
        triggerScreenRect.left +
        triggerScreenRect.width / 2 -
        tooltipRect.width / 2
      y = triggerScreenRect.bottom + props.offset[1]
      break
    case 'left':
      x = triggerScreenRect.left - tooltipRect.width - props.offset[1]
      y =
        triggerScreenRect.top +
        triggerScreenRect.height / 2 -
        tooltipRect.height / 2
      break
    case 'right':
      x = triggerScreenRect.right + props.offset[1]
      y =
        triggerScreenRect.top +
        triggerScreenRect.height / 2 -
        tooltipRect.height / 2
      break
  }

  // Apply additional offset
  x += props.offset[0]

  // Keep tooltip within viewport using screen coordinates
  const documentWidth = Math.max(
    document.documentElement.scrollWidth,
    viewport.width
  )
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    viewport.height
  )

  x = Math.max(8, Math.min(x, documentWidth - tooltipRect.width - 8))
  y = Math.max(8, Math.min(y, documentHeight - tooltipRect.height - 8))

  tooltipPosition.value = { x, y }
}

// Event handlers
const handleMouseEnter = () => {
  if (triggers.value.includes('hover')) {
    show()
  }
}

const handleMouseLeave = () => {
  if (triggers.value.includes('hover')) {
    hide()
  }
}

const handleClick = () => {
  if (triggers.value.includes('click')) {
    if (showTooltip.value) {
      hide()
    } else {
      show()
    }
  }
}

const handleFocus = () => {
  if (triggers.value.includes('focus')) {
    show()
  }
}

const handleBlur = () => {
  if (triggers.value.includes('focus')) {
    hide()
  }
}

const handleTooltipMouseEnter = () => {
  if (triggers.value.includes('hover')) {
    clearTimeouts()
  }
}

const handleTooltipMouseLeave = () => {
  if (triggers.value.includes('hover')) {
    hide()
  }
}

const handleResize = () => {
  if (showTooltip.value) {
    nextTick(updatePosition)
  }
}

const handleScroll = () => {
  if (showTooltip.value) {
    updatePosition()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  document.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  clearTimeouts()
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('scroll', handleScroll, true)
})

// Expose methods for manual control
defineExpose({
  show,
  hide,
  toggle: () => (showTooltip.value ? hide() : show()),
})
</script>

<style>
.OverlayTrigger {
  display: inline-block;
}

.tooltip {
  text-align: center;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  opacity: 0.9;
  pointer-events: none;
}

.tooltip.show {
  opacity: 0.9;
  pointer-events: auto;
}

.tooltip-inner {
  max-width: 200px;
  padding: var(--spacer-1, 10px) var(--spacer-2, 15px);
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: var(--bs-border-radius-sm, 4px);
}

.tooltip-arrow {
  position: absolute;
}

/* Hover behavior for tooltips */
.tooltip:hover {
  pointer-events: auto;
}
</style>
