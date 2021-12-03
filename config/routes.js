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
        wrappers: ['@/permissions/isLoginState'], //登录状态
        // wrappers: ['@/permissions/permission'], //菜单权限访问
        routes: [
          { path: '/', redirect: '/home' },
          {
            path: '/home',
            component: '@/pages/home/index.jsx',
            meta: { title: '首页' },
          },
          {
            path: '/sysetem-1',
            microApp: 'app1',
            microAppProps: {
              autoSetLoading: false,
              // // 微应用容器 class
              // className: "myContainer",
              // // wrapper class，仅开启 loading 动画时生效
              // wrapperClassName: "myWrapper",
            },
          },
          {
            path: '/sysetem-2',
            microApp: 'app2',
          },
          // ...routerList, //页面路由
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
