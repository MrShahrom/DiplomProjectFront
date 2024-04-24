<template>
    <h2 class="text-center mt-5 mb-3">Изменить сырье</h2>
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
                    <input v-model="project.unit" type="text" class="form-control" id="unit" name="unit" />
                </div>
                <div class="form-group">
                    <label for="quantity">Количество</label>
                    <input v-model="project.quantity" type="number" class="form-control" id="quantity"
                        name="quantity" />
                </div>
                <div class="form-group">
                    <label for="purchase_price">Цена</label>
                    <input v-model="project.purchase_price" type="text" class="form-control" id="purchase_price"
                        name="purchase_price" />
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
                    {{ isSaving ? 'Изменение...' : 'Изменить' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { updateRawMaterials, getSuppliers, getRawMaterial } from '~/services/projectService';

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
        const projectId = this.$route.params.id;
        this.fetchProject(projectId);
        this.fetchData();
    },
    methods: {
        async fetchProject(projectId) {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const response = await getRawMaterial(projectId, headers);
                this.project = response.data.data;

                // Получаем список поставщиков
                const suppliersResponse = await getSuppliers(headers);
                this.suppliers = suppliersResponse.data['data'];

                // Находим соответствующего поставщика по ID
                const supplier = this.suppliers.find(supplier => supplier.id === this.project.id_supplier);

                // Присваиваем имя поставщика проекту
                this.project.supplierName = supplier ? supplier.name : '';
            } catch (error) {
                console.error('Failed to fetch project data:', error);
            }
        },
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
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                // Обновляем сырье
                await updateRawMaterials(this.project.id, this.project, headers);
                Swal.fire({
                    icon: 'success',
                    title: 'Сырье успешно обновлено!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.isSaving = false;
            } catch (error) {
                console.error('Error updating raw material:', error);
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
 