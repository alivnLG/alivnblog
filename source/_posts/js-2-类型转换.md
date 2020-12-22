---
title: js重点知识-2-类型转换
date: 2020-12-21 17:35:06
top: true
tags:
- 类型转换
categories:
- JavaScript
---
### 一、转换为boolean
<!--more-->
在条件判断时，除了undefined、null、false、NaN、''、0、-0，其他所有值都转为true，包括所有对象。

### 二、对象转基本类型

对象在转换基本类型时，首先会调用 valueOf 然后调用 toString。并且这两个方法你是可以重写的。

```js
let a = {
    valueOf() {
    	return 0
    }
}
```

当然你也可以重写 Symbol.toPrimitive ，该方法在转基本类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
  [Symbol.toPrimitive]() {
    return 2;
  }
}
1 + a // => 3
'1' + a // => '12'
```

### 三、四则运算符转换

只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。

其他运算只要其中一方是数字，那么另一方就转为数字。

并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。

```js
1 + '1' // '11'
2 * '2' // 4
[1, 2] + [2, 1] // '1,22,1'
// [1, 2].toString() -> '1,2'
// [2, 1].toString() -> '2,1'
// '1,2' + '2,1' = '1,22,1'
```

<span style="color:red">对于加号需要注意这个表达式 'a' + + 'b'</span>

```js
'a' + + 'b' // -> "aNaN"
// 因为 + 'b' -> NaN
// 你也许在一些代码中看到过 + '1' -> 1
```

![jssummary013](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary013.jpg)

上图中的 toPrimitive 就是对象转基本类型。

这里来解析一道题目 [] == ![] // -> true ，下面是这个表达式为何为 true 的步骤

```js
// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true
```

大家都知道 JS 中在使用运算符号或者对比符时，会自带隐式转换，规则如下:

- -、*、/、% ：一律转换成数值后计算

- +：

  - 数字 + 字符串 = 字符串， 运算顺序是从左到右

  - 数字 + 对象， 优先调用对象的valueOf -> toString

  - 数字 + boolean/null -> 数字

  - 数字 + undefined -> NaN

- [1].toString() === '1'

- {}.toString() === '[object object]'

- NaN !== NaN 、+undefined 为 NaN

### 四、转换为number

#### 4.1 Number([value])

- 字符串转换为数字:空字符串是0，如果字符串中出现任意一个非有效数字字符，结果都是NaN

- 布尔转换为数字:true=>1 false=>0

- null=>0 undefined=>NaN

- symbol不能转换为数字,报错

- bigInt可以转换为数字

- 引用类型(对象或者函数)

- 首先获取它的[Symbol.toPrimitive]属性值

- 如果没有这个属性，其次获取它的valueOf

- 如果还是没有原始值，再转换为字符串toString,然后再转换为数字Number

#### 4.2 parseInt/parseFloat([value])

- 需要保证[value]是一个字符串，如果不是则首先隐式的把其转换为字符串[value].toString()

- 从字符串左侧第一个字符开始向右查找，把找到的的有效数字字符，转换为数字(遇到一个非有效数字字符则停止查找，不论后面是否还有有效数字，都不再查找)

- 如果一个有效数字字符都没有找到，结果都是NaN

### 五、比较运算符转换

如果是对象，就通过 toPrimitive 转换对象

如果是字符串，就通过 unicode 字符索引来比较


