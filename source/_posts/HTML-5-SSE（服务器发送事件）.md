---
title: HTML-5-SSE（服务器发送事件）
date: 2021-01-06 15:58:58
top: true
tags:
- SSE
categories:
- HTML
---
### 一、H5 SSE (服务器发送事件)
<!--more-->
#### 1.1 定义

HTML5 服务器发送事件（server-sent event）允许网页获得来自服务器的更新。

#### 1.2 Server-Sent 事件 - 单向消息传递

Server-Sent 事件指的是网页自动获取来自服务器的更新。

以前也可能做到这一点，前提是网页不得不询问是否有可用的更新。通过服务器发送事件，更新能够自动到达。

例子：Facebook/Twitter 更新、股价更新、新的博文、赛事结果等。

#### 1.3 接收 Server-Sent 事件通知

EventSource 对象用于接收服务器发送事件通知：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<h1>获取服务端更新数据</h1>
<div id="result"></div>

<script>
if(typeof(EventSource)!=="undefined")
{
	var source=new EventSource("demo_sse.php");
	source.onmessage=function(event)
	{
		document.getElementById("result").innerHTML+=event.data + "<br>";
	};
}
else
{
	document.getElementById("result").innerHTML="抱歉，你的浏览器不支持 server-sent 事件...";
}
</script>

</body>
</html>
```

创建一个新的 EventSource 对象，然后规定发送更新的页面的 URL（本例中是 "demo_sse.php"）

每接收到一次更新，就会发生 onmessage 事件

当 onmessage 事件发生时，把已接收的数据推入 id 为 "result" 的元素中

#### 1.4 检测 Server-Sent 事件支持

```js
if(typeof(EventSource)!=="undefined")
{
    // 浏览器支持 Server-Sent
    // 一些代码.....
}
else
{
    // 浏览器不支持 Server-Sent..
}
```

#### 1.5 服务器端代码实例

为了让上面的例子可以运行，您还需要能够发送数据更新的服务器（比如 PHP 和 ASP）。

服务器端事件流的语法是非常简单的。把 "Content-Type" 报头设置为 "text/event-stream"。现在，您可以开始发送事件流了。

PHP

```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>
```

ASP

```asp
<%
Response.ContentType="text/event-stream"
Response.Expires=-1
Response.Write("data: " & now())
Response.Flush()
%>
```

```
把报头 "Content-Type" 设置为 "text/event-stream"
规定不对页面进行缓存
输出发送日期（始终以 "data: " 开头）
向网页刷新输出数据
```

#### 1.6 EventSource 对象

在上面的例子中，我们使用 onmessage 事件来获取消息。不过还可以使用其他事件：

事件 | 描述
-- | --
onopen | 当通往服务器的连接被打开
onmessage | 当接收到消息
onerror | 当发生错误
