---
title: web-13-跨域详解
date: 2021-01-05 11:53:05
top: true
tags:
- 跨域
- SOP
- Ajax
- JSONP
- Nginx
- CORS
categories:
- 前端综合
---
### 一、背景介绍
#### 1.什么是跨域？
跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。广义的跨域：
<!--more-->
1.) 资源跳转： A链接、重定向、表单提交

2.) 资源嵌入： link script img frame等dom标签，还有样式中background:url()、@font-face()等文件外链

3.) 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等

在前端部分其实我们通常所说的跨域是狭义的，是由浏览器同源策略限制的一类请求场景。

#### 2.同源策略
同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

同源策略限制以下几种行为：
1.) Cookie、LocalStorage 和 IndexDB 无法读取

2.) DOM 和 Js对象无法获得

3.) AJAX 请求不能发送

同源:
```
http://baidu.com/a/b.js 和http://baidu.com/index.php
```
不同源:
```
http://baidu.com/main.js 和https://baidu.com/a.php (协议不同)
http://baidu.com/main.js和 http://bbs.baidu.com/a.php(域名不同，域名必须完全相同才可以)
http://baidu.com/main.js 和 http://baidu.com:8080/a.php(端口不同,第一个是80)
```
***需要注意的是: 对于当前页面来说页面存放 JS 文件的域不重要，重要的是加载该JS的页面所在什么域***

#### 3.跨域方式
##### 1.jsonp
##### 2.nginx的反向代理
##### 3.window.name + iframe
当在浏览器中打开一个页面，或者在页面中添加一个iframe时即会创建一个对应的window对象，当页面加载另一个新的页面时，window的name属性是不会变的。这样就可以利用在页面动态添加一个iframe然后src加载数据页面，在数据页面将需要的数据赋值给window.name。然而此时承载iframe的parent页面还是不能直接访问，不在同一域下iframe的name属性，这时只需要将iframe再加载一个与承载页面同域的空白页面，即可对window.name进行数据读取

name 在浏览器环境中是一个全局/window对象的属性，且当在 frame 中加载新页面时，name 的属性值依旧保持不变。通过在 iframe 中加载一个资源，该目标页面将设置 frame 的 name 属性。此 name 属性值可被获取到，以访问 Web 服务发送的信息。但 name 属性仅对相同域名的 frame 可访问。这意味着为了访问 name 属性，当远程 Web 服务页面被加载后，必须导航 frame 回到原始域。同源策略依旧防止其他 frame 访问 name 属性。一旦 name 属性获得，销毁 frame 。

在最顶层，name 属性是不安全的，对于所有后续页面，设置在 name 属性中的任何信息都是可获得的。然而 windowName 模块总是在一个 iframe 中加载资源，并且一旦获取到数据，或者当你在最顶层浏览了一个新页面，这个 iframe 将被销毁，所以其他页面永远访问不到 window.name 属性。
##### 4.CORS
##### 5.postMessage()

#### Ajax瀑布流
```

<!DOCTYPE html>
<html>
<head>
<script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
  
  <meta charset="utf-8">
<!--
Created using JS Bin
http://js.jirengu.com

Copyright (c) 2019 by ShaunZh (http://js.jirengu.com/bagaw/1/edit)

Released under the MIT license: http://jsbin.mit-license.org
-->
<meta name="robots" content="noindex">
  <title>JS Bin</title>

<style id="jsbin-css">
.content{
      position: relative;
    }
    .item{
      position: absolute;
      width: 200px;
      margin-right: 10px;
      margin-top: 10px;
      transition: all 1s;
    }

    .h1{
      height: 200px;
      background-color: #f4b300;
    }

    .h2{
      height: 300px;
      background-color: #691bb8;
    }

    .h3{
      height: 400px;
      background-color: #006ac1;
    }

</style>
</head>
<body>
 <div class="content">
    <div class="item h1">
      1
    </div>
    <div class="item h3">
      2
    </div>
    <div class="item h2">
      3
    </div>
    <div class="item h1">
      4
    </div>
    <div class="item h1">
      5
    </div>
    <div class="item h3">
      6
    </div>
    <div class="item h3">
      7
    </div>
      <div class="item h2">
      8
    </div>
    <div class="item h1">
      9
    </div>
    <div class="item h3">
      10
    </div>
    <div class="item h3">
      11
    </div>
    <div class="item h3">
      12
    </div>
    <div class="item h2">
      13
    </div>
    <div class="item h2">
      14
    </div>
  </div>
<script>
var itemWidth = $('.item').width();
    var colNum ;
    var items = $('.item');
    var colHeightArr = [];

    var Render = (function(){

      function render(){
        $.each(items, function(){
          let minColHeight = Math.min.apply(null, colHeightArr);
          let minColIndex = colHeightArr.indexOf(minColHeight);
          let $this = $(this);
          $this.css({
            left: minColIndex * $this.outerWidth(true),
            top: minColHeight,
          });
          colHeightArr[minColIndex] += $this.outerHeight(true);
        });
      }

      function renderInit(){
        colNum = parseInt($('.content').width() / itemWidth);
        for (var i = 0; i < colNum; i++){
          colHeightArr[i] = 0;
        }
        render();
      }

      return renderInit;
    })();

    Render();

    $(window).resize(function(){
      Render();
    })
</script>
<script src="http://js.jirengu.com/js/render/edit.js?3.25.5"></script>
<script>jsbinShowEdit && jsbinShowEdit({"static":"http://js.jirengu.com","root":"http://js.jirengu.com"});</script>
</body>
</html>
```