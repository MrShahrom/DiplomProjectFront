// middleware/auth.js

export default function ({ $axios }) {
    if (process.client && $axios) {
      const token = localStorage.getItem('token');
      if (token) {
        $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
}
  
  
  