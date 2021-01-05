---
title: js重点知识-27-use strict详解
date: 2021-01-05 10:25:35
top: true
tags:
- use strict
categories:
- JavaScript
---
### 一、严格模式的定义
<!--more-->
use strict 是一种 ECMAscript5 添加的（严格）运行模式，这种模式使得 Javascript 在更严格的条件下运行。严格模式的实现使您的程序或函数遵循严格的操作环境。

设立"严格模式"的目的，主要有以下几个：

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;

- 消除代码运行的一些不安全之处，保证代码运行的安全；

- 提高编译器效率，增加运行速度；

- 为未来新版本的Javascript做好铺垫。

### 二、严格模式的使用

#### 2.1 为脚本开启严格模式

为整个脚本文件开启严格模式，需要在所有语句之前放一个特定语句 "use strict"; （或 'use strict';）

```js
// 整个脚本都开启严格模式的语法
"use strict";
var v = "Hi!  I'm a strict mode script!";
```

> 这种语法存在陷进，要是合并一个严格模式的脚本和一个非严格模式的脚本：合并后看起来是严格模式。 反之亦然：非严格合并严格看起来是非严格的。所以建议要么均开启严格模式，要么就不使用非严格模式。

#### 2.2 为函数开启严格模式

给某个函数开启严格模式，得把 "use strict"; （或 'use strict';）声明一字不漏地放在函数体所有语句之前。

```js
function strict() {
  // 函数级别严格模式语法
  'use strict';
  function nested() { 
    return "And so am I!"; 
  }
  return "Hi!  I'm a strict mode function!  " + nested();
}

function notStrict() { 
  return "I'm not strict."; 
}
```

### 三、严格模式的规范

#### 3.1 变量

严格模式下，使用变量的规则

- 不允许意外创建全局变量

- 不能使用 delete 操作符删除声明变量

- 不用使用保留字（例如 ：implements、interface、let、package、 private、protected、public、static 和 yield 标识符）作为变量名

规则1

```js
// 创建一个全局变量叫做message
message = "Hello JavaScript! "; //  这一行代码就会抛出 ReferenceError
```

规则2

```js
var x;
delete x; // !!! 语法错误

eval("var y; delete y;"); // !!! 语法错误
```

规则3

```js
var private = 123; // !!! 语法错误
var public = 'hello'; // !!! 语法错误
```

#### 3.2 对象

严格模式下，使用对象的规则

- 为只读属性赋值会抛出TypeError

- 对不可配置的（nonconfigurable）的属性使用 delete 操作符会抛出TypeError

- 为不可扩展的（nonextensible）的对象添加属性会抛出TypeError

- 使用对象字面量时, 属性名必须唯一

规则1

```js
// 给只读属性赋值
var obj2 = { get x() { return 17; } };
obj2.x = 5; // 抛出TypeError错误

// 给不可写属性赋值
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // 抛出TypeError错误
```

规则2

```js
delete Object.prototype; // 抛出TypeError错误
```

规则3

```js
// 给不可扩展对象的新属性赋值
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // 抛出TypeError错误
```

规则4

```js
var o = { p: 1, p: 2 }; // !!! 语法错误
```

#### 3.3 函数

严格模式下，使用函数的规则

要求命名函数的参数必须唯一

```js
function sum(a, a, c) { // !!! 语法错误
  return a + a + c; // 代码运行到这里会出错
}
```

#### 3.4 eval与arguments

严格模式下，使用eval与arguments的规则

- eval不在为上下文中创建变量或函数

- eval 和 arguments 不能通过程序语法被绑定(be bound)或赋值

- 参数的值不会随 arguments 对象的值的改变而变化

- 禁止使用arguments.callee

规则1

```js
function doSomething(){
  eval("var x=10");
  alert(x); // 抛出TypeError错误
}
```

规则2

```js
eval = 17;
arguments++;
++eval;
var obj = { set p(arguments) { } };
var eval;
try { } catch (arguments) { }
function x(eval) { }
function arguments() { }
var y = function eval() { };
var f = new Function("arguments", "'use strict'; return 17;");
```

规则3

```js
function f(a) {
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);
```

规则4

```js
var f = function() { 
  return arguments.callee; 
};
f(); // 抛出类型错误
```

#### 3.5 禁止在函数内部遍历调用栈

```js
function restricted() {
  restricted.caller;    // 抛出类型错误
  restricted.arguments; // 抛出类型错误
}
```

#### 3.6 静态绑定

- 禁止使用with语句

- eval()声明变量和函数只能当前eval内部的作用域中有效

规则1

```js
var x = 17;
with (obj) { // !!! 语法错误
  // 如果没有开启严格模式，with中的这个x会指向with上面的那个x，还是obj.x？
  // 如果不运行代码，我们无法知道，因此，这种代码让引擎无法进行优化，速度也就会变慢。
  x;
}
```

规则2

```js
var result = eval("var x=10, y=11; x+y");
alert(result); //21
```

#### 3.7 this指向

- 全局作用域的函数中的this不再指向全局而是undefined。

- 如果使用构造函数时，如果忘了加new，this不再指向全局对象，而是undefined报错

规则1

```js
function bar() {
  console.log(this)
}
bar() // undefined
```

规则2

```js
function Person() {
  this.name = "Vincent" // Uncaught TypeError: Cannot set property 'name' of undefined
}

Person() // 报错，使用构造函数时，如果忘了加new，this不再指向全局对象，而是undefined.name。
```