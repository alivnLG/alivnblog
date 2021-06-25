---
title: vue3-解析下
date: 2021-06-25 16:20:16
top: true
tags:
- VUE
categories:
- VUE
---
### 一、vue3.0 新功能

#### 1.1 Composition API
<!--more-->
我们先回顾一下在Vue2中OptionsAPI是怎么写的：

![vuethree033](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree033.gif)

随着产品迭代，产品经理不断提出了新的需求：

![vuethree034](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree034.gif)

由于相关业务的代码需要遵循option的配置写到特定的区域，导致后续维护非常的复杂，代码可复用性也不高。最难受的是敲代码的时候不得不上下反复横跳，晃得眼瞎...

用了CompositionAPI会变成什么样呢？

![vuethree035](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree035.gif)

我们可以看到，功能相关的代码都聚合起来了，代码变得井然有序，不再频繁地上下反复横跳。但还差点意思，事实上，我们很多逻辑相关的操作是不需要体现出来的，真正需要使用到的可能只是其中的一些变量、方法，而Composition API带来的出色代码组织和复用能力，让你可以把功能相关的代码抽离出去成为一个可复用的函数JS、TS文件，在.vue文件中通过函数的调用把刚刚这些函数的返回值组合起来，最后返回模板真正需要使用到的东西：

![vuethree036](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree036.gif)

巴适得很~

Composition API为何这么好用，得益于它的两个核心组成：

- **Reactivity——响应式系统**

- **生命周期钩子**

响应式系统暴露了更多底层的API出来，从而让我们很轻松地去创建使用响应式变量。然后结合暴露出来的生命周期钩子，基本就可以完成整个组件的逻辑运作。当然还可以结合更多的api完成更复杂的工作，社区也有很多关于CompositionAPI的使用技巧和方法，这一块就不去细化了，点到为止。

##### 1.1.1 优势

对比Class API：

- **更好的 TypeScript 类型推导支持**

   function对于类型系统是非常友好的，尤其是函数的参数和返回值。

- **代码更容易被压缩**

   代码在压缩的时候，比如对象的key是不会进行压缩的，这一点可以从我们刚刚对于Three shaking demo构建出来的包就可以看得出来：
   
   ![vuethree037](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree037.jpg)
   
   而composition API声明的一些响应式变量，就可以很安全地对变量名进行压缩。

- **Tree-shaking 友好**

   CompositionAPI这种引用调用的方式，构建工具可以很轻松地利用Tree shaking去消除我们实际未使用到 “死代码“

- **更灵活的逻辑复用能力**

   在Vue2中，我们一直缺少一种很干净方便的逻辑复用方法。 

   以往我们要想做到逻辑复用，主要有三种方式：

   - 混入——Mixins

   - 高阶组件——HOC

   - 作用域插槽

   为了更好地体会这三种方法的恶心之处，我用一个简单的demo去分别演示这三种方法。

   案例：鼠标位置侦听:
   
   ![vuethree038](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree038.gif)

先看看Mixins的方式：

**Mixins**
   
MouseMixin.js:
   
```js
import {throttle} from "lodash"

let throttleUpdate;

export default {
    data:()=>({
        x:0,
        y:0
    }),
    
    methods:{
        update(e){
            console.log('still on listening')
            this.x = e.pageX
            this.y = e.pageY
        }
    },
    
    beforeMount() {
        throttleUpdate = throttle(this.update,200).bind(this)
    },
    mounted() {
        window.addEventListener('mousemove',throttleUpdate)
    },
    unmounted() {
        window.removeEventListener('mousemove',throttleUpdate)
    }
}
```

当大量使用mixin时：

- ❌ 命名空间冲突

- ❌ 模版数据来源不清晰

**HOC——高阶组件**

HOC在React使用得比较多，它是用来替代mixin的方案。事实上Vue也可以写HOC。

其原理就是在组件外面再包一层父组件，复用的逻辑在父组件中，通过props传入到子组件中。

看看这个带有可复用逻辑的MouseHOC怎么写：

