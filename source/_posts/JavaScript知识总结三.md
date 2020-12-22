---
title: JavaScript知识总结三
date: 2020-11-18 17:39:58
tags:
- js
categories:
- JavaScript
---
#### 一、JavaScript数据类型
##### 1.1 基本类型
> 基本类型 : String , Number , null , undefined , Boolean , Symbol , Bigint
<!--more-->
基本数据类型是按值访问的，因为可以直接操作保存在变量中的实际值。

基本数据类型在被创建时，在栈上给其划分一块内存，将数值直接存储在栈上；

##### 1.2 引用类型

> 引用数据类型：Object，如果要细分的话有 Object、Array、Date、RegExp 和 Function

 引用数据类型在被创建时，首先在栈上创建一个引用，而对象的具体内容都存储在堆内存上，然后由栈上面的引用指向堆中对象的地址。

 ![jssummary003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary003.jpg)

#### 二、类型转换

1.可以转为false的5个值:NaN,'',0,null,undefined

2.Number([value])把其他数据类型转换为number数字类型

- 字符串转换为数字:空字符串是0，如果字符串中出现任意一个非有效数字字符，结果都是NaN
- 布尔转换为数字:true=>1 false=>0
- null=>0 undefined=>NaN
- symbol不能转换为数字,报错
- bigInt可以转换为数字
- 引用类型(对象或者函数)
- 首先获取它的[Symbol.toPrimitive]属性值
- 如果没有这个属性，其次获取它的valueOf
- 如果还是没有原始值，再转换为字符串toString,然后再转换为数字Number

3.parseInt/parseFloat([value])把其他数据类型转换为数字类型

- 需要保证[value]是一个字符串，如果不是则首先隐式的把其转换为字符串[value].toString()
- 从字符串左侧第一个字符开始向右查找，把找到的的有效数字字符，转换为数字(遇到一个非有效数字字符则停止查找，不论后面是否还有有效数字，都不再查找)
- 如果一个有效数字字符都没有找到，结果都是NaN

#### 三、闭包
##### 3.1 定义

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

闭包是指有权访问另一个函数作用域中的变量的函数。

> 函数执行会形成一个私有上下文，如果上下文中的某些内容（一般指的是堆内存地址）被上下文以外的些事物（例如：变量、事件绑定）所占用，则当前上下文不能被出栈释放（浏览器的垃圾回收机制GC所决定的） > => 闭包的机制：形成一个不被释放的上下文；
> 保护：保护私有上下文中的私有变量和外界互不影响> • 保存：上下文不被释放，那么上下文中的私有变量和值都会保存起来，可以供其下级上下文使用
> 弊端：如果大量使用闭包，会导致栈内存太大，页面渲染变慢，性能受到影响，所以真是项目中想要合理应用闭包；某些代码会导致栈溢出或者内存泄露，这些操作都是需要我们注意的.

##### 3.2 闭包的运用

###### 解决循环问题

用var

```
var li = document.querySelectorAll("li");
for(var i=0;i<li.length;i++){
    li[i].onclick= function(){
		console.log(i);//显示结果都为3
	}
}
```

使用闭包

```
for(var i=0;i<li.length;i++){
	(function(i){
		li[i].onclick= function(){
		console.log(i)	//输出0，1，2
	}
	})(i)
		
}
```

使用let

```
for(let i=0;i<li.length;i++){
    li[i].onclick= function(){
		console.log(i);//显示结果为0,1,2
	}
}
```

##### 3.3 compose函数

当我们遇到

```
const fn1 = x => x*2 ,  fn2 = x => x+3 , fn3 = x =>x-1 
```

想要把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果,如果不通过compose函数处理，则是

```
fn3(fn2(fn1(x)))
```

这样看起来非常不美观。因此我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数）

