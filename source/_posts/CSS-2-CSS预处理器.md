---
title: CSS重点知识-2-CSS预处理器
date: 2021-01-05 17:04:37
top: true
tags:
- Less
- Sass
- Scss
- Stylus
categories:
- CSS
---
### 一、基本语法
<!--more-->
Sass 和 Less 都使用的是标准的CSS语法，因此如果可以很方便的将已有的CSS代码转为预处理器代码，默认Sass使用.sass扩展名，而Less使用.less扩展名。

```css
/* style.scss or style.less */
h1 {
  color: #0982C1;
}
```

Sass 同时也支持老的语法，就是不包含花括号和分号的方式：

```css
/* style.sass */
h1
  color: #0982c1
```

Stylus 支持的语法要更多样性一点，它默认使用 .styl 的文件扩展名，下面是 Stylus 支持的语法：

```css
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

```css
h1 {
  color #0982c1
}
h2
  font-size: 1.2em
```

### 二、变量

#### 2.1 less

通过@符号定义变量，已经被赋值的变量以及其他的常量（如像素、颜色等）都可以参与运算。

```css
@maincolor : #092873;
@siteWidth : 1024px;
@borderStyle : dotted;
body {
  color: @maincolor;
  border: 1px @borderStyle @mainColor;
  max-width: @siteWidth;
}
```

#### 2.2 sass

sass变量必须是以$开头的，然后变量和值之间使用冒号（：）隔开，和css属性是一样的

```css
$maincolor : #092873;
$siteWidth : 1024px;
$borderStyle : dotted;
body {
  color: $maincolor;
  border: 1px $borderStyle $mainColor;
  max-width: $siteWidth;
}
```

#### 2.3 stylus

stylus对变量是没有任何设定的，可以是以$开头，或者任何的字符，而且与变量之间可以用冒号，空格隔开，但是在stylus中不能用@开头

```css
maincolor = #092873
siteWidth = 1024px
borderStyle = dotted
body 
  color maincolor
  border 1px borderStyle mainColor
  max-width siteWidth
```

### 三、嵌套

sass，Less，stylus都支持下面这样的写法，且都是相同的：

```css
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

### 四、运算符

三者都可以这样写：

```css
body {
  margin: (14px/2);
  top: 50px + 100px;
  right: 80 * 10%;
}
```

### 五、颜色函数

CSS 预处理器一般都会内置一些颜色处理函数用来对颜色值进行处理，例如加亮、变暗、颜色梯度等。

#### 5.1 sass的颜色处理函数

```js
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

```css
$color: #0982C1;
h1 {
  background: $color;
  border: 3px solid darken($color, 50%);
}
```

#### 5.2 less的颜色处理函数

```js
lighten(@color, 10%); 
darken(@color, 10%);  
saturate(@color, 10%);  
desaturate(@color, 10%); 
spin(@color, 10); 
spin(@color, -10); 
mix(@color1, @color2);
```

实例：

```css
@color: #0982C1;
h1 {
  background: @color;
  border: 3px solid darken(@color, 50%);
}
```

#### 5.3 Stylus颜色处理函数

```js
lighten(color, 10%); 
darken(color, 10%);  
saturate(color, 10%);  
desaturate(color, 10%); 
```

实例：

```css
color = #0982C1 
h1
  background color
  border 3px solid darken(color, 50%)
```

### 六、导入import

导入时避免css冲突  
project.css

```css
/* file.{type} */
body {
  background: #000;
}
```

graph.css

```css
@ import "project.css";
@ import "file.{type}";

p {
  background: #092873;
}
```

最终生成：

```css
@ import "1.css";
body {
  background: #000;
}
p {
  background: #092873;
}
```

### 七、继承

当我们需要为多个元素定义相同样式的时候，我们可以考虑使用继承的做法.

#### 7.1 sass可通过@extend来实现代码组合声明，使代码更加优越简洁。

```css
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
#### 7.2 less

```css
.inline {
  color: red;
}
nav ul {
  &:extend(.inline);
  background: blue;
}
```

或者

```css
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

```css
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

#### 7.3 stylus和sass写法一样

注意优先级

### 八、混入

Mixins有点像是函数或者是宏，当某段CSS经常需要在多个元素中使用时，可以为这些共用的CSS定义一个Mixin，然后只需要在需要引用这些CSS地方调用该Mixin 即可。

#### 8.1 Sass 的混入语法

```css
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

#### 8.2 Less CSS 的混入语法

```css
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

#### 8.3 Stylus 的混入语法：

```css
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

```css
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

### 九、使用技巧

#### 9.1 使用数值操作和变量可以很方便的实现适应屏幕大小的布局处理。

sass：

```css
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

```css
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

```css
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

```css
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

### 十、高级语法

#### 10.1 在sass中，还支持条件语句；  

@if可一个条件单独使用，也可以和@else结合多条件使用

```css
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

```css
.ib{
    display:inline-block;
    *display:inline;
    *zoom:1;
}
p {
  color: green; 
}
```

#### 10.2 除却条件语句，sass还支持for循环

for循环有两种形式，分别为：

```css
@for $var from <start> through <end>

@for $var from <start> to <end>
```

其中$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。

```css
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

同时也支持while循环：

```css
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

最后，同时支持each命令，作用与for类似：

```css
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $animal-list {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

其css最终效果如下：

```css
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
