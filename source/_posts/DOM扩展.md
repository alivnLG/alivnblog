---
title: DOM扩展
date: 2020-12-18 17:16:01
tags:
- DOM
categories:
- JavaScript
---
### 一、Selectors API
<!--more-->
规定了浏览器原生支持的CSS查询API。支持这一特性的所有 JavaScript 库都会实现一个基本的 CSS 解析器，然后使用已有的DOM方法搜索文档并匹配目标节点。

（通过浏览器原生支持这个 API，解析和遍历 DOM树可以通过底层编译语言实现，性能也有了数量级的提升）
Selectors API Level1核心的两个方法querySelector() 和querySelectorAll()
Selectors API Level2增加了 matches()、(find()、findAll()未有浏览器官宣实现)。

#### 1.1 querySelector()

接收CSS 选择符参数，返回匹配该模式的第一个后代元素，如果没有返回null

在 Document 上使用时，会从文档元素开始搜索；在Element上使用时，则只会从当前元素的后代中查询。如果选择符有语法错误或碰到不支持的选择符，会抛异常。

```js
let body = document.querySelector("body"); // 取得<body>元素
let myDiv = document.querySelector("#myDiv");// 取得 ID 为"myDiv"的元素
let selected = document.querySelector(".selected");// 取得类名为"selected"的第一个元素
```

#### 1.2 querySelectorAll()

接收CSS 选择符参数，返回所有匹配的节点，返回一个NodeList的静态实例（“快照”并非"实时"），如果没有返回空的NodeList实例。

同上，可以在Document、DocumentFragment 和 Element 类型上使用。如果选择符有语法错误或碰到不支持的选择符，会抛异常。

```js
// 取得 ID 为"myDiv"的<div>元素中的所有<em>元素
let ems = document.getElementById("myDiv").querySelectorAll("em");
```

返回的 NodeList 对象可以通过 for-of 循环、item()方法或中括号语法取得个别元素

```js
let strongElements = document.querySelectorAll("p strong"); 
// 以下 3 个循环的效果一样
for (let strong of strongElements) { 
  strong.className = "important"; 
} 
for (let i = 0; i < strongElements.length; ++i) { 
  strongElements.item(i).className = "important"; 
} 
for (let i = 0; i < strongElements.length; ++i) { 
  strongElements[i].className = "important"; 
}
```

#### 1.3 matches()

接收一个 CSS 选择符参数，如果元素匹配则该选择符返回 true，否则返回 false。

```js
if (document.body.matches("body.page1")){ 
  // true 
}
```

### 二、元素遍历

对于元素间的空格，各浏览器对于childNodes和firstChild等属性处理行为不一致，为了弥补差异，Element Traversal新定义了一组属性。

- 1.childElementCount，返回子元素数量（不包含文本节点和注释） 

- 2.firstElementChild，指向第一个 Element 类型的子元素 

- 3.lastElementChild，指向最后一个 Element 类型的子元素 

- 4.previousElementSibling ，指向前一个 Element 类型的同胞元素 

- 5.nextElementSibling，指向后一个 Element 类型的同胞元素

```js
// 原来要这样写
let parentElement = document.getElementById('parent'); 
let currentChildNode = parentElement.firstChild; 
// 没有子元素，firstChild 返回 null，跳过循环
while (currentChildNode) { 
  if (currentChildNode.nodeType === 1) { 
    // 如果有元素节点，则做相应处理
    processChild(currentChildNode); 
  } 
  if (currentChildNode === parentElement.lastChild) { 
  break; 
  } 
  currentChildNode = currentChildNode.nextSibling; 
}
```

```js
// 使用了 Element Traversal 简化后
let parentElement = document.getElementById('parent'); 
let currentChildElement = parentElement.firstElementChild;
// 没有子元素，firstElementChild 返回 null，跳过循环
while (currentChildElement) { 
    // 这就是元素节点，做相应处理
    processChild(currentChildElement); 
    if (currentChildElement === parentElement.lastElementChild) { 
    break; 
    } 
    currentChildElement = currentChildElement.nextElementSibling; 
}
```

### 三、HTML5

#### 3.1 CSS类扩展

**getElementsByClassName()**

接收一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的 NodeList。如果提供了多个类名，则顺序无关紧要。

```js
// 取得所有类名中包含"username"和"current"元素
// 这两个类名的顺序无关紧要
let allCurrentUsernames = document.getElementsByClassName("username current"); 
// 取得 ID 为"myDiv"的元素子树中所有包含"selected"类的元素
let selected = document.getElementById("myDiv").getElementsByClassName("selected");
```

**classList()**

classList 是一个新的集合类型 DOMTokenList 的实例。与其他 DOM 集合类型一样，也有 length 属性表示自己包含多少项，也可以通过 item()或中括号取得个别的元素。

DOMTokenList 还增加了以下方法

- add(value) ，向类名列表中添加指定的字符串值 value。如果这个值已经存在，则什么也不做。

- contains(value)，返回布尔值，表示给定的 value 是否存在。

- remove(value)，从类名列表中删除指定的字符串值 value。 

- toggle(value)，如果类名列表中已经存在指定的 value，则删除；如果不存在，则添加。

```js
div.classList.remove("disabled"); // 删除"disabled"类
div.classList.add("current"); // 添加"current"类

for (let class of div.classList){  // 迭代类名
 	doStuff(class); 
}
```

#### 3.2 焦点管理

- document.activeElement 当前拥有焦点的DOM元素（默认情况下，页面加载后设置为document.body, 页面加载之前为null）

- document.hasFocus() 文档是否拥有焦点，返回布尔值

查询文档获知哪个元素获得了焦点，以及确定文档是否获得了焦点，这两个功能最重要的用途是提高Web应用的无障碍性。无障碍Web应用的一个重要标志就是恰当的焦点管理，而确切地知道哪个元素获得了焦点是一个极大的进步。

#### 3.3 HTMLDocument 扩展

- readyState 属性 loading 文档正在加载；complete 文档加载完成。最好是把 document.readState 当成一个指示器，以判断文档是否加载完毕。（代替以前依赖onload事件监听做处理逻辑）

```js
if (document.readyState == "complete"){ 
  // 执行操作
}
```

- compatMode 属性 指示当前浏览器处于什么渲染模式。"CSS1Compat"(标准模式)；"BackCompat"（混杂模式）

- head属性

```js
let head = document.head //直接取得<head>元素
```

#### 3.4 自定义数据属性

给元素指定非标准属性，前缀是data-,通过 dataset属性访问

```html
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
```

```js
let div = document.getElementById("myDiv"); 
// 取得自定义数据属性的值
let appId = div.dataset.appId;  
let myName = div.dataset.myname; 
// 设置自定义数据属性的值
div.dataset.appId = 23456; 
div.dataset.myname = "Michael"; 
// 有"myname"吗？
if (div.dataset.myname){ 
  console.log(`Hello, ${div.dataset.myname}`); 
}
```

#### 3.5 innerHTML属性 和 outerHTML属性

读取innerHTML返回元素所有后代的 HTML 字符串，包括元素、注释和文本节点。innerHTML不会执行自己创建的```<script>```标签，防止XSS攻击，要使用用户提供的信息页面，不建议使用。

读取outerHTML返回调用它的元素（及所有后代元素）的 HTML 字符串。

#### 3.6 内存与性能问题

被移除的元素之前有关联的事件处理或者其他js对象，之前的绑定关系会滞留在内存中。在使用 innerHTML、outerHTML 和 insertAdjacentHTML()之前，最好手动删除要被替换的元素上关联的事件处理程序和JavaScript 对象。
