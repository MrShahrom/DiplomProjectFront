// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig ({
  devtools: { enabled: true },
  plugins: [
    
  ],
  css: [
    'bootstrap/dist/css/bootstrap.css',
  ],
  runtimeConfig: {
    public: {
      apiUrl:'http://localhost:8000/',
      apiKey:''
    }
  },
})
