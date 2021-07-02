---
title: vue2-源码解析-编译器目的
date: 2020-10-10 14:38:44
tags:
categories:
- VUE
---
### 一、编译器目的

编译器目标是创建渲染函数，渲染函数执行后将得到 VNode 树（虚拟DOM）。 
<!--more-->
单从Vue的角度来说，template（模板）并没有存在的必要，它只是为了方便开发者使用Vue而设计的。在Vue中，真正要使用的是从template编译生成的渲染函数，利用它可以直接生成虚拟DOM。

实际上Vue向我们提供了直接书写渲染函数的能力（这样就可以不用写模板，也不需要编译器）。但是渲染函数写起来往往不那么直观，如果是一个很复杂的DOM结构，开发者很难知道如何去书写这个渲染函数。为了降低开发者学习Vue的心智负担，Vue提供了更直观、更简洁的模板，它基于HTML语法，对前端开发者来说非常友好。但是Vue最终需要的还是渲染函数，于是Vue就必须具备将模板编译成渲染函数的能力，而这个能力，就是由编译器（compiler）提供的。

没有编译器，需要写一个渲染函数：

```js
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

```html
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

```js
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

```js
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

```html
<div id="app">
  <ul>
    <li v-for="item in items">
      itemid:{{item.id}}
    </li>
  </ul>
</div>
```

当我们把这个模板作为字符串传入parse函数，并附带相关的配置options后，就会得到下面这个JavaScript对象：

```js
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

```html
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

```html
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

```js
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

```js
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

```html
<template>
  <div>
    <h1>标题</h1>
    <p>{{ content }}</p>
  </div>
</template>
```

它生成的渲染函数如下：

```js
"with(this){return _c('div',[_c('h1',[_v('标题')]),_c('p',[_v(_s(content))])])}"
```

上述字符串作为参数传递给Function构造函数后得到的结果如下：

```js
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

```js
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

```js
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

```js
return `_o(${genElement(el, state)},${state.onceId++},${key})`
```

即从ast中解析出当前节点的属性，作为参数传入生成当前节点类型对应的辅助函数中，最终以字符串的形式返回。这样就会得到形如_o( … )这样一个字符串，经过递归处理，最终会形成一个很长的调用栈，这就是渲染函数了。

编译器最终生成的结果就是一个字符串形式的渲染函数，以及静态根节点对应的渲染函数数组。将该字符串传入Function即可得到渲染函数，调用数组中的函数则可以生成对应的静态根节点。而得到渲染函数后，调用它就可以得到当前组件对应的虚拟DOM节点（VNode），它将用于生成虚拟DOM树。

编译器在Vue中是一个相对独立的存在，它的唯一作用就是将模板编译为渲染函数，供虚拟DOM使用。如果项目经过webpack打包（它会提前编译模板），或者每个组件都是手写的渲染函数，那么项目中的Vue是不包含编译器的，这样可以压缩库的大小。
