import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createI18n } from 'vue-i18n'
import { h } from 'vue'
import '../src/assets/legacy/bootstrap-impresso-theme.css'
import '../src/assets/legacy/bootstrap-vue.css'
import '../src/assets/impresso-style.css'

// Create a basic i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {},
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
    },
  },
})

setup((app) => {
  app.use(i18n)
  // app.use(router)
  app.component('RouterLink', {
    props: ['to'],
    render() {
      // Render a basic <a> tag as a stub
      return h('a', { href: this.to }, this.$slots.default?.())
    },
  })
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
