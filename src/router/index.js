import { createRouter, createWebHashHistory } from "vue-router";
// import { createRouter, createWebHistory } from "vue-router";
import OutfitPicker from "../views/view-picker.vue";
import Closet from "../views/view-closet.vue";

const routes = [
  {
    path: "/",
    name: "OutfitPicker",
    component: OutfitPicker,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/view-about.vue"),
  },
  {
    path: "/closet",
    name: "Closet",
    component: Closet,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

export default router;