```js
import Mouse2 from "@/views/Mouse/Mouse2.vue";

import { defineComponent } from "vue";
import { throttle } from "lodash";

let throttleUpdate;

export default defineComponent({
  render() {
    return (
        <Mouse2 x={this.x} y={this.y}/>
    );
  },
  data: () => ({
    x: 0,
    y: 0,
  }),
  methods: {
    update(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    },
  },
  beforeMount() {
    throttleUpdate = throttle(this.update, 200).bind(this);
  },
  mounted() {
    window.addEventListener("mousemove", throttleUpdate);
  },
  unmounted() {
    window.removeEventListener("mousemove", throttleUpdate);
  },
});
```

HOC内部的子组件——Mouse2.vue：

```vue
<template>
  <header>
    <h1>获取鼠标位置——HOC</h1>
  </header>

  <main>
    <span>(</span>
    <transition name="text" mode="out-in">
      <div :key="x" class="position">{{ x }}</div>
    </transition>
    <span>,</span>
    <transition name="text" mode="out-in">
      <div :key="y" class="position">{{ y }}</div>
    </transition>
    <span>)</span>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
  props:['x','y']
})
</script>
```

同样，在大量使用HOC的时候的问题：

- ❌ props 命名空间冲突

- ❌ props 来源不清晰

- ❌ 额外的组件实例性能消耗

**作用域插槽**

原理就是通过一个无需渲染的组件——renderless component，通过作用域插槽的方式把可复用逻辑输出的内容放到slot-scope中。

看看这个无渲染组件怎么写：

```vue
<template>
  <slot :x="x" :y="y"></slot>
</template>

<script>
import {throttle} from "lodash";

let throttleUpdate;

  export default {
    data:()=>({
      x:0,
      y:0
    }),
    methods:{
      update(e){
        console.log('still on listening')
        this.x = e.pageX
        this.y = e.pageY
      }
    },
    beforeMount() {
      throttleUpdate = throttle(this.update,200).bind(this)
    },
    mounted() {
      window.addEventListener('mousemove',throttleUpdate)
    },
    unmounted() {
      window.removeEventListener('mousemove',throttleUpdate)
    }
  }
</script>
```

在页面组件Mouse3.vue中使用:

```vue
<template>
  <header>
    <h1>获取鼠标位置——slot</h1>
  </header>
  <main>
    <span>(</span>

    <MouseSlot v-slot="{x,y}">
      <transition name="text" mode="out-in">
        <div :key="x" class="position">{{ x }}</div>
      </transition>
      <span>,</span>
      <transition name="text" mode="out-in">
        <div :key="y" class="position">{{ y }}</div>
      </transition>
    </MouseSlot>

    <span>)</span>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import MouseSlot from "@/components/Mouse/MouseSlot.vue"

export default defineComponent({
  components: {
    MouseSlot
  }
})
</script>
```

当大量使用时：

- ✔ 没有命名空间冲突

- ✔ 数据来源清晰

- ❌ 额外的组件实例性能消耗

虽然无渲染组件已经是一种比较好的方式了，但写起来仍然蛮恶心的。

所以，在Composition API中，怎么做到逻辑复用呢？

**Composition API**

暴露一个可复用函数的文件：useMousePosition.ts，这个命名只是让他看起来更像react hooks一些，一眼就能看出来这个文件这个函数是干什么的，实际上你定义为其他也不是不可以。

```js
import {ref, onMounted, onUnmounted} from "vue"
import {throttle} from "lodash"

export default function useMousePosition() {

    const x = ref(0)
    const y = ref(0)

    const update = throttle((e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }, 200)

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })
    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    return { x, y }
}
```

页面组件Mouse4.vue中使用：

```vue
<template>
  <header>
    <h1>获取鼠标位置——Composition API</h1>
  </header>

  <main>
    <span>(</span>
    <transition name="text" mode="out-in">
      <div :key="x" class="position">{{ x }}</div>
    </transition>
    <span>,</span>
    <transition name="text" mode="out-in">
      <div :key="y" class="position">{{ y }}</div>
    </transition>
    <span>)</span>
  </main>
</template>


<script lang="ts">
import {defineComponent} from "vue"
import useMousePosition from "@/components/Mouse/useMousePosition";

export default defineComponent({
  setup() {
    const { x, y } = useMousePosition()
    return { x, y }
  }
})
</script>
```

