import routerList from '../src/pages/index.js';

export default [
  {
    path: '/',
    component: '@/layouts/BlankLayout.jsx',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: '@/pages/Login/index.jsx',
      },
      {
        path: '/',
        component: '@/layouts/index.jsx',
        // wrappers: [
        //   '@/permission',
        // ],//菜单权限访问
        routes: [
          { path: '/', redirect: '/home' },
          {
            path: '/home',
            component: '@/pages/home/index.jsx',
            meta: { title: '首页' },
          },
          ...routerList, //页面路由
          {
            component: '@/pages/notFound/404.jsx',
          },
        ],
      },
    ],
  },
  {
    component: '@/pages/notFound/404.jsx',
  },
];
