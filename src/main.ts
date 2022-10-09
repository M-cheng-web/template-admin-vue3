import { createPinia } from 'pinia'
import router from '@/router'
import initLayouts from '@/layouts/init'
import App from './App.vue'
import './permission' // 路由拦截
import '@/styles/reset.scss' // css-reset

const app = createApp(App)
app.use(createPinia()) // store
app.use(router) // router
app.use(initLayouts) // layouts components init

app.mount('#app')
