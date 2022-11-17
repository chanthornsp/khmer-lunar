import { createRouter, createWebHistory } from "vue-router";
import Home from "../Pages/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },    {
      path: "/author",
      name: "author",
      component: ()=>import('../Pages/Author.vue'),
    },
  ],
});

export default router;
