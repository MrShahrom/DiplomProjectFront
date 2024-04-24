<template>
    <h2 class="text-center mt-5 mb-3">Калькулятор расчета себестоимости типа продукта</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/typeproduct">Просмотр всех типов продуктов</NuxtLink>
        </div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="typeproduct">Выберите тип продукта </label>
                    <select v-model="project.productId" class="form-control form-select" id="typeproduct"
                        name="typeproduct">
                        <option v-for="item in productTypes" :key="item.id" :value="item.id">{{ item.product_name }}</option>
                    </select>
                </div>
                <button @click="handleSave" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
                    Рассчитать себестоимость
                </button>
            </form>
        </div>
        <h2>Себестоимость типа продукта</h2>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Тип продукта</th>
                        <th>Себестоимость</th>
                        <th>Валюта</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="projects.length === 0">
                        <td colspan="3" class="text-center">Нет данных</td>
                    </tr>
                    <tr v-else v-for="(pro, index) in projects" :key="index">
                        <td>{{ pro.typeProduct }}</td>
                        <td>{{ pro.summa }}</td>
                        <td>{{ pro.val}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { getOtchet, getTypeProducts } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                productId: '',
            },
            isSaving: false,
            productTypes: [],
            projects: [],
            token: ''
        };
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const [productTypes] = await Promise.all([
                    getTypeProducts(this.token)
                ]);
                this.productTypes = productTypes.data['data'];
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        },
        getToken() {
            return localStorage.getItem('token');
        },
        
        handleSave() {
            this.isSaving = true;
            const token = this.getToken();
            getOtchet(this.project.productId, token)
                .then(response => {
                    let productName = this.productTypes.find(item => this.project.productId == item.id);
                    var element = {
                        typeProduct: productName['product_name'],
                        summa: response.data,
                        val: 'сомони'
                    };
                    this.projects.push(element);
                    Swal.fire({
                        icon: 'success',
                        title: 'Себестоимость рассчитана!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    console.error('Error calculating cost:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Произошла ошибка!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .finally(() => {
                    this.isSaving = false;
                });
        },
    },
};
</script>
