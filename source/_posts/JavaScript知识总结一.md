---
title: JavaScript知识总结一
date: 2020-10-13 13:38:22
tags:
- js
categories:
- JavaScript
---
#### 1.window.location.replace(…)最适合模拟 HTTP 重定向。

window.location.replace(...)优于使用window.location.href，因为replace()不会将原始页面保留在会话历史记录中，这意味着用户将不会陷入永无休止回退按钮。
<!--more-->
如果要模拟单击链接，可以使用location.href，如果要模拟HTTP重定向，请使用location.replace。

```js
//模拟HTTP重定向
window.location.replace("http://stackoverflow.com")

// 模拟单击链接
window.location.href = "http://stackoverflow.com"

$(location).attr('href', 'http://stackoverflow.com')
```

#### 2.use strict 在 JavaScript 中做了什么，背后的原因是什么

严格模式是ECMAScript 5中的一个新特性，它允许我们将程序或函数放置在严格的操作上下文中。这种严格的上下文会防止某些操作被执行，并引发更多异常。

- 它捕获了一些常见的编码漏洞，并抛出异常。
- 当采取相对不安全的操作(例如访问全局对象)时，它可以防止错误或抛出错误。
- 它禁用令人困惑或考虑不周到的特性。

可以将“strict mode”应用于整个文件，也可以仅将其用于特定函数。

```js
// Non-strict code...

(function(){
  "use strict";

  // Define your library strictly...
})();

// Non-strict code... 
```

如果是在混合使用旧代码和新代码的情况，这可能会有所帮助。它有点像在Perl中使用的“use strict”。通过检测更多可能导致损坏的东西，帮助我们减少更多的错误。

现在所有主流浏览器都支持严格模式。

在原生ECMAScript模块(带有import和export语句)和ES6类中，严格模式始终是启用的，不能禁用。

#### 3.如何检查字符串是否包含子字符串？

ECMAScript 6 引入了string .prototype.include

```js
const string = "foo";
const substring = "oo";

console.log(string.includes(substring));
```

不过，IE 不支持 includes。在 CMAScript 5或更早的环境中，使用String.prototype.indexOf。如果找不到子字符串，则返回-1:

```js
var string = "foo";
var substring = "oo";

console.log(string.indexOf(substring) !== -1);
```

为了使其在旧的浏览器中运行，可以使用这种polyfill：

```js
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
```

#### 4.var functionName = function() {} 与 function functionName() {}

```js
// TypeError: functionOne is not a function
functionOne();

var functionOne = function() {
  console.log("Hello!");
};
```

```js
// "Hello!"
functionTwo();

function functionTwo() {
  console.log("Hello!");
}
```

不同之处在于functionOne是一个函数表达式，因此只在到达这一行时才会定义，而functionTwo是一个函数声明，在它周围的函数或脚本被执行(由于提升)时就定义。

#### 5.如何从 JavaScript 对象中删除属性？

```js
delete myObject.regex;
// 或者
delete myObject['regex'];
//  或者
var prop = "regex";
delete myObject[prop];
```

```js
var obj = {
  myProperty: 1    
}
console.log(obj.hasOwnProperty('myProperty')) // true
delete obj.myProperty
console.log(obj.hasOwnProperty('myProperty')) // false
```

注意，如果已删除属性的值是引用类型(对象)，而程序的另一部分仍然持有对该对象的引用，那么该对象当然不会被垃圾收集，直到对它的所有引用都消失。

delete只对其描述符标记为configurable的属性有效。

#### 6.在 JavaScript 中深拷贝一个对象的最有效方法是什么？

快速克隆，数据丢失– JSON.parse/stringify

如果您没有在对象中使用Date、函数、undefined、Infinity、RegExp、Map、Set、blob、、稀疏数组、类型化数组或其他复杂类型，那么可以使用一行简单代码来深拷贝一个对象：

```js
JSON.parse(JSON.stringify(object))
```

```js
const a = {
  string: 'string',
  number: 123,
  bool: false,
  nul: null,
  date: new Date(), 
  undef: undefined,  // 丢失
  inf: Infinity,  // 被设置为 null
  re: /.*/,  // 丢失
}
console.log(a);
console.log(typeof a.date);  // object
const clone = JSON.parse(JSON.stringify(a));
console.log(clone);
/*
object
{
  string: 'string',
  number: 123,
  bool: false,
  nul: null,
  date: '2020-09-04T00:45:41.823Z',
  inf: null,
  re: {}
}

*/
console.log(typeof clone.date);  // string
```

**使用js库进行可靠的克隆**

由于克隆对象不是一件简单的事情(复杂类型、循环引用、函数等等)，大多数主要的库都提供了拷贝对象的函数。如果你已经在使用一个库，请检查它是否具有对象克隆功能。例如

