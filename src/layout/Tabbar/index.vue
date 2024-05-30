<template>
  <div class="tabbar">
    <Hamburger />
    <Breadcrumb />

    <div class="right-menu">
      <Screenfull />
      <div class="setting mr10" @click="onSetting">
        <!-- <svg-icon name="setting" /> -->
        <el-icon size="20"><Setting /></el-icon>
      </div>

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <div class="avatar-wrapper">
            <div class="flex align-center">
              <img class="user-avatar mr10" :src="avatar" alt="" />
              <span>{{ username }}</span>
            </div>
            <el-icon class="el-icon--right" style="align-self: flex-end">
              <arrow-down />
            </el-icon>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup name="Tabbar">
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { Local } from '@/utils/storage';
import { storeToRefs } from 'pinia';
import useUserStore from '@/stores/modules/user';
import useAppStore from '@/stores/modules/app';

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();
const { avatar, username } = storeToRefs(userStore);

const onSetting = () => {
  appStore.openSetting();
};
const handleCommand = (command) => {
  console.log('command', command);
  switch (command) {
    case 'profile':
      router.push('/profile/index');
      break;
    case 'logout':
      ElMessageBox({
        closeOnClickModal: false,
        closeOnPressEscape: false,
        title: '提示',
        message: '此操作将退出登录, 是否继续?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        buttonSize: 'default',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '退出中';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 700);
          } else {
            done();
          }
        },
      })
        .then(async () => {
          // 清除缓存/token等
          Local.remove('token');
          // 使用 reload 时，不需要调用 resetRoute() 重置路由
          window.location.reload();
        })
        .catch(() => {});
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.tabbar {
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  .right-menu {
    margin-left: auto;
    margin-right: 20px;
    display: flex;
    align-items: center;
    .setting {
      margin-left: 10px;
      cursor: pointer;
    }
    .avatar-wrapper {
      display: flex;
      .user-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
  }
}
</style>
