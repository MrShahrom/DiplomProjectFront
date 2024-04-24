<template>
  <div>
    <SidebarLayout />
    <NavbarLayout />

    <section>
      <div class="container2">
        <h2>Таблица сырья</h2>
        <div class="card-body order-table">
          <NuxtLink to="/rawmaterial/create" class="btn btn-primary btn-add">Добавить сырье</NuxtLink>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Ед. из. (кг)</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Валюта</th>
                <th>Поставщик</th>
                <th>Описание</th>
                <th>Дата прихода</th>
                <th>Действие из.</th>
                <th>Действие уд.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id">
                <td>{{ project.id }}</td>
                <td>{{ project.name }}</td>
                <td>{{ project.unit }}</td>
                <td>{{ project.quantity }}</td>
                <td>{{ project.purchase_price }}</td>
                <td>{{ project.units_of_measurement }}</td>
                <td>{{ project.id_supplier.name }}</td>
                <td>{{ project.description }}</td>
                <td>{{ project.date }}</td>
                <td>
                  <NuxtLink :to="`/rawmaterial/edit/${project.id}`" class="btn btn-outline-success mx-1">Изменить</NuxtLink>
                </td>
                <td>
                  <button @click="handleDelete(project.id)" class="btn btn-danger mx-1">Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getRawMaterials, deleteRawMaterials } from '~/services/projectService'
import Swal from 'sweetalert2'

export default {
  layout: 'sidebarLayout',
  components: {
    SidebarLayout,
    NavbarLayout,
  },
  data() {
    return {
      projects: []
    };
  },
  created() {
    if (process.client) {
      this.fetchProjectList();
    }
  },
  methods: {
    async fetchProjectList() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await getRawMaterials(headers);
        this.projects = response.data.data;
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },
    async handleDelete(projectId) {
      const confirmResult = await Swal.fire({
        title: 'Вы уверены?',
        text: 'Вы действительно хотите удалить этот сырье?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена'
      });

      if (confirmResult.isConfirmed) {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
          await deleteRawMaterials(projectId, headers);
          // Успешно удалено
          Swal.fire({
            icon: 'success',
            title: 'Сырье успешно удален!',
            showConfirmButton: false,
            timer: 1500
          });
          // Обновляем список сырья
          this.fetchProjectList();
        } catch (error) {
          // Ошибка удаления
          console.error('Error deleting rawmaterial:', error);
          Swal.fire({
            icon: 'error',
            title: 'Ошибка удаления сырья!',
            text: 'Пожалуйста, попробуйте еще раз.',
            showConfirmButton: true,
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.container2 {
  padding-left: 150px;
  padding-top: 60px;
}

h2 {
  text-align: center;
}

.btn-add {
  margin-bottom: 10px;
}
</style>
