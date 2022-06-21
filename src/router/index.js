import { createRouter, createWebHistory } from "vue-router";
import OutfitPicker from "../views/OutfitPicker.vue"
import Closet from "../views/Closet.vue"

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
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/closet",
    name: "Closet",
    component: Closet,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
