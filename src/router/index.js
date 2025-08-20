// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    // meta: { requiresAuth: true }  
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/Auth/LoginPage.vue'),
    meta: { requiresGuest: true } // Only for logged-out users
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/Auth/RegisterPage.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

export default router