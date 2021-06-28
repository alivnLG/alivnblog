---
title: js-31-load事件与DomContentLoaded事件的区别
date: 2021-01-05 10:25:41
top: true
tags:
- load
- DomContentLoaded
categories:
- JavaScript
---
### 一、概念
<!--more-->
#### DOMContentLoaded

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

DOMContentLoaded 事件在 html文档加载完毕，并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发。

#### load

load 仅用于检测一个完全加载的页面，页面的html、css、js、图片等资源都已经加载完之后才会触发 load 事件。


