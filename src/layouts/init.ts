import { App } from 'vue'

interface ObjType {
  [propName: string]: object
}
interface filesType extends ObjType {
  default: {
    __name: string
    [key: string]: any
  }
}

const files: Record<string, filesType> = import.meta.glob(
  ['/src/layouts/components/Menu/MenuItem.vue', '/src/layouts/index.vue'],
  { eager: true }
)

export default (app: App) => {
  Object.keys(files).forEach(path => {
    let name = files[path].default.__name
    if (name === 'index') name = 'layout'
    app.component(name, files[path].default)
  })
}
