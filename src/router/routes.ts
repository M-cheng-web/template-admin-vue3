import { RouteRecordRaw } from 'vue-router'

// icon 图标
import backlog from '@/assets/menu-icon/backlog.png'
import backlogActive from '@/assets/menu-icon/backlog-active.png'
import statement from '@/assets/menu-icon/statement.png'
import statementActive from '@/assets/menu-icon/statement-active.png'

// 持久化路由(不需要根据权限来展示的页面)
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/statement',
    meta: { layout: true },
    children: [
      {
        path: '/statement',
        name: 'statement',
        component: () => import('@/views/statement/index.vue'),
        meta: {
          title: '数据面板',
          layout: true,
          affix: true,
          icon: statement,
          iconActive: statementActive
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      layout: false
    }
  }
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/errorPage/404.vue'),
  //   hidden: true
  // }
]

// 异步路由(需要根据权限来展示的页面)
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/backlog',
    name: 'backlog',
    component: () => import('@/views/backlog/index.vue'),
    meta: {
      title: '查看信息',
      layout: true,
      icon: backlog,
      iconActive: backlogActive
    }
  }
  // {
  //   path: '/:pathMatch(.*)*', // 代替vue2的通配符path: "*",
  //   name: 'NotFound',
  //   component: NotFound
  // }
]
