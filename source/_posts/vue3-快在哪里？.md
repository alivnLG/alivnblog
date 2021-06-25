---
title: vue3-快在哪里？
date: 2021-06-25 16:20:14
top: true
tags:
- VUE
categories:
- VUE
---
#### 一、PatchFlag(静态标记)
<!--more-->
**Vue 2.x 中的虚拟 DOM 是全量对比的模式，而到了 Vue 3.0 开始，新增了静态标记（PatchFlag）。**

在更新前的节点进行对比的时候，只会去对比带有静态标记的节点。并且 PatchFlag 枚举定义了十几种类型，用以更精确的定位需要对比节点的类型。下面我们通过图文实例分析这个对比的过程。

假设我们有下面一段代码：

```html
<div>
  <p>老八食堂</p>
  <p>{{ message }}</p>
</div>
```

在 Vue 2.x 的全量对比模式下，如下图所示：

![vuethree001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree001.jpg)

通过上图，我们发现，Vue 2.x 的 diff 算法将每个标签都比较了一次，最后发现带有 {{ message }} 变量的标签是需要被更新的标签，显然这还有优化的空间。

在 Vue 3.0 中，对 diff 算法进行了优化，在创建虚拟 DOM 时，根据 DOM 内容是否会发生变化，而给予相对应类型的静态标记（PatchFlag），如下图所示：

![vuethree002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree002.jpg)

观察上图，不难发现视图的更新只对带有 flag 标记的标签进行了对比（diff），所以只进行了 1 次比较，而相同情况下，Vue 2.x 则进行了 3 次比较。这便是 Vue 3.0 比 Vue2.x 性能好的第一个原因。
我们再通过把模板代码转译成虚拟 DOM，来验证我们上述的分析是否正确。我们可以打开[模板转化网站](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3E%5Cn%20%20%3Cp%3EHello%20World!%3C%2Fp%3E%5Cn%20%20%3Cspan%3E%7B%7Bwqeqw%7D%7D%3C%2Fspan%3E%5Cn%3C%2Fdiv%3E%22%2C%22ssr%22%3Afalse%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Atrue%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22inline%22%3Afalse%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup-const%22%2C%22setupRef%22%3A%22setup-ref%22%2C%22setupConst%22%3A%22setup-const%22%2C%22setupLet%22%3A%22setup-let%22%2C%22setupMaybeRef%22%3A%22setup-maybe-ref%22%2C%22setupProp%22%3A%22props%22%2C%22vMySetupDir%22%3A%22setup-const%22%7D%7D%7D)，对上述代码进行转译：

![vuethree003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree003.jpg)

上图蓝色框内为转译后的虚拟 DOM 节点，第一个 P 标签为写死的静态文字，而第二个 P 标签则为绑定的变量，所以打上了 1 标签，代表的是 TEXT（文字），标记枚举类型如下：

```js
export const enum PatchFlags {
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}
```

#### 二、hoistStatic(静态提升)

我们平时在开发过程中写函数的时候，定义一些写死的变量时，都会将变量提升出去定义，如下所示：

```js
const PAGE_SIZE = 10
function getData () {
	$.get('/data', {
  	data: {
    	page: PAGE_SIZE
    },
    ...
  })
}
```

诸如上述代码，如果将 PAGE_SIZE = 10 写在 getData 方法内，每次调用 getData 都会重新定义一次变量。

Vue 3.0 在这方面也做了同样的优化，继续用我们上一个例子写的代码，观察编译之后的虚拟 DOM 结构，如下所示：

没有做静态提升前：

![vuethree004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree004.jpg)

选择 Option 下的 hoistStatic：

![vuethree005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree005.jpg)

静态提升后：

![vuethree006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree006.jpg)

细心的同学会发现， 老八食堂 被提到了 render 函数外，每次渲染的时候只要取 _hoisted_1 变量便可。认真看文章的同学又会发现一个细节， _hoisted_1 被打上了 PatchFlag ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用作 Diff。也就是说被打上 -1 标记的，将不在参与 Diff 算法，这又提升了 Vue 的性能。

#### 三、cacheHandler(事件监听缓存)

默认情况下 @click 事件被认为是动态变量，所以每次更新视图的时候都会追踪它的变化。但是正常情况下，我们的 @click 事件在视图渲染前和渲染后，都是同一个事件，基本上不需要去追踪它的变化，所以 Vue 3.0 对此作出了相应的优化叫事件监听缓存，我们在上述代码中加一段：

```js
<div>
  <p @click="handleClick">屋里一giao</p>
</div>
```

编译后如下图所示（还未开启 cacheHandler）：

![vuethree007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree007.jpg)

在未开启事件监听缓存的情况下，我们看到这串代码编译后被静态标记为 8，之前讲解过被静态标记的标签就会被拉去做比较，而静态标记 8 对应的是“动态属性，不包括类名和样式”。 @click 被认为是动态属性，所以我们需要开启 Options 下的 cacheHandler 属性，如下图所示：

![vuethree008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree008.jpg)

细心的同学又会发现，开启 cacheHandler 之后，编译后的代码已经没有静态标记（PatchFlag），也就表明图中 P 标签不再被追踪比较变化，进而提升了 Vue 的性能。

#### 四、SSR 服务端渲染

当你在开发中使用 SSR 开发时，Vue 3.0 会将静态标签直接转化为文本，相比 React 先将 jsx 转化为虚拟 DOM，再将虚拟 DOM 转化为 HTML，Vue 3.0 已经赢了。

![vuethree009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree009.jpg)

#### 五、StaticNode(静态节点)

上述 SSR 服务端渲染，会将静态标签直接转化为文本。在客户端渲染的时候，只要标签嵌套得足够多，编译时也会将其转化为 HTML 字符串，如下图所示：

![vuethree010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree010.jpg)

**需要开启 Options 下的 hoistStatic**

#### 六、其他资料

[Vue3.0 中文文档](https://v3.cn.vuejs.org/guide/introduction.html)

[Vue3.0 源码学习](https://vue3js.cn/start/)

<br/>
<br/>
<br/>

转载自：[https://juejin.cn/post/6903171037211557895]()