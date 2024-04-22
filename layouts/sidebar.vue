<template>

  <aside class="main-sidebar">
    <section class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel" id="user-panel">
        <div class="pull-left info">
          <p>ЧДММ "Чавонони Сугд"</p>
          <!-- <p>{{ username }}</p> -->
        </div>
      </div>
      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li><nuxt-link to="/dashboard"><i class="fa fa-dashboard "></i> <span>Главная</span></nuxt-link></li>
        <li><nuxt-link to="/typeproduct"><i class="fa fa-list"></i> <span>Тип продукты</span></nuxt-link></li>
        <li><nuxt-link to="/product"><i class="fa fa-cubes"></i> <span>Продукты</span></nuxt-link></li>
        <li><nuxt-link to="/customer"><i class="fa fa-users"></i> <span>Клиенты</span></nuxt-link></li>
        <li><nuxt-link to="/supplier"><i class="fa fa-truck"></i> <span>Поставщики</span></nuxt-link></li>
        <li><nuxt-link to="/order"><i class="fas fa-shopping-basket"></i> <span>Заказы</span></nuxt-link></li>
        <li><nuxt-link to="/expense"><i class="fa fa-minus"></i> <span>Затраты</span></nuxt-link></li>
        <li><nuxt-link to="/recipe"><i class="fas fa-book"></i> <span>Рецепты</span></nuxt-link></li>
        <li><nuxt-link to="/rawmaterial"><i class="fa fa-seedling"></i> <span>Сырье</span></nuxt-link></li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>

</template>

<script>
export default {
  data() {
    return {
      // userProfile: require('@/assets/user-profile.png'), // Замените на путь к изображению профиля пользователя
      username: 'Admin' // Здесь можете указать имя пользователя
    }
  }
}
</script>

<style scoped>

  /* Стили для боковой панели */
  .main-sidebar {
    width: 260px;
    background-color: #2b333e;
    color: #fff;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto; /* Добавляем прокрутку, если содержимое не помещается */
    z-index: 1000; /* Убеждаемся, что боковая панель находится выше других элементов */
  }

  .sidebar {
    padding-top: 20px; /* Добавляем отступ сверху */
  }

  .user-panel {
    padding: 20px;
    border-bottom: 1px solid #3c4858; /* Добавляем разделительную линию */
  }

  .user-panel .image img {
    width: 50px;
    height: 50px;
    border-radius: 50%; /* Делаем изображение круглым */
    object-fit: cover;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Добавляем тень для изображения */
  }

  .user-panel .info {
    margin-left: 10px;
  }

  .user-panel p {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5); /* Добавляем тень для текста */
  }

  .user-panel a {
    color: #b2bec3;
    text-decoration: none;
  }

  .sidebar-menu {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /* Стили для пунктов меню */
  .sidebar-menu li {
    margin-bottom: 10px; /* Отступ между пунктами меню */
  }

  .sidebar-menu li a {
    color: #b2bec3; /* Цвет текста ссылок */
    text-decoration: none; /* Убираем подчеркивание ссылок */
    display: block; /* Блочный элемент */
    padding: 10px; /* Отступы вокруг текста ссылок */
    border-radius: 3px; /* Закругление углов ссылок */
    transition: background-color 0.3s; /* Плавный переход цвета фона */
  }

  .sidebar-menu li a:hover {
    background-color: #3c4858; /* Цвет фона при наведении */
  }

  /* Бургер-меню для мобильных устройств */
  @media (max-width: 991px) {
    .main-sidebar {
      width: 60px; /* Уменьшаем ширину боковой панели */
    }
    .sidebar-menu li span {
      display: none; /* Скрываем текст в пунктах меню */
    }
    .sidebar-menu li a {
      padding: 10px 0; /* Уменьшаем вертикальные отступы */
      text-align: center; /* Выравниваем текст по центру */
    }
    #user-panel {
      display: none;
    }
  }
  
</style>
