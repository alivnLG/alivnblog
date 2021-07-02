---
title: vue2-项目解决方案-Hiper性能分析
date: 2021-06-25 16:18:54
top: true
tags:
categories:
- VUE
---
### 一、Hiper性能分析
<!--more-->
![vueProject015.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject015.jpg)

如上图，是hiper工具的测试结果，从中我们可以看到DNS查询耗时、TCP连接耗时、第一个Byte到达浏览器的用时、页面下载耗时、DOM Ready之后又继续下载资源的耗时、白屏时间、DOM Ready 耗时、页面加载总耗时。在我们的编辑器终端中全局安装：

```
cnpm install hiper -g
```

使用：终端输入命令：hiper 测试的网址

```
# 当我们省略协议头时，默认会在url前添加`https://`

 # 最简单的用法
 hiper baidu.com

 # 如何url中含有任何参数，请使用双引号括起来
 hiper "baidu.com?a=1&b=2"

 #  加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2"

 #  禁用缓存加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" --no-cache

 #  禁JavaScript加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" --no-javascript
 
 #  使用GUI形式加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" -H false

 #  使用指定useragent加载网页100次
 hiper -n 100 "baidu.com?a=1&b=2" -u "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) 
 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
 ```

 这段用法示例，我直接拷贝的文档说明，具体的可以看下文档。当我们项目打开速度慢时，这个工具可以帮助我们快速定位出到底在哪一步影响的页面加载的速度。
 
 平时我们查看性能的方式，是在performance和network中看数据，记录下几个关键的性能指标，然后刷新几次再看这些性能指标。有时候我们发现，由于样本太少，受当前「网络」、「CPU」、「内存」的繁忙程度的影响很重，有时优化后的项目反而比优化前更慢。
 
 如果有一个工具，一次性地请求N次网页，然后把各个性能指标取出来求平均值，我们就能非常准确地知道这个优化是「正优化」还是「负优化」。
 
 hiper就是解决这个痛点的。