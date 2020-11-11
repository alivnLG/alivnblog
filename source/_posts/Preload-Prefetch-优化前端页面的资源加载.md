---
title: Preload&Prefetch 优化前端页面的资源加载
date: 2020-11-11 13:05:48
tags:
- prefetch
- preload
categories:
- HTML
---
#### 一、prefetch
prefetch(链接预取）是一种浏览器机制，其利用浏览器空闲时间来下载或预取用户在不久的将来可能访问的文档。网页向浏览器提供一组预取提示，并在浏览器完成当前页面的加载后开始静默地拉取指定的文档并将其存储在缓存中。当用户访问其中一个预取文档时，便可以快速的从浏览器缓存中得到。
<!--more-->
具体来说，浏览器通过标签来实现预加载。

其中rel="prefetch"被称为Resource-Hints（资源提示），也就是辅助浏览器进行资源优化的指令。

```
<head>
    ...
    <link rel="prefetch" href="static/img/ticket_bg.a5bb7c33.png">
    ...
</head>
```

可以看到，在首屏的请求列表中已经出现了优惠券背景图ticket_bg.png的加载请求，请求本身看起来和普通请求没什么不同；展开优惠券列表后，network中增加了一次新的ticket_bg.png访问请求，我们很快发现，这个请求的status虽然也是200，但有一个特殊的标记—prefetch cache，表明这次请求的资源来自prefetch缓存。这个表现验证了上文中prefetch的定义，即浏览器在空闲时间预先加载资源，真正使用时直接从浏览器缓存中快速获取。

![prefetch001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/prefetch001.jpg)

#### 二、preload
preload与prefetch同属于浏览器的Resource-Hints，用于辅助浏览器进行资源优化。为了对两者进行区分，prefetch通常翻译为预提取，preload则翻译为预加载。

元素的rel属性的属性值preload能够让你在你的HTML页面中元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

简单来说，就是通过标签显式声明一个高优先级资源，强制浏览器提前请求资源，同时不阻塞文档正常onload。

```
<head>
    ...
    <link rel="preload" as="font" href="<%= require('/assets/fonts/AvenirNextLTPro-Demi.otf') %>" crossorigin>
    <link rel="preload" as="font" href="<%= require('/assets/fonts/AvenirNextLTPro-Regular.otf') %>" crossorigin>
    ...
</head>
```

文件的加载时机明显提前

> 注意：preload link必须设置as属性来声明资源的类型（font/image/style/script等)，否则浏览器可能无法正确加载资源。

#### 三、preload 和 prefetch 的具体实践
##### 3.1 preload-webpack-plugin
```
<head>
    ...
    <link rel="prefetch" href="static/img/ticket_bg.a5bb7c33.png">
    ...
</head>
```

```
<head>
    ...
    <link rel="preload" as="font" href="<%= require('/assets/fonts/AvenirNextLTPro-Demi.otf') %>" crossorigin>
    <link rel="preload" as="font" href="<%= require('/assets/fonts/AvenirNextLTPro-Regular.otf') %>" crossorigin>
    ...
</head>
```

这显然不够方便，而且将资源路径硬编码在了页面中（实际上，ticket_bg.a5bb7c33.png后缀中的hash是构建过程自动生成的，所以硬编码的方式很多场景下本身就行不通）。webpack插件preload-webpack-plugin可以帮助我们将该过程自动化，结合htmlWebpackPlugin在构建过程中插入link标签。

```
const PreloadWebpackPlugin = require('preload-webpack-plugin');
...
plugins: [
  new PreloadWebpackPlugin({
    rel: 'preload'，
    as(entry) {  //资源类型
      if (/\.css$/.test(entry)) return 'style';
      if (/\.woff$/.test(entry)) return 'font';
      if (/\.png$/.test(entry)) return 'image';
      return 'script';
    },
    include: 'asyncChunks', // preload模块范围，还可取值'initial'|'allChunks'|'allAssets',
    fileBlacklist: [/\.svg/] // 资源黑名单
    fileWhitelist: [/\.script/] // 资源白名单
  })
]
```

PreloadWebpackPlugin配置总体上比较简单，需要注意的是include属性。该属性默认取值'asyncChunks'，表示仅预加载异步js模块；
如果需要预加载图片、字体等资源，则需要将其设置为'allAssets'，表示处理所有类型的资源。

