<template>
  <div class="login">
    <div class="content">
      <img :src="loginBg" />
      <div class="right">
        <div class="head">酷酷的后台</div>
        <div class="subhead">Best Cool</div>
        <div class="action">
          <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="phone">
              <el-input v-model="form.phone" maxlength="11">
                <template #prefix>
                  <img class="input-left-icon" :src="loginPhone" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="form.code">
                <template #prefix>
                  <img class="input-left-icon" :src="loginCode" />
                </template>
                <template #suffix>
                  <div
                    :class="[
                      'code-text',
                      { 'code-text-sending': codeInput.status === 2 }
                    ]"
                  >
                    <el-button @click="sendCode" type="primary" link>
                      {{ codeInput.text }}
                    </el-button>
                  </div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                v-model="form.remember"
                label="记住登录状态"
                size="default"
              />
            </el-form-item>
          </el-form>
          <el-button @click="onSubmit" :loading="loading" type="primary">
            登录
          </el-button>
        </div>
      </div>
    </div>

    <!-- 底部提示 -->
    <div class="tips">
      <div>
        <span>帮助</span>
        <span>隐私</span>
        <span>条款</span>
      </div>
      <div>最终解释权归酷酷的人所有</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import loginBg from '@/assets/images/login-bg.jpeg'
import loginPhone from '@/assets/images/login-phone.png'
import loginCode from '@/assets/images/login-code.png'
import { smsSend } from '@/apis/common'
import { useLoginStore } from '@/store/login'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const TIME = 60
const loading = ref<boolean>(false)

const formRef = ref<FormInstance>()
const form = reactive({
  phone: '',
  code: '',
  remember: true,
  phoneChange: false
})
watch(
  () => form.phone,
  () => {
    form.phoneChange = true
  }
)
/**
 * 校验手机号码
 */
const validatePhone = (rule: any, value: any, callback: any) => {
  if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
    callback()
  } else {
    callback('请输入正确手机号')
  }
}
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { max: 11, message: '最长11位', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const codeInput = reactive({
  text: '发送验证码',
  status: 1, // 1: 未发送验证码 2:倒计时
  sendTimmer: ref<any>(null)
})

/**
 * 校验表单
 * key: 只校验某几项,默认校验全部
 */
const formValidate = (...key: string[]) => {
  return new Promise<boolean>(resolve => {
    if (!formRef.value) return resolve(false)
    if (key.length) {
      const promiseArr = []
      for (let i = 0; i < key.length; i++) {
        promiseArr.push(
          formRef.value.validateField(key[i], valid => resolve(valid))
        )
      }
      Promise.all(promiseArr).then(resList => {
        resolve(resList.every(item => item))
      })
    } else {
      formRef.value.validate(valid => resolve(valid))
    }
  })
}
/**
 * 发送验证码
 */
const sendCode = async () => {
  if (codeInput.sendTimmer) return
  if (!(await formValidate('phone'))) return
  codeInput.status = 2
  smsSend({
    phone: form.phone,
    templateName: import.meta.env.VITE_BASE_TEM_NAME
  }).finally(() => {
    ElMessage.success('发送成功,请查看手机短信')
    setTimeout(() => {
      ElMessage.success('输入任意验证码皆可登入成功')
    }, 1000)
    let shortTime = TIME
    codeInput.text = `${shortTime}s后获取`
    codeInput.sendTimmer = setInterval(() => {
      shortTime--
      if (shortTime === 0) {
        codeInput.text = '重新发送'
        clearInterval(codeInput.sendTimmer)
        codeInput.sendTimmer = undefined
        codeInput.status = 1
      } else {
        codeInput.text = `${shortTime}s后获取`
      }
    }, 1000)
  })
}
/**
 * 登录
 */
const onSubmit = async () => {
  // if (!(await formValidate())) return
  loading.value = true
  useLoginStore()
    .userLogin({
      type: 1,
      phone: form.phone,
      verifyCode: form.code,
      remember: form.remember
    })
    .then(
      () => {
        const redirect = (route.query.redirect as string) || '/'
        ElMessage.success('登录成功')
        router.push(redirect)
        setTimeout(() => {
          loading.value = false
        }, 1000)
      },
      () => {
        loading.value = false
      }
    )
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #002140;
  .content {
    position: relative;
    width: 930px;
    height: 478px;
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    img {
      width: 624px;
      height: 478px;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      width: 274px;
      height: 478px;
      text-align: center;
      padding-top: 45px;
      margin-right: 24px;
      .head {
        font-size: 32px;
        font-weight: 500;
        color: #1f2226;
        line-height: 44px;
        margin-bottom: 12px;
      }
      .subhead {
        font-size: 14px;
        font-weight: 400;
        color: rgba(31, 34, 38, 0.5);
        line-height: 22px;
        margin-bottom: 40px;
      }
      .action {
        margin: 0 auto;
        .input-left-icon {
          width: 16px;
          height: 16px;
        }
        .code-text {
          font-size: 14px;
          font-weight: 400;
          color: #468aff;
          line-height: 22px;
          :deep(.el-button) {
            width: 70px;
          }
        }
        .code-text-sending {
          color: rgba(31, 34, 38, 0.5);
        }
        :deep(.el-input__inner) {
          height: 40px;
        }
        :deep(.el-form-item:nth-child(2)) {
          margin-bottom: 8px !important;
        }
        :deep(.el-form-item:nth-child(3)) {
          margin-bottom: 22px !important;
        }
        :deep(.el-button) {
          width: 274px;
          height: 40px;
        }
      }
    }
  }
  .tips {
    position: absolute;
    bottom: 24px;
    left: calc(50% - 150px);
    width: 300px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 60%;
      margin: 0 auto;
      margin-bottom: 8px;
      line-height: 22px;
    }
    & > div:last-child {
      line-height: 20px;
    }
  }
}
</style>
