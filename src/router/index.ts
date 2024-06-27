import { createWebHistory, createRouter,RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    { path: '/',  component: () => import('../components/pageForExcel.vue') },
    { path: '/word',  component: () => import('../components/PageForWord.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})