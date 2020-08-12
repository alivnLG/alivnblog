---
title: vue重点知识和技巧
date: 2020-06-02 16:57:27
tags:
- VUE
categories:
- VUE
---
##### 1.Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。
<!--more-->
##### 渐进式框架
通俗理解：可以只用我的一部分，而不是用了我这一点就必须用我的所有部分。

框架分层：最核心的是视图层渲染，然后往外是组件机制，在此基础上再加入路由机制，再加入状态管理，最外层是构建工具，vue和react都是如此。  
可以根据不同的需求选择不同的层级，没有多做职责之外的事。

Vue 的核心库只关注视图层，便于与第三方库或既有项目整合。当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

##### 2.开发环境版本，包含完整的警告和调试模式。生产环境版本，删除了警告,优化了尺寸和速度

##### 3.Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容 ECMAScript 5 的浏览器。

##### 4.Vue引入后，会自动检测是否安装了开发者工具（vue-devtools）

##### 5.Vue引入使用

(1).直接下载下来并用 script 标签引入，Vue 会被注册为一个全局变量。  

(2).使用CDN引入，生产环境下，推荐使用明确的版本号，避免新版本造成的不可预期的破坏。

```
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!--明确版本号-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
```

(3).使用原生 ES Modules，这里也有一个兼容 ES Module 的构建文件。

```
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
</script>
```
(4).NPM安装，在用 Vue 构建大型应用时推荐使用 NPM 安装[1]。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。

```
npm install vue
```

(5).命令行工具 (CLI)，快速搭建脚手架。

(6).术语

完整版：同时包含编译器和运行时的版本。

编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。

运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

##### 6.当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。

vue-loader：解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。将用户编写的代码（只要有相应的loader）转换成浏览器能识别的js

##### 7.所有数据可在Vue实例上查看，控制台输出。

##### 8.所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注逻辑层面即可。

##### 9.组件化应用构建
允许使用小型、独立和通常可复用的组件构建大型应用。

![vue002](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue002.jpg)

##### 10.v-for循环时必须绑定key值

##### 11.Vue实现了类似自定义元素功能，它是Web Components（HTML Web组件规范）。提供了自定义元素没有的功能，可以跨组件数据流、自定义事件通信以及构建工具集成。

##### 12.Vue未完全遵循MVVM模型。但实例经常用vm（ViewModel）来表示。
所有的 Vue 组件都是 Vue 实例

##### 13.data数据属性
只有实例被创建时存在于data的属性是响应式的。添加新的属性不会触发视图更新。如果data中的属性使用Object.freeze()，则不会响应更新视图。

##### 14.实例属性与方法，都带有前缀"$"

##### 15.实例生命周期钩子函数
生命周期钩子的 this 上下文指向调用它的 Vue 实例。

钩子函数：  
beforeCreate  
created  
beforeMount  
mounted  
beforeUpdate  
updated  
beforeDestroy  
destroyed

不要在选项属性或回调上使用箭头函数，因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 
```
Uncaught TypeError: Cannot read property of undefined 
或 
Uncaught TypeError: this.myMethod is not a function
```
之类的错误。

##### 16.Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

##### 17.在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

##### 18.v-once
使用v-once指令只插一次值。注意它会影响该节点其他数据。

##### 19.v-html指令
你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

##### 20.模板表达式
模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。

##### 21.指令动态参数、修饰符
```
<a v-bind:[attributeName]="url"> ... </a>

<form v-on:submit.prevent="onSubmit">...</form>
```
##### 22.对于任何复杂逻辑，你都应当使用计算属性computed
计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。  

如果你不希望有缓存，请用方法来替代

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

##### 23.watch监听，当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

##### 24.当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

##### 25.Truthy（真值）
在 JavaScript 中，truthy（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 false、0、""、null、undefined 和 NaN 以外皆为真值）。

