import { onUnmounted } from 'vue'

export function useTimeout() {
  let timer: ReturnType<typeof setTimeout> | null = null

  function set(fn: () => void, delay: number = 0) {
    clear()
    timer = setTimeout(() => {
      timer = null
      fn()
    }, delay)
  }

  function clear() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  // Ensure cleanup on component unmount
  onUnmounted(() => {
    clear()
  })

  return { set, clear }
}
