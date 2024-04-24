<template>
    <h2 class="text-center mt-5 mb-3">Добавление склада</h2>
    <div class="card">
      <div class="card-header">
        <NuxtLink class="btn btn-outline-info float-right" to="/sklad">Просмотр всех складов</NuxtLink>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="name">Название</label>
            <input v-model="project.name" type="text" class="form-control" id="name" name="name" />
          </div>
          <div class="form-group">
            <label htmlFor="address">Адрес</label>
            <input v-model="project.address" type="text" class="form-control" id="address" name="address" />
          </div>
          <div class="form-group">
            <label htmlFor="type">Тип склада</label>
            <input v-model="project.type" type="text" class="form-control" id="type" name="type" />
          </div>
          <div class="form-group">
            <label htmlFor="phone">Тел</label>
            <input v-model="project.phone" type="text" class="form-control" id="phone" name="phone" />
          </div>
          <div class="form-group">
            <label htmlFor="status">Статус</label>
            <input v-model="project.status" type="text" class="form-control" id="status" name="status" />
          </div>
          <button @click="handleSave" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
            Добавить склада
          </button>
        </form>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { createSklad } from '~/services/projectService';

export default {
  data() {
    return {
      project: {
        name: '',
        address: '',
        type: '',
        phone: '',
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
      createSklad(this.project, headers)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Склад успешно добавлен!',
            showConfirmButton: false,
            timer: 1500
          });
          this.isSaving = false;
          // Обнуляем поля после успешного сохранения
          this.project.name = '';
          this.project.address = '';
          this.project.type = '';
          this.project.phone = '';
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
