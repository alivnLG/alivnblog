---
title: web-15-CSS Hack
date: 2021-01-05 11:53:07
top: true
tags:
- Hack
categories:
- 前端综合
---
### 一、CSS Hack
#### 1.1 CSS Hack简介
由于不同厂商的浏览器，比如Internet Explorer、Chrome、Mozilla Firefox、Safari等，或者是统一厂商的浏览器的不同版本，比如IE6和IE7，对CSS的解析和认识不完全一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。这个时候，我们就需要针对不同的浏览器，去写不同CSS，让它能够同时兼容不同的浏览器，能在不同的浏览器中，也能得到我们想要的页面效果。

#### 1.2 为什么使用CSS Hack
简单的说，CSS Hack的目的，就是使你的CSS代码兼容不同的浏览器。当然，我们也可以反过来利用CSS Hack为不同版本的浏览器定制编写不同的CSS效果。

#### 1.3 原理
由于不同的浏览器对CSS的支持和解析结果不一样，还由于CSS中的优先级关系，我们就可以根据这个来针对不同的浏览器来写不同的CSS。

#### 1.4 表现形式
注意：CSS Hack 主要针对类内部hack.
##### 1.4.1 属性前缀法（CSS类内部 Hack）
比如IE6能识别下划线"_"和星号"*" ，IE7能识别星号"*"，但不能识别下划线,IE6-IE10都认识"\9",而Firefox这三个都不能认识。

对于书写顺序的关系，一般是将识别能力强的浏览器的CSS写在后边
```
<style> 
div{  
    background:green;/*forfirefox*/  
    *background:red;/*forIE6 IE7*/  
}  
</style> 
```
##### 1.4.2 选择器前缀法（选择器 Hack）
```
:root .test
{
    background-color:green;
}
```
##### 1.4.3 IE条件注释法（HTML 头部引用 Hack), 针对所有IE（注：IE10+已经不再支持条件注释）
HTML头部引用就比较特殊了，类似于程序语句，只能使用在HTML文件里，而不能在CSS文件中使用，并且只有在IE浏览器下才能执行，在其他浏览器下面会被当做注释视而不见。
```
<link rel="stylesheet" type="text/css" href="css.css" />
<!–[if IE 7]>
<!– 如果IE浏览器版是7,调用ie7.css样式表 –>
<link rel="stylesheet" type="text/css" href="ie7.css" />
<![endif]–>
<!–[if lte IE 6]>
<!– 如果IE浏览器版本小于等于6,调用ie.css样式表 –>
<link rel="stylesheet" type="text/css" href="ie.css" />
<![endif]–>
```
```
<!--[if IE]>IE浏览器显示的内容<![endif]--> 
 <!--[if lt IE6]>只在IE6及以下版本显示的内容<![endif]-->
```
在属性值后面添加“!important”的写法只有IE6不能识别，其它版本IE及现代浏览器都可以识别;
```
background-color:green!important;
```

