/**
 * 设置页面头信息
 */
const title = '酷酷的admin'
export function getPageTitle(pageTitle?: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

/**
 * 校验key是否在对象中
 */
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}

/**
 * 文件 bytes 转 size
 * @param bytes
 * @returns
 */
export function bytesToSize(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1000, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

/**
 * 一定范围内的随机数生成
 */
export function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 根据两个时间戳区间得到中间的日期
 * 注意: 入参为 YYYY-MM-DD 格式
 */
export function getAllDate(begin: string, end: string, join = '.') {
  const unixDb = new Date(begin).getTime()
  const unixDe = new Date(end).getTime()
  const result = []
  for (let k = unixDb; k <= unixDe; ) {
    result.push(dateFormat(new Date(parseInt(String(k))), join))
    k = k + 24 * 60 * 60 * 1000
  }
  return result
}

/**
 * 获取年月日
 */
export function dateFormat(date: Date, join = '-') {
  let s = ''
  const mouth =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1)
  const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  s += date.getFullYear() + join // 获取年份。
  s += mouth + join // 获取月份。
  s += day // 获取日。
  return s // 返回日期。
}

/*
 * 获取当前时间
 * 返回 YYYYMMDD 格式 (后面可扩展)
 */
export function getNowTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  return `${year}${month}${date}`
}
