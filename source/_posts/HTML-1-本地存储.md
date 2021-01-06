---
title: HTML重点知识-1-本地存储
date: 2021-01-06 15:38:55
top: true
tags:
- Cookie
- Flash
- WebStorage
- IndexdDB
categories:
- HTML
---
### 一、H5本地存储
<!--more-->
#### 1.1 可选方案

- (1)Cookie技术：浏览器兼容性好；不能超过4KB，操作复杂

- (2)Flash存储：依赖于Flash播放器

- (3)H5 WebStorage：不能超过8MB，操作简单

- (4)IndexedDB：可存大量数据，还不是标准技术

#### 1.2 window.sessionStorage

类数组对象，会话级数据存储

在浏览器进程所分得的内存存储着一次Web会话可用的数据，可供此次会话中所有的页面共同使用；浏览器一旦关闭就消失了。作用：在同一个会话中的所有页面间共享数据，如登录用户名。

```js
sessionStorage[key] = value //保存一个数据

sessionStorage.setItem(key, value) //保存一个数据

var v = sessionStorage[key] //读取一个数据

var v = sessionStorage.getItem(key) //读取一个数据

sessionStorage.removeItem(key) //删除一个数据

sessionStorage.clear() //清除所有数据

sessionStorage.length //数据的数量

sessionStorage.key(i) //获取第i个key
```

#### 1.3 window.localStorage

类数组对象，本地存储(跨会话级存储)

在浏览器所能管理的外存(硬盘)中存储着用户的浏览数据，可供此次会话以及后续的会话中的页面共同使用；即使浏览器关闭也不会消失——永久存在。作用：在当前客户端所对应的所有会话中共享数据，如登录用户名。

```js
localStorage[key] = value //保存一个数据

localStorage.setItem(key, value) //保存一个数据

var v = localStorage [key] //读取一个数据

var v = localStorage.getItem(key) //读取一个数据

localStorage.removeItem(key) //删除一个数据

localStorage.clear() //清除所有数据

localStorage.length //数据的数量

localStorage.key(i) //获取第i个key
```

localStorage中若数据发生了修改，会触发一次window.onstorage事件，可以监听此事件，实现监视localStorage数据改变的目的，用于在一个窗口中监视其它窗口中对localStorage数据的修改——不能监视sessionStorage数据的修改！