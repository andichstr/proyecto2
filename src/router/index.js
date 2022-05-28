import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/index",
    name: "Usuario",
    component: () => import("../views/usuarios/client/Usuario.vue"),
  },
  {
    path: "/productos/:id",
    name: "Producto",
    component: () => import("../views/usuarios/client/producto/Producto.vue"),
  },
  {
    path: "/register",
    name: "NuevoUsuario",
    component: () => import("../views/NuevoUsuario.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/usuarios/admin/Admin.vue"),
  },
  {
      path: "/nuevoProducto",
      name: "NuevoProducto",
      component: () => import("../views/usuarios/admin/AgregarProducto.vue")
  },
  {
      path: "/editarProducto/:id",
      name: "EditarProducto",
      component: () => import("../views/usuarios/admin/EditarProducto.vue")
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;