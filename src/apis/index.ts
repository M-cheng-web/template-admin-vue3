/**
 * 此文件专用来初始导入的，如果不用全局导入不需要在意
 */
interface ObjType {
  [propName: string]: object
}
interface filesType extends ObjType {
  default: object
}

const files: Record<string, filesType> = import.meta.glob(
  ['/src/apis/*.ts', '!**/apis.d.ts'],
  { eager: true }
)

export default Object.keys(files).reduce((pre: ObjType, path) => {
  const pathSplitArr = path.split('/')
  const moduleKey = pathSplitArr[pathSplitArr.length - 1].split('.')[0]
  pre[moduleKey] = files[path].default
  return pre
}, {})
