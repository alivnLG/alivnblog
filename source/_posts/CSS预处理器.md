---
title: CSS预处理器
date: 2020-06-02 15:30:42
tags:
- CSS
- Less
- Sass
- Scss
- Stylus
categories:
- CSS
---
### Less 、Sass/Scss、Stylus
#### 一、基本语法
Sass 和 Less 都使用的是标准的CSS语法，因此如果可以很方便的将已有的CSS代码转为预处理器代码，默认Sass使用.sass扩展名，而Less使用.less扩展名。
<!--more-->
```
/* style.scss or style.less */
h1 {
  color: #0982C1;
}
```
Sass 同时也支持老的语法，就是不包含花括号和分号的方式：
```
/* style.sass */
h1
  color: #0982c1
```
Stylus 支持的语法要更多样性一点，它默认使用 .styl 的文件扩展名，下面是 Stylus 支持的语法：
```
/* style.styl */
h1 {
  color: #0982C1;
}

/* omit brackets */
h1
  color: #0982C1;

/* omit colons and semi-colons */
h1
  color #0982C1
```
可以在同一个样式单中使用不同的变量:
```
h1 {
  color #0982c1
}
h2
  font-size: 1.2em
```
#### 二、变量
##### 1.less
通过@符号定义变量，已经被赋值的变量以及其他的常量（如像素、颜色等）都可以参与运算。
```
@maincolor : #092873;
@siteWidth : 1024px;
@borderStyle : dotted;
body {
  color: @maincolor;
  border: 1px @borderStyle @mainColor;
  max-width: @siteWidth;
}
```
##### 2.sass
sass变量必须是以$开头的，然后变量和值之间使用冒号（：）隔开，和css属性是一样的
```
$maincolor : #092873;
$siteWidth : 1024px;
$borderStyle : dotted;
body {
  color: $maincolor;
  border: 1px $borderStyle $mainColor;
  max-width: $siteWidth;
}
```
##### 3.stylus
stylus对变量是没有任何设定的，可以是以$开头，或者任何的字符，而且与变量之间可以用冒号，空格隔开，但是在stylus中不能用@开头
```
maincolor = #092873
siteWidth = 1024px
borderStyle = dotted
body 
  color maincolor
  border 1px borderStyle mainColor
  max-width siteWidth
```
#### 三、嵌套
sass，Less，stylus都支持下面这样的写法，且都是相同的：
```
//scss style //----------------------------------- 
nav { 
    ul { 
       margin: 0; 
       padding: 0; 
    } 
    li { 
       display: inline-block; 
    } 
    a { 
       display: block; 
       padding: 6px 12px; 
       text-decoration: none; 
    } 
}
//css style //----------------------------------- 
nav ul { 
    margin: 0; 
    padding: 0; 
    list-style: none; 
} 
nav li { 
    display: inline-block; 
} 
nav a { 
    display: block; 
    padding: 6px 12px; 
    text-decoration: none; 
}
```
#### 四、运算符
三者都可以这样写：
```
body {
  margin: (14px/2);
  top: 50px + 100px;
  right: 80 * 10%;
}
```
#### 颜色函数
CSS 预处理器一般都会内置一些颜色处理函数用来对颜色值进行处理，例如加亮、变暗、颜色梯度等。
##### 1.sass的颜色处理函数：
```
lighten($color, 10%); 
darken($color, 10%);  
saturate($color, 10%);   
desaturate($color, 10%);
grayscale($color);  
complement($color); 
invert($color); 
mix($color1, $color2, 50%); 
```
实例：
```
$color: #0982C1;
h1 {
  background: $color;
  border: 3px solid darken($color, 50%);
}
```
##### 2.less的颜色处理函数：
```
lighten(@color, 10%); 
darken(@color, 10%);  
saturate(@color, 10%);  
desaturate(@color, 10%); 
spin(@color, 10); 
spin(@color, -10); 
mix(@color1, @color2);
```
实例：
```
@color: #0982C1;
h1 {
  background: @color;
  border: 3px solid darken(@color, 50%);
}
```
##### 3.Stylus颜色处理函数：
```
lighten(color, 10%); 
darken(color, 10%);  
saturate(color, 10%);  
desaturate(color, 10%); 
```
实例：
```
color = #0982C1 
h1
  background color
  border 3px solid darken(color, 50%)
```
#### 六、导入import
导入时避免css冲突  
project.css
```
/* file.{type} */
body {
  background: #000;
}
```
graph.css
```
@ import "project.css";
@ import "file.{type}";

p {
  background: #092873;
}
```
最终生成：
```
@ import "1.css";
body {
  background: #000;
}
p {
  background: #092873;
}
```
#### 七、继承
当我们需要为多个元素定义相同样式的时候，我们可以考虑使用继承的做法.
##### 1.sass可通过@extend来实现代码组合声明，使代码更加优越简洁。
```
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
.success {
  @extend .message;
  border-color: green;
}
.error {
  @extend .message;
  border-color: red;
}
.warning {
  @extend .message;
  border-color: yellow;
}
```
##### 2.less
```
.inline {
  color: red;
}
nav ul {
  &:extend(.inline);
  background: blue;
}
```
或者
```
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
.success {
  .message;
  border-color: green;
}
.error {
  .message;
  border-color: red;
}
.warning {
  .message;
  border-color: yellow;
}
```
最终生成：
```
.message, .success, .error, .warning {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}
.success {
  border-color: green;
}
.error {
  border-color: red;
}
.warning {
  border-color: yellow;
}
```
##### 3.stylus和sass写法一样
注意优先级
#### 八、混入
Mixins有点像是函数或者是宏，当某段CSS经常需要在多个元素中使用时，可以为这些共用的CSS定义一个Mixin，然后只需要在需要引用这些CSS地方调用该Mixin 即可。
##### 1.Sass 的混入语法：
```
@mixin error($borderWidth: 2px) {
  border: $borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  @ include error(); //这里调用默认 border: 2px solid #F00;
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  @ include error(5px); //这里调用 border:5px solid #F00;
}
```
##### 2.Less CSS 的混入语法：
```
.error(@borderWidth: 2px) {
  border: @borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  .error(); //这里调用默认 border: 2px solid #F00;
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  .error(5px); //这里调用 border:5px solid #F00;
}
```
##### 3.Stylus 的混入语法：
```
error(borderWidth= 2px) {
  border: borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  error(); 
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  error(5px); 
}
```
最终生成：
```
.generic-error {
  padding: 20px;
  margin: 4px;
  border: 2px solid #f00;
  color: #f00;
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  border: 5px solid #f00;
  color: #f00;
}
```
#### 九、使用技巧
##### 1.使用数值操作和变量可以很方便的实现适应屏幕大小的布局处理。

