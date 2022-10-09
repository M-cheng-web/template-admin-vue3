<template>
  <el-form
    :model="formData"
    :rules="rules"
    :inline="inline"
    ref="ruleFormRef"
    label-width="100px"
  >
    <el-form-item
      v-for="formModel in config"
      :label="formModel.label"
      :prop="formModel.key"
      :key="formModel.key"
    >
      <!-- 预留自定义表单 -->
      <slot
        v-if="slots[formModel.key]"
        :name="formModel.key"
        v-bind="{ key: formData[formModel.key] }"
      />

      <!-- 输入框 -->
      <el-input
        v-else-if="formModel.type === 'input'"
        v-model="formData[formModel.key]"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        :maxlength="formModel.maxlength"
        size="large"
      />

      <!-- 密码框 -->
      <el-input
        v-else-if="formModel.type === 'password'"
        v-model="formData[formModel.key]"
        type="password"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        show-password
        size="large"
      />

      <!-- 文本框 -->
      <el-input
        v-else-if="formModel.type === 'textarea'"
        v-model="formData[formModel.key]"
        :autosize="{ minRows: 4, maxRows: 6 }"
        type="textarea"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        :maxlength="formModel.maxlength"
        size="large"
      />

      <!-- 数字输入框 -->
      <el-input-number
        v-else-if="formModel.type === 'number'"
        v-model="formData[formModel.key]"
        :disabled="formModel.disabled"
        :precision="formModel.props?.precision ?? 2"
        size="large"
      />

      <!-- 双输入框(ps: 期望薪资) -->
      <template v-else-if="formModel.type === 'secondInput'">
        <div class="secondInput">
          <el-input
            v-model="formData[formModel.key]['one']"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            :placeholder="formModel.placeholder"
            :disabled="formModel.disabled"
            size="large"
          >
            <template v-slot:append> <div>K</div> </template>
          </el-input>
          <div class="line">一</div>
          <el-input
            v-model="formData[formModel.key]['two']"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            :placeholder="formModel.placeholder"
            :disabled="formModel.disabled"
            size="large"
          >
            <template v-slot:append> <div>K</div> </template>
          </el-input>
        </div>
      </template>

      <!-- 单选 -->
      <el-radio-group
        v-else-if="formModel.type === 'radio'"
        v-model="formData[formModel.key]"
        size="large"
      >
        <el-radio
          v-for="item in formModel?.options"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>

      <!-- 多选框 -->
      <el-checkbox-group
        v-else-if="formModel.type === 'checkbox'"
        v-model="formData[formModel.key]"
        size="large"
      >
        <el-checkbox
          v-for="item in formModel?.options"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>

      <!-- 下拉单选 -->
      <el-select
        v-else-if="formModel.type === 'select'"
        v-model="formData[formModel.key]"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        size="large"
        filterable
      >
        <el-option
          v-for="item in formModel?.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 开关 -->
      <el-switch
        v-else-if="formModel.type === 'switch'"
        v-model="formData[formModel.key]"
        :disabled="formModel.disabled"
      />

      <!-- 时间 -->
      <el-time-picker
        v-else-if="formModel.type === 'time'"
        style="width: 100%"
        v-model="formData[formModel.key]"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        size="large"
      />

      <!-- 时间 to 时间 -->
      <el-time-picker
        v-else-if="formModel.type === 'time-to-time'"
        style="width: 100%"
        v-model="formData[formModel.key]"
        is-range
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled="formModel.disabled"
        size="large"
      />

      <!-- 日期 -->
      <el-date-picker
        v-else-if="formModel.type === 'date'"
        style="width: 100%"
        v-model="formData[formModel.key]"
        type="date"
        v-bind="formModel.attrs"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        size="large"
      />

      <!-- 日期 to 日期 -->
      <el-date-picker
        v-else-if="formModel.type === 'date-to-date'"
        style="width: 100%"
        v-model="formData[formModel.key]"
        :placeholder="formModel.placeholder"
        type="daterange"
        v-bind="formModel.attrs"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled="formModel.disabled"
        size="large"
      />

      <!-- 日期时间 -->
      <el-date-picker
        v-else-if="formModel.type === 'datetime'"
        style="width: 100%"
        v-model="formData[formModel.key]"
        type="datetime"
        v-bind="formModel.attrs"
        :placeholder="formModel.placeholder"
        :disabled="formModel.disabled"
        size="large"
      />

      <!-- 日期时间 to 日期时间 -->
      <el-date-picker
        v-else-if="formModel.type === 'datetime-to-datetime'"
        style="width: 100%"
        v-model="formData[formModel.key]"
        type="datetimerange"
        v-bind="formModel.attrs"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled="formModel.disabled"
        size="large"
      />
    </el-form-item>

    <!-- 预留自定义区域 -->
    <el-form-item class="form-operations" v-if="showSubmitBtn || showResetBtn">
      <!-- <slot name="operations"></slot> -->

      <!-- 默认【提交】按钮和【重置】按钮 -->
      <el-button type="primary" @click="submitForm" v-if="showSubmitBtn">
        {{ submitText }}
      </el-button>
      <el-button @click="resetForm" v-if="showResetBtn">重置</el-button>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { IFormConfig } from '@/types'

