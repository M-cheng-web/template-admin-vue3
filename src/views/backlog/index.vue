<template>
  <div class="backlog">backlog</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.backlog {
  padding: 24px 18px;
}
</style>
