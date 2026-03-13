<script setup lang="ts">
import {
  Download,
  Document,
  Picture,
  ArrowUp,
  HomeFilled,
  WarningFilled,
  Link,
  Files,
} from '@element-plus/icons-vue'
import {
  ElButton,
  ElCard,
  ElProgress,
  ElMessage,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTooltip,
  ElDialog,
} from 'element-plus'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const downloadProgress = ref(0)
const isDownloading = ref(false)
const downloadDialogVisible = ref(false)
const currentDownloadFile = ref('')
const downloadError = ref('')
const showRetryButton = ref(false)

const contentItems = ref([
  {
    id: 1,
    title: '数据可视化分析',
    summary:
      '提供丰富的数据可视化组件，支持折线图、柱状图、饼图等多种图表类型，帮助用户快速理解数据趋势。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    category: '功能特性',
    date: '2024-01-15',
    downloadCount: 1234,
  },
  {
    id: 2,
    title: '智能投资组合管理',
    summary: '基于AI算法自动优化投资组合配置，支持多维度风险评估，帮助用户实现资产配置最优化。',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    category: '核心功能',
    date: '2024-01-10',
    downloadCount: 856,
  },
  {
    id: 3,
    title: '实时市场行情',
    summary: '覆盖全球主要金融市场，支持股票、债券、基金、外汇等多品类实时数据推送。',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop',
    category: '数据服务',
    date: '2024-01-05',
    downloadCount: 2341,
  },
  {
    id: 4,
    title: '安全可靠的数据存储',
    summary: '企业级数据加密存储，支持数据备份与恢复，确保用户数据安全可靠。',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
    category: '技术保障',
    date: '2024-01-01',
    downloadCount: 678,
  },
  {
    id: 5,
    title: '跨平台同步支持',
    summary: '支持Web、iOS、Android多平台数据同步，随时随地查看和管理您的投资组合。',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    category: '功能特性',
    date: '2023-12-28',
    downloadCount: 1567,
  },
  {
    id: 6,
    title: '专业报告生成',
    summary: '一键生成投资分析报告，支持PDF、Excel等多种格式导出，便于存档和分享。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    category: '核心功能',
    date: '2023-12-20',
    downloadCount: 923,
  },
])

const downloadFiles = ref([
  {
    id: 1,
    name: '产品介绍手册.pdf',
    size: '2.5 MB',
    type: 'pdf',
    url: '/downloads/product-guide.pdf',
    icon: Document,
  },
  {
    id: 2,
    name: '技术架构文档.pdf',
    size: '1.8 MB',
    type: 'pdf',
    url: '/downloads/tech-docs.pdf',
    icon: Document,
  },
  {
    id: 3,
    name: '品牌形象素材.zip',
    size: '15.2 MB',
    type: 'zip',
    url: '/downloads/brand-assets.zip',
    icon: Files,
  },
  {
    id: 4,
    name: '产品截图预览.png',
    size: '850 KB',
    type: 'image',
    url: '/downloads/screenshots.png',
    icon: Picture,
  },
  {
    id: 5,
    name: '案例合集.pdf',
    size: '5.2 MB',
    type: 'pdf',
    url: '/downloads/case-studies.pdf',
    icon: Document,
  },
])

