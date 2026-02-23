<template>
  <a-card title="个人中心" class="fin-card">
    <p>当前用户：{{ userStore.userInfo?.name }}</p>
    <p>角色：{{ userStore.userInfo?.role }}</p>
    <a-button type="primary" ghost>修改密码</a-button>
  </a-card>
</template>
<script setup>
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
</script>
