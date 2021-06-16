---
title: webpack打包原理
date: 2020-06-02 15:44:03
tags:
- Webpack
categories:
- 打包工具
---
### 一、什么是 webpack
webpack 是一个模块打包机，将根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源
<!--more-->
当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

#### 主要承担如下功能：

打包：将多个文件 打包成 一个文件，减少服务器压力和下载带宽

转换：将预编译语言 转换成 浏览器识别的语言

优化：性能优化

#### webpack 特点：

##### 代码拆分
webpack 有两种组织模块的依赖方式，同步、异步

异步依赖将作为分割点，形成一个新的块；在优化了依赖树之后，每一个异步区块都将作为一个文件被打包

##### 智能解析
webpack 有一个智能解析器，几乎可以处理任何第三方库

无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件；甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")

##### 快速运行
webpack 使用异步 I/O 、多级缓存提高运行效率，使得 webpack 以难以令人置信的速度 快速增量编译


### 二、安装

##### 全局安装
```
sudo npm i webpack -g
```
##### 局部安装
```
// 在已经 npm 初始化的项目 根目录执行

npm i webpack -D
````
##### 提醒：webpack4.x 版本需要额外安装 webpack-cli
```
// 以下为局部安装方式，全局安装同上
npm i webpack-cli -D
```
### 三、模块交互 runtime、manifest

在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：

你或你的团队编写的源码。

你的源码会依赖的任何第三方的 library 或 "vendor" 代码。

webpack 的 runtime 和 manifest，管理所有模块的交互

下面 阐述 runtime

runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑；包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑

下面 阐述 manifest

当编译器(compiler)开始执行、解析、映射应用程序时，它会保留所有模块的详细要点，这个数据集合称为 "Manifest"

当完成打包并发送到浏览器时，会在运行时通过 manifest 来解析、加载模块

runtime 和 manifest 管理模块的交互

在浏览器运行时，runtime 和 manifest 用来连接模块化的应用程序的所有代码

无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)

通过使用 manifest 中的数据（每个模块的详细要点：映射、依赖等），runtime 将能够查询模块标识符，检索出背后对应的模块

### 四、核心概念：入口 entry
##### 作用
告诉 webpack 从哪个文件开始构建，这个文件将作为 webpack 依赖关系图的起点

##### 配置 单入口
```
// webpack 配置

module.exports = {
  entry: './path/to/my/entry/file.js'
};

// webpack 配置

module.exports = {
  entry: {
    main: './src/main.js'
  }
};
```
##### 配置 多入口
```
// 场景一：分离 应用程序(app) 和 第三方库(vendor) 入口
// webpack 配置

module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```
```
// 场景二：多页面应用程序，告诉 webpack 需要 3 个独立分离的依赖图
// webpack 配置

module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

### 五、核心概念：出口 output

##### 作用
告诉 webpack 在哪里输出 构建后的包、包的名称 等

##### 配置 单出口
```
// webpack 配置

const path = require('path');

module.exports = {
  entry: main: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

##### 配置 多出口
```
// webpack 配置

const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

##### 其他参数配置

### 六、核心概念：loader

##### 作用
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）

loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

##### loader 使用方式：配置（常用）
```
// 安装 loader
npm install --save-dev css-loader
```
```
// webpack 配置

module.exports = {
  module: {
    rules: [{ 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
    }]
  }
};

// 或

 module.exports = {
  module: {
    rules: [{ 
        test: /\.css$/, 
        use: ['style-loader', {
            loader: 'css-loader',
            options: {
                modules: true
            }
        }]
    }]
  }
};
```

##### loader 使用方式：内联 （不常用）
```
// 在项目文件中，import 语句时使用

import Styles from 'style-loader!css-loader?modules!./styles.css';
```

##### loader 使用方式：CLI（不常用）
```
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'

// 如上 会对 .jade 文件使用 jade-loader，对 .css 文件使用 style-loader 和 css-loader
```

##### loader 特性

几乎所有 loader 都 需要安装， 但 不需要 在 webpack 配置文件中通过 require 引入

