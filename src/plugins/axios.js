// plugins/axios.js
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../router'
import store from '../store'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_URL || 'http://localhost:8000',
  withCredentials: true, // Important: sends cookies with every request
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // 🔁 Fetch token from cookies
    const token = Cookies.get('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch('auth/logout')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
