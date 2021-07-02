---
title: vue2-使用mockjs搭建mock server
date: 2021-06-25 16:20:13
top: true
tags:
- mock
categories:
- VUE
---
### 一、mockjs简介

当前端工程师需要独立于后端并行开发时,后端接口还没有完成,那么前端怎么获取数据？
<!--more-->
这时可以考虑前端搭建web server自己模拟假数据,mockjs用来生成随机数据,拦截 Ajax 请求。

下面引用mockjs官网的图片：

![mockjs001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mockjs001.jpg)

### 二、mockjs结合vue项目

#### 2.1 vue项目初始化

安装vue-cli脚手架工具,并初始化项目

```
//全局安装 vue-cli
npm install vue-cli -g
//创建一个基于 webpack 模板的新项目
vue init webpack mock-server-demo
//切换至mock-server-demo目录
cd mock-server-demo
```

安装依赖

```
//我们使用axios来发起http请求
npm install axios --save
//安装依赖mockjs
npm install mockjs --save-dev
```

#### 2.2 搭建web server,响应浏览器的http请求

web server不需要自己搭建或者另外安装依赖,在webpack-dev-server中已经封装好了,我们只需要直接那过来用就可以了。

1.在项目根路径下创建mock文件夹,并创建图片中mock文件夹中的几个文件

![mockjs002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mockjs002.jpg)

2.index.js 文件

```js
const Mock = require('mockjs');//mockjs 导入依赖模块
const util = require('./util');//自定义工具模块
//返回一个函数
module.exports = function(app){
    //监听http请求
    app.get('/user/userinfo', function (rep, res) {
        //每次响应请求时读取mock data的json文件
        //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
        var json = util.getJsonFile('./userInfo.json');
        //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
        res.json(Mock.mock(json));
    });
}
```

3.util.js 文件

```js
const fs = require('fs');//引入文件系统模块
const path = require('path');//引入path模块

module.exports = {
    //读取json文件
    getJsonFile:function (filePath) {
        //读取指定json文件
        var json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
        //解析并返回
        return JSON.parse(json);
    }
};
```

4.userInfo.json 文件

```json
{
    "error":0,
    "data":{
        "userid": "@id()",//随机生成用户id
        "username": "@cname()",//随机生成中文名字
        "date": "@date()",//随机生成日期
        "avatar": "@image('200x200','red','#fff','avatar')",//生成图片
        "description": "@paragraph()",//描述
        "ip": "@ip()",//IP地址
        "email": "@email()"//email
    }
}
```

4.在路径build/webpack.dev.conf.js文件中的devServer属性中新添加一个before钩子函数,用来监听来自web的http请求。(关于devServer.before如何使用)

```js
devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    before: require('../mock'),//引入mock/index.js
    watchOptions: {
      poll: config.dev.poll,
    }
  },
```

#### 2.3 浏览器发起请求，获取mock data

1.在App.vue文件中使用axios发起http请求

```js
export default {
  name: 'App',
  data(){
    return {
      userInfo:{}
    }
  },
  created(){
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
     //请求'/user/userinfo'接口
      this.axios.get('/user/userinfo')
      .then(({data})=>{
        //打印mock data
        console.log(data);
        if(data.error === 0){
          this.userInfo = data.data;
        }else{
          this.userInfo = {};
        }
        
      });
    }
  }
}
```

可以看到每次点击请求时会获取的随机生成的mock data。

![mockjs003.gif](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mockjs003.gif)