即使在大量使用时：

- ✔ 没有命名空间冲突

- ✔ 数据来源清晰

- ✔ 没有额外的组件实例性能消耗

干净、清晰

除此之外，这种函数式也给予了优秀的代码组织能力。

为了演示这一点，我把Vue2示例中的todoMVC项目搬下来用CompositionAPI重构了一下。

todoMVC就是一个待办事项的小应用，功能有：

- 本地缓存，并动态存储到LocalStorage中
- 新增代办事项
- 点击完成代办事项，一键全部完成/未完成
- 删除代办事项
- 清空已完成的代办事项
- 根据完成状态筛选代办事项列表

![vuethree039](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree039.gif)

（刁钻的朋友可能发现我把编辑功能阉割掉了，这里确实偷了个懒，当时写得比较着急，又因为一些兼容性的原因，编辑状态点不出来，一气之下把编辑阉了....其实有没有也不太影响我想要说明的东西）

来码，整个代办事项组件：TodoMVC.vue

```js
import {defineComponent} from "vue"
import useTodoState from "@/views/TodoMVC/useTodoState";
import useFilterTodos from "@/views/TodoMVC/useFilterTodos";
import useHashChange from "@/views/TodoMVC/useHashChange";

export default defineComponent({
  setup() {

    /*响应式变量、新增和删除代办事项的方法*/
    const {
      todos,
      newTodo,
      visibility,
      addTodo,
      removeTodo
    } = useTodoState()

    // 筛选数据、一键全部完成/未完成、清空全部已完成事项
    const {
      filteredTodos,
      remaining,
      allDone,
      filters,
      removeCompleted
    } = useFilterTodos(todos, visibility)


    // 监听路由哈希变化
    useHashChange(filters, visibility)


    return {
      todos,
      newTodo,
      filteredTodos,
      remaining,
      allDone,
      visibility,
      removeCompleted,
      addTodo,
      removeTodo,
    }
  },

})
```

useTodoState中又调用了一个本地存储逻辑相关的composition function：useTodoStorage.ts

useTodoState.ts:

```ts
import { Todo, Visibility } from "@/Types/TodoMVC";
import { ref, watchEffect, } from "vue"
import useTodoStorage from "@/views/TodoMVC/useTodoStorage";

export default function useTodoState() {

    const { fetch, save, uid } = useTodoStorage()

    // 全部事项
    const todos = ref(fetch())
    
    // 即将新增事项的内容
    const newTodo = ref("")

    // 新增代办事项
    const addTodo = () => {
        const value = newTodo.value && newTodo.value.trim()
        if (!value) {
            return;
        }
        todos.value.push({
            id: uid.value,
            title: value,
            completed: false
        })
        uid.value += 1
        newTodo.value = ""
    }

    // 删除代办事项
    const removeTodo = (todo: Todo) => {
        todos.value.splice(todos.value.indexOf(todo), 1)
    }

    // 使用todos.value的副作用去动态保存代办事项到本地缓存中
    watchEffect(() => {
        save(todos.value)
    })

    // 当前筛选的类型（url的hash值与此值一致）
    const visibility = ref<Visibility>("all")
    
    return {
        todos,
        newTodo,
        visibility,
        addTodo,
        removeTodo
    }
}
```

用于本地缓存的useTodoStorage.ts：

```ts
import {Todo} from "@/Types/TodoMVC";
import {ref, watchEffect} from "vue"


export default function useTodoStorage() {

    const STORAGE_KEY = 'TodoMVC——Vue3.0'


    // 获取LocalStorage中的数据
    const fetch = (): Todo[] => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    // 数据存储到LocalStorage中
    const save = (todos: Todo[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }

    // 用于新增代办事项的id自动生成
    const uid = ref(~~(localStorage.getItem('uid') || 0));
    watchEffect(() => localStorage.setItem('uid', uid.value.toString()))

    return {
        fetch,
        save,
        uid
    }

}
```

