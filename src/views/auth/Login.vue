<script setup lang="ts">
import { User, Lock, WarningFilled } from '@element-plus/icons-vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElCard,
  ElMessage,
  ElProgress,
} from 'element-plus'

import { useUserStore } from '@/stores/user'
import type { LoginRequest } from '@/types/user'
import {
  isAccountLocked,
  recordLoginAttempt,
  getRemainingAttempts,
  getLoginDelay,
} from '@/utils/security/login-security'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const loginForm = ref<LoginRequest>({
  username: '',
  password: '',
  rememberMe: false,
})

const formRef = ref()
const loading = ref(false)
const lockInfo = ref<{ locked: boolean; remainingTime?: number }>({ locked: false })
const remainingAttempts = ref(5)

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 128, message: '密码长度应在8-128个字符之间', trigger: 'blur' },
  ],
}

const checkLockStatus = () => {
  if (loginForm.value.username) {
    lockInfo.value = isAccountLocked(loginForm.value.username)
    remainingAttempts.value = getRemainingAttempts(loginForm.value.username)
  }
}

watch(
  () => loginForm.value.username,
  () => {
    checkLockStatus()
  }
)

const handleLogin = async () => {
  if (!formRef.value) return

  checkLockStatus()

  if (lockInfo.value.locked) {
    ElMessage.error(`账户已锁定，请 ${lockInfo.value.remainingTime} 秒后重试`)
    return
  }

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true

      const delay = getLoginDelay(loginForm.value.username)
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      try {
        await userStore.login(loginForm.value)
        recordLoginAttempt(loginForm.value.username, true)

        const redirect = (route.query.redirect as string) || '/'
        router.push(redirect)
      } catch (error: unknown) {
        recordLoginAttempt(loginForm.value.username, false)
        checkLockStatus()

        const errorMessage = error instanceof Error ? error.message : '登录失败'

        if (remainingAttempts.value <= 1) {
          ElMessage.error('登录失败次数过多，账户已被锁定15分钟')
        } else {
          ElMessage.error(`${errorMessage}，剩余尝试次数：${remainingAttempts.value - 1}`)
        }
      } finally {
        loading.value = false
      }
    }
  })
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !loading.value && !lockInfo.value.locked) {
    handleLogin()
  }
}

onMounted(() => {
  checkLockStatus()
})
</script>

<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <ElCard class="login-card" shadow="always">
        <div class="login-header">
          <h1 class="login-title">data</h1>
          <p class="login-subtitle">企业级数据管理平台</p>
        </div>

        <div v-if="lockInfo.locked" class="lock-warning">
          <ElProgress
            type="circle"
            :percentage="100"
            :format="() => `${lockInfo.remainingTime}s`"
            status="exception"
            :width="80"
          />
          <p class="lock-message">
            <WarningFilled class="warning-icon" />
            账户已锁定，请稍后重试
          </p>
        </div>

        <ElForm v-else ref="formRef" :model="loginForm" :rules="loginRules" class="login-form">
          <ElFormItem prop="username">
            <ElInput
              v-model="loginForm.username"
              placeholder="用户名"
              size="large"
              clearable
              :disabled="loading"
              @keyup.enter="handleKeyPress"
            >
              <template #prefix>
                <User class="input-icon" />
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem prop="password">
            <ElInput
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              size="large"
              show-password
              :disabled="loading"
              @keyup.enter="handleKeyPress"
            >
              <template #prefix>
                <Lock class="input-icon" />
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem v-if="remainingAttempts < 5" class="attempt-warning">
            <span class="warning-text">
              <WarningFilled /> 剩余尝试次数：{{ remainingAttempts }}
            </span>
          </ElFormItem>

          <ElFormItem>
            <ElCheckbox v-model="loginForm.rememberMe" :disabled="loading"> 记住我 </ElCheckbox>
          </ElFormItem>

          <ElFormItem>
            <ElButton
              type="primary"
              size="large"
              class="login-button"
              :loading="loading"
              :disabled="lockInfo.locked"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登录' }}
            </ElButton>
          </ElFormItem>
        </ElForm>

        <div class="login-footer">
          <p>
            还没有账号？
            <router-link to="/register" class="register-link"> 立即注册 </router-link>
          </p>
        </div>
      </ElCard>
    </div>

    <div class="login-background">
      <div class="background-overlay"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    animation: gradient-shift 15s ease infinite;
    z-index: 0;
  }

  @keyframes gradient-shift {
    0% {
      transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }
    100% {
      transform: translateX(-50%) translateY(-50%) rotate(360deg);
    }
  }
}

.login-form-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  animation: fade-in 0.8s ease-out;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.login-card {
  .login-header {
    text-align: center;
    margin-bottom: 30px;

    .login-title {
      font-size: 28px;
      font-weight: 700;
      color: #303133;
      margin: 0 0 10px 0;
    }

    .login-subtitle {
      font-size: 14px;
      color: #909399;
      margin: 0;
    }
  }

  .lock-warning {
    text-align: center;
    padding: 40px 0;

    .lock-message {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
      color: #f56c6c;
      font-size: 14px;

      .warning-icon {
        font-size: 18px;
      }
    }
  }

  .login-form {
    .input-icon {
      color: #909399;
    }

    .attempt-warning {
      margin-bottom: 10px;

      .warning-text {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #e6a23c;
        font-size: 12px;
      }
    }

    .login-button {
      width: 100%;
    }
  }

  .login-footer {
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;

    p {
      margin: 0;
      font-size: 14px;
      color: #909399;
    }

    .register-link {
      color: #409eff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
