---
title: web-23-灰度发布
date: 2021-06-29 10:18:02
top: true
tags:
- 灰度发布
categories:
- 前端综合
---
### 一、灰度发布是什么？

灰度发布，又被称之为金丝雀发布，是指某次新发布功能特性和旧功能特性之间能够以平滑过渡的方式呈现给用户，就像金丝雀的羽毛一样多种颜色平滑渐变。
<!--more-->
举个例子，某个已上线处于运行中的系统需要一次新的功能迭代，但是由于功能变动较大，所以发布需要考虑用户的使用反馈以及代码可能存在一些未知的异常，这时候则需要将新的功能逐步地一批一批的推送给用户。

在这个逐步放量的过程中，可以根据用户接受度（用户投诉多不多）和观察本次功能是否存在上线前未发现的异常，来决定是否继续发布推送新功能，如果新功能反馈较差或者存在功能异常问题，则停止放量或者回滚到之前稳定的版本，及时修改问题。

这样便避免一次推送情况下，如果出现问题则造成线上问题突然上升造成阻塞用户使用的问题。

### 二、灰度发布的优

1.提前收集用户使用意见，及时完善产品功能

2.控制未知异常只出现在小范围内，不影响大多数用户

3.发现产品是否存在外在问题（如合规），可及时回滚至已旧版本

### 三、前端灰度发布的要素

#### 3.1 放量规则

如果逐步推送新功能，则必须有一种规则让用户按照某些特征分成不同的群体，这个规则可以是年龄，城市，或者用户注册时的id。例如，用户注册时有一个从0自增的序号位，当灰度放量时可以以该序号为维度，从小到大的放量，直至百分百完成。

一个完善的系统在设计之初一定会考虑到灰度方案，如果你仔细观察用户的uid在注册的时候一定有一个序号位，像身份证号里第十五位是从0-9的序号位，一般的用户UID会留两位作为自增序号位，灰度时这两位一般被作为灰度特征。

#### 3.2 资源新旧版本

能明确的标识出要给用户展示两种页面形态，可以是以前端静态版本号的形式，如每次发布资源后，静态资源的版本号链接改变一下，这时候灰度则其实是两个不同资源请求链接逐步从旧到新的过程。

### 四、灰度实现原理

下面是灰度的实现基本原理，最关键的还是判断灰度用户这一步操作，可以在请求发出去前进行判断，然后直接请求对应的资源，也可以请求到了服务端后，服务端先区别出用户是否属于灰度名单内，再返回对应资源内容，具体还要看前端应用是怎样的形式部署的，服务端渲染或者是客户端渲染均有关系。

![grayscalePublishing001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/grayscalePublishing001.jpg)

### 五、前端灰度发布的几种方式

#### 5.1 服务端渲染应用

服务端渲染应用会在返回客户端之前将静态模板渲染好，知道这个是非常重要的，这意味着前端灰度这个过程要在用户的请求返回之前就完成，在客户端不处理任何灰度相关的内容。如下图：

![grayscalePublishing002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/grayscalePublishing002.jpg)

简单描述一下，这里用户首先发起请求后，服务器并不会直接组装静态资源，而是先去灰度规则里获取名单，然后将灰度名单拿到进行判断处理来决定渲染那一套模板资源给到客户端，最终给处于灰度名单里的用户展示新版本页面，而非名单内的用户继续使用旧版本的页面内容，如需要放量时，直接在灰度规则里进行修改即可。

看看下面代码示例

```js
// 服务端代码
// 静态模板
const model1 = () => {
 return `
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
   </head>
   <body>
     <div id="mydiv">我是A界面</div>
   </body>
   </html>
  `
}
const model2 = () => {
 return `
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
   </head>
   <body>
     <div id="mydiv">我是B界面</div>
   </body>
   </html>
  `
}
const isPass = getRule(req.uid) // 查询规则
if (isPass) { // 在白名单
  res.render(model2)
} else {
  res.render(model1)
}
...
```

上面的代码中，有A，B两个版本的界面，用户请求的资源在返回之前先通过getRule获取灰度规则，确定了是否在白名单里，然后决定返回那一套模板内容。

#### 5.2 前后端半分离的应用

