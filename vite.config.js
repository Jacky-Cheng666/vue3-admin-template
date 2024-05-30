import { fileURLToPath, URL } from 'node:url';
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/variable.scss";',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9527,
    open: false,
    hmr: true,
  },
  define: {
    // eslint-disable-next-line no-undef
    __VERSION__: JSON.stringify(process.env.npm_package_version),
    // eslint-disable-next-line no-undef
    __NAME__: JSON.stringify(process.env.npm_package_name),
  },
}));
