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
                Join CTS Enterprise
              </h1>
              
              <!-- Feature List -->
              <div style="margin-bottom: 64px;">
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-account-plus</v-icon>
                  <span style="color: #bfdbfe;">Quick account setup</span>
                </div>
                
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-shield-check</v-icon>
                  <span style="color: #bfdbfe;">Enterprise-grade security</span>
                </div>
                
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-rocket-launch</v-icon>
                  <span style="color: #bfdbfe;">Instant access to tools</span>
                </div>
                
                <div class="d-flex align-center mb-4">
                  <v-icon color="light-blue-accent-2" class="mr-3">mdi-headset</v-icon>
                  <span style="color: #bfdbfe;">Dedicated support team</span>
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

          <!-- Right Panel - Registration Form -->
          <v-col 
            cols="12" 
            lg="5" 
            class="d-flex align-center justify-center pa-4"
            style="background-color: #f8fafc;"
          >
            <div style="width: 100%; max-width: 450px;">
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

              <!-- Registration Card -->
              <v-card 
                class="pa-8" 
                rounded="xl"
                elevation="3"
              >
                <!-- Header -->
                <div class="text-center text-lg-left mb-6">
                  <h2 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; margin-bottom: 8px;">
                    Create CTS Account
                  </h2>
                  <p style="color: #6b7280; font-size: 14px;">
                    Fill in your details to get started
                  </p>
                </div>

                <!-- Debug Info (remove in production) -->
                <v-alert
                  v-if="showDebugInfo"
                  type="info"
                  density="compact"
                  class="mb-4"
                  variant="tonal"
                >
                  <div style="font-size: 12px; font-family: monospace;">
                    Form State: {{ JSON.stringify(form, null, 2) }}
                  </div>
                </v-alert>

                <!-- Registration Form -->
                <v-form @submit.prevent="handleRegister" ref="formRef" v-model="valid">
                  <!-- Full Name Field -->
                  <v-text-field
                    v-model="form.fullName"
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="nameRules"
                    density="comfortable"
                    @input="onFieldChange('fullName', $event)"
                  ></v-text-field>

                  <!-- Email Field -->
                  <v-text-field
                    v-model="form.email"
                    label="Corporate Email"
                    type="email"
                    placeholder="john.doe@cts.com"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="emailRules"
                    density="comfortable"
                    @input="onFieldChange('email', $event)"
                  ></v-text-field>

                  <!-- Phone Field -->
                  <v-text-field
                    v-model="form.phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    prepend-inner-icon="mdi-phone-outline"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="phoneRules"
                    density="comfortable"
                    @input="onFieldChange('phone', $event)"
                  ></v-text-field>

                  <!-- Role Selection -->
                  <v-select
                    v-model="form.role"
                    label="Role"
                    :items="roleOptions"
                    item-title="text"
                    item-value="value"
                    prepend-inner-icon="mdi-badge-account-outline"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="roleRules"
                    density="comfortable"
                    @update:model-value="onFieldChange('role', $event)"
                  ></v-select>

                  <!-- Password Field -->
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Create a strong password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-2"
                    :rules="passwordRules"
                    density="comfortable"
                    @input="onFieldChange('password', $event)"
                  ></v-text-field>

                  <!-- Confirm Password Field -->
                  <v-text-field
                    v-model="form.confirmPassword"
                    label="Confirm Password"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirm your password"
                    prepend-inner-icon="mdi-lock-check-outline"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    variant="outlined"
                    color="blue-darken-1"
                    class="mb-4"
                    :rules="confirmPasswordRules"
                    density="comfortable"
                    @input="onFieldChange('confirmPassword', $event)"
                  ></v-text-field>

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

                  <!-- Success Alert -->
                  <v-alert
                    v-if="successMessage"
                    type="success"
                    density="compact"
                    class="mb-4"
                    rounded="lg"
                  >
                    {{ successMessage }}
                  </v-alert>

                  <!-- Terms and Conditions -->
                  <v-checkbox
                    v-model="form.acceptTerms"
                    color="blue-darken-1"
                    class="mb-4"
                    :rules="termsRules"
                    @update:model-value="onFieldChange('acceptTerms', $event)"
                  >
                    <template v-slot:label>
                      <div style="font-size: 14px;">
                        I agree to the 
                        <a href="#" style="color: #2563eb; text-decoration: none;" @click.prevent>Terms of Service</a> 
                        and 
                        <a href="#" style="color: #2563eb; text-decoration: none;" @click.prevent>Privacy Policy</a>
                      </div>
                    </template>
                  </v-checkbox>

                  <!-- Debug Toggle -->
                  <v-btn
                    @click="showDebugInfo = !showDebugInfo"
                    size="small"
                    variant="text"
                    class="mb-4"
                  >
                    {{ showDebugInfo ? 'Hide' : 'Show' }} Debug Info
                  </v-btn>

                  <!-- Submit Button -->
                  <v-btn
                    type="submit"
                    :loading="isLoading"
                    :disabled="isLoading || !valid"
                    color="blue-darken-1"
                    size="large"
                    block
                    class="mb-6"
                    rounded="lg"
                    elevation="2"
                    style="text-transform: none;"
                  >
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                  </v-btn>

                  <!-- Login Link -->
                  <div class="text-center mb-4">
                    <p style="color: #6b7280; font-size: 14px;">
                      Already have an account? 
                      <a 
                        href="#" 
                        style="color: #2563eb; text-decoration: none; font-weight: 500;"
                        @click.prevent="navigateToLogin"
                      >
                        Sign in here
                      </a>
                    </p>
                  </div>
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
                    <strong>Security Notice:</strong> Your information is encrypted and secure. 
                    Account activation may take up to 24 hours for verification.
                  </div>
                </v-alert>

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
import { ref, reactive, computed, watch } from 'vue'

