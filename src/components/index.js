import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Hamburger from './Hamburger/index.vue';
import Breadcrumb from './Breadcrumb/index.vue';
import Screenfull from './Screenfull/index.vue';
import SvgIcon from './SvgIcon/index.vue';
import RightToolbar from './RightToolbar/index.vue';

const globalComponent = { Hamburger, Breadcrumb, Screenfull, SvgIcon, RightToolbar };

export default {
  install(app) {
    //注册项目全部的全局组件
    Object.keys(globalComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, globalComponent[key]);
    });
    //将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
