<script setup lang="ts">
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElCheckbox } from 'element-plus'

import { useUserStore } from '@/stores/user'
import type { RegisterRequest } from '@/types/user'

const userStore = useUserStore()
const router = useRouter()

// 表单数据
const registerForm = ref<RegisterRequest>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 表单规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const formRef = ref()

// 处理注册
const handleRegister = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        await userStore.register(registerForm.value)
        ElMessage.success('注册成功，请登录')
        router.push('/login')
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }
  })
}

// 处理回车键
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleRegister()
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-form-wrapper">
      <ElCard class="register-card" shadow="always">
        <div class="register-header">
          <h1 class="register-title">注册账户</h1>
          <p class="register-subtitle">创建您的data账户</p>
        </div>

        <ElForm
          ref="formRef"
          :model="registerForm"
          :rules="registerRules"
          class="register-form"
          @keyup.enter="handleKeyPress"
        >
          <ElFormItem prop="username">
            <ElInput v-model="registerForm.username" placeholder="用户名" size="large" clearable>
              <template #prefix>
                <User class="input-icon" />
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem prop="email">
            <ElInput v-model="registerForm.email" placeholder="邮箱地址" size="large" clearable>
              <template #prefix>
                <Message class="input-icon" />
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem prop="password">
            <ElInput
              v-model="registerForm.password"
              type="password"
              placeholder="密码"
              size="large"
              show-password
            >
              <template #prefix>
                <Lock class="input-icon" />
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem prop="confirmPassword">
            <ElInput
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="确认密码"
              size="large"
              show-password
            >
              <template #prefix>
                <Lock class="input-icon" />
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem>
            <ElCheckbox required>
              我已阅读并同意
              <a href="#" class="agreement-link">用户协议</a>
              和
              <a href="#" class="agreement-link">隐私政策</a>
            </ElCheckbox>
          </ElFormItem>

          <ElFormItem>
            <ElButton
              type="primary"
              size="large"
              class="register-button"
              :loading="userStore.isLoggingIn"
              @click="handleRegister"
            >
              {{ userStore.isLoggingIn ? '注册中...' : '注册' }}
            </ElButton>
          </ElFormItem>
        </ElForm>

        <div class="register-footer">
          <p>
            已有账户？
            <router-link to="/login" class="login-link"> 立即登录 </router-link>
          </p>
        </div>
      </ElCard>
    </div>

    <div class="register-background">
      <div class="background-overlay"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-form-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 450px;
}

.register-card {
  border-radius: 12px;
  overflow: hidden;

  :deep(.el-card__body) {
    padding: 40px 30px;
  }
}

.register-header {
  text-align: center;
  margin-bottom: 30px;

  .register-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 10px 0;
  }

  .register-subtitle {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    margin: 0;
  }
}

.register-form {
  :deep(.el-form-item) {
    margin-bottom: 24px;
  }

  :deep(.el-input__wrapper) {
    border-radius: 8px;
  }
}

.input-icon {
  color: var(--el-text-color-secondary);
}

.register-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 10px;
}

.agreement-link {
  color: var(--el-color-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.register-footer {
  text-align: center;
  margin-top: 20px;

  p {
    margin: 0;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}

.login-link {
  color: var(--el-color-primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.register-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .register-container {
    padding: 10px;
  }

  .register-card {
    :deep(.el-card__body) {
      padding: 30px 20px;
    }
  }

  .register-header {
    .register-title {
      font-size: 24px;
    }
  }
}
</style>
