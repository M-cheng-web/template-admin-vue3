<template>
  <el-config-provider :locale="zhCn">
    <!-- 是否需要 layout -->
    <template v-if="needLayout">
      <layout></layout>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const route = useRoute()

// 默认需要
const needLayout = computed(() => {
  return route?.matched[0]?.meta?.layout
})
</script>

<style scoped></style>