其他就不一一展示了，代码最终都放在文末的链接中的github仓库里了，感兴趣的可以细品。这个demo因为写得比较仓促，自我感觉写得不咋滴，逻辑的组织有待商榷，这也从侧面展示了composition API给我们带来的高灵活组织和复用能力，至于如何把代码组织得更漂亮就是开发者自己的事了，我也在试图慢慢摸索出写得更舒服的最佳实践。

##### 1.1.2 与React Hooks对比

- **同样的逻辑组合、复用能力**
- **只调用一次**
  - 符合 JS 直觉
  - 没有闭包变量问题
  - 没有内存/GC 压力
  - 不存在内联回调导致子组件永远更新的问题

不可置否，Composition API的诞生确实受到了React Hooks的启发，如果因此就贴上抄袭的标签就未免太流于表面了，也不想在此去引战。框架都是好框架，前端圈内要以和为贵，互相借鉴学习难道不好吗，不要搞窝里斗。

事实上，Composition API的实现与使用方式也都是截然不同的，懂得自然懂。

与React Hooks的对比也已经有不少文章说得挺详细了，这里就不再进行赘述。

简单来说就是得益于响应式系统，Composition API 使用的心智负担相比之下实在是小太多了。

#### 1.2 Fragment

这个新特性比较简单，就是在模板中可以写多个根节点。至于它的意义：

- **减少无意义的根节点元素**

- **可以平级递归组件**

第二个意义比较重要，利用这个新特性，比如可以写一个骚气的快速排序组件。

QuickSort.vue:

```ts
<template>
  <quick-sort :list="left" v-if="left.length"></quick-sort>
  <span class="item">{{ flag }}</span>
  <quick-sort :list="right" v-if="right.length"></quick-sort>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: 'quick-sort',
  props: ["list"],
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const flag: number = props.list[0]
    const left = ref<number[]>([])
    const right = ref<number[]>([])

    setTimeout(() => {
      props.list.slice(1).forEach((item: number) => {
        item > flag ? right.value.push(item) : left.value.push(item)
      })
    }, 100)

    return {
      flag,
      left,
      right
    }
  }
})
</script>
```

在页面组件Fragment.vue中使用：

```vue
<template>
  <h1>快速排序</h1>
  <h2>
    {{ list }}
  </h2>
  <div>
    <button @click="ok = !ok">SORT</button>
  </div>
  <hr>
  <template v-if="ok">
    <QuickSort :list="list"></QuickSort>
  </template>
</template>

<script lang="ts">
import QuickSort from "@/components/QuickSort.vue";
import {defineComponent, ref} from "vue"
import {shuffle} from "lodash"

export default defineComponent({
  components: {
    QuickSort
  },
  setup() {
    const ok = ref(false)
    const list = ref<number[]>([])
    for (let i = 1; i < 20; i++){
      list.value.push(i)
    }
    list.value = shuffle(list.value)
    return {list, ok}
  }
})
</script>
```

向QuickSort中传入一个长度为20被打乱顺序的数组：

![vuethree040](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree040.gif)

可以看到，每个递归的组件都是平级的：

![vuethree041](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree041.jpg)

而在Vue2中的递归组件往往是层层嵌套的，因为它只能存在一个根元素，同样的写法在Vue2中将会报错。

利用这一特性，我们就可以写一个干净的树组件等等了。

#### 1.3 Suspense

可以理解为异步组件的爹。用于方便地控制异步组件的一个挂起和完成状态。

直接上代码，

首先是一个异步组件，AsyncComponent.vue：

```vue
<template>
  <h2>AsyncComponent</h2>
</template>
<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  props: {
    timeout:{
      type: Number,
      required: true
    }
  },
  async setup(props) {
    const sleep = (timeout: number) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout)
      })
    }
    await sleep(props.timeout)
  }
})
</script>
```

在页面组件Suspense.vue中：

