/**
 * 国际化配置
 * 支持中英文切换
 */
import { createI18n } from 'vue-i18n'

const zhCN = {
  app: {
    title: 'data',
    description: '企业级数据管理平台',
  },
  common: {
    ok: '确定',
    cancel: '取消',
    confirm: '确认',
    delete: '删除',
    edit: '编辑',
    save: '保存',
    close: '关闭',
    refresh: '刷新',
    search: '搜索',
    reset: '重置',
    loading: '加载中...',
    noData: '暂无数据',
    operate: '操作',
  },
  auth: {
    login: '登录',
    logout: '退出登录',
    register: '注册',
    username: '用户名',
    password: '密码',
    confirmPassword: '确认密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码',
  },
  dashboard: {
    totalAssets: '总资产',
    todayProfit: '今日收益',
    holdings: '持仓数量',
    returnRate: '收益率',
  },
  portfolio: {
    list: '组合列表',
    detail: '组合详情',
    create: '创建组合',
    edit: '编辑组合',
    delete: '删除组合',
  },
  market: {
    watchlist: '自选股',
    analysis: '行情分析',
    realtime: '实时行情',
  },
  trade: {
    history: '交易历史',
    buy: '买入',
    sell: '卖出',
    record: '交易记录',
  },
  system: {
    profile: '个人资料',
    settings: '系统设置',
    notifications: '消息通知',
  },
}

const enUS = {
  app: {
    title: 'data',
    description: 'Enterprise Data Management Platform',
  },
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    close: 'Close',
    refresh: 'Refresh',
    search: 'Search',
    reset: 'Reset',
    loading: 'Loading...',
    noData: 'No data',
    operate: 'Operate',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password',
  },
  dashboard: {
    totalAssets: 'Total Assets',
    todayProfit: 'Today Profit',
    holdings: 'Holdings',
    returnRate: 'Return Rate',
  },
  portfolio: {
    list: 'Portfolio List',
    detail: 'Portfolio Detail',
    create: 'Create Portfolio',
    edit: 'Edit Portfolio',
    delete: 'Delete Portfolio',
  },
  market: {
    watchlist: 'Watchlist',
    analysis: 'Market Analysis',
    realtime: 'Real-time Quotes',
  },
  trade: {
    history: 'Trade History',
    buy: 'Buy',
    sell: 'Sell',
    record: 'Trade Record',
  },
  system: {
    profile: 'Profile',
    settings: 'Settings',
    notifications: 'Notifications',
  },
}

export function createI18nInstance() {
  return createI18n({
    legacy: false,
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS,
    },
  })
}

export default createI18nInstance
