---
title: vue2-项目解决方案-路由懒加载/延迟加载
date: 2021-06-25 16:18:17
top: true
tags:
categories:
- VUE
---
### 一、路由懒加载/延迟加载

路由懒加载可以帮我们在进入首屏时不用加载过度的资源，从而减少首屏加载速度。

路由文件中，

非懒加载写法：

```js
import Index from '@/page/index/index';
export default new Router({  
    routes: [    
        { 
            path: '/', 
            name: 'Index',     
            component: Index 
        }
    ]
})
```

路由懒加载写法：

```js
export default new Router({
  routes: [    
        { 
            path: '/', 
            name: 'Index', 
            component: resolve => require(['@/view/index/index'], resolve) 
        }
   ]
})
```
