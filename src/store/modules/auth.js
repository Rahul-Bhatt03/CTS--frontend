import api from '../../plugins/axios'

const state = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

const getters = {
  user: state => state.user,
  isAuthenticated: state => state.isAuthenticated,
  loading: state => state.loading,
  error: state => state.error,
  hasRole: state => role => {
    return state.user && state.user.role === role
  }
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_USER(state, user) {
    state.user = user
    state.isAuthenticated = true
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  CLEAR_AUTH(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    state.error = null
  }
}

const actions = {
  async register({ commit }, userData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const response = await api.post('/api/auth/register', userData, {
        withCredentials: true
      })
      
      if (response.data.success) {
        const { user, token } = response.data.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return { success: true, data: response.data }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed'
      commit('SET_ERROR', errorMessage)
      throw new Error(errorMessage)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async login({ commit, state }, credentials) {
    // Prevent multiple simultaneous login attempts
    if (state.loading) {
      console.log('Login already in progress')
      return { success: false, message: 'Login already in progress' }
    }

    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      console.log('Making login API request...')
      const response = await api.post('/api/auth/login', credentials, { 
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      })
      
      console.log('Login API response:', response.data)
      
      if (response.data.success) {
        const { user, token } = response.data.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return { success: true, data: response.data }
      } else {
        // Handle case where response is not successful
        const errorMessage = response.data.message || 'Login failed'
        commit('SET_ERROR', errorMessage)
        return { success: false, message: errorMessage }
      }
    } catch (error) {
      console.error('Login API error:', error)
      
      let errorMessage = 'Login failed'
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.'
      } else {
        // Other error
        errorMessage = error.message || 'An unexpected error occurred'
      }
      
      commit('SET_ERROR', errorMessage)
      
      // Don't throw error, return failed result instead
      return { success: false, message: errorMessage }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async logout({ commit }) {
    commit('SET_LOADING', true)

    try {
      await api.post('/api/auth/logout', {}, { 
        withCredentials: true,
        timeout: 5000 // 5 second timeout for logout
      })
    } catch (error) {
      console.log("Logout error", error)
      // Continue with logout even if API call fails
    } finally {
      commit('CLEAR_AUTH')
      delete api.defaults.headers.common['Authorization']
      commit('SET_LOADING', false)
    }
  },

  async fetchUser({ commit }) {
    commit('SET_LOADING', true)
    
    try {
      const response = await api.get('/api/user', {
        withCredentials: true,
        timeout: 8000 // 8 second timeout
      })
      
      if (response.data) {
        commit('SET_USER', response.data)
        return response.data
      }
    } catch (error) {
      console.error('Fetch user error:', error)
      commit('CLEAR_AUTH')
      delete api.defaults.headers.common['Authorization']
    } finally {
      commit('SET_LOADING', false)
    }
  },

  clearError({ commit }) {
    commit('SET_ERROR', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}