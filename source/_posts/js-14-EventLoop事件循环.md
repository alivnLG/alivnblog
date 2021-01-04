---
title: js重点知识-14-EventLoop事件循环
date: 2021-01-04 15:30:43
top: true
tags:
- 事件循环
- 宏任务
- 微任务
categories:
- JavaScript
---
### 一、同步模式异步模式
<!--more-->
想要了解事件循环，我们首先要说明白JavaScript的同步模式和异步模式。

众所周知，目前主流的javaScript环境，都是以单线程的模式去执行的javaScript代码，那javaScript采用单线程工作的原因与他最早的设计初衷有关。

最早javaScript这门语言就是一门运行在浏览器端的脚本语言，那他的目的是为了实现页面上的动态交互。

而实现页面交互的核心就是dom操作，那这也就决定了，他必须使用单线程模型，否则就会出现很复杂的线程同步问题。

我们可以设想一下，假定我们在javaScript中同时有多个线程一起工作，那其中一个线程修改了某一个dom元素，而另外一个线程同时又删除了这个元素，那此时我们的浏览器就无法明确，改以哪一个线程的工作结果为准。

所以说为了避免这种线程同步的问题，从一开始javaScript就被设计成了单线程模式工作，那这也就成为了这门语言最为核心的特性之一。

那这里所说的单线程指的就是，在js的执行环境当中，负责执行代码的线程只有一个。

那你可以想象成，在我们的内部只有一个人按照我们的代码去执行任务。那只有一个人，他同时也就只能执行一个任务，那如果说有多个任务的话就必须要排队，然后一个一个依次去完成。

那这种模式他最大的优点就是，更安全，更简单，那缺点也同样很明显，如果说我们遇到一个特别耗时的任务，那后面的这些任务呢，都必须要去排队，等待这个任务的结束。

```js
console.log('foo');

for (let i = 0; i < 100000; i++) {
    console.log('耗时操作');
}

console.log('等待耗时操作结束');
```

那这也就会导致我们整个程序的执行会被拖延，出现假死的情况。
那为了解决耗时任务阻塞执行的这种问题，javaScript语言将任务的执行模式分成了两种。分别是同步模式(Synchronous)和异步模式(Asynchronous)。
这里我们就了解了JS在执行的时候是分为同步任务和异步任务。上面的循环例子并不准确，一般我们的异步任务指的都是ajax请求或者定时器。

### 二、任务队列

理解了事件循环的概念，我们来继续看看任务队列，**所谓任务队列，其实就是保存待处理任务的一个数组**

![jsEventLoop002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jsEventLoop002.jpg)

每当我们要执行一个新的任务（例如：定时器），我们就会在队列尾部添加一个task，等到当前任务完成，事件循环会去队列头部寻找下一个可执行任务.

### 三、事件循环

在事件循环中有两个比较重要的概念，分别叫做宏任务和微任务。宏任务和微任务都是指代异步任务。

我们都知道JavaScript是自上而下执行的，在执行过程中涉及到执行栈和任务队列两个东西。执行中的代码会放在执行栈中执行，宏任务和微任务会放在任务队列中等待执行。

比如下面的一段代码，js自上而下执行，首先声明变量name并且赋值为yd，然后执行setTimeout定时器，由于setTimeout是一个异步任务，所以setTimeout中的函数会延时执行，这里就会将这个定时器中的函数放入到任务队列中等待1s。

代码继续向下执行, 打印出name的值，由于此时异步函数还没有执行，所以打印出来的值仍然是yd。

1s之后，浏览器中挂载的定时器到了执行时机并且开始触发，就会将任务队列中的setTimeout中的函数放入到执行栈中执行name='zd'操作。

```js
let name = 'yd';

setTimeout(function() {
    name = 'zd';
}, 1000);

console.log(name);
```

上面代码的执行机制比较简单，js首先自上而下执行，当遇到异步任务会将任务加入到任务队列当中，等到当前js栈执行完毕，再去检查任务队列中是否存在可以被执行的任务，如果存在就把任务从队列中取出来放入到执行栈中执行。

### 四、宏任务

浏览器为了能够使js的内部task与DOM任务有序的执行，会在前一个task执行完毕结束后，在下一个task执行开始前，对页面进行重新渲染（render），这里说的task就是指宏任务。

