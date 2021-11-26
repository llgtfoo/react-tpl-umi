import { defineConfig } from 'umi';
import routes from './routes.js';
import proxy from './proxy.js';
import apps from './apps.js';

export default defineConfig({
  title: '基座',
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  antd: {},
  history: {
    type: 'hash',
  },
  dva: {
    hmr: true,
    lazyLoad: true,
  },
  targets: {
    ie: 9,
  },
  // theme: {
  //   "primary-color": "#1890ff",
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  routes, //路由
  proxy, //接口代理
  fastRefresh: {},
  // mfsu: {},
  ignoreMomentLocale: true,
  webpack5: {},
  autoprefixer: {},
  // plugin: [],//配置额外的 umi 插件
  qiankun: {
    master: {
      title: '子应用',
      // 注册子应用信息
      apps: apps,
      sandbox: {
        strictStyleIsolation: true,
        experimentalStyleIsolation: true,
      },
    },
  },
});
