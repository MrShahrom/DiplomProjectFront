<template>
    <h2 class="text-center mt-5 mb-3">Добавление клиента</h2>
    <div class="card">
      <div class="card-header">
        <NuxtLink class="btn btn-outline-info float-right" to="/customer">Просмотр всех клиентов</NuxtLink>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="lastname">Фамилия</label>
            <input v-model="project.lastname" type="text" class="form-control" id="lastname" name="lastname" />
          </div>
          <div class="form-group">
            <label htmlFor="firstname">Имя</label>
            <input v-model="project.firstname" type="text" class="form-control" id="firstname" name="firstname" />
          </div>
          <div class="form-group">
            <label htmlFor="patronymic">Отчество</label>
            <input v-model="project.patronymic" type="text" class="form-control" id="patronymic" name="patronymic" />
          </div>
          <div class="form-group">
            <label htmlFor="address">Адрес</label>
            <input v-model="project.address" type="text" class="form-control" id="address" name="address" />
          </div>
          <div class="form-group">
            <label htmlFor="phone">Тел</label>
            <input v-model="project.phone" type="text" class="form-control" id="phone" name="phone" />
          </div>
          <div class="form-group">
            <label htmlFor="email">Эл.почта</label>
            <input v-model="project.email" type="email" class="form-control" id="email" name="email" />
          </div>
          <div class="form-group">
            <label htmlFor="status">Статус</label>
            <input v-model="project.status" type="text" class="form-control" id="status" name="status" />
          </div>
          <button @click="handleSave" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
            Добавить клиента
          </button>
        </form>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { createClients } from '~/services/projectService';

export default {
  data() {
    return {
      project: {
        lastname: '',
        firstname: '',
        patronymic: '',
        address: '',
        phone: '',
        email: '',
        status: '',
      },
      isSaving: false,
    };
  },
  methods: {
    getToken() {
      return localStorage.getItem('token');
    },
    handleSave() {
      this.isSaving = true;
      const token = this.getToken(); // Получаем токен из localStorage
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      createClients(this.project, headers)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Клиент успешно добавлен!',
            showConfirmButton: false,
            timer: 1500
          });
          this.isSaving = false;
          // Обнуляем поля после успешного сохранения
          this.project.lastname = '';
          this.project.firstname = '';
          this.project.patronymic = '';
          this.project.address = '';
          this.project.phone = '';
          this.project.email = '';
          this.project.status = '';
          return response;
        })
        .catch(error => {
          this.isSaving = false;
          Swal.fire({
            icon: 'error',
            title: 'Произошла ошибка!',
            showConfirmButton: false,
            timer: 1500
          });
          return error;
        });
    },
  },
};
</script>
