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
        <div class="form-group form-check">
          <input v-model="project.status" type="checkbox" class="form-check-input" id="status" name="status" />
          <label class="form-check-label" for="status">Активный</label>
        </div>

        <button :disabled="isSaving" type="submit" class="btn btn-outline-primary mt-3">
          {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
        </button>
      </form>
    </div>
  </div>
</template>

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
        status: false, // по умолчанию неактивный
      },
      isSaving: false,
    };
  },
  methods: {
    async handleSave() {
      try {
        this.isSaving = true;
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        await createTypeProduct(this.project, headers);
        Swal.fire({
          icon: 'success',
          title: 'Тип продукта успешно сохранен!',
          showConfirmButton: false,
          timer: 1500
        });
        this.isSaving = false;
        this.project = {
          product_name: '',
          quantity_produced: '',
          description: '',
          status: false, // сбросить значение после сохранения
        };
      } catch (error) {
        console.error('Error saving type product:', error);
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

<style scoped>
/* стили */
</style>
