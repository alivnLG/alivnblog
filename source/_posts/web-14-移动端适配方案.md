---
title: web-14-移动端适配方案
date: 2021-01-05 11:53:06
top: true
tags:
- Web移动端
categories:
- 前端综合
---
### 一、前言
在过去的几年时间里，移动端web野蛮生长，智能机的Android阵营和IOS阵营分庭抗礼，随之产生了多个系统版本（系统版本多样）；五花八门的屏幕尺寸、屏幕展示技术（如大名鼎鼎的Retina技术屏）层出不穷（屏幕尺寸、技术多样），还是CSS的W3C标准在各式各样的移动端浏览器上落实得也是七零八落（浏览器兼容多样）。
<!--more-->
细看下来移动端Web开发工作面临着很多的多样性，可想而知在这样的不确定性下去开发一个完善的项目会有多大的阻力，因此，移动端Web亟需一个完善成熟的适配方案来磨平这些多样性之间的差异和不足，提供一个相对稳定、可控的开发环境。

> 本文只介绍CSS样式布局的适配方案，至于HTML5和JavaScript的适配方案，其实现在已经有了一些成熟的解决方案，如Babel，各种polyfill等，并且搭配Webpack使用更香。

我们往往会遇到非常多的概念：像素、分辨率、PPI、DPI、DP、DIP、DPR、视口等等。

### 二、英寸

一般用英寸描述屏幕的物理大小，如电脑显示器的17、22，手机显示器的4.8、5.7等使用的单位都是英寸。

需要注意，上面的尺寸都是屏幕对角线的长度：

![webMobile016](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile016.jpg)

英寸(inch,缩写为in)在荷兰语中的本意是大拇指，一英寸就是指甲底部普通人拇指的宽度。

英寸和厘米的换算：1英寸 = 2.54 厘米

### 三、分辨率

#### 3.1 像素

像素即一个小方块，它具有特定的位置和颜色。

图片、电子屏幕（手机、电脑）就是由无数个具有特定颜色和特定位置的小方块拼接而成。

像素可以作为图片或电子屏幕的最小组成单位。

下面我们使用sketch打开一张图片：

![webMobile017](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile017.jpg)

将这些图片放大即可看到这些像素点：

![webMobile018](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile018.jpg)

通常我们所说的分辨率有两种，屏幕分辨率和图像分辨率。

#### 3.2 屏幕分辨率

屏幕分辨率指一个屏幕具体由多少个像素点组成。

下面是apple的官网上对手机分辨率的描述：

![webMobile019](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile019.jpg)

iPhone XS Max 和 iPhone SE的分辨率分别为2688 x 1242和1136 x 640。这表示手机分别在垂直和水平上所具有的像素点数。

当然分辨率高不代表屏幕就清晰，屏幕的清晰程度还与尺寸有关。

#### 3.3 图像分辨率

我们通常说的图片分辨率其实是指图片含有的像素数，比如一张图片的分辨率为800 x 400。这表示图片分别在垂直和水平上所具有的像素点数为800和400。

同一尺寸的图片，分辨率越高，图片越清晰。

![webMobile020](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile020.jpg)

#### 3.4 PPI

PPI(Pixel Per Inch)：每英寸包括的像素数。

PPI可以用于描述屏幕的清晰度以及一张图片的质量。

使用PPI描述图片时，PPI越高，图片质量越高，使用PPI描述屏幕时，PPI越高，屏幕越清晰。

在上面描述手机分辨率的图片中，我们可以看到：iPhone XS Max 和 iPhone SE的PPI分别为458和326，这足以证明前者的屏幕更清晰。

由于手机尺寸为手机对角线的长度，我们通常使用如下的方法计算PPI:
? \frac{\sqrt{水平像素点数^2+垂直像素点数^2}}{尺寸}?
iPhone 6的PPI为 

![webMobile021](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile021.jpg)

那它每英寸约含有326个物理像素点。

#### 3.5 DPI

DPI(Dot Per Inch)：即每英寸包括的点数。

这里的点是一个抽象的单位，它可以是屏幕像素点、图片像素点也可以是打印机的墨点。

平时你可能会看到使用DPI来描述图片和屏幕，这时的DPI应该和PPI是等价的，DPI最常用的是用于描述打印机，表示打印机每英寸可以打印的点数。

一张图片在屏幕上显示时，它的像素点数是规则排列的，每个像素点都有特定的位置和颜色。

当使用打印机进行打印时，打印机可能不会规则的将这些点打印出来，而是使用一个个打印点来呈现这张图像，这些打印点之间会有一定的空隙，这就是DPI所描述的：打印点的密度。

![webMobile022](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile022.jpg)

在上面的图像中我们可以清晰的看到，打印机是如何使用墨点来打印一张图像。

所以，打印机的DPI越高，打印图像的精细程度就越高，同时这也会消耗更多的墨点和时间。

### 四、设备独立像素

实际上，上面我们描述的像素都是物理像素，即设备上真实的物理单元。

下面我们来看看设备独立像素究竟是如何产生的：

智能手机发展非常之快，在几年之前，我们还用着分辨率非常低的手机，比如下面左侧的白色手机，它的分辨率是320x480，我们可以在上面浏览正常的文字、图片等等。

但是，随着科技的发展，低分辨率的手机已经不能满足我们的需求了。很快，更高分辨率的屏幕诞生了，比如下面的黑色手机，它的分辨率是640x940，正好是白色手机的两倍。

