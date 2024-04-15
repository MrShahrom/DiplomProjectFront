<template>
  <SidebarLayout>
  </SidebarLayout>

  <NavbarLayout>
  </NavbarLayout>

  <section>
    <div class="container2">
      <h2>Таблица продуктов</h2>
      <div class="card-body order-table">
        <NuxtLink to="/create" class="btn btn-primary btn-add">Добавить продукт</NuxtLink>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Цена продажа</th>
              <th>Склад</th>
              <th>Тип продукта</th>
              <th>Количество</th>
              <th>Статус</th>
              <th>Действие из.</th>
              <th>Действие уд.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.selling_price }}</td>
              <td>{{ project.id_sklad.name }}</td>
              <td>{{ project.id_type_product.product_name }}</td>
              <td>{{ project.quantity }}</td>
              <td>{{ project.status }}</td>
              <td>
                <NuxtLink :to="`/edit/${project.id}`" class="btn btn-outline-success mx-1">Изменить</NuxtLink>
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
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getProducts } from '~/services/projectService'


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

        getProducts(headers)
          .then(response => {
            this.projects = response.data["data"];
            console.log(response.data["data"])
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