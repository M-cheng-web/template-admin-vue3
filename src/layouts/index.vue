<template>
  <div class="layout">
    <el-container>
      <Menu />
      <el-container class="container">
        <el-header class="header" height="60px">
          <NavBar />
          <TabBar />
        </el-header>
        <el-main class="main" :class="{ notag: false }">
          <AppMain />
          <div class="tips">
            <div>
              <span>帮助</span>
              <span>隐私</span>
              <span>条款</span>
            </div>
            <div>最终解释权归酷酷的人所有</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/Menu/index.vue'
import NavBar from './components/NavBar/index.vue'
import TabBar from './components/TabBar/index.vue'
import AppMain from './components/AppMain/index.vue'
</script>

<style scoped lang="scss">
.layout {
  position: relative;
  background-color: #f0f2f5;
  .container {
    position: absolute;
    right: 0;
    left: 256px;
    transition: all 0.4s;
  }
  .header {
    position: fixed;
    left: 256px;
    top: 0;
    right: 0;
    padding: 0;
    z-index: 999;
  }
  .main {
    position: relative;
    top: 115px;
    overflow-y: auto;
    background-color: #f0f2f5;

    .tips {
      width: 280px;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      font-weight: 400;
      margin: 0 auto;
      padding: 48px 0 24px 0;
      & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 170px;
        margin: 0 auto;
        margin-bottom: 8px;
        line-height: 22px;
      }
      & > div:last-child {
        line-height: 20px;
      }
    }
  }
}
</style>
