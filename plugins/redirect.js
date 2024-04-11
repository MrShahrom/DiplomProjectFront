export default function ({ $router }) {
  $router.afterEach((to, from) => {
    // Проверяем, если текущий путь - '/', то делаем редирект на '/your-custom-path'
    if (to.path === '/') {
      $router.push('/your-custom-path')
    }
  })
}