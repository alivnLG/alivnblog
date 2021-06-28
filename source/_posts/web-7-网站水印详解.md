---
title: web-7-网站水印详解
date: 2021-01-05 11:52:59
top: true
tags:
- 水印
categories:
- 前端综合
---
### 一、明水印

#### 1.1 明水印的生成

明水印的生成方式主要可以归为两类，一种是 纯 html 元素(纯div)，另一种则为背景图（canvas/svg）。
<!--more-->
##### 1.1.1 div实现

```js
// 文本内容
<div class="app">
        <h1>秋风</h1>
        <p>hello</p>
</div>
```

生成一个水印块

```js
function cssHelper(el, prototype) {
  for (let i in prototype) {
    el.style[i] = prototype[i]
  }
}
const item = document.createElement('div')
item.innerHTML = '秋风的笔记'
cssHelper(item, {
  position: 'absolute',
  top: `50px`,
  left: `50px`,
  fontSize: `16px`,
  color: '#000',
  lineHeight: 1.5,
  opacity: 0.1,
  transform: `rotate(-15deg)`,
  transformOrigin: '0 0',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
})
```

计算屏幕的宽高，以及水印的大小来计算我们需要生成的水印个数。

```js
const waterHeight = 100;
const waterWidth = 180;
const { clientWidth, clientHeight } = document.documentElement || document.body;
const column = Math.ceil(clientWidth / waterWidth);
const rows = Math.ceil(clientHeight / waterHeight);
for (let i = 0; i < column * rows; i++) {
    const wrap = document.createElement('div');
    cssHelper(wrap, Object.create({
        position: 'relative',
        width: `${waterWidth}px`,
        height: `${waterHeight}px`,
        flex: `0 0 ${waterWidth}px`,
        overflow: 'hidden',
    }));
    wrap.appendChild(createItem());
    waterWrapper.appendChild(wrap)
}
document.body.appendChild(waterWrapper)
```

##### 1.1.2 背景图实现

**canvas**

canvas的实现很简单，主要是利用canvas 绘制一个水印，然后将它转化为 base64 的图片，通过canvas.toDataURL() 来拿到文件流的 url ，然后将获取的 url 填充在一个元素的背景中，然后我们设置背景图片的属性为重复。

```css
.watermark {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    background-repeat: repeat;
}
```

```js
function createWaterMark() {
  const angle = -20;
  const txt = '秋风的笔记'
  const canvas = document.createElement('canvas');
  canvas.width = 180;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 180, 100);
  ctx.fillStyle = '#000';
  ctx.globalAlpha = 0.1;
  ctx.font = `16px serif`
  ctx.rotate(Math.PI / 180 * angle);
  ctx.fillText(txt, 0, 50);
  return canvas.toDataURL();
}
const watermakr = document.createElement('div');
watermakr.className = 'watermark';
watermakr.style.backgroundImage = `url(${createWaterMark()})`
document.body.appendChild(watermakr);
```

**svg**

svg 和 canvas 类似，主要还是生成背景图片。

```js
function createWaterMark() {
  const svgStr =
    `<svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
      <text x="0px" y="30px" dy="16px"
      text-anchor="start"
      stroke="#000"
      stroke-opacity="0.1"
      fill="none"
      transform="rotate(-20)"
      font-weight="100"
      font-size="16"
      >
      	秋风的笔记
      </text>
    </svg>`;
  return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
}
const watermakr = document.createElement('div');
watermakr.className = 'watermark';
watermakr.style.backgroundImage = `url(${createWaterMark()})`
document.body.appendChild(watermakr);
```

#### 1.2 明水印的破解一

打开了 Chrome Devtools 找到对应的元素，直接按 delete 即可删除。

#### 1.3 明水印的防御

js 有一个方法叫做 MutationObserver，能够监控元素的改动。

MutationObserver 对现代浏览的兼容性还是不错的，MutationObserver是元素观察器，字面上就可以理解这是用来观察Node（节点）变化的。MutationObserver是在DOM4规范中定义的，它的前身是MutationEvent事件，最低支持版本为 ie9 ，目前已经被弃用。

在这里我们主要观察的有三点

- 水印元素本身是否被移除

- 水印元素属性是否被篡改（display: none ...）

- 水印元素的子元素是否被移除和篡改 （element生成的方式 ）

MDN示例：

```js
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);
```

而MutationObserver主要是监听子元素的改动，因此我们的监听对象为 document.body, 一旦监听到我们的水印元素被删除，或者属性修改，我们就重新生成一个。

```js
// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };
// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
// Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    mutation.removedNodes.forEach(function (item) {
      if (item === watermakr) {
      	document.body.appendChild(watermakr);
      }
    });
  }
};
// 监听元素
const targetNode = document.body;
// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);
// 以上述配置开始观察目标节点
observer.observe(targetNode, config);
```

#### 1.4 明水印的破解二

##### 第一种

- 打开 Chrome Devtools，点击设置 - Debugger - Disabled JavaScript

- 然后再打开页面，delete我们的水印元素。

##### 第二种

- 复制一个 body 元素，然后将原来 body 元素的删除。

##### 第三种

- 打开一个代理工具，例如 charles，将生成水印相关的代码删除。

### 二、暗水印

暗水印是一种肉眼不可见的水印方式，可以保持图片美观的同时，保护你的资源版权。

暗水印的生成方式有很多，常见的为通过修改RGB 分量值的小量变动、DWT、DCT 和 FFT 等等方法。

**RGB 分量值的小量变动实现**

图片都是有一个个像素点构成的，每个像素点都是由 RGB 三种元素构成。当我们把其中的一个分量修改，人的肉眼是很难看出其中的变化，甚至是像素眼的设计师也很难分辨出。

