import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

import './assets/styles/style.css'
import App from './App.vue'

createApp(App)
.use(Quasar, {
  	plugins: {}, // import Quasar plugins and add here
  	lang: quasarLang
})
.mount('#app')