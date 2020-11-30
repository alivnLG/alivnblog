---
title: 当浏览器切换到其他标签页或者最小化时，你的js定时器还准时吗？
date: 2020-11-30 11:15:46
tags:
- 定时器
categories:
- 浏览器
---

#### 一、前言

关于js定时器，setInterval和setTimeout，作为我们日常开发经常使用到的方法，大家一定非常熟悉。比如下面一个例子：
<!--more-->
```js
setInterval(() => {
  console.log('1');
}, 500);
```

作为刚学前端没多久的新人也能知道，这段代码就是每过500ms打印一次1（实际运行还需要考虑js的宏任务和微任务的执行时间，定时器的间隔时间是500ms，但是定时器中的方法触发可能需要在宏任务队列中排队，不一定会在500ms的时候触发，关于Event Loop的基础内容不在本文讨论之内）。

但是如果你把浏览器从当前页面切换到另一个标签页，或者把浏览器最小化了，这时候，这个页面定时器的间隔时间还是500ms？

#### 二、浏览器可见和不可见状态

浏览器的可见和不可见状态的切换会触发visibilitychange事件，我们可以通过监听这个事件来判别浏览器的可见状态。

```js
document.addEventListener("visibilitychange", function() {
  console.log(document.visibilityState);
});
```

document.visibilityState有三个值

- hidden：页面彻底不可见。
- visible：页面至少一部分可见。
- prerender：页面即将或正在渲染，处于不可见状态。

这里重点关注hidden这个值，当我们浏览器切换当前页面到另外一个标签页或者把浏览器最小化的时候，document.visibilityState就会是hidden值。我们也可以使用document.hidden，它返回一个布尔值，为true的时候，说明当前浏览器是不可见状态。

#### 三、setInterval

我们先来测试setInterval，代码如下

```js
<button id="btn">开始计时</button>

// 兼容ie写法
document.getElementById('btn').addEventListener('click', function() {
  setInterval(function() {
    const myDate = new Date();
    const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
    // 每次循环打印当前时间
    console.log(currentDate);
  }, 500);
});

// 浏览器可见状态切换事件
document.addEventListener('visibilitychange', function() { 
  if(document.hidden) {
    console.log('页面不可见');
  }
});
```

定时器间隔是500ms，先来看下谷歌浏览器

![browser012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser012.jpg)

我们发现，当页面不可见之后，定时器的间隔变成了1s。 接下来，我们把定时器间隔改成2s来试下。

![browser013](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser013.jpg)

前后间隔时间一致。

接下来测试一下火狐和ie。这里列出的图片都是500ms和2s的例子。

![browser014](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser014.jpg)

![browser015](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser015.jpg)

ie浏览器

![browser016](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser016.jpg)

经过大量的测试，可以得出结论，谷歌浏览器中，当页面处于不可见状态时，setInterval的最小间隔时间会被限制为1s。火狐浏览器的setInterval和谷歌特性一致，但是ie浏览器没有对不可见状态时的setInterval进行性能优化，不可见前后间隔时间不变。

#### 四、setTimeout

接下来是setTimeout

```js
function timer() {
  setTimeout(function() {
    const myDate = new Date();
    const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
    console.log(currentDate);
    timer();
  }, 500)
}
// 兼容ie写法
document.getElementById('btn').addEventListener('click', function() {
  timer();
});
```

同样先来看看在谷歌浏览器中的表现（还是500ms和2s）

![browser017](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser017.jpg)

![browser018](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser018.jpg)

我们发现在谷歌浏览器中，500ms的间隔，setTimeout和setInterval表现一致，都是最小间隔限制为1s。但是2s隔间的测试结果出现了分歧，页面不可见之后，间隔变成了3s。继续经过多次的测试，如下，左图的间隔时间为990ms，右图的间隔时间为1s。

![browser019](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser019.jpg)

![browser020](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser020.jpg)

不可见状态下，左图中的990ms间隔时间变为1s，右图中的1s间隔时间变为2s。

我们再来看看火狐（500ms和2s）

