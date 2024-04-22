
export default {
  devtools: { enabled: true },
  router: {
    middleware: ['authenticated'],
  },
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  js: [
    'middleware/authenticated.js',
  ],
  script: [
    { src: '@fortawesome/fontawesome-free/js/all.js', defer: true },
    { src: 'bootstrap/dist/js/bootstrap.bundle.min.js', defer: true },
  ],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8000/',
      apiKey: ''
    }
  },
};
