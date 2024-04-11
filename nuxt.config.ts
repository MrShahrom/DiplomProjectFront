// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  router: {
    middleware: ['authenticated'],
    extendRoutes(routes: any[], resolve: any) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/login.vue'),
        meta: { requiresAuth: false } // Указываем, что страница входа не требует авторизации
      });
    }
  },
  devtools: { enabled: true },
  plugins: [
    '~/plugins/redirect.js',
    '~/middleware/auth.js',
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
};
