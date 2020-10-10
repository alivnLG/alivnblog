---
title: vue知识总结一
date: 2020-10-09 11:00:15
tags:
- VUE
categories:
- VUE
---
1.生命周期beforeCreate中获取不到data值。

<!--more-->
2.vue中数组监听原理  

通过建立原型拦截器，首先数组能够修改自身的方法有push,pop,shift,unshift,splice,sort,resverse,通过重新定义上述方法中的内容，来实现调用上述方法时触发依赖，从而通知监听该数组的订阅者执行相应的更新函数。对数据添加属性描述符中的getter与setter存取描述符实现劫持。

```
var obj = { __x: 1 };
Object.defineProperty(obj, "x", {
    set: function(x){ console.log("watch"); this.__x = x; },
    get: function(){ return this.__x; }
});
obj.x = 11; // watch
console.log(obj.x); // 11
```

但是Object.defineProperty()中的setter是无法直接实现数组中值的改变的劫持行为的，想要实现对于数组下标直接访问的劫持需要使用索引对每一个值进行劫持，但是在Vue中考虑性能问题并未采用这种方式，所以需要特殊处理数组的变动。

最小化的实现代码：
```
const arrayPrtot = Array.prototype
const arrayMethods = Object.create(arrayPrtot);
const orig = arrayPrtot.push;//缓存原始方法
Object.defineProperty(arrayMethods, 'push', {
    value: function mutator(...args) {
        console.log('我使用了push改变了数组哦')
        return orig.apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true
})
var arr = [];
arr.__proto__ = arrayMethods;//给需要监听的数组加上拦截器
arr.push(1);
console.log(arr);
```
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

控制台输出：

![vue003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue003.jpg)

vue实现的源码：

```
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
 
import { def } from '../util/index'
 
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
 
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
 
/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```

实现原理图：

![vue004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue004.jpg)

**重赋值**  
Object.defineProperty()方法无法劫持对于数组值下标方式访问的值的改变，这样的话就需要避免这种访问，可以采用修改后再赋值的方式，也可以采用数组中的一些方法去形成一个新数组，数组中不改变原数组并返回一个新数组的方法有slice、concat等方法以及spread操作符，当然也可以使用map方法生成新数组，此外在Vue中由于重写了splice方法，也可以使用splice方法进行视图的更新。

```
var obj = { __x: [1, 2, 3] };
Object.defineProperty(obj, "x", {
    set: function(x){ console.log("watch"); this.__x = x; },
    get: function(){ return this.__x; }
});
obj.x[0] = 11;
obj.x = obj.x; // watch
console.log(obj.x); // [11, 2, 3]
```

**Proxy**  
Vue3.0使用Proxy实现数据劫持，Object.defineProperty只能监听属性，而Proxy能监听整个对象，通过调用new Proxy()，可以创建一个代理用来替代另一个对象被称为目标，这个代理对目标对象进行了虚拟，因此该代理与该目标对象表面上可以被当作同一个对象来对待。代理允许拦截在目标对象上的底层操作，而这原本是Js引擎的内部能力，拦截行为使用了一个能够响应特定操作的函数，即通过Proxy去对一个对象进行代理之后，我们将得到一个和被代理对象几乎完全一样的对象，并且可以从底层实现对这个对象进行完全的监控。

```
var target = [1, 2, 3];
var proxy = new Proxy(target, {
    set: function(target, key, value, receiver){ 
        console.log("watch");
        return Reflect.set(target, key, value, receiver);
    },
    get: function(target, key, receiver){ 
        return target[key];
    }
});
```

**参考**

```
https://zhuanlan.zhihu.com/p/50547367
https://juejin.im/post/6844903699425263629
https://juejin.im/post/6844903597591773198
https://segmentfault.com/a/1190000015783546
https://cloud.tencent.com/developer/article/1607061
https://www.cnblogs.com/tugenhua0707/p/11754291.html
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
```

3.编译器目标是创建渲染函数，渲染函数执行后将得到 VNode 树（虚拟DOM）。 

单从Vue的角度来说，template（模板）并没有存在的必要，它只是为了方便开发者使用Vue而设计的。在Vue中，真正要使用的是从template编译生成的渲染函数，利用它可以直接生成虚拟DOM。

