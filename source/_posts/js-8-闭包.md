---
title: js重点知识-8-闭包
date: 2020-12-22 14:30:52
top: true
tags:
- 闭包
categories:
- JavaScript
---
### 一、定义
<!--more-->
闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

闭包是指有权访问另一个函数作用域中的变量的函数。

闭包属于一种特殊的作用域，称为 静态作用域。它的定义可以理解为: 父函数被销毁 的情况下，返回出的子函数的[[scope]]中仍然保留着父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。

作用：

- 可以读取函数内部的变量；  

- 让这些变量的值始终保持在内存中 

创建闭包的常见方式就是在一个函数内部创建另一个函数。

闭包可以把一些不想要暴露在全局的变量或方法封装在函数内部。

通常用面向对象思想能实现的功能，用闭包都能实现。

闭包会产生一个很经典的问题:

- 多个子函数的[[scope]]都是同时指向父级，是完全共享的。因此当父级的变量对象被修改时，所有子函数都受到影响。

解决:

- 变量可以通过 函数参数的形式 传入，避免使用默认的[[scope]]向上查找

- 使用setTimeout包裹，通过第三个参数传入

- 使用 块级作用域，让变量成为自己上下文的属性，避免共享

### 二、创建闭包的方式

有时候需要得到函数内的局部变量，一般办不到，通过闭包可获取。

#### 2.1 返回值

在函数的内部，再定义一个函数，作为返回值被返回。

```js
var F = function(){
    var b = 'local';
    var N = function(){
        return b;
    }
    return N;
}
console.log(F()());
```

#### 2.2 函数赋值

将内部函数赋值给一个外部变量。

```js
var inner;
var F = function(){
    var b = 'local';
    var N = function(){
        return b;
    };
    inner = N;
};
F();
console.log(inner());
```

#### 2.3 函数参数

通过函数参数传递函数的形式来实现。

```js
var Inner = function(fn){
    console.log(fn());
}
var F = function(){
    var b = 'local';
    var N = function(){
        return b;
    }
    Inner(N);
}
F();
```

#### 2.4 IIFE（立即执行函数表达式）

函数F()都是在声明后立即被调用，因此可以使用IIFE来替代。但是，要注意的是，这里的Inner()只能使用函数声明语句的形式，而不能使用函数表达式。

```js
function Inner(fn){
    console.log(fn());
}

(function(){
    var b = 'local';
    var N = function(){
        return b;
    }
    Inner(N);
})();
```

#### 2.5 循环赋值

在闭包问题上，最常见的一个错误就是循环赋值的错误。

```js
function foo(){
    var arr = [];
    for(var i = 0; i < 2; i++){
        arr[i] = function(){
            return i;
        }
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//2
```

正确写法

```js
function foo(){
    var arr = [];
    for(var i = 0; i < 2; i++){
        arr[i] = (function fn(j){
            return function test(){
                return j;
            }
        })(i);
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//0
```

或者使用ES6 let与const

#### 2.6 getter/setter 

通过提供getter()和setter()函数来将要操作的变量保存在函数内部，防止其暴露在外部。

```js
var getValue,setValue;
(function(){
    var secret = 0;
    getValue = function(){
        return secret;
    }
    setValue = function(v){
        if(typeof v === 'number'){
            secret = v;
        }
    }
})();
console.log(getValue());//0
setValue(1);
console.log(getValue());//1
```

#### 2.7 迭代器

```js
var add = (function(){
    var counter = 0;
    return function(){
        return ++counter; 
    }
})();
console.log(add())//1
console.log(add())//2
```

```js
function setup(x){
    var i = 0;
    return function(){
        return x[i++];
    }
}
var next = setup(['a','b','c']);
console.log(next());//'a'
console.log(next());//'b'
console.log(next());//'c'
```

### 三、闭包优缺点

函数执行会形成一个私有上下文，如果上下文中的某些内容（一般指的是堆内存地址）被上下文以外的些事物（例如：变量、事件绑定）所占用，则当前上下文不能被出栈释放（浏览器的垃圾回收机制GC所决定的）

闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。直观的说就是形成一个不销毁的栈环境。

闭包的机制：形成一个不被释放的上下文；

保护：保护私有上下文中的私有变量和外界互不影响

保存：上下文不被释放，那么上下文中的私有变量和值都会保存起来，可以供其下级上下文使用 

如果大量使用闭包，会导致栈内存太大，页面渲染变慢，性能受到影响，所以真是项目中想要合理应用闭包；某些代码会导致栈溢出或者内存泄露，这些操作都是需要我们注意的.

内存消耗打大，闭包会在父函数外部，改变父函数内部变量的值，所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

### 三、实践

#### 3.1 解决循环问题

用var

```js
var li = document.querySelectorAll("li");
for(var i=0;i<li.length;i++){
    li[i].onclick= function(){
		console.log(i);//显示结果都为3
	}
}
```

使用闭包

```js
for(var i=0;i<li.length;i++){
	(function(i){
		li[i].onclick= function(){
		console.log(i)	//输出0，1，2
	}
	})(i)
		
}
```

使用let

```js
for(let i=0;i<li.length;i++){
    li[i].onclick= function(){
		console.log(i);//显示结果为0,1,2
	}
}
```

#### 3.2 为节点循环绑定点击事件

