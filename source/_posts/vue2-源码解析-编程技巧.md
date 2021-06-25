---
title: vue2-源码解析-编程技巧
date: 2020-10-10 14:38:48
tags:
- vue源码
categories:
- VUE
---
#### 1.获取HTML格式的字符串中非标签文本(vue/src/compiler/parser/entity-decoder.js)
假设字符串
<!--more-->
```
var html = '<span class="red">hello world</span> <span>hello xxx</span>'
```

提取其中非标签的文本

- 既然这个字符串是HTML文本格式，我们就可以把它解析成对应的HTML元素。
- HTML元素的textContent属性可以用来获取HTML元素中的文本内容。

```
/* @flow */

let decoder

export default {
  decode (html: string): string {
    decoder = decoder || document.createElement('div')
    decoder.innerHTML = html
    return decoder.textContent
  }
}
```

#### 2.确定运行环境(vue/src/core/util/env.js)
JavaScript代码可以运行在多种环境中

```
const inBrowser = typeof window !== 'undefined'
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
const isIE = UA && /msie|trident/.test(UA)
const isIE9 = UA && UA.indexOf('msie 9.0') > 0
const isEdge = UA && UA.indexOf('edge/') > 0
const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
const isPhantomJS = UA && /phantomjs/.test(UA)
const isFF = UA && UA.match(/firefox\/(\d+)/)
```

#### 3.确定一个函数是不是用户自定义的(vue/src/core/util/env.js)
一般我们使用的就两种函数，环境提供给我们的跟我们用户自己定义的，这两种函数在转换成字符串时表现形式是不同的：

```
Array.isArray.toString() // "function isArray() { [native code] }"
function fn(){} 
fn.toString() // "function fn(){}"
```

环境自带函数调用toString方法后总是会返回类似function fnName() { [native code] }格式的字符串，我们可以利用这一点来区分函数类型：

```
function isNative (Ctor){
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
```

#### 4.实现只执行一次的函数(vue/src/shared/util.js)
```
function once (fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

#### 5.缓存函数执行结果(vue/src/shared/util.js)
有时候函数执行比较耗时，可以缓存执行的结果。当后续被调用时，如果参数相同，我们可以跳过计算直接返回结果。我们需要的就是实现一个cached函数，这个函数接受实际被调用的函数作为参数，然后返回一个包装的函数。在这个cached函数里，我们可以用一个对象或者Map来缓存结果。

```
function cached(fn){
  const cache = Object.create(null);
  return function cachedFn (str) {
    if ( !cache[str] ) {
        let result = fn(str);
        cache[str] = result;
    }
    return cache[str]
  }
}
```

#### 6.转换命名风格(vue/src/shared/util.js)
```
const camelizeRE = /-(\w)/g
const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
camelize('a-b-c')
// "aBC"
```

#### 7.确定对象的类型(vue/src/shared/util.js)
在JavaScript中，有六种基本类型(Boolean, Number, String, Null, Undefined, Symbol)跟一个对象类型，但其实对象类型是可以细分到许多类型的，一个对象可以是数组，也可以是函数等等。

我们可以利用Object.prototype.toString把一个对象转换成一个字符串，如果是我们用{}创建的对象，这个方法总是返回[object Object]。
```
function isPlainObject (obj){
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```

![vue013.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue013.jpg)

而对于数组，正则表达式等环境自带的对象类型，它们会返回不同的结果。

![vue014.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue014.jpg)

Object.prototype.toString()的返回值总是以[object tag]的形式出现，如果我们只想要这个tag，我们可以把其他东西剔除掉，这边比较简单用正则或者String.prototype.slice()都可以。

```
function toRawType (value) {
    const _toString = Object.prototype.toString
    return _toString.call(value).slice(8, -1)
}
toRawType(null) // "Null"
toRawType(/sdfsd/) //"RegExp"
```

#### 8.把值转换成字符串(vue/src/shared/util.js)
有两种方式来得到字符串：

- String()
- JSON.stringify()

不过这两种方式的实现机制是不同的：

![vue015.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue015.jpg)

我们里看到，他们是基于完全不同的规则去转换字符串的，String(arg)会尝试调用arg.toString()或者arg.valueOf()，那么那我们该用哪个比较好？

- 对于null跟undefined，我们希望把它转成空字符串
- 当转换一个数组或者我们创建的对象时，我们会使用JSON.stringify
- 如果对象的toString方法被重写了，那我们会偏向使用String()
- 其它情况下，一般都用String()

为了匹配上面的需求，Vue开发者是这么实现的：

```
function isPlainObject (obj){
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function toString (val) {
  if(val === null || val === undefined) return ''
if (Array.isArray(val)) return JSON.stringify(val)
if (isPlainObject(val) && val.toString === Object.prototype.toString)
    return JSON.stringify(val)
  return String(val)
}
```