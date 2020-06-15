---
title: TCP的连接与释放
date: 2020-06-15 14:12:17
tags:
- TCP
- UDP
- HTTP
categories:
- 网络安全
---
#### TCP/IP协议概述
在TCP/IP协议栈，传输层有两个协议TCP和UDP： 
- TCP（Transmission Control Protocol，传输控制协议）协议：负责将要传输的文件分段 进行传输，一般用于建立会话 ，其基本特性是可靠传输 、流量控制，所谓三握手、四挥手也是基于TCP协议的；
- UDP（User Data Protocol，用户数据报协议）协议：一个数据包就能够完成数据通信，数据包不分段 ，不需要建立会话 ，不需要流量控制 ，属于不可靠传输 ， 屏幕广播 、多播 、广播都是基于UDP协议。
以上定义，下面来详讲：

![tcp001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/tcp001.jpg)

#### 传输层协议的作用体现在应用层协议
TCP和UDP协议内指定不同的端口即可对应一个应用层的协议。  
端口代表主机服务的侦听"门牌号"，不管是TCP还是UDP，带上门牌号，它就能帮你找到主机上的对应服务。  
例如我们在浏览器访问某个网站地址，这个动作会被我们本机上的80端口侦听到，并处理你的网络请求。  
我们主机上常见的应用层协议端口：  
- HTTP默认使用TCP的80端口标识；
- FTP默认使用TCP的21端口标识；
- SMTP默认使用TCP的25端口标识；
- POP3默认使用TCP的110端口；
- HTTPS默认使用TCP的443端口；
- DNS使用UDP的53端口；
- 远程桌面协议（RDP）默认使用TCP的3389端口；
- Telnet 使用 TCP 的23端口 Windows 访问共享资源使用TCP的445端口；