- task -> rander -> task

浏览器中宏任务一般包括:

- **setTimeout, setInterval**
- **MessageChannel**

消息通道, 兼容性不太好，实例如下。

```js
const channel = new MessageChannel();
// 在端口号上添加消息, 发送消息
channel.port1.postMessage('我爱你');
// 注册接收事件, 后绑定的接收函数，还是可以接收的到，所以可以看出是异步执行
channel.post2.onmessage = function(e) {
    console.log(e.data);
};
console.log('hello'); // 先走的hello，后出现我爱你.
```

- **postMessage**

消息通信机制

- **setImmediate**

立即执行定时器，不可以设置时间, 只在IE浏览器中实现了。

```js
setImmediate(function() {
    console.log('立即执行定时器，不可以设置时间')
})
```

以上几种就是常见的宏任务，**其实宏任务中还包含点击事件等机制。**

### 五、微任务

任务通常来说就是在当前task执行结束后立即执行的任务，比如对一系列动作做出反馈，或者是需要异步的执行任务但是又不需要分配一个新的task,这样便可以减小一点性能的开销。

只要执行栈中没有其他JS代码正在执行或者每个宏任务执行完，微任务队列会立即执行。

如果在微任务执行期间微任务队列中加入了新的微任务，就会把这个新的微任务加入到队列的尾部，之后也会被执行。

微任务包括:

- **promise.then**

Promise的then方法就是一个微任务。

- **async await**

sync函数的await之后的内容也是以微任务的形式来执行。

- **MutationObserver**

MutationObserver的作用是监控dom变化，dom变化了就会执行, 时间节点是等待所有代码都执行完，才执行该监控

```js
const observer = new MutationObserver(() => {
    console.log('节点已经更新');
    console.log(document.getElementById('app').children.length);
});
observer.observe(document.getElementById('app'), {
    'childList': true,
});
for (let i = 0; i < 20; i++) {
    document.getElementById('app').appendChild(document.createElement('p'));
}
for (let i = 0; i < 20; i++) {
    document.getElementById('app').appendChild(document.createElement('span'));
}
```

### 六、EventLoop

我们通过下面代码的执行顺序来说明白事件循环。

```js

setTimeout(() => {
    console.log('timeout');
}, 0);

Promise.resolve().then(data => {
    console.log('then');
});

console.log('start');
```

首先我们知道js代码是自上而下开始执行，首先遇到setTimeout，setTimeout会立即被执行，但他的执行结果会产生一个异步宏任务，放入到宏任务队列中，等待一定的时间后执行，这里设置的0秒，但是0秒也不会立即执行，因为任务队列是一定要等到当前执行栈执行完毕才会考虑执行的。

接着代码执行到Promise.resolve().then这里，这句代码并不是任务代码所以会立即被执行，不过Promise.then会产生一个微任务放入到微任务队列当中等待主执行栈执行完毕执行。

代码继续向下执行console.log('start')，打印出start，执行栈执行完毕。

这时我们知道宏任务队列中存在console.log('timeout');因为定时器时间为0所以已经到了执行的时机，微任务队列中console.log('then');也到了执行时机，那他们谁先被执行呢?

JavaScript执行机制很简单，主栈执行完成之后，会执行微任务队列，先进入的微任务先执行，所有微任务执行完毕后，也就是微任务队列被清空之后再开始检查宏任务队列。将需要执行的宏任务执行掉。

所以这里会先打印出then，再打印出timeout。

**<span style="color:red">总结一句话就是: 先执行同步代码，再执行微任务，再检查宏任务是否到达时间，到达时间再执行。</span>**

我们知道主执行栈执行完毕之后会清空微任务队列，也就是所有的微任务全部被执行，那如果多个宏任务到达执行时机会如何执行呢？比如下面的代码。

setTimeout首先创建了一个宏任务，宏任务中又创建了一个Promise.resolve().then微任务。然后接着Promise.resolve().then又创建了一个宏任务。我们来看一下这段打印顺序如何。

```js
setTimeout(() => {
    console.log('timeout1');
    Promise.resolve().then(data => {
        console.log('then1');
    });
}, 0);

Promise.resolve().then(data => {
    console.log('then2');
    setTimeout(() => {
        console.log('timeout2');
    }, 0);
});
```

