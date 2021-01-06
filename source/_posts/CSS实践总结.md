---
title: CSS实践总结
date: 2020-06-02 15:27:06
tags:
- CSS
- calc函数
categories:
- CSS
---
##### 1.控制元素的高度
vw — 1vw 等于视口宽度的 1%  
vh — 1vh 等于视口高度的 1%  
<!--more-->
vmin — vw 和 vh 中的较小值  
vmax — vw 和 vh 中的较大值  
##### 2.calc函数
```
.demo {
    width: calc(100% - 500px);
    height: 200px;
}
```
##### 3.模糊文字
```
.demo {
    color: transparent;
    text-shadow: black 0 0 2px;
}
```
![css001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/css001.jpg)
##### 4.多重边框
```
.demo {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.2), 
                0 0 0 20px rgba(0, 0, 0, 0.2), 
                0 0 0 30px rgba(0, 0, 0, 0.2), 
                0 0 0 40px rgba(0, 0, 0, 0.2),
                0 0 0 50px rgba(0, 0, 0, 0.2),
                0 0 0 60px rgba(0, 0, 0, 0.2),
                0 0 0 70px rgba(0, 0, 0, 0.2),
                0 0 0 80px rgba(0, 0, 0, 0.2);
}
```
![css002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/css002.jpg)
##### 5.pointer-events属性可以让我们控制光标在鼠标点击、拖拽等事件的行为
```
a {
    pointer-events: none;
}
```
添加了这个样式后，链接就会失效 
甚至鼠标悬浮在这个链接上都不会变成pointer的光标样式
##### 6.元素裁剪
可能我们用过对图片裁剪的属性background-clip   
但其实css可以对元素裁剪   
就是用clip属性   
它只有在absolute或fixed定位的时候才生效 
```
.demo {
    position: absolute;
    clip: rect(20px,140px,140px,20px);
}
```
##### 7.内容不被选中
```
body{

    -webkit-user-select:none;

    -moz-user-select:none;

    -ms-user-select:none;

    user-select:none;

}
```