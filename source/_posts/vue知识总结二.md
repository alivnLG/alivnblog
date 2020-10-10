---
title: vue知识总结二
date: 2020-06-02 16:53:18
tags:
- VUE
- SPA
categories:
- VUE
---
### 一、单页面应用
#### 1.简介
<!--more-->
单页Web应用（single page web application，SPA），就是只有一张Web页面的应用。单页应用程序 (SPA) 是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。 [1]  浏览器一开始会加载必需的HTML、CSS和JavaScript，所有的操作都在这张页面上完成，都由JavaScript来控制。因此，对单页应用来说模块化的开发和设计显得相当重要。

**就是指一个系统只加载一次资源，之后的操作交互、数据交互是通过路由、ajax来进行，页面并没有刷新。**

#### 2.特点
##### 优点
用户操作体验好，用户不用刷新页面，整个交互过程都是通过Ajax来操作。

适合前后端分离开发，服务端提供http接口，前端请求http接口获取数据，使用JS进行客户端渲染。

加载次数少，加载以后性能较高。

##### 缺点
###### 首页加载慢
单页面应用会将js、 css打包成一个文件，在加载页面显示的时候加载打包文件，如果打包文件较大或者网速慢则用户体验不好。

解决方法：拆包
###### 不利于seo
SEO（Search Engine Optimization）为搜索引擎优化。它是一种利用搜索引擎的搜索规则来提高网站在搜索引擎排名的方法。目前各家搜索引擎对JS支持不好，所以使用单页面应用将大大减少搜索引擎对网站的收录。

解决方法：如果页面支持h5可以用h5模式+服务器路由rewrite+h5 history api去掉路由的锚点，和搜索软件优化lib进行seo优化。

![vue001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue001.jpg)

#### 3.为什么页面切换快？
页面每次切换跳转时，并不需要做html文件的请求，这样就节约了很多http发送时延，我们在切换页面的时候速度很快。

缺点：首屏时间慢，SEO差

单页应用的首屏时间慢，首屏时需要请求一次html，同时还要发送一次js请求，两次请求回来了，首屏才会展示出来。相对于多页应用，首屏时间慢。

SEO效果差，因为搜索引擎只认识html里的内容，不认识js的内容，而单页应用的内容都是靠js渲染生成出来的，搜索引擎不识别这部分内容，也就不会给一个好的排名，会导致单页应用做出来的网页在百度和谷歌上的排名差。

#### 4.VUE解决方案（服务器端渲染技术SSR）
mm | 多页应用模式MPA | 单页应用模式SPA
---|---|--
应用构成 | 由多个完整页面构成 | 一个外壳页面和多个页面片段构成
跳转方式 | 页面之间的跳转是从一个页面跳转到另一个页面 | 页面片段之间的跳转是把一个页面片段删除或隐藏，加载另一个页面片段并显示出来。这是片段之间的模拟跳转，并没有开壳页面
跳转后公共资源是否重新加载 | 是 | 否
URL模式 | http://xxx/page1.html 和 http://xxx/page2.html | http://xxx/shell.html#page1 和 http://xxx/shell.html#page2
用户体验 | 页面间切换加载慢，不流畅，用户体验差，特别是在移动设备上 | 页面片段间的切换快，用户体验好，包括在移动设备上
能否实现转场动画 | 无法实现 | 容易实现（手机app动效）
页面间传递数据 | 依赖URL、cookie或者localstorage，实现麻烦 | 因为在一个页面内，页面间传递数据很容易实现(父子之间传值，或vuex或storage之类)
搜索引擎优化（SEO） | 可以直接做 | 需要单独方案做，有点麻烦
特别适用的范围 | 需要对搜索引擎友好的网站 | 对体验要求高的应用，特别是移动应用
搜索引擎优化（SEO） | 可以直接做 | 需要单独方案做，有点麻烦
开发难度 | 低一些，框架选择容易 | 高一些，需要专门的框架来降低这种模式的开发难度

### 二、渐进式框架（Progressive）自底向上逐层应用
#### 1.简介
主张最少，可以只用我的一部分，而不是用了我这一点就必须用我的所有部分。

框架做分层设计，每层都可选，不同层可以灵活接入其他方案。而当你都想用官方的实现时，会发现也早已准备好，各层之间包括配套工具都能比接入其他方案更便捷地协同工作。

框架分层：最核心的是视图层渲染，然后往外是组件机制，在此基础上再加入路由机制，再加入状态管理，最外层是构建工具，vue和react都是如此。

可以根据不同的需求选择不同的层级，没有多做职责之外的事。

Vue 的核心库只关注视图层，便于与第三方库或既有项目整合。当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

**做减法比做加法难**