![browser021](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser021.jpg)

![browser022](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser022.jpg)

火狐浏览器不可见状态下,左图中的500ms变为1s，右图中的2s保持不变。

再来看看ie浏览器(500ms)

![browser023](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser023.jpg)

一样毫无优化。

我们可以得出结论，在谷歌浏览器中，setTimeout在浏览器不可见状态下间隔低于1s的会变为1s，大于等于1s的会变成N+1s的间隔值。火狐浏览器下setTimeout的最小间隔时间会变为1s,大于等于1s的间隔不变。ie浏览器在不可见状态前后的间隔时间不变。

#### 五、requestAnimationFrame

raf是浏览器提供的一个更流畅的处理动画的方法，它会在下次浏览器GUI绘制页面的时候运行传入的方法。GUI绘制页面的频率跟显示器的刷新率有关，普通显示器的刷新率是60hz，因此raf在一秒之内需要运行60次，间隔四舍五入大概是17ms。

```js
function timer() {
  const myDate = new Date();
  const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
  console.log(currentDate);
  window.requestAnimationFrame(timer)
}
// 兼容ie写法
document.getElementById('btn').addEventListener('click', function() {
  timer();
});
```

我们来看看不同浏览器下面的表现：

谷歌浏览器

![browser024](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser024.jpg)

火狐浏览器

![browser025](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser025.jpg)

ie浏览器

![browser026](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser026.jpg)

我们可以发现，谷歌浏览器和ie浏览器当浏览器状态为不可见时，raf方法将停止执行。火狐浏览器当状态变为不可见时，会在间隔是1s,2s,4s,8s,16s,32s...这样的顺序下去执行raf方法。

#### 六、总结

谷歌浏览器中，当页面处于不可见状态时，setInterval的最小间隔时间会被限制为1s。火狐浏览器的setInterval和谷歌特性一致。ie浏览器没有对不可见状态时的setInterval进行性能优化，不可见前后间隔时间不变。

在谷歌浏览器中，setTimeout在浏览器不可见状态下间隔低于1s的会变为1s，大于等于1s的会变成N+1s的间隔值。火狐浏览器下setTimeout的最小间隔时间会变为1s,大于等于1s的间隔不变。ie浏览器在不可见状态前后的间隔时间不变。

谷歌浏览器和ie浏览器当浏览器状态为不可见时，raf方法将停止执行。火狐浏览器当状态变为不可见时，会在间隔是1s,2s,4s,8s,16s,32s...这样的顺序下去执行raf方法。

#### 七、解决方案

碰到问题当然需要解决，在一些定时器小于1s的倒计时的页面中，如果用户切换到了其他标签页。再切回去的时候，页面上显示的倒计时时间其实是错误的，这种隐藏的bug会带来很大的风险。该怎么解决呢？

除了调取后台接口或者websocket连接之外，其实有一个更好的解决方案，webWorkers。而且webWorkers还可以解决一个页面存在多个定时器时候间隔时间误差较大的问题。

```js
document.getElementById('btn').addEventListener('click', function() {
  var w = new Worker('demo_workers.js');
  w.onmessage = function(event){
    console.log(event.data);
  };
});
//浏览器切换事件
document.addEventListener('visibilitychange', function() { 
  if(document.hidden) {
    console.log('页面不可见');
  }
});
```

```js
// demo_workers.js
setInterval(function() {
  const myDate = new Date();
  const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
  postMessage(currentDate);
}, 500);
```

实际结果

![browser027](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser027.jpg)

![browser028](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/browser028.jpg)

通过计算时差也可以有效的解决

```js
const _setInterval = (fn, delay, ...rest) => {
  let lastTime = Date.now();
  return setInterval(() => {
    let now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = lastTime + delay;
      fn(...rest);
    }
  }, 1);
};

const timer = _setInterval(() => {
  console.log('执行了')
}, 500)
```

最后不需要时清除定时器。

<br/>
<br/>
<br/>

转载自：[https://juejin.cn/post/6899796711401586695](https://juejin.cn/post/6899796711401586695)
