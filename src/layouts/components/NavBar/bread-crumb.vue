<template>
  <el-breadcrumb class="breadcrumb" separator=">">
    <el-breadcrumb-item v-for="item in list" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
const router = useRouter()
const list = computed(() => {
  const { matched } = router.currentRoute.value
  return matched.filter(item => item.name && item.meta.title)
})
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  :deep(.el-breadcrumb__inner, .el-breadcrumb__item) {
    display: inline-flex;
    align-items: center;
    margin: 1px;
  }
  .menu-icon {
    padding-right: 5px;
  }
}
</style>
