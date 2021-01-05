---
title: js重点知识-23-Proxy与Reflect
date: 2021-01-05 10:25:05
top: true
tags:
- proxy
- reflect
categories:
- JavaScript
---
### 一、Proxy
<!--more-->
如果我们想要监视某个对象中的属性读写，我们可以使用ES5中提供的Object.defineProperty这样的方法来去为我们的对象添加属性，这样的话我们就可以捕获到我们对象中属性的读写过程。

这种方法实际上运用的非常广泛，在Vue3.0以前的版本就是使用这样的一个方法来去实现的数据响应，从而完成双向数据绑定。

在ES2015当中全新设计了一个叫做Proxy类型，他就是专门为对象设置访问代理器的，那如果你不理解什么是代理可以想象成门卫，也就是说不管你进去那东西还是往里放东西都必须要经过这样一个代理。

通过Proxy就可以轻松监视到对象的读写过程，相比于defineProperty，Proxy他的功能要更为强大甚至使用起来也更为方便，那下面我们具体来看如何去使用Proxy。

这里我们定义一个person对象，我们通过new Proxy的方式来去为我们的person来创建一个代理对象。

Proxy构造函数的第一个参数就是我们需要代理的对象，这里是person，第二个参数也是一个对象，我们可以把这个对象称之为代理的处理对象，这个对象中可以通过get方法来去监视属性的访问，通过set方法来去介绍对象当中设置属性这样的一个过程。

```js
const person = {
    name: 'yd',
    age: 18
}

const personProxy = new Proxy(person, {
    get() {},
    set() {}
})

```

我们先来看get方法，这个方法最简单可以接收两个参数，第一个就是所代理的目标对象，第二个就是外部所访问的这个属性的属性名。这个方法的返回值将会作为外部去访问这个属性得到的结果。

```js
{
    get(target, property) {
        console.log(target, property);
        return property in target ? target[property] : undefined;
    }
}
```

我们再来看下set方法，这个方法默认接收三个参数, 分别是代理目标对象，以及我们要写入的属性名称还有最后我们要写入的属性值。

我们可以做一些校验，比如说如果设置的是age，他的值就必须是整数，否则就抛错。

```js
{
    set(target, property, value) {
        console.log(target, property, value);
        if (property === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError(``${value} must be a integer);
            }
        }
        target[property] = value;
    }
}
```

以上就是Proxy的一些基本用法，在以后Proxy会用的越来越多，Vue3.0开始就开始使用Proxy去实现内部的数据响应了。

### 二、Proxy 对比 defineProperty

了解了Proxy的基本用法过后接下来我们再深入探讨一下相比于Object.defineProperty, Proxy到底有哪些优势。

首先最明显的优势就是在于Proxy要更为强大一些，那这个强大具体体现在Object.defineProperty只能监听到对象属性的读取或者是写入，而Proxy除读写外还可以监听对象中属性的删除，对对象当中方法的调用等等。

这里我们为person对象定义一个Proxy对象，在Proxy对象的处理对象中的外的添加一个deleteProperty的代理方法，这个方法会在外部对当前这个代理对象进行delete操作时会自动执行。

这个方法同样接收两个参数，分别是代理目标对象和所要删除的这个属性的名称。

```js
const person = {
    name: 'yd',
    age: 18
}

const personProxy = new Proxy(person, {
    deleteProperty(target, property) {
        console.log(target, property);
        delete target[property];
    },
})
```

这是Object.defineProperty无法做到的, 除了delete以外, 还有很多其他的对象操作都能够被监视到，列举如下。

- get: 读取某个属性

- set: 写入某个属性

- has: in 操作符调用

- deleteProperty: delete操作符调用

- getProperty: Object.getPropertypeOf()

- setProperty: Object.setProtoTypeOf()

- isExtensible: Object.isExtensible()

- preventExtensions: Object.preventExtensions()

- getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor()

- defineProperty: Object.defineProperty()

- ownKeys: Object.keys(), Object.getOwnPropertyNames(), Object.getOwnPropertSymbols()

- apply: 调用一个函数

- construct: 用new调用一个函数。

接下来我们来看第二点优势就是对于数组对象进行监视。

通常我们想要监视数组的变化，基本要依靠重写数组方法，这也是Vue的实现方式，proxy可以直接监视数组的变化。以往我们想要通过Object.defineProperty去监视数组的操作最常见的方式是重写数组的操作方法，这也是Vue.js中所使用的方式，大体的方式就是通过自定义的方法去覆盖掉数组原型对象上的push，shift之类的方法，以此来劫持对应的方法调用的过程。

我们这里来看如何直接使用Proxy对象来对数组进行监视。这里我们定义一个list数组，然后对这个list数组进行Proxy监视。

在这个Proxy对象的处理对象上我们去添加一个set方法，用于监视数据的写入，在这个方法的内部我们打印参数的值，然后再target对象上设置传入的值，最后返回一个true表示写入成功。

这样我们再外部对数组的写入都会被监视到，例如我们这里通过push向数组中添加值。

