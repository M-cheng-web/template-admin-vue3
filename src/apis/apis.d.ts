// type apiOriginType<T> = (data: object, options?: object) => T

// declare namespace API {
//   // 接口统一在这里进行声明
//   interface apiTypes {
//     user: {
//       login: apiOriginType<string>
//     }
//   }
// }

// api 返回参数都放在定义
declare namespace Service {
  interface login {
    roleId?: string
    tenantId?: string
    token?: string
    userId?: string
    [keys: string]: any
  }
}
