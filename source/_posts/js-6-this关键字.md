---
title: js重点知识-6-this关键字
date: 2020-12-22 11:41:25
top: true
tags:
- this
categories:
- JavaScript
---
### 一、定义
<!--more-->
面向对象语言中 this 表示当前对象的一个引用。

this：代表对象。就是所在方法所属对象的引用。哪个对象调用了this所在的方法，this就代表哪个对象，就是哪个对象的引用。

但在 JavaScript 中 this 不是固定不变的，它会随着执行环境的改变而改变。

### 二、应用场景

- 在方法中，this 表示该方法所属的对象。 

- 如果单独使用，this 表示全局对象。  

- 在函数中，this 表示全局对象。  

- 在函数中，在严格模式下，this 是未定义的(undefined)。 

- 在事件中，this 表示接收事件的元素。  


<span style="color:red">类似 call() 和 apply() 方法可以将 this 引用到任何对象。</span>

<br/>

参考1：[call() 函数和 apply() 函数]()
