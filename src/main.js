import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './assets/style.css'

// Add Vuetify imports
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles' // Global CSS has to be imported
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import {createPinia} from 'pinia'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
const pinia=createPinia()

app.use(store)
app.use(pinia)
app.use(router)
app.use(vuetify) // Add this line

app.mount('#app')