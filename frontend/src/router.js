import { createRouter, createWebHistory } from "vue-router";
//import Home from '../views/Home.vue'

const routes = [
  {
    path: "/",
    redirect: "/list",
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("./views/List.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
