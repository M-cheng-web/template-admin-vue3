# template-admin-vue3
基于 vue3，vite3，element-plus，ts，pinia 的偏管理后台模板项目

## 功能列表
+ 用户权限拦截
+ 根据用户权限获取动态路由
+ 自动引入
+ axios 二次封装(支持缓存，防抖等)
+ 多环境

## 预览
![P1wPzy.png](https://s6.jpg.cm/2022/10/09/P1wPzy.png)
![P1wLte.png](https://s6.jpg.cm/2022/10/09/P1wLte.png)

## 注意
登录流程是模拟真实环境的接口请求，此项目没有加mock，所以在请求接口时会报错，但是不影响查看功能

## 启动 & 运行
```
pnpm install
pnpm dev
```

## 打包
```
测试: pnpm build-dev
生产: pnpm build-prod
```
