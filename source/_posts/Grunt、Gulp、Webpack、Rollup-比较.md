---
title: Grunt、Gulp、Webpack、Rollup 比较
date: 2020-06-02 15:42:07
tags:
- Grunt
- Gulp
- Webpack
- Rollup
categories:
- 打包工具
---
Grunt 是一套前端自动化工具，帮助处理反复重复的任务。一般用于：编译，压缩，合并文件，简单语法检查等。
<!--more-->
Gulp 是基于“流”的自动化构建工具，采用代码优于配置的策略，更易于学习和使用。

Webpack 是模块化管理工具和打包工具。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、AMD 模块、ES6 模块、CSS、图片等。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。

Webpack 的定位是模块打包器，而 Gulp/Grunt 属于构建工具。Webpack 可以代替 Gulp/Grunt 的一些功能，但不是一个职能的工具，可以配合使用。

Rollup 是下一代 ES6 模块化工具，它最大的亮点是利用 ES6 模块设计，生成更简洁、更简单的代码。尽可能高效地构建出能够直接被其它 JavaScript 库引用的模块
```
基于权衡，Rollup 目前还不支持代码拆分（Code Splitting）和模块的热更新（HMR）

一般而言，对于应用使用 Webpack，对于类库使用 Rollup；需要代码拆分(Code Splitting)，或者很多静态资源需要处理，再或者构建的项目需要引入很多 CommonJS 模块的依赖时，使用 webpack。代码库是基于 ES6 模块，而且希望代码能够被其他人直接使用，使用 Rollup。

Rollup 与 Webpack 有这不同的用途，因此会共同存在，并相互支持。

React 已经将构建工具从 Webpack 换成了 Rollup
```