---
title: 虚拟DOM（VDOM）详解
date: 2020-06-09 10:23:52
top: true
tags:
- VDOM
- Diff
- patch
categories:
- Web前端
---
### 一、vdom是什么？为何使用vdom?
<!--more-->
- virtual dom,虚拟DOM
- 用JS模拟DOM结构
- DOM操作非常昂贵
- 将DOM对比操作，放在JS层，提高效率（js是图灵完备语言）


> 什么是图灵完备语言？
>
> 能实现判断、循环、递归、一些复杂的逻辑算法的语言，html、css、js中只有js是图灵完备语言

<br/>

> 为什么将DOM对比操作，放在JS层？
>
> 假如a,b,c三个元素，如果删除a,DOM的做法是把a,b,c都删除，然后在加上a,c，用js就可以实现只删除b,不操作a,c，这样就大大提高了操作效率

DOM结构
```
<ul id="list">
    <li class="item">item1</li>
    <li class="item">item2</li>
</ul>
```

用JS表示（AST结构）
```
{
    tag:'ul',
    attrs:{
        id:'list'
    },
    children:{
        {
            tag:'li',
            attrs:{className:'item'}, //class是js保留字，所以只能叫className
            children:['item1']
        },
        {
            tag:'li',
            attrs:{className:'item'},
            children:['item2']
        }
    }
}
```

如果我们把item2换成itemB，那么DOM操作会把两个li标签都删掉，然后添加一个
```
<li class="item">itemB</li>
```
进来，而js不会这么干，js会新生成一个和上面js一样的新json，然后和原来的json对比，哪里变化了修改哪里。

浏览器最耗费性能的是DOM操作，js操作一万遍赶不上DOM操作一遍耗费性能。

#### 设计一个需求场景，用Jquery实现
假如我们要改变一个表格里的内容，用jquery实现
```
<div id="container"></div>
<button id="btn-change">change</button>

<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.0/jquery.js"></script>
<script type="text/javascript">
    var data = [
        {
            name: '张三',
            age: '20',
            address: '北京'
        },
        {
            name: '李四',
            age: '21',
            address: '上海'
        },
        {
            name: '王五',
            age: '22',
            address: '广州'
        }
    ]

    // 渲染函数
    function render(data) {
        var $container = $('#container')

        // 清空容器，重要！！！
        $container.html('')

        // 拼接 table
        var $table = $('<table>')

        $table.append($('<tr><td>name</td><td>age</td><td>address</td>/tr>'))
        data.forEach(function (item) {
            $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>'
             + item.address + '</td>/tr>'))
        })

        // 渲染到页面
        $container.append($table)
    }

    $('#btn-change').click(function () {
        data[1].age = 30
        data[2].address = '深圳'
        // re-render  再次渲染
        render(data)
    })

    // 页面加载完立刻执行（初次渲染）
    render(data)
</script>
```
![vdom001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vdom001.jpg)
<p style="text-align:center;color:#aaaaaa">点击按钮改变数据</p>

![vdom001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vdom002.jpg)
<p style="text-align:center;color:#aaaaaa">本来只想改变左侧红框里的数据，结果在dom结构中发现整个table都变了，先清除整个表格，然后把新的数据渲染到dom里，这样就违背了我们的初衷</p>

#### 遇到的问题
- DOM操作是”昂贵“的，js运行效率高
- 尽量减少DOM操作，而不是”推到重来“
- 项目越复杂，影响越严重
- vdom即可解决这些问题

