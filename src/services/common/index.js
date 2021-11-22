/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-01 17:26:13
 * @LastEditTime: 2021-11-22 09:19:40
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\services\common\index.js
 */
import request from '@/utils/request';

/** 获取系统菜单 */
export const fetchMenulist = async (data, options) => {
  return await request('/api/getMenu', {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
};