const breadcrumbs = computed(() => [
  { path: '/', title: '首页' },
  { path: '/content-intro', title: '产品介绍' },
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const handleDownload = (file: (typeof downloadFiles.value)[0], newWindow = false) => {
  if (isDownloading.value) return

  currentDownloadFile.value = file.name
  downloadProgress.value = 0
  downloadError.value = ''
  showRetryButton.value = false

  if (newWindow) {
    window.open(file.url, '_blank')
    return
  }

  isDownloading.value = true
  downloadDialogVisible.value = true

  const simulateDownload = () => {
    const interval = setInterval(() => {
      downloadProgress.value += Math.random() * 15 + 5

      if (downloadProgress.value >= 100) {
        downloadProgress.value = 100
        clearInterval(interval)

        setTimeout(() => {
          isDownloading.value = false
          downloadDialogVisible.value = false
          ElMessage({
            message: `${file.name} 下载成功`,
            type: 'success',
            duration: 3000,
          })
        }, 500)
      }
    }, 200)
  }

  simulateDownload()
}

const handleDownloadError = () => {
  downloadError.value = '网络连接中断，请检查网络后重试'
  showRetryButton.value = true
  isDownloading.value = false
}

const retryDownload = () => {
  const file = downloadFiles.value.find(f => f.name === currentDownloadFile.value)
  if (file) {
    handleDownload(file)
  }
}

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="content-intro-page">
    <header class="main-header" :class="{ scrolled: isScrolled }">
      <div class="header-container">
        <div class="brand">
          <div class="brand-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" />
              <path
                d="M10 16L14 20L22 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="brand-name">data</span>
        </div>

        <nav class="main-nav" :class="{ 'mobile-open': isMenuOpen }">
          <ul class="nav-list">
            <li class="nav-item active">
              <a href="#" @click.prevent="navigateTo('/content-intro')">产品介绍</a>
            </li>
            <li class="nav-item has-submenu">
              <a href="#">功能服务</a>
              <ul class="submenu">
                <li><a href="#">数据分析</a></li>
                <li><a href="#">投资管理</a></li>
                <li><a href="#">市场监控</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#">解决方案</a>
            </li>
            <li class="nav-item">
              <a href="#">关于我们</a>
            </li>
          </ul>
        </nav>

        <button class="mobile-menu-toggle" aria-label="切换菜单" @click="toggleMobileMenu">
          <span class="hamburger" :class="{ open: isMenuOpen }"></span>
        </button>
      </div>
    </header>

    <div class="breadcrumb-container">
      <div class="breadcrumb-wrapper">
        <ElBreadcrumb separator="/">
          <ElBreadcrumbItem :to="{ path: '/' }">
            <HomeFilled />
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>产品介绍</ElBreadcrumbItem>
        </ElBreadcrumb>
      </div>
    </div>

    <main class="main-content">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-line">企业级数据管理平台</span>
            <span class="title-highlight">赋能数字化转型</span>
          </h1>
          <p class="hero-subtitle">
            融合人工智能与金融科技，为企业提供全方位的数据分析、投资管理和决策支持解决方案
          </p>
          <div class="hero-actions">
            <ElButton type="primary" size="large" @click="navigateTo('/register')">
              立即体验
            </ElButton>
            <ElButton size="large" @click="navigateTo('/dashboard')"> 查看演示 </ElButton>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-card card-1">
            <div class="chart-mock"></div>
          </div>
          <div class="visual-card card-2">
            <div class="data-mock"></div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="section-header">
          <h2 class="section-title">核心功能</h2>
          <p class="section-description">全方位满足企业数据管理与分析需求</p>
        </div>
        <div class="cards-grid">
          <ElCard
            v-for="item in contentItems"
            :key="item.id"
            class="content-card"
            :body-style="{ padding: '0' }"
            shadow="hover"
          >
            <div class="card-image">
              <img :src="item.image" :alt="item.title" loading="lazy" />
              <span class="card-category">{{ item.category }}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-summary">{{ item.summary }}</p>
              <div class="card-meta">
                <span class="meta-date">{{ item.date }}</span>
                <span class="meta-downloads">
                  <Download class="meta-icon" />
                  {{ item.downloadCount }}
                </span>
              </div>
            </div>
          </ElCard>
        </div>
      </section>

      <section class="downloads-section">
        <div class="section-header">
          <h2 class="section-title">资料下载</h2>
          <p class="section-description">获取产品文档、技术资料和品牌资源</p>
        </div>
        <div class="downloads-grid">
          <div v-for="file in downloadFiles" :key="file.id" class="download-item">
            <div class="download-icon">
              <component :is="file.icon" />
            </div>
            <div class="download-info">
              <h4 class="download-name">{{ file.name }}</h4>
              <span class="download-size">{{ file.size }}</span>
            </div>
            <div class="download-actions">
              <ElTooltip content="当前窗口下载" placement="top">
                <ElButton
                  type="primary"
                  :icon="Download"
                  circle
                  size="large"
                  :disabled="isDownloading"
                  @click="handleDownload(file, false)"
                />
              </ElTooltip>
              <ElTooltip content="新窗口打开" placement="top">
                <ElButton :icon="Link" circle size="large" @click="handleDownload(file, true)" />
              </ElTooltip>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-content">
          <h2 class="cta-title">准备好开始了吗？</h2>
          <p class="cta-description">立即注册，开启您的数据管理之旅</p>
          <div class="cta-actions">
            <ElButton type="primary" size="large" @click="navigateTo('/register')">
              免费注册
            </ElButton>
            <ElButton size="large" @click="navigateTo('/contact')"> 联系客服 </ElButton>
          </div>
        </div>
      </section>
    </main>

    <footer class="main-footer">
      <div class="footer-container">
        <div class="footer-main">
          <div class="footer-brand">
            <div class="brand">
              <div class="brand-logo">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" />
                  <path
                    d="M10 16L14 20L22 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span class="brand-name">data</span>
            </div>
            <p class="footer-desc">企业级数据管理与分析平台</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4 class="link-title">产品服务</h4>
              <ul>
                <li><a href="#">功能介绍</a></li>
                <li><a href="#">定价方案</a></li>
                <li><a href="#">成功案例</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4 class="link-title">技术支持</h4>
              <ul>
                <li><a href="#">帮助中心</a></li>
                <li><a href="#">API文档</a></li>
                <li><a href="#">联系支持</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4 class="link-title">公司信息</h4>
              <ul>
                <li><a href="#">关于我们</a></li>
                <li><a href="#">新闻动态</a></li>
                <li><a href="#">加入我们</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-contact">
            <h4 class="contact-title">联系方式</h4>
            <p class="contact-item">邮箱: support@finsphere.com</p>
            <p class="contact-item">电话: 400-888-8888</p>
            <p class="contact-item">地址: 北京市朝阳区建国路88号</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="copyright">© 2024 data. All rights reserved.</p>
          <div class="legal-links">
            <a href="#">隐私政策</a>
            <a href="#">服务条款</a>
            <a href="#">法律声明</a>
          </div>
        </div>
      </div>
    </footer>

    <Transition name="back-to-top">
      <button v-if="isScrolled" class="back-to-top" aria-label="返回顶部" @click="scrollToTop">
        <ArrowUp />
      </button>
    </Transition>

    <ElDialog
      v-model="downloadDialogVisible"
      :title="`正在下载: ${currentDownloadFile}`"
      width="400px"
      :close-on-click-modal="false"
      :show-close="!isDownloading"
    >
      <div class="download-progress-container">
        <ElProgress
          :percentage="downloadProgress"
          :stroke-width="12"
          :format="(percentage: number) => `${Math.round(percentage)}%`"
        />
        <p v-if="downloadError" class="download-error">
          <WarningFilled />
          {{ downloadError }}
        </p>
        <div v-if="showRetryButton" class="retry-actions">
          <ElButton type="primary" @click="retryDownload"> 重试下载 </ElButton>
          <ElButton @click="downloadDialogVisible = false"> 取消 </ElButton>
        </div>
      </div>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
$primary-color: #409eff;
$text-primary: #303133;
$text-secondary: #606266;
$text-muted: #909399;
$border-color: #e4e7ed;
$bg-light: #f5f7fa;
$white: #ffffff;
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
$shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
$transition-base: all 0.3s ease;

.content-intro-page {
  min-height: 100vh;
  background: $bg-light;
}

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: $transition-base;
  border-bottom: 1px solid transparent;

  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    border-bottom-color: $border-color;
    box-shadow: $shadow-sm;
  }
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.brand-logo {
  color: $primary-color;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: $text-primary;
}

.main-nav {
  .nav-list {
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    position: relative;

    a {
      color: $text-secondary;
      text-decoration: none;
      font-size: 15px;
      padding: 8px 0;
      display: block;
      transition: $transition-base;

      &:hover {
        color: $primary-color;
      }
    }

    &.active > a {
      color: $primary-color;
      font-weight: 500;
    }

    &.has-submenu {
      &:hover .submenu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: $white;
    border-radius: 8px;
    box-shadow: $shadow-md;
    min-width: 160px;
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: $transition-base;

    li a {
      padding: 10px 20px;
      font-size: 14px;
    }
  }
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background: $text-primary;
  position: relative;
  transition: $transition-base;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: $text-primary;
    left: 0;
    transition: $transition-base;
  }

  &::before {
    top: -8px;
  }

  &::after {
    top: 8px;
  }

  &.open {
    background: transparent;

    &::before {
      top: 0;
      transform: rotate(45deg);
    }

    &::after {
      top: 0;
      transform: rotate(-45deg);
    }
  }
}

.breadcrumb-container {
  padding-top: 64px;
  background: $white;
  border-bottom: 1px solid $border-color;
}

.breadcrumb-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 80px 0;
  align-items: center;
}

