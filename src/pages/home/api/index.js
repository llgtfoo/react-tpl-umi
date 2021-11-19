/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-18 09:53:27
 * @LastEditTime: 2021-11-18 10:05:27
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\pages\home\api\index.js
 */
import request from '@/utils/request';
export async function fetchTest(data, options) {
  return request('/api/test/list', {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
}
