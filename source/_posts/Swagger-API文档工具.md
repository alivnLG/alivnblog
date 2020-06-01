---
title: Swagger-API文档工具
date: 2020-06-01 11:05:20
tags:
- swagger
- API
- YAML
categories:
- API文档工具 
---
#### 一、Swagger简介
Swagger 是一款RESTFUL接口的、基于YAML、JSON语言的文档在线自动生成、代码自动生成的工具。
<!--more-->
#### 二、环境集成
##### 1.远程方式
![swagger001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger001.jpg)
##### 2.本地方式
基于node.js、npm、http-server
```
npm install -g http-server  // 安装 http-server
wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip  
// 不用wget命令也可以，复制链接去下载zip包
unzip swagger-editor.zip  // 解压下载的zip包
http-server swagger-editor // 启动 swagger
```
打开 http://127.0.0.1:8080/#/，之后你可以看到与远程方式相同的页面:
![swagger002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger002.jpg)
#### 三、功能介绍
你可以引用本地的json、yaml文件，也可以新建，编写完成后下载。
![swagger003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger003.jpg)
在线测试，文档编写完后，可以点击try this operation进行接口测试。
![swagger004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger004.jpg)
强大的代码生成，编写完文档后可以下载相应的代码。
![swagger005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger005.jpg)  
![swagger006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger006.jpg)

### Postman


#### YAML
YAML是"YAML Ain't a Markup Language"（YAML不是一种置标语言）的递归缩写。
YAML的语法和其他高阶语言类似，并且可以简单表达清单、散列表，标量等资料形态。

多行缩进

单行缩写

