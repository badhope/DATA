import { defineStore } from 'pinia';
import { router } from '@/router';

interface UserInfo {
  id: string;
  username: string;
  role: 'admin' | 'analyst' | 'viewer';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('fin_token') || '',
    userInfo: null as UserInfo | null,
  }),
  actions: {
    // 登录模拟
    async login(username: string, password: string) {
      if (username === 'admin' && password === '123456') {
        this.token = 'fin_mock_token_2024';
        this.userInfo = { id: '1', username: 'Administrator', role: 'admin' };
        localStorage.setItem('fin_token', this.token);
        return true;
      }
      throw new Error('账号密码错误');
    },
    // 登出
    logout() {
      this.token = '';
      this.userInfo = null;
      localStorage.removeItem('fin_token');
      router.push('/login');
    },
  },
});
