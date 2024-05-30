<template>
  <el-drawer v-model="showSettings" size="280px" title="系统设置">
    <div class="mb10">
      <span class="mr10 font14">主题颜色</span>
      <el-color-picker
        :model-value="primaryColor"
        :teleported="true"
        show-alpha
        :predefine="predefineColors"
        @change="setColor"
      />
    </div>
    <div>
      <span class="mr10 font14">暗黑模式</span>
      <el-switch :model-value="dark" @change="onChangeDark" />
    </div>
  </el-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useAppStore from '@/stores/modules/app';
import { ref, watch } from 'vue';

const appStore = useAppStore();
const { showSettings, dark, primaryColor } = storeToRefs(appStore);

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#409eff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

const setColor = (val) => {
  appStore.changePrimaryColor(val);
};
const onChangeDark = () => {
  appStore.toggleDark(!dark.value);
};

watch(
  () => dark.value,
  (val) => {
    const html = document.documentElement;
    val ? (html.className = 'dark') : (html.className = '');
  },
  {
    immediate: true,
  },
);

watch(
  () => primaryColor.value,
  (val) => {
    const html = document.documentElement;
    html.style.setProperty('--el-color-primary', val);
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped></style>