理论上来讲，在白色手机上相同大小的图片和文字，在黑色手机上会被缩放一倍，因为它的分辨率提高了一倍。这样，岂不是后面出现更高分辨率的手机，页面元素会变得越来越小吗？

![webMobile023](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile023.jpg)

然而，事实并不是这样的，我们现在使用的智能手机，不管分辨率多高，他们所展示的界面比例都是基本类似的。乔布斯在iPhone4的发布会上首次提出了Retina Display(视网膜屏幕)的概念，它正是解决了上面的问题，这也使它成为一款跨时代的手机。

![webMobile024](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile024.jpg)

在iPhone4使用的视网膜屏幕中，把2x2个像素当1个像素使用，这样让屏幕看起来更精致，但是元素的大小却不会改变。

![webMobile025](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile025.jpg)

如果黑色手机使用了视网膜屏幕的技术，那么显示结果应该是下面的情况，比如列表的宽度为300个像素，那么在一条水平线上，白色手机会用300个物理像素去渲染它，而黑色手机实际上会用600个物理像素去渲染它。

我们必须用一种单位来同时告诉不同分辨率的手机，它们在界面上显示元素的大小是多少，这个单位就是设备独立像素(Device Independent Pixels)简称DIP或DP。上面我们说，列表的宽度为300个像素，实际上我们可以说：列表的宽度为300个设备独立像素。

![webMobile026](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile026.jpg)

打开chrome的开发者工具，我们可以模拟各个手机型号的显示情况，每种型号上面会显示一个尺寸，比如iPhone X显示的尺寸是375x812，实际iPhone X的分辨率会比这高很多，这里显示的就是设备独立像素。

![webMobile027](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile027.jpg)

#### 4.1 设备像素比

设备像素比device pixel ratio简称dpr，即物理像素和设备独立像素的比值。

在web中，浏览器为我们提供了window.devicePixelRatio来帮助我们获取dpr。

在css中，可以使用媒体查询min-device-pixel-ratio，区分dpr：

```css
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }
```

在React Native中，我们也可以使用PixelRatio.get()来获取DPR。

当然，上面的规则也有例外，iPhone 6、7、8 Plus的实际物理像素是1080 x 1920，在开发者工具中我们可以看到：它的设备独立像素是414 x 736，设备像素比为3，设备独立像素和设备像素比的乘积并不等于1080 x 1920，而是等于1242 x 2208。

实际上，手机会自动把1242 x 2208个像素点塞进1080 * 1920个物理像素点来渲染，我们不用关心这个过程，而1242 x 2208被称为屏幕的设计像素。我们开发过程中也是以这个设计像素为准。

实际上，从苹果提出视网膜屏幕开始，才出现设备像素比这个概念，因为在这之前，移动设备都是直接使用物理像素来进行展示。

紧接着，Android同样使用了其他的技术方案来实现DPR大于1的屏幕，不过原理是类似的。由于Android屏幕尺寸非常多、分辨率高低跨度非常大，不像苹果只有它自己的几款固定设备、尺寸。所以，为了保证各种设备的显示效果，Android按照设备的像素密度将设备分成了几个区间：

![webMobile028](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile028.jpg)

当然，所有的Android设备不一定严格按照上面的分辨率，每个类型可能对应几种不同分辨率，所以，每个Android手机都能根据给定的区间范围，确定自己的DPR，从而拥有类似的显示。当然，仅仅是类似，由于各个设备的尺寸、分辨率上的差异，设备独立像素也不会完全相等，所以各种Android设备仍然不能做到在展示上完全相等。

#### 4.2 移动端开发

在iOS、Android和React Native开发中样式单位其实都使用的是设备独立像素。

iOS的尺寸单位为pt，Android的尺寸单位为dp，React Native中没有指定明确的单位，它们其实都是设备独立像素dp。

当然，最好的是，你可以和设计沟通好，所有的UI图都按照设备独立像素来出。

我们还可以在代码(React Native)中进行px和dp的转换：

```js
import {PixelRatio } from 'react-native';

const dpr = PixelRatio.get();

/**
 * px转换为dp
 */
export function pxConvertTodp(px) {
  return px / dpr;
}

/**
 * dp转换为px
 */
export function dpConvertTopx(dp) {
  return PixelRatio.getPixelSizeForLayoutSize(dp);
}
```

#### 4.3 WEB端开发

在写CSS时，我们用到最多的单位是px，即CSS像素，当页面缩放比例为100%时，一个CSS像素等于一个设备独立像素。

但是CSS像素是很容易被改变的，当用户对浏览器进行了放大，CSS像素会被放大，这时一个CSS像素会跨越更多的物理像素。

页面的缩放系数 = CSS像素 / 设备独立像素。

#### 4.4 关于屏幕

这里多说两句Retina屏幕，因为我在很多文章中看到对Retina屏幕的误解。

Retina屏幕只是苹果提出的一个营销术语：

>在普通的使用距离下，人的肉眼无法分辨单个的像素点。

为什么强调普通的使用距离下呢？我们来看一下它的计算公式：

? a=2arctan(h/2d) ?

a代表人眼视角，h 代表像素间距，d代表肉眼与屏幕的距离，符合以上条件的屏幕可以使肉眼看不见单个物理像素点。

它不能单纯的表达分辨率和PPI，只能一种表达视觉效果。

