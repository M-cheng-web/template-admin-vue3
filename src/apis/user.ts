import { request } from '@/utils/http/index'
import { requestOptionType, requestSuccessType } from '@/types'

type login = {
  roleId: string
  tenantId: string
  token: string
  userId: string
  [keys: string]: any
}
/**
 * 用户登录
 */
export function login(data: object): Promise<login> {
  const config: requestOptionType = { url: '/login', method: 'post' }
  return request(config, data)
}
/**
 * 获取个人信息
 */
export function userDetail(): Promise<login> {
  const config: requestOptionType = {
    url: '/common/xxx',
    method: 'post'
  }
  return request(config)
}
/**
 * 获取用户当前身份
 */
export function getUserIdentity(): Promise<login> {
  const config: requestOptionType = {
    url: '/common/yyy',
    method: 'post'
  }
  return request(config)
}