```vue
<template>
  <h1>Suspense</h1>
  <Suspense>
    <template #default>
      <AsyncComponent :timeout="5000"/>
    </template>

    <template #fallback>
      <p class="loading">loading {{ loadingStr }}</p>
    </template>
  </Suspense>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AsyncComponent from "@/components/AsyncComponent.vue"
import useLoading from "@/composables/useLoading";

export default defineComponent({
  components: {
    AsyncComponent
  },
  setup() {
    const {loading: loadingStr} = useLoading()
    return {loadingStr}
  }
})
</script>
```

简单来说，就是用Vue3提供的内置组件：Suspense将异步组件包起来，template #default中展示加载完成的异步组件，template #fallback中则展示异步组件挂起状态时需要显示的内容。

看看效果：

![vuethree042](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree042.gif)

#### 1.4 Teleport

理解为组件任意门，让你的组件可以任意地丢到html中的任一个DOM下。在react中也有相同功能的组件——Portal，之所以改名叫Teleport是由于html也准备提供一个原生的protal标签，为了避免重名就叫做Teleprot了。

利用这个特性，我们可以做的事情就比较有想象空间了。例如，写一个Ball组件，让它在不同的父组件中呈现不一样的样式甚至是逻辑，这些样式和逻辑可以写在父组件中，这样当这个Ball组件被传送到某个父组件中，就可以将父组件对其定义的样式和逻辑应用到Ball组件中了。再例如，可以在任意层级的组件中写一个需要挂载到外面去的子组件，比如一个Modal弹窗，虽然挂载在当前组件下也可以达到效果，但是有时候当前组件的根节点的样式可能会与之发生一些干扰或者冲突。

这里，我写了一个Modal弹窗的demo：

```vue
<template>
  <h1>Teleport——任意门</h1>
  <div class="customButton" @click="handleToggle">偷袭</div>
  <teleport to="body">
    <TeleportModal v-if="isOpen" @click="handleToggle"></TeleportModal>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
import TeleportModal from "@/components/TeleportModal.vue"

export default defineComponent({
  components: {
    TeleportModal
  },
  setup() {
    const isOpen = ref(false)
    const handleToggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      handleToggle
    }
  }
})
</script>
```

用Vue3内置的Teleport组件将需要被传送的Modal组件包起来，写好要被传送到的元素选择器。（有点像寄快递，用快递盒打包好，写上收货地址，起飞）

看看这个demo的效果：

![vuethree043](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree043.gif)

![vuethree044](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree044.jpg)

可以看到，马保国确实被踢到body下面去了(🐶)。

#### 1.5 createRenderer API

利用这个API，在Vue3中我们可以自由方便地去构建Web（浏览器）平台或非Web平台的自定义渲染器。

原理大概就是：将Virtual DOM和平台相关的渲染分离，通过createRendererAPI我们可以自定义Virtual DOM渲染到某一平台中时的所有操作，比如新增、修改、删除一个“元素”，我们可以这些方法中替换或修改为我们自定义的逻辑，从而打造一个我们自定义的渲染器。

当然，在web平台下是相对比较简单的，因为可以利用Vue的runtime-dom给我们提供的一个上层的抽象层，它帮我们完成了Virtual DOM渲染到Web DOM中的复杂浏览器接口编程操作，我们只需要在createRenderer的参数中传入一些自定义的逻辑操作即可自动完成整合，比如你可以在createElement方法中加一段自己的逻辑：

![vuethree045](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree045.jpg)

这样在每次创建新元素的时候都会跟你“打招呼”。

调用createRenderer以后的返回值是一个renderer，createApp这个方法就是这个renderer的一个属性方法，用它替代原生的createApp方法就可以使用我们自己的自定义渲染器了~

为此，我准备了一个用Three.js和自定义渲染器实现的3D方块demo，并且用composition API将我们之前写的侦听鼠标位置的逻辑复用过来，让这个3D方块跟着我们的鼠标旋转。

首先，写一个自定义渲染器：renderer.js:

