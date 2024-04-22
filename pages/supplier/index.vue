<template>
  <SidebarLayout>
  </SidebarLayout>

  <NavbarLayout>
  </NavbarLayout>

  <section>
    <div class="container2">
      <h2>Таблица поставщиков</h2>
      <div class="card-body order-table">
        <NuxtLink to="/supplier/create" class="btn btn-primary btn-add">Добавить поставщика</NuxtLink>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Адрес</th>
              <th>Телефон</th>
              <th>Почта</th>
              <th>Статус</th>
              <th>Действие из.</th>
              <th>Действие уд.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.address }}</td>
              <td>{{ project.phone }}</td>
              <td>{{ project.email }}</td>
              <td>{{ project.status }}</td>
              <td>
                <NuxtLink :to="`/supplier/edit/${project.id}`" class="btn btn-outline-success mx-1">Изменить</NuxtLink>
              </td>
              <td>
                <button @click="handleDelete(project.id)" className="btn btn-danger mx-1">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>



</template>

<script>
import Swal from 'sweetalert2';
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getSuppliers, deleteSuppliers } from '~/services/projectService' // Обновленный импорт

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
    fetchProjectList() {
      if (process.client) {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in local storage');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`
        };

        getSuppliers(headers)
          .then(response => {
            this.projects = response.data["data"];
          })
          .catch(error => {
            console.error('Error fetching suppliers:', error);
          });
      } else {
        console.error('Trying to access localStorage on the server side.');
      }
    },

    async handleDelete(supplierId) {
      const confirmResult = await Swal.fire({
        title: 'Вы уверены?',
        text: 'Вы действительно хотите удалить этого поставщика?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена'
      });

      if (confirmResult.isConfirmed) {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        try {
          await deleteSuppliers(supplierId, headers);

          Swal.fire({
            icon: 'success',
            title: 'Поставщик успешно удален!',
            showConfirmButton: false,
            timer: 1500
          });
          // Обновляем список поставщиков
          this.fetchProjectList();
        } catch (error) {
          console.error('Error deleting supplier:', error);
          Swal.fire({
            icon: 'error',
            title: 'Ошибка удаления поставщика!',
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