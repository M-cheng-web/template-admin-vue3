<template>
  <div class="nav-bar">
    <!-- 面包屑 -->
    <div class="left-panel">
      <Breadcrumb />
    </div>
    <!-- 用户信息 -->
    <div class="user-info">
      <img :src="userInfo.iconUrl" />
      <div class="name">{{ userInfo.realName }}</div>
      <el-button type="primary" @click="dialog.visible = true" link>
        退出登录
      </el-button>
    </div>
  </div>

  <c-dialog
    v-model="dialog.visible"
    :width="dialog.width"
    :title="dialog.title"
    @confirm="loginOut"
  >
    <div class="logout">是否退出登录</div>
  </c-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import Breadcrumb from './bread-crumb.vue'
const router = useRouter()
const userStore = useUserStore()

const userInfo = userStore.userInfo

const dialog = reactive({
  visible: false,
  title: '提示',
  width: '360px'
})

/**
 * 退出登录
 */
const loginOut = () => {
  userStore.logout().then(() => {
    router.replace('/login')
  })
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  overflow: hidden;
  user-select: none;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 60px;
  }
  .user-info {
    display: flex;
    align-items: center;
    & > img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      border-radius: 50%;
    }
    .name {
      margin-right: 40px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
    }
  }
}
.logout {
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(31, 34, 38, 0.8);
  line-height: 24px;
}
</style>