```html
<!DOCTYPE html>
<html>
<head>
     <meta charset="UTF-8">
</head>
<body>
    <button>Button0</button>
    <button>Button1</button>
    <button>Button2</button>
    <button>Button3</button>
    <button>Button4</button>
</body>
</html>
```

```js
for(var i = 0;i<btnList.length;i++){
	//错误的代码 onclick是异步触发的，
	btnList[i].onclick = function(){
		console.log(i)
	}
 
	//正确的代码
	//采用“立即执行函数Immediately-Invoked Function Expression (IIFE)”的方式创建作用域
	(function(i){
		btnList[i].onclick = function(){
			console.log(i)
		}
	})(i);
}
```

#### 3.3 延续局部变量的寿命

img对象经常用于数据上报，如下：

```js
var report = function(src) {
    var img = new Image();
    img.src = src;
}
report('http://xxx.com/getUserInfo');
```

这段代码在运行时，发现在一些低版本浏览器上存在bug，会丢失部分数据上报，原因是img是report函数中的局部变量，当report函数调用结束后，img对象随即被销毁，而此时可能还没来得及发出http请求，所以此次请求就会丢失。

因此，我们使用闭包把img对象封闭起来，就可以解决数据丢失的问题：

```js
var report = (function() {
    var imgs = [];
    return function(src) {
        var img = new Image();
        imgs.push(img);
        img.src = src;
    }
})()


(function(){
      //i在外部就不认识啦
      for(var i=0;i<count;i++){}
})();
console.log(i);//报错，无法访问
```

#### 3.4 对结果进行缓存

```js
var fn=function(){
    var sum=0;
    for(var i=0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
}
console.log(fn(1,2));//3
 
//优化版本
var fn=(function(){
    var cache={}//将结果缓存到该对象中
    return function(){
        var str=JSON.stringify(arguments);
        if(cache[str]){//判断缓存中是否存在传递过来的参数，存在直接返回结果，无需计算
            return cache[str];
        }else{//进行计算并返回结果
            var sum=0;
            for(var i=0;i<arguments.length;i++){
                sum+=arguments[i];
            }
            return cache[str]=sum;
        }
    }
})()
```

#### 3.5 设计模式之 构造器模式

在经典面向对象的编程语言中，Constructor是一种在内存已分配给该对象的情况下，用于初始化新创建对象的方法。
在JavaScript中，几乎所有的东西都是对象，我们通常最感兴趣的是object构造器。

Object构造器用于构建特定类型的对象--准备好对象以备使用，同时接收构造器可以使用的参数，以在第一次创建对象时，设置成员属性和方法的值。

```js
// 构造器模式
function Car(model, year, miles){
	this.model = model;
	this.year = year;
	this.miles = miles;

	Car.prototype.toString = function(){
		return this.model + 'has done ' + this.miles + ' miles';
	}
}
 
var civic = new Car('honda civic', 2019, 2000);
console.log(civic.toString()); 
```

JavaScript不支持类的概念，但支持与对象一起用的特殊constructor（构造器）函数，通过在构造器前面加new关键字，告诉JavaScript像使用构造器一样实例化一个新对象，并且对象成员由该函数定义。

toString这样的函数在这里在每次创建新的实例的时候都被重新定义，这不是最理想的，toString应该在所有的Car构造的实例之间共享。所以把toString放在Car的prototype（原型对象）上，Car构建的所有实例，都会访问同一个原型对象并获取到toString方法。

这里toString就是一个闭包，function可以访问实例中的model，miles和year变量。

#### 3.6 Module(模块)模式

在JavaScript中，Module模式用于进一步模拟类的概念。通过这种方式，能够使一个单独的对象拥有公有/私有方法和变量，从而屏蔽来自全局作用域的特殊部分。 产生的结果是：函数名与在页面上其他脚本定义的函数冲突的可能性降低。

```js
var myNamespace = (function(){
    var obj = {};
    // 私有计数器变量
    var myPrivateVar = 0;
    
    // 记录所有参数的私有函数
    var myPrivateMethods  = function(bar){
        console.log('my privateVar in private = '+ bar);
    }
    
    //公有变量
    var myPublicVar = 'foo';
    // 调用私有变量和函数的公有函数
    function myPublicMethods(bar){
        // 增加私有计数器值
        myPrivateVar = bar;
        console.log('my privateVar in public = '+ myPrivateVar);
        // 调用私有函数 并传入参数
        myPrivateMethods(bar);
    }
    
    obj.myPublicVar = myPublicVar;
    obj.myPublicMethods = myPublicMethods;
    
    return obj;
    
})();

// myNamespace.myPrivateVar;
// 用户可以调用公有函数，访问和变更私有函数及私有变量
myNamespace.myPublicMethods('user input');
```

Module模式使用闭包封装“私有”状态和组织。它提供了一种包装混合共有/私有方法和变量的方式，防止其泄漏至全局作用域，并与别的开发人员的接口发生冲突。通过该模式，只需返回一个共有API,而其他的一切都维持在私有闭包里。

在Module模式中，共有部分（闭包）可以接触私有部分，然而外界无法接触类的私有部分，模块中的 myPrivateVar 和 myPrivateMethods  是私有的，因此应用程序的其他部分无法直接读取它。它只与模块的闭包一起存在。

<br/>

参考1：[常见JavaScript设计模式]()