这里前后端半分离的应用是指在有一部分前端应用的html文件依旧在服务端上，但是实际上却在客户端渲染的，相信大家见的比较多，例如下面的这段代码。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body>
<div id="react-content"></div>
</body>
<script src="http://cdn.com/1.0.1/my.js"></script>
</html>
```

当我们使用react或者vue的时候，最后将代码打包到一个JavaScript文件里，在一个html文件中加载使用，而这个html文件则会被放到一个服务端系统里，当用户请求到资源时，将这段html返回给客户端，客户端拿到内容后加载在http://cdn.com/1.0.1/my.js 的网络资源，然后本地渲染。

这里注意一下，我们每次打包的资源都会有一个版本号，比如上面的版本是1.0.1，这里在cdn上的存贮路径也是1.0.1/my.js，使用路径的唯一性来区别与其他版本不一致，当然也可以在文件名上加版本号，如 /my_1.0.1.js，只要能识别出资源的唯一性均是可以的。

下面来一段伪代码看看这里灰度又该怎么做。

```js
// 服务端代码
const isPass = getRule(req.uid) // 查询规则
let version = 1.0.1; // 旧版本号
if (isPass) { // 在白名单
  version = 2.0.0
}
// 静态模板
const model = version => {
 return `
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
   </head>
   <body>
     <div id="react-content"></div>
   </body>
   <script src="http://cdn.com/{version}/my.js"></script>
   </html>
  `
}
res.render(model(version))  // 返回带版本号的模板
```

这段代码中，因为两次迭代需求，前端开发者将前端资源打包成了两个资源包，分别上传到CDN的不同位置处，以版本号作为标识来确定新旧内容。

当用户的请求被接收到后，先通过getRule获取灰度规则来确定给当前用户展示哪一个版本号的资源，然后返回带着资源版本的模板内容，客户端接收到该模板之后，再加载对应的版本号资源，从而达到灰度要求。

#### 5.3 客户端渲染的前端应用

目前来说最常见的一种部署类型，前端开发完成后，直接打包至CDN上，然后利用nginx来请求到静态资源，这时候CDN服务器并不会去做灰度判断相关的操作，即这时候不能让后端通过一段获取灰度逻辑来控制版本，而此时前端数据请求都是异步ajax的方式，那灰度又该怎么做呢？

第一种思路：

我们可以在前端代码里写两套内容，在页面渲染之前发起异步获取灰度规则的请求，将结果拿到后在客户端决定渲染那一套页面，从而达到灰度的要求。

看看下面的伪代码：

```js
// 客户端端代码
// 组件
const component1 = () => {
 return (<div>我是A组件</div>)
}
const component2 = () => {
 return (<div>我是B组件</div>)
}
const isPass = $.ajax('/getRule?uid') // 查询规则
...
render() {
  if (isPass) { // 在白名单
    return model2()
  } else {
    return model1()
  }
}
...
```

上面的这段客户端代码即可完成用户灰度，但是有一个问题，当后期需求增多的时候前端代码将非常庞大，而且每次的新需求发布的时候势必要去测试回归旧的版本是否被改动了，将维护两套内容，随着应用体积变大维护将变得非常累。 

第二种思路： 如果我们继续保持版本号来区分每次的迭代，只是在渲染前获取到正确的版本资源来渲染是不是就可以解决上面的问题呢？

看看下面的伪代码：

```js
// 客户端端代码
const syncLoadJs = function (version, fn) {
  const oScript = document.createElement('script');
  oScript.setAttribute('src',`https://cdn.com/{version}/my.js`);
  oScript.setAttribute('type','text/javascript');
  oScript.onload = fn;
  oScript.onerror = function() { window.location.href = '/error.htm' };
  document.body.appendChild(oScript);
},

...
const isPass = $.ajax('/getRule?uid') // 查询规则
let version = 1.0.1; // 旧版本号
if (isPass) { // 在白名单
  version = 2.0.0
}
syncLoadJs(version, function(){
  ReactDOM.render());  // 客户端获取完资源后进行渲染
})
...
```

这一种方式则是在客户端渲染之前先进行异步获取名单来决定资源版本，在拿到资源版本之后才会进行页面渲染工作。

但是这里存在一个问题，每一个页面都需要去获取灰度规则，然后判断是否灰度，这个灰度请求将阻塞页面的，可能会造成较差的用户体验，所以我们可以考虑使用客户端的localStrage来存储这个用户是否为灰度用户，而不是每次请求资源时都发请求去判断是否为灰度用户，然后定期的更新localStrage内存储的值，取代大量的请求造成的体验问题。
