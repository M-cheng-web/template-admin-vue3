import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useTabbarTipsStore = defineStore('tabbarTips', {
  state: () => {
    return {
      visitedRoutes: [] as RouteLocationNormalizedLoaded[] // tabbar栏展示的路由
    }
  },
  actions: {
    /**
     * 添加tabBar
     */
    addVisitedRoute(route: RouteLocationNormalizedLoaded) {
      const target = this.visitedRoutes.find(item => item.path === route.path)
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route)
        return
      }
      this.visitedRoutes.push(Object.assign({}, route))
    },
    /**
     * 删除tabBar
     * 返回对象格式
     */
    delRoute(route: RouteLocationNormalizedLoaded) {
      this.visitedRoutes.forEach((item, index) => {
        if (item.path === route.path) this.visitedRoutes.splice(index, 1)
      })
      return {
        visitedRoutes: [...this.visitedRoutes]
      }
    }
  }
})