### 二、vdom如何应用？核心API是什么？
#### 介绍snabbdom(实现vdom的一个库)
h函数、patch函数是snabbdom的核心api，也就是vdom的核心api。
```
h('<标签名>',{...属性...},[...子元素...]) //生成vdom节点的
h('<标签名>',{...属性...},'文本结点')
patch(container,vnode) //render //打补丁渲染dom的
patch(vnode,newVnode) //rerender
```
用h函数生成一个vnode
```
//js表示的dom结构
{
    tag:'ul',
    attrs:{
        id:'list'
    },
    children:{
        {
            tag:'li',
            attrs:{className:'item'},
            children:['item1']
        },
        {
            tag:'li',
            attrs:{className:'item'},
            children:['item2']
        }
    }
}
//用h函数生成上面的代码
var vnode = h('ul#list',{},[
    h('li.item',{},'item1'),
    h('li.item',{},'item2')
])
```
用h函数和patch函数改变dom
```
var vnode = h('ul#list',{},[
    h('li.item',{},'item1'),
    h('li.item',{},'item2')
])
var container = document.getElementById('container');
patch(container,vnode);

//模拟改变
var btnChange = document.getElementById('btnChange');
btnChange.addEventListener('click',function(){
    var newVnode = h('ul#list',{},[
        h('li.item',{},'item1'),
        h('li.item',{},'item222')
    ]) 
    patch(vnode,newVnode); //vnode和newVnode对比，那些需要改改哪个
})
```
在浏览器中发现只有第二个li发生变化了，第一个li没有变。只改变了变化的内容，解决了jquery重新渲染所有数据的问题。

#### 问题解答
- 如何使用？可用snabbdom的用法来举例
- 核心API：h函数、patch函数

### 三、介绍一下diff算法(vdom的核心算法)

#### 什么是diff算法？
找出两个文件差异的算法
Linux 的diff命令 diff log1 log2  
git的diff命令 git diff index.html index1.html

#### vdom为何用diff算法？
DOM操作是昂贵的，为了尽量减少DOM操作，只找出DOM必须更新的节点来更新，其他的不更新，这个”找出“的过程，就需要diff算法
#### diff算法的实现流程？
##### patch(container,vnode);
```
{
    tag:'ul',
    attrs:{
        id:'list'
    },
    children:{
        {
            tag:'li',
            attrs:{className:'item'},
            children:['item1']
        },
        {
            tag:'li',
            attrs:{className:'item'},
            children:['item2']
        }
    }
}
//vnode生成真实的dom
<ul id="list">
    <li class="item">item1</li>
    <li class="item">item2</li>
</ul>
```
用vdom创建真实dom的演示代码
```
function createElement(vnode) {
    var tag = vnode.tag  // 'ul'
    var attrs = vnode.attrs || {}
    var children = vnode.children || []
    if (!tag) {
        return null
    }

    // 创建真实的 DOM 元素
    var elem = document.createElement(tag)
    // 属性
    var attrName
    for (attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
            // 给 elem 添加属性
            elem.setAttribute(attrName, attrs[attrName])
        }
    }
    // 子元素
    children.forEach(function (childVnode) {
        // 给 elem 添加子元素
        elem.appendChild(createElement(childVnode))  // 递归
    })

    // 返回真实的 DOM 元素
    return elem
}
```
##### patch(vnode,newVnode);
![vdom003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vdom003.jpg)
<p style="text-align:center;color:#aaaaaa">找出newVnode 和 vnode的区别</p>

![vdom004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vdom004.jpg)
<p style="text-align:center;color:#aaaaaa">粉色li是变了的</p>

```
//diff实现过程演示代码
function updateChildren(vnode, newVnode) {
    var children = vnode.children || []
    var newChildren = newVnode.children || []

    children.forEach(function (childVnode, index) {
        var newChildVnode = newChildren[index]
        if (childVnode.tag === newChildVnode.tag) {
            // 深层次对比，递归
            updateChildren(childVnode, newChildVnode)
        } else {
            // 替换
            replaceNode(childVnode, newChildVnode)
        }
    })
}

function replaceNode(vnode, newVnode) {
    var elem = vnode.elem  // 真实的 DOM 节点
    var newElem = createElement(newVnode)

    // 替换
}
```
#### 问题解答
patch(container,vnode); createElement  
用vdom创建真实dom  
patch(vnode,newVnode); updateChildren; replaceNode;  
如果vnode有更新，生成newVnode,找出newVnode 和 vnode的区别,  
循环vnode,判断和newVnode是否有变化，  
如果有变化则用newVnode替换vnode，  
如果没有变化则递归判断子vnode是否有变化   
