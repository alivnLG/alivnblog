---
title: web-10-Google V8引擎
date: 2021-01-05 11:53:02
top: true
tags:
- V8
categories:
- 前端综合
---
JavaScript引擎是执行JavaScript代码的程序或解释器。javaScript引擎可以实现为标准解释器或即时编译器，它以某种形式将JavaScript编译为字节码。
<!--more-->
V8 - 开源，由Google开发，用C ++编写

V8是被设计用来提高网页浏览器内部JavaScript执行的性能

为了提高性能，v8会把js代码转换为高效的机器码，而不在是依赖于解释器去执行。v8引入了
JIT在运行时把js代码进行转换为机器码。

v8充分多进程，主进程负责获取代码，编译生成机器码，有专门负责优化的进程，，还有一个监控进程负责分析那些代码执行比较慢，以遍Crankshaft 做优化，最后还有一个就是GC进程，负责内存垃圾回收。

v8的具体优化方案：

第一优化就是尽可能最大的内联。

第二优化就隐藏类。

第个是内联缓存

第四 Compilation to machine code

第五垃圾回收机制