```js
import { createRenderer } from '@vue/runtime-dom'
import * as THREE from 'three'

let webGLRenderer

// Three.js相关
function draw(obj) {
    const {camera,cameraPos, scene, geometry,geometryArg,material,mesh,meshY,meshX} = obj
    if([camera,cameraPos, scene, geometry,geometryArg,material,mesh,meshY,meshX].filter(v=>v).length<9){
        return
    }
    let cameraObj = new THREE[camera]( 40, window.innerWidth / window.innerHeight, 0.1, 10 )
    Object.assign(cameraObj.position,cameraPos)

    let sceneObj = new THREE[scene]()

    let geometryObj = new THREE[geometry]( ...geometryArg)
    let materialObj = new THREE[material]()

    let meshObj = new THREE[mesh]( geometryObj, materialObj )
    meshObj.rotation.x = meshX
    meshObj.rotation.y = meshY
    sceneObj.add( meshObj )
    webGLRenderer.render( sceneObj, cameraObj );
}

const { createApp } = createRenderer({
      insert: (child, parent, anchor) => {
          if(parent.domElement){
              draw(child)
          }
      },
      createElement:(type, isSVG, isCustom) => {
          alert('hi Channing~')
          return {
              type
          }
      },
      setElementText(node, text) {},
      patchProp(el, key, prev, next) {
          el[key] = next
          draw(el)
      },
      parentNode: node => node,
      nextSibling: node => node,
      createText: text => text,
      remove:node=>node
});


// 封装一个自定义的createApp方法
export function customCreateApp(component) {
  const app = createApp(component)
  return {
    mount(selector) {
        webGLRenderer = new THREE.WebGLRenderer( { antialias: true } );
        webGLRenderer.setSize( window.innerWidth, window.innerHeight );
        const parentElement =  document.querySelector(selector) || document.body
        parentElement.appendChild( webGLRenderer.domElement );
        app.mount(webGLRenderer)
    }
  }
}
```

App.vue，这里写一些对真实DOM的操作逻辑，比如我把meshX和meshY设置为了获取鼠标位置这个composition function 返回的鼠标x和y的计算属性值（为了减小旋转的灵敏度）。

```vue
<template>
  <div
      camera="PerspectiveCamera"
      :cameraPos={z:1}
      scene="Scene"
      geometry="BoxGeometry"
      :geometryArg="[0.2,0.2,0.2]"
      material="MeshNormalMaterial"
      mesh="Mesh"
      :meshY="y"
      :meshX="x"
  >
  </div>

</template>

<script>
import {computed} from 'vue'
import useMousePosition from "./useMousePosition";

export default {
  setup() {
    const {x: mouseX, y: mouseY} = useMousePosition()
    const x = computed(() => (mouseY.value)/200)
    const y = computed(() => (mouseX.value)/200)
    return {x,y}
  }
}
</script>
<style>

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
```

最后，在main.js中使用我们刚刚在renderer.js中封装的带有自定义渲染器的customCreateApp方法替换普通的createApp方法，即可：

```js
import { customCreateApp } from './renderer';
import App from "./App.vue";

customCreateApp(App).mount("#app")
```

我们看看最终的效果：

![vuethree046](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree046.gif)

#### 1.6 One more thing — Vite

最后，号称面向未来的构建工具Vite。

yarn dev 啪地一下应用就起来了，很快啊。

它的原理就是一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。支持 .vue文件 和热更新，并且热更新的速度不会随着模块增多而变慢。

当然，生产环境的构建还是使用的rollup进行打包。它的香是在于开发环境的调试速度。

为了更好地理解它的工作原理，我找了蜗牛老湿画的一张图：

![vuethree047](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree047.jpg)

然后，我创建了一个vite的演示demo，用来看看Vite是怎么处理我们的文件的。

```
yarn create vite-app vite-demo
cd vite-demo && yarn && yarn dev
```

打开http://localhost:3000/

![vuethree048](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree048.jpg)

看到localhost的请求结果，依然是保留了ES Module类型的代码

然后Vite的服务器拦截到你对main.js的请求，然后返回main.js的内容给你，里面依然是ES Module的类型，

又拦截到vue.js、App.vue，继续返回相应的内容给你，如此类推……

