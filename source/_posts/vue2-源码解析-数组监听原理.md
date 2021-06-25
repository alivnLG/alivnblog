---
title: vue2-源码解析-数组监听原理
date: 2020-10-10 14:38:46
tags:
categories:
- VUE
---
### 一、vue中数组监听原理 

通过建立原型拦截器，首先数组能够修改自身的方法有push,pop,shift,unshift,splice,sort,resverse,通过重新定义上述方法中的内容，来实现调用上述方法时触发依赖，从而通知监听该数组的订阅者执行相应的更新函数。对数据添加属性描述符中的getter与setter存取描述符实现劫持。

```js
var obj = { __x: 1 };
Object.defineProperty(obj, "x", {
    set: function(x){ console.log("watch"); this.__x = x; },
    get: function(){ return this.__x; }
});
obj.x = 11; // watch
console.log(obj.x); // 11
```

但是Object.defineProperty()中的setter是无法直接实现数组中值的改变的劫持行为的，想要实现对于数组下标直接访问的劫持需要使用索引对每一个值进行劫持，但是在Vue中考虑性能问题并未采用这种方式，所以需要特殊处理数组的变动。

最小化的实现代码：

```js
const arrayPrtot = Array.prototype
const arrayMethods = Object.create(arrayPrtot);
const orig = arrayPrtot.push;//缓存原始方法
Object.defineProperty(arrayMethods, 'push', {
    value: function mutator(...args) {
        console.log('我使用了push改变了数组哦')
        return orig.apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true
})
var arr = [];
arr.__proto__ = arrayMethods;//给需要监听的数组加上拦截器
arr.push(1);
console.log(arr);
```
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

控制台输出：

![vue003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue003.jpg)

vue实现的源码：

```js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
 
import { def } from '../util/index'
 
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
 
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
 
/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```

实现原理图：

![vue004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue004.jpg)

**重赋值**  
Object.defineProperty()方法无法劫持对于数组值下标方式访问的值的改变，这样的话就需要避免这种访问，可以采用修改后再赋值的方式，也可以采用数组中的一些方法去形成一个新数组，数组中不改变原数组并返回一个新数组的方法有slice、concat等方法以及spread操作符，当然也可以使用map方法生成新数组，此外在Vue中由于重写了splice方法，也可以使用splice方法进行视图的更新。

```js
var obj = { __x: [1, 2, 3] };
Object.defineProperty(obj, "x", {
    set: function(x){ console.log("watch"); this.__x = x; },
    get: function(){ return this.__x; }
});
obj.x[0] = 11;
obj.x = obj.x; // watch
console.log(obj.x); // [11, 2, 3]
```

**Proxy**  
Vue3.0使用Proxy实现数据劫持，Object.defineProperty只能监听属性，而Proxy能监听整个对象，通过调用new Proxy()，可以创建一个代理用来替代另一个对象被称为目标，这个代理对目标对象进行了虚拟，因此该代理与该目标对象表面上可以被当作同一个对象来对待。代理允许拦截在目标对象上的底层操作，而这原本是Js引擎的内部能力，拦截行为使用了一个能够响应特定操作的函数，即通过Proxy去对一个对象进行代理之后，我们将得到一个和被代理对象几乎完全一样的对象，并且可以从底层实现对这个对象进行完全的监控。

```js
var target = [1, 2, 3];
var proxy = new Proxy(target, {
    set: function(target, key, value, receiver){ 
        console.log("watch");
        return Reflect.set(target, key, value, receiver);
    },
    get: function(target, key, receiver){ 
        return target[key];
    }
});
```

