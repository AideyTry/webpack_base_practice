<!--
 * @Author: Aiden
 * @Date: 2021-05-26 13:31:46
 * @LastEditTime: 2021-05-26 15:38:10
 * @LastEditors: Aiden
 * @Description: 
 * @Email: aiden.dai@bayconnect.com.cn
-->
## 遇到的问题
### 1、webpack5.x新版本中，package.json中如果配置了browserslist后则热更新不生效，需要将浏览器兼容性写到.browserslistic文件中；(但写在browserslistic中会存在兼容IE问题，需要再验证一下)
```
在package.json中写法如下：
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
      "ie 11"
    ],
    "production": [
      ">0.2%",
      "not dead"
    ]
  },
```