```js
const list = [];
const listproxy = new Proxy(list, {
    set(target, property, value) {
        console.log(target, property, value);
        target[property] = value;
        return true; // 写入成功
    }
});

listproxy.push(100);
```

Proxy内部会自动根据push操作推断出来他所处的下标，每次添加或者设置都会定位到对应的下标property。

数组其他的也谢操作方式都是类似的，我们这里就不再演示了。这就是Proxy对数组的一个监视。他的功能还是非常强大的，这一点如果我们放在Object.defineProperty上要想去实现的话就会特别的麻烦。

最后相比于Object.defineProperty还有一点优势就是，Proxy是以非入侵的方式监管了对象的读写，那也就是说一个已经定义好的对象我们不需要对对象本身去做任何的操作，就可以监视到他内部成员的读写，而defineProperty的方式就要求我们必须按特定的方式单独去定义对象当中那些被监视的属性。

对于一个已经存在的对象我们要想去监视他的属性我们需要做很多额外的操作。这个优势实际上需要有大量的使用然后在这个过程当中去慢慢的体会。

### 三、Reflect

Reflect是ECMAScript2015中提供的一个全新的内置对象，如果按照java或者c#这类语言的说法，Reflect属于一个静态类，也就是说他不能通过new的方式去构建一个实例对象。只能够去调用这个静态类中的静态方法。

这一点应该并不陌生，因为在javascript中的Math对象也是相同的，Reflect内部封装了一系列对对象的底层操作，具体一共提供了14个静态方法，其中有1个已经被废弃掉了，那还剩下13个，仔细去查看Reflect的文档你会发现这13个方法的方法名与Proxy的处理对象里面的方法成员是完全一致的。

其实这些方法就是Proxy处理对象那些方法内部的默认实现，你可能觉得这句话不是很好理解，我们这里来用代码说明一下。

这里我们定义一个proxy对象。只是proxy处理对象中什么也没有写，通过前面的介绍我们可以知道，我们可以在这个proxy处理对象中去添加不同的方法成员来去监听对象所对应的操作。

```js
const obj = {
    foo: '123',
    bar: '456',
}

const proxy = new Proxy(obj, {

})
```

如果说我们没有添加具体的处理方法例如get或者set，那他内部这些get或者set是怎样执行的呢？其实proxy处理对象内部默认实现的逻辑就是调用了Reflect对象当中所对应的方法。

那也就是说，我们没有定义get方法就等同于是定义了一个get方法，在内部将参数原封不动的交给Reflect的get方法，结果是一样的。

```js
const proxy = new Proxy(obj, {
    get(target, property) {
        return Reflect.get(target, property);
    }
})
```

那这也就表明我们在实现自定义的get或者set这样的逻辑时更标准的做法是，先去实现自己所需要的监视逻辑，最后再去返回通过Reflect中对应的方法的一个调用结果。

```js
const proxy = new Proxy(obj, {
    get(target, property) {
        console.log('实现监视逻辑');
        return Reflect.get(target, property);
    }
})
```

Reflect对象的用法其实很简单，mdn上实际上已经有了非常清晰的介绍，但是大多数人接触到这个对象的第一个感觉就是为什么要有Reflect这样一个对象。也就是说他的价值具体体现在什么地方。

个人认为Reflect对象最大的意义就是他提供了一套统一操作Object的API，因为在这之前我们去操作对象时有可能使用Object对象上的方法，也有可能使用像delete或者是in这样的操作符，这些对于新手来说实在是太乱了，并没有什么规律。

Reflect对象就很好的解决了这样一个问题，他统一了对象的操作方式，我们可以通过几个简单的例子来看一下。

这里我们先定义一个obj对象，然后在对象当中定义name和age。按照传统的方式如果我们需要判断这个对象中是否存在某个属性，我们需要使用in这个语句，用到in操作符，删除name属性我们需要使用到delete语句。而如果说我们需要获取对象中所有的属性名，那有需要去使用Object.keys这样的方法。

```js
const obj = {
    name: 'yd',
    age: 18,
}

console.log('name' in obj);
console.log(delete obj['age']);
console.log(Object.keys(obj));
```

那也就是说我们同样都是去操作这个对象，但是我们一会需要用操作符的方式，一会又需要用到某一个对象当中的方法。

换做现在Reflect对象就提供了一个统一的方式，那我们去判断这个对象当中是否存在某一个属性我们可以使用Reflect.has方法。

```js
console.log(Reflect.has(obj, 'name'));
```

删除一个属性我们可以使用deleteProperty方法。

```js
console.log(Reflect.deleteProperty(obj, 'age'));
```

对于想要获取对象中所有的属性名我们可以使用ownKeys方法，那这样的一种体验也会更为合理一点，当然这只是个人的一个感悟，这个还是需要个人多多体会。

```js
console.log(Reflect.ownKeys(obj));
```

需要注意的一点是，目前以前的那些对象的操作方式还是可以使用的，但是ECMAScript他希望经过一段时间的过渡过后以后的标准中就会把之前的那些方法把他给废弃掉。
所以我觉得我们现在就应该去了解这13个方法以及他们各自取代的用法。这些内容在mdn上都有完整的描述，我们这里就不重复了。

