<template>
  <h2 class="text-center mt-5 mb-3">Добавление затрат</h2>
  <div class="card">
    <div class="card-header">
      <NuxtLink class="btn btn-outline-info float-right" to="/expense">Просмотр всех затрат</NuxtLink>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label htmlFor="description">Описание</label>
          <input v-model="project.description" type="text" class="form-control" id="description" name="description" />
        </div>
        <div class="form-group">
          <label htmlFor="amount">Сумма</label>
          <input v-model="project.amount" type="text" class="form-control" id="amount" name="amount" />
        </div>
        <div class="form-group">
          <label htmlFor="date">Дата затрат</label>
          <input v-model="project.date" type="datetime-local" class="form-control" id="date" name="date" />
        </div>
        <button @click="handleSave" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
          Добавить затрату
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { createCosts } from '~/services/projectService';

export default {
  data() {
    return {
      project: {
        description: '',
        amount: '',
        date: '',
      },
      isSaving: false,
    };
  },
  methods: {
    getToken() {
      return localStorage.getItem('token');
    },
    async handleSave() {
      this.isSaving = true;
      const token = this.getToken(); // Получаем токен из localStorage
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      try {
        const formattedDate = new Date(this.project.date).toISOString().slice(0, 19).replace('T', ' ');
        await createCosts({ ...this.project, date: formattedDate }, headers);
        Swal.fire({
          icon: 'success',
          title: 'Затрата успешно добавлена!',
          showConfirmButton: false,
          timer: 1500
        });
        this.isSaving = false;
        // Обнуляем поля после успешного сохранения
        this.project.description = '';
        this.project.amount = '';
        this.project.date = '';
      } catch (error) {
        console.error('Error adding costs:', error);
        Swal.fire({
          icon: 'error',
          title: 'Произошла ошибка!',
          showConfirmButton: false,
          timer: 1500
        });
        this.isSaving = false;
      }
    },
  },
};
</script>
