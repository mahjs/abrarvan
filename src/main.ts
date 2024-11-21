import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import { POSITION, type PluginOptions } from 'vue-toastification'

import 'bootstrap/dist/css/bootstrap.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const options: PluginOptions = {
  position: 'top-right' as POSITION,
  timeout: 3000,
  hideProgressBar: false,
}

app.use(router)
app.use(Toast, options)

app.mount('#app')
