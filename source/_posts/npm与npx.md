---
title: npm与npx
date: 2020-06-02 14:57:24
top: true
tags:
- npm
- npx
categories: 
- 版本控制
---
##### 1.npx主要作用是代替npm来直接执行包（package）命令。

##### 2.npm使用包的步骤
<!--more-->
先初始化npm
```
npm init
```

安装

```
npm install -g create-react-app
```
使用

```
create-react-app my-app
```

##### 3.直接使用npx直接执行,如果包不存在的话，它也会自动下载（包括初始化npm）