import './assets/style.css'

import vue3GoogleLogin from 'vue3-google-login'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia)

app.use(vue3GoogleLogin, {
  clientId: '1000431857738-kmcgeuhihpei0ltumsr3rgfrsu7hf8vo.apps.googleusercontent.com'
})

app.mount('#app')