实际上Vue向我们提供了直接书写渲染函数的能力（这样就可以不用写模板，也不需要编译器）。但是渲染函数写起来往往不那么直观，如果是一个很复杂的DOM结构，开发者很难知道如何去书写这个渲染函数。为了降低开发者学习Vue的心智负担，Vue提供了更直观、更简洁的模板，它基于HTML语法，对前端开发者来说非常友好。但是Vue最终需要的还是渲染函数，于是Vue就必须具备将模板编译成渲染函数的能力，而这个能力，就是由编译器（compiler）提供的。

没有编译器，需要写一个渲染函数：
```
var app = new Vue({
  el: "#app",
  data: {
    items: [{id: 1}]
  },
  render(){
    with(this){
    return 
       _c('div',{
         attrs:{"id":"app"}
       },
       [_c('ul',_l((items),function(item){
         return _c('li',
           [_v("\n itemid:"+_s(item.id)+"\n ")]
         )}
        )
       )]
     )}
  }
})

```

渲染函数(render)写成模板

```
<template>
  <ul>
    <li v-for="item in items">
      itemid:{{item.id}}
    </li>
  </ul>
</template>
```

Vue需要能将易于开发者理解的模板转化为易于Vue使用的渲染函数。Vue把实现这个功能的代码封装在src/compiler下面（还有少量平台相关的代码位于src/platforms/web/compiler下）。我们把负责将模板编译成渲染函数的代码作为一个整体称为编译器。

**模板的核心编译过程**

```
1.解析模板，生成抽象语法树。
2.标记静态节点。
3.生成渲染函数。
```

文件src/compiler/index.js，清晰地表达了模板编译的步骤：

```
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)  //生成抽象语法树
  if (options.optimize !== false) {
    optimize(ast, options)       //标记静态节点
  }
  const code = generate(ast, options) //生成渲染函数（及静态渲染函数）
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

这里使用了JavaScript中的偏函数，它是一种高阶函数，借鉴自函数式编程思想。偏函数利用了JavaScript中的函数既可以作为参数传入另一个函数，也可以作为一个函数的返回值的特性，可以将一些通用函数包装成专用函数。

上面的代码中，首先引入了编译的三个步骤所需要的函数：parse、optimize和generate。然后是一个通用的编译器的构造器createCompilerCreator，它接受一个基础构造器，这里的大部分代码都是在定义这个基础构造器。

所以实际上createCompiler的值是createCompilerCreator的返回值，而不是我们上面看到的那个对象（它是我们传入的参数baseCompiler的返回值）。所以下面我们就来看createCompilerCreator是怎么实现的：

```
//引自src/compiler/create-compiler.js
export function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
      ...
      // 将options的参数归并到finalOptions，为了方便理解，这里写的伪代码
      mergeOptionsToFinalOptions();
	  //调用传入的基础编译器，生成编译后结果
      const compiled = baseCompile(template.trim(), finalOptions)
	  ...
      return compiled
    }

    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```

从上面的代码可以看出，createCompilerCreator 的返回值是一个名为createCompiler的函数。它接受一个baseOptions作为参数，返回一个名为compile的函数，这个函数实际上就是我们的编译器了。我们只需要把模板（template）作为参数传给它，它就会返回给我们一个非常有用的对象，该对象包含了三个属性，分别是抽象语法树、字符串格式的渲染函数和静态渲染函数数组。至此，模板就被转化成了一个包含上述三个属性的对象。

```
以createCompilerCreator函数为入口，我们传入了一个基础编译器函数baseCompiler作为参数，得到了一个createCompiler函数。
调用createCompiler函数，传入一个配置对象baseOptions作为参数，得到一个编译器函数compile。
调用compile函数，传入模板字符串，得到一个对象，包含抽象语法树、渲染函数和静态渲染函数数组。
```

**编译过程详解**

（1）解析模板，生成抽象语法树

Vue将这个功能封装成了函数parse，使用parse( template, options )即可将template解析为抽象语法树。

假设我们有如下的模板

```
<div id="app">
  <ul>
    <li v-for="item in items">
      itemid:{{item.id}}
    </li>
  </ul>
