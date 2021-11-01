export default [
  {
    path: '/module-1',
    component: './index.jsx',
    routes: [
      {
        path: '/module-1/menu-1',
        component: './menu-1/index.jsx',
      },
      {
        path: '/module-1/menu-2',
        redirect: '/module-1/menu-2/name-1',
        routes: [
          {
            path: '/module-1/menu-2/name-1',
            component: './menu-1/one/index.jsx',
          },
          {
            path: '/module-1/menu-2/name-2',
            component: './menu-1/two/index.jsx',
          },
        ],
      },
    ],
  },
];
