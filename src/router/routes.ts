import { RouteRecordRaw } from 'vue-router';

export const constantRoutes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue'), meta: { title: '登录' } },
  { path: '/register', name: 'Register', component: () => import('@/views/register/index.vue'), meta: { title: '注册' } },
  { path: '/404', name: '404', component: () => import('@/views/error/404.vue') },
];

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/dashboard/index.vue'), meta: { title: '工作台' } },
      { path: 'profile', name: 'Profile', component: () => import('@/views/profile/index.vue'), meta: { title: '个人中心' } },
      // 只有 Admin 角色才能看到的菜单
      { path: 'system', name: 'System', component: () => import('@/views/system/index.vue'), meta: { title: '系统管理', roles: ['admin'] } },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
];
