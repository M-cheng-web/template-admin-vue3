<template>
  <div class="no-data">
    <img :src="noData" alt="" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import noData from '@/assets/images/no-data.png'

interface Props {
  title: string
}
withDefaults(defineProps<Props>(), {
  title: '暂无内容'
})
</script>

<style lang="scss" scoped>
.no-data {
  width: 307px;
  height: 162px;
  margin: 20px auto;
  img {
    width: 100%;
  }
  .title {
    height: 18px;
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    line-height: 18px;
    text-align: center;
  }
}
</style>
