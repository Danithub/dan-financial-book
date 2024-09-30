import { createWebHistory, createRouter } from "vue-router"

import Main from "@/layout/Main.vue"
import List from "@/pages/List.vue"
import Add from "@/pages/Add.vue"
import NotFound from "@/pages/NotFound.vue"
import TransactionHistory from "@/pages/TransactionHistory.vue"
import ApprovalForm from "@/pages/ApprovalForm.vue"

const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: Main,
    children: [
      { path: "/List", name: "List", component: List },
      { path: "/Add", name: "Add", component: Add },
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