它本身承担了较难的做减法的部分，而留给它的使用者较简单的做加法的部分。
就是说，在我们用一个工具的时候，并不是为了用其中的某一个部分，而想办法无视或者裁剪掉其他部分（做减法），而是上手就可以用上它的大多数功能，再在需要的时候引入它的官方或第三方插件（做加法）。


#### 2.对比
[参考资料](https://www.zhihu.com/question/51907207)
##### （1）Angular
Angular，它两个版本都是强主张的，如果你用它，必须接受以下东西：
- 必须使用它的模块机制
- 必须使用它的依赖注入
- 必须使用它的特殊形式定义组件（这一点每个视图框架都有，难以避免）

所以Angular是带有比较强的排它性的，如果你的应用不是从头开始，而是要不断考虑是否跟其他东西集成，这些主张会带来一些困扰。

##### （2）React
React，它的主张主要是函数式编程的理念，比如说，你需要知道什么是副作用，什么是纯函数，如何隔离副作用。它的侵入性看似没有Angular那么强，主要因为它是软性侵入。

### 三、key 管理可复用的元素
#### 1.简介
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

#### 2.使用
```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

v-for中添加key，目的为了避免复用元素

尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。

### 四、v-if 与 v-for

#### 1.v-if
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

#### 2.v-for
相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

#### 3.对比
一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

v-show 不支持 template 元素，也不支持 v-else；而v-if支持；

#### 4.注意
不推荐同时使用 v-if 和 v-for，v-for 的优先级比 v-if。

### 五、由于JavaScript限制，Vue 不能检测数组变动、对象属性的增加和删除
#### 1.数组变动
不能检测以下数组的变动：
当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue

当你修改数组的长度时，例如：vm.items.length = newLength

第一类问题解决方法：
```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

//实例方法
vm.$set(vm.items, indexOfItem, newValue)
```
第二类问题解决方法：
```
vm.items.splice(newLength)
```
#### 2.对象属性的添加和删除
解决方法：
```
Vue.set(vm.userProfile, 'age', 27)

//实例方法
vm.$set(vm.userProfile, 'age', 27)
```

为已有对象赋值多个新属性
```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

### 六、组件
#### 1.简介
组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

每用一次组件，就会有一个它的新实例被创建。

data 必须是一个函数，每个实例可以维护一份被返回对象的独立的拷贝；

#### 2.组件prop传值
##### 基础用法
```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
##### prop类型
```
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
##### prop单向数据流
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

##### 注意
###### 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
```
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

###### 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。 

##### prop验证
```
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的。


#### 3.规范
每个组件必须只有一个根元素，可以将模板的内容包裹在一个父元素内，来修复这个问题。
#### 4.组件事件
监听子组件事件，父组件可以自定义事件处理函数监听器，子组件通过$emit("事件名"，参数)来触发这个事件。事件处理函数是一个方法。
#### 5.组件上使用v-model
```
<input v-model="searchText">
```
等同于
```
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```
#### 6.组件使用
当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。
##### 两种组件命命方式：
###### kebab-case (短横线分隔命名)
```
Vue.component('my-component-name', { /* ... */ })
```
引用时使用
```
<my-component-name></my-component-name>
```
###### PascalCase (首字母大写命名)
```
Vue.component('MyComponentName', { /* ... */ })
```
引用时使用
```
<my-component-name> </my-component-name>
```
和
```
<MyComponentName> </MyComponentName>
```
##### 注意
尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

命名可以两者使用时，DOM中使用必须
```
<my-component-name> </my-component-name>
```
有效。

#### 7.组件注册
##### 全局注册
```
Vue.component('my-component-name', {
  // ... 选项 ...
})
```
全局注册后可以在任何组件实例中使用该组件。所有子组件模板中。

全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生

##### 局部注册
```
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```
###### ES6方式
```
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```
ComponentA是ComponentA: ComponentA 的缩写。
用在模板中的自定义元素的名称
包含了这个组件选项的变量名

##### 在模块中局部注册
```
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```
##### 基础组件的自动化全局注册
```
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```
#### 8.禁用特性继承
如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false。例如：
```
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```
#### 9.自定义事件
##### .native
主要是给自定义的组件添加原生事件
```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```
##### .sync 修饰符
在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

**这个修饰符就是vue封装了  子组件要修改父组件传过来的动态值的语法糖，省去了父组件需要写的方法，但是子组件emit时要加上update**

推荐以 update:myPropName 的模式触发事件取而代之。举个例子，在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：
```
this.$emit('update:title', newTitle)
```
然后父组件可以监听那个事件并根据需要更新一个本地的数据属性。例如：
```
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```
为了方便起见，我们为这种模式提供一个缩写，即 .sync 修饰符：
```
<text-document v-bind:title.sync="doc.title"></text-document>
```
###### 注意
注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
```
<text-document v-bind.sync="doc"></text-document>
```
这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

