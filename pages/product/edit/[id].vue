<template>
  <h2 class="text-center mt-5 mb-3">Изменить продукт</h2>
  <div class="card">
    <div class="card-header">
      <NuxtLink class="btn btn-outline-info float-right" to="/product">Все продукты</NuxtLink>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label for="name">Название</label>
          <input v-model="project.name" type="text" class="form-control" id="name" name="name" />
        </div>
        <div class="form-group">
          <label for="image">Рисунок</label>
          <input type="file" @change="handleImageChange" class="form-control" id="image" name="image"
            accept="image/*" />
          <!-- Предварительный просмотр изображения -->
          <img :src="project.image" v-if="project.image" alt="Preview" style="max-width: 100%; margin-top: 10px;" />
        </div>
        <div class="form-group">
          <label for="sellingprice">Цена продажи</label>
          <input v-model="project.selling_price" type="number" class="form-control" id="sellingprice"
            name="sellingprice" />
        </div>
        <div class="form-group">
          <label for="sklad">Склад</label>
          <select v-model="project.id_sklad" class="form-control form-select" id="sklad" name="sklad">
            <option v-for="item in warehouses" :key="item.id" :value="item.id">{{ item.id }}. {{ item.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="typeproduct">Тип продукта</label>
          <select v-model="project.id_type_product" class="form-control form-select" id="typeproduct"
            name="typeproduct">
            <option v-for="item in productTypes" :key="item.id" :value="item.id">{{ item.id }}. {{ item.product_name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="quantity">Количество</label>
          <input v-model="project.quantity" type="number" class="form-control" id="quantity" name="quantity" />
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
import { updateProduct, getSklads, getTypeProducts, getProduct } from '~/services/projectService';

export default {
  data() {
    return {
      project: {
        name: '',
        selling_price: '',
        id_sklad: '',
        id_type_product: '',
        quantity: '',
        status: '',
        image: '', // Добавлено свойство для изображения
      },
      isSaving: false,
      warehouses: [],
      productTypes: [],
      token: ''
    };
  },
  async mounted() {
    this.token = localStorage.getItem('token');
    const productId = this.$route.params.id;
    await this.fetchProduct(productId);
    await this.fetchData();
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Создаем объект FileReader
        const reader = new FileReader();

        // Обработчик загрузки файла
        reader.onload = (e) => {
          // Устанавливаем предварительный просмотр изображения
          this.project.image = e.target.result;
        };

        // Читаем файл как URL-адрес данных
        reader.readAsDataURL(file);

        // Сохраняем файл в переменной проекта
        this.project.imageFile = file;
      }
    },

    async fetchProduct(productId) {
      try {
        const headers = {
          'Authorization': `Bearer ${this.token}`
        };
        const response = await getProduct(productId, headers);
        this.project = response.data.data;
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      }
    },

    async fetchData() {
      try {
        const headers = {
          'Authorization': `Bearer ${this.token}`
        };
        const [warehousesResponse, productTypesResponse] = await Promise.all([
          getSklads(this.token),
          getTypeProducts(this.token)
        ]);
        this.warehouses = warehousesResponse.data.data;
        this.productTypes = productTypesResponse.data.data;
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },

    async handleSave() {
      try {
        this.isSaving = true;

        const formData = new FormData();
        formData.append('name', this.project.name);
        formData.append('image', this.project.imageFile); // Отправляем файл, а не URL
        formData.append('selling_price', this.project.selling_price);
        formData.append('id_sklad', this.project.id_sklad);
        formData.append('id_type_product', this.project.id_type_product);
        formData.append('quantity', this.project.quantity);
        formData.append('status', this.project.status);

        const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data'
        };

        await updateProduct(formData, this.project.id, headers);

        Swal.fire({
          icon: 'success',
          title: 'Продукт успешно обновлен!',
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
