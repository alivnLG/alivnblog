---
title: vue2-项目解决方案-打包后.map文件过大的问题
date: 2021-06-25 16:17:38
top: true
tags:
categories:
- VUE
---
### 一、打包后.map文件过大的问题

项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。 而生成的.map后缀的文件，就可以像未加密的代码一样，准确的输出是哪一行哪一列有错可以通过设置来不生成该类文件。但是我们在生成环境是不需要.map文件的，所以可以在打包时不生成这些文件：

在config/index.js文件中，设置productionSourceMap: false,就可以不生成.map文件

![vueProject013.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject013.jpg)