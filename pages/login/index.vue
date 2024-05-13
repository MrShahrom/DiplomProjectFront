<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <!-- Вставляем логотип здесь -->
          <div class="logo text-center mb-3">
            <img src="" alt="Логотип">
          </div>
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Вход в систему</h5>
            <form @submit.prevent="login">
              <div class="form-floating mb-3">
                <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Эл.почта</label>
              </div>
              <div class="form-floating mb-3">
                <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Пароль">
                <label for="floatingPassword">Пароль</label>
              </div>

              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" v-model="rememberPassword" id="rememberPasswordCheck">
                <label class="form-check-label" for="rememberPasswordCheck">
                  Запомнить пароль
                </label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Войти</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { createlogin } from '~/services/projectService'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberPassword: false
    };
  },
  created() {
    // При загрузке страницы проверяем, есть ли сохраненные данные
    if (process.client) {
      const savedEmail = sessionStorage.getItem('savedEmail');
      const savedPassword = sessionStorage.getItem('savedPassword');
      if (savedEmail && savedPassword) {
        this.email = savedEmail;
        this.password = savedPassword;
        this.rememberPassword = true; // Установка флага "Запомнить пароль"
      }
    }
  },
  methods: {
    login() {
      if (process.client) {
        // Отправляем данные на сервер для входа пользователя
        createlogin({ email: this.email, password: this.password })
          .then(response => {
            // Обработка успешного входа
            console.log(response);
            localStorage.setItem('token', response.data.access_token);
            // Если пользователь отметил "Запомнить пароль", сохраняем его данные
            if (this.rememberPassword) {
              sessionStorage.setItem('savedEmail', this.email);
              sessionStorage.setItem('savedPassword', this.password);
            } else {
              // Если флажок не установлен, удаляем сохраненные данные
              sessionStorage.removeItem('savedEmail');
              sessionStorage.removeItem('savedPassword');
            }
            this.$router.push('/dashboard');
          })
          .catch(error => {
            // Обработка ошибки входа
            console.error(error);
            Swal.fire({
              title: 'Ошибка входа',
              text: 'Проверьте правильность введенных данных',
              icon: 'error'
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}
</style>
