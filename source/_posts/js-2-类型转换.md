---
title: js重点知识-2-类型转换
date: 2020-12-21 17:35:06
tags:
- 类型转换
categories:
- JavaScript
---
### 一、转换为boolean

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