---
title: vue2-项目解决方案-vue获取数据的两种方式的实践+简单骨架屏实现
date: 2021-06-25 16:19:07
top: true
tags:
categories:
- VUE
---
### 一、vue获取数据的两种方式的实践+简单骨架屏实现

在vue中获取数据有两种方式，引入尤大大的话就是：
<!--more-->
- 导航完成之后获取

先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

- 导航完成之前获取

导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。那么我们来实践一下这两种获取数据的方式，以及用户体验优化的一点思考。


#### 1.1 导航完成之后获取

这种方式是我们大部分都在使用的，（因为可能一开始我们只知道这种方式^V^）。使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。获取数据大家都会，这里说下用户体验的一些东西：

- 在数据获取到之前，页面组件已经加载，但是数据没有拿到并渲染，所以在此过程中，我们不能加载页面内展示数据的那块组件，而是要有一个loading的加载中的组件或者骨架屏。
- 当页面数据获取失败，可以理解为请求超时的时候，我们要展示的是断网的组件。
- 如果是列表页，还要考虑到空数据的情况，即为空提示的组件。

那么，我们的页面是要有这基本的三个部分的，放代码：

```html
<template>
    <div class="list">
        <!--加载中或者骨架屏-->
        <div v-if="loading">
       
        </div>

        <!--请求失败，即断网的提示组件-->
        <div v-if="error">
      
        </div>

        <!--页面内容-->
        <div v-if="requestFinished" class="content">
            <!--页面内容-->
            <div v-if="!isEmpty">
                <!--例如有个列表，当然肯定还会有其他内容-->
                <ul></ul>
            </div>

            <!--为空提示组件-->
            <div v-else>空空如也</div>
        </div>
    </div>
</template>
```

这种获取数据的情况下，我们进来默认的是展示loading或者骨架屏的内容，然后如果获取数据失败（即请求超时或者断网），则加载error的那个组件，隐藏其他组件。如果数据请求成功，则加载内容的组件，隐藏其他组件。如果是列表页，可能在内容组件中还会有列表和为空提示两块内容，所以这时候也还要根据获取的数据来判断是加载内容还是加载为空提示。

#### 1.2 导航完成之前获取

这种方式是在页面的beforeRouteEnter钩子中请求数据，只有在数据获取成功之后才会跳转导航页面。

```js
beforeRouteEnter (to, from, next) {        
    api.article.articleDetail(to.query.id).then(res=> {            
        next(vm => {                
            vm.info = res.data;                
            vm.loadFinish = true            
        })        
    })    
},
```

1.大家都知道钩子中beforeRouteEnter钩子中this还不能使用，所以要想进行赋值操作或者调用方法，我们只能通过在next()方法的回调函数中处理，这个回调函数的第一个参数就代表了this，他会在组件初始化成功后进行操作。

2.我想，很多时候我们的api或者axios方法都是挂载到vue的原型上的，由于这里使用不了this，所以只能在页面组件内引入api或者我们的axios。

3.赋值操作也可以写在method方法中，但是调用这个赋值方法还是vm.yourFunction()的方式。

4.为空提示、断网处理等都和第一种方式一样，但是，由于是先获取到数据之后再跳转加载组件的，所以我们不需要在预期的页面内展示骨架屏或者loading组件。可以，我们需要在当前页面进入之前，即在上一个页面的时候有一个加载的提示，比如页面顶部的进度条。这样用户体验就比较友好了，而不至于因为请求的s速度慢一些导致半天没反应而用户又不知道的结果。全局的页面顶部进度条，可以在main.js中通过router.beforeEach(to, from, next) {}来设置，当页面路由变化时，显示页面顶部的进度条，进入新路由后隐藏掉进度条。

![vueProject016.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject016.jpg)

其实说到了这里，那么骨架屏的事情也就顺带已经解决了，一般页面骨架屏也就是一张页面骨架的图片，但是要注意这张图片要尽可能的小。
