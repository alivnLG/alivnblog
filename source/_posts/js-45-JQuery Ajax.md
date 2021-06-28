---
title: js-45-JQuery Ajax
date: 2021-01-05 10:26:08
top: true
tags:
- JQuery
- Ajax
categories:
- JavaScript
---
### 一、JQuery Ajax

- 1.AJAX 是与服务器交换数据的技术，它在不重载全部页面的情况下，实现了对部分网页的更新。

- 2.AJAX = 异步 JavaScript 和 XML（Asynchronous JavaScript and XML）

### 二、GET 与 POST

- GET - 从指定的资源请求数据  

- POST - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。 

```
GET 请求可被缓存
GET 请求保留在浏览器历史记录中
GET 请求可被收藏为书签
GET 请求不应在处理敏感数据时使用
GET 请求有长度限制
GET 请求只应当用于取回数据
```

POST 也可用于从服务器获取数据。不过，POST   方法不会缓存数据，并且常用于连同请求一起发送数据。

```
POST 请求不会被缓存
POST 请求不会保留在浏览器历史记录中
POST 不能被收藏为书签
POST 请求对数据长度没有要求
```

其他请求类型

```
HEAD	与 GET 相同，但只返回 HTTP 报头，不返回文档主体。
PUT	    上传指定的 URI 表示，向指定资源位置上传其最新内容。
DELETE	删除指定资源。
TRACE   回显服务器收到的请求，主要用于测试或诊断。
OPTIONS	返回服务器支持的 HTTP 方法。
CONNECT	把请求连接转换到透明的 TCP/IP 通道。
PATCH   实体中包含一个表，表中说明与该URI所表示的原内容的区别。
```

### 三、Ajax方法

```js
$.ajax()	//执行异步 AJAX 请求
$.ajaxPrefilter()	//在每个请求发送之前且被 $.ajax() 处理之前，处理自定义 Ajax 选项或修改已存在选项
$.ajaxSetup()	//为将来的 AJAX 请求设置默认值
$.ajaxTransport()	//创建处理 Ajax 数据实际传送的对象
$.get()	//使用 AJAX 的 HTTP GET 请求从服务器加载数据
$.getJSON()	//使用 HTTP GET 请求从服务器加载 JSON 编码的数据
$.getScript()	//使用 AJAX 的 HTTP GET 请求从服务器加载并执行 JavaScript
$.param()	//创建数组或对象的序列化表示形式（可用于 AJAX 请求的 URL 查询字符串）
$.post()	//使用 AJAX 的 HTTP POST 请求从服务器加载数据
ajaxComplete()	//规定 AJAX 请求完成时运行的函数
ajaxError()	//规定 AJAX 请求失败时运行的函数
ajaxSend()	//规定 AJAX 请求发送之前运行的函数
ajaxStart()	//规定第一个 AJAX 请求开始时运行的函数
ajaxStop()	//规定所有的 AJAX 请求完成时运行的函数
ajaxSuccess()	//规定 AJAX 请求成功完成时运行的函数
load()	//从服务器加载数据，并把返回的数据放置到指定的元素中
serialize()	//编码表单元素集为字符串以便提交
serializeArray()	//编码表单元素集为 names 和 values 的数组

```

```js
$("button").click(function(){
    $.ajax({
        url:"demo_test.txt",
        success:function(result){
            $("#div1").html(result);
        }
    }); 
});
```

其他名称/值：

```js
async	//布尔值，表示请求是否异步处理。默认是 true。
beforeSend(xhr)	//发送请求前运行的函数。
cache	//布尔值，表示浏览器是否缓存被请求页面。默认是 true。
complete(xhr,status)	//请求完成时运行的函数（在请求成功或失败之后均调用，
                        //即在 success 和 error 函数之后）。
contentType	//发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"。
context	//为所有 AJAX 相关的回调函数规定 "this" 值。
data	//规定要发送到服务器的数据。
dataFilter(data,type)	//用于处理 XMLHttpRequest 原始响应数据的函数。
dataType	//预期的服务器响应的数据类型。
error(xhr,status,error)	//如果请求失败要运行的函数。
global	//布尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。
ifModified	//布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。
jsonp	//在一个 jsonp 中重写回调函数的字符串。
jsonpCallback	//在一个 jsonp 中规定回调函数的名称。
password	//规定在 HTTP 访问认证请求中使用的密码。
processData	//布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。
scriptCharset	//规定请求的字符集。
success(result,status,xhr)	//当请求成功时运行的函数。
timeout	//设置本地的请求超时时间（以毫秒计）。
traditional	//布尔值，规定是否使用参数序列化的传统样式。
type	//规定请求的类型（GET 或 POST）。
url	//规定发送请求的 URL。默认是当前页面。
username	//规定在 HTTP 访问认证请求中使用的用户名。
xhr	//用于创建 XMLHttpRequest 对象的函数。
```

### 四、Ajax缓存

#### 4.1 Ajax缓存原理

Ajax在发送的数据成功后，会把请求的URL和返回的响应结果保存在缓存内，当下一次调用Ajax发送相同的请求时，它会直接从缓存中把数据取出来，这是为了提高页面的响应速度和用户体验。当前这要求两次请求URL完全相同，包括参数。这个时候，浏览器就不会与服务器交互。

#### 4.2 Ajax缓存的好处

这种设计使客户端对一些静态页面内容的请求，比如图片，css文件，js脚本等，变得更加快捷，提高了页面的响应速度，也节省了网络通信资源。

#### 4.3 Ajax缓存的不足

Ajax缓存虽然有上述的好处，但是如果通过Ajax对一些后台数据进行更改的时候，虽然数据在后台已经发生改变，但是页面缓存中并没有改变，对于相同的URL，Ajax提交过去以后，浏览器还只是简单的从缓存中拿数据，这种情况当然就不行了。

#### 4.4 解决Ajax缓存问题的方法

解决这个问题最有效的办法是禁止页面缓存，有以下几种处理方法：

1、在ajax发送请求前加上 xmlHttpRequest.setRequestHeader(“Cache-Control”,”no-cache”);

2、在服务端加 header(“Cache-Control: no-cache, must-revalidate”);

3、在ajax发送请求前加上 xmlHttpRequest.setRequestHeader(“If-Modified-Since”,”0″);

4、在 Ajax 的 URL 参数后加上 "?fresh=" + Math.random(); //当然这里参数 fresh 可以任意取了

5、第五种方法和第四种类似，在 URL 参数后加上 "?timestamp=" + new Date().getTime();

6、用POST替代GET：不推荐

7、jQuery提供一个防止ajax使用缓存的方法：

```js
<script type="text/[javascript](http://www.111cn.net/js_a/js.html)" language="javascript"> 
     $.ajaxSetup ({ 
           cache: false //close AJAX cache 
      }); 
</script>
```

8、修改load 加载的url地址，如在url 多加个时间参数就可以：

9、设置html的缓存

```html
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
```
