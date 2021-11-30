const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default {
  //菜单接口
  'GET /api/getMenu': async (req, res) => {
    await waitTime(500);
    res.send({
      success: true,
      data: [
        {
          icon: 'icon-all-fill',
          title: '首页',
          name: '',
          url: '/home',
          parentUrl: '',
          parentName: '',
        },
        {
          icon: 'icon-column',
          title: '子应用1',
          name: '',
          url: '/sysetem-1',
          parentUrl: '',
          parentName: '',
        },
        {
          icon: 'icon-integral-fill',
          title: '子应用2',
          name: '',
          url: '/sysetem-2',
          parentUrl: '',
          parentName: '',
        },
        // {
        //   icon: 'icon-column',
        //   title: '模块一',
        //   name: '',
        //   url: '/module-1',
        //   parentUrl: '',
        //   parentName: '',
        //   children: [
        //     {
        //       icon: 'icon-integral-fill',
        //       title: '菜单一',
        //       name: '',
        //       url: '/module-1/menu-1',
        //       parentName: '模块一',
        //       parentUrl: '/module-1',
        //     },
        //     {
        //       icon: 'icon-online-tracking-fill',
        //       title: '菜单二',
        //       name: '',
        //       url: '/module-1/menu-2',
        //       parentName: '模块一',
        //       parentUrl: '/module-1',
        //       children: [
        //         {
        //           icon: 'icon-online-tracking-fill',
        //           title: '菜单二-1',
        //           name: '',
        //           url: '/module-1/menu-2/name-1',
        //           parentName: '模块一',
        //           parentUrl: '/module-1/menu-2',
        //         },
        //         {
        //           icon: 'icon-beauty',
        //           title: '菜单二-2',
        //           name: '',
        //           url: '/module-1/menu-2/name-2',
        //           parentName: '模块一',
        //           parentUrl: '/module-1/menu-2',
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   icon: 'icon-inspection',
        //   title: '模块二',
        //   name: '',
        //   url: '/module-2',
        //   parentName: '',
        //   parentUrl: '',
        //   children: [
        //     {
        //       icon: 'icon-manage-order',
        //       title: '菜单二',
        //       name: '',
        //       url: '/module-2/menu-1',
        //       parentName: '模块二',
        //       parentUrl: '/module-2',
        //       children: [
        //         {
        //           icon: 'icon-trade-assurance',
        //           title: '菜单二-1',
        //           name: '',
        //           url: '/module-2/menu-1/name-1',
        //           parentName: '模块二',
        //           parentUrl: '/module-2/menu-1',
        //         },
        //         {
        //           icon: 'icon-jizhuangxiang',
        //           title: '菜单二-2',
        //           name: '',
        //           url: '/module-2/menu-1/name-2',
        //           parentName: '模块二',
        //           parentUrl: '/module-2/menu-1',
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    });
  },
};
