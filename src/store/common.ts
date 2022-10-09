// import { common as commonApi } from '@/api';
import { useCompanyStore } from '@/store/company'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      counter: 0,
      cityList: {}, // 省市区列表
      menuList: [] // 菜单列表 (暂时只针对 c端 我的模块 一级菜单)
    }
  },
  actions: {
    /**
     * 用户登录后需要请求的一些公共资源
     * item 默认是个对象,想传入什么变量直接往里塞
     */
    getResource(item: any) {
      return new Promise<void>(reslove => {
        // tenantId 公司 ID
        // tenantUserId 公司企业 ID
        const { tenantId, tenantUserId } = item

        // 必须请求的资源 - 登录跳转之前必须要请求的数据
        const promiseList = []

        // 获取省市区列表
        this.getRegionList()

        // 如果有 公司id 则证明是 b端用户
        if (tenantId) {
          const companyStore = useCompanyStore()
          // companyStore.getCompanyInfo(tenantId) // 获取公司详细信息
          // companyStore.getRoleList(tenantId) // 获取公司下的所有角色信息
          promiseList.push(this.getListMenu(tenantUserId)) // 获取 b端角色菜单权限表
        }

        if (promiseList.length) {
          Promise.all(promiseList).then(() => reslove())
        } else {
          reslove()
        }
      })
    },
    /**
     * 获取省市区地址
     */
    getRegionList() {
      // commonApi.getRegionList().then(res => {
      //   const oneList = [] // 一级 - 省 (专门给页面显示用的格式)
      //   const twoList = {} // 二级 - 市 (专门给页面显示用的格式)
      //   const threeList = {} // 三级 - 区 (专门给页面显示用的格式)
      //   const analysisObj = {} // 省,市,区 (专门解析用的格式, 比如知道 id能快速获取中文名)
      //   res.regionSelectorList.forEach(item => {
      //     analysisObj[item.value] = item.text
      //     oneList.push({ text: item.text, value: item.value })
      //     twoList[item.value] = []
      //     item.children.forEach(twoItem => {
      //       analysisObj[twoItem.value] = twoItem.text
      //       twoList[twoItem.parentId].push({
      //         text: twoItem.text,
      //         value: twoItem.value
      //       })
      //       threeList[twoItem.value] = []
      //       if (twoItem.children) {
      //         twoItem.children.forEach(threeItem => {
      //           analysisObj[threeItem.value] = threeItem.text
      //           threeList[threeItem.parentId].push({
      //             text: threeItem.text,
      //             value: threeItem.value
      //           })
      //         })
      //       }
      //     })
      //   })
      //   this.cityList = { oneList, twoList, threeList, analysisObj }
      // })
    },
    /**
     * 获取菜单权限列表 (b端用户能展示的我的页面的菜单)
     * tenantUserId: 企业用户ID
     */
    getListMenu(tenantUserId: string) {
      // return commonApi.getlistMenu({ tenantUserId }).then(res => {
      //   this.menuList = res.map(item => item.menuId)
      // })
    },
    reset() {
      useCommonStore().$reset()
    }
  }
})