让多个物理像素渲染一个独立像素只是Retina屏幕为了达到效果而使用的一种技术。而不是所有DPR > 1的屏幕就是Retina屏幕。

比如：给你一块超大尺寸的屏幕，即使它的PPI很高，DPR也很高，在近距离你也能看清它的像素点，这就不算Retina屏幕。

![webMobile029](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile029.jpg)

我们经常见到用K和P这个单位来形容屏幕：

P代表的就是屏幕纵向的像素个数，1080P即纵向有1080个像素，分辨率为1920X1080的屏幕就属于1080P屏幕。

我们平时所说的高清屏其实就是屏幕的物理分辨率达到或超过1920X1080的屏幕。

K代表屏幕横向有几个1024个像素，一般来讲横向像素超过2048就属于2K屏，横向像素超过4096就属于4K屏。

### 五、视口

视口(viewport)代表当前可见的计算机图形区域。在Web浏览器术语中，通常与浏览器窗口相同，但不包括浏览器的UI， 菜单栏等——即指你正在浏览的文档的那一部分。

一般我们所说的视口共包括三种：布局视口、视觉视口和理想视口，它们在屏幕适配中起着非常重要的作用。

#### 5.1 布局视口

![webMobile030](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile030.jpg)

布局视口(layout viewport)：当我们以百分比来指定一个元素的大小时，它的计算值是由这个元素的包含块计算而来的。当这个元素是最顶级的元素时，它就是基于布局视口来计算的。

所以，布局视口是网页布局的基准窗口，在PC浏览器上，布局视口就等于当前浏览器的窗口大小（不包括borders 、margins、滚动条）。

在移动端，布局视口被赋予一个默认值，大部分为980px，这保证PC的网页可以在手机浏览器上呈现，但是非常小，用户可以手动对网页进行放大。

我们可以通过调用document.documentElement.clientWidth / clientHeight来获取布局视口大小。

#### 5.2 视觉视口

![webMobile031](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile031.jpg)

视觉视口(visual viewport)：用户通过屏幕真实看到的区域。

视觉视口默认等于当前浏览器的窗口大小（包括滚动条宽度）。

当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面布局是不变的，但是缩放会改变视觉视口的大小。

例如：用户将浏览器窗口放大了200%，这时浏览器窗口中的CSS像素会随着视觉视口的放大而放大，这时一个CSS像素会跨越更多的物理像素。
所以，布局视口会限制你的CSS布局而视觉视口决定用户具体能看到什么。

我们可以通过调用window.innerWidth / innerHeight来获取视觉视口大小。

#### 5.3 理想视口

![webMobile032](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile032.jpg)

布局视口在移动端展示的效果并不是一个理想的效果，所以理想视口(ideal viewport)就诞生了：网站页面在移动端展示的理想大小。

如上图，我们在描述设备独立像素时曾使用过这张图，在浏览器调试移动端时页面上给定的像素大小就是理想视口大小，它的单位正是设备独立像素。

上面在介绍CSS像素时曾经提到页面的缩放系数 = CSS像素 / 设备独立像素，实际上说页面的缩放系数 = 理想视口宽度 / 视觉视口宽度更为准确。

所以，当页面缩放比例为100%时，CSS像素 = 设备独立像素，理想视口 = 视觉视口。

我们可以通过调用screen.width / height来获取理想视口大小。

#### 5.4 Meta viewport

<meta> 元素表示那些不能由其它HTML元相关元素之一表示的任何元数据信息，它可以告诉浏览器如何解析页面。

我们可以借助<meta>元素的viewport来帮助我们设置视口、缩放等，从而让移动端得到更好的展示效果。

```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; 
minimum-scale=1; user-scalable=no;">
```

上面是viewport的一个配置，我们来看看它们的具体含义：

|  Value   | 可能值  | 描述 |
|  ----  | ----  | --- | 
| width	| 正整数或device-width | 以pixels（像素）为单位， 定义布局视口的宽度。 |
| height | 正整数或device-height | 以pixels（像素）为单位， 定义布局视口的高度。 |
| initial-scale	| 0.0 - 10.0 | 定义页面初始缩放比率。 |
| minimum-scale	| 0.0 - 10.0 | 定义缩放的最小值；必须小于或等于maximum-scale的值。 |
| maximum-scale	| 0.0 - 10.0 | 定义缩放的最大值；必须大于或等于minimum-scale的值。 |
| user-scalable	| 一个布尔值（yes或者no） | 如果设置为 no，用户将不能放大或缩小网页。默认值为 yes。 |

#### 5.5 移动端适配

为了在移动端让页面获得更好的显示效果，我们必须让布局视口、视觉视口都尽可能等于理想视口。

device-width就等于理想视口的宽度，所以设置width=device-width就相当于让布局视口等于理想视口。

由于initial-scale = 理想视口宽度 / 视觉视口宽度，所以我们设置initial-scale=1;就相当于让视觉视口等于理想视口。

这时，1个CSS像素就等于1个设备独立像素，而且我们也是基于理想视口来进行布局的，所以呈现出来的页面布局在各种设备上都能大致相似。

#### 5.6 缩放

上面提到width可以决定布局视口的宽度，实际上它并不是布局视口的唯一决定性因素，设置initial-scale也有肯能影响到布局视口，因为布局视口宽度取的是width和视觉视口宽度的最大值。

例如：若手机的理想视口宽度为400px，设置width=device-width，initial-scale=2，此时视觉视口宽度 = 理想视口宽度 / initial-scale即200px，布局视口取两者最大值即device-width 400px。

