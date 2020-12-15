---
title: vue3.0解析-上
date: 2020-11-24 17:15:24
top: true
tags:
- VUE
categories:
- VUE
---
### 一、重写的动机
重写的动机主要分为两点：
<!--more-->
- **使用新的JS原生特性**
- **解决设计和体系架构的缺陷**

#### 1.1 使用新的JS原生特性

随着前端标准化的发展，目前主流浏览器对很多JS新特性都普遍支持了，其中一些新特性不仅解决了很多技术上的实现难题，还带来了更好的性能提升。

在Vue3中，最重要也更为人所知的就是ES6的Proxy。

Proxy不仅消除了Vue2中现有的限制（比如对象新属性的增加、数组元素的直接修改不会触发响应式机制，这也是很多新手以为所谓的bug），而且有着更好的性能：

我们知道，在Vue2中对数据的侦听劫持是在组件初始化时去遍历递归一个对象，给其中的每一个属性用Object.defineProperty设置它的getter和setter，然后再把处理好的这些对象挂到组件实例的this上面，所以这种方式的数据侦听是在属性层面的，这也是为什么增加对象属性无法被监听的原因，同时这种初始化的操作对于CPU来说还是比较昂贵的一个操作。对于javascript而言，一个对象肯定越稳定越小性能就越好。

使用Proxy之后组件的初始化就不需要这么做这么费时的操作了，因为Proxy就是真正意义给一个对象包上一层代理从而去完成数据侦听劫持的操作，所以总的来说这个复杂度是直接少了一个数量级的。只要你对这个代理后的对象访问或修改里面的东西都能被这层代理所感知到，进而去动态地决定返回什么东西给你，并且也不再需要把选项的这些东西再重复挂到组件实例的this上面，因为你访问的时候是有这个信息知道你访问的东西是属于props还是data还是其他的，vue只需要根据这个信息去对应的数据结构里面拿出来就可以了，单就这一点而言你就可以感觉到组件的内存占用已经少了一半。

由于proxy是在对象层面上的代理，所以你在对象上新增属性是可以被代理到的。

另外Proxy还可以代理数组，所以就算你直接修改数组里面的元素也是可以被代理到的。

但是，对于传统的浏览器——IE，就连IE11也还没有支持Proxy这个东西，又由于Proxy是原生的ES6特性，所以目前还无法通过polyfill来兼容IE（Vue3也正在做这一块的兼容）.....这个东西也确实拿他没辙，否则当初React升级到15、Vue2.X也不会抛弃IE8了。尤大在去年的VueConf上还很形象地吐槽了IE——百足之虫，死而不僵。

#### 1.2 解决设计和体系架构的缺陷

随着Vue2使用和维护过程，逐渐暴露出来了一些设计和体系架构上的缺陷，主要有：

- **框架内部模块的耦合问题**

- **TypeScript的支持不好**

- **对于大规模应用的开发体验不好**

那么在Vue3中是如何逐一解决这些问题的？

##### 1.2.1 解耦内部包

首先，看过Vue2源码的朋友们应该比较深有感触，单一地理解框架源码是非常痛苦的。

这个表现为各个模块内部的高度耦合和看上去似乎不属于任何地方的浮动代码的隐式耦合，这也让源码的维护和扩展在社区中变得困难重重。

也由于内部模块的耦合，对于一些资深的高级用户（比如库作者）在构建更高级别的渲染器时不得不把整个框架的代码引入进来。我们在看Vue2源码的时候或许会注意到里面还有Weex，这个是由于Weex是与Vue官方合作的一个多端渲染框架，而Vue2中为了支持这个能力又受限于现有架构，不得不分叉代码库并且复制大量的框架代码进去，更惨的像mpVue这种非官方合作的，就只能手动拉整个Vue的分支代码下来。

为了解决这个问题，Vue3重写时采用了monorepo的设置，把原来的各个模块拆分出来，整个框架再由这些低耦合的内部包组成，每个包都有自己的API、类型定义、测试程序等等。一方面让开发人员可以更容易地阅读、理解甚至可以放心地大范围修改这些模块包。

另一方面还给予了用户将其中的一些包单独拿出去用的能力，比如你可以把reactivity这个包也就是响应式系统拿出去用于需要用到响应式的场景，也可以用这个包去搭一个自己的玩具框架等等都是可以的。

##### 1.2.2 使用TypeScript重写以及设计类型友好的新API

讲到TypeScript，这应该也是我们比较关注的一个问题。

首先Vue2最初是使用纯JS写成的，但后来意识到一个类型系统将对这样大型规模的项目是非常必要的，尤其体现在重构或者扩展，类型检查将很大程度地减少这个过程中引入意外错误的机会，也让更多代码贡献者可以更大胆放心地进行大范围的更改。

