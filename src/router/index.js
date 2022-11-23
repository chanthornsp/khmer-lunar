import { createRouter, createWebHistory } from "vue-router";
import Home from "../Pages/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "hash",
  routes: [
    {
      path: "/home-2",
      name: "home2",
      component: Home,
    },
    {
      path: "/",
      name: "home",
      component: () => import("../Pages/SPCalendar.vue"),
    },
    {
      path: "/author",
      name: "author",
      component: () => import("../Pages/Author.vue"),
    },
  ],
});

export default router;
