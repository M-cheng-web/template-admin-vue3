<template>
  <div class="app-main">
    <!-- 这种写法不会报警告 -->
    <router-view v-slot="{ Component }" class="app-main-height">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.app-main {
  width: 100%;
  overflow: hidden;
  text-align: left;
  background-color: #fff;
  .app-main-height {
    min-height: calc(100vh - 156px);
  }
}
</style>
