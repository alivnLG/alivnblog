---
title: JavaScript检查数据类型
date: 2020-11-11 11:25:10
top: true
tags:
- 数据类型
categories:
- JavaScript
---
> 基本数据类型: String , Boolean , undefined , null , Number , Symbol , BigInt
> 引用数据类型: Object , Array , RegExp ......
<!--more-->
- typeof [重点]
- instanceof
- constructor
- Object.prototype.toString.call [重点]

#### 一、typeof
##### 1.1 基本内容

- 定义 : 能够检测基本类型的运算符
- 语法  : typeof [value]
- 返回值  : [“string”、“number”、“boolean”、“undefined”、“object”、“function”、“symbol”、“bigint”]

结果如图所示 :

![jsjc001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc001.jpg)

##### 1.2 缺陷与不足

- typeof检测基本类型基本完美，但是引用类型可以说原地爆炸,例如数组对象 ，正则对象 ，new出来的数字对象...... 全部返回的是  字符串形式的Object
- 如NaN / Infinity 均为 “number”
- typeof null 为 "object"

结果如图所示 ：

![jsjc002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc002.jpg)

##### 1.3 常用场景

```
let x = {};
if（x != null && typeof x === "object"）{
	判断是否是对象，由于typeof null也是返回object，因此要排除它
}
```
#### 二、instanceof
##### 2.1 基本内容

- 定义 : 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
- 语法 : object instanceof constructor
- 返回值 : 布尔值

结果如图所示 :

[注] {}会在这里当成一个代码块，因此第一行报错

![jsjc003.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc003.jpg)

##### 2.2 缺陷与不足

- 无法检测基本类型，返回的都是false ，只能检测引用类型
- 由于instanceof是根据原型来检测类型的，返回值也是布尔类型，因此无法直观的看出数据类型
- 因为原型可以更改，有时候利用instanceof来判断不一定十分准确 

![jsjc004.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc004.jpg)

#### 三、constructor
##### 3.1 基本内容

- 定义 : 通过构造器来判断类型。
- 语法 : target.constructor == "类型名字"

![jsjc005.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc005.jpg)

##### 3.2 缺陷与不足

- 原理基本和instanceof一样，都是根据原型判断

#### 四、Object.prototype.toString.call()
##### 4.1 基本内容

- 定义 : 返回一个表示该对象的字符串。
- 语法 : Object.prototype.toString.call(params)
- 返回值 : "[object 类型]"

![jsjc006.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc006.jpg)

##### 4.2 基本原理

- Object.prototype.toString.call()中“[object 类型]”返回的值是由Symbol.toStringTag决定

![jsjc007.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsjc007.jpg)


```
var class2type = {};
["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error","Symbol","BigInt","GeneratorFunction"].forEach(item=>{
    class2type["[object "+item+"]"] = item.toLowerCase();
})
function toType(obj){
      if(obj==null){
        return obj+'';
      }
      return typeof obj === "object" || typeof obj === "function" ?
              class2type[toString.call(obj)] || "object" : typeof obj;
}
```

