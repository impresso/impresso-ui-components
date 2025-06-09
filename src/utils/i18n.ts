import { getCurrentInstance } from 'vue'

export function useLegacyT() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('useLegacyT() must be used inside setup()')
  const t = vm.appContext.config.globalProperties.$t
  if (!t) throw new Error('$t is not available. Is vue-i18n registered?')
  return t
}
