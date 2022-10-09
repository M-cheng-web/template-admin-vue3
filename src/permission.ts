import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getPageTitle } from '@/utils'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'

let userStore: any = null
let permissionStore: any = null
const initStore = () => {
  if (!userStore) {
    userStore = useUserStore()
    permissionStore = usePermissionStore()
  }
}

NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
})

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to: any, from, next) => {
  initStore()
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      // 确定用户是否拥有权限角色列表
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await userStore.getUserInfo()
          // 根据用户权限拿到路由表
          const accessRoutes = await permissionStore.generateRoutes(roles)

          accessRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })

          // 设置 replace:true 清空导航记录
          next({ ...to, replace: true })
        } catch (error) {
          await userStore.resetToken()
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
