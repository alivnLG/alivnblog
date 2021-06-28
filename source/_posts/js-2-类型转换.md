---
title: js-2-类型转换
date: 2020-12-21 17:35:06
top: true
tags:
- 类型转换
categories:
- JavaScript
---
### 一、强弱类型语言

参考文章《强类型语言、弱类型语言》

### 二、类型转换

#### 2.1 显示类型转换

显示类型转换比较简单，通过 JS 提供的一些函数，可以直接进行转换

- 转化为 Number 类型：Number() / parseFloat() / parseInt()
- 转化为 String 类型：String() / toString()
- 转化为 Boolean 类型: Boolean()

undefined、null、false、+0、-0、NaN、""  只有这些 toBoolean()  是 false ，其余都为 true

Number类定义的toString()方法可以接受表示转换基数的可选参数，如果不指定此参数，转换规则将是基于十进进制。number.toString(radix),radix可选。规定表示数字的基数，是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。

对象到字符串的转换经过了如下步骤：

- 如果对象具有toString()方法，则调用这个方法。如果它返回一个基本类型值，js将这个值转换为字符串，并返回这个字符串。
- 如果对象没有toString()方法，或者这个方法返回的不是一个基本类型值，那么js将调用valueOf()方法。如果存在这个方法，则调用，如果返回值是基本类型值，转换为字符串并返回
- 否则，js无法从toString()或valueOf()获得一个基本类型值，此时将会抛出类型错误异常

#### 2.2 ToPrimitive将值转为原始值

ToPrimitive将接收到的参数转化为原始类型：

```js
ToPrimitive(data, PreferredType?)
```

data是要转换的值， PreferredType 是可选参数，ToPrimitive  运算符把其值参数转换为非对象类型。如果对象有能力被转换为不止一种原语类型（接受参数 number string ），可以使用可选的 PreferredType 来选择类型。

![typeConversion001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/typeConversion001.jpg)

在执行 ToPrimitive(data,preferredType) 时如果第二个参数为空并且 data 为 Date 的事例时，此时preferredType 会
被设置为String，其他情况下preferredType都会被设置为 Number

如果 preferredType 为 Number，ToPrimitive执行过程如下：

- 1.如果data为原始值，直接返回；
- 2.否则调用 data.valueOf()，如果执行结果是原始值，返回之；
- 3.否则调用 data.toString()，如果执行结果是原始值，返回之；
- 4.否则抛异常。

如果 preferredType 为String，将上面的第2步和第3步调换，即：

- 1.如果data为原始值，直接返回；
- 2.否则调用 data.toString()，如果执行结果是原始值，返回之；
- 3.否则调用 data.valueOf()，如果执行结果是原始值，返回之；
- 4.否则抛异常。

#### 2.3 隐式转换

隐式转换主要涉及的是两个操作符， +  和 ==

##### 2.3.1 一元 +  运算符, 一元 -  运算符

![typeConversion002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/typeConversion002.jpg)

- 一元 + 运算符如果后面是 Number 类型的话，会将其转换为 Number 类型;
- 如果后面不是 Number 的话，就会将调用 ToNumber  方法。

```js
// String
const a = '123'

typeof a
"string"
const b = +a

typeof b
"number"

// Object
const c = {}

typeof c
"object"
const d = +{}

typeof d
"number"

d
NaN
```

##### 2.3.2 加法运算符

![typeConversion003.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/typeConversion003.jpg)

我们可以看到，5、6 是将左侧的表达式和右侧的表达式都执行了一遍 ToPrimitive
注意第 7 条，也就是说，如果表达式左侧或者表达式右侧是 String的话，返回 toString()  之后连接而成的字符串

```js
1 + '1'
"11"
```

#### 2.3.3 == 抽象等运算符

![typeConversion004.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/typeConversion004.jpg)

主要分为 x 和 y 类型相同和类型不同的情况，类型相同时没有类型转换，类型不同时

- x, y 为 null、undefined 两者中一个   // 返回true
- x、y为 Number 和 String 类型时，则转换为 Number 类型比较。
- 有 Boolean 类型时，Boolean 转化为 Number 类型比较。
- 一个 Object 类型，一个 String 或 Number 类型，将 Object 类型进行原始转换（ToPrimitive）后，按上面流程进行原始值比较。

![typeConversion005.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/typeConversion005.jpg)

