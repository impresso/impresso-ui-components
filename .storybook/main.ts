import { fileURLToPath } from 'url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins || []),
      VueI18nPlugin({
        include: path.resolve(__dirname, '../src/**/*.vue'),
        runtimeOnly: false,
        compositionOnly: false,
      }),
    ]
    return config
  },
}

export default config
