---
title: Github搜索技巧
date: 2020-11-11 14:32:05
tags:
- Github
categories:
- 学习
---
#### 一、按照 name 搜索
搜索项目名里面包含React的项目:

```
in:name React
```
<!--more-->
![github001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github001.jpg)

可以看到，这些搜索结果都是项目名里面带有“React”关键字的项目，但是项目数量依旧很多。

现在我们来约束一下

比如我再精确到项目的star数大于5000+：

```
in:name React stars:>5000
```

结果是这样的：

![github002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github002.jpg)

搜索结果瞬间精确了很多，现在只有114个项目可供选择。当然我们一般不会把star数设置得这么高，一般设置个1000就差不多了。

同理，我们也可以按照fork的数量来进行搜索:

```
in:name React stars:>5000 forks:>3000
```

![github003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github003.jpg)

#### 二、按照README来搜索
搜索README.md里面包含React的项目:

```
in:readme React
```

![github004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github004.jpg)

结果有这么多，那么我们再限制一下它的star数和fork数：

```
in:readme React stars:>3000 forks:>3000
```

![github005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github005.jpg)

搜索结果一下子精确到了90个。这个时候你再去选择项目，就会变得容易很多。

#### 三、按照descriptin搜索
假设我们现在要学习微服务的项目，我们搜索项目描述(description)里面包含微服务的项目:

```
in:description 微服务
```

![github006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github006.jpg)

结果有这么多，那我们接着增加一些筛选条件:

```
in:description 微服务 language:python
```

language:python的意思是我们把语言限制为python，我们来看看结果如何:

![github007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github007.jpg)

搜索结果精确了很多。假如在这些项目里面，我们想要找到最近才更新的项目，意思是更新时间就在最近，我们可以这样：

```
in:description 微服务 language:python pushed:>2020-01-01
```

pushed:>2020-01-01的意思是我们把项目的最后更新时间限制到2020-01-01，我们来看看结果如何:

![github008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/github008.jpg)

#### 四、总结

> in:name xxx // 按照项目名搜索
> in:readme xxx // 按照README搜索
> in:description xxx // 按照description搜索

> stars:>xxx // stars数大于xxx
> forks:>3000 // forks数大于xxx
> language:xxx // 编程语言是xxx
> pushed:>YYYY-MM-DD // 最后更新时间大于YYYY-MM-DD

#### 五、其他技巧
[github 项目趋势榜 github.com/trending](https://github.com/trending)

[其他Github搜索技巧 https://juejin.im/post/6891056415440535565](https://juejin.im/post/6891056415440535565)