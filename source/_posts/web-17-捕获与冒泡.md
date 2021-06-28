---
title: web-17-捕获与冒泡
date: 2021-01-05 11:53:08
top: true
tags:
- 捕获
- 冒泡
categories:
- 前端综合
---
### 一、事件冒泡与捕获
微软提出了事件冒泡(event bubbling)的事件流，即事件从最内层的元素开始，一层层往上传播，直到document结束。与之相对应的网景提出了名为事件捕获(event capturing)的事件流,即事件从最外层的元素开始也就是从document开始一层层往下传递。

在javascript中，使用addEventListener()来给元素绑定事件。
```
EventTarget.addEventListener(type,listener,useCapture)

type：需要监听的事件类型

listener：事件触发之后执行的函数

useCapture：默认为false，表示使用事件冒泡，即div2先被
点击；设置为true，表示使用事件捕获，即div1先被点击
```
在jquery中，不支持事件捕获，仅仅支持事件冒泡

jquery提供了停止事件冒泡的方法：event.stopPropagation()；可以阻止事件中其他对象的事件处理函数被执行。

jquery还提供了阻止默认行为的方法:event.preventDefault()；例如：提交表单的时候，对表单进行前端验证，验证不通过的时候，阻止表单提交 ，就可以使用此方法。
