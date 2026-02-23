<template>
  <a-layout class="layout-container">
    <!-- 左侧菜单 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      theme="dark"
      width="220"
      class="sider-menu"
    >
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" v-if="!collapsed" class="logo-img" />
        <h1 v-if="!collapsed">FinSphere Pro</h1>
        <span v-else class="logo-mini">FS</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="handleMenuClick"
      >
        <a-menu-item key="dashboard">
          <template #icon><DashboardOutlined /></template>
          <span>工作台</span>
        </a-menu-item>
        <a-menu-item key="profile">
          <template #icon><UserOutlined /></template>
          <span>个人中心</span>
        </a-menu-item>
        <!-- 权限控制：只有 admin 显示 -->
        <a-menu-item key="system" v-if="userStore.userInfo?.role === 'admin'">
          <template #icon><SettingOutlined /></template>
          <span>系统管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 右侧主体 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="collapsed = !collapsed"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="collapsed = !collapsed"
          />
          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>{{ currentRoute?.meta?.title }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        
        <div class="header-right">
          <a-dropdown>
            <a class="ant-dropdown-link user-info" @click.prevent>
              <a-avatar style="backgroundColor: #1890ff" icon="user" />
              <span class="username">{{ userStore.userInfo?.name || '用户' }}</span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile" @click="router.push('/profile')">个人设置</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="userStore.logout">
                  <LogoutOutlined /> 退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content class="content">
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
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { 
  DashboardOutlined, UserOutlined, SettingOutlined,
  MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined 
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['dashboard']);
const currentRoute = computed(() => route);

const handleMenuClick = ({ key }: { key: string }) => {
  router.push(`/${key}`);
};
</script>

<style scoped>
.layout-container { min-height: 100vh; }
.sider-menu {
  box-shadow: 2px 0 8px rgba(0,0,0,0.15);
  z-index: 10;
}
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1);
}
.logo-img { width: 32px; height: 32px; margin-right: 10px; }
.logo-mini { font-size: 20px; }

.header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  z-index: 9;
}
.trigger { font-size: 18px; cursor: pointer; transition: color 0.3s; }
.trigger:hover { color: #1890ff; }
.breadcrumb { margin-left: 16px; display: inline-block; }

.header-right .user-info { display: flex; align-items: center; }
.username { margin-left: 8px; font-weight: 500; }

.content {
  margin: 24px;
  padding: 24px;
  background: #fff;
  borderRadius: 8px;
  minHeight: 'calc(100vh - 112px)';
  box-shadow: var(--card-shadow);
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
