---
title: vue最佳实践
date: 2020-06-02 16:51:28
tags:
- VUE
- directive
- 组件
categories:
- VUE
---
#### 1.一劳永逸的组件注册
通常在组件使用前，需要引入后再注册，但如果高频组件多了后，每次都这样做，不仅新增很多代码，效率还低！我们应该如何优化呢？
<!--more-->
其实，我们可以借助一下webpack的require.context() 方法来创建自己的（模块）上下文，从而实现自动动态require组件。

我们先在components文件夹（这里面都是些高频组件）添加一个叫global.js的文件，在这个文件里使用require.context 动态将需要的高频组件统统打包进来，然后在main.js文件中引入global.js的文件。

```

//  global.js文件
import Vue from 'vue'
function changeStr (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const requireComponent = require.context('./', false, /\.vue$/)
// 查找同级目录下以vue结尾的组件
const install = () => {
  requireComponent.keys().forEach(fileName => {
    let config = requireComponent(fileName)
    console.log(config) // ./child1.vue 然后用正则拿到child1
    let componentName = changeStr(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
    Vue.component(componentName, config.default || config)
  })
}
export default {
  install // 对外暴露install方法
}
```
最后我们就可以随时随地在页面中使用这些高频组件，无需再手动一个个引入了。

#### 2.高精度权限控制--自定义指令directive
我们通常给一个元素添加 v-if / v-show 来做权限管理，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。

针对这种情况，我们可以通过全局自定义指令来处理：我们先在新建个 array.js 文件，用于存放与权限相关的全局函数；
```
// array.js
export function checkArray (key) {
  let arr = ['1', '2', '3', '4', 'demo']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}
然后在将 array 文件挂载到全局中:
// main.js
import { checkArray } from "./common/array";
Vue.directive("permission", {
  inserted (el, binding) {
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) { // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});
```
最后我们在页面中就可以通过自定义指令 v-permission 来判断：
```
<div class="btns">
  <button v-permission="'1'">权限按钮1</button>  // 会显示
  <button v-permission="'10'">权限按钮2</button>  // 无显示
  <button v-permission="'demo'">权限按钮3</button> // 会显示
</div>
```


