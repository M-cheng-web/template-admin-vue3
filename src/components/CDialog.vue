<template>
  <div class="c-dialog">
    <el-dialog
      v-model="visible"
      :width="width"
      :show-close="false"
      @close="cancel"
    >
      <template #header>
        <div class="header">{{ title }}</div>
      </template>
      <div class="content">
        <slot></slot>
      </div>
      <template #footer>
        <div class="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" :loading="loading" @click="confirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean
  title?: string
  width?: string
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  width: '360px',
  loading: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const visible = ref(false)
watch(
  () => props.modelValue,
  value => {
    visible.value = value
  },
  { immediate: true }
)
watch(
  () => visible.value,
  value => {
    emit('update:modelValue', value)
  }
)

const cancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
const confirm = () => {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.c-dialog {
  :deep(.el-dialog__body) {
    padding: 0;
  }
  :deep(.el-dialog__header) {
    margin: 0;
  }
  .header {
    text-align: center;
    font-size: 18px;
    color: #1f2226;
    line-height: 18px;
  }
  .content {
    padding: 14px 27px 30px 27px;
  }
  .footer {
    text-align: center;
    & > :first-child {
      margin-right: 24px;
    }
  }
}
</style>
