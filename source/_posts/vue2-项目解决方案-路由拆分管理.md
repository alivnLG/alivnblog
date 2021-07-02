---
title: vue2-项目解决方案-路由拆分管理
date: 2021-06-25 16:19:42
top: true
tags:
categories:
- VUE
---
### 一、路由拆分管理

这里说的路由拆分指的是将路由的文件，按照模块拆分，这样方便路由的管理，更主要的是方便多人开发。具体要不要拆分，那就要视你的项目情况来定了，如果项目较小的话，也就一二十个路由，那么是拆分是非常没必要的。但倘若你开发一些功能点较多的商城项目，路由可以会有一百甚至几百个，那么此时将路由文件进行拆分是很有必要的。不然，你看着index.js文件中一大长串串串串串串的路由，也是很糟糕的。
<!--more-->
![vueProject017.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject017.jpg)

首先我们在router文件夹中创建一个index.js作为路由的入口文件，然后新建一个modules文件夹，里面存放各个模块的路由文件。例如这里储存了一个vote.js投票模块的路由文件和一个公共模块的路由文件。下面直接上index.js吧，而后在简单介绍：

```js
import Vue from 'vue'
import Router from 'vue-router'

// 公共页面的路由文件
import PUBLIC from './modules/public' 
// 投票模块的路由文件
import VOTE from './modules/vote' 

Vue.use(Router)

// 定义路由
const router = new Router({  
    mode: 'history',  
    routes: [    
        ...PUBLIC,    
        ...VOTE,  
    ]
})

// 路由变化时
router.beforeEach((to, from, next) => {    
    if (document.title !== to.meta.title) {        
        document.title = to.meta.title;    
    }    
    next()
})

// 导出
export default router
```

首先引入vue和router最后导出，这就不多说了，基本的操作。

这里把router.beforeEach的操作写了router的index.js文件中，有些人可能会写在main.js中，这也没有错，只不过，个人而言，既然是路由的操作，还是放在路由文件中管理更好些。这里就顺便演示了，如何在页面切换时，自动修改页面标题的操作。

而后引入你根据路由模块划分的各个js文件，然后在实例化路由的时候，在routes数组中，将导入的各个文件通过结构赋值的方法取出来。最终的结果和正常的写法是一样的。然后看下我们导入的vote.js吧：

```js
/** 
 * 投票模块的router列表  
 */

export default [    
    // 投票模块首页    
    {        
        path: '/vote/index',        
        name: 'VoteIndex',        
        component: resolve => require(['@/view/vote/index'], resolve),        
        meta: {            
            title: '投票'        
        }    
    },    
    // 详情页    {        
    path: '/vote/detail',        
    name: 'VoteDetail',        
    component: resolve => require(['@/view/vote/detail'], resolve),
    meta: {            
        title: '投票详情'        
    }    
}] 
```

这里就是将投票模块的路由放在一个数组中导出去。整个路由拆分的操作，不是vue的知识，就是一个es6导入导出和结构的语法。具体要不要拆分，还是因项目和环境而异吧。

这里的路由用到了懒加载路由的方式，如果不清楚，文字上面有介绍到。

还有这里的meta元字段中，定义了一个title信息，用来存储当前页面的页面标题，即document.title。
