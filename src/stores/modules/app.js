import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';

const useAppStore = defineStore('App', {
  state: () => ({
    // 是否折叠侧边栏
    foldSidebar: Local.get('foldSidebar'),
    // 是否显示设置面板
    showSettings: false,
    // 是否开启暗黑模式
    dark: Local.get('dark'),
    // 主题色
    primaryColor: Local.get('primaryColor') || '#409eff',
  }),
  actions: {
    toggleSidebar() {
      this.foldSidebar = !this.foldSidebar;
      Local.set('foldSidebar', this.foldSidebar);
    },
    openSetting() {
      this.showSettings = true;
    },
    // 切换暗黑模式
    toggleDark(value) {
      this.dark = value;
      Local.set('dark', value);
    },
    // 修改主题色
    changePrimaryColor(helx) {
      this.primaryColor = helx;
      Local.set('primaryColor', helx);
    },
  },
  getters: {},
});

export default useAppStore;
