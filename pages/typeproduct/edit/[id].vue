<template>
    <h2 class="text-center mt-5 mb-3">Изменить тип продукта</h2>
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
            {{ isSaving ? 'Изменение...' : 'Изменить' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import Swal from 'sweetalert2';
import { getTypeProduct, updateTypeProduct } from '~/services/projectService';

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
      token: ''
    };
  },
  async mounted() {
    this.token = localStorage.getItem('token');
    const productId = this.$route.params.id;
    await this.fetchProduct(productId);
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const headers = {
          'Authorization': `Bearer ${this.token}`
        };
        const response = await getTypeProduct(productId, headers);
        this.project = response.data.data;
      } catch (error) {
        console.error('Failed to fetch typeproduct data:', error);
      }
    },
    
    async handleSave() {
      try {
        this.isSaving = true;
        const headers = {
          'Authorization': `Bearer ${this.token}`
        };
        console.log(this.project.id);
        console.log(this.project);
        console.log(headers);
        await updateTypeProduct(this.project.id, this.project, headers);
        Swal.fire({
          icon: 'success',
          title: 'Тип продукта успешно обновлен!',
          showConfirmButton: false,
          timer: 1500
        });
        this.isSaving = false;
      } catch (error) {
        console.error('Error saving product:', error);
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
  