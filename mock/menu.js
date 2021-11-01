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
    res.send({
      success: true,
      data: [
        {
          icon: '',
          title: '首页',
          name: '',
          url: '/home',
          parent: '首页',
        },
        {
          icon: '',
          title: '模块一',
          name: '',
          url: '/module-1',
          parent: '模块一',
          children: [
            {
              icon: '',
              title: '菜单一',
              name: '',
              url: '/module-1/menu-1',
              parent: '模块一',
            },
            {
              icon: '',
              title: '菜单二',
              name: '',
              url: '/module-1/menu-2',
              parent: '模块一',
              children: [
                {
                  icon: '',
                  title: '菜单二-1',
                  name: '',
                  url: '/module-1/menu-2/name-1',
                  parent: '模块一',
                },
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-1/menu-2/name-2',
                  parent: '模块一',
                },
              ],
            },
          ],
        },
        {
          icon: '',
          title: '模块二',
          name: '',
          url: '/module-2',
          parent: '模块二',
          children: [
            {
              icon: '',
              title: '菜单二',
              name: '',
              url: '/module-2/menu-2',
              parent: '模块二',
              children: [
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-2/menu-2/name-1',
                  parent: '模块二',
                },
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-2/menu-2/name-2',
                  parent: '模块二',
                },
              ],
            },
          ],
        },
      ],
    });
  },
};