所以Vue2当时引入了Facebook的Flow进行静态类型检查，一方面是因为它可以渐进地添加到现有的纯JS项目中，但可惜的是Flow虽然有一定的帮助但是并没有期望中那么香，最离谱的是谁能想到连Flow自己也都烂尾了，可以上Flow的官网看看，这玩意到现在还是0.X的版本，相比TypeScript的飞速发展以及TS与开发工具的深度集成尤其是VSCode，Flow真的是一言难尽好吧。不可否认，尤大自己也说自己当初是压错宝了。

也由于TS的蓬勃发展，越来越多的用户也在Vue中使用TS，而对Vue来说，同时支持两个类型系统是一件比较麻烦的事情，并且在类型推导上变得非常困难。如果源代码切换到TS也就没那么多屁事了。

其次，之所以Vue2对TS的支持一塌糊涂，也是因为Options API与类型系统之间是存在断层的。

Vue的API设计开始并没有针对语言本身的机制和类型系统去设计，部分原因也是Vue开始写的时候js中甚至还没有类型系统这个玩意。

vue组件实例本质上就是个包含了一个个描述组件选项属性的对象，这种设计的好处就是更符合人类的直觉，所以这也是为什么它对于新手来说更好理解和容易上手。

但是这种设计的缺陷就是跟TypeScript这样的类型系统存在一个“断层”，这个断层怎么说呢，对于不用类型系统只关注业务逻辑的用户来说是感知不到的。

Vue2中的optionsAPI是一个看似面向对象但是实际上却有一定偏差，这就导致了它不够类型友好，尤其是对于选项来说，类型推导是比较困难的。

但这个断层其实也是双向的：你可以说是optionsAPI的设计不够类型友好，也可以说TS还不够强大不能给Vue提供足够好的类型支持。

举个栗子，正如JSX一开始也是没有类型支持的，完全是因为TypeScript强行给加了一整套针对JSX的类型推导机制才给了TSX现在的开发体验。所以可以这么理解，如果TypeScript当时因为JSX不属于真正的JS规范而不给它提供支持，是不是也可以说React的设计跟类型系统存在着断层呢？

那么如何在Vue中去抹平这个断层呢？一个很直接的方法就是重新设计一个类型友好的API。这个方法说起来很简单，但是对Vue来说改一个API是需要考虑很多东西的：

- 与原有API的兼容性：能否同时支持新旧API？旧的用户又如何升级？像Angular2当时那样直接改的面目全非当然比较简单，但说直接点就是不管旧版本用户的死活，下场大家也清楚。现在主流的框架大版本升级都开始在版本兼容上足够重视或者下了大功夫，比如十月份正式发布的React17，这个版本没有任何新的用户层面的API，但其中一个有意思的新特性就是让一个React应用可以同时加载多个React版本，使得旧版本可以逐步升级。

- 如何设计出既能提供良好的类型推导，又不让类型推导而做的设计影响到非TS用户的开发体验？如何在TS和非TS的使用体验中做到一个最好的平衡和一致性？像Angular那样不管非TS的用户当然也是比较简单的，但是Vue不会这么做。

我们回顾一下Vue2里面是怎么去使用TypeScript的：

在Vue2中使用过TypeScript的话我们基本对这两个社区方案比较熟悉了——vue-class-component和vue-property-decorator。

这两个方案都是基于Class实现的，那么Vue3要做到类型友好，既然有了这么成熟的两个社区方案，在Vue3中继续沿用这个方向，基于Class设计出一个更好用的API不就简单完事了吗？

确实，在Vue3的原型阶段甚至已经实现了新的Class API，但是后面又把这个API给删了。因为class的水真的是太深了。

