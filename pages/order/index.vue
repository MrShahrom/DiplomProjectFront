<template>
  <SidebarLayout>
  </SidebarLayout>

  <NavbarLayout>
  </NavbarLayout>

  <section>
    <div class="container2">
      <h2>Таблица заказов</h2>
      <div class="card-body order-table">
        <NuxtLink to="/order/create" class="btn btn-primary btn-add">Добавить заказ</NuxtLink>
        <button @click="handleExport()" class="btn btn-success btn-add btn-export">Экспорт в excel</button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Продукт</th>
              <th>Дата заказа</th>
              <th>Валюта</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Общ. сумма</th>
              <th>Тип заказа</th>
              <th>Действие из.</th>
              <th>Действие уд.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ `${project.id_client.lastname} ${project.id_client.firstname} ${project.id_client.patronymic}` }}
              </td>
              <td>{{ project.id_product.name }}</td>
              <td>{{ project.date_of_shipment }}</td>
              <td>{{ project.units_of_measurement }}</td>
              <td>{{ project.price_per_unit }}</td>
              <td>{{ project.quantity }}</td>
              <td>{{ project.total_amount }}</td>
              <td>{{ project.type_of_sale }}</td>
              <td>
                <NuxtLink :to="`/order/edit/${project.id}`" class="btn btn-outline-success mx-1">Изменить</NuxtLink>
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
import Swal from 'sweetalert2'
import SidebarLayout from '~/layouts/sidebar.vue'
import NavbarLayout from '~/layouts/navbar.vue'
import { getProjects, deleteProject } from '~/services/projectService'
import * as XLSX from 'xlsx';

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

        getProjects(headers)
        .then(response => {
          // Сортируем заказы по дате в обратном порядке
          this.projects = response.data["data"].sort((a, b) => new Date(b.date_of_shipment) - new Date(a.date_of_shipment));
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

    async handleExport() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
      try {
        // Получаем данные о проектах
        const response = await getProjects(headers);

        // Проверяем, есть ли данные
        if (response && response.data && response.data.data) {
          // Создаем новый экземпляр книги
          const workbook = XLSX.utils.book_new();

          // Создаем массив данных для таблицы
          const tableData = response.data.data.map(project => ({
            'ID': project.id,
            'ФИО': `${project.id_client.lastname} ${project.id_client.firstname} ${project.id_client.patronymic}`,
            'Продукт': project.id_product.name,
            'Дата заказа': project.date_of_shipment,
            'Цена': project.price_per_unit,
            'Валюта': project.units_of_measurement,
            'Количество': project.quantity,
            'Общ. сумма': project.total_amount,
            'Тип заказа': project.type_of_sale
          }));

          // Создаем новый лист
          const worksheet = XLSX.utils.json_to_sheet(tableData);

          // Добавляем лист в книгу
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Заказы');

          // Создаем файл Excel в формате array
          const excelArray = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

          // Преобразуем массив байтов в объект Blob
          const excelBlob = new Blob([excelArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          // Создаем ссылку для скачивания файла
          const url = window.URL.createObjectURL(excelBlob);

          // Создаем ссылку для скачивания файла
          const link = document.createElement('a');
          link.href = url;
          link.download = 'orders.xlsx'; // Указываем имя файла
          document.body.appendChild(link);

          // Симулируем клик по ссылке для скачивания файла
          link.click();

          // Освобождаем объект URL
          window.URL.revokeObjectURL(url);

          // Оповещаем пользователя об успешном экспорте
          Swal.fire({
            icon: 'success',
            title: 'Данные успешно экспортированы в Excel!',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          // Оповещаем пользователя, если нет данных для экспорта
          Swal.fire({
            icon: 'warning',
            title: 'Нет данных для экспорта!',
            text: 'Пожалуйста, добавьте данные перед экспортом.',
            showConfirmButton: true
          });
        }
      } catch (error) {
        // Обрабатываем ошибку, если произошла ошибка при получении данных
        console.error('Error exporting data to Excel:', error);
        Swal.fire({
          icon: 'error',
          title: 'Ошибка экспорта данных!',
          text: 'Пожалуйста, попробуйте еще раз.',
          showConfirmButton: true
        });
      }
    },


    async handleDelete(projectId) {
      const confirmResult = await Swal.fire({
        title: 'Вы уверены?',
        text: 'Вы действительно хотите удалить этот продукт?',
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
          await deleteProject(projectId, headers);
          // Успешно удалено
          Swal.fire({
            icon: 'success',
            title: 'Продукт успешно удален!',
            showConfirmButton: false,
            timer: 1500
          });
          // Обновляем список продуктов
          this.fetchProjectList();
        } catch (error) {
          // Ошибка удаления
          console.error('Error deleting product:', error);
          Swal.fire({
            icon: 'error',
            title: 'Ошибка удаления продукта!',
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

.btn-export {
  margin-left: 10px;
}
</style>
