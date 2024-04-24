<template>
    <h2 class="text-center mt-5 mb-3">Изменить склада</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/sklad">Все склады</NuxtLink>
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
                    <label for="type">Тип склада</label>
                    <input v-model="project.type" type="text" class="form-control" id="type" name="type" />
                </div>
                <div class="form-group">
                    <label for="phone">Телефон</label>
                    <input v-model="project.phone" type="text" class="form-control" id="phone" name="phone" />
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
import { getTySklad, updateSklad } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                name: '',
                address: '',
                type: '',
                phone: '',
                status: '',
            },
            isSaving: false,
            token: ''
        };
    },
    async mounted() {
        this.token = localStorage.getItem('token');
        const clientID = this.$route.params.id;
        await this.fetchProduct(clientID);
    },
    methods: {
        async fetchProduct(clientID) {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const response = await getTySklad(clientID, headers);
                this.project = response.data.data;
            } catch (error) {
                console.error('Failed to fetch sklad data:', error);
            }
        },

        async handleSave() {
            try {
                this.isSaving = true;
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                await updateSklad(this.project.id, this.project, headers);
                Swal.fire({
                    icon: 'success',
                    title: 'Склад успешно обновлен!',
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