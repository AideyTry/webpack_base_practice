/*
 * @Author: Aiden
 * @Date: 2021-05-27 13:49:54
 * @LastEditTime: 2021-05-27 13:53:19
 * @LastEditors: Aiden
 * @Description: 服务器代码
 * @Email: aiden.dai@bayconnect.com.cn
 */

// 两种启动方式：1.全局安装nodemon,启动：nodemon server.js;2.node server.js
const express = require('express');

const app = express();

app.use(express.static('dist', { maxAge: 1000 * 3600 }));

app.listen(3000);
