---
title: vue2-源码解析-patch算法/diff算法
date: 2020-10-10 14:38:42
tags:
categories:
- VUE
---
### 一、patch算法(diff算法)简介

（1）是什么

patch,中文翻译为“补丁”，vue更新时的patch算法，也就就是通过打补丁的形式充分利用原有的dom进行增加、删除、移动的操作，从而避免了重新创建大量dom操作，进一步提升了性能。

（2）当数据发生变化时，vue是怎么更新节点的

要知道渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排(回流)，有没有可能我们只更新我们修改的那一小块dom而不要更新整个dom呢？patch算法能够帮助我们。

我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上。

Vue中diff算法过程就是调用名为patch函数

（3）virtual DOM和真实DOM的区别？

virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。比如dom是这样的：

```
<div>
    <p>123</p>
</div>
```

对应的virtual DOM（伪代码）：

```
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```

（4）diff算法

**diff算法的比较时注意，只会在同级进行比较**

在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。

```
//old
<div>
    <p>123</p>
</div>

//new
<div>
    <span>456</span>
</div>
```

上面的代码会分别比较同一层的两个div以及第二层的p和span，但是不会拿div和span作比较。在别处看到的一张很形象的图：(diff算法只会在同级比较)

![vue006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue006.jpg)

**diff算法触发过程**

vue的双向绑定，是通过重置Object.defineProperty中的get和set方法来进行数据劫持，进而触发修改视图操作。（而React则是通过setState方法手动触发修改视图的操作的).
所以当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch方法给真实的DOM打补丁，更新相应的视图。

![vue007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue007.jpg)

**patch算法的具体算法**

第一步，patch函数接收两个参数oldVnode和Vnode分别代表新旧节点的对象（形如：Vnode={type:’’,props:{},children:[ ]}）

```
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
        }
    }
    // some code 
    return vnode
}
```

第二步，根据sameVnode方法，判断两节点是否值得比较，值得比较则执行patchVnode，不值得比较则用Vnode替换oldVnode,再渲染真实dom。

```
//通过判断key、标签名、是否为注释、data等是否相等，来判断是否有必要进行比较。

function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode。

第三步，patchVnode

当我们确定两个节点值得比较之后我们会对两个节点指定patchVnode方法。那么这个方法做了什么呢？

```
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

这个函数做了以下事情：

```
找到对应的真实dom，称为el
判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
如果oldVnode有子节点而Vnode没有，则删除el的子节点
如果oldVnode没有子节点而Vnode有子节点，则将Vnode的子节点真实化之后添加到el
如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要
其他几个点都很好理解，我们详细来讲一下updateChildren
```

第四步，updateChildren

这个函数做了什么？

```
将Vnode的子节点Vch和oldVnode的子节点oldCh提取出来
oldCh和vCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。同时，一旦StartIdx>EndIdx表明oldCh和vCh至少有一个已经遍历完了，就会结束比较。
```

**图解updateChildren(详细的diff算法)**

粉红色的部分为oldCh（旧的vnode） 、黄色的部分为vCh(新的vnode)

![vue008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue008.jpg)

我们将它们取出来并分别用s和e指针指向它们的头child和尾child

![vue009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue009.jpg)

现在分别对oldS、oldE、S、E两两做sameVnode比较，有四种比较方式，当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，这句话有点绕，打个比方

```
如果是oldS和E匹配上了，那么真实dom中的第一个节点会移到最后
如果是oldE和S匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动
如果四种匹配没有一对是成功的，那么遍历oldChild，S挨个和他们匹配，匹配成功就在真实dom中将成功的节点移到最前面，如果依旧没有成功的，那么将S对应的节点插入到dom中对应的oldS位置，oldS和S指针向中间移动。
```

![vue010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue010.jpg)

![vue011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue011.jpg)

![vue012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue012.jpg)