</div>
```

当我们把这个模板作为字符串传入parse函数，并附带相关的配置options后，就会得到下面这个JavaScript对象：

```
{
    "type": 1,
    "tag": "div",
    "attrsList": [
        {
            "name": "id",
            "value": "app"
        }
    ],
    "attrsMap": {
        "id": "app"
    },
    "children": [
        {
            "type": 1,
            "tag": "ul",
            "attrsList": [],
            "attrsMap": {},
            "parent": {
                "$ref": "$"
            },
            "children": [
                {
                    "type": 1,
                    "tag": "li",
                    "attrsList": [],
                    "attrsMap": {
                        "v-for": "item in items"
                    },
                    "parent": {
                        "$ref": "$[\"children\"][0]"
                    },
                    "children": [
                        {
                            "type": 2,
                            "expression": "\"\\n      itemid:\"+_s(item.id)+\"\\n    \"",
                            "tokens": [
                                "\n      itemid:",
                                {
                                    "@binding": "item.id"
                                },
                                "\n    "
                            ],
                            "text": "\n      itemid:{{item.id}}\n    "
                        }
                    ],
                    "for": "items",
                    "alias": "item",
                    "plain": true
                }
            ],
            "plain": true
        }
    ],
    "plain": false,
    "attrs": [
        {
            "name": "id",
            "value": "\"app\""
        }
    ]
}
```

从JavaScript的角度来说，这是一个普通的对象（同时也是一个标准的JSON对象）。它本身是一种树形结构，是对模板结构的一种抽象描述，因此这个对象就被称为抽象语法树。这个转化正是parse函数的最终目的。

parse函数中最重要的是调用了parseHTML函数来解析HTML结构，这个解析过程与HTML引擎的解析过程类似。以下面的简单模板为例：

```
<div id="app">
  <p>{{ name }}</p>
<div>
```

下面就来看parseHTML函数的大致过程（这主要涉及到编译原理和正则表达式的知识，我们只进行简述）：
```
1.定位“<”，因为它是标签的开始标记。
2.使用正则表达式解析“<”后面的单词，它是标签名，这里是div。
3.依次解析标签名后面的属性，它以“=”作为标志，因此可以使用正则表达式进行解析。
4.匹配“>”，它表示开始标签结束。此时函数解析的内容包括<div id=“app”>。解析完开始标签后，将解析出来的标签压栈，因为之后需要匹配结束标签。此时栈内就保存了div对应的解析结果，即：
stack.push(
{ 
  tag: tagName, 
  lowerCasedTag: tagName.toLowerCase(), 
  attrs: attrs, 
  start: match.start, 
  end: match.end 
})
5.继续按照上面的方式，解析“<”，它表示一个新的标签开始。重复1 - 4步，即可解析出p元素，然后将其按同样的方式压栈。
6.解析绑定的变量{{ name }}。注意，这里所谓的解析并不替换name的值，而是以"_s(name)"的格式保存到p的expression属性里，表示这是一个表达式，在生成渲染函数时是需要替换的。_s是编译器提供的工具函数，它负责文本替换。
7.解析p元素的结束标签</p>，并将之前压入栈的p对象出栈。
8.解析div元素的结束标签</div>，并将之前栈内的div元素出栈。
```

经过上述步骤，template模板的每个字符都被解析完毕，栈内的元素也被清空，因此模板被完全解析，最终得到前面展示的那样的抽象语法树。这个抽象语法树就是parse函数最终的输出。

（2）标记静态节点

标记静态节点的主要目的是提高虚拟DOM比较的效率。虚拟DOM通过diff算法来判断一棵树的哪一部分发生了变化，然后根据这个变化去更新实际的DOM。如果不进行静态节点标记，Vue就必须要完全地比较树中的所有节点，如下面的例子：

```
<template>
  <div>
    <h1>标题</h1>
    <p>{{ content }}</p>
  </div>
