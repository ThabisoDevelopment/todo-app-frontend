import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import 'bootstrap'
import Notifications from '@kyvg/vue3-notification'

import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5000/api"
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')  

createApp(App)
.use(router)
.use(Notifications)
.mount('#app')
