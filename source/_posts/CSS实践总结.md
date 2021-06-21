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

calc() 函数用于动态计算长度值。

- **需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；**

- 任何长度值都可以使用calc()函数进行计算；

- calc()函数支持 "+", "-", "*", "/" 运算；

- calc()函数使用标准的数学运算优先级规则；

```css
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

##### 8.超出文本省略号显示

（1）单行溢出出现省略号显示

```html
<div class="p">单行溢出出现省略号显示单行溢出出现省略号显示单行溢出出现省略号显示</div>
```

```css
.p{
 width:1rem;
 overflow:hidden;//超出部分隐藏
 white-space:nowrap;//禁止换行
 text-overflow:ellipsis//省略号
}
```

（2）多行溢出出现省略号（css方案）

这样方案简单易懂，但是存在兼容性，只适用于在webkit浏览器或者移动端。

```html
<div  class="p">小绵羊小绵羊小绵羊小绵羊小绵羊小绵羊</div>
```

```css
.p{
  width:1rem;
  height:0.4rem;//需要设置高度
  //必须结合的属性，将对象作为弹性伸缩盒对象的子元素的排列仿古式
  display:-webkit-box;
  -webkit-box-orient:vertical;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;//例如超过2行显示省略号
  overflow:hidden;
}
```

（3）多行溢出出现省略号（js方案）

```vue
<template>
<div class="box">
 <textarea  id=""  rows="10" v-model="val"></textarea>
  <div id="boxid" class="text" v-text="val" ></div>
  <button @click="btn">按钮</button>
 </div>
</template>
<script>
  export default {
    data(){
      return {val:""}
    },
    methods:{
    btn(){
      //参数1 元素id  参数2 要限制的行数 参数3 输入的值
      this.moreline('boxid',3,this.val)//传3表示超过3行时省略号显示。
    },
    moreline(id,rows,str){
      var boxid = document.getElementById(id);
      var computedStyle = document.defaultView.getComputedStyle(boxid,null);
      var lineHeight = computedStyle.lineHeight;
      var top = rows*parseInt(lineHeight);
      var tempstr = str;
      boxid.innerHTML = tempstr;
      var len = tempstr.length;
      var i = 0;
      if(boxid.offsetHeight<=top){
      }else{
        var temp = "";
        boxid.innerHTML = temp;
        while(boxid.offsetHeight<=top){
          temp = tempstr.substring(0,i+1);
          i++;
          boxid.innerHTML = temp;
        }
        var slen = temp.length;
        tempstr = temp.substring(0,slen-1);
        len = tempstr.length;
        boxid.innerHTML = tempstr.substring(0,len-1)+"...";
        boxid.height = top+"rem";
      }
     }
    }
  }
</script>
```

新增点击可展开功能及代码：

```js
moreline(id,rows,str){
  var boxid = document.getElementById(id);
  var computedStyle = document.defaultView.getComputedStyle(boxid,null);
  var lineHeight = computedStyle.lineHeight;
  var top = (rows+1)*parseInt(lineHeight);
  var tempstr = str;
  boxid.innerHTML = tempstr;
  var len = tempstr.length;
  var i = 0;
  if(boxid.offsetHeight>top){
    var temp = "";
    boxid.innerHTML = temp;
    while(boxid.offsetHeight<=top){
      temp = tempstr.substring(0,i+1);
      i++;
      boxid.innerHTML = temp;
    }
    tempstr = temp.substring(0,temp.length-1);
    len = tempstr.length;
    boxid.innerHTML = tempstr.substring(0,len-3)+"..."+`<span class="a">展开</span>`;
    boxid.height = top+"rem";
    let en = document.querySelector(".a")
    en.onclick = function(){
        boxid.innerHTML = str;
    }
  }
 }
```

##### 9.css制作三角形

向上

```css
#triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
```

向下

```css
#triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}
```

向左

```css
#triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}
```

向右

```css
#triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
}
```

左上角

```css
#triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
```

右上角

```css
#triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
 
}
```

左下角

```css
#triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}
```

右下角

```css
#triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}
```