- lodash – cloneDeep; 可以通过lodash.clonedeep模块单独导入，如果你尚未使用提供深拷贝功能的库，那么它可能是你的最佳选择
- AngularJS – angular.copy
- jQuery –  jQuery.extend(true, { }, oldObject); .clone()仅克隆DOM元素

**ES6**

ES6 提供了两种浅拷贝机制:Object.assign()和spread语法。它将所有可枚举的自有属性的值从一个对象复制到另一个对象。例如

```js
var A1 = {a: "2"};
var A2 = Object.assign({}, A1);
var A3 = {...A1};  // Spread Syntax
```

```js
JSON.parse(JSON.stringify(obj))
```

这是深拷贝对象的最慢方法，它比jQuery.extend慢 10-20%。

如果想拷贝的一个对象且你知道对象结构。那么，你可以写一个简单的for (var i in obj)循环来克隆你的对象，同时检查

```js
// hasOwnProperty，这将比jQuery快得多。
var clonedObject = {
  knownProp: obj.knownProp,
  ..
}
```

注意在 Date 对象JSON上使用JSON.parse(JSON.stringify(obj))方法。JSON.stringify(new Date())以ISO格式返回日期的字符串表示，JSON.parse()不会将其转换回Date对象。

#### 7.如何在另一个JavaScript文件中包含一个JavaScript文件？

**ES6 Module**
从v8.5开始，Node.js就支持ECMAScript (ES6)模块，带有--experimental-modules 标志，而且至少Node.js v13.8.0没有这个标志。要启用ESM(相对于Node.js之前的commonjs风格的模块系统[CJS])，你可以在 package.json中使用“type”:“module”。或者为文件提供扩展名.mjs。(类似地，如果默认为ESM，则用 Node.js 以前的CJS模块编写的模块可以命名为.cjs。)
使用package.json：

```js
{
    "type": "module"
}
```

在 module.js： 中

```js
export function hello() {
  return "Hello";
}
```

main.js:

```js
import { hello } from './module.js';
let val = hello();  // val is "Hello";
```

```js
// 使用.mjs，会有对应的module.mjs：
export function hello() {
  return "Hello";
}
```

在main.mjs 中

```js
import { hello } from './module.mjs';
let val = hello();  // val is "Hello";
```

自Safari 10.1，Chrome 61，Firefox 60 和 Edge 16 开始，浏览器就已经支持直接加载ECMAScript模块（不需要像Webpack这样的工具）。无需使用Node.js的.mjs扩展名； 浏览器完全忽略模块/脚本上的文件扩展名。

```js
<script type="module">
  import { hello } from './hello.mjs'; // Or it could be simply `hello.js`
  hello('world');
</script>
```

```js
// hello.mjs -- or it could be simply `hello.js`
export function hello(text) {
  const div = document.createElement('div');
  div.textContent = `Hello ${text}`;
  document.body.appendChild(div);
}
```

**浏览器中的动态导入**

动态导入允许脚本根据需要加载其他脚本

```js
<script type="module">
  import('hello.mjs').then(module => {
      module.hello('world');
    });
</script>
```

**Node.js require**

在 Node.js 中用的较多还是 module.exports/require

```js
// mymodule.js
module.exports = {
   hello: function() {
      return "Hello";
   }
}
// server.js const myModule = require('./mymodule'); let val = myModule.hello(); // val is "Hello"
```

**动态加载文件**

我们可以通过动态创建 script 来动态引入文件：

```js
function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); 

    document.head.appendChild(script); 
}
```

**检测脚本何时执行**

上面这种动态加载都是异步执行的，这样可以提高网页的性能。 这意味着不能在动态加载下马上使用该资源，因为它可能还在加载。
例如：my_lovely_script.js包含MySuperObject：

```js
var js = document.createElement("script");

js.type = "text/javascript";
js.src = jsFilePath;

document.body.appendChild(js);

var s = new MySuperObject();

Error : MySuperObject is undefined
```

然后，按F5重新加载页面，可能就有效了。那么该怎么办呢？
我们可以使用回调函数来解决些问题。

```js
function loadScript(url, callback)
{
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onload = callback;

    head.appendChild(script);
}
```

然后编写在lambda函数中加载脚本后要使用的代码

```js
var myPrettyCode = function() {
   // Here, do whatever you want
};
```

然后，运行代码：

```js
loadScript("my_lovely_script.js", myPrettyCode);
```

请注意，脚本可能在加载DOM之后或之前执行，具体取决于浏览器以及是否包括行script.async = false;。

#### 8.map()

map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```js
const numList = [1, 2, 3];

const square = (num) => {
  return num * num
}

const squares = numList.map(square);

console.log(squares); // [1, 4, 9]
```