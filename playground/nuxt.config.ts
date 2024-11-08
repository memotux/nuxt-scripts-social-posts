export default defineNuxtConfig({
  extends: ['../'],
  compatibilityDate: '2024-11-06',
  runtimeConfig: {
    public: {
      fbAppId: ''
    }
  },
  future: {
    compatibilityVersion: 4
  }
})