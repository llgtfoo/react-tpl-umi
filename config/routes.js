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
        component: '@/pages/index.jsx',
        routes: [],
      },
    ],
  },
];
