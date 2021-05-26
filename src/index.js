/*
 * @Author: Aiden
 * @Date: 2021-05-20 15:51:32
 * @LastEditTime: 2021-05-26 11:28:25
 * @LastEditors: Aiden
 * @Description:
 * @Email: aiden.dai@bayconnect.com.cn
 */

import './styles/style.css';
import './styles/style.less';
import './fonts/iconfont.css';

const sum = function sum(a, b) {
  return a + b;
};

sum(3, 5);
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

console.log('promise=9', promise);
