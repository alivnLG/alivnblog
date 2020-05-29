---
title: Mongo基础知识
date: 2020-05-29 11:10:05
tags:
- Mongo
categories:
- 数据库
---
#### 一、MongoDB简介
MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。
<!--more-->
在高负载的情况下，添加更多的节点，可以保证服务器性能。

MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

##### Mongo特点
```
MongoDB 是一个面向文档存储的数据库，操作起来比较简单和容易。

你可以在MongoDB记录中设置任何属性的索引 (如：FirstName="Sameer",Address="8 Gandhi Road")来实现更快的排序。

你可以通过本地或者网络创建数据镜像，这使得MongoDB有更强的扩展性。

如果负载的增加（需要更多的存储空间和更强的处理能力） ，它可以分布在计算机网络中的其他节点上这就是所谓的分片。

Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。

MongoDb 使用update()命令可以实现替换完成的文档（数据）或者一些指定的数据字段 。

Mongodb中的Map/reduce主要是用来对数据进行批量处理和聚合操作。

Map和Reduce。Map函数调用emit(key,value)遍历集合中所有的记录，将key与value传给Reduce函数进行处理。

Map函数和Reduce函数是使用Javascript编写的，并可以通过db.runCommand或mapreduce命令来执行MapReduce操作。

GridFS是MongoDB中的一个内置功能，可以用于存放大量小文件。
MongoDB允许在服务端执行脚本，可以用Javascript编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。

MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。

MongoDB安装简单。
```
mongodb中基本的概念是文档、集合、数据库

![mongo001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mongo001.jpg)

一个mongodb中可以建立多个数据库。  
MongoDB的默认数据库为"db"，该数据库存储在data目录中。  
MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

##### ObjectId
![mongo002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mongo002.jpg)
ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：
```
前 4 个字节表示创建 unix 时间戳,格林尼治时间 UTC 时间，比北京时间晚了 8 个小时
接下来的 3 个字节是机器标识码
紧接的两个字节由进程 id 组成 PID
最后三个字节是随机数
```
MongoDB 中存储的文档必须有一个 _id 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象
