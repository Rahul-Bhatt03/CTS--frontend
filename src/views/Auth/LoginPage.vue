<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <v-row no-gutters class="fill-height">
          <!-- Left Panel - Corporate Branding -->
          <v-col
            cols="12"
            lg="7"
            class="d-none d-lg-flex flex-column justify-center align-start pa-12"
            style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); position: relative;"
          >
            <!-- Background overlay -->
            <div 
              style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
                opacity: 0.6;
              "
            ></div>
            
            <div style="position: relative; z-index: 1;">
              <!-- CTS Logo -->
              <v-card
                class="mb-8 d-flex align-center justify-center"
                width="64"
                height="64"
                style="border-radius: 12px;"
                elevation="8"
                color="white"
              >
                <v-card-text class="pa-0 d-flex align-center justify-center fill-height">
                  <span style="font-size: 24px; font-weight: bold; color: #1e40af;">CTS</span>
                </v-card-text>
              </v-card>

              <h1 style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 24px;">
                CTS Enterprise Portal
              </h1>
              
              <!-- Feature List -->
              <div style="margin-bottom: 64px;">
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-check-circle</v-icon>
                  <span style="color: #bfdbfe;">Secure enterprise access</span>
                </div>
                
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-check-circle</v-icon>
                  <span style="color: #bfdbfe;">Single sign-on integration</span>
                </div>
                
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-check-circle</v-icon>
                  <span style="color: #bfdbfe;">24/7 technical support</span>
                </div>
              </div>

              <!-- Footer -->
              <v-divider 
                color="blue-darken-2" 
                style="margin-bottom: 24px; opacity: 0.5;"
              ></v-divider>
              
              <div>
                <p style="color: #93c5fd; font-size: 14px; margin-bottom: 4px;">
                  © 2024 CTS Corporation. All rights reserved.
                </p>
                <p style="color: #7dd3fc; font-size: 12px;">
                  v4.2.1 • Build #22987
                </p>
              </div>
            </div>
          </v-col>

          <!-- Right Panel - Login Form -->
          <v-col 
            cols="12" 
            lg="5" 
            class="d-flex align-center justify-center pa-4"
            style="background-color: #f8fafc;"
          >
            <div style="width: 100%; max-width: 400px;">
              <!-- Mobile Logo - Show only on mobile -->
              <v-card
                class="d-lg-none mx-auto mb-8 d-flex align-center justify-center"
                width="48"
                height="48"
                style="border-radius: 12px;"
                elevation="4"
                color="blue-darken-3"
              >
                <v-card-text class="pa-0 d-flex align-center justify-center fill-height">
                  <span style="font-size: 20px; font-weight: bold; color: white;">CTS</span>
                </v-card-text>
              </v-card>

              <!-- Login Card -->
              <v-card 
                class="pa-8" 
                rounded="xl"
                elevation="3"
              >
                <!-- Header -->
                <div class="text-center text-lg-left mb-6">
                  <h2 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 8px;">
                    Sign in to CTS Portal
                  </h2>
                  <p style="color: #6b7280; font-size: 14px;">
                    Enter your corporate credentials to continue
                  </p>
                </div>

                <!-- Login Form -->
                <v-form @submit.prevent="handleLogin" ref="form">
                  <!-- Email Field -->
                  <v-text-field
                    v-model="form.email"
                    label="Corporate Email"
                    type="email"
                    placeholder="first.last@cts.com"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="emailRules"
                    hide-details="auto"
                    density="comfortable"
                  ></v-text-field>

                  <!-- Password Field -->
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="passwordRules"
                    hide-details="auto"
                    density="comfortable"
                  ></v-text-field>
                  
                  <!-- Forgot Password Link -->
                  <div class="text-right mb-4">
                    <v-btn
                      variant="text"
                      color="blue-darken-1"
                      size="small"
                      class="pa-0"
                      style="text-transform: none;"
                    >
                      Forgot password?
                    </v-btn>
                  </div>

                  <!-- Error Alert -->
                  <v-alert
                    v-if="errorMessage"
                    type="error"
                    density="compact"
                    class="mb-4"
                    rounded="lg"
                  >
                    {{ errorMessage }}
                  </v-alert>

                  <!-- Remember Me -->
                  <v-checkbox
                    v-model="form.rememberMe"
                    label="Remember this device"
                    color="blue-darken-1"
                    class="mb-4"
                    hide-details
                    density="compact"
                  ></v-checkbox>

                  <!-- Submit Button -->
                  <v-btn
                    type="submit"
                    :loading="isLoading"
                    :disabled="isLoading"
                    color="blue-darken-1"
                    size="large"
                    block
                    class="mb-6"
                    rounded="lg"
                    elevation="2"
                    style="text-transform: none;"
                  >
                    {{ isLoading ? 'Signing in...' : 'Sign in' }}
                  </v-btn>
                </v-form>

                <!-- Security Notice -->
                <v-alert
                  type="info"
                  density="compact"
                  variant="tonal"
                  color="blue-lighten-4"
                  class="mb-4"
                  rounded="lg"
                  border="start"
                  border-color="blue-darken-1"
                >
                  <template v-slot:prepend>
                    <v-icon color="blue-darken-1">mdi-information</v-icon>
                  </template>
                  <div style="font-size: 12px;">
                    <strong>Security Notice:</strong> Ensure you're on the official CTS network. 
                    Contact IT support if you suspect any unauthorized access.
                  </div>
                </v-alert>

            <!--    issue resolved-->

                <!-- Support Contact -->
                <div class="text-center">
                  <p style="color: #6b7280; font-size: 12px;">
                    Need help? Contact 
                    <a 
                      href="mailto:it-support@cts.com" 
                      style="color: #2563eb; text-decoration: none;"
                    >
                      IT Support
                    </a>
                    or call 
                    <span style="font-family: monospace;">+1 (555) 123-HELP</span>
                  </p>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

// Validation rules
const emailRules = [
  v => !!v || 'Corporate email is required',
  v => /.+@.+\..+/.test(v) || 'Enter a valid email address',
]

const passwordRules = [
  v => !!v || 'Password is required',
]

const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!form.email || !form.password) {
    errorMessage.value = 'Please enter your corporate credentials.'
    return
  }

  isLoading.value = true

  try {
    console.log('CTS Login attempt:', form.email)
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Simulate corporate domain validation
    if (!form.email.endsWith('@cts.com')) {
      throw new Error('Invalid corporate email domain')
    }
    
    // Replace with your actual router navigation
    // router.push('/dashboard')
    alert('Login successful! (Replace this with router.push)')
  } catch (error) {
    errorMessage.value = error.message || 'Authentication failed. Please try again.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

/* Custom styling for better appearance */
:deep(.v-field) {
  border-radius: 8px !important;
}

:deep(.v-field--focused) {
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2) !important;
}

:deep(.v-btn) {
  font-weight: 500 !important;
}
</style>