---
title: Web移动端适配方案
date: 2020-11-12 13:32:11
tags:
- Web移动端
categories:
- Web前端
---
#### 一、前言
在过去的几年时间里，移动端web野蛮生长，智能机的Android阵营和IOS阵营分庭抗礼，随之产生了多个系统版本（系统版本多样）；五花八门的屏幕尺寸、屏幕展示技术（如大名鼎鼎的Retina技术屏）层出不穷（屏幕尺寸、技术多样），还是CSS的W3C标准在各式各样的移动端浏览器上落实得也是七零八落（浏览器兼容多样）。
<!--more-->
细看下来移动端Web开发工作面临着很多的多样性，可想而知在这样的不确定性下去开发一个完善的项目会有多大的阻力，因此，移动端Web亟需一个完善成熟的适配方案来磨平这些多样性之间的差异和不足，提供一个相对稳定、可控的开发环境。

> 本文只介绍CSS样式布局的适配方案，至于HTML5和JavaScript的适配方案，其实现在已经有了一些成熟的解决方案，如Babel，各种polyfill等，并且搭配Webpack使用更香。

#### 二、Flexible方案
Flexible方案主要是借助JavaScript控制viewport的能力，使用rem模拟vw的特性从而达到适配目的的一套解决方案。

Flexible方案的实现涉及并使用到了很多PC端开发很少接触到的概念，其实无论是怎么样的适配方案都是建立在梳理和管理这些概念之上的，因此，这些概念对我们理解和探究移动端适配的深层原理尤为重要（具体概念讲述请见[《深入浅出移动端适配》](https://juejin.im/post/6844903951012200456#heading-24)）。

##### 2.1 Flexible的核心思想
###### 2.1.1 使用rem模拟vw特性适配多种屏幕尺寸
rem是相对于html元素的font-size来做计算的计算属性值。

通过设置documentElement的fontSize属性值就可以统一整个页面的布局标准。

```
// set 1rem = viewWidth / 10
function setRemUnit () {
    var rem = docEl.clientWidth / 10
    // docEl为document.documentElement，即html元素
    docEl.style.fontSize = rem + 'px'
}
setRemUnit();
```

如上代码所示，Flexible将整个页面的宽度切成了10份，然后将计算出来的页面宽度的1/10设置为html节点的fontSize，也就意味着，之后我们在当前页面的html节点的子节点上应用rem为单位时都是按照页面比例来计算的。

##### 2.1.2 控制viewport的width和scale值适配高倍屏显示
设置viewport的width为device-width，改变浏览器viewport（布局视口和视觉视口）的默认宽度为理想视口宽度，从而使得用户可以在理想视口内看到完整的布局视口的内容。

等比设置viewport的initial-scale、maximum-scale、minimum-scale的值，从而实现1物理像素=1css像素，以适配高倍屏的显示效果（就是在这个地方规避了大家熟知的“1px问题”）

```
var metaEL= doc.querySelector('meta[name="viewport"]');
var dpr = window.devicePixelRatio;
var scale = 1 / dpr
metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'); 
```

##### 2.2 Flexible配合的周边工具
###### 2.2.1 PostCSS-px2rem
Flexible使用了rem作为统一页面布局标准的布局单位，且把页面宽度等分为了10份，那么我们在书写css代码时就需要去计算当前的px单位在当前设计稿上对应的rem值应该是多少。

以iPhone6为例：布局视口为375px，则1rem = 37.5px，这时设计稿上给定一个元素的宽为75px（设备独立像素），我们只需要将它设置为75 / 37.5 = 2rem即可。

当然，以上的工作方式显然是低效且不可接受的，我们可以借助PostCSS的pxtorem插件来帮我们完成这个计算过程:

```
plugins: {
    ...,
    'postcss-pxtorem': {
        // 750设计标准
        rootValue: 75,
        // 转换成的rem后，保留小数点后几位
        unitPrecision: 5,
        /**
        * 将会被转换的css属性列表，
        * 设置为*表示全部，['*','*position*','!letter-spacing','!font*']
        * *position* 表示所有包含 position 的属性
        * !letter-spacing 表示非 letter-spacing 属性
        * !font* 表示非font-size font-weight ... 等的属性
        * */
        propList: ['*', '!letter-spacing'],
        // 不会被转换的class选择器名，支持正则
        selectorBlackList: ['.rem-'],
        replace: true,
        // 允许在媒体查询中转换`px`
        mediaQuery: false,
        // 小于1px的将不会被转换
        minPixelValue: 1
    }
}
```

以上代码是基于Vue Cli3.x的Webpack项目，只需要配置在当前项目根目录的postcss.config.js中即可，除了Webpack配置之外，还可以使用其他的配置方式，详细介绍可以[点击这里](https://www.npmjs.com/package/postcss-pxtorem)进行了解。

postcss-pxtorem可以帮我们把我们需要转的px值计算转换为对应的rem值，如：

```
.name-item {
    font-size: 40px;
  line-height: 56px;
  margin-left: 144px;
  border-top: 1PX solid #eeeeee;
  color: #333333;
}
```

转换后

```
.name-item {
    font-size: .53333rem;
  line-height: .74667rem;
  font-weight: 700;
  margin-left: 1.92rem;
  border-top: 1px solid #eee;
  color: #333;
}
```

##### 2.3 Flexible的缺陷
###### 2.3.1 对iframe的使用不兼容。
即iframe中展示的内容依然使用的是css像素，在高倍屏下会出问题，如我们在使用iframe引用一个腾讯视频的视频播放资源时，该视频播放器的播放按钮在不同dpr的设备上展示差异很大：

![webMobile001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile001.jpg)

![webMobile002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile002.jpg)

从图中我们可以看出播放按钮在dpr = 2的设备上展示的大小要比在dpr = 3的设备上要大很多，如果你去仔细测量的话，会发现刚好是其1.5倍，如果你读过了[深入浅出移动端适配](https://juejin.im/post/6844903951012200456#heading-24)，那么很容易就理解为什么了，我们这里不做深究。

###### 2.3.2 对高倍屏的安卓手机没做处理
如果你去研究过lib-flexible的源码，那你一定知道lib-flexible对安卓手机的特殊处理，即：一律按dpr = 1处理。

```
if (isIPhone) {
  // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
  if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
    dpr = 3;
  } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
    dpr = 2;
  } else {
    dpr = 1;
  }
} else {
  // 其他设备下，仍旧使用1倍的方案
  dpr = 1;
}
```

那么，Flexible为什么不对安卓的高倍屏做适配处理呢？我想Flexible这样做应该是有苦衷的：长久以来，安卓手机的dpr五花八门，从1到4甚至到5，更甚者1.75、2.6、3.5这样的dpr值也层出不穷。所以Flexible在权衡之下直接简单粗暴的把安卓手一律按dpr = 1处理，也算是快刀斩乱麻了。
当然，我们也可以手动去修改lib-flexible的源码去弥补上这个缺憾，但我们也只可能针对那些dpr为整数的安卓设备做适配，对于那些比较奇葩的dpr直接忽略即可。然而，天知道安卓手机的dpr最大整数值是多少呢？天知道（三星S8的dpr就是4）

###### 2.3.3 不兼容响应式布局
响应式布局，其实质性做法就是结合css3的媒体查询@media对一些不同尺寸阈值做特定的布局设计，如对768px以下屏幕的使用紧凑型布局，对769px到992px的屏幕做图文混排型布局，对大于992px的屏幕做富元素、多元素布局等。

```
.main-content {
    max-width: 70em
}
@media screen and (min-width: 0) {
    .main-content {
        margin:0 6.4935064935%
    }
}
@media screen and (min-width: 45em) {
    .main-content {
        margin:0 5.1282051282%
    }
}
@media screen and (min-width: 70em) {
    .main-content {
        margin:0 5.1282051282%
    }
}
```

其中，@media语法中涉及到的尺寸查询语句，查询的尺寸依据是当前设备的物理像素，和Flexible的布局理论（即针对不同dpr设备等比缩放视口的scale值，从而同时改变布局视口和视觉视口大小）相悖，因此响应式布局在“等比缩放视口大小”的情境下是无法正常工作的。

###### 2.3.4 无法正确响应系统字体大小
根据Flexible的实现理论，我们都知道它是通过设置的html元素的font-size大小，从而确保页面内所有元素在使用rem为单位进行样式设置时都是相对于html元素的font-size值。

然而，在微信环境（或其他可设置字体大小的Web浏览器中，如Safari）下，设置微信的字体大小（调大）后再打开使用Flexible技术适配的Web页面，你会发现页面布局错乱了，所有使用rem设置大小的元素都变大了，此时html的font-size还是原来的大小，但是元素就是变大了，这是为什么呢？

![webMobile003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile003.jpg)

事实上，虽然Flexible帮我们使用<meta/>标签设置了width=device-width和user-scalable=no以及对应的scale缩放值以保证我们的元素大小在高倍屏下（dpr >= 2 ）正常展示，但是在调整Web浏览器的字体大小后，我们的"视口"也响应的等比缩小了，即视觉视口(window.innerWidth)，豁然开朗，并不是我们的元素变大了，而是我们的视觉视口变小了！

![webMobile004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile004.jpg)


基于我们已经掌握的视口相关知识，其根本原因是我们在调整Web浏览器的字体大小时，也响应的调整了视口的scale值，因此才导致了视觉视口的变小。

知道了Bug产生的原因，那我们有办法解决吗？答案是在Flexible方案下毫无办法，而在接下来要讲到的Viewport方案中则可以完美解决。Flexible承载的历史使命已经完成了，让我们放下Flexible，拥抱新的变化。

#### 三、Viewport方案
Viewport方案中主要使用的是css3中CSS Values and Units Module Level 3（候选推荐）新增的<length>单位vw、vh、vmax和vmin。定义中，它们都是相对单位，其相对的参考系都是"视觉视口":

unit | relative to（参考单位）
-- | --
'vw' | 1% of viewport's width（视觉视口宽度的1%）
'vh' | 1% of viewport's height（视觉视口高度的1%）
'vmax' | 1% of viewport's larger dimension（vw和vh中的较大值）
'vmin' | 1% of viewport's smaller dimension（vw和vh中的较大值）

![webMobile005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile005.jpg)

> vmin和vmax是根据Viewport中长度偏大的那个维度值计算出来的，如果window.innerHeight > window.innerWidth则vmin取值为window.innerWidth / 100，vmax取值为window.innerHeight / 100。

可能会有同学担心Viewport方案的浏览器兼容性问题，我们可以使用[caniuse](https://caniuse.com/)来查看下viewport单位在各主流浏览器版本上的兼容情况：

![webMobile006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile006.jpg)

![webMobile007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile007.jpg)

从图中可以看出，目前大部分的主流浏览器基本上已经支持了viewport单位，其中有一些淡绿色的浏览器版本表示为部分支持，其主要内容为无法兼容vmax和vmin的用法；而“Know issues”一栏中所列的一些已知问题大多也是针对用户缩放viewport大小或者IOS 7 Safari所特有的一些buggy behavior，而对于这些我们是可以控制的。

事实上，我们的适配方案，与其称为“viewport适配方案”不如叫“vw适配方案”，因为在我们的适配方案中，我们只需要使用到vw这一个相对单位即可，并且其兼容性是最好的，其他单位基本上使用不到。

对于那些只存在IOS 7 Safari及老版本才会出现的一些问题，大可不必多虑，毕竟现在已经9102年了，而IOS 7是“2013年9月18日正式推出,2013年9月19日凌晨1点开放免费下载更新”的，年代久远，加之iPhone的不更新系统就给你来个限速变卡的骚操作，这种远古系统再出现的概率几乎为0。

##### 3.1 Viewport方案的核心思想
###### 3.1.1 使用vw作为元素的布局单位
vw作为布局单位，从底层根本上解决了不同尺寸屏幕的适配问题，因为每个屏幕的百分比是固定的、可预测、可控制的。

从我们的实际开发工作出发，我们现在都是统一使用的iPhone6的视觉设计稿（即宽度为750px），那么100vw=750px，即1vw = 7.5px。那么如果设计稿上某一元素的宽度为value像素，那么其对应的vw值则可以通过vw = value / 7.5来计算得到。

需要注意的是，虽然vw无痛解决了我们之前遇到的很多问题，但是它并不是万能的，通过查找资料、博客和测试实践，以下场景我们可以放心使用vw来适配我们的页面：

- 容器适配，可以使用vw
- 文本适配，可以使用vw
- 大于1px的边框、圆角、阴影都可以使用vw
- 内边距和外边距都可以使用vw

###### 3.1.2 降级处理不兼容
在我们已知的大部分主流浏览器中，都是天然支持vw单位的，但不排除有某些浏览器的某些版本存在不兼容的情况，如果业务需要，我们可以通过如下两种方式做降级处理：

- CSS Houdini：通过CSS Houdini针对vw做处理，调用CSS Typed DOM Level1提供的CSSUnitValue API；
- CSS Polifill：通过相应的Polyfill做响应的处理，目前针对vw单位的Polyfill主要有：vminpoly、Viewport Units Buggyfill、vunits.js和Modernizr。大漠老师比较推荐的是Viewport Units Buggyfill

##### 3.2 Viewport方案配合的周边工具
###### 3.2.1 postcss-px-to-viewport
postcss-px-to-viewport插件的作用和postcss-pxtorem的作用类似，主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位（推荐转换为vw，其他单位多多少少都有一些兼容性问题），也是viewport适配方案的核心插件之一。

结合webpack项目进行配置时，只需要将其配置在项目根目录下的postcss.config.js中即可，其基本配置项如下：

```
plugins: {
'postcss-px-to-viewport': {
    unitToConvert: 'px',   // 需要转换的单位
    viewportWidth: 750,    // 视口宽度，等同于设计稿宽度
    unitPrecision: 5,      // 精确到小数点后几位
    /**
    * 将会被转换的css属性列表，
    * 设置为 * 表示全部，如：['*']
    * 在属性的前面或后面设置*，如：['*position*']，*position* 表示所有包含 position 的属性，如 background-position-y
    * 设置为 !xx 表示不匹配xx的那些属性，如：['!letter-spacing'] 表示除了letter-spacing 属性之外的其他属性
    * 还可以同时使用 ! 和 * ，如['!font*'] 表示除了font-size、 font-weight ...这些之外属性之外的其他属性名头部是‘font’的属性
    * */
    propList: ['*'],
    viewportUnit: 'vw',    // 需要转换成为的单位
    fontViewportUnit: 'vw',// 需要转换称为的字体单位
    /**
    * 需要忽略的选择器，即这些选择器对应的属性值不做单位转换
    * 设置为字符串，转换器在做转换时会忽略那些选择器中包含该字符串的选择器，如：['body']会匹配到 .body-class，也就意味着.body-class对应的样式设置不会被转换
    * 设置为正则表达式，在做转换前会先校验选择器是否匹配该正则，如果匹配，则不进行转换，如[/^body$/]会匹配到 body 但是不会匹配到 .body
    */
    selectorBlackList: [],
    minPixelValue: 1,      // 最小的像素单位值
    mediaQuery: false,     // 是否转换媒体查询中设置的属性值
    replace: true,                 // 替换包含vw的规则，而不是添加回退
    /**
    * 忽略一些文件，如'node_modules'
    * 设置为正则表达式，将会忽略匹配该正则的所有文件
    * 如果设置为数组，那么该数组内的元素都必须是正则表达式
    */
    exclude: [],
    landscape: false,      // 是否自动加入 @media (orientation: landscape)，其中的属性值是通过横屏宽度来转换的
    landscapeUnit: 'vw',   // 横屏单位
    landscapeWidth: 1334   // 横屏宽度
}
```

目前出视觉设计稿，我们都是使用750px宽度的，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。在实际撸码过程，不需要进行任何的计算，直接在代码中写px即可，postcss-px-to-viewport会自动帮我们把px计算转换为对应的vw值，比如：

```
.name-item {
    font-size: 40px;
  line-height: 56px;
  margin-left: 144px;
  border-top: 1PX solid #eeeeee;
  color: #333333;
}
```

转换后

```
.name-item {
    font-size: 5.33333vw;
  line-height: 7.46667vw;
  margin-left: 19.2vw;
  border-top: 1px solid #eee;
  color: #333;
}  
```

当然，postcss-px-to-viewport的功能不止于此，它还可以在selectorBlackList选项中设置一些关键词或正则，来避免对这些指定的选择器做转换，如selectorBlackList：['.ignore', '.hairlines']：

```
<div class="box ignore"></div>
写CSS的时候： 
.ignore {
    margin: 10px;
    background-color: red;
}
.box {
    width: 180px;
    height: 300px;
}
.hairlines {
    border-bottom: 0.5px solid red;
}
```

转换后

```
.box {
    width: 24vw;
    height: 40vw;
}
.ignore {
    margin: 10px; /*.box元素中带有.ignore类名，在这个类名写的`px`不会被转换*/
    background-color: red;
}
.hairlines {
    border-bottom: 0.5px solid red;
}
```

###### 3.2.2 Viewport Units Buggyfill
这个js库是为了兼容那些不兼容vw、vh、vmax、vmin这些viewport单位的浏览器所使用的，在该方案开始我们已经明确过，现如今大部分机型的大部分浏览器都已经兼容了viewport单位，大漠老师在17年左右对Top30的热门机型进行了测试，其中只有如下几款机型没有完全支持viewport单位：

![webMobile008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile008.jpg)

但是如果你的业务不允许，需要你的项目跑在很多更古老的机型或者浏览器版本上，那么就不得不考虑到一些hack手段，那么这个js库就是你的首选方案了。

**使用方法**

1. 引入JavaScript文件
viewport-units-buggyfill主要有两个JavaScript文件：viewport-units-buggyfill.js和viewport-units-buggyfill.hacks.js。你只需要在你的HTML文件中引入这两个文件。比如在Vue项目中的index.html引入它们：

```
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

2. 在HTML文件中调用viewport-units-buggyfill
在html文件中引入polyfill的位置之后，需要手动调用下 viewport-units-buggyfill:

```
<script>
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
}
</script>  
```

3. 结合使用postcss-viewport-units
具体的使用。在你的CSS中，只要使用到了viewport的单位地方，需要在样式中添加content：

```
.my-viewport-units-using-thingie {
  width: 50vmin;
  height: 50vmax;
  top: calc(50vh - 100px);
  left: calc(50vw - 100px);
  /* hack to engage viewport-units-buggyfill */
  content: 'viewport-units-buggyfill; width: 50vmin; height: 50vmax; top: calc(50vh - 100px); left: calc(50vw - 100px);';
}  
```

这可能会令你感到恶心，而且我们不可能每次写vw都去人肉的计算。特别是在我们的这个场景中，我们使用了postcss-px-to-viewport这个插件来转换vw，更无法让我们人肉的去添加content内容。

这个时候就需要前面提到的postcss-viewport-units插件。这个插件将让你无需关注content的内容，插件会自动帮你处理。比如插件处理后的代码：

```
.test {
    padding: 3.2vw;
    margin: 3.2vw auto;
    background-color: #eee;
    text-align: center;
    font-size: 3.73333vw;
    color: #333;
    content: "viewport-units-buggyfill; padding: 3.2vw; margin: 3.2vw auto; font-size: 3.73333vw";
}  
```

配置这个插件也很简单，只需要和配置postcss-px-to-viewport一样，配置在项目根目录的postcss.config.js中即可：

```
plugins: {
  'postcss-viewport-units': {}
} 
```

**副作用**

在我们使用了Viewport Units Buggyfill后，正如你看到的，它会在占用content属性，因此会或多或少的造成一些副作用。如img元素和伪元素的使用::before或::after。

对于img，在部分浏览器中，content的写入会造成图片无法正常展示，这时候需要全局添加样式覆盖：

```
img {
    content: normal !important;
} 
```

对于::before等伪元素，就算是在里面使用了vw单位，Viewport Units Buggyfill对其并不会起作用，如：

```
// 编译前
.after {
    content: 'after content';
    display: block;
    width: 100px;
    height: 20px;
    background: green;
}
// 编译后
.after[data-v-469af010] {
    content: "after content";
    display: block;
    width: 13.333vw;
    height: 2.667vw;
    background: green;
} 
```

##### 3.3 Viewport方案的缺陷
采用vw来做适配在处理一些细节之处还是存在一定的缺陷的。  比如当容器使用vw，margin采用px时，很容易造成整体宽度超过100vw，从而影响布局效果。当然我们也是可以避免的，例如使用padding代替margin，结合calc()`函数使用等等...

另外一点，px转换成vw不一定能完全整除，因此有一定的像素差。

###### 3.3.1 高倍屏适配
通读整套适配方案，你会发现viewport适配方案单单是使用了vw去适配不同尺寸屏幕的大小问题，而并没有解决高倍屏展示的问题，如老生常谈的1px问题、图片展示模糊等问题。

**1px问题**

其实网上关于1px这些关于解决高倍屏展示问题的方案有很多，如大漠老师的再谈Retina下1px的解决方案，周陆军的Retina真实还原1px边框的解决方案，方法总比问题多。

结合上面一些方案，我这里也整理了几套被各位大佬所推荐的解决方案并测试了下效果：

- 结合postcss-write-svg和border-image或background-image解决1px问题

border-image方案虽然很好用，但是在一些低端机型和ios设备上有兼容问题。主要表现为在一些低端安卓机型，如魅蓝note1中展示4个边框时，下侧和右侧边框缺失；在iPhone5s、iPhone6s、iPhone6s Plus上直接不显示（不知道是不是我姿势不对）。

![webMobile009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile009.jpg)

border-image还有一个问题就是无法做圆角。

background-image方案，在以上机型上都能比较好的展现，但是在背景图方案中需要提供2像素的图片，如：

![webMobile010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile010.jpg)

```
fineLine(color = #e8e8e8, position = bottom)
  if position == top || position == bottom
    background-repeat: repeat-x
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAAXNSR…hZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY5g5c+Z/BhAAABRcAsvqBShzAAAAAElFTkSuQmCC)
    if position == top
      background-position: 0 0
    else
      background-position: 0 100%
  else
    background-repeat: repeat-y
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAAXNSR…hZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY5g5c+Z/BhAAABRcAsvqBShzAAAAAElFTkSuQmCC)
    if position == left
      background-position: 0 0
    else
      background-position: 100% 0
```

当然，我们也可以借助postcss-write-svg的能力，自己编写一个可以绘出上图中两种类型的base64图片出来：

```
// 画出来的图片如图一(上下)
@svg squareLR {
    width: 1px;
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
// 画出来的图片如图二(左右)
@svg squareTB {
    width: 2px;
    height: 1px;
    @rect {
        fill: var(--color, black);
        width: 50%;
        height: 100%;
    }
}
// 顺便还可以优化下我们的mixin写法  
fineLine(color = #e8e8e8, position = bottom)
  if position == top || position == bottom
    background-repeat: repeat-x
        background-image: svg(squareLR param(--color color))
    if position == top
      background-position: 0 0
    else
      background-position: 0 100%
  else
    background-repeat: repeat-y
        background-image: svg(squareTB param(--color color))
    if position == left
      background-position: 0 0
    else
      background-position: 100% 0
```

除此之外，我们还有渐变背景图片方案。在渐变背景图片方案中，我们只需要维护一份mixin代码就可以实现我们想要的效果：

```
bgLine($color = #efefef, $direction = all)
  background-repeat: no-repeat
  if $direction == all
    border: none
    padding: 1px
    background-image:
      -webkit-linear-gradient(top, transparent 50%, $color 50%),
      -webkit-linear-gradient(right, transparent 50%, $color 50%),
      -webkit-linear-gradient(bottom, transparent 50%, $color 50%),
      -webkit-linear-gradient(left, transparent 50%, $color 50%)
    background-image:
      linear-gradient(to top, transparent 50%, $color 50%),
      linear-gradient(to right, transparent 50%, $color 50%),
      linear-gradient(to bottom, transparent 50%, $color 50%),
      linear-gradient(to left,transparent 50%, $color 50%)
    background-size:
      100% 1px,
      1px 100%,
      100% 1px,
      1px 100%
    background-position:
      top center,
      right center,
      bottom center,
      left center
  else
    background-position: $direction center
    background-image: -webkit-linear-gradient($direction, transparent 50%, $color 50%);
    background-image: linear-gradient(to $direction, transparent 50%, $color 50%);
    if $direction == left || $direction == right
      background-size: 1px 100%
    if $direction == top || $direction == bottom
      background-size: 100% 1px
.test
    width 400px
  padding 24px
  margin 24px
  bgLine(red, all)  
```

![webMobile011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile011.jpg)

但是渐变色背景图方案依然有她的不足，如无法设置边框圆角、需要维护比较繁琐的渐变色控制代码（虽然一万年可能就动一次）等问题，不过依然是值得一试的适配方案。

**0.5px方案**

0.5px方案在IOS8之后有很好的支持，我所能搜罗到的iPhone设备都很清晰的显示了我们想要到的细线（但是对于iPhone 6s Plus、iPhone X、iPhone Xs等3倍屏的IOS设备其实并不是真实的1物理像素，而是1.5物理像素，不过影响不大）。

但是在安卓设备上缺喜忧参半，经过我的测试，在Android5.1之后的版本，各设备基本上已经兼容了0.5px的正常显示，但是不排除有一些低于Android5.1版本的设备不能正常展示，那么就以为这要用js代码去做一定的hack，并要涉及到Flexible适配方案去做兼容，这简直就是技术的倒退，不能忍的。

所以，在各种场景的综合权衡下，并不推荐在viewport适配方案的项目中使用该策略去做1px问题的兼容。

**伪元素 + transform scale方案**

伪元素 + transform scale的方法相比以上几种方案是比较简洁、可控好理解的方式，并且这种方式也支持设置圆角。在腾讯、京东的大部分移动端产品中大都采用的这种适配方案（阿里的移动端产品，如手机版淘宝、手机版天猫等并未对1px做适配处理，amazing！it's understandable~ 比较任性吧）。

其方案的思路也很好理解，大家一看便知：

```
border-1px($color = #ccc, $radius = 2PX, $direction = all)
  position: relative
  &::after
    content: ""
    pointer-events: none
    display: block
    position: absolute
    border-radius: $radius
    box-sizing border-box
    width 100%
    height 100%
    left: 0
    top: 0
    transform-origin: 0 0
    if $direction == all
      border: 1PX solid $color
    else
      border-{$direction}: 1PX solid $color
    @media only screen and (-webkit-min-device-pixel-ratio:2)
      width: 200%
      height: 200%
      border-radius: $radius * 2
      transform: scale(.5)
    @media only screen and (-webkit-min-device-pixel-ratio:3)
      width: 300%
      height: 300%
      border-radius: $radius * 3
      transform: scale(.333)
```

**图片模糊问题**

在高倍屏下产生图片模糊的问题以及其对应的解决方案，在深入浅出移动端适配已经向大家解释和介绍过了，此处略过。


#### 四、rem适配

##### 4.1 原理

rem是css3新增的一个相对单位，当使用rem为元素设定字体大小时，相对的是HTML根元素的字体大小。例如你给html设置font-size为16px，html中的div元素设置font-size为1rem，则这1rem也是16px。

rem适配的原理是布局等比例缩放，我们可以动态控制html中font-size的大小来改变rem的大小。

##### 4.2 实现

###### 4.2.1 设置视口viewport

在移动端配置视口的方法是设置一个meta标签：

```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

其中，width为定义视口的宽度，height为定义视口的高度，initial-scale为定义初始缩放值，maximum-scale和minimum-scale分别为定义放大最大和缩小最小比例，user-scalable指是否允许用户手动缩放页面。上面的meta标签例子是将scale设置为固定1倍视口的大小。

如果我们不去设置，则浏览器的默认设置为：viewport=980，initial-scale为空

让我们看看设置与不设置viewport的区别：

**不设置**

![webMobile012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile012.jpg)

**设置**

![webMobile013](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile013.jpg)

同样设置宽高为300px的正方形，可以看出，当设置viewport时，会有一个缩放效果。

我们也可以根据设备像素比例devicePixelRatio的值来缩放viewport，代码如下：


<br/>
<br/>
<br/>

转载自：[https://juejin.im/post/6894044091836563469](https://juejin.im/post/6894044091836563469)

转载自：[https://juejin.cn/post/6844904176892248078](https://juejin.cn/post/6844904176892248078)
