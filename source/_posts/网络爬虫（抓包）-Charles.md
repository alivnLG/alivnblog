---
title: 网络爬虫（抓包）-Charles
date: 2020-11-25 15:01:24
tags:
- 爬虫
- 抓包
categories:
- 网络安全
---
#### 网络爬虫-Charles
##### 1.简介
在 Mac 下常用的网络封包截取工具，在做移动开发时，我们为了调试与服务器端的网络通讯协议，常常需要截取网络封包来分析。
<!--more-->
Charles 通过将自己设置成系统的网络访问代理服务器，使得所有的网络访问请求都通过它来完成，从而实现了网络封包的截取和分析。

除了在做移动开发中调试端口外，Charles 也可以用于分析第三方应用的通讯协议。配合 Charles 的 SSL 功能，Charles 还可以分析 Https 协议。

##### 2.主要功能
截取 Http 和 Https 网络封包。

支持重发网络请求，方便后端调试。

支持修改网络请求参数。

支持网络请求的截获并动态修改。

支持模拟慢速网络。

支持 Http 2。

支持 IPv6。

##### 3.将Charles 设置成系统代理
Charles 是通过将自己设置成代理服务器来完成封包截取的，所以使用 Charles 的第一步是将其设置成系统的代理服务器。

启动 Charles 后，第一次 Charles 会请求你给它设置系统代理的权限。你可以输入登录密码授予 Charles 该权限。你也可以忽略该请求，然后在需要将 Charles 设置成系统代理时，选择菜单中的 “Proxy” -> “Mac OS X Proxy” 来将 Charles 设置成系统代理。如下所示：

![reptile001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/reptile001.jpg)

*注意*

Chrome 和 Firefox 浏览器默认并不使用系统的代理服务器设置，而 Charles 是通过将自己设置成代理服务器来完成封包截取的，所以在默认情况下无法截取 Chrome 和 Firefox 浏览器的网络通讯内容。如果你需要截取的话，在 Chrome 中设置成使用系统的代理服务器设置即可，或者直接将代理服务器设置成 127.0.0.1:8888 也可达到相同效果。

##### 4.界面介绍
![reptile002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/reptile002.jpg)


Charles 主要提供两种查看封包的视图，分别名为 “Structure” 和 “Sequence”。

Structure 视图将网络请求按访问的域名分类。

Sequence 视图将网络请求按访问的时间排序。

Charles 提供了一个简单的 Filter 功能，可以输入关键字来快速筛选出 URL 中带指定关键字的网络请求。

##### 5.安装证书
安装证书，解决乱码。

##### 6.其他操作
[参考网络资料1](https://www.jianshu.com/p/5a30fb028191)

[参考网络资料2](https://www.jianshu.com/p/66b6768ce901)
