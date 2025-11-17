/**
 * Main entry point for the Vue.js frontend application. Initializes the Vue app with routing and Bootstrap styles.
 */
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mount('#app')
