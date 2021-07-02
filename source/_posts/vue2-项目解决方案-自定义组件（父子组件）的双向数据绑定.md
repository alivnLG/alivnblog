---
title: vue2-项目解决方案-自定义组件（父子组件）的双向数据绑定
date: 2021-06-25 16:19:23
top: true
tags:
categories:
- VUE
---
### 一、自定义组件（父子组件）的双向数据绑定

说到父子组件的通信，大家一定都不陌生了：父组件通过props向子组件传值，子组件通过emit触发父组件自定义事件。但是这里要说的是父子组件使用v-model实现的通信。相信大家在使用别人的组件库的时候，经常是通过v-model来控制一个组件显示隐藏的效果等，例如弹窗。下面就一步一步解开v-model的神秘面纱。抓~~稳~~喽~~，老司机弯道要踩油门了~~~
<!--more-->
提到v-model首先想到的就是我们对于表单用户数据的双向数据绑定，操作起来很简洁很粗暴，例如：

```html
<input type="text" v-model="msg">

data () {            
    return {                
        msg: ''            
    }        
}
```

其实v-model是个语法糖，上面这一段代码和下面这一段代码是一样的效果：

```html
<input type="text" :value="msg" @input="msg = $event.target.value">
data () {
    return {
        msg: '' 
    }        
},
```

由此可以看出，v-model="msg"实则是 :value="msg" @input="msg = $event.target.value"的语法糖。这里其实就是监听了表单的input事件，然后修改:value对应的值。除了在输入表单上面可以使用v-model外，在组件上也是可以使用的，这点官网有提到，但是介绍的不是很详细，导致刚接触的小伙伴会有一种云里雾里不知所云的感觉。既然了解了v-model语法糖本质的用法，那么我们就可以这样实现父子组件的双向数据绑定：

以上原理实现方法，写法1：

父组件用法：

```
<empty v-model="msg"></empty>
```

子组件写法：

```html
// 点击该按钮触发父子组件的数据同步
<div class="share-btn" @click="confirm">确定</div>

// 接收父组件传递的value值
// 注意，这种实现方法，这里只能使用value属性名
props: {            
    value: {                
        type: Boolean,                
        default: false            
    }        
},
methods: {            
    confirm () {                
        // 双向数据绑定父组件:value对应的值 
        // 通过$emit触发父组件input事件，第二个参数为传递给父组件的值，这里传递了一个false值 
        // 可以理解为最上面展示的@input="msg = $event.target.value"这个事件
        // 即触发父组件的input事件，并将传递的值‘false’赋值给msg             
        this.$emit('input', false)            
    }        
}
```

这种方式实现了父子组件见v-model双向数据绑定的操作，例如你可以试一下实现一个全局弹窗组件的操作，通过v-model控制弹窗的显示隐藏，因为你要在页面内进行某些操作将他显示出来，控制其隐藏的代码是写在组件里面的，当组件隐藏了对应的也要父组件对应的值改变。

以上这种方式实现的父子组件的v-model通信，虽可行，但限制了我们必须popos接收的属性名为value和emit触发的必须为input，这样就容易有冲突，特别是在表单里面。所以，为了更优雅的使用v-model通信而解决冲突的问题，我们可以通过在子组件中使用model选项。

下面演示写法2：

父组件写法：

```
<empty v-model="msg"></empty>
```

子组件写法：

```html
<div class="share-btn" @click="confirm">确定</div>

// model选项用来避免冲突
// prop属性用来指定props属性中的哪个值用来接收父组件v-model传递的值
// 例如这里用props中的show来接收父组件传递的v-model值
// event：为了方便理解，可以简单理解为父组件@input的别名，从而避免冲突
// event的值对应了你emit时要提交的事件名，你可以叫aa，也可以叫bb，但是要命名要有意义哦！！！
model: {            
    prop: 'show',            
    event: 'changed'        
},
props: {
    // 由于model选项中的prop属性指定了，所以show接收的是父组件v-model传递的值            
    show: {                
        type: Boolean,                
        default: false            
    }        
},        
methods: {            
    confirm () {                
        // 双向数据绑定父组件传递的值
        // 第一个参数，对应model选项的event的值，你可以叫aa，bbb，ccc，起名随你 
        this.$emit('changed', false)            
    }        
}
```

这种实现父子组件见v-model绑定值的方法，在我们开发中其实是很常用的，特别是你要封装公共组件的时候。

最后，实现双向数据绑定的方式其实还有.sync，这个属性一开始是有的，后来由于被认为或破坏单向数据流被删除了，但最后证明他还是有存在意义的，所以在2.3版本又加回来了。

例如：父组件：

```
<empty :oneprop.sync="msg"></empty>

data () {
    return {
        msg: ''
    }
}
```

子组件：

```html
<div class="share-btn" @click="changeMsg">改变msg值</div>

props: {            
    oneprop: {                
        type: String,                
        default: 'hello world'
    }        
},        
methods: {            
    changeMsg () {                
        // 双向数据流
        this.$emit('update:msg', 'helow world')           
    }        
}        
```

这样，便可以在子组件更新父组件的数据。由于v-model只使用一次，所以当需要双向绑定的值有多个的时候，.sync还是有一定的使用场景的。.sync是下面这种写法的语法糖，旨在简化我们的操作：

```
<empty
    :msg="message"
    @update:msg="message = $event"
></empty>
```

掌握了组件的v-model写法，在封装一些公共组件的时候就又轻松一些了吧。

这里再提一下：

- vm.$emit(event ,[...args])这个api，其主要作用就是用来触发当前实例上的事件。附加参数都会传给监听器回调。子组件也属于当前实例。第一个参数：要触发的事件名称。后续的参数可选：即作为参数传递给要触发的事件。
- 监听当前实例上的自定义事件，事件可以有$emit触发，也能通过hook监听到钩子函数，

vm.$on( event, callback )：一直监听；

vm.$once( event, callback )：监听一次；

vm.$off( [event, callback] )：移除监听；

监听$emit触发的自定义事件，上面已经有过用法了，监听钩子函数，在上面的定时器那块也有演示到。监听钩子函数的场景使用的不多，但是还是要知道的。

- vm.$attrs：可以获取到父组件传递的除class和style外的所有自定义属性。
- vm.$listeners：可以获取到父组件传递的所有自定义事件

例如：父组件:

```
<empty
    :msg="message"
    :title="articleTitle"
    @confirm="func1"
    @cancel="func2"
></empty>
```

就可以在子组件中获取父组件传递的属性和事件，而不用在props中定义。子组件简单演示如下：

```js
created() {            
    const msg = this.$attrs.msg; // 获取父组件传递的msg
    this.$listeners.confirm && this.$listeners.confirm(); //若组件传递事件confirm则执行
},
```

这在我们写一些高级组件时候，会有用到的。
