/*
 * @Author: Aiden
 * @Date: 2021-05-20 15:51:32
 * @LastEditTime: 2021-06-08 10:55:29
 * @LastEditors: Aiden
 * @Description:
 * @Email: aiden.dai@bayconnect.com.cn
 */
import Vue from 'vue';
import './styles/style.css';
import './styles/style.less';
import './fonts/iconfont.css';
// import print from './js/print';

const sum = function sum(a, b) {
  return a + b;
};

console.log('vue=', Vue);

sum(3, 5);
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});
// print();
console.log('promise=888', promise);

// // 添加添加支持HMR功能的代码
// if (module.hot) {
//   // 一旦module.hot为true, 说明开启了HMR功能 -->让HMR功能代码生效
//   module.hot.accept('./js/print.js', () => {
//     // 方法会监听print.js文件的变化，一旦发生了变化，其他模块不会重新打包构建。
//     // 会执行后面的回调函数
//     print();
//   });
// }

document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */ './js/prints').then(( prints ) => {
    console.log('prints===', prints);
    prints.default.prints();
  });
};
