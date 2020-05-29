---
title: 网站证书 SSL数字证书
date: 2020-05-28 09:47:26
tags:
- 数字证书
categories:
- 网络安全
---
是网络上证明自己身份的文件，包含了公钥和其他相关信息（common name等），可以由权威机构颁发（在client端内置的根受信任机构列表中存在），也可以自己生成（需要client端安装相应的根证书才能被信任）ssl证书是数字证书的一种，用于在web client和web server中建立一条ssl安全通道。  
<!--more-->
证书格式：  
![ssl001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/ssl001.jpg)  
![ssl002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/ssl002.jpg)  
![ssl003.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/ssl003.jpg)  
![ssl004.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/ssl004.jpg)  

https连接建立过程中商定加密算法和传递加密密钥、向量
client 向 server发送建立https连接的请求，提供client支持的对称加密、密钥交换算法、摘要算法；

server 确定使用的加密算法组合，连同包含自己公钥的数字证书发送给client;

client验证server的证书是否可信任，不信任则断开连接，信任则生成对称加密的密钥、加密初始化向量和hmac的密钥，使用商定的密钥交换算法和server的公钥进行加密，发送给server(ClientKeyExchange消息)；

server用自己才有的私钥解密消息得到对称加密的密钥、加密初始化向量和hmac的密钥，返回成功的结果给client 。（此时client和server建立了https连接并商定好了接下来加密消息的加密方式）

步骤3中 client验证server证书的过程*ca颁发机构对证书中的公钥和信息生成摘要并使用自己统一的私钥进行加密，生成证书签名；

server端将ca颁发给自己的证书发给client

client端用统一的ca颁发机构的公钥（即ca根证书）对收到的数字证书签名解密得到摘要，按证书中的摘要算法计算摘要并比对，验证了此证书为权威机构颁发的证书，且与当前请求地址匹配。得到了目标server的公钥

权威证书如何签发？

权威机构颁发的证书

到证书颁发机构官网或阿里云这样的网站选择合适的证书并付款

进入配置 创建私钥对（生成csr、key文件）

填写域名信息（单域名 www.xxx.com;泛域名 *.xxx.com）

填写申请人信息（公司名称、网站/部门名称、地址信息（城市名称、省份名称）联系邮箱等）

验证域名所有权

验证通过 颁发证书

可以生成自签名证书
