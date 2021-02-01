---
title: javascript实践总结
date: 2020-06-03 14:27:45
tags:
- 实践总结
categories:
- JavaScript
---
### 一、语法糖
<!--more-->
#### 1.1 定义

语法糖（Syntactic sugar），也译为糖衣语法，是由英国计算机科学家彼得·约翰·兰达（Peter J. Landin）发明的一个术语，指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。

之所以叫「语法」糖，不只是因为加糖后的代码功能与加糖前保持一致，更重要的是，糖在不改变其所在位置的语法结构的前提下，实现了运行时的等价。可以简单理解为，加糖后的代码编译后跟加糖前一毛一样。

之所以叫语法「糖」，是因为加糖后的代码写起来很爽，包括但不限于：代码更简洁流畅，代码更语义自然...写着爽，看着爽，就像吃了糖。效率高，错误少，老公回家早...

据说还有一种叫做「语法盐」的东西，主要目的是通过反人类的语法，让你更痛苦的写代码。其实它同样能达到避免代码书写错误的效果，但编程效率应该是降低了，毕竟提高了语法学习门槛，让人咸到忧伤...

#### 1.2 实例

最基本的，for循环就是一个语法糖：

```js
for(int i = 0; i < 5; i ++){
}
```

而实际上跟while没啥区别：

```js
int i = 0;
while ( i <5 ){
    ...
    i ++;
}
```

Python中也有非常多的语法糖，比如：

```python
i = a if a < b else b
```

这与下面的代码是同样的效果

```python
if a < b:
    i = a
else
    i = b
```

### 二、map()方法

map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```js
const numList = [1, 2, 3];

const square = (num) => {
  return num * num
}

const squares = numList.map(square);

console.log(squares); // [1, 4, 9]
```

### 三、可选链?.

#### 3.1 定义

可选链 ?. 是一种访问嵌套对象属性的安全的方式。即使中间的属性不存在，也不会出现错误。

#### 3.2 “不存在的属性”的问题

举个例子，假设我们有很多个 user 对象，其中存储了我们的用户数据。

我们大多数用户的地址都存储在 user.address 中，街道地址存储在 user.address.street 中，但有些用户没有提供这些信息。

在这种情况下，当我们尝试获取 user.address.street，而该用户恰好没提供地址信息，我们则会收到一个错误：

```js
let user = {}; // 一个没有 "address" 属性的 user 对象

alert(user.address.street); // Error!
```

这是预期的结果。JavaScript 的工作原理就是这样的。因为 user.address 为 undefined，尝试读取 user.address.street 会失败，并收到一个错误。

但是在很多实际场景中，我们更希望得到的是 undefined（表示没有 street 属性）而不是一个错误。

……还有另一个例子。在 Web 开发中，我们可以使用特殊的方法调用（例如 document.querySelector('.elem')）以对象的形式获取一个网页元素，如果没有这种对象，则返回 null。

```js
// 如果 document.querySelector('.elem') 的结果为 null，则这里不存在这个元素
let html = document.querySelector('.elem').innerHTML; // 如果 document.querySelector('.elem') 的结果为 null，则会出现错误
```

同样，如果该元素不存在，则访问 null 的 .innerHTML 时会出错。在某些情况下，当元素的缺失是没问题的时候，我们希望避免出现这种错误，而是接受 html = null 作为结果。

我们如何实现这一点呢？

可能最先想到的方案是在访问该值的属性之前，使用 if 或条件运算符 ? 对该值进行检查，像这样：

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

这样可以，这里就不会出现错误了……但是不够优雅。就像你所看到的，"user.address" 在代码中出现了两次。对于嵌套层次更深的属性就会出现更多次这样的重复，这就是问题了。

例如，让我们尝试获取 user.address.street.name。

我们既需要检查 user.address，又需要检查 user.address.street：

```js
let user = {}; // user 没有 address 属性

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

这样就太扯淡了，并且这可能导致写出来的代码很难让别人理解。

甚至我们可以先忽略这个问题，因为我们有一种更好的实现方式，就是使用 && 运算符：

```js
let user = {}; // user 没有 address 属性

alert( user.address && user.address.street && user.address.street.name ); // undefined（不报错）
```

依次对整条路径上的属性使用与运算进行判断，以确保所有节点是存在的（如果不存在，则停止计算），但仍然不够优雅。

就像你所看到的，在代码中我们仍然重复写了好几遍对象属性名。例如在上面的代码中，user.address 被重复写了三遍。

这就是为什么可选链 ?. 被加入到了 JavaScript 这门编程语言中。那就是彻底地解决以上所有问题！

#### 3.3 用法

如果可选链 ?. 前面的部分是 undefined 或者 null，它会停止运算并返回该部分。

**为了简明起见，在本文接下来的内容中，我们会说如果一个属性既不是 null 也不是 undefined，那么它就“存在”。**

换句话说，例如 value?.prop：

- 如果 value 存在，则结果与 value.prop 相同，

- 否则（当 value 为 undefined/null 时）则返回 undefined。

下面这是一种使用 ?. 安全地访问 user.address.street 的方式：

```js
let user = {}; // user 没有 address 属性

