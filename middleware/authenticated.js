// middleware/authenticated.js
export default function (context) {
  if (!context.app.$accessor.auth.token) {
    return context.redirect('/login');
  }
}
