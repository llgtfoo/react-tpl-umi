/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-01 17:26:19
 * @LastEditTime: 2021-12-03 10:51:27
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\services\login\index.js
 */
import request from '@/utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(data, options) {
  return request('/api/currentUserInfo', {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
}
export async function isLoginState(data, options) {
  return request('/api/isLoginState', {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body, options) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
