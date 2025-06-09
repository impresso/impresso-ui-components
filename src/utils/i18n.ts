import { getCurrentInstance } from 'vue'

type LegacyI18nGlobalProperties = {
  $t: (key: string, ...args: any[]) => string
  $d: (value: unknown, ...args: any[]) => string
  $n: (value: unknown, ...args: any[]) => string
}

export function useLegacyI18n(): LegacyI18nGlobalProperties {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('useLegacyI18n must be used within setup()')

  const gp = vm.appContext.config.globalProperties as LegacyI18nGlobalProperties

  const $t = gp.$t
  const $d = gp.$d
  const $n = gp.$n

  if (!$t || !$d || !$n) {
    throw new Error(
      'vue-i18n global properties not found. Is vue-i18n registered?'
    )
  }

  return { $t, $d, $n }
}
