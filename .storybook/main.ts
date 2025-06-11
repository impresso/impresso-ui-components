import { fileURLToPath } from 'url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
try {
  let __filename = fileURLToPath(import.meta.url)
  let __dirname = path.dirname(__filename)
} catch (error) {}

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
