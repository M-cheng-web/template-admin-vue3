import { asyncRoutes, constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

/**
 * 根据角色权限确定用户是否能访问当前所有路由
 * 如果没有 roles 默认为开放页面
 */
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 过滤异步路由表
 */
export function filterAsyncRoutes(routes: any, roles: any) {
  const res: any[] = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [] as object[],
      addRoutes: [] as object[]
    }
  },
  actions: {
    /**
     * 根据权限获取路由表
     */
    generateRoutes(roles: string[]) {
      return new Promise<RouteRecordRaw[]>(resolve => {
        const accessedRoutes = roles.includes('admin')
          ? asyncRoutes
          : filterAsyncRoutes(asyncRoutes, roles)

        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)

        resolve(accessedRoutes)
      })
    }
  }
})
