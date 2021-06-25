---
title: vue2-项目解决方案-列表进入详情页的传参问题
date: 2021-06-25 16:07:54
top: true
tags:
categories:
- VUE
---
### 一、列表进入详情页的传参问题

例如商品列表页面前往商品详情页面，需要传一个商品id;

```html
<router-link :to="{path: 'detail', query: {id: 1}}">前往detail页面</router-link>
```

c页面的路径为```http://localhost:8080/#/detail?id=1```，可以看到传了一个参数id=1，并且就算刷新页面id也还会存在。此时在c页面可以通过id来获取对应的详情数据，获取id的方式是this.$route.query.id

vue传参方式有：query、params+动态路由传参。说下两者的区别：    

1.query通过path切换路由，params通过name切换路由

```html
// query通过path切换路由
<router-link :to="{path: 'Detail', query: { id: 1 }}">前往Detail页面</router-link>
// params通过name切换路由
<router-link :to="{name: 'Detail', params: { id: 1 }}">前往Detail页面</router-link>
```

2.query通过this.$route.query来接收参数，params通过this.$route.params来接收参数。

```js
// query通过this.$route.query接收参数
created () {
    const id = this.$route.query.id;
}

// params通过this.$route.params来接收参数
created () {
    const id = this.$route.params.id;
}
```

3.query传参的url展现方式：/detail?id=1&user=123&identity=1&更多参数

params＋动态路由的url方式：/detail/123

4.params动态路由传参，一定要在路由中定义参数，然后在路由跳转的时候必须要加上参数，否则就是空白页面：

```js
{      
    path: '/detail/:id',      
    name: 'Detail',      
    component: Detail    
},
```

注意，params传参时，如果没有在路由中定义参数，也是可以传过去的，同时也能接收到，但是一旦刷新页面，这个参数就不存在了。这对于需要依赖参数进行某些操作的行为是行不通的，因为你总不可能要求用户不能刷新页面吧。 例如：

```html
// 定义的路由中，只定义一个id参数
{
    path: 'detail/:id',
    name: 'Detail',
    components: Detail
}

// template中的路由传参，
// 传了一个id参数和一个token参数
// id是在路由中已经定义的参数，而token没有定义
<router-link :to="{name: 'Detail', params: { id: 1, token: '123456' }}">前往Detail页面</router-link>

// 在详情页接收
created () {
    // 以下都可以正常获取到
    // 但是页面刷新后，id依然可以获取，而token此时就不存在了
    const id = this.$route.params.id;
    const token = this.$route.params.token;
}
```