```
function compose(...args){
		return function(x){
			let len = args.length;
			if(args == 0) return x;
			if(len == 1) return args[0](x);
			return args.reduceRight((pre,cur)=>{
				return cur(pre)
			},x)
		}
}
const fn4 = compose(fn1,fn2,fn3);
console.log(fn4(5))
```

redux中compose源码:

```
function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg
	}
	if (funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

#### 四、原型链

关于原型：

- 1.所有引用类型都有一个__proto__(隐式原型)属性，属性值是一个普通的对象
- 2.所有函数都有一个prototype(原型)属性，属性值是一个普通的对象
- 3.所有引用类型的__proto__属性指向它构造函数的prototype

```
function Person(name){this.name = name}
let p1 = new Person("小白");
console.dir(p1)

console.log(p1.__proto__ == Person.prototype)//true
console.log(Person.prototype.constructor == Person)//true
```

![jssummary004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary004.jpg)

![jssummary005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary005.jpg)

<span style="color:red">由此我们可以通过类型.prototype去看他们的API，可以非常清楚的学习到方法的使用，这个可以作为当你忘记api时及时查找的方法</span>

![jssummary006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary006.jpg)

> <span style="color:red">关于原型链：当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它的__proto__隐式原型上查找，即它的构造函数的prototype，如果还没有找到就会再在构造函数的prototype的__proto__中查找，这样一层一层向上查找就会形成一个链式结构，我们称为原型链</span>

看Person函数的原型链:

![jssummary007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary007.jpg)

> 由图所知实例person会通过__proto__这个属性找到Person.prototype,再由Person.prototype.__proto__往上寻找，一直到null为止,从而形成了一条明显的长链.

#### 五、手写函数
##### 5.1 new
###### 原理

- 1.new关键字会首先创建一个空对象
- 2.将这个空对象的原型对象指向构造函数的原型属性，从而继承原型上的方法
- 3.将this指向这个空对象，执行构造函数中的代码，以获取私有属性
- 4.如果构造函数返回了一个对象res，就将该返回值res返回，如果返回值不是对象，就将创建的对象返回

###### 写法

ES5写法

```
function _new(target){
  var obj = {},
      params = [].splice.call(arguments,1),
      result;

  obj.__proto__ = target.prototype;
  result = target.apply(obj,params);

  if(result!=null && /(function|object)/.test(typeof result)){
    return result;
  }
  return obj;
}
```

ES6写法

```
function _new(target，...params){
  let obj = Object.create(target.prototype),
  	  result = target.call(obj,...params);
  if(result!=null && /^(function|object)$/.test(typeof result)){
    return result;
  }
  return obj;
}
```

##### 5.2 call
###### 原理

- 给CONTEXT设置一个属性(属性名尽可能保持唯一,避免我们自己设置的属性修改默认对象中的结构,例如可以基于Symbol实现,也可以创建一个时间戳名字),属性值一定是我们要执行的函数(也就是THIS,CALL中的THIS就是我们要操作的这个函数)
- 接下来基于CONTEXT.XXX()成员访问执行方法，就可以把函数执行，并且改变里面的THIS(还可以把PARAMS中的信息传递给这个函数即可);都处理完了，别忘记把给CONTEXT设置的这个属性删除掉(人家之前没有你自己加，加完了我们需要把它删了)

###### 写法

```
Function.prototype.call = function(context,...params){
  let key = Symbol('key'),//设置唯一值
      result;
  !/^(object|function)$/.test(typeof context) ? context = Object(context) :null;
  context !=null ? null : context = window;//如果context为null或者undefined，直接赋值为window

  context[key] = this;
  result = context[key](...params);//返回值
  delete context[key];
  return result;
}
```

##### 5.3 apply
###### 原理

- 基本与call一样，但后面参数应该为数组

###### 写法

```
Function.prototype.apply = function(context,params = []){
  let key = Symbol('key'),
      result;
  !/^(object|function)$/.test(typeof context) ? context = Object(context) :null;
  context !=null ? null : context = window;

  context[key] = this;
  result = context[key](...params);
  delete context[key];
  return result;
}
```

##### 5.4 bind
###### 原理

- bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。
- 当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
- 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

###### 写法

```
Function.prototype.bind = function(context,...params){
	let self = this;
    return funtion(...innerArgs){
    	params = params.concat(...innerArgs);
        return self.call(context,...params);
    }
}
```

##### 5.5 防抖
###### 思路

- 在当前点击完成后，我们等wait这么长的时间，看是否还会触发第二次，如果没有触发第二次，属于非频繁操作，我们直接执行想要执行的函数func：如果触发了第二次，则以前的不算了，从当前这次再开始等待...

###### 写法

```
/*
      防抖:
        @params:
          func[function]:最后要触发执行的函数
          wait[number]:频繁设定的界限
          immediate[boolean]:默认多次操作，我们识别的是最后一次，但是immediate=true，让其识别第一次
        @return
          可以被调用执行的函数
 */
