<template>
  <a-layout style="min-height: 100vh">
    <!-- 左侧菜单 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible :theme="'dark'">
      <div class="logo">
        <span v-if="!collapsed">FinSphere Pro</span>
        <span v-else>FS</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="$router.push('/dashboard')">
          <template #icon><dashboard-outlined /></template>
          <span>金融驾驶舱</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon><setting-outlined /></template>
          <template #title>系统管理</template>
          <a-menu-item key="2" @click="$router.push('/system/user')">用户管理</a-menu-item>
          <a-menu-item key="3">权限配置</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-Sider>
    
    <a-layout>
      <!-- 头部 -->
      <a-layout-header style="background: #fff; padding: 0 24px; display: flex; justify-content: space-between; align-items: center;">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>{{$route.meta.title}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="header-right">
           <a-dropdown>
             <a class="ant-dropdown-link" @click.prevent>
               <user-outlined /> 管理员
             </a>
             <template #overlay>
               <a-menu>
                 <a-menu-item key="logout" @click="handleLogout">退出登录</a-menu-item>
               </a-menu>
             </template>
           </a-dropdown>
        </div>
      </a-layout-header>
      
      <!-- 内容区 -->
      <a-layout-content style="margin: 16px; background: #f0f2f5;">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
};
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
