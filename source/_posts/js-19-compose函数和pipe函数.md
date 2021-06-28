---
title: js-19-compose函数和pipe函数
date: 2021-01-05 10:24:59
top: true
tags:
- compose
- pipe
categories:
- JavaScript
---
### 一、compose函数
<!--more-->
当我们遇到

```js
const fn1 = x => x*2 ,  fn2 = x => x+3 , fn3 = x =>x-1 
```

想要把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果,如果不通过compose函数处理，则是

```js
fn3(fn2(fn1(x)))
```

这样看起来非常不美观。因此我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数）

```js
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

compose函数可以将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。

```js
const calculate = x => (x + 10) * 10;
let res = calculate(10);
console.log(res);    // 200
```

函数式编程，可以将复杂的几个步骤拆成几个简单的可复用的简单步骤

```js
const add = x => x + 10;
const multiply = x => x * 10;

// 我们的计算改为两个函数的嵌套计算，add函数的返回值作为multiply函数的参数
let res = multiply(add(10));
console.log(res);    // 结果还是200
```

上面的计算方法就是函数的嵌套执行，而我们compose的作用就是将嵌套执行的方法作为参数平铺，嵌套执行的时候，里面的方法也就是右边的方法最开始执行，然后往左边返回，我们的compose方法也是从右边的参数开始执行，所以我们的目标就很明确了，我们需要一个像这样的compose方法：

```js
// 参数从右往左执行，所以multiply在前，add在后
let res = compose(multiply, add)(10);
```

compose方法要借助Array.prototype.reduce，这个方法会从左往右迭代，但是我们需要的是从右往左迭代，这个方法是Array.prototype.reduceRight

```js
const compose = function(){
  // 将接收的参数存到一个数组， args == [multiply, add]
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduceRight((res, cb) => cb(res), x);
  }
}

// 我们来验证下这个方法
let calculate = compose(multiply, add);
let res = calculate(10);
console.log(res);    // 结果还是200
```

ES6写法

```js
const compose = (...args) => x => args.reduceRight((res, cb) => cb(res), x);
```

Redux的中间件就是用compose实现的，webpack中loader的加载顺序也是从右往左，这是因为他也是compose实现的。

### 二、pipe函数

pipe函数跟compose函数的作用是一样的，也是将参数平铺，只不过他的顺序是从左往右。我们来实现下，只需要将reduceRight改成reduce就行了；

```js
const pipe = function(){
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduce((res, cb) => cb(res), x);
  }
}

// 参数顺序改为从左往右
let calculate = pipe(add, multiply);
let res = calculate(10);
console.log(res);    // 结果还是200
```

ES6写法

```js
const pipe = (...args) => x => args.reduce((res, cb) => cb(res), x)
```
