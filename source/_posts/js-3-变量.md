---
title: js-3-变量
date: 2020-12-22 09:39:04
top: true
tags:
- 变量
categories:
- JavaScript
---

### 一、定义
<!--more-->

在编程语言中，一般固定值称为字面量，变量是一个名称。字面量是一个值。

变量是存储数据的容器。

### 二、声明方式

- var
- let
- const
- function
- import
- class

### 二、变量生命周期

#### 2.1 全局变量

全局变量从创建到窗口或标签关闭,生命周期长，所以将占据更多的内存,当项目比较大的时候，就可能出现性能问题。

非严格模式下给未声明变量赋值创建的全局变量，是全局对象的可配置属性，可以删除。

```js
var var1 = 1; // 不可配置全局属性
var2 = 2; // 没有使用 var 声明，可配置全局属性

console.log(this.var1); // 1
console.log(window.var1); // 1

delete var1; // false 无法删除
console.log(var1); //1

delete var2; 
console.log(delete var2); // true
console.log(var2); // 已经删除 报错变量未定义
```

#### 2.2 局部变量

局部变量从创建到函数调用结束而销毁。

调用函数结束，局部变量确实会销毁。但并不是完全销毁，而是一直函数的内部环境中存活着，当函数再度被调用时，变量就“复活”了，所以局部变量还是非常方便的，不会影响二次使用。

### 三、变量作用域

变量在函数内声明，变量为局部作用域,只能在函数内部访问。 

全局变量有全局作用域,网页中所有脚本和函数均可使用。

### 四、变量提升

JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。

JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。

```js
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素 
elem.innerHTML = x;                     // 在元素中显示 x

var x; // 声明 x
```

```js
var x; // 声明 x
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素 
elem.innerHTML = x;                     // 在元素中显示 x
```

<span style="color:red">JavaScript 只有声明的变量会提升，初始化的不会。</span>

<span style="color:red">JavaScript 严格模式(strict mode)不允许使用未声明的变量。</span>

<span style="color:red">let / const: 块级作用域、不存在变量提升、暂时性死区、不允许重复声明</span>

### 五、变量对象

JavaScript 变量均为对象。当您声明一个变量时，就创建了一个新的对象。

变量对象，是执行上下文中的一部分，可以抽象为一种 数据作用域，其实也可以理解为就是一个简单的对象，它存储着该执行上下文中的所有 变量和函数声明(不包含函数表达式)。

> 活动对象 (AO): 当变量对象所处的上下文为 active EC 时，称为活动对象。

### 六、实践

（1）在局部环境中，出现全局变量与局部变量重名的时候，起作用的是局部变量，全局变量被屏蔽掉。这是因为上文说过作用域链的原因，先由局部开始搜索变量，当局部找到该变量的时候，就不会再我继续往父级找变量了。

（2）html中设置了id的元素居然是js的全局变量

```html
<div id="angelaDiv">
</div>
<script type="text/javascript">
    console.log(angelaDiv);
</script>
```

（3）一个好的编程习惯是，在代码开始处，统一对需要的变量进行声明。

（4）所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。全局变量是 window 对象的属性。

（5）尽量减少使用全局变量

（6）定义多个变量时，省略var、let、const关键字，用逗号代替

