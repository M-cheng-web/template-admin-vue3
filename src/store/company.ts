// import { company as companyApi } from '../../api';

export const useCompanyStore = defineStore('company', {
  state: () => {
    return {
      companyInfo: {
        tenantId: '', // 企业id
        tenantName: '', // 企业名称
        city: '', // 所在城市
        address: '' // 具体地址
      },
      roleList: [], // 当前企业下的所有角色
      allRoleList: [] // 所有角色的字典表
    }
  },
  getters: {
    companyInfo: state => state.companyInfo,
    roleList: state => state.roleList,
    allRoleList: state => state.allRoleList
  },
  actions: {
    /**
     * 获取公司信息
     */
    // getCompanyInfo(tenantId: string) {
    //   return companyApi.getInfo({ tenantId }).then(res => {
    //     this.companyInfo = { ...this.companyInfo, ...res }
    //   })
    // },
    // /**
    //  * 获取公司下所有的角色列表
    //  */
    // getRoleList(tenantId: string) {
    //   return companyApi.getRoleList({ tenantId }).then(res => {
    //     this.roleList = res.filterTenantRoles
    //     this.allRoleList = res.allEnterpirseRoles
    //   })
    // },
    // /**
    //  * 设置公司信息
    //  */
    // setCompanyInfo(params: any) {
    //   return new Promise<void>(resolve => {
    //     companyApi.setInfo(params).then(() => {
    //       this.getCompanyInfo(this.companyInfo.tenantId).then(() => {
    //         resolve()
    //       })
    //     })
    //   })
    // }
  }
})
