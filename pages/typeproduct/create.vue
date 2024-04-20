<template>
    <h2 class="text-center mt-5 mb-3">Добавить тип продукта</h2>
    <div class="card">
      <div class="card-header">
        <NuxtLink class="btn btn-outline-info float-right" to="/typeproduct">Все тип продукты</NuxtLink>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSave">
          <div class="form-group">
            <label for="product_name">Название типа продукта</label>
            <input v-model="project.product_name" type="text" class="form-control" id="product_name" name="nproduct_name" />
          </div>
          <div class="form-group">
            <label for="quantity_produced">Количество производство</label>
            <input v-model="project.quantity_produced" type="number" class="form-control" id="quantity_produced"
              name="quantity_produced" />
          </div>
          <div class="form-group">
            <label for="description">Описание</label>
            <input v-model="project.description" type="text" class="form-control" id="description" name="description" />
          </div>
          <div class="form-group">
            <label for="status">Статус</label>
            <input v-model="project.status" type="text" class="form-control" id="status" name="status" />
          </div>
  
          <button :disabled="isSaving" type="submit" class="btn btn-outline-primary mt-3">
            {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  // create.vue
  <script>
  import Swal from 'sweetalert2';
  import { createTypeProduct } from '~/services/projectService';
  
  export default {
  data() {
    return {
      project: {
        product_name: '',
        quantity_produced: '',
        description: '',
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
      createTypeProduct(this.project, headers)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Тип продукта успешно добавлен!',
            showConfirmButton: false,
            timer: 1500
          });
          this.isSaving = false;
          // Обнуляем поля после успешного сохранения
          this.project.product_name = '';
          this.project.quantity_produced = '';
          this.project.description = '';
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

  