所以Vite应用启动的过程完全跳过了打包编译，让你的应用秒起。文件的热更新也是如此，比如当你修改了App.vue的内容，它又拦截给你返回一个新的编译过后的App.vue文件：

![vuethree049](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vuethree049.jpg)

对于大型的项目来说，这种毫秒级的响应实在是太舒服了。去年参与过一个内部组件库的开发工作，当时是修改的webpack插件，每次修改都得重启项目，每次重启就是四五分钟往上，简直感觉人要裂开。

当然，也不至于到可以完全取代Webpack的夸张地步，因为Vite还是在开发阶段，许多工程化的需求还是难以满足的，比如Webpack丰富的周边插件等等。

### 二、生命周期函数

vue2.x有8个生命周期函数：

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

在vue3中，新增了一个setup生命周期函数，setup执行的时机是在beforeCreate生命函数之前执行，因此在这个函数中是不能通过this来获取实例的；同时为了命名的统一，将beforeDestroy改名为beforeUnmount，destroyed改名为unmounted，因此vue3有以下生命周期函数：

- beforeCreate（建议使用setup代替）
- created（建议使用setup代替）
- setup
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

同时，vue3新增了生命周期钩子，我们可以通过在生命周期函数前加on来访问组件的生命周期，我们可以使用以下生命周期钩子：

- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmounted
- onErrorCaptured
- onRenderTracked
- onRenderTriggered

那么这些钩子函数如何来进行调用呢？我们在setup中挂载生命周期钩子，当执行到对应的生命周期时，就调用对应的钩子函数：

```js
import { onBeforeMount, onMounted } from "vue";
export default {
  setup() {
    console.log("----setup----");
    onBeforeMount(() => {
      // beforeMount代码执行
    });
    onMounted(() => {
      // mounted代码执行
    });
  },
}
```

### 三、非兼容的功能

非兼容的功能主要是一些和Vue2.x版本改动较大的语法，已经在Vue3上可能存在兼容问题了。

#### 3.1 data、mixin和filter

在Vue2.x中，我们可以定义data为object或者function，但是我们知道在组件中如果data是object的话会出现数据互相影响，因为object是引用数据类型；

在Vue3中，data只接受function类型，通过function返回对象；同时Mixin的合并行为也发生了改变，当mixin和基类中data合并时，会执行浅拷贝合并：

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1,
        address: {
          prov: 2,
          city: 3,
        },
      }
    }
  }
}
const Component = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2,
        address: {
          prov: 4,
        },
      }
    }
  }
}

// vue2结果：
{
  id: 2,
  name: 'Jack',
  address: {
    prov: 4,
    city: 3
  }
}

// vue3结果：
user: {
  id: 2,
  address: {
    prov: 4,
  },
}
```

我们看到最后合并的结果，vue2.x会进行深拷贝，对data中的数据向下深入合并拷贝；而vue3只进行浅层拷贝，对data中数据发现已存在就不合并拷贝。

在vue2.x中，我们还可以通过过滤器filter来处理一些文本内容的展示：

```html
<template>
  <div>{{ status | statusText }}</div>
</template>
<script>
  export default {
    props: {
      status: {
        type: Number,
        default: 1
      }
    },
    filters: {
      statusText(value){
        if(value === 1){
          return '订单未下单'
        } else if(value === 2){
          return '订单待支付'
        } else if(value === 3){
          return '订单已完成'
        }
      }
    }
  }
</script>
```

最常见的就是处理一些订单的文案展示等；然而在vue3中，过滤器filter已经删除，不再支持了，官方建议使用方法调用或者计算属性computed来进行代替。

#### 3.2 v-model

在Vue2.x中，v-model相当于绑定value属性和input事件，它本质也是一个语法糖：

```html
<child-component v-model="msg"></child-component>
<!-- 相当于 -->
<child-component :value="msg" @input="msg=$event"></child-component>
```

在某些情况下，我们需要对多个值进行双向绑定，其他的值就需要显示的使用回调函数来改变了：

```html
<child-component 
    v-model="msg" 
    :msg1="msg1" 
    @change1="msg1=$event"
    :msg2="msg2" 
    @change2="msg2=$event">
