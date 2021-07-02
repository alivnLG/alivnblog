---
title: vue2-项目解决方案-自动忽略console.log语句
date: 2021-06-25 16:07:13
top: true
tags:
categories:
- VUE
---
### 一、自动忽略 console.log 语句
<!--more-->
```js
export function rewirteLog() {
    console.log = (function (log) {
        return process.env.NODE_ENV == 'development'? log : function() {}
    }(console.log))
}
```

在 main.js 引入这个函数并执行一次，就可以实现忽略 console.log 语句的效果。