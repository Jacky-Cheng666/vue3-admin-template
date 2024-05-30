<template>
  <div class="sidebar-logo-container">
    <img class="logo" src="@/assets/images/logo.png" alt="" />
    <span>{{ settings.title }}</span>
  </div>
</template>

<script setup name="Logo">
import settings from '@/settings';
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  .logo {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  span {
    flex: 1;
    white-space: nowrap;
    display: inline-block;
    font-size: $base-logo-title-fontSize;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
