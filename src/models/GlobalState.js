/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-29 15:55:56
 * @LastEditTime: 2021-12-03 17:12:28
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\models\GlobalState.js
 */
import { initGlobalState } from 'qiankun';
import { getDvaApp } from 'umi';
import user from './user';
const actions = initGlobalState(user.state);

// 定义一个获取state的方法
actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState;
};

actions.onGlobalStateChange((newState, prev) => {
  console.log(newState, 'newState');
  if (JSON.stringify(newState) === JSON.stringify(prev)) {
    return;
  }
  // state: 变更后的状态; prev 变更前的状态
  if (getDvaApp()) {
    getDvaApp()._store.dispatch({
      type: 'user/fetchUser',
      payload: newState,
    });
  } else {
    user.state = newState;
  }
});

export default actions;
