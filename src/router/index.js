import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        component: () => import('@/views/layout/home'),
      },
      {
        path: '/qa',
        component: () => import('@/views/layout/qa'),
      },
      {
        path: '/video',
        component: () => import('@/views/layout/video'),
      },
      {
        path: '/user',
        component: () => import('@/views/layout/profile'),
      },
    ],
  },
  {
    path: '/search',
    component: () => import('@/views/search'),
  },
  {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    props: true,
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
