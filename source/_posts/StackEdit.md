---
title: StackEdit
date: 2020-05-29 11:13:29
tags:
- StackEdit
- GMF
- markdown-it
categories:
- MarkDown
---
## StackEdit
**StackEdit** 基于PageDown。它是使用Markdown语言来编辑内容的。 
<!--more-->
### 一、Markdown简介
Markdown是一种用来写作的轻量级「标记语言」，它用简洁的语法代替排版。它使我们可以专心于码字，用「标记」语法，来代替常见的排版格式，易读易书写

Markdown的设计目标是容易转化成html发布。所有在Markdown中的标记实际都被MD编辑器转化成html元素了。Markdown实质是简化易读易写的html书写语言，解释成html。MD和html是完全兼容的，可以在MD中加入html的标签。

### 二、Markdown版本演进
Markdown 版本演进思维导图

![markdown001](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/markdown001.jpg)

### 三、Markdown语法
官方文档（阅读性差）：[https://daringfireball.net/projects/markdown/syntax](https://note.youdao.com/)   
github英文文档（有例子，准确清晰）[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### 四、GMF
GMF是github的一个MD语言扩展。github对Markdown支持度高，包含一些特性：  
（1）代码高亮  
（2）任务列表  
（3）自动URL链接  
（4）表情

### 五、StackEdit 功能
1.管理多个 MarkDown 文档。可在线或离线编辑  
2.通过模板导出 MarkDown 或 HTML 格式文件  
3.云同步 MarkDown 文档  
4.支持 Google Drive,  Dropbox   5.和本地硬盘驱动器等备份  
6.Post MarkDown 文档到 Blogger 、Blogspot、WordPress和Tumblr  
7.公布 MarkDown 文档在GitHub，GIST。Google Drive。Dropbox或不论什么SSHserver  
8.分享一个及时渲染的 MarkDown 文档链接  
9.文档信息统计显示  
10.转换HTML到 MarkDown  
11.以GIst公布后支持分享

### 六、StackEdit 支持
1.实时编辑、HTML预览并自己主动滚动定位到编辑处  
2.Markdown Extra 支持 Prettify/Highlight.js 的语法高亮  
3.LaTeX 数学表达式使用MathJax [语法参考](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)  
4.所见即所得的控制button  
5.可配置的布局  
6.支持多个主题  
7.A la carte extensions  
8.离线编辑  
9.Google Drive和Dropbox在线同步  
10.一键公布支持 Blogger。Dropbox。GIST，GitHub，Google Drive，SSH server。Tumblr。WordPress

### 七、Markdown原理解析
#### markdown-it 原理
输入一串 markdown 代码，最后得到一串 html 代码，整体流程如下：

我们以一个简单的例子来解释整个流程：
```
​# 我是一个例子​  -> ​<h1>我是一个例子</h1>​

```
首先，它会被解析器拿到，经过各个解析规则处理后得到一个 token 流，接着这个 token 流被渲染器拿到，经过各个渲染规则处理后逐步拼接成一个 html 字符串。

##### 1.解析器（Parser）- 将md文档解析为Tokens（类似ATS）
markdown-it 内置了七个核心规则，解析规则可以被启用/禁用的。
###### 以最核心的两个规则：block 和 inline为例
规范指出：
```
我们可以将一篇 Markdown 文档视为一系列块，块是一种结构化的元素，如段落，块引用，列表，标题，
规则和代码块。一些块（如块引号和列表项）可以包含其他块;其他（如标题和段落）包含内联内容，
如文本，链接，强调文本，图像，行内代码等。
```
```
块结构的解析优先级始终高于内联结构。这意味着解析可以分两步进行： 
1.识别 markdown 文档的块结构;  
2.将段落，标题和其他块结构中的文本行，作为内联结构解析。
```
```
注意，第一步需要按顺序处理行，但第二步可以并行化，因为一个块元素的内联解析不会影响
任何其他块的内联解析。
```
```
块分为两种类型：容器块和叶子块，容器块可以包含其他块，但叶子块不能包含其他块。
```
具体解析时，会围绕着 line 和 character 两个维度来解析。  
对于每一行来说，解释的结果有以下三种：
```
1.用来关闭一个或多个块结构。

2.用来创建一个或多个新块结构，作为最后打开的块结构的子节点。

3.可以将文本添加到树上剩余的最后（最深的）打开的块结构上。
```
对于我们这个例子，会先创建一个 heading 块，然后将文本内容添加到这个块上。下一行没有内容，于是块关闭。  
字符包括非空白字符和空格(​U+0020​)，制表符 (​U+0009​)，换行符(​U+000A​)，行列表（​U+000B​），换页（​U+000C​）或回车（​U+000D​）这些空白字符。这里我们不做展开。  
这期间会接触到的规则有 block、inline、heading、text。  
1.block 规则，会用来解析 ​# 我是一个例子​
```
先进入 tokenize 函数，内含十一个 block 规则。

heading 规则

得到 heading_open 、inline、 heading_close 三个 token
```
2.inline 规则，会用来解析 ​我是一个例子​
```
先进入 parse 函数，内含四个 inline 规则

text 规则

得到 text 的 token
```
解析完毕，我们得到了 3 + 1 个 token。

```
var md = require('markdown-it')();
// render函数包含了parser和renderer阶段
var result = md.render('# markdown-it rulezz!');
```
**Parser**:

![markdown002](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/markdown002.jpg)

创建一个 Core Parser，这个 Core Parser 包含一系列的缺省 Rules。这些 Rules 将顺序执行，每个 Rule 都在前面的 Tokens 的基础上，要么修改原来的 Token，要么添加新的 Token。这个 Rules 的链条被称为Core Chain。Core Rules 如下:
```
normalize: MD 文档的换行符统一化；将空字符 \u0000 转换为 \uFFFD

block: 识别出哪些是 Block Token(Table, blockquote, Code, Fence 等)，哪些是 Inline Token。
如果是 Block Token，则启动 Block Chain 来处理。Block Chain 又是一堆 Rules 的执行。

inline: 针对 Block Rule 识别出来的 'inline' 类型的进行Inline Chain处理。

linkify: 检测 text 类型的 token 中是否有可是别的 URL(http 或者 mailto)，如果有，则将原本
完整的 text token 分为 text, link, text 三部分(实际不只三个 tokens, 因为 link_open, link_close 
这些 tokens 都会被产生)

replacements: 完成诸如 (c) (C) → © ，+- → ±的替换，同时躲开 link 中的包含的对象文字

smartquotes: 完成引号的排印化处理
```
Block rule 的执行过程，会启动 Block Chain，这又是一堆 Rules 的执行，缺省包含:
```
var _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'table',      require('./rules_block/table'),      [ 'paragraph', 'reference' ] ],
  [ 'code',       require('./rules_block/code') ],
  [ 'fence',      require('./rules_block/fence'),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', require('./rules_block/blockquote'), [ 'paragraph', 'reference', 'list' ] ],
  [ 'hr',         require('./rules_block/hr'),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       require('./rules_block/list'),       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  require('./rules_block/reference') ],
  [ 'heading',    require('./rules_block/heading'),    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   require('./rules_block/lheading') ],
  [ 'html_block', require('./rules_block/html_block'), [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'paragraph',  require('./rules_block/paragraph') ]
];
```
在 Block Chain 执行完了，就是 Inline Rule 执行，也就启动了 Inline Chain，包含:
```
var _rules = [
  [ 'text',            require('./rules_inline/text') ],
  [ 'newline',         require('./rules_inline/newline') ],
  [ 'escape',          require('./rules_inline/escape') ],
  [ 'backticks',       require('./rules_inline/backticks') ],
  [ 'strikethrough',   require('./rules_inline/strikethrough').tokenize ],
  [ 'emphasis',        require('./rules_inline/emphasis').tokenize ],
  [ 'link',            require('./rules_inline/link') ],
  [ 'image',           require('./rules_inline/image') ],
  [ 'autolink',        require('./rules_inline/autolink') ],
  [ 'html_inline',     require('./rules_inline/html_inline') ],
  [ 'entity',          require('./rules_inline/entity') ]
];

var _rules2 = [
  [ 'balance_pairs',   require('./rules_inline/balance_pairs') ],
  [ 'strikethrough',   require('./rules_inline/strikethrough').postProcess ],
  [ 'emphasis',        require('./rules_inline/emphasis').postProcess ],
  [ 'text_collapse',   require('./rules_inline/text_collapse') ]
];
```
Parsing 的过程是一个简单的树形过程，Core Rules 执行到 Block 和 Inline Rule 的时候，会分别再执行 Block Chain 和 Inline Chain。整个 Parsing 过程是同步的。

Markdown-It 的 API 允许 Plugin 作者选择在这些缺省的 Rules 的前后添加新的 Rule 函数，从而实现对特定的 Token 的再处理（增删改 Token 都可以）。

**Rule Chain核心代码：**
```
// 定义parse
var Ruler  = require('./ruler');

var _rules = [
  [ 'normalize',      require('./rules_core/normalize')      ],
  [ 'block',          require('./rules_core/block')          ],
  [ 'inline',         require('./rules_core/inline')         ],
  [ 'linkify',        require('./rules_core/linkify')        ],
  [ 'replacements',   require('./rules_core/replacements')   ],
  [ 'smartquotes',    require('./rules_core/smartquotes')    ]
];

function Core() {
    // Ruler类在Block Chain和Inline Chain都有应用
  this.ruler = new Ruler();
  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}

Core.prototype.process = function (state) {
  var i, l, rules;
  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

// State是数据结构
// 所以链式调用Rule，修改的内容是数据结构State
Core.prototype.State = require('./rules_core/state_core');
module.exports = Core;
```
```
// 调用
var core = new Core()
let tokens = core.process(new core.State(...))
```
**解析出Tokens数据结构类似如下：**
```
[
  {
    "type": "heading_open",
    "tag": "h1",
    "attrs": null,
    "map": [
      0,
      1
    ],
    "nesting": 1,
    "level": 0,
    "children": null,
    "content": "",
    "markup": "#",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  },
  {
    "type": "inline",
    "tag": "",
    "attrs": null,
    "map": [
      0,
      1
    ],
    "nesting": 0,
    "level": 1,
    "children": [
      {
        "type": "text",
        "tag": "",
        "attrs": null,
        "map": null,
        "nesting": 0,
        "level": 0,
        "children": null,
        "content": "test",
        "markup": "",
        "info": "",
        "meta": null,
        "block": false,
        "hidden": false
      }
    ],
    "content": "test",
    "markup": "",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  },
  {
    "type": "heading_close",
    "tag": "h1",
    "attrs": null,
    "map": null,
    "nesting": -1,
    "level": 0,
    "children": null,
    "content": "",
    "markup": "#",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  }
]
```

#### token 流
这里我们得到的结果不是一颗 AST 树，而是一个数组，markdown-it 称之为 token 流。为什么呢？  
官方解释是：
```
Tokens 是一个简单的数组。（AST 是一个对象）

打开的标签和关闭的标签可以隔离。

将“内联容器(inline container)”作为一种特殊的 block token 对象。它有嵌套的 tokens，
如粗体，斜体，文本等等。
```
这样做有什么好处呢？这样就可以并行处理 block 和 inline 类型的 token 了。  
生成 token 流后，它们就被会传递给 renderer。

#### 渲染器（Renderer）- 将Tokens内容渲染为html

把特定 Token 转变为特定的 HTML 的过程。  

它会遍历所有 token，将每个 token 传递给与 token 的 type 属性同名的规则。遇到匹配的 token.type，那么就会用对应的 Renderer Rule 来渲染。没有找到对应的 Renderer Rule，那么一个缺省的 render 函数会被调用。

markdown-it提供了强大的扩展机制（Plugin）。markdown-it提供了一些常用token.type对应的render规则，当你需要某些特殊的渲染效果时，可以覆写这些render rule，比如VuePress。另外，由于是把markdown解析成中间token数据结构，你还可以自定义插件，实现自定义parse rule以及对应的render rule，来扩展markdown-it能力，比如[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)

markdown-it 内置了九种规则：围栏、行内代码、代码块、html 块、行内 html、图片、硬换行、软换行、文本。  
type 属性不在内置规则的 token 将会被被传入 renderToken 中当一个普通 token 处理，这里不作展开。  
回到我们的例子中来：
```
heading_open 会被渲染成<h1>

inline 中的 text 会被渲染成我是一个例子

heading_close 会被渲染成</h1>
```
一些 markdown-it 插件就利用了上述的原理。

