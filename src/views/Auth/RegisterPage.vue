<!-- views/Auth/RegisterPage.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?
          <router-link 
            to="/login" 
            class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign in here
          </router-link>
        </p>
      </div>

      <TransitionRoot
        :show="!!error"
        as="template"
        enter="transition ease-out duration-300"
        enter-from="opacity-0 transform scale-95"
        enter-to="opacity-100 transform scale-100"
        leave="transition ease-in duration-200"
        leave-from="opacity-100 transform scale-100"
        leave-to="opacity-0 transform scale-95"
      >
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  @click="clearError"
                  class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                >
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionRoot>

      <Form @submit="onSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <Field
                id="name"
                name="name"
                type="text"
                rules="required|min:3"
                v-slot="{ field, meta }"
              >
                <input
                  v-bind="field"
                  :class="[
                    'appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors',
                    meta.touched && !meta.valid
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  ]"
                  placeholder="Enter your full name"
                />
              </Field>
              <ErrorMessage name="name" class="mt-1 text-sm text-red-600" />
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div class="mt-1">
              <Field
                id="email"
                name="email"
                type="email"
                rules="required|email"
                v-slot="{ field, meta }"
              >
                <input
                  v-bind="field"
                  :class="[
                    'appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors',
                    meta.touched && !meta.valid
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  ]"
                  placeholder="Enter your email"
                />
              </Field>
              <ErrorMessage name="email" class="mt-1 text-sm text-red-600" />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <Field
                id="password"
                name="password"
                rules="required|min:6"
                v-slot="{ field, meta }"
              >
                <input
                  v-bind="field"
                  :type="showPassword ? 'text' : 'password'"
                  :class="[
                    'appearance-none relative block w-full px-3 py-2 pr-10 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors',
                    meta.touched && !meta.valid
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  ]"
                  placeholder="Enter your password"
                />
              </Field>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <ErrorMessage name="password" class="mt-1 text-sm text-red-600" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <span v-if="!loading">Register</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { TransitionRoot } from '@headlessui/vue'
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const store = useStore()
const router = useRouter()
const showPassword = ref(false)
const loading = computed(() => store.getters['auth/loading'])
const error = computed(() => store.getters['auth/error'])

const onSubmit = async (values) => {
  try {
    await store.dispatch('auth/register', values)
    router.push('/dashboard')
  } catch (err) {
    console.error('Registration failed:', err)
  }
}

const clearError = () => {
  store.commit('auth/SET_ERROR', null)
}
</script>