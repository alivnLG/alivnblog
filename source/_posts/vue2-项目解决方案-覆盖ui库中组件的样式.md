---
title: vue2-项目解决方案-覆盖ui库中组件的样式
date: 2021-06-25 16:16:26
top: true
tags:
categories:
- VUE
---
### 一、覆盖ui库中组件的样式

首先我们vue文件的样式都是写在<style lang="less" scoped></style>标签中的，加scoped是为了使得样式只在当前页面有效。那么问题来了，看图：
<!--more-->
![vueProject009.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject009.jpg)

我们正常写的所有样式，都会被加上[data-v-23d425f8]这个属性（如1所示），但是第三方组件内部的标签并没有编译为附带[data-v-23d425f8]这个属性。

所以，我们想修改组件的样式，就没辙了。怎么办呢，有些小伙伴给第三方组件写个class，然后在一个公共的css文件中或者在当前页面再写一个没有socped属性的style标签，然后直接在里面修改第三方组件的样式。这样不失为一个方法，但是存在全局污染和命名冲突的问题。约定特定的命名方式，可以避免命名冲突。但是还是不够优雅。

下面说下优雅的解决方式：

通过深度选择器解决。例如修改上图中组件里的van-ellipsis类的样式，可以这样做：

```css
.van-tabs /deep/ .van-ellipsis { color: blue};
```

编译后的结果就是：

![vueProject010.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject010.jpg)

这样就不会给van-ellipsis也添加[data-v-23d425f8]属性了。至此你可以愉快的修改第三方组件的样式了。

当然了这里的深度选择器/deep/是因为我用的less语言，如果你没有使用less/sass等，可以用>>>符号。