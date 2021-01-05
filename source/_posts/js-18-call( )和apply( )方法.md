---
title: js重点知识-18-call( )和apply( )方法
date: 2021-01-05 10:24:57
top: true
tags:
- call()
- apply()
categories:
- JavaScript
---
### call()和apply()方法用法
<!--more-->
每个函数都包含两个非继承而来的方法：call()方法和apply()方法。

相同点：这两个方法的作用是一样的。

不同点：接收参数的方式不同。
```
apply()方法 接收两个参数，一个是函数运行的作用域（this），另一个是参数数组。

call()方法 第一个参数和apply()方法的一样，但是传递给函数的参数必须列举出来。

call方法可以用来代替另一个对象调用一个方法，call方法可以
将一个函数的对象上下文从初始的上下文改变为thisObj指定的
新对象，如果没有提供thisObj参数，那么Global对象被用于thisObj。
```
什么情况下用apply,什么情况下用call

在给对象参数的情况下,如果参数的形式是数组的时候,比如apply示例里面传递了参数arguments,这个参数是数组类型,并且在调用Person的时候参数的列表是对应一致的(也就是Person和Student的参数列表前两位是一致的) 就可以采用 apply , 如果我的Person的参数列表是这样的(age,name),而Student的参数列表是(name,age,grade),这样就可以用call来实现了,也就是直接指定参数列表对应值的位置(Person.call(this,age,name,grade));

```
funaction.call(thisobj,args...)

function.apply（thisobj,args...）

其中的参数thisobj是指定对象，参数args表示要传递给被调用函数的参数。
```
```
function f(x,y){//定义一个简单的函数
return x+y;
}
function o(a,b){//定义一个函数结构体
return a*b;
}
f.call(o,(3,4)//返回值为7
f.apply(o,(3,4)//返回值为7
```

call和apply方法是把一个函数转化为指定对象的方法，并在该对象上调用该函数，函数并没有做为对象的方法而存在，函数被动态调用之后，临时方法就会被注销。

call和apply方法可以动态的改变函数this指代的对象。

call(obj,参数1，参数2）:两个参数,前者将代替Function类里this对象，后者（多个元素）作为参数传递给被调用的函数。
```
var foo = {
  name:"mingming",
  logName:function(){
    console.log(this.name);
  }
}
var bar={
  name:"xiaowang"
};
foo.logName.call(bar);//xiaowang
```

apply（obj，[参数1，参数2]），同上，不同点是第二个参数是数组。（将数组的每个元素作为一个个参数传递给被调用的函数，性质与call（）方法一样）
```
//求数组的最大值
var arr = [1,2,3,4,7,34,8]     
var max=Math.max.apply(null,arr)  //34   Math.max（）参数不能为数组

//求数组的最小值
var max=Math.min.apply(null,arr)  //1   
//合并数组并返回新数组的长度
var arr1=new Array("1","2","3");
var arr2=new Array("4","5","6");
Array.prototype.push.apply(arr1,arr2); //6
```
