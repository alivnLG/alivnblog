---
title: vue2-项目解决方案-rem文件的导入问题
date: 2021-06-25 16:17:01
top: true
tags:
categories:
- VUE
---
### 一、rem文件的导入问题

我们在做手机端时，适配是必须要处理的一个问题。例如，我们处理适配的方案就是通过写一个rem.js，原理很简单，就是根据网页尺寸计算html的font-size大小，基本上小伙伴们都知道，这里直接附上代码，不多做介绍。
<!--more-->
```js
;(function(c,d){var e=document.documentElement||document.body,a="orientationchange" in window?"orientationchange":"resize",b=function(){var f=e.clientWidth;e.style.fontSize=(f>=750)?"100px":100*(f/750)+"px"};b();c.addEventListener(a,b,false)})(window);
```

这里说下怎么引入的问题，很简单。在main.js中，直接import './config/rem'导入即可。import的路径根据你的文件路径去填写。