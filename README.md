# react 基于@umijs/plugin-qiankun 微前端开发的子应用，配置父子应用dva数据交互
```
主应用(基座应用)：


import { initGlobalState, MicroAppStateActions } from 'qiankun';

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
微应用：

// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  props.setGlobalState(state);
}
```
# 包含常用表格组件的一整套封装、页面打开导航栏、菜单权限控制、dva数据交互模式、request接口请求方法。
## umiJS3.0 antd4.x

```
react-tpl-umi
├─ .editorconfig -------------------- > 代码格式化配置
├─ .env ----------------------------- > umi环境变量配置
├─ .gitignore ----------------------- > git提交忽略文件配置
├─ .prettierignore ------------------ > 代码格式化配置
├─ .prettierrc ---------------------- > 代码格式化配置
├─ config --------------------------- > umi架构配置
│  ├─ config.js --------------------- > 项目配置
│  ├─ proxy.js ---------------------- > 接口代理配置
│  └─ routes.js --------------------- > 路由集合
├─ mock ----------------------------- > mock数据接口模拟
├─ package.json --------------------- > 依赖包
├─ public --------------------------- > 静态文件copy 到输出路径
│  └─ iconfon ----------------------- > 阿里云离线图标
├─ README.md ------------------------ > 说明文档
├─ src
│  ├─ app.jsx ----------------------- > 运行时配置文件，扩展运行时的能力。
│  ├─ assets ------------------------ > 静态文件
│  ├─ components -------------------- > 组件集合
│  │  ├─ SettingDropdown ------------ > 用户设置组件
│  │  ├─ Stable --------------------- > 表格组件
│  │  └─ Tabs ----------------------- > 菜单展示导航组件
│  ├─ global.less ------------------- > 全局样式配置
│  ├─ layouts ----------------------- > 布局
│  │  ├─ BlankLayout.jsx ------------ > 项目入口
│  │  ├─ index.jsx ------------------ > 一级配置入口
│  │  └─ SiderMenu.jsx -------------- > 菜单组件入口
│  ├─ models ------------------------ > dva数据流
│  │  ├─ user.js -------------------- > 用户信息数据流
│  │  ├─ GlobalState.js ------------- > 微前端子应用数据交互
│  │  └─ common.js ------------------ > 公共dva数据流
│  ├─ pages ------------------------- > 页面集合
│  │  ├─ document.ejs --------------- > HTML 模板
│  │  ├─ home ----------------------- > 首页
│  │  │  ├─ api --------------------- > 接口方法集合
│  │  │  ├─ index.jsx --------------- > 页面
│  │  │  └─ models ------------------ > home页面dva数据流
│  │  ├─ index.js ------------------- >
│  │  ├─ module-1 ------------------- > 模块一
│  │  │  ├─ children ---------------- > 子菜单
│  │  │  │  ├─ menu-1 --------------- > 菜单一模块
│  │  │  │  │  ├─ api --------------- > 接口方法集合
│  │  │  │  │  ├─ index.jsx --------- > 页面
│  │  │  │  │  └─ models ------------ > 该菜单dva数据流
│  │  │  │  └─ menu-2 --------------- > 菜单二模块
│  │  │  │     ├─ api --------------- > 接口方法集合
│  │  │  │     ├─ models ------------ > 该菜单(包括子菜单)dva数据流
│  │  │  │     ├─ one --------------- > 子菜单一
│  │  │  │     └─ two --------------- > 子菜单二
│  │  │  ├─ index.jsx --------------- > 路由入口
│  │  │  └─ router.js --------------- > 模块一下的路由集合
│  │  ├─ module-2 ------------------- > 模块二
│  │  │  ├─ children ---------------- > 子菜单
│  │  │  │  └─ menu-1 --------------- > 菜单一模块
│  │  │  │     ├─ api --------------- > 接口方法集合
│  │  │  │     ├─ models ------------ > 该菜单(包括子菜单)dva数据流
│  │  │  │     ├─ one --------------- > 子菜单一
│  │  │  │     └─ two --------------- > 子菜单二
│  │  │  ├─ index.jsx --------------- > 路由入口
│  │  │  └─ router.js --------------- > 模块二下的路由集合
│  │  └─ notFound ------------------- > 404页面
│  ├─ permissions ------------------- > 路由拦截权限
│  │  ├─ isLoginState.jsx ----------- > 是否登录状态判断
│  │  └─ permission.jsx ------------- > 菜单访问权限
│  ├─ services ---------------------- > 公共接口集合
│  └─ utils ------------------------- > 公共方法
|     ├─ index.js ------------------- > 工具函数
│     └─ request.js ----------------- > 接口请求方法(request)
```
