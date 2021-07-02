---
title: vue2-项目解决方案-打包后文件、图片、背景图资源不存在或者路径错误的问题
date: 2021-06-25 16:20:13
top: true
tags:
categories:
- VUE
---
### 一、打包后文件、图片、背景图资源不存在或者路径错误的问题
<!--more-->
![vueProject019.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject019.jpg)

先看下项目的config文件夹下的index.js文件，这个配置选项就好使我们打包后的资源公共路径，默认的值为‘/’，即根路径，所以打包后的资源路径为根目录下的static。由此问题来了，如果你打包后的资源没有放在服务器的根目录，而是在根目录下的mobile等文件夹的话，那么打包后的路径和你代码中的路径就会有冲突了，导致资源找不到。

所以，为了解决这个问题，你可以在打包的时候把上面这个路径由‘/’的根目录，改为‘./’的相对路径。

![vueProject020.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject020.jpg)

这样的的话，打包后的图片啊js等路径就是‘./static/img/asc.jpg’这样的相对路径，这就不管你放在哪里，都不会有错了。但是，凡是都有但是~~~~~这里一切正常，但是背景图的路径还是不对。因为此时的相对就变成了static/css/文件夹下的static/img/xx.jpg，但是实际上static/css/文件夹下没有static/img/xx.jpg，即static/css/static/img/xx.jpg是不存在的。此时相对于的当前的css文件的路径。所以为了解决这个问题，要把我们css中的背景图的加个公共路径‘../../’，即让他往上返回两级到和index.html文件同级的位置，那么此时的相对路径static/img/xx.jpg就能找到对应的资源了。那么怎么修改背景图的这个公共路径呢，因为背景图是通过loader解析的，所以自然在loader的配置中修改，打开build文件夹下的utils文件，找到exports.cssLoaders的函数，在函数中找到对应下面这些配置：

![vueProject021.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject021.jpg)

找到这个位置，添加一上配置，就是上图红框内的代码，就可以把它的公共路径修改为往上返回两级。这样再打包看下，就ok了！最后再郑重说一点，如果你的路由模式是history的，那么打包放在服务器，必须要后台服务器的配合，具体的可以看官方文档，这点很重要。不然你会发现白屏啊等各种莫名其妙的问题。牢记！！！