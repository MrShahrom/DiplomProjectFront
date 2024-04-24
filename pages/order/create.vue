<!-- create.vue -->
<template>
    <h2 class="text-center mt-5 mb-3">Добавить заказ</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/order">Все заказы</NuxtLink>
        </div>
        <div class="card-body">
            <form @submit.prevent="handleSave">
                <div class="form-group">
                    <label for="id_client">ФИО</label>
                    <select v-model="project.id_client" class="form-control form-select" id="id_client"
                        name="id_client">
                        <option v-for="item in clients" :key="item.id" :value="item.id">{{ item.id }}. {{ item.lastname }} {{ item.firstname }} {{ item.patronymic }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="id_product">Продукт</label>
                    <select v-model="project.id_product" class="form-control form-select" id="id_product"
                        name="id_product">
                        <option v-for="item in products" :key="item.id" :value="item.id">{{ item.id }}. {{ item.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="date_of_shipment">Дата заказа</label>
                    <input v-model="project.date_of_shipment" type="datetime-local" class="form-control"
                        id="date_of_shipment" name="date_of_shipment" />
                </div>
                <div class="form-group">
                    <label for="units_of_measurement">Валюта</label>
                    <input v-model="project.units_of_measurement" type="text" class="form-control"
                        id="units_of_measurement" name="units_of_measurement" />
                </div>
                <div class="form-group">
                    <label for="price_per_unit">Цена за единицу</label>
                    <input v-model="project.price_per_unit" type="text" class="form-control" id="price_per_unit"
                        name="price_per_unit" />
                </div>
                <div class="form-group">
                    <label for="quantity">Количество</label>
                    <input v-model="project.quantity" type="number" class="form-control" id="quantity"
                        name="quantity" />
                </div>
                <div class="form-group">
                    <label for="total_amount">Общая сумма</label>
                    <input v-model="project.total_amount" type="text" class="form-control" id="total_amount"
                        name="total_amount" />
                </div>
                <div class="form-group">
                    <label for="type_of_sale">Тип заказа</label>
                    <input v-model="project.type_of_sale" type="text" class="form-control" id="type_of_sale"
                        name="type_of_sale" />
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
import { createProject, getClients, getProducts } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                id_client: '',
                id_product: '',
                date_of_shipment: '',
                units_of_measurement: '',
                price_per_unit: '',
                total_amount: '',
                quantity: '',
                type_of_sale: '',
            },
            isSaving: false,
            clients: [],
            products: [],
            token: ''
        };
    },
    mounted() {
        // Получаем токен из localStorage
        this.token = localStorage.getItem('token');
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                // Получаем данные о клиентах и продуктах с передачей токена
                const [clients, products] = await Promise.all([
                    getClients(headers),
                    getProducts(headers)
                ]);

                this.clients = clients.data['data'];
                this.products = products.data['data'];
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },

        async handleSave() {
            try {
                const formattedDate = this.formatDate(this.project.date_of_shipment);
                this.project.date_of_shipment = formattedDate;

                this.isSaving = true;
                // Передаем токен при создании заказа
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                await createProject(this.project, headers);
                Swal.fire({
                    icon: 'success',
                    title: 'Заказ успешно сохранен!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.isSaving = false;
                // Очищаем данные формы после сохранения
                this.project = {
                    id_client: '',
                    id_product: '',
                    date_of_shipment: '',
                    units_of_measurement: '',
                    price_per_unit: '',
                    total_amount: '',
                    quantity: '',
                    type_of_sale: '',
                };
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
