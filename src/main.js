import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './style/index.less'

const app = createApp(App)
app.use(Vant)

app.use(store).use(router).mount('#app')
