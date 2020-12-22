---
title: js重点知识-7-原型-构造函数-实例
date: 2020-12-22 11:51:57
tags:
- 原型
categories:
- JavaScript
---
### 一、定义

> 原型(prototype): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个JavaScript对象中都包含一个__proto__ (非标准)的属性指向它爹(该对象的原型)，可obj.__proto__进行访问。

关于原型：

- 1.所有引用类型都有一个__proto__(隐式原型)属性，属性值是一个普通的对象
- 2.所有函数都有一个prototype(原型)属性，属性值是一个普通的对象
- 3.所有引用类型的__proto__属性指向它构造函数的prototype

```js
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

> 构造函数: 可以通过new来 新建一个对象 的函数。

> 实例: 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向原型，通过constructor指向构造函数。

示例：

```js
// 实例
const instance = new Object()
```

则此时， 实例为instance, 构造函数为Object，我们知道，构造函数拥有一个prototype的属性指向原型，因此原型为:

```js
// 原型
const prototype = Object.prototype
```

### 二、原型、构造函数、实例三者关系

```js
实例.__proto__ === 原型

原型.constructor === 构造函数

构造函数.prototype === 原型

// 这条线其实是是基于原型进行获取的，可以理解成一条基于原型的映射线

// 例如: 

// const o = new Object()

// o.constructor === Object   --> true

// o.__proto__ = null;

// o.constructor === Object   --> false

// 注意: 其实实例上并不是真正有 constructor 这个指针，它其实是从原型链上获取的

// instance.hasOwnProperty('constructor') === false

实例.constructor === 构造函数
```

![interviewKnowledge002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/interviewKnowledge002.jpg)

### 三、原型链

原型链是由原型对象组成，每个对象都有 __proto__ 属性，指向了创建该对象的构造函数的原型，__proto__ 将对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

- 属性查找机制: 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象Object.prototype，如还是没找到，则输出 undefined；

- 属性修改机制: 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: b.prototype.x = 2；但是这样会造成所有继承于该对象的实例的属性发生改变。

关于原型链：当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它的__proto__隐式原型上查找，即它的构造函数的prototype，如果还没有找到就会再在构造函数的prototype的__proto__中查找，这样一层一层向上查找就会形成一个链式结构，我们称为原型链

看Person函数的原型链:

![jssummary007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jssummary007.jpg)

> 由图所知实例person会通过__proto__这个属性找到Person.prototype,再由Person.prototype.__proto__往上寻找，一直到null为止,从而形成了一条明显的长链.

### 四、总结
```js
//构造函数
function Female(name){
     this.name = name;
    this.sex = 'female';  
 }
 ```

创建实例

```js
var person1 = new Female("Summer")
```

构造函数Female就是实例对象person1的原型

构造函数可以设置prototype属性，这个属性就指向原型对象，用作共享属性和方法

实例对象的属性和方法一般分为两种：一种是自身的，一种是引用自prototype的。

每当代码读取某个对象的某个属性的时候，都会执行一次搜索。首先从对象实例本身开始，如果在实例中找到了该属性，则返回该属性的值，如果没有找到，则顺着原型链指针向上，到原型对象中去找，如果如果找到就返回该属性值。

> js里完全依靠"原型链"(prototype chain)模式来实现继承
> proto：事实上就是原型链指针！！
> prototype：上面说到这个是指向原型对象的
> constructor：每一个原型对象都包含一个指向构造函数的指针，就是constructor

为了实现继承，proto会指向上一层的原型对象，而上一层的结构依然类似，那么就利用proto一直指向Object的原型对象上！Object.prototype.__proto__ = null;表示到达最顶端。如此形成了原型链继承。

在js里，继承机制是原型继承。继承的起点是 对象的原型（Object prototype）。

一切皆为对象，只要是对象，就会有 proto 属性，该属性存储了指向其构造的指针。

Object prototype也是对象，其 proto 指向null。

对象分为两种：函数对象和普通对象，只有函数对象拥有『原型』对象（prototype）。

prototype的本质是普通对象。

Function prototype比较特殊，是没有prototype的函数对象。
new操作得到的对象是普通对象。

当调取一个对象的属性时，会先在本身查找，若无，就根据 proto 找到构造原型，若无，继续往上找。最后会到达顶层Object prototype，它的 proto 指向null，均无结果则返回undefined，结束。

由 proto 串起的路径就是『原型链』。



