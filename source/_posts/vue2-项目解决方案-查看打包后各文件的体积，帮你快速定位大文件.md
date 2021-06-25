---
title: vue2-项目解决方案-查看打包后各文件的体积，帮你快速定位大文件
date: 2021-06-25 16:18:05
top: true
tags:
categories:
- VUE
---
### 一、查看打包后各文件的体积，帮你快速定位大文件

如果你是vue-cli初始化的项目，会默认安装webpack-bundle-analyzer插件，该插件可以帮助我们查看项目的体积结构对比和项目中用到的所有依赖。也可以直观看到各个模块体积在整个项目中的占比。很霸道有木有~~

![vueProject014.gif](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject014.gif)

```
npm run build --report // 直接运行，然后在浏览器打开http://127.0.0.1:8888/即可查看
```

记得运行的时候先把之前npm run dev开启的本地关掉