</template>
```

上面的模板编译完将生成下面的结构：

![vue005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue005.jpg)

显然div的左侧分支h1的内容永远都不会变化，所以在进行比较时，就没有必要去对h1进行比对。这样每次数据发生变化时，只需要去检查p元素的内容有没有变化即可，这在大部分情况下可以大大提升diff算法的效率（不过对于这里的情况，h1还是会参与比对，因为它只含有一个文本节点，进行处理的收益很低）。

Vue标记静态节点分为两步：

```
1.标记所有静态节点
2.标记静态根节点
```

代码如下（引自src/compiler/optimizar.js）：

```
export function optimize (root, options) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // 标记所有静态子节点
  markStatic(root)
  // 标记静态根节点
  markStaticRoots(root, false)
}
```

实际上标记静态节点的目的就是找到所有静态根节点，然后设置其staticRoot = true，这样在进行虚拟DOM树比较的时候就可以跳过该节点。静态根节点可以这样描述：如果某个节点的所有直接子节点都是静态节点，那么该节点就是静态根节点。这也就意味着，一个节点一旦被标记为静态根节点，那么它的直接子节点本身是不会变化的（但是子节点的子节点不一定）。

首先我们来看第一步，Vue是如何认定一个节点为静态节点的。Vue使用一个函数isStatic来检查一个节点是否是静态节点，静态节点的条件包括：

```
1.是文本节点（node.type === 3）。直接判定为静态节点。
2.有pre属性。这表示开发者不希望节点的内容被编译，因此认定为静态节点。
3.没有动态绑定、没有if/for条件、不是Vue内置组件、不是自定义组件、不是带有for条件的template的直接子元素以及staticKeys没有被缓存。满足这里的所有条件也将被判定为静态节点。
```

标记完所有的静态节点后，就可以进行静态根节点的标记。该过程从根节点开始进行，首先从当前节点开始检查，当满足下面几个条件时，就可以认为该节点是静态根节点：

```
1.被标记为static。
2.直接子元素存在（children.length > 0）。
3.不满足直接子元素只有一个，且是文本节点。
```

这里之所以不把没有子节点以及只有一个文本节点的静态节点认定为静态根节点，是因为标记它带来的收益很低，甚至没有直接刷新该节点的性能高，所以干脆不对它进行标记。注意，这里判定一个节点是否为静态根节点，不需要检查它子节点的后代节点，因为diff算法在做比较的时候，每次就只比较当前节点及其子节点（后代节点是递归比较的，与当前节点无关）。因此，只要一个节点是静态的，且直接子元素不变，那它就被认为是静态根节点。

随后就需要对当前节点的子元素进行遍历，来判断它的子元素是否为静态根节点，然后一直递归下去：

```
if (node.children) {
  for (let i = 0, l = node.children.length; i < l; i++) {
    markStaticRoots(node.children[i], isInFor || !!node.for)
  }
}
if (node.ifConditions) {
  for (let i = 1, l = node.ifConditions.length; i < l; i++) {
    markStaticRoots(node.ifConditions[i].block, isInFor)
  }
}
```

首先检查当前节点的子元素是否为静态根节点，然后检查所有带有if判断条件的子节点，这样就可以遍历所有的子节点，进行静态根节点的标记。在标记子节点时，会继续递归地遍历，直到所有的节点都被标记完。

（3）生成渲染函数

得到经过标记的抽象语法树（AST）后，就可以进行渲染函数生成了。实际上这里生成的渲染函数并不是一个真正的函数，而是一个字符串，不过把它作为参数传递给Function构造函数，就可以得到渲染函数了。我们先来看一下一个渲染函数的结构，以下面的模板为例：

```
<template>
  <div>
    <h1>标题</h1>
    <p>{{ content }}</p>
  </div>
</template>
```

它生成的渲染函数如下：

```
"with(this){return _c('div',[_c('h1',[_v('标题')]),_c('p',[_v(_s(content))])])}"
```

上述字符串作为参数传递给Function构造函数后得到的结果如下：

```
new Function("with(this){return _c('div',[_c('h1',[_v('标题')]),_c('p',[_v(_s(content))])])}")

