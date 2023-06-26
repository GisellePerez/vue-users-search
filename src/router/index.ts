import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../views/HomeComponent.vue";
import RepositoryDetail from "../views/RepositoryDetail.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
  {
    path: "/detail/:id",
    name: "RepositoryDetail",
    component: RepositoryDetail,
    props: true,
  },
  // catch all 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  // history: createWebHistory()
  history: createWebHistory("/"),
  routes,
});

export default router;
