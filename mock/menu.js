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
    await waitTime(1000);
    res.send({
      success: true,
      data: [
        {
          icon: '',
          title: '首页',
          name: '',
          url: '/home',
          parentUrl: '',
          parentName: '',
        },
        {
          icon: '',
          title: '模块一',
          name: '',
          url: '/module-1',
          parentUrl: '',
          parentName: '',
          children: [
            {
              icon: '',
              title: '菜单一',
              name: '',
              url: '/module-1/menu-1',
              parentName: '模块一',
              parentUrl: '/module-1',
            },
            {
              icon: '',
              title: '菜单二',
              name: '',
              url: '/module-1/menu-2',
              parentName: '模块一',
              parentUrl: '/module-1',
              children: [
                {
                  icon: '',
                  title: '菜单二-1',
                  name: '',
                  url: '/module-1/menu-2/name-1',
                  parentName: '模块一',
                  parentUrl: '/module-1/menu-2',
                },
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-1/menu-2/name-2',
                  parentName: '模块一',
                  parentUrl: '/module-1/menu-2',
                },
              ],
            },
            {
              icon: '',
              title: '菜单三',
              name: '',
              url: '/module-1/menu-3',
              parentName: '模块一',
              parentUrl: '/module-1',
              children: [
                {
                  icon: '',
                  title: '菜单二-1',
                  name: '',
                  url: '/module-1/menu-3/name-1',
                  parentName: '模块一',
                  parentUrl: '/module-1/menu-3',
                },
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-1/menu-3/name-2',
                  parentName: '模块一',
                  parentUrl: '/module-1/menu-3',
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
          parentName: '',
          parentUrl: '',
          children: [
            {
              icon: '',
              title: '菜单二',
              name: '',
              url: '/module-2/menu-1',
              parentName: '模块二',
              parentUrl: '/module-2',
              children: [
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-2/menu-1/name-1',
                  parentName: '模块二',
                  parentUrl: '/module-2/menu-1',
                },
                {
                  icon: '',
                  title: '菜单二-2',
                  name: '',
                  url: '/module-2/menu-1/name-2',
                  parentName: '模块二',
                  parentUrl: '/module-2/menu-1',
                },
              ],
            },
          ],
        },
      ],
    });
  },
};