sass：
```
$siteWidth: 1024px;
$gutterWidth: 20px;
$sidebarWidth: 300px;
body {
  margin: 0 auto;
  width: $siteWidth;
}
.content {
  float: left;
  width: $siteWidth - ($sidebarWidth+$gutterWidth);
}
.sidebar {
  float: left;
  margin-left: $gutterWidth;
  width: $sidebarWidth;
}
```
less:
```
@siteWidth: 1024px;
@gutterWidth: 20px;
@sidebarWidth: 300px;

body {
  margin: 0 auto;
  width: @siteWidth;
}
.content {
  float: left;
  width: @siteWidth - (@sidebarWidth+@gutterWidth);
}
.sidebar {
  float: left;
  margin-left: @gutterWidth;
  width: @sidebarWidth;
}
```
stylus:
```
siteWidth = 1024px;
gutterWidth = 20px;
sidebarWidth = 300px;

body {
  margin: 0 auto;
  width: siteWidth;
}
.content {
  float: left;
  width: siteWidth - (sidebarWidth+gutterWidth);
}
.sidebar {
  float: left;
  margin-left: gutterWidth;
  width: sidebarWidth;
}
```
最终生成：
```
body {
  margin: 0 auto;
  width: 1024px;
}
.content {
  float: left;
  width: 704px;
}
.sidebar {
  float: left;
  margin-left: 20px;
  width: 300px;
}
```
#### 十、高级语法
##### 1.在sass中，还支持条件语句；  
@if可一个条件单独使用，也可以和@else结合多条件使用
```
$lte7: true;
$type: monster;
.ib{
    display:inline-block;
    @if $lte7 {
        *display:inline;
        *zoom:1;
    }
}
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
最终生成：
```
.ib{
    display:inline-block;
    *display:inline;
    *zoom:1;
}
p {
  color: green; 
}
```
##### 2.除却条件语句，sass还支持for循环
for循环有两种形式，分别为：
```
1.@for $var from <start> through <end>
2.@for $var from <start> to <end>。
```
其中$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。
```
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```
同时也支持while循环：
```
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```
最后，同时支持each命令，作用与for类似：
```
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $animal-list {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
其css最终效果如下：
```
.puma-icon {
  background-image: url('/images/puma.png'); 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); 
}
.egret-icon {
  background-image: url('/images/egret.png'); 
}
.salamander-icon {
  background-image: url('/images/salamander.png'); 
}
```
