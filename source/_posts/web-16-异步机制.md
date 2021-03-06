---
title: web-16-异步机制
date: 2021-01-05 11:53:08
top: true
tags:
categories:
- 前端综合
---
### 一、js异步机制

####  1.1 同步与异步
<!--more-->
![web001](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/web001.jpg)
*同步*  

如果在函数返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的。
```
//在函数返回时，获得了预期值，即2的平方根
Math.sqrt(2);
//在函数返回时，获得了预期的效果，即在控制台上打印了'hello'
console.log('hello');
```
如果函数是同步的，即使调用函数执行的任务比较耗时，也会一直等待直到得到预期结果。

*异步*

如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。
```
//读取文件
fs.readFile('hello.txt', 'utf8', function(err, data) {
    console.log(data);
});
//网络请求
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = xxx; // 添加回调函数
xhr.open('GET', url);
xhr.send(); // 发起函数
```
如果函数是异步的，发出调用之后，马上返回，但是不会马上返回预期结果。调用者不必主动等待，当被调用者得到结果之后会通过回调函数主动通知调用者。

#### 1.2 单线程与多线程
![web002](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/web002.jpg)

JavaScript是单线程

JavaScript其实就是一门语言，说是单线程还是多线程得结合具体运行环境。

浏览器的内核是多线程的；

虽然JavaScript是单线程的，可是浏览器内部不是单线程的。一些I/O操作、定时器的计时和事件监听（click, keydown...）等都是由浏览器提供的其他线程来完成的。

#### 1.3 消息队列与事件循环
通过以上了解，可以知道其实JavaScript也是通过JS引擎线程与浏览器中其他线程交互协作实现异步。但是回调函数具体何时加入到JS引擎线程中执行？执行顺序是怎么样的？

需要继续了解消息队列和事件循环

![web003](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/web003.jpg)

如上图所示，左边的栈存储的是同步任务，就是那些能立即执行、不耗时的任务，如变量和函数的初始化、事件的绑定等等那些不需要回调函数的操作都可归为这一类。

右边的堆用来存储声明的变量、对象。下面的队列就是消息队列，一旦某个异步任务有了响应就会被推入队列中。如用户的点击事件、浏览器收到服务的响应和setTimeout中待执行的事件，每个异步任务都和回调函数相关联。

JS引擎线程用来执行栈中的同步任务，当所有同步任务执行完毕后，栈被清空，然后读取消息队列中的一个待处理任务，并把相关回调函数压入栈中，单线程开始执行新的同步任务。

JS引擎线程从消息队列中读取任务是不断循环的，每次栈被清空后，都会在消息队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫事件循环。

![web004](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/web004.jpg)

上图以AJAX异步请求为例，发起异步任务后，由AJAX线程执行耗时的异步操作，而JS引擎线程继续执行堆中的其他同步任务，直到堆中的所有异步任务执行完毕。然后，从消息队列中依次按照顺序取出消息作为一个同步任务在JS引擎线程中执行，那么AJAX的回调函数就会在某一时刻被调用执行。
