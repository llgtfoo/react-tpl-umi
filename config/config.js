import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '子应用',
  hash: true,
  antd: {},
  history: {
    type: 'hash',
  },
  qiankun: {
    slave: {},
  },
  dva: {
    hmr: true,
    lazyLoad: false,
  },
  targets: {
    ie: 9,
  },
  // theme: {
  //   "primary-color": "#1890ff",
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  routes, //路由
  proxy, //接口代理
  fastRefresh: {},
  // mfsu: {},
  ignoreMomentLocale: true,
  webpack5: {},
  autoprefixer: {},
  // plugin: [],//配置额外的 umi 插件
});
