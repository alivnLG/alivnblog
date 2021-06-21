---
title: 前端综合-6-SVG基础知识
date: 2021-01-05 11:52:58
tags:
- SVG
- 矢量
categories:
- 前端综合
---
##### 1.SVG简介
SVG 指可伸缩矢量图形 (Scalable Vector Graphics)  
<!--more-->
SVG 用来定义用于网络的基于矢量的图形  
SVG 使用 XML 格式定义图形  
SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失  
SVG 是万维网联盟的标准  
SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体
##### 2.SVG优势
```
SVG 可被非常多的工具读取和修改（比如记事本）
SVG 与 JPEG 和 GIF 图像比起来，尺寸更小，且可压缩性更强。
SVG 是可伸缩的
SVG 图像可在任何的分辨率下被高质量地打印
SVG 可在图像质量不下降的情况下被放大
SVG 图像中的文本是可选的，同时也是可搜索的（很适合制作地图）
SVG 可以与 Java 技术一起运行
SVG 是开放的标准
SVG 文件是纯粹的 XML
```
##### 3.SVG实例
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>
```
SVG 代码解析：

第一行包含了 XML 声明。请注意 standalone 属性！该属性规定此 SVG 文件是否是"独立的"，或含有对外部文件的引用。

standalone="no" 意味着 SVG 文档会引用一个外部文件 - 在这里，是 DTD 文件。

第二和第三行引用了这个外部的 SVG DTD。该 DTD 位于 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"。该 DTD 位于 W3C，含有所有允许的 SVG 元素。

SVG 代码以 ```<svg>``` 元素开始，包括开启标签 ```<svg>``` 和关闭标签 ```</svg>``` 。这是根元素。width 和 height 属性可设置此 SVG 文档的宽度和高度。version 属性可定义所使用的 SVG 版本，xmlns 属性可定义 SVG 命名空间。

注释：所有的开启标签必须有关闭标签！
##### 4.SVG形状
矩形 <rect>  
圆形 <circle>  
椭圆 <ellipse>  
线 <line>  
折线 <polyline>  
多边形 <polygon>  
路径 <path>  

###### 参数解析：  

###### 矩形rect

x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）

y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px） 

CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）  

CSS 的 stroke-opacity 属性定义轮廓颜色的透明度（合法的范围是：0 - 1）

CSS opacity 属性用于定义了元素的透明值 (范围: 0 到 1)。

rx 和 ry 属性可使矩形产生圆角。
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
  style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
</svg>
```

###### 圆形circle

cx和cy属性定义圆点的x和y坐标。如果省略cx和cy，圆的中心会被设置为(0, 0)

r属性定义圆的半径
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red"/>
</svg>
```
###### 椭圆ellipse
CX属性定义的椭圆中心的x坐标

CY属性定义的椭圆中心的y坐标

RX属性定义的水平半径

RY属性定义的垂直半径
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="300" cy="80" rx="100" ry="50"
  style="fill:yellow;stroke:purple;stroke-width:2"/>
</svg>
```
###### 直线line
x1 属性在 x 轴定义线条的开始

y1 属性在 y 轴定义线条的开始

x2 属性在 x 轴定义线条的结束

y2 属性在 y 轴定义线条的结束
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="0" x2="200" y2="200"
  style="stroke:rgb(255,0,0);stroke-width:2"/>
</svg>
```
###### polygon多边形
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polygon points="100,10 40,180 190,60 10,60 160,180"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
</svg>
```
###### polyline曲线
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" 
  style="fill:white;stroke:red;stroke-width:4" />
</svg>
```
###### path路径
```
M = moveto  //移动到的点的x轴和y轴的坐标
L = lineto  //需要两个参数，分别是一个点的x轴和y轴坐标，L命令将会在当前位置和
                //新位置（L前面画笔所在的点）之间画一条线段。
H = horizontal lineto  //绘制平行线
V = vertical lineto    //绘制垂直线
C = curveto
S = smooth curveto
Q = quadratic Bézier curve
T = smooth quadratic Bézier curveto
A = elliptical Arc
Z = closepath         //从当前点画一条直线到路径的起点

以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

直线命令

曲线命令
二次贝塞尔曲线
三次贝塞尔曲线

弧形
```
###### text文本
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
</svg>


<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
xmlns:xlink="http://www.w3.org/1999/xlink">
  <a xlink:href="http://www.w3schools.com/svg/" target="_blank">
    <text x="0" y="15" fill="red">I love SVG</text>
  </a>
</svg>
```
##### 5.stroke属性
```
stroke               //文本或元素轮廓颜色
stroke-width         //文本或元素轮廓厚度
stroke-linecap       //定义不同类型的开放路径的终结
stroke-dasharray     //用于创建虚线
```
##### 6.SVG滤镜
##### 7.SVG模糊效果
<defs> 和 <filter>
所有互联网的SVG滤镜定义在<defs>元素中。<defs>元素定义短并含有特殊元素（如滤镜）定义。

<filter>标签用来定义SVG滤镜。<filter>标签使用必需的id属性来定义向图形应用哪个滤镜？

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3" fill="yellow" filter="url(#f1)" />
</svg>
```
##### 8.SVG阴影
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```
##### 9.SVG渐变
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>



<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```