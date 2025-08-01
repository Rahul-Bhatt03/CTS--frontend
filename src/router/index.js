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
     // No meta requirements = accessible to all
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

// Navigation guards
// router.beforeEach(async (to, from, next) => {
//   // Check if user is authenticated
//   const isAuthenticated = store.getters['auth/isAuthenticated']
  
//   // If not authenticated and no user in store, try to fetch user
//   if (!isAuthenticated && !store.getters['auth/user']) {
//     try {
//       await store.dispatch('auth/fetchUser')
//     } catch (error) {
//       console.log('No authenticated user found')
//     }
//   }

  // // Handle route guards
  // if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
  //   next('/login')
  // } else if (to.meta.requiresGuest && store.getters['auth/isAuthenticated']) {
  //   next('/')
  // } else {
  //   next()
  // }
// })

export default router