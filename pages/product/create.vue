<template>
  <h2 class="text-center mt-5 mb-3">Добавить продукта</h2>
  <div class="card">
    <div class="card-header">
      <NuxtLink class="btn btn-outline-info float-right" to="/product">Все продукты
      </NuxtLink>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label htmlFor="name">Название</label>
          <input v-model="project.name" type="text" class="form-control" id="name" name="name" />
        </div>
        <div class="form-group">
          <label htmlFor="sellingprice">Цена продажи</label>
          <input v-model="project.sellingprice" type="text" class="form-control" id="sellingprice"
            name="sellingprice" />
        </div>
        <div class="form-group">
          <label htmlFor="sklad">Склад</label>
          <input v-model="project.sklad" type="text" class="form-control" id="sklad" name="sklad" />
        </div>
        <div class="form-group">
          <label htmlFor="typeproduct">Тип продукта</label>
          <input v-model="project.typeproduct" type="text" class="form-control" id="typeproduct" name="typeproduct" />
        </div>
        <div class="form-group">
          <label htmlFor="quantity">Количество</label>
          <input v-model="project.quantity" type="text" class="form-control" id="quantity" name="quantity" />
        </div>
        <div class="form-group">
          <label htmlFor="status">Статус</label>
          <input v-model="project.status" type="text" class="form-control" id="status" name="status" />
        </div>

        <button @click="handleSave" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
          Save Project
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { createProduct } from '~/services/projectService';
import axios from 'axios'; // Добавляем импорт axios

export default {
  data() {
    return {
      project: {
        name: '',
        sellingprice: '',
        sklad: '',
        typeproduct: '',
        quantity: '',
        status: ''
      },
      isSaving: false,
    };
  },
  methods: {
    handleSave() {
      // Извлечение токена из localStorage
      const token = localStorage.getItem('token');

      // Проверка наличия токена
      if (!token) {
        // Если токен отсутствует, выполните действие, например, перенаправление на страницу входа
        console.error('Token not found');
        return;
      }

      // Установка токена в заголовке Authorization
      const headers = {
        Authorization: `Bearer ${token}`
      };

      // Установка заголовков для axios
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: headers
      });

      // Отправка запроса на сервер с использованием axiosInstance
      this.isSaving = true;
      axiosInstance.post('/products', this.project)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Project saved successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.isSaving = false;
          this.project.name = "";
          this.project.sellingprice = "";
          this.project.sklad = "";
          this.project.typeproduct = "";
          this.project.quantity = "";
          this.project.status = "";
          return response;
        })
        .catch(error => {
          this.isSaving = false;
          Swal.fire({
            icon: 'error',
            title: 'An Error Occured!',
            showConfirmButton: false,
            timer: 1500
          })
          return error;
        });
    },
  },
};
</script>