function debounce(func,wait = 300,immediate = false){
      let timer = null;
      return function anonymous(...params){
        let now = immediate && !timer;

        //每次点击都把之前设置的定时器清除掉
        clearInterval(timer)
        //重新设置一个新的定时器监听wait事件内是否触发第二次
        timer = setTimeout(() => {
          timer = null;//垃圾回收机制
          //wait这么久的等待中，没有触发第二次
          !immediate ? func.call(this,...params) : null;
        }, wait);

        //如果是立即执行
        now ? func.call(this,...params) : null;
      }
}
```

##### 5.6 节流
###### 思路

- 函数节流：在一段频繁操作中，可以触发多次，但是触发的频率由自己指定

###### 写法

```
/*
      @params:
          func[function]:最后要触发执行的函数
          wait[number]:触发的频率
        @return
          可以被调用执行的函数
*/
function throttle(func,wait = 300){
      let timer = null,
          previous = 0;//记录上一次操作时间
      return function anonymouse(...params){
        let now = new Date(),//记录当前时间
            remaining = wait - (now - previous);//记录还差多久达到我们一次触发的频率
        if(remaining <= 0){
          //两次操作的间隔时间已经超过wait了
          window.clearInterval(timer);
          timer = null;
          previous = now;
          func.call(this,...params);
        }else if(!timer){
          //两次操作的间隔时间还不符合触发的频率
          timer = setTimeout(() => {
            timer = null;
            previous = new Date();
            func.call(this,...params);
          }, remaining);
        }
      }
}
```

##### 5.7 浅拷贝

###### 数组的浅拷贝

**数组的slice方法**

```
let arr = [1,2,3]
let newArr = arr.slice();
```

**concat**

```
let arr = [1,2,3]
let newArr = arr.concat();
```

###### 对象浅拷贝

```
function clone(obj){
      var type = toType(obj);
      if(/^(boolean|number|string|null|undefined|bigInt|symbol)$/.test(type)) return obj;
      if(/^(regExp|date)$/.test(type)) return new obj.constructor(obj);
      if(/^(function)$/.test(obj)) return function(){
        obj()
      };
      if(/^error$/.test(type))return new obj.constructor(obj.message);
      var target = {},
          keys = this.getOwnProperty(obj); 
      Array.isArray(target) ? target = [] : null;
      
     keys.forEach(item=>{
       target[item] = obj[item]
     })
      return target
}
```

##### 5.8 深拷贝

运用JSON.stringify+JSON.parse

<span style="color:red">[注意]这个方法有缺陷:</span>

- <span style="color:red">正则会被处理为空对象</span>
- <span style="color:red">具备函数/symbol/undefined属性值直接被干掉</span>
- <span style="color:red">BigInt还处理不了，会报错</span>
- <span style="color:red">日期对象最后还是字符串</span>

```
let obj = {
      a:1,
      b:/^$/,
      c:undefined,
      d:new Date()
}
console.log(JSON.parse(JSON.stringify(obj)));
```

![jssummary008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary008.jpg)

手写深克隆

```
function deepClone(obj,cache = new Set()){//深克隆 cache处理self属性，防止死递归
      //只有数组和对象我们再处理深克隆，其余的按照浅克隆
      let type = toType(obj);
      if(!/^(array|object)$/.test(type)) return this.clone(obj);

      if(cache.has(obj)) return obj;
      cache.add(obj);

      let keys = this.getOwnProperty(obj),
        clone = {};
      type === "array" ? clone = [] : null;

      keys.forEach(key=>{
        clone[key] = this.deepClone(obj[key],cache)
      })
      return clone
}
```

##### 5.9 instanceof

```
function _instanceof(L,R){    
    // 验证如果为基本数据类型，就直接返回false
    const baseType = ['string', 'number','boolean','undefined','symbol']
    if(baseType.includes(typeof(L))) { return false }
    
    let RP  = R.prototype;  //取 R 的显示原型
    L = L.__proto__;       //取 L 的隐式原型
    while(true){           // 无线循环的写法（也可以使 for(;;) ）
        if(L === null){    //找到最顶层
            return false;
        }
        if(L === RP){       //严格相等
            return true;
        }
        L = L.__proto__;  //没找到继续向上一层原型链查找
    }
}
```

##### 5.10 数组扁平化
###### flat方法实现

```
let arr = [1,2,[3,4,[5,[6]]]]
console.log(arr.flat(Infinity))//flat参数为指定要提取嵌套数组的结构深度，默认值为 1
```

###### reduce实现

```
function fn(arr){
   return arr.reduce((prev,cur)=>{
      return prev.concat(Array.isArray(cur)?fn(cur):cur)
   },[])
}
```

#### 六、事件
##### 6.1 定义

> 关于事件，我们认为事件是可以被Javascript侦测到的行为，通俗的讲就是当用户与Web页面进行某些交互时，解释器就会创建响应的event对象以描述事件信息。【注意：事件并不是你自己添加才有的，而是浏览器自带的】

##### 6.2 事件的绑定

###### 直接在html中定义事件

```
<button onclick="console.log(1)">点我</button>
```

![jssummary009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary009.jpg)

<span style="color:red">缺点：违反了内容与行为相分离的原则，在html中写js代码，强耦合，不利于复用代码。不推荐</span>

###### DOM0级事件

```
let btn = document.querySelector(".btn");
btn.onclick = function(){
	console.log(1);
}
```

<span style="color:red">缺点:解决了强耦合性，但只能给一个事件对象绑定一个事件类型。 同样的事件类型，绑定两次，以 后一次 为准。</span>

###### DOM2级事件

```
let btn = document.querySelector(".btn");
btn.addEventListener("click",function(){
	console.log(1);
},false)//默认值为false，可不写，false表示冒泡
```

<span style="color:red">同样的事件类型，绑定多次，每个都会执行，可以设置时捕获还是冒泡。</span>

##### 6.3 冒泡与捕获

- 事件冒泡即事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点
- 事件捕获思想是不太具体的DOM节点应该更早接收到事件，而最具体的节点应该最后接收到事件

###### 事件冒泡

```
<div class="my">click me</div>
如果你点击了页面中的<div>元素，那么这个click事件会按照如下顺序传播:
1.<div>
2.<body>
3.<html>
4.document
```

![jssummary010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary010.jpg)

###### 事件捕获

```
<div class="my">click me</div>
如果你点击了页面中的<div>元素，那么这个click事件会按照如下顺序传播:
1.document
2.<html>
3.<body>
4.<div>
```

![jssummary011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary011.jpg)

##### 6.4 事件流

> 事件流包括三个阶段:事件捕获阶段，处于捕获阶段，事件冒泡阶段

![jssummary012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary012.jpg)



<br/>
<br/>
<br/>
<br/>

[转载自：https://juejin.im/post/6895930107139981325](https://juejin.im/post/6895930107139981325)