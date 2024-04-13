<template>
  <SidebarLayout>
  </SidebarLayout>
  
  <NavbarLayout>
  </NavbarLayout>

  <section>
    <div class="container">
      <div class="row blocks">
        <!-- Продукты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-1 text-white">
            <div class="card-body">
              <h3 class="card-title">Продукты</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/product" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Тип продукты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-2 text-white">
            <div class="card-body">
              <h3 class="card-title">Тип продукты</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/typeproduct" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Покупатели -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-4 text-white">
            <div class="card-body">
              <h3 class="card-title">Покупатели</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/customer" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Поставщики -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-3 text-white">
            <div class="card-body">
              <h3 class="card-title">Поставщики</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/supplier" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container2">
      <div class="row blocks">
        <!-- Заказы -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-5 text-white">
            <div class="card-body">
              <h3 class="card-title">Заказы</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/order" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Затраты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-6 text-white">
            <div class="card-body">
              <h3 class="card-title">Затраты</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/expense" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Рецепты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-7 text-white">
            <div class="card-body">
              <h3 class="card-title">Рецепты</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/recipe" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Сырье -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-8 text-white">
            <div class="card-body">
              <h3 class="card-title">Сырье</h3>
              <p class="card-text">Количество</p>
            </div>
            <div class="card-footer">
              <nuxt-link to="/rawmaterial" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="card-body order-table">
    <h4>Таблица заказов</h4>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>ФИО</th>
          <th>Продукт</th>
          <th>Дата заказа</th>
          <th>Ед. из-я (сомони)</th>
          <th>Цена</th>
          <th>Общ. сумма</th>
          <th>Количество</th>
          <th>Тип заказа</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ `${project.id_client.lastname} ${project.id_client.firstname} ${project.id_client.patronymic}` }}</td>
          <td>{{ project.id_product.name }}</td>
          <td>{{ project.date_of_shipment }}</td>
          <td>{{ project.units_of_measurement }}</td>
          <td>{{ project.price_per_unit }}</td>
          <td>{{ project.total_amount }}</td>
          <td>{{ project.quantity }}</td>
          <td>{{ project.type_of_sale }}</td>

        </tr>
      </tbody>
    </table>
  </div>


</template>

<script>
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getProjects } from '~/services/projectService'


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

      getProjects(headers)
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
.container {
  padding-left: 150px;
  padding-top: 40px;
}

.container2 {
  padding-left: 150px;
}

.order-table {
  padding-left: 160px;
  padding-top: 20px;
}

.blocks {
  padding-top: 30px;
}

/* Стили для градиента синего к зеленому */
.btn-1 {
  background-color: #00a65a;
}

.btn-2 {
  background-color: #00c0ef;
}

.btn-3 {
  background-color: #f39c12;
}

.btn-4 {
  background-color: #dd4b39;
}

.btn-5 {
  background-color: #605ca8;
}

.btn-6 {
  background-color: #d81b60;
}

.btn-7 {
  background-color: #337ab7;
}

.btn-8 {
  background-color: #b74095;
}
</style>