<template>
  <div class="screenfull" @click="fullScreen">
    <svg-icon
      v-if="!isFullscreen"
      width="20px"
      height="20px"
      name="full-screen"
    />
    <svg-icon v-else width="20px" height="20px" name="exit-full" />
  </div>
</template>

<script setup name="Screenfull">
import screenfull from 'screenfull';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const isFullscreen = ref(false);

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change);
  }
};
const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change);
  }
};

const fullScreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: '当前浏览器不支持全屏操作',
      type: 'warning',
    });
    return false;
  }
  screenfull.toggle();
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<style lang="scss" scoped>
.screenfull {
  cursor: pointer;
}
</style>