首先，Class API依赖于fields、decorators等提案，尤其是decorators的提案真的是太多坑了，我们可以看看github上TC39关于decorators提案的讨论和进度：[https://github.com/tc39/proposal-decorators](https://github.com/tc39/proposal-decorators)

这玩意目前仍有45个在讨论中的issue，在已关闭的167个issue中比较有意思的是之前V8团队出于性能考虑直接否决掉了decorators其中的一个提案，有个老哥在底下评论说球球不要因为这个提案也推翻之前的提案，因为社区中已经有很多人在使用了，比如Ember、Angular、Vue等等。

而decorators本身经历了这么长时间的争论，已经大改了好几次，但也仍然停留在stage2的阶段：

![vuethree011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree011.jpg)

stage2是什么概念？可以在TC39在About中贴出来的文档中看到：

![vuethree012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree012.jpg)

stage2意味着这个提案的东西随时可能会发生翻天覆地的变化，至少得进入stage3阶段才不会出现破坏性的改动。

那么现在TS里面的decorators还能用是因为TS实现的是decorators比较早期的一个版本，已经跟最新的decorators提案脱节了，期间decorators还经过了几次的大改。

另外，VueLoader里面用的Babel对decorators的实现和TS对decorators的实现又有不同，这在一些比较极端的用例里面可能就会踩坑了。

所以出于Class的复杂性和不确定性，这玩意在Vue3还是暂时不考虑了，并且Class API除了稍微好一点的类型支持以外也并没有带来其他的实用性。但是为了版本兼容，Vue3中也仍然会支持刚刚提到的两个社区方案。那么抛弃了Class API，要怎么去拥抱TypeScript呢？

事实上Class的本质就是一个函数，所以一个基于function的API同样可以做到类型友好，并且可以做得更好，尤其是函数中的参数和返回值都是对类型系统非常友好的，因此这个基于函数的API就应运而生了，也就是现在Vue3中的Composition API。

##### 1.2.3 解决开发大规模应用的需求

随着Vue被越来越广泛地采用，开发大型项目的需求也越来越多，对于这种类型的项目，首先需要的是一个像TypeScript这样的类型系统，还需要可以干净地组织可重用代码的能力。
巧妙的是，基于函数的Composition API，也叫做组合API，把这些需求全都给解决了，好家伙！对于Composition API我会在第三部分中再去进一步谈谈。

### 二、如何优化

#### 2.1 如何更快

- **Object.defineProperty => Proxy**

- **突破Virtual DOM瓶颈**

- **更多编译时优化**

- **Slot 默认编译为函数**

- **模板静态分析生成VNode优化标记——patchFlag**

##### 2.1.1 Object.defineProperty => Proxy

它不仅让内存占用变得更小，还让组件的初始化变得更快

我搬运了Vue3原型阶段和Vue2.5的一个初始化性能测试对比图，测试的benchmark是渲染3000个带状态的组件实例：

![vuethree013](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree013.jpg)

可以看到，内存占用仅仅为Vue2的一半，初始化的速度快了将近一倍。

但是，还不够！

这只是初始化，我们看看组件更新时的优化。

##### 2.1.2 突破Virtual DOM瓶颈

首先，我们看看传统的Virtual DOM 树是如何更新的：

![vuethree014](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree014.jpg)

当数据发生改变的时候，两棵vdom的树会进行diff比较，找到需要更新的节点再patch为实际的DOM更新到浏览器上。这个过程在Vue2中已经优化到了组件的粒度，通过渲染Watcher去准确找到需要更新的组件，将整个组件内的vdom tree进行diff。这个组件粒度的优化React也做到了，只不过这个优化的操作是交给了用户，比如利用pureComponeng、shouldComponentUpdate等等。

但组件的粒度还是相对比较粗的，于是Vue3重写了Virtual Dom，以利用模板的静态分析优势去将更新的粒度进一步缩小到动态元素甚至是动态的属性。

我们先看一个最简单的情况：

![vuethree015](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree015.jpg)

在传统的Virtual DOM下的diff过程：

![vuethree016](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree016.jpg)

我们可以看到，在这个模板下，整个组件节点的结构是固定不变的，而里面有夹杂很多完全静态的节点，只有一个节点的文本内容是动态的。而在传统的vdom下，仍然去遍历diff了这些完全不会发生变化的节点。虽然Vue2已经对这些完全静态的节点进行了优化标记以一种fastPath的方式去跳过这些静态节点的diff，但仍然存在一个遍历递归的过程。

那么在Vue3新的Virtual DOM下，会如何进行diff呢？

通过compiler对模板的静态分析，在优化模式下将静态的内容进行hosting，也就是把静态节点提升到外面去，实际生成vnode的就只有动态的元素<p class="text">{{ msg }}</p>，再分析这个元素内可能发生变化的东西，对这个元素打上patchFlag，表示这个元素可能发生变化的类型是文本内容textContent还是属性类class等等。

我们看看模板编译为render函数后的结果：

![vuethree017](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree017.jpg)

可以看到，完全静态的元素已经被提升到render函数上面去了，实际会创建vnode的就只有一个含有动态文本内容的p元素。

所以在新的Virtual DOM下，这个组件的diff过程就变成了：

![vuethree018](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree018.jpg)

肉眼可见的，这是一个数量级的优化。

那么刚刚说了，这是一个组件节点结构完全固定的情况，那么也就有另一种情况：动态节点。

而在Vue的模板中，出现动态节点的情况就只有两种：

- **v-if**

- **v-for**

先看v-if：

![vuethree019](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree019.jpg)

我们可以看到，在v-if内部，节点结构又是完全固定的，并且只有{{ msg }}是动态节点。所以如果把v-if划分为一个区块Block的话，又变成了我们上一个看的那种情况。因此，只要先将整个模板看作一个Block，然后以动态指令进行划分一个个嵌套的Block，每个Block就都变成最简单的那种情况了：

![vuethree020](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree020.jpg)

并且每个Block里面的动态元素只需要以一个简单的打平的数组去记录跟踪即可。所以diff的过程就只是遍历递归去找那些存在动态节点的Block，根据这些动态Block中的一个数组就可以完成diff的过程。

所以刚刚这个v-if的例子的新diff过程就是：

![vuethree021](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree021.jpg)

v-for也是相同的原理，将v-for划分为一个Block：

![vuethree022](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree022.jpg)

只有 v-for 是动态节点 ，每个 v-for 循环内部：只有 {{ item.message }} 是动态节点。它的diff过程：

![vuethree023](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree023.jpg)

**总结：**

![vuethree024](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree024.jpg)

- **将模版基于动态节点指令切割为嵌套的区块**
- **每个区块内部的节点结构是固定的**
- **每个区块只需要以一个平面数组追踪自身包含的动态节点**

所以Virtual DOM的更新性能从与模板整体大小相关，提升到了只与动态内容的数量相关：

![vuethree025](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree025.jpg)

##### 2.1.3 更多编译时的优化

- **Slot默认编译为函数**

   这个让使用插槽的父子组件之间的更新关系不再强耦合

- **利用模板静态分析对vnode生成的类型标记——patchFlag**

  这一点我们刚刚也讲到了，对于pacthFlag的定义，我们可以去源码中看看（为了方便截图，我删了部分的注释，以及标注了前几个的类型的二进制值出来）：

![vuethree026](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree026.jpg)

  << 就是左移操作符，我们可以看到一共有十个动态的类型，每个类型的数值都是在1的基础上移动不同位数得到的，所以一个十一位的二进制数就描述了vnode的动态类型。并且尤大非常友好地告诉我们了这个怎么用：

![vuethree027](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree027.jpg)

vnode的patchFlag通过 | 操作符去组合起来，vnode的patchFlag和某个特定类型所代表的patchFlag就用 & 操作符计算一下，如果得到的结果为0，则说明这个vnode的这个类型的属性是不会变的，不为0则相反。还引导了你去renderer.ts下看看怎么使用的，不过他的路径似乎有点问题....我看的是packages/runtime-core/src/renderer.ts。

经过了这么层层优化，Vue3究竟有多快？

我去vue3.0 release时给出的数据docs.google.com/spreadsheet… 中搬运了过来：

![vuethree028](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree028.jpg)

可以看到，与Vue2相比，Vue 3在bundle包大小减少41%、初始渲染快了55%、更新快了133% 和内存使用 减少54% 。

#### 2.2 如何更小

最主要的就是充分利用了Tree-shaking的特性，那么什么是Tree-shaking呢? 中文翻译过来就是抖树，我们来看看它的工作原理：

MDN上对Tree shaking的描述：

![vuethree029](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree029.jpg)

什么意思呢？为了更好地体会到它的作用，我们先看看两种export的写法：

第一种：

```js
const msgA = 'hhhh'

const msgB = 777

const funcA = () => {
    console.log('AAA')
}

const funcB = () => {
    console.log('BBB')
}

export default{
    msgA,
    msgB,
    funcA,
    funcB
};
```

第二种：

```js
export const msgA = 'hhhh'

export const msgB = 777

export const funcA = () => {
    console.log('AAA')
}

export const funcB = () => {
    console.log('BBB')
}
```

然后我在main.ts中分别引入并使用这两个模块：

第一种：

```js
import TreeShaking1 from "@/benchmarks/TreeShaking1"

console.log(TreeShaking1.msgA)
TreeShaking1.funcA()
```

第二种：

```js
import {funcA,msgA} from "@/benchmarks/TreeShaking2"

console.log(msgA)
// funcA()
```

build以后生成的app.js bundle：

第一种：

![vuethree030](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree030.jpg)

第二种：

![vuethree031](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree031.jpg)

我们可以看到，tree shaking以后，进入bundle的只有被引入并且真正会被使用的代码块。在Vue3中许多渐进式的特性都使用了第二种的写法来进行重写，而且模板本身又是Tree shaking友好的。

但不是所有东西都可以被抖掉，有部分代码是对任何类型的应用程序都不可或缺的，我们把这些不可或缺的部分称之为基线大小，所以Vue3尽管增加了很多的新特性，但是被压缩后的基线大小只有10KB左右，甚至不到Vue2的一半。

我把刚刚的两个demo所在的项目build以后：

![vuethree032](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree032.jpg)

可以看到这个app.js的bundle只有9.68kb，这还是包括了router在内的，而以往Vue2构建出来的普遍都在20+kb以上。


<br/>
<br/>
<br/>

转载自：[https://juejin.cn/post/6898120355781705736](https://juejin.cn/post/6898120355781705736)