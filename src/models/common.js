import { fetchMenulist } from '@/services/common/index';
export default {
  namespace: 'common',
  state: {
    menuList: [], //菜单集合
    siderMenu: [], //侧边菜单
  },
  // 初始化调用
  subscriptions: {
    setup({ dispatch, history }) {
      // 监听路有变化
      history.listen(({ pathname }) => {
        console.log(pathname, 'common');
      });
    },
  },

  effects: {
    // 异步改变state中menuList
    *fetchMenuList({ payload: { currentUrl } }, { call, put }) {
      //   // call 触发接口调用
      const result = yield call(fetchMenulist);
      if (result.success) {
        //   put 触发改变reducers中方法action-setMenuList
        yield put({ type: 'setMenuList', data: result.data });
        const currentMenu = result.data.filter((v) => v.url === currentUrl);
        let array = [];
        if (currentMenu.length > 0) {
          if (currentMenu[0].children && currentMenu[0].children.length > 0) {
            array = currentMenu[0].children;
          } else {
            array = [];
          }
        }
        // put 触发改变reducers中方法action-setSiderMenu
        yield put({ type: 'setSiderMenu', data: array });
      }
    },
    *setSiderMenus({ payload: { currentMenu } }, { call, put }) {
      yield put({ type: 'setSiderMenu', data: currentMenu });
    },
  },

  reducers: {
    // 改变state中menuList
    setSiderMenu(state, action) {
      return { ...state, siderMenu: action.data };
    },
    // 改变state中menuList
    setMenuList(state, action) {
      return { ...state, menuList: action.data };
    },
  },
};
