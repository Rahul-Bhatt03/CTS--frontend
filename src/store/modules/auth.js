import axios from 'axios'

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
  CLEAR_AUTH(state) {  // Changed from STATE to state
    state.user = null
    state.token = null
    state.isAuthenticated = false
    state.error = null
  }
}

const actions = {
  async register({ commit }, userData) {  // Fixed typo from comit to commit
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await axios.post('/api/auth/register', userData, {
        withCredentials: true   // important for cookie handling 
      })
      
      if (response.data.success) {
        const { user, token } = response.data.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)

        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const response = await axios.post('/api/auth/login', credentials, { 
        withCredentials: true 
      })
      
      if (response.data.success) {
        const { user, token } = response.data.data
        commit('SET_TOKEN', token)  // Uncommented this line
        commit('SET_USER', user)

        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`  // Uncommented this line
        return { success: true, data: response.data }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      commit('SET_ERROR', errorMessage)
      throw new Error(errorMessage)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async logout({ commit }) {
    commit('SET_LOADING', true)

    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.log("Logout error", error)
    } finally {
      commit('CLEAR_AUTH')
      delete axios.defaults.headers.common['Authorization']  // Fixed from axios.headers to axios.defaults.headers
      commit('SET_LOADING', false)
    }
  },

  async fetchUser({ commit }) {
    commit('SET_LOADING', true)
    
    try {
      const response = await axios.get('/api/user', {
        withCredentials: true
      })
      
      if (response.data) {
        commit('SET_USER', response.data)
        return response.data
      }
    } catch (error) {
      commit('CLEAR_AUTH')
      delete axios.defaults.headers.common['Authorization']
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