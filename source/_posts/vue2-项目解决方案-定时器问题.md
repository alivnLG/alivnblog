---
title: vue2-项目解决方案-定时器问题
date: 2021-06-25 16:16:37
top: true
tags:
categories:
- VUE
---
### 一、定时器问题
<!--more-->
我在a页面写一个定时，让他每秒钟打印一个1，然后跳转到b页面，此时可以看到，定时器依然在执行。这样是非常消耗性能的。如下图所示：

![vueProject011.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject011.jpg)

![vueProject012.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject012.jpg)

解决方法1：

首先我在data函数里面进行定义定时器名称：

```js
data() {            
    return {                              
        timer: null  // 定时器名称          
    }        
},
```

然后这样使用定时器：

```js
this.timer = (() => {
    // 某些操作
}, 1000)
```

最后在beforeDestroy()生命周期内清除定时器：

```js
beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
}
```

方案1有两点不好的地方，引用尤大的话来说就是：

- 它需要在这个组件实例中保存这个 timer，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化的清理我们建立的所有东西。

解决方案2：

该方法是通过$once这个事件侦听器器在定义完定时器之后的位置来清除定时器。以下是完整代码：

```js
const timer = setInterval(() =>{                    
    // 某些定时器操作                
}, 500);            
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {            
    clearInterval(timer);                                    
})
```

类似于其他需要在当前页面使用，离开需要销毁的组件（例如一些第三方库的picker组件等等），都可以使用此方式来解决离开后以后在背后运行的问题。

综合来说，我们更推荐使用方案2，使得代码可读性更强，一目了然。如果不清楚$once、$on、$off的使用，这里送上官网的地址教程，在[程序化的事件侦听器](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)那里。