=> f(){
  with(this){
    return _c('div', [
      _c('h1', [
        [_v('标题')]
      ]),
      _c('p', [
        _v(_s(content))
      ])
    ])
  }
}
```

该字符串被解析为了一个函数，函数中带有大量的辅助函数，这些辅助函数是在执行渲染函数时将被调用的，每个辅助函数可以用于生成不同类型的节点。如_c用于生成普通的标签节点，_v用于生成文本节点，而_s用于生成字符串（因此传入_s的值将作为变量，调用toString方法转化为字符串）。所有这些辅助函数定义在src/core/instance/render-helpers下面。

下面我们来看Vue根据抽象语法树生成渲染函数的大致过程。引自src/compiler/codegen/index.js：

```
export function generate (ast, options) {
  const state = new CodegenState(options)  //获取状态
   //使用AST和状态生成渲染函数
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
}
```

这样返回的render就是我们上面说的那个很长的字符串了，在需要调用的时候，传入Function构造函数即可。staticRenderFns在渲染静态根节点时被调用，它是一个数组，每个成员对应一个静态根节点。上面的代码中，最重要的就是genElement函数，它会根据ast的结构生成不同类型的节点，比如遇到一个div，它就会返回_c(‘div’, …)这样一段字符串，如果这个div内部还有待解析的节点，就会递归下去，生成上面的一段很长的字符串。

genElement的执行过程如下：

```
export function genElement (el, state) {
  if (el.parent) {  //继承pre属性
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)  //生成静态节点
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)   //生成一次性节点
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)    //生成for节点
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)     //生成if节点
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'  //生成子节点
  } else if (el.tag === 'slot') {
    return genSlot(el, state)   //生成插槽节点
  } else {
    // 生成组件或者标签对象
    let code
    if (el.component) {    //解析注册的组件
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}
```

这里每个分支用于处理某个特定类型的节点，处理流程相对较为复杂，这些函数的返回值形如：

```
return `_o(${genElement(el, state)},${state.onceId++},${key})`
```

即从ast中解析出当前节点的属性，作为参数传入生成当前节点类型对应的辅助函数中，最终以字符串的形式返回。这样就会得到形如_o( … )这样一个字符串，经过递归处理，最终会形成一个很长的调用栈，这就是渲染函数了。

编译器最终生成的结果就是一个字符串形式的渲染函数，以及静态根节点对应的渲染函数数组。将该字符串传入Function即可得到渲染函数，调用数组中的函数则可以生成对应的静态根节点。而得到渲染函数后，调用它就可以得到当前组件对应的虚拟DOM节点（VNode），它将用于生成虚拟DOM树。

编译器在Vue中是一个相对独立的存在，它的唯一作用就是将模板编译为渲染函数，供虚拟DOM使用。如果项目经过webpack打包（它会提前编译模板），或者每个组件都是手写的渲染函数，那么项目中的Vue是不包含编译器的，这样可以压缩库的大小。

4.组件内 data 发生变化时会通知其对应 watcher，执行异步更新

5.Vue更新使用的patch算法(diff算法)简介

（1）是什么

patch,中文翻译为“补丁”，vue更新时的patch算法，也就就是通过打补丁的形式充分利用原有的dom进行增加、删除、移动的操作，从而避免了重新创建大量dom操作，进一步提升了性能。

（2）当数据发生变化时，vue是怎么更新节点的

要知道渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排(回流)，有没有可能我们只更新我们修改的那一小块dom而不要更新整个dom呢？patch算法能够帮助我们。

我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上。

Vue中diff算法过程就是调用名为patch函数

（3）virtual DOM和真实DOM的区别？

virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。比如dom是这样的：

```
<div>
    <p>123</p>
</div>
```

对应的virtual DOM（伪代码）：

```
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```

（4）diff算法

**diff算法的比较时注意，只会在同级进行比较**

在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。

```
//old
<div>
    <p>123</p>
</div>

//new
<div>
    <span>456</span>
</div>
```

上面的代码会分别比较同一层的两个div以及第二层的p和span，但是不会拿div和span作比较。在别处看到的一张很形象的图：(diff算法只会在同级比较)

![vue006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue006.jpg)

**diff算法触发过程**

vue的双向绑定，是通过重置Object.defineProperty中的get和set方法来进行数据劫持，进而触发修改视图操作。（而React则是通过setState方法手动触发修改视图的操作的).
所以当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch方法给真实的DOM打补丁，更新相应的视图。

![vue007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue007.jpg)

**patch算法的具体算法**

第一步，patch函数接收两个参数oldVnode和Vnode分别代表新旧节点的对象（形如：Vnode={type:’’,props:{},children:[ ]}）

```
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
        }
    }
    // some code 
    return vnode
}
```

第二步，根据sameVnode方法，判断两节点是否值得比较，值得比较则执行patchVnode，不值得比较则用Vnode替换oldVnode,再渲染真实dom。

```
//通过判断key、标签名、是否为注释、data等是否相等，来判断是否有必要进行比较。

