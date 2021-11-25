/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-18 09:35:02
 * @LastEditTime: 2021-11-25 08:16:42
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\mock\test.js
 */
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default {
  //菜单接口
  'GET /api/test/list': async (req, res) => {
    await waitTime(500);
    let data = [];
    for (let i = 0; i < 3; i++) {
      data.push({
        name: `llgtfoo-${i}`,
        age: i + 10,
        address: `安徽省合肥市xx区xx街道xx社区xx小区xx栋xx室-${i}`,
        email: 'llgtfoo@163.com',
      });
    }
    res.send({
      success: true,
      data: data,
    });
  },
};
