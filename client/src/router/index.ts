import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/articles',
      name: 'Home',
      component: () => import('../pages/ArticlesPage.vue')
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: () => import('../pages/ArticlePage.vue')
    },
    {
      path: '/admin',
      name: 'Admin Panel',
      component: () => import('../pages/AdminPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/LoginPage.vue')
    }
  ]
})

export default router
