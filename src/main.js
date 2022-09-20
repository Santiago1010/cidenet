import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import { createPinia } from 'pinia'
import quasarLang from 'quasar/lang/es'

import router from './assets/plugins/router.js';

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

import './assets/styles/style.css'
import App from './App.vue'

createApp(App)
.use(router)
.use(Quasar, {
  	plugins: {
  		Notify
  	},
  	lang: quasarLang
})
.use(createPinia())
.mount('#app')