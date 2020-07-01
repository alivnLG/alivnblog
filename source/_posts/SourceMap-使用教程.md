---
title: SourceMap 使用教程
date: 2020-07-01 17:51:42
tags:
- SourceMap
categories:
- 编程框架
---
### 1.前言
SourceMap 一个存储源代码与编译代码对应位置映射的信息文件
<!--more-->
在前端的工作中主要是用来解决以下三个方面出现的 debug 问题：

- 代码压缩混淆后
- 利用 sass 、typeScript 等其他语言编译成 css 或 JS 后
- 利用 webpack 等打包工具进行多文件合并后

上面三种情况，我们在调试时都是没办法像调试源码般轻松，这就需要 SourceMap 帮助我们在控制台中转换成源码，从而进行 debug 。

### 2.原理
实际上就是一个 JSON 键值对，利用 VLQ编码与特定的规则存储位置信息。

```
{
    version : 3,        //Source map的版本
    file: "out.js",      //转换后的文件名
    sourceRoot : "",   //转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空
    sources: ["foo.js", "bar.js"],   //转换前的文件。该项是一个数组，表示可能存在多个文件合并
    names: ["src", "maps", "are", "fun"],   //转换前的所有变量名和属性名
    mappings: "AAgBC,SAAQ,CAAEA"  //记录位置信息的字符串
}
```

### 3.使用方法
Google 开发出来的，所以目前只有 chrome 能够运行

#### 环境设置
进入开发者模式的设置中

![sourcemap001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/sourcemap001.jpg)

找到 Sources 栏，勾选上允许 JS SourceMap 与 css SourceMap （默认应该是选上的）

![sourcemap002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/sourcemap002.jpg)

