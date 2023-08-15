import './assets/style.css'
import ToastPlugin from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-default.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import vue3GoogleLogin from 'vue3-google-login'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(ToastPlugin)
app.use(vue3GoogleLogin, {
  clientId: '1000431857738-kmcgeuhihpei0ltumsr3rgfrsu7hf8vo.apps.googleusercontent.com'
})

app.mount('#app')

// createApp(App).mount('#app')
