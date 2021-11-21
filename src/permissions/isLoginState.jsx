/*
 * @Description:登录状态验证
 * @Author: llgtfoo
 * @Date: 2021-11-18 14:47:39
 * @LastEditTime: 2021-11-21 13:22:20
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\permissions\isLoginState.jsx
 */
import { Redirect } from 'umi';
const isLoginState = (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default isLoginState;

function useAuth() {}