function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode。

第三步，patchVnode

当我们确定两个节点值得比较之后我们会对两个节点指定patchVnode方法。那么这个方法做了什么呢？

```
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

这个函数做了以下事情：

```
找到对应的真实dom，称为el
判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
如果oldVnode有子节点而Vnode没有，则删除el的子节点
如果oldVnode没有子节点而Vnode有子节点，则将Vnode的子节点真实化之后添加到el
如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要
其他几个点都很好理解，我们详细来讲一下updateChildren
```

第四步，updateChildren

这个函数做了什么？

```
将Vnode的子节点Vch和oldVnode的子节点oldCh提取出来
oldCh和vCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。同时，一旦StartIdx>EndIdx表明oldCh和vCh至少有一个已经遍历完了，就会结束比较。
```

**图解updateChildren(详细的diff算法)**

粉红色的部分为oldCh（旧的vnode） 、黄色的部分为vCh(新的vnode)

![vue008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue008.jpg)

我们将它们取出来并分别用s和e指针指向它们的头child和尾child

![vue009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue009.jpg)

现在分别对oldS、oldE、S、E两两做sameVnode比较，有四种比较方式，当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，这句话有点绕，打个比方

```
如果是oldS和E匹配上了，那么真实dom中的第一个节点会移到最后
如果是oldE和S匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动
如果四种匹配没有一对是成功的，那么遍历oldChild，S挨个和他们匹配，匹配成功就在真实dom中将成功的节点移到最前面，如果依旧没有成功的，那么将S对应的节点插入到dom中对应的oldS位置，oldS和S指针向中间移动。
```

![vue010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue010.jpg)

![vue011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue011.jpg)

![vue012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue012.jpg)

6.key 的作用

key 的特殊属性主要用在 Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用key，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。

有相同父元素的子元素必须有。重复的key会造成渲染错误。

它也可以用于强制替换元素/组件而不是重复使用它。

建议尽可能使用 v-for 来提供 key ，除非迭代 DOM 内容足够简单，或者你是故意要依赖于默认行为来获得性能提升。因为它是 Vue 识别节点的一个通用机制， key 并不特别与 v-for 关联。

7.vue-router的两种模式（hash和history）及区别

前端路由的核心，就在于——改变试图的同时不会向后端发出请求。

（1）hash - 即地址栏URL中的 # 符号（此hash不是密码学里的散列运算）
比如这个URL：http：//www.abc.com/#/hello,hash的值为#/hello.它的特点在于：hash虽然出现在URL中，但不会被包括在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。

（2）history - 利用了HTML5 History Interface中新增的pushState()和replaceState（）方法。（需要特定浏览器支持）

这两个方法应用于浏览器的历史记录栈，在当前已有的back、forward、go的基础上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的URL，但浏览器不会即向后端发送请求。

因此可以说，hash模式和histoury模式都是属于浏览器自身的特性，Vue-Router只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。

```
1：pushState()设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，因此只能设置与当前URL同文档的URL；
2：pushState()设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
3：pushState()通过stateObject参数可以添加任意类型的数据到记录中；而hash只可添加短字符串；
4：pushState()可额外设置title属性供后续使用。
```

当然history也不是样样都好。SPA虽然在浏览器里游刃有余，单真要通过URL向后端发起HTTP请求时，两者的差异就来了。尤其在用户手动输入URL后回车，或者刷新（重启）浏览器的时候。

```
1：hash 模式下，仅hash符号之前的内容会被包含在请求中，如http://www.abc.com,因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。
2：history模式下，前端的URL必须和实际向后端发起请求的URL一致。如htttp://www.abc.com/book/id。如果后端缺少对/book/id 的路由处理，将返回404错误、
```

