<template>
  <div class="hamburger" @click="toggleClick">
    <component :is="fold ? 'Expand' : 'Fold'"></component>
  </div>
</template>

<script setup name="Hamburger">
import useAppStore from '@/stores/modules/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { foldSidebar: fold } = storeToRefs(appStore);

const toggleClick = () => {
  appStore.toggleSidebar();
};
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin-left: 20px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
