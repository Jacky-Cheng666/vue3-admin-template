import { createApp } from 'vue';
import pinia from '@/stores/index';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/style/index.scss';
import App from './App.vue';
import router from './router';
import globalComponent from '@/components/index';
import '@/permission';
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(globalComponent);
app.use(pinia);
app.use(router);

app.mount('#app');
