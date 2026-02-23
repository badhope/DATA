import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes, asyncRoutes } from './routes';
import { getToken } from '@/utils/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
});

const whiteList = ['/login', '/register'];

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '首页'} | FinSphere Pro`;
  const hasToken = getToken();
  
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
