---
title: vue2-项目解决方案-登录验证
date: 2021-06-25 15:59:42
top: true
tags:
categories:
- VUE
---
### 一、登录验证

网站一般只要登陆过一次后，接下来该网站的其他页面都是可以直接访问的，不用再次登陆。 我们可以通过 token 或 cookie 来实现，下面用代码来展示一下如何用 token 控制登陆验证。
<!--more-->
```js
router.beforeEach((to, from, next) => {
    // 如果有token 说明该用户已登陆
    if (localStorage.getItem('token')) {
        // 在已登陆的情况下访问登陆页会重定向到首页
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            next({path: to.path || '/'})
        }
    } else {
        // 没有登陆则访问任何页面都重定向到登陆页
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})
```

参考项目vue-element-admin