.hero-content {
  .hero-title {
    margin: 0 0 24px;
    line-height: 1.2;

    .title-line {
      display: block;
      font-size: 42px;
      font-weight: 700;
      color: $text-primary;
    }

    .title-highlight {
      display: block;
      font-size: 42px;
      font-weight: 700;
      color: $primary-color;
    }
  }

  .hero-subtitle {
    font-size: 18px;
    color: $text-secondary;
    line-height: 1.6;
    margin: 0 0 32px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
  }
}

.hero-visual {
  position: relative;
  height: 400px;
}

.visual-card {
  position: absolute;
  background: $white;
  border-radius: 16px;
  box-shadow: $shadow-md;
  overflow: hidden;

  &.card-1 {
    width: 300px;
    height: 200px;
    top: 0;
    right: 20px;
    z-index: 2;
  }

  &.card-2 {
    width: 260px;
    height: 180px;
    bottom: 20px;
    right: 80px;
    z-index: 1;
  }
}

.chart-mock,
.data-mock {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f4fd 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 12px;
}

.section-description {
  font-size: 16px;
  color: $text-secondary;
  margin: 0;
}

.features-section {
  padding: 80px 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.content-card {
  border-radius: 12px;
  overflow: hidden;
  transition: $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
  }
}

.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: $transition-base;
  }

  .card-category {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.6);
    color: $white;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
  }
}

