---
title: js-1-数据类型
date: 2020-12-21 17:02:00
top: true
tags:
- 数据类型
categories:
- JavaScript
---
### 一、基本类型

> 基本类型：String、Number、null、undefined、Boolean、Symbol、Bigint
<!--more-->
- null

  - 在 JavaScript 中 null 表示 “什么都没有”。
  - null是一个只有一个值的特殊类型。表示一个空对象引用。
  - 用 typeof 检测 null 返回是object。

- undefined

  - 在 JavaScript 中, undefined 是一个没有设置值的变量。
  - typeof 一个没有值的变量会返回 undefined。

**null 和 undefined 的值相等，但类型不等**

### 二、引用类型

> 引用类型：Object，如果要细分的话有 Object、Array、Date、RegExp 和 Function等

### 三、两种类型区别

#### 3.1 存储

> 基本数据类型在被创建时，在栈上给其划分一块内存，将数值直接存储在栈上； 

> 引用数据类型在被创建时，首先在栈上创建一个引用，而对象的具体内容都存储在堆内存上，然后由栈上面的引用指向堆中对象的地址。

示例图：

![jssummary003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary003.jpg)

#### 3.2 拷贝

由于存储的位置不一样，直接拷贝的时候就会有两种情况：拷贝了值和拷贝了引用，也就是我们常说的深浅拷贝。

> 对于基本数据类型而言，没有深浅拷贝的概念，都是在栈上新开辟了一块内存给新的值。

> 而对于引用数据类型而言，区别简单来说就是会不会共享堆内存里的值，只进行引用地址的拷贝，最终指向同一份数据。

<br/>

参考1：[堆、栈、队列]()

参考2：[关于引用数据的深拷贝和浅拷贝]()