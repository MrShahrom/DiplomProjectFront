<template>
    <h2 class="text-center mt-5 mb-3">Изменить поставщика</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/supplier">Все поставщики</NuxtLink>
        </div>
        <div class="card-body">
            <form @submit.prevent="handleSave">
                <div class="form-group">
                    <label for="name">Название</label>
                    <input v-model="project.name" type="text" class="form-control" id="name" name="name" />
                </div>
                <div class="form-group">
                    <label for="address">Адрес</label>
                    <input v-model="project.address" type="text" class="form-control" id="address" name="address" />
                </div>
                <div class="form-group">
                    <label for="phone">Телефон</label>
                    <input v-model="project.phone" type="text" class="form-control" id="phone" name="phone" />
                </div>
                <div class="form-group">
                    <label for="email">Почта</label>
                    <input v-model="project.email" type="text" class="form-control" id="email" name="email" />
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
import { getSupplier, updateSuppliers } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                name: '',
                address: '',
                phone: '',
                email: '',
                status: '',
            },
            isSaving: false,
            token: ''
        };
    },
    async mounted() {
        this.token = localStorage.getItem('token');
        const supplierID = this.$route.params.id;
        await this.fetchProduct(supplierID);
    },
    methods: {
        async fetchProduct(supplierID) {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const response = await getSupplier(supplierID, headers);
                this.project = response.data.data;
            } catch (error) {
                console.error('Failed to fetch supplier data:', error);
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
                await updateSuppliers(this.project.id, this.project, headers);
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