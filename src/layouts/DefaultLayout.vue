<script setup lang="ts">
import {
  Odometer,
  Collection,
  TrendCharts,
  Document,
  Setting,
  User,
  Star,
  List,
  Clock,
  Tools,
} from '@element-plus/icons-vue'
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
} from 'element-plus'

import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched.map(item => ({
    title: item.meta.title as string,
    path: item.redirect || item.path,
  }))
})

const menuItems = [
  {
    index: '/dashboard',
    title: '工作台',
    icon: Odometer,
  },
  {
    index: '/portfolio',
    title: '投资组合',
    icon: Collection,
    children: [{ index: '/portfolio/list', title: '组合列表' }],
  },
  {
    index: '/market',
    title: '市场行情',
    icon: TrendCharts,
    children: [{ index: '/market/watchlist', title: '自选股' }],
  },
  {
    index: '/trade',
    title: '交易记录',
    icon: Document,
    children: [{ index: '/trade/history', title: '交易历史' }],
  },
  {
    index: '/system',
    title: '系统设置',
    icon: Setting,
    children: [
      { index: '/system/profile', title: '个人资料' },
      { index: '/system/settings', title: '系统配置' },
    ],
  },
]

const handleMenuSelect = (indexPath: string) => {
  router.push(indexPath)
}

const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/system/profile')
      break
    case 'logout':
      userStore.logout().then(() => {
        router.push('/login')
      })
      break
  }
}

const toggleSidebar = () => {
  appStore.toggleSidebar()
}
</script>

<template>
  <ElContainer class="layout-container">
    <aside
      class="sidebar"
      :class="{ 'sidebar--collapsed': appStore.settings.theme.sidebarCollapsed }"
    >
      <div class="sidebar-header">
        <h1 v-if="!appStore.settings.theme.sidebarCollapsed" class="logo">
          {{ $t('app.title') }}
        </h1>
        <h1 v-else class="logo-mini">F</h1>
      </div>

      <ElMenu
        :default-active="route.path"
        :collapse="appStore.settings.theme.sidebarCollapsed"
        class="sidebar-menu"
        @select="handleMenuSelect"
      >
        <template v-for="item in menuItems" :key="item.index">
          <ElMenuItem v-if="!item.children" :index="item.index">
            <component :is="item.icon" />
            <template #title>{{ item.title }}</template>
          </ElMenuItem>

          <ElSubMenu v-else :index="item.index">
            <template #title>
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </template>
            <ElMenuItem v-for="child in item.children" :key="child.index" :index="child.index">
              {{ child.title }}
            </ElMenuItem>
          </ElSubMenu>
        </template>
      </ElMenu>
    </aside>

    <ElContainer class="main-container">
      <ElHeader class="header">
        <div class="header-left">
          <button class="sidebar-toggle" @click="toggleSidebar">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
          </button>

          <ElBreadcrumb v-if="breadcrumbs.length > 0" separator="/">
            <ElBreadcrumbItem
              v-for="(item, index) in breadcrumbs"
              :key="index"
              :to="index === breadcrumbs.length - 1 ? undefined : item.path"
            >
              {{ item.title }}
            </ElBreadcrumbItem>
          </ElBreadcrumb>
        </div>

        <div class="header-right">
          <ElDropdown @command="handleUserCommand">
            <div class="user-info">
              <img
                :src="userStore.user?.avatar || '/default-avatar.png'"
                :alt="userStore.user?.username"
                class="user-avatar"
              />
              <span class="user-name">{{ userStore.user?.username }}</span>
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem command="profile">
                  <User class="dropdown-icon" />
                  个人资料
                </ElDropdownItem>
                <ElDropdownItem command="logout" divided>
                  <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                    />
                  </svg>
                  退出登录
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
      </ElHeader>

      <ElMain class="main-content">
        <RouterView />
      </ElMain>

      <ElFooter class="footer">
        <div class="copyright">© 2024 data. All rights reserved.</div>
      </ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: var(--el-bg-color-page);
  border-right: 1px solid var(--el-border-color-light);
  transition: width 0.3s ease;

  &--collapsed {
    width: 64px;
  }
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--el-border-color-light);

  .logo {
    font-size: 20px;
    font-weight: bold;
    color: var(--el-color-primary);
    margin: 0;
  }

  .logo-mini {
    font-size: 24px;
    font-weight: bold;
    color: var(--el-color-primary);
    margin: 0;
  }
}

.sidebar-menu {
  border: none;
  height: calc(100vh - 60px);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  background: var(--el-bg-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sidebar-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--el-fill-color-light);
  }
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--el-fill-color-light);
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.dropdown-icon {
  margin-right: 8px;
}

.main-content {
  padding: 20px;
  background: var(--el-bg-color-page);
  overflow-y: auto;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-top: 1px solid var(--el-border-color-light);
  background: var(--el-bg-color);
}

.copyright {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
