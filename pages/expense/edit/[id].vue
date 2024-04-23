<template>
    <h2 class="text-center mt-5 mb-3">Изменить затрату</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/expense">Все затраты</NuxtLink>
        </div>
        <div class="card-body">
            <form @submit.prevent="handleSave">
                <div class="card-body">
                    <div class="form-group">
                        <label htmlFor="description">Описание</label>
                        <input v-model="project.description" type="text" class="form-control" id="description"
                            name="description" />
                    </div>
                    <div class="form-group">
                        <label htmlFor="amount">Сумма</label>
                        <input v-model="project.amount" type="text" class="form-control" id="amount" name="amount" />
                    </div>
                    <div class="form-group">
                        <label htmlFor="date">Дата затрат</label>
                        <input v-model="project.date" type="datetime-local" class="form-control" id="date"
                            name="date" />
                    </div>
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
import { getCost, updateCosts } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                description: '',
                amount: '',
                date: '',
            },
            isSaving: false,
            token: ''
        };
    },
    async mounted() {
        this.token = localStorage.getItem('token');
        const expenseID = this.$route.params.id;
        await this.fetchExpense(expenseID);
    },
    methods: {
        async fetchExpense(expenseID) {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const response = await getCost(expenseID, headers);
                this.project = response.data.data;
            } catch (error) {
                console.error('Failed to fetch expense data:', error);
            }
        },

        async handleSave() {
            try {
                this.isSaving = true;
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const formattedDate = new Date(this.project.date).toISOString().slice(0, 19).replace('T', ' ');
                await updateCosts(this.project.id, { ...this.project, date: formattedDate }, headers);
                Swal.fire({
                    icon: 'success',
                    title: 'Затрата успешно обновлена!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.isSaving = false;
            } catch (error) {
                console.error('Error saving expense:', error);
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
