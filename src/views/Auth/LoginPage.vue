<!-- Vanilla CSS Alternative -->
<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Sign in to your account</h2>
        <p>
          Don't have an account?
          <router-link to="/register" class="link">
            Sign up here
          </router-link>
        </p>
      </div>

      <div v-if="error" class="error-alert">
        <div class="error-content">
          <svg class="error-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>{{ error }}</span>
          <button @click="clearError" class="error-close">×</button>
        </div>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <Field
            id="email"
            name="email"
            type="email"
            v-slot="{ field, meta }"
          >
            <input
              v-bind="field"
              :class="[
                'form-input',
                meta.touched && !meta.valid ? 'form-input-error' : ''
              ]"
              placeholder="Enter your email"
            />
          </Field>
          <ErrorMessage name="email" class="form-error" />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <div class="password-field">
            <Field
              id="password"
              name="password"
              v-slot="{ field, meta }"
            >
              <input
                v-bind="field"
                :type="showPassword ? 'text' : 'password'"
                :class="[
                  'form-input password-input',
                  meta.touched && !meta.valid ? 'form-input-error' : ''
                ]"
                placeholder="Enter your password"
              />
            </Field>
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="password-toggle"
            >
              <svg v-if="!showPassword" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            </button>
          </div>
          <ErrorMessage name="password" class="form-error" />
        </div>

        <div class="form-options">
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="link">Forgot password?</a>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="submit-btn"
          :class="{ 'loading': loading }"
        >
          <span v-if="!loading" class="btn-content">
            <svg class="btn-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clip-rule="evenodd" />
            </svg>
            Sign in
          </span>
          <span v-else class="btn-content">
            <div class="spinner"></div>
            Signing in...
          </span>
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const store = useStore()
const showPassword = ref(false)
const rememberMe = ref(false)

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
})

const loading = computed(() => store.getters['auth/status'] === 'loading')
const error = computed(() => store.getters['auth/error'])

const clearError = () => {
  store.commit('auth/SET_ERROR', null)
}

const onSubmit = async (values) => {
  try {
    await store.dispatch('auth/login', values)
    router.push('/dashboard')
  } catch (err) {
    console.error('Login failed:', err)
  }
}

onMounted(() => {
  store.commit('auth/SET_ERROR', null)
  document.getElementById('email')?.focus()
})
</script>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --error-color: #ef4444;
  --error-bg: #fef2f2;
  --error-border: #fecaca;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --bg-primary: #f9fafb;
  --bg-white: #ffffff;
  --border-color: #d1d5db;
  --border-radius: 0.375rem;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  padding: 3rem 1rem;
}

.login-card {
  width: 100%;
  max-width: 28rem;
  background: var(--bg-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  font-size: 1.875rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.login-header p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.link:hover {
  color: var(--primary-hover);
}

.error-alert {
  background-color: var(--error-bg);
  border: 1px solid var(--error-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.error-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--error-color);
  flex-shrink: 0;
}

.error-close {
  background: none;
  border: none;
  color: var(--error-color);
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: auto;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-input-error {
  border-color: var(--error-color);
  background-color: var(--error-bg);
}

.password-field {
  position: relative;
}

.password-input {
  padding-right: 3rem;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
}

.password-toggle:hover {
  color: var(--text-primary);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.form-error {
  color: var(--error-color);
  font-size: 0.875rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .login-card {
    padding: 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>