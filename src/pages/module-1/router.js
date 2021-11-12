export default [
  {
    path: '/module-1',
    component: '@/pages/module-1/index.jsx',
    meta: { title: '模块一' },
    routes: [
      {
        path: '/module-1',
        redirect: '/module-1/menu-1',
      },
      {
        path: '/module-1/menu-1',
        component: '@/pages/module-1/children/menu-1/index.jsx',
        meta: { title: '菜单一' },
      },
      {
        path: '/module-1/menu-2',
        redirect: '/module-1/menu-2/name-1',
        meta: { title: '菜单二' },
      },
      {
        path: '/module-1/menu-2/name-1',
        component: '@/pages/module-1/children/menu-2/one/index.jsx',
        meta: { title: '菜单二1' },
      },
      {
        path: '/module-1/menu-2/name-2',
        component: '@/pages/module-1/children/menu-2/two/index.jsx',
        meta: { title: '菜单二2' },
      },
      {
        component: '@/pages/notFound/404.jsx',
      },
    ],
  },
];
