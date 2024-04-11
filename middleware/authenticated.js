// middleware/authenticated.js
export default function ({ redirect }) {
    // Проверяем, есть ли токен в localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Если токен отсутствует, перенаправляем пользователя на страницу входа
      redirect('/login');
    }
  }
  