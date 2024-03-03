import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n'
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'it',
        iso: 'it-IT'
      }
    ],
    strategy: 'no_prefix',
    baseUrl: 'https://nuxt-sample.netlify.app',
    defaultLocale: 'en',
  },
  devtools: { 
    enabled: true 
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '~/assets/css/main.scss'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: { 
      apiBase: 'https://dummyjson.com'
    }
  }
});
