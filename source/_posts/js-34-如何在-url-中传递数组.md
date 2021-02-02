---
title: js重点知识-34-如何在 url 中传递数组
date: 2021-01-05 10:25:44
top: true
tags:
- url
categories:
- JavaScript
---
### 一、分析
<!--more-->
在 URL 中如何传递数组这种复杂的数据，完全取决于项目中前后端成员关于复杂数据在 URL 中传输的约定，一般情况下可以使用以下方式来传递数组。

```js
a=3&a=4&a=5

a=3,4,5

a[]=3&a[]=4&a[]=5

a[0]=3&a[1]=4&a[2]=5
```

但同样，需要后端开发者写一个 querystring.parse 来对指定的格式解析进行支持，同时也有对各种复杂 qs 支持较好的 package，比如：

- qs: 据说是对 querystring 复杂对象解析最好的库



