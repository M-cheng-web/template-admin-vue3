<template>
  <!-- 单独菜单的 -->
  <el-menu-item
    v-if="!route.children && !route.meta.hidden"
    :index="route.children ? route.children[0].path : route.path"
  >
    <template #title>
      <img
        class="menu-icon"
        :src="
          activeRouter === route.path ? route.meta.iconActive : route.meta.icon
        "
      />
      <span class="title">
        {{ route.children ? route.children[0].meta.title : route.meta.title }}
      </span>
    </template>
  </el-menu-item>

  <!-- 有子菜单的 -->
  <el-sub-menu :index="route.path" v-if="route.children && !route.meta.hidden">
    <template #title>
      <span class="title">{{ route.meta.title }}</span>
    </template>
    <template v-for="(option, index) in route.children">
      <menu-item v-if="option.children" :key="option.path" :route="option" />
      <el-menu-item v-else :index="option.path" :key="index">
        <img
          class="menu-icon"
          :src="
            activeRouter === route.path
              ? route.meta.iconActive
              : route.meta.icon
          "
        />
        <span class="title">
          {{ option.meta.title }}
        </span>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
const router = useRouter()
defineProps({ route: { type: Object, default: () => ({}) } })

const activeRouter = computed(() => {
  const { fullPath } = router.currentRoute.value
  return fullPath || '/backlog'
})
</script>

<style lang="scss" scoped>
.menu-icon {
  width: 14px;
  height: 14px;
  margin-right: 14px;
}
</style>
