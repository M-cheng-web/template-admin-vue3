<template>
  <div class="text-tooltip">
    <el-tooltip
      :content="text"
      :disabled="isShowTooltip"
      effect="light"
      placement="top-end"
    >
      <div
        @mouseover="onMouseOver"
        style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
      >
        <span ref="textRef">{{ `${text}` }}</span>
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  text: string
}
const props = withDefaults(defineProps<IProps>(), { text: '' })
const isShowTooltip = ref(false)
const textRef = ref()

function onMouseOver() {
  const parentWidth = textRef.value.parentNode.offsetWidth // 获取元素父级可视宽度
  const contentWidth = textRef.value.offsetWidth // 获取元素可视宽度
  isShowTooltip.value = contentWidth <= parentWidth
}
</script>

<style lang="scss" scoped>
.text-tooltip {
}
</style>
