export default [
  {
    path: '/module-2',
    component: '@/pages/module-2/index.jsx',
    meta: { title: '模块一' },
    routes: [
      // {
      //   path: '/module-2',
      //   redirect: '/module-2/menu-1',
      // },
      // {
      //   path: '/module-2/menu-1',
      //   redirect: '/module-2/menu-1/name-1',
      //   meta: { title: '菜单一' },
      // },
      {
        path: '/module-2/menu-1/name-1',
        component: '@/pages/module-2/children/menu-1/one/index.jsx',
        meta: { title: '菜单一1' },
      },
      {
        path: '/module-2/menu-1/name-2',
        component: '@/pages/module-2/children/menu-1/two/index.jsx',
        meta: { title: '菜单一2' },
      },
      {
        component: '@/pages/notFound/404.jsx',
      },
    ],
  },
];
