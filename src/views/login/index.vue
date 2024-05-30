<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="rules">
          <h1>你好！</h1>
          <h2>欢迎使用本后台系统</h2>
          <el-form-item prop="username">
            <el-input prefix-icon="User" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              type="password"
              prefix-icon="Lock"
              placeholder="请输入密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default" :loading="loading" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import useUserStore from '@/stores/modules/user';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const loading = ref(false);
const loginForm = reactive({
  username: 'admin',
  password: '111111',
});
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const loginFormRef = ref(null);
const redirect = computed(() => route.query.redirect);

const onLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        await userStore.login(loginForm);
        loading.value = false;
        router.push({ path: redirect.value || '/' });
      } catch (error) {
        loading.value = false;
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login-form {
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px;
    box-sizing: border-box;
    h1 {
      color: #fff;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
