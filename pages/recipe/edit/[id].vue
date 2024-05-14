<template>
    <h2 class="text-center mt-5 mb-3">Изменить рецепт</h2>
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
                        <option v-for="item in typeproducts" :key="item.id" :value="item.id">{{ item.id }}. {{ item.product_name }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="id_raw_material">Название сырья</label>
                    <select v-model="project.id_raw_material" class="form-control form-select" id="id_raw_material"
                        name="id_raw_material">
                        <option v-for="item in rawmaterials" :key="item.id" :value="item.id">{{ item.id }}. {{ item.name }}
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
                    {{ isSaving ? 'Изменение...' : 'Изменить' }}
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2';
import { updateRecipes, getTypeProducts2, getRawMaterials, getRecipe } from '~/services/projectService';

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
                const response = await getRecipe(projectId, headers);
                this.project = response.data.data;

            } catch (error) {
                console.error('Failed to fetch product data:', error);
            }
        },
        async fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`
                };
                const [rawmaterials, typeproducts] = await Promise.all([
                    getRawMaterials(headers),
                    getTypeProducts2(headers)
                ]);
                this.rawmaterials = rawmaterials.data['data'];
                this.typeproducts = typeproducts.data['data'];
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
                await updateRecipes(this.project.id, this.project, headers);
                Swal.fire({
                    icon: 'success',
                    title: 'Рецепт успешно обновлен!',
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
