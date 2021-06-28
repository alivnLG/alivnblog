---
title: web-18-富文本基本原理
date: 2021-01-05 11:53:09
top: true
tags:
- 富文本
categories:
- 前端综合
---
### 一、富文本基本原理

#### 1.1 contenteditable 属性

```html
<div contenteditable="true"></div>
```

那么在这个 div 中我们就可以对其进行任意编辑了。如果想要插入的子节点不可编辑，我们只需要把子节点的属性设置为 contenteditable="false" 即可;

#### 1.2 document.execCommand 方法

```js
// document.execCommand(命令名称，是否展示用户界面，命令需要的额外参数)

document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
```

```js
// 加粗

document.execCommand('bold', false, null);

// 添加图片

document.execCommand('insertImage', false, url || base64);

// 把一段文字用 p 标签包裹起来

document.execCommand('formatblock', false, '<p>');
```

#### 1.3 Selection 和 Range 对象

执行 document.execCommand 这个命令之前首先要知道对谁执行，所以这里会有一个选区的概念，也就是 Selection 对象，它用来表示用户选择的范围或光标位置（光标可以看做是范围重合的特殊状态），一个页面用户可能选择多个范围（比如 Firefox）。也就是说 Selection 包含一个或多个 Range 对象（ Selection 可以说是 Range 的集合），当然对于富文本编辑器来说，一般情况下，我们只会有一个选择区域，也就是一个 Range 对象，事实上大部分情况也是如此。

所以通常我们可以用 letrange=window.getSelection().getRangeAt(0) 来获取选中的内容信息（ getRangeAt 接受一个索引值，因为会有多个 Range，而现在只有一个，所以写0）。

![web005](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/web005.jpg)

![web006](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/web006.jpg)

通过上面那句命令我们能够获取到当前的选中信息，一般会先保存下来，然后在需要的时候还原。此外 Selection 对象还有几个常用的方法， addRange、 removeAllRanges、 collapse 和 collapseToEnd 等等。

