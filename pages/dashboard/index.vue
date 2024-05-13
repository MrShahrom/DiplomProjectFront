<template>
  <SidebarLayout>
  </SidebarLayout>
  
  <NavbarLayout>
  </NavbarLayout>

  <section>
    <div class="container">
      <div class="row blocks">
        <!-- Тип продукты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-2 text-white">
            <div class="card-body">
              <h2 class="card-text bold">{{ typeProductsCount }}</h2>
              <h3 class="card-title">Тип продукты</h3>
            </div>
            <div class="card-footer">
              <nuxt-link to="/typeproduct" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Продукты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-1 text-white">
            <div class="card-body">
              <h2 class="card-text">{{ productsCount }}</h2>
              <h3 class="card-title">Продукты</h3>
            </div>
            <div class="card-footer">
              <nuxt-link to="/product" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Покупатели -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-4 text-white">
            <div class="card-body">
              <h2 class="card-text">{{ clientsCount }}</h2>
              <h3 class="card-title">Клиенты</h3>
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
              <h2 class="card-text">{{ suppliersCount }}</h2>
              <h3 class="card-title">Поставщики</h3>
            </div>
            <div class="card-footer">
              <nuxt-link to="/supplier" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row blocks">
        <!-- Заказы -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-5 text-white">
            <div class="card-body">
              <h2 class="card-text">{{ordersCount}}</h2>
              <h3 class="card-title">Заказы</h3>
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
              <h2 class="card-text">{{costsCount}}</h2>
              <h3 class="card-title">Затраты</h3>
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
              <h2 class="card-text">{{recipesCount}}</h2>
              <h3 class="card-title">Рецепты</h3>
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
              <h2 class="card-text">{{rawMaterialsCount}}</h2>
              <h3 class="card-title">Сырье</h3>
            </div>
            <div class="card-footer">
              <nuxt-link to="/rawmaterial" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row blocks">
        <!-- Склады -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-9 text-white">
            <div class="card-body">
              <h2 class="card-text">{{skladsCount}}</h2>
              <h3 class="card-title">Склады</h3>
            </div>
            <div class="card-footer">
              <nuxt-link to="/sklad" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
        <!-- Отчеты -->
        <div class="col-lg-3 col-sm-6">
          <div class="card btn-10 text-white">
            <div class="card-body">
              <h2 class="card-text">0</h2>
              <h3 class="card-title">Отчеты</h3>
            </div>
            <div class="card-footer">
              <nuxt-link to="/otchet" class="btn btn-light">Больше <i class="fa fa-arrow-circle-right"></i></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>

<script>
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getProjects, getCountProducts, getCountClients, getCountSuppliers, getCountTypeProducts, getCountOrders, getCountRecipes, getCountCosts, getCountRawMaterials, getCountSklads,  } from '~/services/projectService'


export default {
  layout: 'sidebarLayout',
  layout: 'navbarLayout',
  components: {
    SidebarLayout,
    NavbarLayout,
  },
  data() {
    return {
      projects: [],
      productsCount: 0,
      clientsCount: 0,
      suppliersCount: 0,
      typeProductsCount: 0,
      ordersCount: 0,
      recipesCount: 0,
      costsCount: 0,
      rawMaterialsCount: 0,
      skladsCount: 0,
    };
  },
  created() {
    if (process.client) {
      this.fetchProjectList();
      this.fetchCounts();
    }
  },
  
  methods: {
    fetchCounts() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      getCountProducts(headers).then(response => {
        this.productsCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching products count:', error);
      });

      getCountClients(headers).then(response => {
        this.clientsCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching clients count:', error);
      });

      getCountSuppliers(headers).then(response => {
        this.suppliersCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching suppliers count:', error);
      });

      getCountTypeProducts(headers).then(response => {
        this.typeProductsCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching type products count:', error);
      });

      getCountOrders(headers).then(response => {
        this.ordersCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching orders count:', error);
      });

      getCountRecipes(headers).then(response => {
        this.recipesCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching recipes count:', error);
      });

      getCountCosts(headers).then(response => {
        this.costsCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching costs count:', error);
      });

      getCountRawMaterials(headers).then(response => {
        this.rawMaterialsCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching raw material count:', error);
      });

      getCountSklads(headers).then(response => {
        this.skladsCount = response.data.count;
      }).catch(error => {
        console.error('Error fetching sklads count:', error);
      });
    },

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

.order-table {
  padding-left: 160px;
  padding-top: 20px;
}

.blocks {
  padding-top: 30px;
}

.btn-1 {
  background-color: #00a65a;
}

.btn-2 {
  background-color: #00c0ef;
}

.btn-3 {
  background-color: #b74095;
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
  background-color: #808000;
}

.btn-8 {
  background-color: #f39c12;
}

.btn-9 {
  background-color: #4040b7;
}

.btn-10 {
  background-color: #388bc6;
}
</style>