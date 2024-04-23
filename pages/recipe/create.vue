<template>
    <h2 class="text-center mt-5 mb-3">Добавить рецепт</h2>
    <div class="card">
        <div class="card-header">
            <NuxtLink class="btn btn-outline-info float-right" to="/recipe">Все рецепты</NuxtLink>
        </div>
        <div class="card-body">
            <form @submit.prevent="handleSave">
                <div class="form-group">
                    <label for="id_type_product">Название тип продукта</label>
                    <select v-model="project.id_type_product" class="form-control form-select" id="id_type_product"
                        name="id_type_product">
                        <option v-for="item in typeproducts" :key="item.id" :value="item.id">{{ item.id }}. {{ item.name }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="id_raw_material">Название сырья</label>
                    <select v-model="project.id_raw_material" class="form-control form-select" id="id_raw_material"
                        name="id_raw_material">
                        <option v-for="item in rawmaterials" :key="item.id" :value="item.id">{{ item.id }}. {{ item.product_name }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="unit">Ед. измерения (кг)</label>
                    <input v-model="project.unit" type="text" class="form-control" id="unit" name="unit" />
                </div>
                <div class="form-group">
                    <label for="quantity">Количество</label>
                    <input v-model="project.quantity" type="number" class="form-control" id="quantity"
                        name="quantity" />
                </div>
                <div class="form-group">
                    <label for="description">Описание</label>
                    <input v-model="project.description" type="text" class="form-control" id="description"
                        name="description" />
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
import { createRecipes, getRawMaterials, getTypeProducts2 } from '~/services/projectService';

export default {
    data() {
        return {
            project: {
                id_type_product: '',
                id_raw_material: '',
                unit: '',
                quantity: '',
                description: '',
            },
            isSaving: false,
            typeproducts: [],
            rawmaterials: [],
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
                // Получаем данные о сырье и тип продуктах с передачей токена
                const [typeproducts, rawmaterials] = await Promise.all([
                    getRawMaterials(headers),
                    getTypeProducts2(headers)
                ]);

                this.typeproducts = typeproducts.data['data'];
                this.rawmaterials = rawmaterials.data['data'];
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        },

        async handleSave() {
            try {
                this.isSaving = true;
                // Передаем токен при создании заказа
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                await createRecipes(this.project, headers);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Рецепт успешно сохранен!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.isSaving = false;
                // Очищаем данные формы после сохранения
                this.project = {
                    id_type_product: '',
                    id_raw_material: '',
                    unit: '',
                    quantity: '',
                    description: '',
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

<style scoped>
/* стили */
</style>
