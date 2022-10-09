<template>
  <div class="tab-bar">
    <el-tabs
      v-model="tabActive"
      type="card"
      class="tabs-content"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRouteList"
        :key="item.path"
        :name="item.path"
        :closable="!(item.meta && item.meta.affix)"
      >
        <template #label>
          <div class="item">
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useTabbarTipsStore } from '@/store/tabbarTips'
import { usePermissionStore } from '@/store/permission'
const router = useRouter()
const tabbarTipsStore = useTabbarTipsStore()
const permissionStore = usePermissionStore()

// 打开过的路由
const visitedRouteList = computed<any[]>(() => tabbarTipsStore.visitedRoutes)
const tabActive = ref() // 当前选中的tab标签

/**
 * 添加tab
 */
const addtabs = (currentRoute: RouteLocationNormalizedLoaded) => {
  if (currentRoute.name) {
    tabbarTipsStore.addVisitedRoute(currentRoute)
  }
}

/**
 * 过滤出需要固定的tab(固定的意思是不能删除)
 */
const filterAffixtabs = (routes: any[]) => {
  let tabs: any[] = []
  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      tabs.push({
        fullPath: route.path,
        path: route.path,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const temptabs = filterAffixtabs(route.children)
      if (temptabs.length >= 1) {
        tabs = [...tabs, ...temptabs]
      }
    }
  })
  return tabs
}

/**
 * 初始化tab
 */
const inittabs = () => {
  const affixtabs = filterAffixtabs(permissionStore.routes)
  affixtabs.forEach(tag => {
    if (tag.name) addtabs(tag)
  })
}

watch(
  () => router.currentRoute.value,
  currentRoute => {
    if (currentRoute.path === '/login') return
    inittabs()
    addtabs(currentRoute)
    tabActive.value =
      visitedRouteList.value.find(item => currentRoute.path === item.path)
        .path || ''
  },
  { immediate: true }
)

/**
 * 点击tab事件
 */
const handleTabClick = (tab: any) => {
  const route = visitedRouteList.value[tab.index]
  if (router.currentRoute.value.path !== route.path) {
    router.push({
      path: route.path,
      query: route.query
    })
    // fullPath: route.fullPath
  }
}
/**
 * tab移除事件
 */
const handleTabRemove = async (tabActive: any) => {
  const view = visitedRouteList.value.find(item => tabActive === item.path)
  const { visitedRoutes } = tabbarTipsStore.delRoute(view)
  if (view && view.path === router.currentRoute.value.path) {
    router.push(visitedRoutes.slice(-1)[0] || '/') // 跳转到最后一个tag
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  align-items: center;
  height: 55px;
  padding: 0 20px;
  user-select: none;
  background: #fff;
  border-top: 1px solid #f6f6f6;
  &.horizontal {
    padding: 0 40px;
  }
  :deep(.fold-unfold) {
    margin-right: 20px;
  }
  :deep(.el-tabs__item) {
    display: inline-flex;
    align-items: center;
  }
  .item {
    display: inline-flex;
    align-items: center;
    .menu-icon {
      display: flex;
      padding-right: 5px;
    }
  }

  .tabs-content {
    width: calc(100% - 90px);
    height: 34px;
    :deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
      height: 34px;
      line-height: 34px;
    }
    :deep(.el-tabs__header) {
      border-bottom: 0;
      .el-tabs__nav {
        border: 0;
        .el-tabs__item {
          box-sizing: border-box;
          height: 34px;
          margin-right: 5px;
          line-height: 34px;
          border: none;
          border-radius: 6px;
          transition: padding 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          &.is-active {
            color: #7e9cff;
            background: #ecf5ff;
            border: none;
            border-bottom: 2px solid;
          }
          &:hover {
            color: #7e9cff;
            background: #ecf5ff;
            border: none;
            border-bottom: 2px solid;
          }
        }
      }
    }
  }
}
.command-item {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  .command-label {
    padding-left: 5px;
  }
  &:hover {
    color: #7e9cff;
    background-color: #ecf5ff;
  }
  .icon {
    display: flex;
  }
}
.more {
  display: flex;
  align-content: center;
  align-items: center;
  color: #606266;
  cursor: pointer;
  transition: all 0.5s;
  &.active {
    color: #7e9cff !important;
    transform: rotate(180deg);
  }
}
</style>