但一般情况下我们不希望把预加载范围扩得太大，所以需要通过fileBlacklist或fileWhitelist进行控制。

对于异步加载的模块，还可以通过webpack内置的/_ webpackPreload: true _/标记进行更细粒度的控制。

以下面的代码为例，webpack会生成标签添加到html页面头部。

```
import(/* webpackPreload: true */ 'AsyncModule');
```

> 备注：prefetch的配置与preload类似，但无需对as属性进行设置。

#### 四、使用场景
从前文的介绍可知，preload的设计初衷是为了尽早加载首屏需要的关键资源，从而提升页面渲染性能。

目前浏览器基本上都具备预测解析能力，可以提前解析入口html中外链的资源，因此入口脚本文件、样式文件等不需要特意进行preload。

但是一些隐藏在CSS和JavaScript中的资源，如字体文件，本身是首屏关键资源，但当css文件解析之后才会被浏览器加载。这种场景适合使用preload进行声明，尽早进行资源加载，避免页面渲染延迟。

与preload不同，prefetch声明的是将来可能访问的资源，因此适合对异步加载的模块、可能跳转到的其他路由页面进行资源缓存；对于一些将来大概率会访问的资源，如上文案例中优惠券列表的背景图、常见的加载失败icon等，也较为适用。

#### 五、最佳实践
基于上面对使用场景的分享，我们可以总结出一个比较通用的最佳实践：

- 大部分场景下无需特意使用preload
- 类似字体文件这种隐藏在脚本、样式中的首屏关键资源，建议使用preload
- 异步加载的模块（典型的如单页系统中的非首页）建议使用prefetch
- 大概率即将被访问到的资源可以使用prefetch提升性能和体验

#### 六、vue-cli3的默认配置
**preload**

默认情况下，一个Vue CLI应用会为所有初始化渲染需要的文件自动生成preload提示。这些提示会被@vue/preload-webpack-plugin注入，并且可以通过chainWebpack的config.plugin('preload')进行修改和删除。

**prefetch**

默认情况下，一个Vue CLI应用会为所有作为async chunk生成的JavaScript文件(通过动态import()按需code splitting的产物)自动生成prefetch提示。这些提示会被@vue/preload-webpack-plugin注入，并且可以通过chainWebpack的config.plugin('prefetch')进行修改和删除。

#### 七、总结和踩坑
1、preload和prefetch的本质都是预加载，即先加载、后执行，加载与执行解耦。

2、preload和prefetch不会阻塞页面的onload。

3、preload用来声明当前页面的关键资源，强制浏览器尽快加载；而prefetch用来声明将来可能用到的资源，在浏览器空闲时进行加载。

4、不要滥用preload和prefetch，需要在合适的场景中使用。

5、preload的字体资源必须设置crossorigin属性，否则会导致重复加载。

原因是如果不指定crossorigin属性(即使同源)，浏览器会采用匿名模式的CORS去preload，导致两次请求无法共用缓存。

6、关于preload和prefetch资源的缓存，在Google开发者的一篇文章中是这样说明的：如果资源可以被缓存（比如说存在有效的cache-control和max-age），它被存储在HTTP缓存（也就是disk cache)中，可以被现在或将来的任务使用；如果资源不能被缓存在HTTP缓存中，作为代替，它被放在内存缓存中直到被使用。

然而我们在Chrome浏览器（版本号80）中进行测试，结果却并非如此。将服务器的缓存策略设置为no-store，观察下资源加载情况。
可以发现ticket_bg.png第二次加载并未从本地缓存获取，仍然是从服务器加载。因此，如果要使用prefetch，相应的资源必须做好合理的缓存控制。

![prefetch002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/prefetch002.jpg)

7、没有合法https证书的站点无法使用prefetch，预提取的资源不会被缓存（实际使用过程中发现，原因未知）。

8、最后我们来看下preload和prefetch的浏览器兼容性。

![prefetch003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/prefetch003.jpg)

![prefetch004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/prefetch004.jpg)

可以看到，两者的兼容性目前都还不是太好。好在不支持preload和prefetch的浏览器会自动忽略它，因此可以将它们作为一种渐进增强功能，优化我们页面的资源加载，提升性能和用户体验。