alert( user?.address?.street ); // undefined（不报错）
```

代码简洁明了，也不用重复写好几遍属性名。

即使 对象 user 不存在，使用 user?.address 来读取地址也没问题：

```js
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

请注意：?. 语法使其前面的值成为可选值，但不会对其后面的起作用。

例如，在 user?.address.street.name 中，?. 允许 user 为 null/undefined，但仅此而已。更深层次的属性是通过常规方式访问的。如果我们希望它们中的一些也是可选的，那么我们需要使用更多的 ?. 来替换 .。

#### 3.4 短路效应

正如前面所说的，如果 ?. 左边部分不存在，就会立即停止运算（“短路效应”）。

所以，如果后面有任何函数调用或者副作用，它们均不会执行。

例如：

```js
let user = null;
let x = 0;

user?.sayHi(x++); // 没有 "sayHi"，因此代码执行没有触达 x++

alert(x); // 0，值没有增加
```

#### 3.5 其它变体：?.()，?.[]

可选链 ?. 不是一个运算符，而是一个特殊的语法结构。它还可以与函数和方括号一起使用。

例如，将 ?.() 用于调用一个可能不存在的函数。

在下面这段代码中，有些用户具有 admin 方法，而有些没有：

```js
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // 啥都没有（没有这样的方法）
```

在这两行代码中，我们首先使用点符号（user1.admin）来获取 admin 属性，因为用户对象一定存在，因此可以安全地读取它。

然后 ?.() 会检查它左边的部分：如果 admin 函数存在，那么就调用运行它（对于 user1）。否则（对于 user2）运算停止，没有错误。

如果我们想使用方括号 [] 而不是点符号 . 来访问属性，语法 ?.[] 也可以使用。跟前面的例子类似，它允许从一个可能不存在的对象上安全地读取属性。

```js
let user1 = {
  firstName: "John"
};

let user2 = null; // 假设，我们不能授权此用户

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

此外，我们还可以将 ?. 跟 delete 一起使用：

```js
delete user?.name; // 如果 user 存在，则删除 user.name
```

> 我们可以使用 ?. 来安全地读取或删除，但不能写入：
> 可选链 ?. 不能用在赋值语句的左侧。
> 例如：
> let user = null;
> user?.name = "John"; // Error，不起作用
> // 因为它在计算的是 undefined = "John"
> 复制代码
> 这还不是那么智能。

#### 3.6 注意点

##### 3.6.1 不要过度使用可选链：

我们应该只将 ?. 使用在一些东西可以不存在的地方。

例如，如果根据我们的代码逻辑，user 对象必须存在，但 address 是可选的，那么我们应该这样写 user.address?.street，而不是这样 user?.address?.street。

所以，如果 user 恰巧因为失误变为 undefined，我们会看到一个编程错误并修复它。否则，代码中的错误在不恰当的地方被消除了，这会导致调试更加困难。

##### 3.6.2 可选链 ?. 前的变量必须已声明

如果未声明变量 user，那么 user?.anything 会触发一个错误：

```
// ReferenceError: user is not defined
user?.address;
```

?. 前的变量必须已声明（例如 let/const/var user 或作为一个函数参数）。可选链仅适用于已声明的变量。

#### 3.7 总结

可选链 ?. 语法有三种形式：

- obj?.prop —— 如果 obj 存在则返回 obj.prop，否则返回 undefined。
- obj?.[prop] —— 如果 obj 存在则返回 obj[prop]，否则返回 undefined。
- obj.method?.() —— 如果 obj.method 存在则调用 obj.method()，否则返回 undefined。

正如我们所看到的，这些语法形式用起来都很简单直接。?. 检查左边部分是否为 null/undefined，如果不是则继续运算。

?. 链使我们能够安全地访问嵌套属性。

但是，我们应该谨慎地使用 ?.，仅在当左边部分不存在也没问题的情况下使用为宜。以保证在代码中有编程上的错误出现时，也不会对我们隐藏。

### 四、cookie

当不设置max-age和expires，此cookie就是会话级别的，浏览器关闭就没了。

### 五、在浏览器中如何监听剪切板中内容

```js
// 是否能够有读取剪贴板的权限
// result.state == "granted" || result.state == "prompt"
const result = await navigator.permissions.query({ name: "clipboard-read" })

// 获取剪贴板内容
const text = await navigator.clipboard.readText()
```

### 六、如何判断当前环境是移动端还是PC端

[https://github.com/kaimallea/isMobile](https://github.com/kaimallea/isMobile)

### 七、如何把 DOM 转化为图片

#### 7.1 借助SVG forginObject实现DOM转图片

CSS代码：

```css
.outline {
    outline: 2px solid red;
    outline-offset: -2px;
}
```

HTML代码：

```html
<div id="cmBox" class="c-m-box">
    <div class="c-m-list">
        <img src="0.jpg" alt="长天" class="c-m-img">
        <div class="c-m-name">长天</div>
        <div class="c-m-title">对网文潮流具有极敏锐嗅觉...</div>
    </div>
