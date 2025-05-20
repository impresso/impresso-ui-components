import type { Preview } from '@storybook/vue3'
import '../src/assets/legacy/bootstrap-impresso-theme.css'
import '../src/assets/legacy/bootstrap-vue.css'
import '../src/assets/impresso-style.css'

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
