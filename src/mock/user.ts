import Mock from 'mockjs';

// 模拟用户数据库
const users = [
  { id: 1, username: 'admin', password: '123456', role: 'admin', name: '超级管理员' },
  { id: 2, username: 'user', password: '123456', role: 'user', name: '普通用户' }
];

export function setupUserMock() {
  // 登录接口
  Mock.mock('/api/login', 'post', (options: any) => {
    const { username, password } = JSON.parse(options.body);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return { code: 200, data: { token: Mock.Random.guid(), userInfo: user } };
    }
    return { code: 401, message: '账号或密码错误' };
  });

  // 注册接口
  Mock.mock('/api/register', 'post', (options: any) => {
    const newUser = JSON.parse(options.body);
    if (users.find(u => u.username === newUser.username)) {
      return { code: 400, message: '用户已存在' };
    }
    users.push({ ...newUser, id: users.length + 1, role: 'user' });
    return { code: 200, message: '注册成功' };
  });
}