若设置width=device-width，initial-scale=0.5，此时视觉视口宽度 = 理想视口宽度 / initial-scale即800px，布局视口取两者最大值即800px。

#### 5.7 获取浏览器大小

浏览器为我们提供的获取窗口大小的API有很多，下面我们再来对比一下：

![webMobile033](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile033.jpg)

- window.innerHeight：获取浏览器视觉视口高度（包括垂直滚动条）。
- window.outerHeight：获取浏览器窗口外部的高度。表示整个浏览器窗口的高度，包括侧边栏、窗口镶边和调正窗口大小的边框。
- window.screen.Height：获取获屏幕取理想视口高度，这个数值是固定的，设备的分辨率/设备像素比
- window.screen.availHeight：浏览器窗口可用的高度。
- document.documentElement.clientHeight：获取浏览器布局视口高度，包括内边距，但不包括垂直滚动条、边框和外边距。
- document.documentElement.offsetHeight：包括内边距、滚动条、边框和外边距。
- document.documentElement.scrollHeight：在不使用滚动条的情况下适合视口中的所有内容所需的最小宽度。测量方式与 clientHeight相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条。

### 六、1px问题

为了适配各种屏幕，我们写代码时一般使用设备独立像素来对页面进行布局。

而在设备像素比大于1的屏幕上，我们写的1px实际上是被多个物理像素渲染，这就会出现1px在有些屏幕上看起来很粗的现象。

#### 6.1 border-image

基于media查询判断不同的设备像素比给定不同的border-image：

```css
.border_1px{
  border-bottom: 1px solid #000;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .border_1px{
        border-bottom: none;
        border-width: 0 0 1px 0;
        border-image: url(../img/1pxline.png) 0 0 2 0 stretch;
    }
}
```

#### 6.2 background-image

和border-image类似，准备一张符合条件的边框背景图，模拟在背景上。

```css
.border_1px{
  border-bottom: 1px solid #000;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .border_1px{
        background: url(../img/1pxline.png) repeat-x left bottom;
        background-size: 100% 1px;
    }
}
```

上面两种都需要单独准备图片，而且圆角不是很好处理，但是可以应对大部分场景。

#### 6.3 伪类 + transform

基于media查询判断不同的设备像素比对线条进行缩放：

```css
.border_1px:before{
  content: '';
  position: absolute;
  top: 0;
  height: 1px;
  width: 100%;
  background-color: #000;
  transform-origin: 50% 0%;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .border_1px:before{
        transform: scaleY(0.5);
    }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
    .border_1px:before{
        transform: scaleY(0.33);
    }
}
```

这种方式可以满足各种场景，如果需要满足圆角，只需要给伪类也加上border-radius即可。

#### 6.4 svg

上面我们border-image和background-image都可以模拟1px边框，但是使用的都是位图，还需要外部引入。

借助PostCSS的postcss-write-svg我们能直接使用border-image和background-image创建svg的1px边框：

```css
@svg border_1px { 
  height: 2px; 
  @rect { 
    fill: var(--color, black); 
    width: 100%; 
    height: 50%; 
    } 
  } 
.example { border: 1px solid transparent; border-image: svg(border_1px param(--color #00b1ff)) 2 2 stretch; }
```

编译后：

```css
.example { 
  border: 1px solid transparent; 
  border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch; 
}
```

上面的方案是大漠在他的文章中推荐使用的，基本可以满足所有场景，而且不需要外部引入，这是我个人比较喜欢的一种方案。

#### 6.5 设置viewport

通过设置缩放，让CSS像素等于真正的物理像素。

例如：当设备像素比为3时，我们将页面缩放1/3倍，这时1px等于一个真正的屏幕像素。

```js
const scale = 1 / window.devicePixelRatio;
const viewport = document.querySelector('meta[name="viewport"]');
if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    window.document.head.appendChild(viewport);
}
viewport.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' 
+ scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
```

实际上，上面这种方案是早先flexible采用的方案。

当然，这样做是要付出代价的，这意味着你页面上所有的布局都要按照物理像素来写。这显然是不现实的，这时，我们可以借助flexible或vw、vh来帮助我们进行适配。

### 七、Flexible适配方案
Flexible方案主要是借助JavaScript控制viewport的能力，使用rem模拟vw的特性从而达到适配目的的一套解决方案。