// 【接口】通用设置key
interface IKey {
  [key: string]: any
}

// 【接口】接受传参字段
interface IProps {
  modelValue: IKey
  config: IFormConfig
  showSubmitBtn?: boolean
  submitText?: string
  showResetBtn?: boolean
  inline?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  showSubmitBtn: false,
  submitText: '提交',
  showResetBtn: false,
  inline: true
})
const emit = defineEmits<{
  (e: 'submitForm', data: IKey): void
}>()

/**
 * 获取“占位符”
 */
const getPlaceholder = (type: string, label: string): string => {
  if (['input', 'number', 'tag', 'textarea'].includes(type)) {
    return '请输入' + label
  }

  if (type === 'upload') {
    return '请上传' + label
  }

  return '请选择' + label
}

/**
 * form表单校验规则
 */
const rules = reactive<FormRules>({})
props.config.forEach(formModel => {
  if (!formModel.placeholder) {
    formModel.placeholder = getPlaceholder(formModel.type, formModel.label)
  }
  if (formModel.rule) {
    if (typeof formModel.rule === 'boolean') {
      rules[formModel.key] = [
        {
          required: true,
          message: formModel.placeholder,
          trigger: 'blur'
        }
      ]
    } else {
      rules[formModel.key] = formModel.rule
    }
  }
})

// 插槽对象
const slots = useSlots()

// 表单ref
const ruleFormRef = ref<FormInstance>()

// 校验
const validate = async () => {
  return new Promise(resolve => {
    ruleFormRef.value?.validate(valid => resolve(valid))
  })
}
// 清除验证
const clearValidate = (): void => {
  ruleFormRef.value?.clearValidate()
}
// 重置表单
const resetForm = (): void => {
  ruleFormRef.value?.resetFields()
}
// 提交表单
const submitForm = async (): Promise<void> => {
  validate()?.then(pass => {
    if (pass) {
      emit('submitForm', formData)
    }
  })
}
// 设置form表单值
const setRuleForm = (value: IKey): void => {
  Object.assign(formData, value)
  setTimeout(() => {
    clearValidate()
  }, 30)
}
// 清空form表单内容
const resetRuleForm = (): void => {
  const oldRuleForm = Object.assign({}, props.modelValue)
  for (const key in oldRuleForm) {
    // eslint-disable-next-line vue/no-mutating-props
    delete props.modelValue[key]
  }
  setTimeout(() => {
    clearValidate()
  }, 30)
}

const formData = computed(() => props.modelValue)

defineExpose({
  validate,
  clearValidate,
  resetForm,
  setRuleForm,
  resetRuleForm
})
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  width: 100%;
}
:deep(.el-date-editor .el-input__wrapper) {
  width: 100%;
}

:deep(.el-input-group__append) {
  background-color: #fff;
}

:deep(.el-upload-list__item .el-icon--close-tip) {
  display: none !important;
}

:deep(.upload-mini .el-upload--picture-card) {
  width: 80px;
  height: 80px;
}

:deep(.upload-mini .el-upload-list__item) {
  width: 80px;
  height: 80px;
}

:deep(.el-upload--none .el-upload--picture-card) {
  display: none;
}

:deep(.el-form-item .el-form-item) {
  margin-bottom: 18px;
}
:deep(.el-form-item) {
  align-items: center;
}
.secondInput {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .line {
    margin: 0 16px;
  }
}
</style>
