---
title: web-1-提高代码整洁度方法
date: 2021-01-05 11:24:59
top: true
tags:
- 代码整洁度
categories:
- 前端综合
---
### 一、JS篇
<!--more-->
#### 1.1 可读的代码是可维护的

作为一名开发人员，我的目标是编写高质量的代码。团队中的每个开发人员，不管他/她的技术水平如何，都必须能够通过阅读理解我所写的代码。代码的可读性有助于年轻的开发人员编写代码时更加自信。

#### 1.2 删除不必要的代码注释

不需要任何注释来解释这个接收 X 个数组并将它们合并到一个新的数组中的函数。

```js
function mergeArrays(...arrays) {
    let mergedArray = []

    arrays.forEach(array => {
        mergedArray = [...mergedArray, ...array]
    })

    return mergedArray
}
```

像示例代码，如果增添文档并不能提高可读性。我希望团队成员知道展开操作符是什么。如果他们不清楚，他们应该在代码审查 code review 时来问我。

当然，我们不要忘记注释的代码块。如果我们忘记了，这里只有一个解决方案：删除代码。既然了不起的 git 可以检出旧代码，那么为什么还要把它留在注释中呢？

请停止把你的代码库变成垃圾场。

#### 1.3 重视命名

如果你看到函数名 mergeArrays，就应该很清楚地知道这是一个将 X 个数组组合成一个新的数组的函数。

我知道命名是件难事。函数越复杂，命名就越难… 我有个法子让命名更容易，举个例子：有一个函数，它会合并两个数组并生成一个新的唯一的数字列表。你会怎么命名？是下面这样吗？

```js
function mergeNumberListIntoUniqueList(listOne, listTwo) {
    return [...new Set([...listOne, ...listTwo])]
}
```

mergeNumberListIntoUniqueList 这个名字并没有那么糟糕，至少功能如其名。命名的难点在于这个函数要做两件事：一个函数做的事情越多，命名它就越困难。将这个函数拆分为两个单独的函数，命名会更容易且函数复用更容易。

```js
function mergeLists(listOne, listTwo) {
    return [...listOne, ...listTwo]
}

function createUniqueList(list) {
    return [...new Set(list)]
}
```

当然，不需要调用新函数就可以很容易地创建美观的一行代码。但有时，一行代码的可读性并不高。

#### 1.4 If 语句

```js
if(value === 'duck' || value === 'dog' || value === 'cat') {
  // ...
}
```

改写

```js
const options = ['duck', 'dog', 'cat'];
if (options.includes(value)) {
    // ...
}
```

#### 1.5 提前退出机制

```js
function handleEvent(event) {
    if (event) {
        const target = event.target;
        if (target) {
            // Your awesome piece of code that uses target
        }
    }
}
```

来我们检查下对象 event 是否为真，以及属性 target 是否可用。问题是上面代码我们已经用了两个 if 语句。

让我们看看如何在这里实现 “提前退出”。

```js
function handleEvent(event) {
    if (!event || !event.target) {
        return;
    }
    // Your awesome piece of code that uses target
}
```

在这里用 “提前退出”，你可以检查是否 event 和 event.target 同时非假 。很明显，我们确信这一事件 event.target 非假。因为如果这个语句为假，程序就不会执行其他代码。

#### 1.6 解构赋值

在 JavaScript 中，我们可以解构数据和对象。

解构赋值语法是一种 JavaScript 表达式。通过解构赋值，可以将值从数组、属性从对象中取出，赋值给其他变量。

```js
// Destructuring an object
const numbers = {one: 1, two: 2};
const {one, two} = numbers;
console.log(one); // 1
console.log(two); // 2

// Destructuring an array
const numbers = [1, 2, 3, 4, 5];
const [one, two] = numbers;
console.log(one); // 1
console.log(two); // 2
```

解构的问题在于，它有时会为属性创建一个不好的命名。最好的例子是从 API 获取数据并接收具有 data 属性的响应对象。

```js
const url = "http://localhost:8080/api/v1/organizers/1"
const response = await axios.get(url)
const {name} = response.data
```

这个代码示例说明你正在获取 id 为 1 的 organizer。organizer 对象有一个名字，你可以解构它。这样做没什么问题。

这段代码可以正常运行。但是为什么属性名还是 name? 那将是整个范围中唯一的 name 属性吗？属性名又来自哪个对象？

通过重命名属性可避免这些问题。

```js
const url = "http://localhost:8080/api/v1/organizers/1"
const response = await axios.get(url)
const {name: organizerName} = response.data
```

这段代码变得更具可读性。每个人都知道变量是 organizer 的名字。

### 二、CSS篇

- 擅用英文缩写

- 合理的css编写规范：bem命名、属性顺序

- 不要滥用id选择器和 !important

- 按需使用less等预编译器

- 合理合并与拆分

#### 2.1 常用的样式命名英文缩写

遵循的原则是：尽量不缩写，保证可读性。

##### 2.1.1 布局相关

语义 | 命名 | 简写
-- | -- | --
盒容器 | wrap | wrap
盒子 | box | box
容器 | container | container
主栏 | main | main
侧栏 | sidebar/aside | sidebar/aside
文档 | doc | doc
头部 | head | hd
主体 | body | bd
底部 | foot | ft

