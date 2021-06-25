---
title: vue2-项目解决方案-UI库的按需加载
date: 2021-06-25 16:16:11
top: true
tags:
categories:
- VUE
---
### 一、UI库的按需加载

为什么要使用按需加载的方式而不是一次性全部引入，原因就不多说了。这里以vant的按需加载为例，演示vue中ui库怎样进行按需加载：

- 安装： cnpm i vant -S
- 安装babel-plugin-import插件使其按需加载：  cnpm i babel-plugin-import -D
- 在 .babelrc文件中中添加插件配置 ：

```js
libraryDirectory { 
    
    "plugins": [ 
        // 这里是原来的代码部分
        // …………

        // 这里是要我们配置的代码
        ["import", 
            { 
                "libraryName": "vant", 
                "libraryDirectory": "es", 
                "style": true 
            }
        ] 
    ] 
}
```

- 在main.js中按需加载你需要的插件：

```js
// 按需引入vant组件
import {   
    DatetimePicker,   
    Button,   
    List 
} from 'vant';
```

- 使用组件：

```js
// 使用vant组件
Vue.use(DatetimePicker)  
    .use(Button)  
    .use(List);
```

- 最后在在页面中使用：

```html
<van-button type="primary">按钮</van-button>
```

ps：除了vant库外，像antiUi、elementUi等，很多ui库都支持按需加载，可以去看文档，上面都会有提到。基本都是通过安装babel-plugin-import插件来支持按需加载的，使用方式与vant的如出一辙，可以去用一下。