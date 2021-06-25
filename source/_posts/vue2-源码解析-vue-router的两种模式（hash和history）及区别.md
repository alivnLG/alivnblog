---
title: vue2-源码解析-vue-router的两种模式（hash和history）及区别
date: 2020-10-10 14:38:38
tags:
categories:
- VUE
---
### 一、vue-router的两种模式（hash和history）及区别

前端路由的核心，就在于——改变试图的同时不会向后端发出请求。

（1）hash - 即地址栏URL中的 # 符号（此hash不是密码学里的散列运算）
比如这个```URL：http：//www.abc.com/#/hello,hash```的值为#/hello.它的特点在于：hash虽然出现在URL中，但不会被包括在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。

（2）history - 利用了HTML5 History Interface中新增的pushState()和replaceState（）方法。（需要特定浏览器支持）

这两个方法应用于浏览器的历史记录栈，在当前已有的back、forward、go的基础上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的URL，但浏览器不会即向后端发送请求。

因此可以说，hash模式和histoury模式都是属于浏览器自身的特性，Vue-Router只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。

```
1：pushState()设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，因此只能设置与当前URL同文档的URL；
2：pushState()设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
3：pushState()通过stateObject参数可以添加任意类型的数据到记录中；而hash只可添加短字符串；
4：pushState()可额外设置title属性供后续使用。
```

当然history也不是样样都好。SPA虽然在浏览器里游刃有余，单真要通过URL向后端发起HTTP请求时，两者的差异就来了。尤其在用户手动输入URL后回车，或者刷新（重启）浏览器的时候。

```
1：hash 模式下，仅hash符号之前的内容会被包含在请求中，如http://www.abc.com,因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。
2：history模式下，前端的URL必须和实际向后端发起请求的URL一致。如htttp://www.abc.com/book/id。如果后端缺少对/book/id 的路由处理，将返回404错误、
```