.content-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 12px;
}

.card-summary {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
  margin: 0 0 16px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: $text-muted;
}

.meta-downloads {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-icon {
  width: 14px;
  height: 14px;
}

.downloads-section {
  padding: 80px 0;
  background: $white;
}

.downloads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.download-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: $bg-light;
  border-radius: 12px;
  transition: $transition-base;

  &:hover {
    background: darken($bg-light, 2%);
  }
}

.download-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-color;
  color: $white;
  border-radius: 10px;

  svg {
    width: 24px;
    height: 24px;
  }
}

.download-info {
  flex: 1;
}

.download-name {
  font-size: 15px;
  font-weight: 500;
  color: $text-primary;
  margin: 0 0 4px;
}

.download-size {
  font-size: 13px;
  color: $text-muted;
}

.download-actions {
  display: flex;
  gap: 8px;
}

.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, $primary-color 0%, #67c23a 100%);
}

.cta-content {
  text-align: center;
}

.cta-title {
  font-size: 36px;
  font-weight: 600;
  color: $white;
  margin: 0 0 16px;
}

.cta-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 32px;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.main-footer {
  background: #1a1a2e;
  color: rgba(255, 255, 255, 0.7);
  padding: 60px 0 24px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
  gap: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .brand-logo {
    color: $primary-color;
  }

  .brand-name {
    font-size: 18px;
    font-weight: 600;
    color: $white;
  }

  .footer-desc {
    font-size: 14px;
    margin: 0;
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.link-title {
  font-size: 15px;
  font-weight: 600;
  color: $white;
  margin: 0 0 16px;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;

    a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 14px;
      transition: $transition-base;

      &:hover {
        color: $white;
      }
    }
  }
}

.contact-title {
  font-size: 15px;
  font-weight: 600;
  color: $white;
  margin: 0 0 16px;
}

.contact-item {
  font-size: 14px;
  margin: 0 0 8px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
}

.copyright {
  font-size: 13px;
  margin: 0;
}

.legal-links {
  display: flex;
  gap: 24px;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 13px;
    transition: $transition-base;

    &:hover {
      color: $white;
    }
  }
}

.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-color;
  color: $white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: $shadow-md;
  transition: $transition-base;
  z-index: 999;

  &:hover {
    background: darken($primary-color, 10%);
    transform: translateY(-2px);
  }

  svg {
    width: 24px;
    height: 24px;
  }
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.download-progress-container {
  padding: 20px 0;
}

.download-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  color: #e6a23c;
  font-size: 14px;
}

.retry-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-visual {
    display: none;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .footer-contact {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .main-nav {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: $white;
    padding: 20px;
    box-shadow: $shadow-md;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: $transition-base;

    &.mobile-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-list {
      flex-direction: column;
      gap: 0;
    }

    .nav-item {
      border-bottom: 1px solid $border-color;

      a {
        padding: 12px 0;
      }
    }

    .submenu {
      position: static;
      box-shadow: none;
      opacity: 1;
      visibility: visible;
      transform: none;
      padding-left: 20px;
    }
  }

  .mobile-menu-toggle {
    display: block;
  }

  .hero-content {
    .hero-title {
      .title-line,
      .title-highlight {
        font-size: 28px;
      }
    }
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-contact {
    grid-column: auto;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .back-to-top {
    bottom: 24px;
    right: 24px;
  }
}
</style>
