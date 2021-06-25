---
title: vue2-项目解决方案-本地开发环境请求服务器跨域的问题
date: 2021-06-25 16:08:29
top: true
tags:
categories:
- VUE
---
### 一、本地开发环境请求服务器接口跨域的问题

![vueProject001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject001.jpg)

上面的这个报错大家都不会陌生，报错是说没有访问权限（跨域问题）。本地开发项目请求服务器接口的时候，因为客户端的同源策略，导致了跨域的问题。

下面先演示一个没有配置允许本地跨域的的情况：

![vueProject002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject002.jpg)

![vueProject003.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject003.jpg)

![vueProject004.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject004.jpg)

可以看到，此时我们点击获取数据，浏览器提示我们跨域了。所以我们访问不到数据。

那么接下来我们演示设置允许跨域后的数据获取情况：

![vueProject005.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject005.jpg)

![vueProject006.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject006.jpg)

![vueProject007.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject007.jpg)

注意：配置好后一定要关闭原来的server，重新npm run dev启动项目。不然无效。

我们在1处设置了允许本地跨域，在2处，要注意我们访问接口时，写的是```/api```，此处的/api指代的就是我们要请求的接口域名。如果我们不想每次接口都带上```/api```，可以更改axios的默认配置```axios.defaults.baseURL = '/api'```;这样，我们请求接口就可以直接```this.$axios.get('app.php?m=App&c=Index&a=index')```，很简单有木有。此时如果你在network中查看xhr请求，你会发现显示的是```localhost:8080/api```的请求地址。这样没什么大惊小怪的，代理而已：

![vueProject008.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject008.jpg)

好了，最后附上proxyTable的代码：

```js
proxyTable: {
      // 用‘/api’开头，代理所有请求到目标服务器
      '/api': {
        target: 'http://jsonplaceholder.typicode.com', // 接口域名
        changeOrigin: true, // 是否启用跨域
        pathRewrite: { //
          '^/api': ''
        }
      }
}
```

注意：配置好后一定要关闭原来的server，重新npm run dev启动项目。不然无效。