逆向编译，链式传递
```
// webpack 配置

module.exports = {
  module: {
    rules: [{ 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader', 'postcss-loader']
    }]
  }
};
// 如上，css 文件编译顺序依次为：postcss-loader ---> css-loader ---> style-loader
// 编译过程中，第一个loader的值 传递给下一个loader，依次传递；最后一个loader编译完成后，
// 将预期值传递给 webpack
```

### 七、核心概念：plugin

##### 作用
可以处理各种任务，从打包优化和压缩，一直到重新定义环境中的变量

##### plugin 使用
```
npm i html-webpack-plugin -D
```
```
// webpack 配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
  ]
};
```

##### plugin 特性

有些插件需要单独安装，有些插件是webpack内置插件 不需要单独安装

但所有的插件都 需要 在 webpack 配置文件中通过 require 引入

##### plugin 剖析：
webpack 插件是一个具有 apply 属性的 JavaScript 对象

apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问
```
// ConsoleLogOnBuildWebpackPlugin.js

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

### 八、核心概念：模式 mode（webpack 4.x）

##### 作用
告诉 webpack 使用相应模式的内置优化

##### 使用
```
// webpack 配置
module.exports = {
  mode: 'production'
};
```
```
// CLI 参数中
webpack --mode=production
```

##### 两种模式的区别
development ：会将 process.env.NODE_ENV 的值设为 development启用  NamedChunksPlugin 和 NamedModulesPlugin
production :会将 process.env.NODE_ENV 的值设为 production。 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin,  NoEmitOnErrorsPlugin, OccurrenceOrderPlugin,   SideEffectsFlagPlugin 和 UglifyJsPlugin

```
// mode: development

module.exports = {
    + mode: 'development'
    - plugins: [
    -   new webpack.NamedModulesPlugin(),
    -   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    - ]
}
```
```
// mode: production

module.exports = {
    +  mode: 'production',
    -  plugins: [
    -    new UglifyJsPlugin(/* ... */),
    -    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    -    new webpack.optimize.ModuleConcatenationPlugin(),
    -    new webpack.NoEmitOnErrorsPlugin()
    -  ]
}
```



在 webpack 中区分两种 模式
```
if(process.env.NODE_ENV === 'development'){
    //开发环境 do something
}else{
    //生产环境 do something
}
```

### 九、核心概念：target
##### webpack 能够为 多种环境 或 target 构建编译（编译后代码 的运行环境）

默认值：web

常见值 见 API

### 十、核心概念：source map 定位代码中的错误

##### 不同的 source map（资源映射）

会决定 代码中错误的显示方式（打包后代码、生成后代码、转换过代码、源代码等 详细见）

会影响 构建(build)、重新构建(rebuild) 的速度

整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它

##### 开发环境的几种常见的 source map

以如下代码为例，运行
```
console.log('js');

class A extends test {}
```
###### eval-source-map

构建速度：-- 、重新构建速度：+ 、生产环境：no 、显示原始源代码

###### cheap-eval-source-map

构建速度：+ 、重新构建速度：++ 、生产环境：no 、转换过的代码（仅限行）
```
*   `cheap-module-eval-source-map`【推荐】

    > 构建速度：0 、重新构建速度：++ 、生产环境：no 、原始源代码（仅限行）


    *   生产环境中 常见的 source map

*   以如下代码为例，运行

    ```
    console.log('js');

    class A extends test {}
    ```

*   `none` 【推荐】

    > 构建速度：+++ 、重新构建速度：+++ 、生产环境：yes 、打包后代码


    *   **总结：** 需要注意的是不同的 devtool 的设置，会导致不同的性能差异。

        *   "eval" 具有最好的性能，但并不能帮助你转译代码。

        *   如果你能接受稍差一些的 mapping 质量，可以使用 cheap-source-map 选项来提高性能

        *   使用 eval-source-map 配置进行增量编译

        *   在大多数情况下，cheap-module-eval-source-map 是最好的选择
```
