import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎来到通用后台管理系统'
        },
        component: () => import('@/views/Welcome.vue')
      },
      {
        name: 'user',
        path: 'user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/Welcome.vue'),
        children: [
          {
            name: 'info',
            path: 'info',
            meta: {
              title: '信息统计'
            },
            component: () => import('@/views/Welcome.vue')
          }
        ]
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue'),
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router