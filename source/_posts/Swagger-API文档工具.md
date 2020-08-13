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

#### 四、Postman


#### 五、YAML
YAML是"YAML Ain't a Markup Language"（YAML不是一种置标语言）的递归缩写。
YAML的语法和其他高阶语言类似，并且可以简单表达清单、散列表，标量等资料形态。

编写接口文档（描述文件）

多行缩进

单行缩写

#### 六、swagger实践

1.Swagger UI:提供了一个可视化的UI页面展示描述文件。接口的调用方、测试、项目经理等都可以在该页面中对相关接口进行查阅和做一些简单的接口请求。该项目支持在线导入描述文件和本地部署UI项目。

可导入接口相关的yaml或json文件（描述文件），利用Swagger UI展示

本地部署效果如下：

![swagger001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/swagger007.jpg)

2.Swagger Editor: 类似于markendown编辑器的编辑Swagger描述文件的编辑器，该编辑支持实时预览描述文件的更新效果。也提供了在线编辑器和本地部署编辑器两种方式。

3.Swagger Inspector: 感觉和postman差不多，是一个可以对接口进行测试的在线版的postman。比在Swagger UI里面做接口请求，会返回更多的信息，也会保存你请求的实际请求参数等数据。

4.Swagger Codegen: 通过Codegen 可以将描述文件生成html格式和cwiki形式的接口文档，同时也能生成多钟语言的服务端和客户端的代码。支持通过jar包，docker，node等方式在本地化执行生成。也可以在后面的Swagger Editor中在线生成。

5.Swagger Hub：集成了上面所有项目的各个功能，你可以以项目和版本为单位，将你的描述文件上传到Swagger Hub中。在Swagger Hub中可以完成上面项目的所有工作，需要注册账号，分免费版和收费版。

6.Springfox Swagger: Spring 基于swagger规范，可以将基于SpringMVC和Spring Boot项目的项目代码，自动生成JSON格式的描述文件。本身不是属于Swagger官网提供的，在这里列出来做个说明，方便后面作一个使用的展开。



