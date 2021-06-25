---
title: vue2-项目解决方案-fastClick的300ms延迟解决方案
date: 2021-06-25 16:17:52
top: true
tags:
categories:
- VUE
---
### 一、fastClick的300ms延迟解决方案

开发移动端项目，点击事件会有300ms延迟的问题。至于为什么会有这个问题，请自行百度即可。这里只说下常见的解决思路，不管vue项目还是jq项目，都可以使用fastClick解决。

安装 fastClick:

```shell
cnpm install fastclick -S
```

在main.js中引入fastClick和初始化:

```js
import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclick
```