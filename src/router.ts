import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/customers/:customerId',
    name: 'customer',
    props: true,
    component: () => import('./pages/customers.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
