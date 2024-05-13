<!-- create.vue -->
<template>
    <h2 class="text-center mt-5 mb-3">Добавить сырье</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/rawmaterial">Все сырье</NuxtLink>
        </div>
        <div class="card-body">
            <form @submit.prevent="handleSave">
                <div class="form-group">
                    <label for="name">Название</label>
                    <input v-model="project.name" type="text" class="form-control" id="name" name="name" />
                </div>
                <div class="form-group">
                    <label for="unit">Ед. из. (кг)</label>
                    <select v-model="project.unit" class="form-control" id="unit" name="unit">
                        <option value="кг">кг</option>
                        <option value="г">грамм</option>
                        <option value="т">тонна</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="quantity">Количество</label>
                    <input v-model="project.quantity" type="number" class="form-control" id="quantity"
                        name="quantity" />
                </div>
                <div class="form-group">
                    <label for="purchase_price">Цена</label>
                    <input v-model="project.purchase_price" type="number" step="0.2" class="form-control"
                        id="purchase_price" name="purchase_price" />
                </div>
                <div class="form-group">
                    <label for="units_of_measurement">Валюта</label>
                    <input v-model="project.units_of_measurement" type="text" class="form-control"
                        id="units_of_measurement" name="units_of_measurement" />
                </div>
                <div class="form-group">
                    <label for="id_supplier">Поставщик</label>
                    <select v-model="project.id_supplier" class="form-control form-select" id="id_supplier"
                        name="id_supplier">
                        <option v-for="item in suppliers" :key="item.id" :value="item.id">{{ item.id }}. {{ item.name }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Описание</label>
                    <input v-model="project.description" type="text" class="form-control" id="description"
                        name="description" />
                </div>
                <div class="form-group">
                    <label for="date">Дата прихода</label>
                    <input v-model="project.date" type="datetime-local" step="1" class="form-control" id="date"
                        name="date" />

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

<script>
import Swal from 'sweetalert2';
import { createRawMaterials, getSuppliers } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                name: '',
                unit: '',
                quantity: '',
                purchase_price: '',
                units_of_measurement: '',
                id_supplier: '',
                description: '',
                date: '',
                status: '',
            },
            isSaving: false,
            suppliers: [],
            token: ''
        };
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.fetchData();
    },
    computed: {
        formattedDate() {
            if (!this.project.date) return ''; // Проверка на случай пустой даты
            const date = new Date(this.project.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    },
    methods: {
        async fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const [suppliers] = await Promise.all([
                    getSuppliers(headers),
                ]);

                this.suppliers = suppliers.data['data'];
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        },

        async handleSave() {
            try {
                this.isSaving = true;
                // Форматирование даты
                const formattedDate = this.formattedDate;
                this.project.date = formattedDate;
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                await createRawMaterials(this.project, headers);
                Swal.fire({
                    icon: 'success',
                    title: 'Сырье успешно сохранен!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.isSaving = false;
                this.project = {
                    name: '',
                    unit: '',
                    quantity: '',
                    purchase_price: '',
                    units_of_measurement: '',
                    id_supplier: '',
                    description: '',
                    date: '',
                    status: '',
                };
            } catch (error) {
                console.error('Error saving rawmaterial:', error);
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