我们慢慢来分析，首先setTimeout执行结束后创建了一个宏任务，放入到宏任务队列中。这个任务并没有执行，所以内部的Promise也不会执行，代码继续向下。

执行到下面的Promise创建了一个微任务，放入到微任务队列中。

```js
// setTimeout(() => {
    console.log('timeout1');
    Promise.resolve().then(data => {
        console.log('then1');
    });
// }, 0);

// Promise.resolve().then(data => {
    console.log('then2');
    setTimeout(() => {
        console.log('timeout2');
    }, 0);
// });
```

此时宏任务队列中存在一个宏任务，微任务队列中存在一个微任务，这两个任务都到了执行时机。前面我们说过主执行栈执行完毕会先清空微任务，所以会将微任务拿到执行栈中执行。这里会打印then2，然后执行setTimeout生成一个新的宏任务，加入到宏任务队列中。微任务执行完毕。

此时宏任务队列中存在两个任务，由于定时器时间都是0，所以他们都到了执行时机。队列的机制是先加入的先执行，所以这里会将第一个加入的任务也就是上面的setTimeout拿到执行栈中执行，会打印timeout1，然后又创建了一个Promise.then的微任务。

这时宏任务队列中存在一个console.log('timeout2');任务，微任务队列中存在一个console.log('then1');任务。

根据前面的经验可知，执行栈执行完毕之后，会清空微任务队列，所以这里并不会继续执行第二个宏任务，而是再次清空微任务队列。打印then1。微任务执行完毕之后，再去宏任务中拿出需要执行的宏任务放入执行栈中执行，打印timeout2。

所以上面代码的打印顺序是 then2 -> timeout1 -> then1 -> timeout2

**<span style="color:red">事件循环的执行顺序说起来也比较简单。首先JavaScript代码从上到下执行没遇到定时器等宏任务会将任务放在宏任务队列中，遇到Promise.then等微任务会将任务放入到微任务队列中。等到主执行栈中的代码执行完毕，会清空微任务队列，先加入的先执行后加入的后执行，然后再去检查宏任务队列，将可执行的宏任务拿到执行栈中执行，每次只取出一个宏任务，执行完毕再次清空微任务队列，清空完毕再去检查宏任务队列，以此类推。</span>**

### 七、面试题

```js
const p = new Promise(function(resolve, reject){
    reject();
    resolve();
});
p.then(function() {
    console.log('成功');
}, function() {
    console.log('失败');
});

// 失败
```

```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});
promise.then(() => {
    console.log(3);
});

// 1， 2， 3
```

```js
Promise.resolve(1)
.then(res => 2)
.catch(err => 3)
.then(res => console.log(res));

// 2
```

```js
Promise.resolve(1)
.then((x) => x + 1)
.then(x => { throw new Error('My Error')})
.catch(() => 1)
.then(x => x + 1)
.then(x => console.log(x))
.catch(console.error);

// 2
```

```js

setTimeout(function() {
    console.log(1);
}, 0);

new Promise(function(resolve) {
    console.log(2);
    for (var i = 0; i < 10; i++) {
        i == 9 && resolve();
    }
    console.log(3);
}).then(function() {
    console.log(4);
});

console.log(5); 

// 2， 3， 5， 4， 1
```

```js

async function async1() {
    console.log('async1 start');
    await async2();
};

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});

console.log('script end2');

// script start，async1 start，async2， promise1，script end2，promise2， setTimeout
```

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
 
async function async2() {
  console.log('async2')
}
 
console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
}, 0)
 
async1(); 
   
new Promise( function( resolve ) {
 console.log('promise1')
 resolve();
}).then( function() {
 console.log('promise2')
})
```

### 八、总结

- 事件循环：JS采用单线程的事件循环方式管理异步任务，优点是简化编程模型，缺点是无法发挥CPU的全部性能（但对前端其实没影响）

- 任务队列：JS采用非抢断式运行，当前任务不会被打断，有新的异步任务时，会放入任务队列

- 宏任务、微任务：宏任务就是普通异步任务，是最早出现的，微任务更关乎用户体验，所以得到优先执行

- 常见宏任务：定时器、IO任务

- 常见微任务：queueMicrotask、await、then

javascript是一门单线程语言

Event Loop是javascript的执行机制

