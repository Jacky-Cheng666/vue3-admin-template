<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup name="Main"></script>

<style lang="scss" scoped>
// 页面过渡动画
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
.main {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
}
</style>
