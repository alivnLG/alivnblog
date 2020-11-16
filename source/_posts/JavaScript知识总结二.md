---
title: JavaScript知识总结二
date: 2020-11-16 13:10:05
tags:
- js
categories:
- JavaScript
---
#### 1.JavaScript 的数据类型
基本数据类型：String、Boolean、Number、Symbol、null、undefined

引用数据类型：Object，如果要细分的话有 Object、Array、Date、RegExp 和 Function

#### 2.基本数据类型和引用数据类型区别
基本数据类型在被创建时，在栈上给其划分一块内存，将数值直接存储在栈上； 引用数据类型在被创建时，首先在栈上创建一个引用，而对象的具体内容都存储在堆内存上，然后由栈上面的引用指向堆中对象的地址。

#### 3.基本数据类型和引用数据类型拷贝区别
由于存储的位置不一样，直接拷贝的时候就会有两种情况：拷贝了值和拷贝了引用，也就是我们常说的深浅拷贝。

对于基本数据类型而言，没有深浅拷贝的概念，都是在栈上新开辟了一块内存给新的值。而对于引用数据类型而言，区别简单来说就是会不会共享堆内存里的值。

#### 4.深拷贝与浅拷贝

#### 5.数组去重的方式
##### 5.1 Hash
```
function unique(arr = []) {
  if (arr.length === 0 || arr.length === 1) {
    return arr;
  }
  const newArray = [];
  const hash = {};
  for (let i = 0; i < arr.length; i++) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = 1;
      newArray.push(arr[i]);
    }
  }
  return newArray;
}
```

##### 5.2 Set

```
function unique(arr = []) {
  if (arr.length === 0 || arr.length === 1) {
    return arr;
  }
  return [...new Set(arr)];
}
```

#### 6.找出数组中最大的数

```
function getArrayMax(arr = []) {
  if (!arr.length) return;
  if (arr.length === 1) {
    return arr[0];
  }
  return Math.max(...arr);
}
```

#### 7.事件循环

[事件循环](https://www.alivn.top/2020/11/13/%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E3%80%81%E5%AE%8F%E4%BB%BB%E5%8A%A1%E3%80%81%E5%BE%AE%E4%BB%BB%E5%8A%A1/)

#### 8.快排的实现

![jssummary001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary001.gif)

![jssummary002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary002.jpg)

#### 9.JavaScript设计模式

#### 10.TypeScript 和 JavaScript区别

