---
title: HTTP网络请求
date: 2020-05-28 09:46:39
top: true
tags:
- TCP
- HTTP
categories:
- 网络安全
---
请求过程：域名解析、TCP的三次握手、建立TCP连接后发起HTTP请求、服务器响应HTTP请求、浏览器解析html代码，同时请求html代码中的资源（如js、css、图片等）、最后浏览器对页面进行渲染并呈现给用户。
<!--more-->
#### 1.域名解析
以Chrome浏览器为例，Chrome会解析域名对应的IP地址。  
（1）Chrome浏览器会首先搜索浏览器自身的DNS缓存（可以使用 chrome://net-internals/#dns 来进行查看），浏览器自身的DNS缓存有效期比较短，且容纳有限，大概是1000条。如果自身的缓存中存在blog.csdn.net 对应的IP地址并且没有过期，则解析成功。  

（2）如果（1）中未找到，那么Chrome会搜索操作系统自身的DNS缓存（可以在命令行下使用 ipconfig /displaydns 查看）。如果找到且没有过期则成功。

（3）如果（2）中未找到，那么尝试读取位于C:\Windows\System32\drivers\etc下的hosts文件，如果找到对应的IP地址则解析成功。

（4）如果（3）中未找到，浏览器首先会找TCP/IP参数中设置的本地DNS服务器，如果要查询的域名包含在本地配置的区域资源中，则完成域名解析，否则根据本地DNS服务器会请求根DNS服务器。

（5）本地DNS会把请求发至13台根DNS，根DNS服务器收到请求后会返回负责这个域名(.net)的服务器的一个IP，本地DNS服务器使用该IP信息联系负责.net域的这台服务器。这台负责.net域的服务器收到请求后，如果自己无法解析，会返回.net域的下一级DNS服务器地址(blog.csdn.net)给本地DNS服务器。以此类推，直至找到。
#### 2.TCP的三次握手
连接的时候是三次握手，关闭的时候是四次挥手
#### 3.建立TCP连接后发起HTTP请求
TCP三次握手建立连接成功后，客户端按照指定的格式开始向服务端发送HTTP请求，服务端接收请求后，解析HTTP请求，处理完业务逻辑，最后返回一个具有标准格式的HTTP响应给客户端。
##### 3.1 HTTP请求格式
HTTP请求格式如下所示四部分组成，分别是请求行、请求头、空行、消息体，每部分内容占一行。
```
[java] view plain copy
<request-line>  
<general-headers>  
<request-headers>  
<entity-headers>  
<empty-line>  
[<message-body>]  
```
请求行：由三部分组成：分别是请求方法（GET/POST/DELETE/PUT/HEAD）、URI路径、HTTP版本号。
 
请求头：缓存相关信息（Cache-Control，If-Modified-Since）、客户端身份信息（User-Agent）等键值对信息。
空行。

主体：客户端发给服务端的请求数据，这部分数据并不是每个请求必须的。
 
常用的GET、POST、PUT、DELETE四种请求方式中：
（1）关于GET和DELETE将要处理的资源信息直接放在了URL中。通过"?<键值对>&<键值对>“的形式追加。**但是URL最大长度为1024字节**。

（2）关于POST和PUT的请求参数存储在报文的主体中。每一个参数都以”--boundary值“+"属性信息"+”空行“+"参数值"的数据结构存储。请求数据的最后以”--boundary值--“的格式结尾。
 
##### 3.2 服务器响应HTTP请求
服务器接收处理完请求后返回一个HTTP响应消息给客户端。HTTP响应消息的格式包括：状态行、响应头、空行、消息体。每部分内容占一行。
```
[java] view plain copy
<status-line>  
<general-headers>  
<response-headers>  
<entity-headers>  
<empty-line>  
[<message-body>]  
```
状态行：有HTTP协议版本号，状态码和状态说明三部分构成。

响应头：用于说明数据的一些信息，比如数据类型、内容长度等键值对。
空行。

消息体：服务端返回给客户端的HTML文本内容。或者其他格式的数据，比如：视频流、图片或者音频数据。

#### 4.浏览器解析html代码，并请求html代码中的资源
浏览器拿到html文件后，就开始解析其中的html代码，遇到js/css/image等静态资源时，向服务器端发起一个HTTP请求，如果服务器端返回304状态码（告诉浏览器服务器端没有修改该资源），那么浏览器会直接读取本地的该资源的缓存文件。否则开启新线程向服务器端去请求下载。（这个时候就用上keep-alive特性了，建立一次HTTP连接，可以请求多个资源。）

最后，浏览器利用自己内部的工作机制，把请求到的静态资源和html代码进行渲染，再呈现给用户。