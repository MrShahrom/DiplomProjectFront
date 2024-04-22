<template>
  <SidebarLayout>
  </SidebarLayout>

  <NavbarLayout>
  </NavbarLayout>

  <section>
    <div class="container2">
      <h2>Таблица клиентов</h2>
      <div class="card-body order-table">
        <NuxtLink to="/customer/create" class="btn btn-primary btn-add">Добавить клиента</NuxtLink>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
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
              <td>{{ `${project.lastname} ${project.firstname} ${project.patronymic}` }}</td>
              <td>{{ project.address }}</td>
              <td>{{ project.phone }}</td>
              <td>{{ project.email }}</td>
              <td>{{ project.status }}</td>
              <td>
                <NuxtLink :to="`/customer/edit/${project.id}`" class="btn btn-outline-success mx-1">Изменить</NuxtLink>
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
</template>

<script>
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getClients, deleteClient } from '~/services/projectService'
import Swal from 'sweetalert2';

export default {
  layout: 'sidebarLayout',
  layout: 'navbarLayout',
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

        getClients(headers)
          .then(response => {
            this.projects = response.data["data"];
            // console.log(response.data["data"])
          })
          .catch(error => {
            if (error.response) {
              console.error('Status code:', error.response.status);
              console.error('Response data:', error.response.data);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              console.error('No response received:', error.request);
            } else {
              console.error('Error setting up request:', error.message);
            }
          });
      } else {
        console.error('Trying to access localStorage on the server side.');
      }
    },

    async handleDelete(clientId) {
      const confirmResult = await Swal.fire({
        title: 'Вы уверены?',
        text: 'Вы действительно хотите удалить этого клиента?',
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
          await deleteClient(clientId, headers);

          // Успешно удалено
          Swal.fire({
            icon: 'success',
            title: 'Клиент успешно удален!',
            showConfirmButton: false,
            timer: 1500
          });
          // Обновляем список клиентов
          this.fetchProjectList();
        } catch (error) {
          // Ошибка удаления
          console.error('Error deleting client:', error);
          Swal.fire({
            icon: 'error',
            title: 'Ошибка удаления клиента!',
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