##### 26.v-if指令
在 template 元素上使用 v-if 条件渲染分组。把一个 template 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 template 元素。

##### 27.key 管理可复用的元素

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
切换不会复用。

##### 28.v-show 不支持 template 元素，也不支持 v-else
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

不推荐同时使用 v-if 和 v-for

##### 29.尽可能在使用 v-for 时提供 key
不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。

##### 30.由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
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

##### 31.由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
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

##### 32.v-for 显示过滤/排序后的结果
```
<li v-for="n in even(numbers)">{{ n }}</li>
```
```
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

##### 33.v-for 的优先级比 v-if，不要一起使用。

##### 34.事件修饰符
```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。

不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。

##### 35.按键修饰符
```
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<input v-on:keyup.page-down="onPageDown">

```
.enter  
.tab  
.delete (捕获“删除”和“退格”键)  
.esc  
.space  
.up  
.down  
.left  
.right

内置的别名应该是首选

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

##### 36.系统修饰键
.ctrl  
.alt  
.shift  
.meta

```
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
请注意修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 keyCode：keyup.17。

.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

##### 37.鼠标按钮修饰符
.left  
.right  
.middle

这些修饰符会限制处理函数仅响应特定的鼠标按钮。

##### 38.v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

text 和 textarea 元素使用 value 属性和 input 事件；  
checkbox 和 radio 使用 checked 属性和 change 事件；  
select 字段将 value 作为 prop 并将 change 作为事件。

在文本区域插值 ```(<textarea>{{text}}</textarea>)``` 并不会生效，应用 v-model 来代替。

如果 v-model 表达式的初始值未能匹配任何选项，```<select>``` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

##### 39.input修饰符
.lazy  在“change”时而非“input”时更新  
.number  自动将用户的输入值转为数值类型  
.trim    自动过滤用户输入的首尾空白字符

##### 40.组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

每用一次组件，就会有一个它的新实例被创建。

data 必须是一个函数，每个实例可以维护一份被返回对象的独立的拷贝；

##### 41.组件prop传值
```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

##### 42.每个组件必须只有一个根元素，可以将模板的内容包裹在一个父元素内，来修复这个问题。

##### 43.监听子组件事件，父组件可以自定义事件处理函数监听器，子组件通过$emit("事件名"，参数)来触发这个事件。事件处理函数是一个方法。

##### 44.组件上使用v-model
```
<input v-model="searchText">
```
等价于
```
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

##### 45.组件使用

当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

两种组件命命方式：

kebab-case (短横线分隔命名)
```
Vue.component('my-component-name', { /* ... */ })
```
引用时使用
```
<my-component-name></my-component-name>
```

PascalCase (首字母大写命名)
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
二者都可以。

###### 注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

命名可以两者使用时，DOM中使用必须
```
<my-component-name> </my-component-name>
```
有效。

##### 46.组件注册

（1）全局注册：
```
Vue.component('my-component-name', {
  // ... 选项 ...
})
```
全局注册后可以在任何组件实例中使用该组件。所有子组件模板中。

###### 全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生

（2）局部注册：
```
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```
ES6
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

（3）在模块中局部注册
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
（4）基础组件的自动化全局注册
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

##### 47.prop
```
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})

<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

prop类型
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

传递静态或动态 Prop
```
<blog-post title="My journey with Vue"></blog-post>
```
```
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>
```

传人一个数字
```
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

传入一个布尔值
```
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

传入数组，对象同理。
<br/><br/>
###### 单向数据流
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

（1）这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
```
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
（2）这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。
<br/><br/>

prop验证

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

<br/>
禁用特性继承

如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false。例如：
```
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```


##### 自定义事件

.native - 主要是给自定义的组件添加原生事件
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

.sync 修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

这也是为什么我们推荐以 update:myPropName 的模式触发事件取而代之。举个例子，在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：
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
注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
```
<text-document v-bind.sync="doc"></text-document>
```
这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