##### 2.1.2 模块相关

语义 | 命名 | 简写
-- | -- | --
导航 | navigation | nav
面包屑 | crumb | crumb
菜单 | menu | menu
选项卡 | tab | tab
标题 | title | title
内容 | content | content
列表 | list | list
表格 | table | table
排行榜 | rank | rank
登陆 | login | login
表单 | form | form
品牌标识 | logo | logo
广告 | advertise | ad
搜索 | search | search
切换 | slide | slide
提示 | tips | tips
版权 | copyright | copyright
按钮 | button | btn
输入 | input | ipt
结果 | result | result
下载 | download | dowload
新闻 | news | news
注册 | register | reg
热点 | hot | hot
展开 | collapse | collapse
警告 | alert | alert
提示 | tooltip | tooltip
下拉 | dropdown | dropdown

##### 2.1.3 状态相关

语义 | 命名 | 简写
-- | -- | --
语义 | 命名 | 简写
选中 | selected | selected
当前 | current | current
激活 | active | active
显示 | show | show
隐藏 | hidden | hide
打开 | open | open
关闭 | close | close
出错 | error | err
禁用 | disabled | disabled
扩展 | extend | extend

#### 2.2 定义一套合理的规范

##### 2.2.1 CSS-BEM命名规范

BEM规范【块（block）、元素（element）、修饰符（modifier）】

#### 2.3 合理的属性书写顺序

- 布局定位属性：position  display  float  left  top  right  bottom   overflow  clear   z-index
- 自身属性：width  height  padding  border  margin   background
- 文字样式 font-family   font-size   font-style   font-weight   font-varient   color
- 文本属性：text-align   vertical-align   text-wrap   text-transform   text-indent    text-decoration   letter-spacing    word-spacing    white-space   text-overflow
- 其他属性（CSS3）：content   box-shadow   border-radius  transform background:linear-gradient

```css
.card {
    color: #1289fb;
    font-family: PingFangSC, PingFangSC-Medium;
    height: 20px;
    text-align: right;
    margin-left: 6px;
    display: flex;
    weight: 500px;
    border-radius: 2px;
    line-height: 20px;
    font-size: 16px;
    font-weight: 500;
}
```

```css
.card {
    display: flex;
    margin-left: 6px;
    height: 20px;
    weight: 500px;
    border-radius: 2px;
    text-align: right;
    line-height: 20px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #1289fb;
}
```

后者阅读性更强

这样书写除了提升代码可阅读性、快速定位样式问题外，最大的作用是减少浏览器reflow（回流），提升浏览器渲染dom的性能。

举例来说，如果将布局定位放在最后面，当浏览器在对render树解析布局的时候，遍历到position的时发现该元素是绝对定位元素，需要脱离文档流，而之前却是按照普通元素进行解析的，则不得不重新渲染，解除该元素在文档中所占位置，然而由于该元素的占位发生变化，其他元素也可能会受到它回流的影响而重新排位。

项目中可通过stylelint规范化属性顺序

#### 2.4 不要滥用id选择器和!important

id选择器一定要慎重使用，最好用class选择器，一般项目有很多的后续迭代，很难保证这个模块是唯一的，一般用到id选择器，都是留给js使用的

此外，在开发时，有时由于css样式权重不够被覆盖，或者UI框架默认样式影响，总会有开发小伙伴为了省事儿，直接一个!important解决,一时important一时爽，如果important泛滥，后续就很难维护；建议从权重、样式覆盖等多个方面去发现和解决问题，不要一把important梭哈！

#### 2.5 使用scoped避免样式污染

scoped是一个很好的避免样式污染的方式，但使用了scoped后，对于一些全局样式、父子组件样式的穿透，也需要特别注意。

**<span style="color:red">通常在vue项目中，一个.vue文件来表示一个组件，为了防止各个组件的css样式相互污染，通常做法是在style标签中加入一个scoped属性</span>**

```css
<style type="text/css" scoped>
```

**<span style="color:red">它的原理是给HTML的DOM节点加一个不重复属性，如【data-v-469af010】标志唯一性，且在组件内每个样式选择器后添加一个与【data-v-469af010】相同的字段，实现类似于“作用域”的作用,达到组件样式的模块化。</span>**

**<span style="color:red">在添加了scoped属性的组件中，如果引用了第三方组件，需要局部修改子组件的样式，就需要样式穿透，不同编译器可能有所区别 stylus的样式穿透 使用 >>>，sass的样式穿透使用 ::v-deep，less的样式穿透 使用 /deep/</span>**

如果不用scoped方法，则建议在每个组件的最外层定义一个唯一的class标签，其他样式包含在这个标签内，避免样式污染

#### 2.6 使用css预处理器

CSS预处理是使用变量、函数及简单的逻辑实现更加简洁、更易于代码维护的兼容浏览器的页面样式文件,生成的目标文件都是css文件。在前端界，有三大 CSS 预处理器，分别是 SASS(SCSS), Less, Stylus。

#### 2.7 css的合并与拆分

- 当有大量相同样式属性时，建议合并，减少代码量
- 如果使用css预处理器，酌情使用mixin混合的方式，引入相同的样式
- 尽量避免冗余的css样式书写，多关注属性的继承


