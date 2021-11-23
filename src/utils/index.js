/*
 * @Description:工具函数
 * @Author: llgtfoo
 * @Date: 2021-11-23 15:31:33
 * @LastEditTime: 2021-11-23 15:32:53
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\utils\index.js
 */
/**
 * 数字转为千分位格式
 * @param {*} num 参数数字
 */
export const toThousands = (num) => {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

/**
 * 日期格式化
 * @param {*} num 参数数字
 */
export const time = (val = new Date(), format = 'yy-mm-dd h:m:s') => {
  let date = val;
  if (!date) {
    date = new Date();
  }
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const H = date.getHours();
  const M = date.getMinutes();
  const S = date.getSeconds();
  return format
    .replace('yy', y)
    .replace('mm', m >= 10 ? m : `0${m}`)
    .replace('dd', d >= 10 ? d : `0${d}`)
    .replace('h', H >= 10 ? H : `0${H}`)
    .replace('m', M >= 10 ? M : `0${M}`)
    .replace('s', S >= 10 ? S : `0${S}`);
};

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
  const delay = t || 500;
  let timer;
  return function () {
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
  let last;
  let timer;
  const interval = t || 500;
  return function () {
    const args = arguments;
    const now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
};
