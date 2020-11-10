---
title: JQuery源码解析
date: 2020-06-03 16:30:33
tags:
- JQuery
categories:
- JavaScript
---

#### jquery源码解析

一个优美的JS库都会是在一个匿名函数里去写自己的代码
<!--more-->
整个代码是一个自执行函数(function(){})()
匿名函数自执行里面的所有东西都是一个局部的。防止和其他的代码冲突

如何访问到匿名函数自执行中的方法
可以把你要对外提供的接口作为window的属性或者是方法。
```
(function () {
    var a=10;
    function abc(){
        alert(a);
    }
    //将abc方法作为window的方法，就可以在匿名函数自执行外面进行访问了
    window.abc=abc;
})();
abc();
```
代码开头定义了一些变量和函数

定义jquery对外的接口 构造函数，此时以局部变量存在
```
  // Define a local copy of jQuery
  jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    // 在这个函数执行完了就是一个new构造函数的过程，返回的就是一个jQuery对象~~既然返回的是对象，
    // 当然可以调用方法喽~~
    return new jQuery.fn.init( selector, context );
  }
```
提供对外的接口，绑定到window全局对象上
```
if ( !noGlobal ) {
  window.jQuery = window.$ = jQuery;
}
```
给jQuery原型对象添加一些方法和属性。
```
jQuery.fn = jQuery.prototype = {
  // The current version of jQuery being used
  jquery: version,//版本号
  constructor: jQuery,
}
```
jQuery当中的一个继承方法，希望后续添加的方法都能挂在jQuery对象上，很方便扩展
```
jQuery.fn.extend(）
```
Sizzle.js 复杂选择器的实现，选择器引擎

Callbacks 回调对象 : 函数的统一管理

封装了一些属性和方法绑定到原型对象上，底层通过js实现

[详细查看jquery源码](https://code.jquery.com/jquery-3.4.1.js)
