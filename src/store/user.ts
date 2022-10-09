import { removeToken } from '@/utils/auth'
// import { useCommonStore } from '@/store/common'
import { userDetail, getUserIdentity } from '@/apis/user'
import iconUrl from '@/assets/images/user.png'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        userId: '', // 用户id
        realName: '', // 用户姓名
        gender: '', // 性别 (1:男,2:女)
        iconUrl, // 头像url
        roleId: '', // 角色id
        roleName: '', // 角色姓名
        tenantUserId: '', // 企业用户ID
        tenantId: '', // 企业ID
        tenantName: '', // 企业名
        haveUserIdentityRes: [] // 用户已有的身份
      },
      roles: [] as string[], // 用户权限
      token: '',
      login: false // 登录状态
    }
  },
  actions: {
    /**
     * 登录成功后需要进行的一系列处理
     *
     * data: 登录成功后返回的数据
     * getInfo: 是否在登录成功后获取用户信息
     */
    loginAfter(data: any, getInfo = false) {
      return new Promise<void>((resolve, reject) => {
        this.login = true
        this.userInfo = { ...this.userInfo, ...data }
        this.token = data.token
        if (getInfo) {
          this.getUserInfo().then(() => resolve(), reject)
        } else {
          resolve()
        }
      })
    },
    /**
     * 获取用户信息
     */
    getUserInfo() {
      return new Promise<string[]>(reslove => {
        Promise.all([userDetail(), getUserIdentity()]).then(resList => {
          const res = {
            ...resList[1].thisUserIdentityRes,
            ...resList[0],
            haveUserIdentityRes: resList[1].haveUserIdentityRes
          }
          this.userInfo = { ...this.userInfo, ...res }
          this.roles = ['admin'] // 现阶段默认都为管理员
          reslove(this.roles)

          // 请求公共资源 (必须的才请求，因为这里会影响首屏速度)
          // useCommonStore()
          //   .getResource({ tenantId, tenantUserId })
          //   .then(reslove, reject)
        })

        // 假登陆直接返回正确结果，真实场景把下面两段删掉就行
        this.roles = ['admin']
        reslove(this.roles)
      })
    },
    /**
     * 退出登录
     */
    logout() {
      return new Promise<void>(resolve => {
        this.resetToken()

        // this.resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      })
    },
    /**
     * 清除token
     */
    resetToken() {
      return new Promise<void>(resolve => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    }
  }
})