Flexible方案的实现涉及并使用到了很多PC端开发很少接触到的概念，其实无论是怎么样的适配方案都是建立在梳理和管理这些概念之上的，因此，这些概念对我们理解和探究移动端适配的深层原理尤为重要（具体概念讲述请见[《深入浅出移动端适配》](https://juejin.im/post/6844903951012200456#heading-24)）。

#### 7.1 Flexible的核心思想

##### 7.1.1 使用rem模拟vw特性适配多种屏幕尺寸

rem是相对于html元素的font-size来做计算的计算属性值。

通过设置documentElement的fontSize属性值就可以统一整个页面的布局标准。

```js
// set 1rem = viewWidth / 10
function setRemUnit () {
    var rem = docEl.clientWidth / 10
    // docEl为document.documentElement，即html元素
    docEl.style.fontSize = rem + 'px'
}
setRemUnit();
```

如上代码所示，Flexible将整个页面的宽度切成了10份，然后将计算出来的页面宽度的1/10设置为html节点的fontSize，也就意味着，之后我们在当前页面的html节点的子节点上应用rem为单位时都是按照页面比例来计算的。

##### 7.1.2 控制viewport的width和scale值适配高倍屏显示
设置viewport的width为device-width，改变浏览器viewport（布局视口和视觉视口）的默认宽度为理想视口宽度，从而使得用户可以在理想视口内看到完整的布局视口的内容。

等比设置viewport的initial-scale、maximum-scale、minimum-scale的值，从而实现1物理像素=1css像素，以适配高倍屏的显示效果（就是在这个地方规避了大家熟知的“1px问题”）

```js
var metaEL= doc.querySelector('meta[name="viewport"]');
var dpr = window.devicePixelRatio;
var scale = 1 / dpr
metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', 
maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'); 
```

#### 7.2 Flexible配合的周边工具

##### 7.2.1 PostCSS-px2rem

Flexible使用了rem作为统一页面布局标准的布局单位，且把页面宽度等分为了10份，那么我们在书写css代码时就需要去计算当前的px单位在当前设计稿上对应的rem值应该是多少。

以iPhone6为例：布局视口为375px，则1rem = 37.5px，这时设计稿上给定一个元素的宽为75px（设备独立像素），我们只需要将它设置为75 / 37.5 = 2rem即可。

当然，以上的工作方式显然是低效且不可接受的，我们可以借助PostCSS的pxtorem插件来帮我们完成这个计算过程:

```js
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

```css
.name-item {
    font-size: 40px;
  line-height: 56px;
  margin-left: 144px;
  border-top: 1PX solid #eeeeee;
  color: #333333;
}
```

转换后

```css
.name-item {
    font-size: .53333rem;
  line-height: .74667rem;
  font-weight: 700;
  margin-left: 1.92rem;
  border-top: 1px solid #eee;
  color: #333;
}
```

#### 7.3 Flexible的缺陷

##### 7.3.1 对iframe的使用不兼容。

即iframe中展示的内容依然使用的是css像素，在高倍屏下会出问题，如我们在使用iframe引用一个腾讯视频的视频播放资源时，该视频播放器的播放按钮在不同dpr的设备上展示差异很大：

![webMobile001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile001.jpg)

![webMobile002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile002.jpg)

从图中我们可以看出播放按钮在dpr = 2的设备上展示的大小要比在dpr = 3的设备上要大很多，如果你去仔细测量的话，会发现刚好是其1.5倍，如果你读过了[深入浅出移动端适配](https://juejin.im/post/6844903951012200456#heading-24)，那么很容易就理解为什么了，我们这里不做深究。

##### 7.3.2 对高倍屏的安卓手机没做处理

如果你去研究过lib-flexible的源码，那你一定知道lib-flexible对安卓手机的特殊处理，即：一律按dpr = 1处理。

```js
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

##### 7.3.3 不兼容响应式布局

响应式布局，其实质性做法就是结合css3的媒体查询@media对一些不同尺寸阈值做特定的布局设计，如对768px以下屏幕的使用紧凑型布局，对769px到992px的屏幕做图文混排型布局，对大于992px的屏幕做富元素、多元素布局等。

```css
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

##### 7.3.4 无法正确响应系统字体大小

根据Flexible的实现理论，我们都知道它是通过设置的html元素的font-size大小，从而确保页面内所有元素在使用rem为单位进行样式设置时都是相对于html元素的font-size值。

然而，在微信环境（或其他可设置字体大小的Web浏览器中，如Safari）下，设置微信的字体大小（调大）后再打开使用Flexible技术适配的Web页面，你会发现页面布局错乱了，所有使用rem设置大小的元素都变大了，此时html的font-size还是原来的大小，但是元素就是变大了，这是为什么呢？

![webMobile003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile003.jpg)

事实上，虽然Flexible帮我们使用<meta/>标签设置了width=device-width和user-scalable=no以及对应的scale缩放值以保证我们的元素大小在高倍屏下（dpr >= 2 ）正常展示，但是在调整Web浏览器的字体大小后，我们的"视口"也响应的等比缩小了，即视觉视口(window.innerWidth)，豁然开朗，并不是我们的元素变大了，而是我们的视觉视口变小了！

![webMobile004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile004.jpg)


基于我们已经掌握的视口相关知识，其根本原因是我们在调整Web浏览器的字体大小时，也响应的调整了视口的scale值，因此才导致了视觉视口的变小。

知道了Bug产生的原因，那我们有办法解决吗？答案是在Flexible方案下毫无办法，而在接下来要讲到的Viewport方案中则可以完美解决。Flexible承载的历史使命已经完成了，让我们放下Flexible，拥抱新的变化。

### 八、Viewport适配方案

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

#### 8.1 Viewport方案的核心思想

##### 8.1.1 使用vw作为元素的布局单位

vw作为布局单位，从底层根本上解决了不同尺寸屏幕的适配问题，因为每个屏幕的百分比是固定的、可预测、可控制的。

从我们的实际开发工作出发，我们现在都是统一使用的iPhone6的视觉设计稿（即宽度为750px），那么100vw=750px，即1vw = 7.5px。那么如果设计稿上某一元素的宽度为value像素，那么其对应的vw值则可以通过vw = value / 7.5来计算得到。

需要注意的是，虽然vw无痛解决了我们之前遇到的很多问题，但是它并不是万能的，通过查找资料、博客和测试实践，以下场景我们可以放心使用vw来适配我们的页面：

- 容器适配，可以使用vw
- 文本适配，可以使用vw
- 大于1px的边框、圆角、阴影都可以使用vw
- 内边距和外边距都可以使用vw

##### 8.1.2 降级处理不兼容

在我们已知的大部分主流浏览器中，都是天然支持vw单位的，但不排除有某些浏览器的某些版本存在不兼容的情况，如果业务需要，我们可以通过如下两种方式做降级处理：

- CSS Houdini：通过CSS Houdini针对vw做处理，调用CSS Typed DOM Level1提供的CSSUnitValue API；
- CSS Polifill：通过相应的Polyfill做响应的处理，目前针对vw单位的Polyfill主要有：vminpoly、Viewport Units Buggyfill、vunits.js和Modernizr。大漠老师比较推荐的是Viewport Units Buggyfill

#### 8.2 Viewport方案配合的周边工具

##### 8.2.1 postcss-px-to-viewport

postcss-px-to-viewport插件的作用和postcss-pxtorem的作用类似，主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位（推荐转换为vw，其他单位多多少少都有一些兼容性问题），也是viewport适配方案的核心插件之一。

结合webpack项目进行配置时，只需要将其配置在项目根目录下的postcss.config.js中即可，其基本配置项如下：

```js
plugins: {
'postcss-px-to-viewport': {
    unitToConvert: 'px',   // 需要转换的单位
    viewportWidth: 750,    // 视口宽度，等同于设计稿宽度
    unitPrecision: 5,      // 精确到小数点后几位
    /**
    * 将会被转换的css属性列表，
    * 设置为 * 表示全部，如：['*']
    * 在属性的前面或后面设置*，如：['*position*']，*position* 表示所有包含 position 的属性，
    * 如 background-position-y
    * 设置为 !xx 表示不匹配xx的那些属性，如：['!letter-spacing'] 表示除了letter-spacing 
    * 属性之外的其他属性
    * 还可以同时使用 ! 和 * ，如['!font*'] 表示除了font-size、 font-weight ...这些之外属性
    * 之外的其他属性名头部是‘font’的属性
    * */
    propList: ['*'],
    viewportUnit: 'vw',    // 需要转换成为的单位
    fontViewportUnit: 'vw',// 需要转换称为的字体单位
    /**
    * 需要忽略的选择器，即这些选择器对应的属性值不做单位转换
    * 设置为字符串，转换器在做转换时会忽略那些选择器中包含该字符串的选择器，如：['body']会匹配到 
    * .body-class，也就意味着.body-class对应的样式设置不会被转换
    * 设置为正则表达式，在做转换前会先校验选择器是否匹配该正则，如果匹配，则不进行转换，如[/^body$/]
    * 会匹配到 body 但是不会匹配到 .body
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
    landscape: false,      
    /**
    * 是否自动加入 @media (orientation: landscape)，其中的属性值是
    * 通过横屏宽度来转换的
    */
    landscapeUnit: 'vw',   // 横屏单位
    landscapeWidth: 1334   // 横屏宽度
}
```

目前出视觉设计稿，我们都是使用750px宽度的，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。在实际撸码过程，不需要进行任何的计算，直接在代码中写px即可，postcss-px-to-viewport会自动帮我们把px计算转换为对应的vw值，比如：

```css
.name-item {
    font-size: 40px;
  line-height: 56px;
  margin-left: 144px;
  border-top: 1PX solid #eeeeee;
  color: #333333;
}
```

转换后

```css
.name-item {
    font-size: 5.33333vw;
  line-height: 7.46667vw;
  margin-left: 19.2vw;
  border-top: 1px solid #eee;
  color: #333;
}  
```

当然，postcss-px-to-viewport的功能不止于此，它还可以在selectorBlackList选项中设置一些关键词或正则，来避免对这些指定的选择器做转换，如selectorBlackList：['.ignore', '.hairlines']：

```html
<div class="box ignore"></div>
```

写CSS的时候： 

```css
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

```css
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

##### 8.2.2 Viewport Units Buggyfill

这个js库是为了兼容那些不兼容vw、vh、vmax、vmin这些viewport单位的浏览器所使用的，在该方案开始我们已经明确过，现如今大部分机型的大部分浏览器都已经兼容了viewport单位，大漠老师在17年左右对Top30的热门机型进行了测试，其中只有如下几款机型没有完全支持viewport单位：

![webMobile008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile008.jpg)

但是如果你的业务不允许，需要你的项目跑在很多更古老的机型或者浏览器版本上，那么就不得不考虑到一些hack手段，那么这个js库就是你的首选方案了。

**使用方法**

1. 引入JavaScript文件
viewport-units-buggyfill主要有两个JavaScript文件：viewport-units-buggyfill.js和viewport-units-buggyfill.hacks.js。你只需要在你的HTML文件中引入这两个文件。比如在Vue项目中的index.html引入它们：

```html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/
??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

2. 在HTML文件中调用viewport-units-buggyfill
在html文件中引入polyfill的位置之后，需要手动调用下 viewport-units-buggyfill:

```js
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
}
```

3. 结合使用postcss-viewport-units
具体的使用。在你的CSS中，只要使用到了viewport的单位地方，需要在样式中添加content：

```css
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

```css
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

```js
plugins: {
  'postcss-viewport-units': {}
} 
```

**副作用**

在我们使用了Viewport Units Buggyfill后，正如你看到的，它会在占用content属性，因此会或多或少的造成一些副作用。如img元素和伪元素的使用::before或::after。

对于img，在部分浏览器中，content的写入会造成图片无法正常展示，这时候需要全局添加样式覆盖：

```css
img {
    content: normal !important;
} 
```

对于::before等伪元素，就算是在里面使用了vw单位，Viewport Units Buggyfill对其并不会起作用，如：

```css
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

#### 8.3 Viewport方案的缺陷
采用vw来做适配在处理一些细节之处还是存在一定的缺陷的。  比如当容器使用vw，margin采用px时，很容易造成整体宽度超过100vw，从而影响布局效果。当然我们也是可以避免的，例如使用padding代替margin，结合calc()`函数使用等等...

另外一点，px转换成vw不一定能完全整除，因此有一定的像素差。

##### 8.3.1 高倍屏适配
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

```js
fineLine(color = #e8e8e8, position = bottom)
  if position == top || position == bottom
    background-repeat: repeat-x
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAA
        CZgbYnAAAAAXNSR…hZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY5g5c+Z/BhAAABRcAsvqB
        ShzAAAAAElFTkSuQmCC)
    if position == top
      background-position: 0 0
    else
      background-position: 0 100%
  else
    background-repeat: repeat-y
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAA
        CZgbYnAAAAAXNSR…hZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY5g5c+Z/BhAAABRcAsvqB
        ShzAAAAAElFTkSuQmCC)
    if position == left
      background-position: 0 0
    else
      background-position: 100% 0
```

当然，我们也可以借助postcss-write-svg的能力，自己编写一个可以绘出上图中两种类型的base64图片出来：

```css
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

```css
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

```css
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


### 九、rem适配方案

#### 9.1 原理

rem是css3新增的一个相对单位，当使用rem为元素设定字体大小时，相对的是HTML根元素的字体大小。例如你给html设置font-size为16px，html中的div元素设置font-size为1rem，则这1rem也是16px。

rem适配的原理是布局等比例缩放，我们可以动态控制html中font-size的大小来改变rem的大小。

#### 9.2 实现

##### 9.2.1 设置视口viewport

在移动端配置视口的方法是设置一个meta标签：

```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; 
minimum-scale=1; user-scalable=no;">
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

```js
let viewport = document.querySelector('meta[name=viewport]')
let dpr = window.devicePixelRatio || 1
let scale = 1 / dpr
viewport.setAttribute(
    "content",
    "width=device-width" +
    ",initial-scale=" +
    scale +
    ", maximum-scale=" +
    scale +
    ", minimum-scale=" +
    scale +
    ", user-scalable=no"
)
```

这样就可以实现元素在不同设备下有不同的缩放效果

缺点：边框等不需要缩放的元素，也会跟着缩放

注意：

- viewport标签只对移动端浏览器有效，对PC端浏览器是无效的。
- 当缩放比例为100%时，逻辑像素 = CSS 像素宽度 = 理想视口的宽度 = 布局视口的宽度。
- 单独设置initial-scale或 width都会有兼容性问题，所以设置布局视口为理想视口的最佳方法是同时设置这两个属性。
- 即使设置了user-scalable = no，在Android Chrome浏览器中也可以强制启用手动缩放。

##### 9.2.2 动态设置rem 

通过js获取设备宽度来动态设置font-size随着视口大小的改变而改变，流程如下：

- 获得设计稿尺寸，如750px
- 对设计稿标注进行转换
- 需要等比缩放的使用rem，不需要缩放的，例如border阴影，则使用px

```js
const WIDTH = 750//设计稿宽度
function setRemUnit() {
  let rem = 100*screen.width/WIDTH
  document.documentElement.style.fontSize = `${rem}px`
}
setRemUnit()
```

看看无设置和有设置的区别：

![webMobile014](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile014.jpg)

![webMobile015](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile015.jpg)

除了字体，设置宽高等值，都可以达到缩放的效果。

缺点

- css与js代码具有一定的耦合性
- 必须将改变font-size的代码放在css样式之前

### 十、vw适配方案

如果说我们要一个不需要JS和CSS耦合在一起的单位，那vw/vh就是一个不错的选择。

- **vw：view width，指视口宽度的百分比，如：1vw = 视口宽度的1%**
- **vh：view height，指视口高度的百分比，如：1vh = 视口高度的1%**
- **vmin：vmin的值是当前vw和vh中较小的值**
- **vmax：vmax的值是当前vw和vh中较大的值**

使用起来也比较简单，比如我假设设计稿使用1080px宽度，则100vw = 1080px，即1vw = 10.8px。我们可以根据设计图上的px值直接转换成对应的vw值，也可以使用PostCSS的插件postcss-px-to-viewport，可以直接在代码中写px。

例子：设置一个视口宽高都占百分之五十的div

```css
.box {
  width: 50vw;
  height: 50vh;
  background-color: red;
}
```

### 十一、rem配合vw 适配方案

我们也可以通过vw来动态调整html的font-size，元素布局上使用rem单位，并使用媒体查询@media，当超过一定宽度时设置font-size为px限制根元素字体的大小。

```css
@media screen and (max-width: 320px) {
      html {
          font-size: 64px;
      }
}
@media screen and (min-width: 540px) {
        html {
            font-size: 108px;
        }
 }
html {
  font-size: 20vw;
}
.box {
    max-width: 540px;
    min-width: 320px;
}
```

新闻、社区等可阅读内容比较多的场景：px+flex+百分比

例子：携程（m.ctrip.com/html5/）

视觉图形组件较多的，或者是组件位置有一定相对依赖关系的场景：vw + rem

例子：京东（m.jd.com/）
网易（3g.163.com/touch/）

### 十二、适配iPhoneX

iPhoneX的出现将手机的颜值带上了一个新的高度，它取消了物理按键，改成了底部的小黑条，但是这样的改动给开发者适配移动端又增加了难度。

#### 12.1 安全区域

在iPhoneX发布后，许多厂商相继推出了具有边缘屏幕的手机

![webMobile034](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile034.jpg)

这些手机和普通手机在外观上无外乎做了三个改动：圆角（corners）、刘海（sensor housing）和小黑条（Home Indicator）。为了适配这些手机，安全区域这个概念变诞生了：安全区域就是一个不受上面三个效果的可视窗口范围。

为了保证页面的显示效果，我们必须把页面限制在安全范围内，但是不影响整体效果。

#### 12.2 viewport-fit

viewport-fit是专门为了适配iPhoneX而诞生的一个属性，它用于限制网页如何在安全区域内进行展示。

![webMobile035](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile035.jpg)

contain: 可视窗口完全包含网页内容

cover：网页内容完全覆盖可视窗口

默认情况下或者设置为auto和contain效果相同。

#### 12.3 env、constant

![webMobile036](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile036.jpg)

我们需要将顶部和底部合理的摆放在安全区域内，iOS11新增了两个CSS函数env、constant，用于设定安全区域与边界的距离。
函数内部可以是四个常量：

- safe-area-inset-left：安全区域距离左边边界距离
- safe-area-inset-right：安全区域距离右边边界距离
- safe-area-inset-top：安全区域距离顶部边界距离
- safe-area-inset-bottom：安全区域距离底部边界距离

注意：我们必须指定viweport-fit后才能使用这两个函数：

```html
<meta name="viewport" content="viewport-fit=cover">
```

constant在iOS < 11.2的版本中生效，env在iOS >= 11.2的版本中生效，这意味着我们往往要同时设置他们，将页面限制在安全区域内：

```css
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

当使用底部固定导航栏时，我们要为他们设置padding值：

```css
{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 十三、横屏适配

![webMobile037](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile037.jpg)

很多视口我们要对横屏和竖屏显示不同的布局，所以我们需要检测在不同的场景下给定不同的样式：

#### 13.1 JavaScript检测横屏

window.orientation:获取屏幕旋转方向

```js
window.addEventListener("resize", ()=>{
    if (window.orientation === 180 || window.orientation === 0) { 
      // 正常方向或屏幕旋转180度
        console.log('竖屏');
    };
    if (window.orientation === 90 || window.orientation === -90 ){ 
       // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
        console.log('横屏');
    }  
}); 
```

#### 13.2 CSS检测横屏

```css
@media screen and (orientation: portrait) {
  /*竖屏...*/
} 
@media screen and (orientation: landscape) {
  /*横屏...*/
}
```

### 十四、图片模糊问题

#### 14.1 产生原因

我们平时使用的图片大多数都属于位图（png、jpg...），位图由一个个像素点构成的，每个像素都具有特定的位置和颜色值：

![webMobile038](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile038.jpg)

理论上，位图的每个像素对应在屏幕上使用一个物理像素来渲染，才能达到最佳的显示效果。

而在dpr > 1的屏幕上，位图的一个像素可能由多个物理像素来渲染，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，所以相同的图片在dpr > 1的屏幕上就会模糊:

![webMobile039](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile039.jpg)

#### 14.2 解决方案

为了保证图片质量，我们应该尽可能让一个屏幕像素来渲染一个图片像素，所以，针对不同DPR的屏幕，我们需要展示不同分辨率的图片。

如：在dpr=2的屏幕上展示两倍图(@2x)，在dpr=3的屏幕上展示三倍图(@3x)。

![webMobile040](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile040.jpg)

#### 14.3 media查询

使用media查询判断不同的设备像素比来显示不同精度的图片：

```css
.avatar{
    background-image: url(conardLi_1x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .avatar{
        background-image: url(conardLi_2x.png);
    }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
    .avatar{
        background-image: url(conardLi_3x.png);
    }
}
```

> 只适用于背景图

#### 14.4 image-set

使用image-set：

```css
.avatar {
    background-image: -webkit-image-set( "conardLi_1x.png" 1x, "conardLi_2x.png" 2x );
}
```

> 只适用于背景图

#### 14.5 srcset

使用img标签的srcset属性，浏览器会自动根据像素密度匹配最佳显示图片：

```html
<img src="conardLi_1x.png"
     srcset=" conardLi_2x.png 2x, conardLi_3x.png 3x">

```

#### 14.6 JavaScript拼接图片url

使用window.devicePixelRatio获取设备像素比，遍历所有图片，替换图片地址：

```js
const dpr = window.devicePixelRatio;
const images =  document.querySelectorAll('img');
images.forEach((img)=>{
  img.src.replace(".", `@${dpr}x.`);
})
```

#### 14.7 使用svg

SVG 的全称是可缩放矢量图（Scalable Vector Graphics）。不同于位图的基于像素，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

![webMobile041](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webMobile041.jpg)

除了我们手动在代码中绘制svg，我们还可以像使用位图一样使用svg图片：

```html
<img src="conardLi.svg">

<img src="data:image/svg+xml;base64,[data]">

.avatar {
  background: url(conardLi.svg);
}
```