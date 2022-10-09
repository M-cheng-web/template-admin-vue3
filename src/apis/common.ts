import { request } from '@/utils/http/index'
import { requestOptionType } from '@/types'

interface smsSend {
  roleId?: string
  tenantId?: string
  token?: string
  userId?: string
  [keys: string]: any
}
/**
 * 发送验证码
 */
export function smsSend(data: object): Promise<smsSend> {
  const config: requestOptionType = { url: '/common/zzz', method: 'post' }
  return request(config, data)
}