</div>
```

JS代码：

```js
// DOM转图片的方法
var domToImg = (function () {
    // 转png需要的canvas对象及其上下文
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // canvas绘制图片元素方法
    var draw = function (img) {
        var width = img.width, height = img.height;
        // canvas绘制
        canvas.width = width;
        canvas.height = height;
        // 画布清除
        context.clearRect(0, 0, width, height);
        // 绘制图片到canvas
        context.drawImage(img, 0, 0);
    };

    // canvas画布绘制的原图片
    var img = new Image();
    // 回调
    var callback = function () {};

    // 图片回调
    img.onload = function () {
        draw(this);
        // 回调方法
        callback();
    };

    var exports = {
        dom: null,
        // DOM变成svg，并作为图片显示
        dom2Svg: function () {
            var dom = this.dom;
            if (!dom) {
                return this;
            }

            // 复制DOM节点
            var cloneDom = dom.cloneNode(true);
            cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            cloneDom.classList.remove('outline');

            // 如果有图片，变成base64
            var imgDom = null;
            if (cloneDom.tagName.toLowerCase() == 'img') {
                imgDom = cloneDom;
            } else {
                // 这里就假设一个图片，多图自己遍历转换下就好了
                imgDom = cloneDom.querySelector('img');
            }

            if (imgDom) {
                draw(imgDom);
                imgDom.src = canvas.toDataURL();
            }

            var htmlSvg = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' + dom.offsetWidth + '" height="' + dom.offsetHeight + '"><foreignObject x="0" y="0" width="100%" height="100%">'+
                new XMLSerializer().serializeToString(cloneDom) +
                document.querySelector('style').outerHTML +
             '</foreignObject></svg>';

             htmlSvg = htmlSvg.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23');

            // 图片地址显示为DOM转换的svg
            img.src = htmlSvg;

            return this;
        },
        // 作为图片下载，JS前端下载可参考这篇文章：
        // JS前端创建html或json文件并浏览器导出下载 - http://www.zhangxinxu.com/wordpress/?p=6252
        download: function () {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a');
            // 下载图片文件名就按照时间戳来
            eleLink.download = 'zxx_png-' + (+new Date() + '').slice(1, 9) + '.png';
            eleLink.style.display = 'none';

            // 触发图片onload是个异步过程，因此，需要在回调中处理
            callback = function () {
                eleLink.href = canvas.toDataURL();
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            };

            // dom变图片
            this.dom2Svg();
        }
    };

    return exports;
})();

// 实例页面的交互代码
var eleBox = document.getElementById('cmBox');
// hover outline
eleBox.addEventListener('mouseover', function (event) {
    if (event.target !== this) {
        event.target.classList.add('outline');
    }
});
eleBox.addEventListener('mouseout', function (event) {
    var eleOutline = eleBox.querySelector('.outline');
    if (eleOutline) {
        eleOutline.classList.remove('outline');
    }
});
// 点击并下载图片
eleBox.addEventListener('click', function (event) {
    var eleTarget = event.target;
    if (eleTarget !== this) {
        domToImg.dom = eleTarget;
        domToImg.download();
    }
});
```

dom-to-img 库也是使用该原理；

#### 7.2 html2canvas

[https://github.com/niklasvh/html2canvas](https://github.com/niklasvh/html2canvas)

### 八、实现文字选中复制功能

**方法一**

实现原理：

- 选中: Selection API

- 复制: document.execCommand

选中：

```js
const selection = window.getSelection();
const range = document.createRange();

range.selectNodeContents(element);
selection.removeAllRanges();
selection.addRange(range);

selectedText = selection.toString();
```

取消选中：

```js
window.getSelection().removeAllRanges();
```

复制：

```js
document.exec('copy')
```

**方式二**

clipboard.js  原理同方法一。

### 九、将json数据转化为json文件保存

#### 9.1 实现原理

（1）json 视为字符串，可以利用 DataURL 进行下载

```
Text -> DataURL
```

（2）转化为 Object URL 进行下载

```
Text -> Blob -> Object URL
```

```js
function download (url, name) {
  const a = document.createElement('a')
  a.download = name
  a.rel = 'noopener'
  a.href = url
  // 触发模拟点击
  a.dispatchEvent(new MouseEvent('click'))
  // 或者 a.click()
}

const json = {
  a: 3,
  b: 4,
  c: 5
}
const str = JSON.stringify(json, null, 2)

// 方案一：Text -> DataURL
const dataUrl = `data:,${str}`
download(dataUrl, 'demo.json')

// 方案二：Text -> Blob -> ObjectURL
const url = URL.createObjectURL(new Blob(str.split('')))
download(url, 'demo1.json')
```

#### 9.2 总结

1.模拟下载，可以通过新建一个 <a href="url" download><a> 标签并设置 url 及 download 属性来下载

2.可以通过把 json 转化为 dataurl 来构造 URL

3.可以通过把 json 转换为 Blob 再转化为 ObjectURL 来构造 URL

### 十、找到当前页面出现次数最多的HTML标签



