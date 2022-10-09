import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // 自动导入 vue,vue-router,pinia 相关函数
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './unplugin-outcome/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明规避 ts 校验(tsconfig.json需要手动加)
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        // 生成 .eslintrc-auto-import.json 来规避eslint
        filepath: './unplugin-outcome/.eslintrc-auto-import.json'
      }
    }),
    // 自动按需引入组件 (不限于 element-plus,还可以自动引入根目录 component 目录下的组件)
    // 在使用UI库中新的组件或者在 component 目录下创建新组件: 都会在 components.d.ts 生成新加入的组件 (其他情况不会新建)
    // 这些新生成的在使用时会提示,左边为设置图标的就是自动生成的声明
    Components({
      dts: './unplugin-outcome/components.d.ts',
      resolvers: [ElementPlusResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
