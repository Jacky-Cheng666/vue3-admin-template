<template>
  <div class="layout-container">
    <div :class="{ fold }" class="sidebar">
      <Logo v-if="settings.sidebarLogo" />
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="fold"
          router
          background-color="#001529"
          text-color="white"
          unique-opened
          :collapse-transition="false"
          :default-active="$route.path"
        >
          <SubMenu v-for="route in routes" :key="route.path" :item="route" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="main-container" :class="{ fold }">
      <Tabbar />
      <Main />
    </div>
    <RightPanel />
  </div>
</template>

<script setup name="Layout">
import Logo from './Logo/index.vue';
import settings from '@/settings';
import SubMenu from './SubMenu/index.vue';
import Tabbar from './Tabbar/index.vue';
import Main from './Main/index.vue';
import { storeToRefs } from 'pinia';
import useAppStore from '@/stores/modules/app';
import useRoutesList from '@/stores/modules/routesList';
import RightPanel from './RightPanel/index.vue';

const { foldSidebar: fold } = storeToRefs(useAppStore());
const routesList = useRoutesList();
const { routes } = storeToRefs(routesList);
</script>

<style lang="scss" scoped>
.layout-container {
  min-width: 800px;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .sidebar {
    flex-shrink: 0;
    color: #ffffff;
    width: $base-menu-width;
    height: 100%;
    background: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
    .scrollbar {
      box-sizing: border-box;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .main-container {
    position: relative;
    box-sizing: border-box;
    transition: all 0.3s;
    width: calc(100vw - $base-menu-width);
    &.fold {
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