// Form state using ref instead of reactive for better reactivity
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  role: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// UI state
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showDebugInfo = ref(false)
const valid = ref(false)
const formRef = ref(null)

// Role options
const roleOptions = [
  { text: 'Employee', value: 'employee' },
  { text: 'Manager', value: 'manager' },
  { text: 'Administrator', value: 'admin' },
  { text: 'Developer', value: 'developer' },
  { text: 'Analyst', value: 'analyst' },
  { text: 'Support Staff', value: 'support' }
]

// Optimized validation rules (computed for better performance)
const nameRules = computed(() => [
  v => !!v || 'Full name is required',
  v => (v && v.length >= 2) || 'Name must be at least 2 characters',
  v => (v && v.length <= 50) || 'Name must be less than 50 characters'
])

const emailRules = computed(() => [
  v => !!v || 'Corporate email is required',
  v => /.+@.+\..+/.test(v) || 'Enter a valid email address',
  v => (v && v.endsWith('@cts.com')) || 'Must be a valid CTS corporate email'
])

const phoneRules = computed(() => [
  v => !!v || 'Phone number is required',
  v => /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/[\s\-\(\)]/g, '')) || 'Enter a valid phone number'
])

const roleRules = computed(() => [
  v => !!v || 'Please select your role'
])

const passwordRules = computed(() => [
  v => !!v || 'Password is required',
  v => (v && v.length >= 8) || 'Password must be at least 8 characters',
  v => (v && /(?=.*[a-z])/.test(v)) || 'Password must contain at least one lowercase letter',
  v => (v && /(?=.*[A-Z])/.test(v)) || 'Password must contain at least one uppercase letter',
  v => (v && /(?=.*\d)/.test(v)) || 'Password must contain at least one number'
])

const confirmPasswordRules = computed(() => [
  v => !!v || 'Please confirm your password',
  v => (v && v === form.value.password) || 'Passwords do not match'
])

const termsRules = computed(() => [
  v => !!v || 'You must accept the terms and conditions'
])

// Field change handler for debugging
const onFieldChange = (fieldName, value) => {
  console.log(`Field ${fieldName} changed to:`, value)
  form.value[fieldName] = value
}

// Navigation handler
const navigateToLogin = () => {
  console.log('Navigate to login')
  // Replace with actual router navigation
  alert('Would navigate to login page')
}

// Watch form changes for debugging
watch(() => form.value, (newVal) => {
  console.log('Form updated:', newVal)
}, { deep: true })

const handleRegister = async () => {
  console.log('Handle register called')
  console.log('Current form state:', form.value)
  
  errorMessage.value = ''
  successMessage.value = ''
  
  // Validate form using ref
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) {
    errorMessage.value = 'Please fix the errors in the form'
    return
  }

  // Additional validation
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (!form.value.acceptTerms) {
    errorMessage.value = 'You must accept the terms and conditions.'
    return
  }

  isLoading.value = true

  try {
    console.log('CTS Registration attempt:', {
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      role: form.value.role
    })
    
    // Simulate faster API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate corporate domain validation
    if (!form.value.email.endsWith('@cts.com')) {
      throw new Error('Registration is only available for CTS corporate email addresses')
    }
    
    // Simulate successful registration
    successMessage.value = 'Account created successfully! Please check your email for verification instructions.'
    
    // Clear form after success
    setTimeout(() => {
      console.log('Would navigate to login')
      // router.push('/login') - Replace with actual navigation
    }, 2000)
    
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed. Please try again.'
    console.error('Registration error:', error)
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

:deep(.v-checkbox .v-label) {
  opacity: 1 !important;
}
</style>