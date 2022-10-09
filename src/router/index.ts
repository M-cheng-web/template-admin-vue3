import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes, asyncRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export { router as default, constantRoutes, asyncRoutes }
