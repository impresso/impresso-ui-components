import { fileURLToPath } from 'url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { loadEnv } from 'vite'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    // Load env variables
    const env = loadEnv(configType?.toLowerCase() || '', process.cwd(), '')
    console.log('Loaded environment variables:')
    console.log(' env.VITE_EXAMPLE_AUDIO_SRC:', env.VITE_EXAMPLE_AUDIO_SRC)
    // get which env file has been avaluated
    console.log('Using environment file:', configType)
    config.plugins = [
      ...(config.plugins || []),
      VueI18nPlugin({
        include: path.resolve(dirname, '../src/**/*.vue'),
        runtimeOnly: false,
        compositionOnly: false,
      }),
    ]
    return config
  },
}

export default config
