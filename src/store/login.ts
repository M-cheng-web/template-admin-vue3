import { useUserStore } from '@/store/user'
import { login } from '@/apis/user'
import { setToken, getToken, setTokenRemember } from '@/utils/auth'

const LOGIN_OUT = 30 * 24 * 60 * 60 * 1000 // 免登过期时间设置为 30天

interface userLoginParamsType {
  type: 1 | 2
  params?: object
  [key: string]: any
}
interface loginAfter {
  token: string
  [key: string]: any
}

export const useLoginStore = defineStore('login', {
  actions: {
    /**
     * 用户登录
     *
     * type为登录方式:
     * 1: web登录
     * 2: 缓存登录
     */
    userLogin({ type, ...params }: userLoginParamsType) {
      const loginPromise = new Promise<loginAfter>((resolve, reject) => {
        switch (type) {
          case 1:
            // web
            this.login(params).then(res => resolve(res), reject)
            break
          case 2:
            // 缓存登录
            resolve(this.loginCache())
            break
        }
      })
      return new Promise<void>((resolve, reject) => {
        loginPromise.then(
          res => {
            setTokenRemember(params.remember)
            // 正常流程登录成功后存缓存 token
            if (type !== 2) setToken(res.token, LOGIN_OUT)
            useUserStore().loginAfter(res).then(resolve, reject)
          },
          err => {
            reject(err)
          }
        )

        // 实现假登录,实际使用直接把下面两行删掉就行
        setToken('xxxxxxxxxxxxyyyyyyyyyyyyyyyzzzzzzzzz', LOGIN_OUT)
        resolve()
      })
    },

    // -------------------- 各个登录方式 --------------------
    /**
     * 登录 - web
     */
    login(param: any) {
      const params = {
        ...param,
        loginType: import.meta.env.VITE_BASE_LOGIN_TYPE
      }
      return login(params)
    },
    /**
     * 缓存登录
     */
    loginCache() {
      const token = getToken()
      return { token } as loginAfter
    }
  }
})
