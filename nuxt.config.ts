// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
  devtools: { enabled: true },
  router: {
    middleware: ['authenticated'],
  },
  css: [
    'bootstrap/dist/css/bootstrap.css',
  ],
  js: [
    'middleware/authenticated.js',
  ],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8000/',
      apiKey: ''
    }
  },
};
