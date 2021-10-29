import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
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
  },
  targets: {
    ie: 9,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  routes, //路由
  proxy, //接口代理
  fastRefresh: {},
  mfsu: {},
  ignoreMomentLocale: true,
  // layout:{}
  webpack5: {},
  autoprefixer: {},
  extraBabelPlugins: ['babel-plugin-import-glob'],
});
