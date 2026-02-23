import request from '@/utils/request';

export function login(data: { username: string; password: string }) {
  return request({ url: '/login', method: 'post', data });
}

export function register(data: any) {
  return request({ url: '/register', method: 'post', data });
}

export function getUserInfo() {
  return request({ url: '/user/info', method: 'get' });
}
