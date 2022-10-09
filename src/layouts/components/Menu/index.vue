<template>
  <div class="menus">
    <el-menu
      active-text-color="#fff"
      background-color="#001529"
      class="el-menu-vertical"
      :default-active="defaultActive"
      text-color="#999"
      router
    >
      <div class="logo">
        <img :src="APPLOGO" />
      </div>
      <template v-for="route in routes" :key="route.path">
        <menu-item :route="route" />
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import APPLOGO from '@/assets/images/login-bg.jpeg'
import { usePermissionStore } from '@/store/permission'
const router = useRouter()
const permissionStore = usePermissionStore()

const defaultActive = computed(() => {
  const { fullPath } = router.currentRoute.value
  return fullPath || '/backlog'
})

const filterRoute = ['/', '/login']
const routes = computed(() => {
  return permissionStore.routes.reduce((pre: any[], item: any) => {
    if (item.path === '/') pre.push(item.children[0])
    if (!filterRoute.includes(item.path)) pre.push(item)
    return pre
  }, [])
})
</script>

<style scoped lang="scss">
.menus {
  width: 256px;
  height: 100vh;
  overflow-y: auto;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    & > img {
      width: 100%;
      height: 60px;
      object-fit: cover;
    }
  }
  .el-menu-vertical {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    :deep(.el-menu-item) {
      height: 54px;
      padding: 16px 24px;
    }
    &:not(.el-menu--collapse) {
      width: 256px;
    }
  }
}
</style>
