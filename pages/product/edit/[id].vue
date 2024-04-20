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
          <label for="sellingprice">Цена продажи</label>
          <input v-model="project.selling_price" type="number" class="form-control" id="sellingprice"
            name="sellingprice" />
        </div>
        <div class="form-group">
          <label for="sklad">Склад</label>
          <select v-model="project.id_sklad" class="form-control form-select" id="sklad" name="sklad">
            <option v-for="item in warehouses" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="typeproduct">Тип продукта</label>
          <select v-model="project.id_type_product" class="form-control form-select" id="typeproduct" name="typeproduct">
            <option v-for="item in productTypes" :key="item.id" :value="item.id">{{ item.product_name }}</option>
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
        status: ''
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
    async fetchProduct(productId) {
      try {
        const headers = {
          'Authorization': `Bearer ${this.token}`
        };
        const response = await getProduct(productId, headers);
        //this.project.selling_price = response.data.selling_price;
        this.project=response.data.data;
        console.log(response.data.data);
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
        const headers = {
          'Authorization': `Bearer ${this.token}`
        };
        console.log(this.project.id, this.project,headers);
        await updateProduct(this.project, this.project.id, headers);
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

