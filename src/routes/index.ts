import { createWebHistory, createRouter } from "vue-router"

import Main from "@/layout/Main.vue"
import First from "@/pages/First.vue"
import Second from "@/pages/Second.vue"
import NotFound from "@/pages/NotFound.vue"

const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: Main,
    children: [
      { path: "/fir", name: "FirstView", component: First },
      { path: "/sec", name: "SecondView", component: Second },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: NotFound,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