</child-component>
```

在vue2.3.0+版本引入了.sync修饰符，其本质也是语法糖，是在组件上绑定@update:propName回调，语法更简洁：

```html
<child-component 
    :msg1.sync="msg1" 
    :msg2.sync="msg2">
</child-component>

<!-- 相当于 -->

<child-component 
    :msg1="msg1" 
    @update:msg1="msg1=$event"
    :msg2="msg2"
    @update:msg2="msg2=$event">
</child-component>
```

Vue3中将v-model和.sync进行了功能的整合，抛弃了.sync，表示：多个双向绑定value值直接用多个v-model传就好了；同时也将v-model默认传的prop名称由value改成了modelValue：

```html
<child-component 
    v-model="msg">
</child-component>

<!-- 相当于 -->
<child-component 
  :modelValue="msg"
  @update:modelValue="msg = $event">
</child-component>
```

如果我们想通过v-model传递多个值，可以将一个argument传递给v-model：

```html
<child-component 
    v-model.msg1="msg1"
    v-model.msg2="msg2">
</child-component>

<!-- 相当于 -->
<child-component 
    :msg1="msg1" 
    @update:msg1="msg1=$event"
    :msg2="msg2"
    @update:msg2="msg2=$event">
</child-component>
```

#### 3.3 v-for和key

在Vue2.x中，我们都知道v-for每次循环都需要给每个子节点一个唯一的key，还不能绑定在template标签上，

```html
<template v-for="item in list">
  <div :key="item.id">...</div>
  <span :key="item.id">...</span>
</template>
```

而在Vue3中，key值应该被放置在template标签上，这样我们就不用为每个子节点设一遍：

```html
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

#### 3.4 v-bind合并

在vue2.x中，如果一个元素同时定义了v-bind="object"和一个相同的单独的属性，那么这个单独的属性会覆盖object中的绑定：

```html
<div id="red" v-bind="{ id: 'blue' }"></div>
<div v-bind="{ id: 'blue' }" id="red"></div>

<!-- 最后结果都相同 -->
<div id="red"></div>
```

然而在vue3中，如果一个元素同时定义了v-bind="object"和一个相同的单独的属性，那么声明绑定的顺序决定了最后的结果（后者覆盖前者）

```html
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="blue"></div>

<!-- template -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- result -->
<div id="red"></div>
```

#### 3.5 v-for中ref

vue2.x中，在v-for上使用ref属性，通过this.$refs会得到一个数组：

```vue
<template
  <div v-for="item in list" :ref="setItemRef"></div>
</template>
<script>
export default {
  data(){
    list: [1, 2]
  },
  mounted () {
    // [div, div]
    console.log(this.$refs.setItemRef) 
  }
}
</script>
```

但是这样可能不是我们想要的结果；因此vue3不再自动创建数组，而是将ref的处理方式变为了函数，该函数默认传入该节点：

```vue
<template
  <div v-for="item in 3" :ref="setItemRef"></div>
</template>
<script>
import { reactive, onUpdated } from 'vue'
export default {
  setup() {
    let itemRefs = reactive([])

    const setItemRef = el => {
      itemRefs.push(el)
    }

    onUpdated(() => {
      console.log(itemRefs)
    })

    return {
      itemRefs,
      setItemRef
    }
  }
}
</script>
```

#### 3.6 v-for和v-if优先级

在vue2.x中，在一个元素上同时使用v-for和v-if，v-for有更高的优先级，因此在vue2.x中做性能优化，有一个重要的点就是v-for和v-if不能放在同一个元素上。

而在vue3中，v-if比v-for有更高的优先级。因此下面的代码，在vue2.x中能正常运行，但是在vue3中v-if生效时并没有item变量，因此会报错：

```vue
<template>
  <div v-for="item in list" v-if="item % 2 === 0" :key="item">{{ item }}</div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
};
</script>
```



<br/>
<br/>
<br/>

转载自：[https://juejin.cn/post/6898121032171945992](https://juejin.cn/post/6898121032171945992)