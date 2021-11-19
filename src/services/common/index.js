/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-01 17:26:13
 * @LastEditTime: 2021-11-18 16:49:11
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\services\common\index.js
 */
import request from '@/utils/request';

/** 获取系统菜单 */
export async function fetchMenulist(data, options) {
  return await request('/api/getMenu', {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
}
