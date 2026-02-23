<template>
  <div class="login-container">
    <div class="login-box">
      <h1>FinSphere Pro</h1>
      <p>企业级金融数据管理系统</p>
      <a-form :model="formState" @finish="handleLogin">
        <a-form-item name="username" rules="required">
          <a-input v-model:value="formState.username" size="large" placeholder="用户名: admin">
             <template #prefix><UserOutlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" rules="required">
          <a-input-password v-model:value="formState.password" size="large" placeholder="密码: 123456">
            <template #prefix><LockOutlined /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);
const formState = reactive({
  username: 'admin',
  password: '123456'
});

const handleLogin = async () => {
  loading.value = true;
  try {
    await userStore.login(formState.username, formState.password);
    message.success('登录成功');
    router.push('/');
  } catch (e) {
    message.error('登录失败');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1890ff 0%, #0050b3 100%);
}
.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
</style>
