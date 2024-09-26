import { createWebHistory, createRouter } from "vue-router"

import Main from "@/layout/Main.vue"
import First from "@/pages/First.vue"
import Second from "@/pages/Second.vue"
import NotFound from "@/pages/NotFound.vue"
import TransactionHistory from "@/pages/TransactionHistory.vue"
import ApprovalForm from "@/pages/ApprovalForm.vue"

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
  {
    path: "/history",
    name: "TransitionHistory",
    component: TransactionHistory,
  },
  {
    path: "/approval",
    name: "ApprovalForm",
    component: ApprovalForm,
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
